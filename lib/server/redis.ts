import { Redis } from "@upstash/redis";
import {
  devClearLoginFailures,
  devGetLoginFailures,
  devPushChanges,
  devReadAll,
  devRecordLoginFailure,
} from "@/lib/server/devStore";
import { resolveRedisConfig } from "@/lib/server/syncEnv";
import {
  isSyncKey,
  type KeyedEnvelope,
  type SyncChange,
  type SyncEnvelope,
  type SyncKey,
} from "@/lib/syncShared";

/**
 * Server-side storage: two Redis hashes keyed by storage key.
 * - meta hash: small `{t, deleted?}` envelopes the CAS script can decode
 *   cheaply (it never parses the payloads).
 * - data hash: the JSON-stringified values, treated as opaque strings.
 * Values are opaque to the server on purpose: validation and merging happen
 * on the client, and only the passphrase holder can write.
 */
const META_HASH = "toeic:sync:v1:meta";
const DATA_HASH = "toeic:sync:v1:data";
const LOGIN_FAIL_KEY = "toeic:sync:v1:login-failures";
const LOGIN_FAIL_WINDOW_SECONDS = 600;

let client: Redis | null = null;

/** Local dev without the integration falls back to a file-backed store with
 * identical semantics; production without env keeps failing loudly. */
function devStoreActive(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  try {
    resolveRedisConfig();
    return false;
  } catch {
    return true;
  }
}

function getRedis(): Redis {
  if (!client) {
    const { url, token } = resolveRedisConfig();
    // Manual JSON everywhere: automatic (de)serialization mixed with Lua
    // ARGV strings is a classic double-encoding trap.
    client = new Redis({ url, token, automaticDeserialization: false });
  }
  return client;
}

/**
 * Per-field compare-and-set: a change is applied only when strictly newer
 * than the stored envelope, so an old device can never overwrite new data.
 * ARGV is triplets of [field, metaJson, dataJson-or-empty]; returns the
 * rejected field names.
 */
const CAS_SCRIPT = `
local rejected = {}
for i = 1, #ARGV, 3 do
  local field = ARGV[i]
  local metaJson = ARGV[i + 1]
  local incoming = cjson.decode(metaJson)
  local currentRaw = redis.call('HGET', KEYS[1], field)
  local newer = true
  if currentRaw then
    local current = cjson.decode(currentRaw)
    if tonumber(current.t) >= tonumber(incoming.t) then newer = false end
  end
  if newer then
    redis.call('HSET', KEYS[1], field, metaJson)
    if incoming.deleted then
      redis.call('HDEL', KEYS[2], field)
    else
      redis.call('HSET', KEYS[2], field, ARGV[i + 2])
    end
  else
    table.insert(rejected, field)
  end
end
return rejected
`;

function parseMeta(raw: string): { t: number; deleted?: boolean } | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const t = (parsed as { t?: unknown }).t;
    if (typeof t !== "number" || !Number.isFinite(t)) return null;
    return {
      t,
      ...((parsed as { deleted?: unknown }).deleted === true
        ? { deleted: true }
        : {}),
    };
  } catch {
    return null;
  }
}

/**
 * With `automaticDeserialization: false`, @upstash/redis deliberately skips
 * the HGETALL response transformer and returns a flat
 * `[field, value, field, value, ...]` array. Keep accepting the transformed
 * object shape too so this remains correct if the SDK changes its internals.
 */
function hashEntries(raw: unknown): Array<[string, string]> {
  if (Array.isArray(raw)) {
    const entries: Array<[string, string]> = [];
    for (let index = 0; index + 1 < raw.length; index += 2) {
      const key = raw[index];
      const value = raw[index + 1];
      if (typeof key === "string" && typeof value === "string") {
        entries.push([key, value]);
      }
    }
    return entries;
  }
  if (!raw || typeof raw !== "object") return [];
  return Object.entries(raw).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
}

export type StoredEnvelope = KeyedEnvelope;

/**
 * Apply changes with per-field CAS. Returns the server's current envelopes
 * for every rejected (stale) change so the client can reconcile without a
 * second round trip.
 */
export async function pushChanges(changes: SyncChange[]): Promise<StoredEnvelope[]> {
  if (changes.length === 0) return [];
  if (devStoreActive()) return devPushChanges(changes);
  const redis = getRedis();
  const argv: string[] = [];
  for (const change of changes) {
    argv.push(
      change.key,
      JSON.stringify({ t: change.t, ...(change.deleted ? { deleted: true } : {}) }),
      change.v ?? "",
    );
  }
  const rejectedRaw = await redis.eval(CAS_SCRIPT, [META_HASH, DATA_HASH], argv);
  const rejectedKeys = (Array.isArray(rejectedRaw) ? rejectedRaw : []).filter(
    (key): key is SyncKey => typeof key === "string",
  );
  if (rejectedKeys.length === 0) return [];

  const pipeline = redis.pipeline();
  for (const key of rejectedKeys) pipeline.hget(META_HASH, key);
  for (const key of rejectedKeys) pipeline.hget(DATA_HASH, key);
  const results = (await pipeline.exec()) as Array<string | null>;

  const envelopes: StoredEnvelope[] = [];
  rejectedKeys.forEach((key, i) => {
    const metaRaw = results[i];
    if (typeof metaRaw !== "string") return;
    const meta = parseMeta(metaRaw);
    if (!meta) return;
    const dataRaw = results[rejectedKeys.length + i];
    envelopes.push({
      key,
      t: meta.t,
      ...(meta.deleted ? { deleted: true } : {}),
      ...(typeof dataRaw === "string" && !meta.deleted ? { v: dataRaw } : {}),
    });
  });
  return envelopes;
}

/** Full state: every stored envelope, tombstones included. */
export async function readAll(): Promise<Record<string, SyncEnvelope>> {
  if (devStoreActive()) return devReadAll();
  const redis = getRedis();
  const pipeline = redis.pipeline();
  pipeline.hgetall(META_HASH);
  pipeline.hgetall(DATA_HASH);
  const [metaRaw, dataRaw] = (await pipeline.exec()) as unknown[];
  const dataByKey = new Map(hashEntries(dataRaw));

  const items: Record<string, SyncEnvelope> = {};
  for (const [key, raw] of hashEntries(metaRaw)) {
    if (!isSyncKey(key)) continue;
    const meta = parseMeta(raw);
    if (!meta) continue;
    const value = dataByKey.get(key);
    items[key] = {
      t: meta.t,
      ...(meta.deleted ? { deleted: true } : {}),
      ...(typeof value === "string" && !meta.deleted ? { v: value } : {}),
    };
  }
  return items;
}

// ─── Login failure counter (global, not per-IP: single-user app) ───────────

/** null = Redis unavailable; callers fail open (rate limiting is defense in depth). */
export async function getLoginFailures(): Promise<number | null> {
  if (devStoreActive()) return devGetLoginFailures();
  try {
    const raw = await getRedis().get(LOGIN_FAIL_KEY);
    if (raw === null) return 0;
    const count = Number(raw);
    return Number.isFinite(count) ? count : 0;
  } catch (e) {
    console.warn("[sync] login-failure counter unavailable:", e);
    return null;
  }
}

export async function recordLoginFailure(): Promise<void> {
  if (devStoreActive()) {
    devRecordLoginFailure(LOGIN_FAIL_WINDOW_SECONDS);
    return;
  }
  try {
    const redis = getRedis();
    const pipeline = redis.pipeline();
    pipeline.incr(LOGIN_FAIL_KEY);
    pipeline.expire(LOGIN_FAIL_KEY, LOGIN_FAIL_WINDOW_SECONDS);
    await pipeline.exec();
  } catch (e) {
    console.warn("[sync] failed to record login failure:", e);
  }
}

export async function clearLoginFailures(): Promise<void> {
  if (devStoreActive()) {
    devClearLoginFailures();
    return;
  }
  try {
    await getRedis().del(LOGIN_FAIL_KEY);
  } catch (e) {
    console.warn("[sync] failed to clear login failures:", e);
  }
}
