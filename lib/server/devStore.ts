import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type {
  KeyedEnvelope,
  SyncChange,
  SyncEnvelope,
} from "@/lib/syncShared";

/**
 * Development-only stand-in for the Upstash backend so localhost E2E works
 * before/without the marketplace integration. Same contract as
 * lib/server/redis.ts, including the strictly-newer per-key CAS. Never used
 * when Redis env is present, and production without env still errors.
 */

const STORE_PATH = path.join(process.cwd(), ".sync-dev-store.json");

type DevStore = {
  meta: Record<string, { t: number; deleted?: boolean }>;
  data: Record<string, string>;
  loginFailures?: { count: number; expiresAt: number };
};

function readStore(): DevStore {
  try {
    const parsed = JSON.parse(readFileSync(STORE_PATH, "utf8")) as DevStore;
    return {
      meta: parsed.meta ?? {},
      data: parsed.data ?? {},
      ...(parsed.loginFailures ? { loginFailures: parsed.loginFailures } : {}),
    };
  } catch {
    return { meta: {}, data: {} };
  }
}

function writeStore(store: DevStore): void {
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

export function devPushChanges(changes: SyncChange[]): KeyedEnvelope[] {
  const store = readStore();
  const rejected: KeyedEnvelope[] = [];
  for (const change of changes) {
    const current = store.meta[change.key];
    if (current && current.t >= change.t) {
      rejected.push({
        key: change.key,
        t: current.t,
        ...(current.deleted ? { deleted: true } : {}),
        ...(!current.deleted && store.data[change.key] !== undefined
          ? { v: store.data[change.key] }
          : {}),
      });
      continue;
    }
    store.meta[change.key] = {
      t: change.t,
      ...(change.deleted ? { deleted: true } : {}),
    };
    if (change.deleted) {
      delete store.data[change.key];
    } else if (change.v !== undefined) {
      store.data[change.key] = change.v;
    }
  }
  writeStore(store);
  return rejected;
}

export function devReadAll(): Record<string, SyncEnvelope> {
  const store = readStore();
  const items: Record<string, SyncEnvelope> = {};
  for (const [key, meta] of Object.entries(store.meta)) {
    items[key] = {
      t: meta.t,
      ...(meta.deleted ? { deleted: true } : {}),
      ...(!meta.deleted && store.data[key] !== undefined
        ? { v: store.data[key] }
        : {}),
    };
  }
  return items;
}

export function devGetLoginFailures(): number {
  const store = readStore();
  if (!store.loginFailures || store.loginFailures.expiresAt < Date.now()) return 0;
  return store.loginFailures.count;
}

export function devRecordLoginFailure(windowSeconds: number): void {
  const store = readStore();
  const active =
    store.loginFailures && store.loginFailures.expiresAt >= Date.now()
      ? store.loginFailures.count
      : 0;
  store.loginFailures = {
    count: active + 1,
    expiresAt: Date.now() + windowSeconds * 1000,
  };
  writeStore(store);
}

export function devClearLoginFailures(): void {
  const store = readStore();
  delete store.loginFailures;
  writeStore(store);
}
