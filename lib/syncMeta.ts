import { SYNC_META_KEY, isBrowser } from "@/lib/storageCore";
import { SYNC_KEYS, isSyncKey, type SyncKey } from "@/lib/syncShared";

/**
 * Per-key sync bookkeeping, persisted in localStorage under SYNC_META_KEY.
 * - `t`: wall-clock ms of the newest local state for the key.
 * - `dirty`: local state not yet accepted by the server (survives tab close —
 *   this is the safety net when a page-hide flush is dropped).
 * - `deleted`: the local state is a tombstone (user-intent removal).
 *
 * Every helper re-reads and re-writes the blob inside the call so two tabs
 * never clobber each other's flags through a stale in-memory copy.
 */
export type SyncMetaEntry = { t: number; dirty?: true; deleted?: true };
export type SyncMeta = Partial<Record<SyncKey, SyncMetaEntry>>;

export function readSyncMeta(): SyncMeta {
  if (!isBrowser()) return {};
  try {
    const raw = localStorage.getItem(SYNC_META_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const meta: SyncMeta = {};
    for (const [key, entry] of Object.entries(parsed)) {
      if (!isSyncKey(key) || !entry || typeof entry !== "object") continue;
      const e = entry as Partial<SyncMetaEntry>;
      if (typeof e.t !== "number" || !Number.isFinite(e.t)) continue;
      meta[key] = {
        t: e.t,
        ...(e.dirty === true ? { dirty: true as const } : {}),
        ...(e.deleted === true ? { deleted: true as const } : {}),
      };
    }
    return meta;
  } catch (e) {
    console.warn("[sync] Failed to read sync meta:", e);
    return {};
  }
}

function writeSyncMeta(meta: SyncMeta): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(SYNC_META_KEY, JSON.stringify(meta));
  } catch (e) {
    console.warn("[sync] Failed to write sync meta:", e);
  }
}

/** A local value write happened: remember its time and queue it for push. */
export function bumpDirty(key: SyncKey, t: number): void {
  const meta = readSyncMeta();
  meta[key] = { t, dirty: true };
  writeSyncMeta(meta);
}

/** A user-intent removal happened: queue a tombstone for push. */
export function recordTombstone(key: SyncKey, t: number): void {
  const meta = readSyncMeta();
  meta[key] = { t, dirty: true, deleted: true };
  writeSyncMeta(meta);
}

/**
 * The server accepted the state that had timestamp `expectedT`. Only clears
 * the dirty flag when the key was not rewritten while the flush was in
 * flight — a newer local write keeps its dirty flag and re-flushes later.
 */
export function markClean(key: SyncKey, expectedT: number): void {
  const meta = readSyncMeta();
  const entry = meta[key];
  if (!entry || entry.t !== expectedT || !entry.dirty) return;
  meta[key] = {
    t: entry.t,
    ...(entry.deleted ? { deleted: true as const } : {}),
  };
  writeSyncMeta(meta);
}

/**
 * Queue the key's CURRENT state for push without touching its timestamp
 * (pull-side decision "local is newer / remote unusable → push ours").
 */
export function markDirty(key: SyncKey, fallbackT: number): void {
  const meta = readSyncMeta();
  const entry = meta[key];
  meta[key] = entry ? { ...entry, dirty: true } : { t: fallbackT, dirty: true };
  writeSyncMeta(meta);
}

/** Adopt server state for a key (after a pull applied it locally). */
export function applyRemoteMeta(key: SyncKey, t: number, deleted?: boolean): void {
  const meta = readSyncMeta();
  meta[key] = { t, ...(deleted ? { deleted: true as const } : {}) };
  writeSyncMeta(meta);
}

/**
 * First-run guard: a key that already has a local value but no meta entry is
 * NOT old — it predates sync. Stamp it dirty at `now` so a pull can never
 * treat genuinely-newer local data as stale and overwrite it.
 */
export function baselineMissingMeta(now: number): SyncKey[] {
  if (!isBrowser()) return [];
  const meta = readSyncMeta();
  const stamped: SyncKey[] = [];
  for (const key of SYNC_KEYS) {
    if (meta[key]) continue;
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(key);
    } catch {
      continue;
    }
    if (raw === null) continue;
    meta[key] = { t: now, dirty: true };
    stamped.push(key);
  }
  if (stamped.length > 0) writeSyncMeta(meta);
  return stamped;
}

/** Keys currently queued for push. */
export function dirtyKeys(): SyncKey[] {
  const meta = readSyncMeta();
  return (Object.keys(meta) as SyncKey[]).filter((key) => meta[key]?.dirty);
}
