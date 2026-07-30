import type { AnswerRecord } from "@/types/question";
import {
  STORAGE_KEYS,
  SYNC_HINT_KEY,
  isBrowser,
  subscribeStorageWrites,
  type StorageWriteEvent,
} from "@/lib/storageCore";
import {
  KEEPALIVE_BUDGET_BYTES,
  MAX_FIELD_BYTES,
  SYNC_KEYS,
  isSyncKey,
  type SyncChange,
  type SyncEnvelope,
  type SyncKey,
} from "@/lib/syncShared";
import {
  applyRemoteMeta,
  baselineMissingMeta,
  bumpDirty,
  dirtyKeys,
  markClean,
  markDirty,
  readSyncMeta,
  recordTombstone,
} from "@/lib/syncMeta";
import { reconcileKey } from "@/lib/syncMerge";

/**
 * Client sync engine (module singleton).
 *
 * Local-first contract: without the localStorage hint flag (set on login)
 * nothing here runs and the app makes zero network requests. Writes flow
 * through storageCore events → persistent dirty flags → debounced pushes;
 * pulls reconcile per key via lib/syncMerge. Any 401 disables the engine
 * (hint cleared) until the next login.
 */

export type SyncStatus = "disabled" | "syncing" | "synced" | "offline" | "error";

const DEBOUNCE_MS = 2500;
const MAX_WAIT_MS = 15_000;
const REFOCUS_PULL_MS = 60_000;

let engineEnabled = false;
let listenersAttached = false;
let status: SyncStatus = "disabled";
let lastPullAt = 0;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let maxWaitDeadline: number | null = null;
let flushInFlight = false;
let flushQueued = false;
/**
 * Consecutive flushes the server rejected on CAS. A rejection hands back the
 * newer remote state, which we merge and re-push with a fresh timestamp, so
 * one retry normally settles it. Bounded so a persistently losing key cannot
 * turn the debounce into an endless push loop.
 */
let rejectedFlushStreak = 0;
const MAX_REJECTED_FLUSH_RETRIES = 3;

const statusListeners = new Set<() => void>();
const dataListeners = new Set<(keys: SyncKey[]) => void>();

function setStatus(next: SyncStatus): void {
  if (status === next) return;
  status = next;
  for (const listener of statusListeners) listener();
}

export function getSyncStatus(): SyncStatus {
  return status;
}

export function getServerSyncStatus(): SyncStatus {
  return "disabled";
}

export function subscribeSyncStatus(listener: () => void): () => void {
  statusListeners.add(listener);
  return () => {
    statusListeners.delete(listener);
  };
}

/** Fired after a background pull changed local data (provider remounts pages). */
export function subscribeSyncDataChanges(
  listener: (keys: SyncKey[]) => void,
): () => void {
  dataListeners.add(listener);
  return () => {
    dataListeners.delete(listener);
  };
}

function hasSyncHint(): boolean {
  if (!isBrowser()) return false;
  try {
    return localStorage.getItem(SYNC_HINT_KEY) !== null;
  } catch {
    return false;
  }
}

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn(`[sync] failed to write pulled "${key}":`, e);
    return false;
  }
}

// ─── Event handlers ────────────────────────────────────────────────────────

function onStorageWrite(event: StorageWriteEvent): void {
  if (!engineEnabled || event.silent || !isSyncKey(event.key)) return;
  if (event.kind === "write") {
    bumpDirty(event.key, Date.now());
  } else {
    recordTombstone(event.key, Date.now());
    // User-intent deletions (e.g. clear-all) should reach the cloud promptly.
    void flush();
    return;
  }
  scheduleFlush();
}

function onCrossTabStorage(event: StorageEvent): void {
  if (!engineEnabled || !event.key) return;
  // Another tab touched synced state; pick up any dirty residue it left
  // behind (it may close before its own debounce fires). Reading meta fresh
  // makes this a no-op when the other tab already flushed.
  if (isSyncKey(event.key)) scheduleFlush();
}

function onVisibilityChange(): void {
  if (!engineEnabled) return;
  if (document.visibilityState === "hidden") {
    void flush({ keepalive: true });
  } else if (Date.now() - lastPullAt > REFOCUS_PULL_MS) {
    void pullAndNotify();
  }
}

function onPageHide(): void {
  if (!engineEnabled) return;
  void flush({ keepalive: true });
}

function onOnline(): void {
  if (!engineEnabled) return;
  void flush();
}

function attachListeners(): void {
  if (listenersAttached || !isBrowser()) return;
  listenersAttached = true;
  subscribeStorageWrites(onStorageWrite);
  window.addEventListener("storage", onCrossTabStorage);
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("online", onOnline);
}

// ─── Lifecycle ─────────────────────────────────────────────────────────────

/** Idempotent. Returns whether sync is enabled (hint flag present). */
export function initSyncEngine(): boolean {
  if (!isBrowser()) return false;
  if (!hasSyncHint()) {
    setStatus("disabled");
    return false;
  }
  engineEnabled = true;
  attachListeners();
  baselineMissingMeta(Date.now());
  return true;
}

/** Called by the login page after the server accepted the access code. */
export function enableSync(): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(SYNC_HINT_KEY, "1");
  } catch (e) {
    console.warn("[sync] failed to persist sync hint:", e);
  }
  setStatus("syncing");
  initSyncEngine();
}

/** Any 401 lands here: back to pure local-first until the next login. */
export function disableSync(): void {
  engineEnabled = false;
  if (isBrowser()) {
    try {
      localStorage.removeItem(SYNC_HINT_KEY);
    } catch {
      // ignore
    }
  }
  setStatus("disabled");
}

// ─── Push ──────────────────────────────────────────────────────────────────

function scheduleFlush(): void {
  if (!engineEnabled || !isBrowser()) return;
  const now = Date.now();
  if (maxWaitDeadline === null) maxWaitDeadline = now + MAX_WAIT_MS;
  if (debounceTimer !== null) clearTimeout(debounceTimer);
  const delay = Math.min(DEBOUNCE_MS, Math.max(0, maxWaitDeadline - now));
  debounceTimer = setTimeout(() => {
    void flush();
  }, delay);
}

function collectChanges(keepalive: boolean): {
  changes: SyncChange[];
  flushedT: Partial<Record<SyncKey, number>>;
} {
  // Values and meta are read fresh from localStorage at flush time — never
  // from engine memory — so concurrent tabs cannot serve stale snapshots.
  const meta = readSyncMeta();
  const changes: SyncChange[] = [];
  const flushedT: Partial<Record<SyncKey, number>> = {};

  for (const key of dirtyKeys()) {
    const entry = meta[key];
    if (!entry?.dirty) continue;
    if (entry.deleted) {
      changes.push({ key, t: entry.t, deleted: true });
      flushedT[key] = entry.t;
      continue;
    }
    const raw = safeGetItem(key);
    if (raw === null) {
      // Value vanished via a silent removal after the dirty write; nothing
      // meaningful to push — settle the flag so flush cannot loop forever.
      markClean(key, entry.t);
      continue;
    }
    if (raw.length > MAX_FIELD_BYTES) {
      console.warn(
        `[sync] "${key}" is ${raw.length} bytes (cap ${MAX_FIELD_BYTES}) — left local-only until it shrinks`,
      );
      markClean(key, entry.t);
      continue;
    }
    changes.push({ key, t: entry.t, v: raw });
    flushedT[key] = entry.t;
  }

  if (keepalive && changes.length > 0) {
    // Browsers cap total in-flight keepalive bodies at 64KiB: send what fits
    // (smallest first); persistent dirty flags re-push the rest next load.
    const sized = changes
      .map((change) => ({ change, size: change.v?.length ?? 32 }))
      .sort((a, b) => a.size - b.size);
    const kept: SyncChange[] = [];
    let budget = KEEPALIVE_BUDGET_BYTES;
    for (const { change, size } of sized) {
      if (size > budget) continue;
      budget -= size;
      kept.push(change);
    }
    return { changes: kept, flushedT };
  }
  return { changes, flushedT };
}

export async function flush(opts: { keepalive?: boolean } = {}): Promise<void> {
  if (!engineEnabled || !isBrowser()) return;
  if (flushInFlight) {
    flushQueued = true;
    return;
  }
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  maxWaitDeadline = null;

  const { changes, flushedT } = collectChanges(opts.keepalive === true);
  if (changes.length === 0) return;

  flushInFlight = true;
  if (!opts.keepalive) setStatus("syncing");
  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ changes }),
      cache: "no-store",
      keepalive: opts.keepalive === true,
    });
    if (res.status === 401) {
      disableSync();
      return;
    }
    if (!res.ok) {
      setStatus("error");
      return;
    }
    const { rejected } = (await res.json()) as {
      rejected: Array<SyncEnvelope & { key: string }>;
    };
    const rejectedKeys = new Set(rejected.map((r) => r.key));
    for (const change of changes) {
      if (rejectedKeys.has(change.key)) continue;
      const t = flushedT[change.key];
      if (t !== undefined) markClean(change.key, t);
    }
    if (rejected.length > 0) {
      // Rejected = server has strictly newer state; it came back inline.
      const items: Record<string, SyncEnvelope> = {};
      for (const envelope of rejected) {
        if (isSyncKey(envelope.key)) items[envelope.key] = envelope;
      }
      const { changed, writeFailed } = applyRemoteEnvelopes(items);
      if (changed.length > 0) notifyDataChanges(changed);
      if (writeFailed) {
        // The merged value never reached localStorage, so this device is NOT
        // carrying the state the badge would be claiming.
        setStatus("error");
        return;
      }
    }
    // The rejected keys kept their dirty flags, and the reconcile above may
    // have queued more. Reporting "synced" with a push still outstanding is
    // the failure the badge exists to rule out.
    if (dirtyKeys().length > 0) {
      rejectedFlushStreak += 1;
      if (rejectedFlushStreak <= MAX_REJECTED_FLUSH_RETRIES) {
        setStatus("syncing");
        scheduleFlush();
      } else {
        setStatus("error");
      }
      return;
    }
    rejectedFlushStreak = 0;
    setStatus("synced");
  } catch {
    setStatus("offline");
  } finally {
    flushInFlight = false;
    if (flushQueued) {
      flushQueued = false;
      scheduleFlush();
    }
  }
}

// ─── Pull ──────────────────────────────────────────────────────────────────

function notifyDataChanges(keys: SyncKey[]): void {
  for (const listener of dataListeners) listener(keys);
}

/**
 * Reconcile server envelopes into localStorage. Raw setItem/removeItem on
 * purpose: going through writeJSON/removeJSON would re-emit write events and
 * turn every pull into a push loop. answerRecords reconciles first so the
 * manual-review merger can see the merged history.
 *
 * `writeFailed` reports that a decision could not be persisted (quota): the
 * caller must not then claim the device is in sync, because it is holding
 * older state than the server.
 */
function applyRemoteEnvelopes(items: Record<string, SyncEnvelope>): {
  changed: SyncKey[];
  writeFailed: boolean;
} {
  const changed: SyncKey[] = [];
  let writeFailed = false;
  const ordered: SyncKey[] = [
    STORAGE_KEYS.answerRecords,
    ...SYNC_KEYS.filter((key) => key !== STORAGE_KEYS.answerRecords),
  ];
  let mergedRecords: AnswerRecord[] | undefined;

  for (const key of ordered) {
    const remote = items[key];
    const metaEntry = readSyncMeta()[key];
    let localValue: unknown;
    const raw = safeGetItem(key);
    if (raw !== null) {
      try {
        localValue = JSON.parse(raw);
      } catch {
        localValue = undefined;
      }
    }

    const decision = reconcileKey(
      key,
      {
        value: localValue,
        metaT: metaEntry?.t ?? 0,
        metaDeleted: metaEntry?.deleted === true,
      },
      remote,
      Date.now(),
      key === STORAGE_KEYS.manualReviewItems ? mergedRecords : undefined,
    );

    switch (decision.action) {
      case "none":
        break;
      case "settleMeta":
        applyRemoteMeta(key, decision.t);
        break;
      case "pushLocal":
        markDirty(key, Date.now());
        break;
      case "removeLocal":
        try {
          localStorage.removeItem(key);
        } catch {
          // ignore
        }
        applyRemoteMeta(key, decision.t, true);
        changed.push(key);
        break;
      case "writeLocal":
        if (safeSetItem(key, JSON.stringify(decision.value))) {
          applyRemoteMeta(key, decision.t);
          changed.push(key);
        } else {
          writeFailed = true;
        }
        break;
      case "writeLocalAndPush":
        if (safeSetItem(key, JSON.stringify(decision.value))) {
          bumpDirty(key, decision.t);
          changed.push(key);
        } else {
          writeFailed = true;
        }
        break;
    }

    if (key === STORAGE_KEYS.answerRecords) {
      const postRaw = safeGetItem(key);
      mergedRecords = undefined;
      if (postRaw !== null) {
        try {
          const parsed: unknown = JSON.parse(postRaw);
          if (Array.isArray(parsed)) mergedRecords = parsed as AnswerRecord[];
        } catch {
          mergedRecords = undefined;
        }
      }
    }
  }
  return { changed, writeFailed };
}

/** Full pull + reconcile + follow-up flush. Returns locally-changed keys. */
export async function initialPull(): Promise<{ changedKeys: SyncKey[] }> {
  if (!engineEnabled || !isBrowser()) return { changedKeys: [] };
  setStatus("syncing");
  try {
    const res = await fetch("/api/sync", { cache: "no-store" });
    if (res.status === 401) {
      disableSync();
      return { changedKeys: [] };
    }
    if (!res.ok) {
      setStatus("error");
      return { changedKeys: [] };
    }
    const { items } = (await res.json()) as {
      items: Record<string, SyncEnvelope>;
    };
    lastPullAt = Date.now();
    const { changed: changedKeys, writeFailed } = applyRemoteEnvelopes(items);
    if (dirtyKeys().length > 0) {
      await flush();
      // A push can succeed while a pulled key never made it to localStorage;
      // the device is still behind, so the error must outrank flush's verdict.
      if (writeFailed) setStatus("error");
    } else {
      setStatus(writeFailed ? "error" : "synced");
    }
    return { changedKeys };
  } catch {
    setStatus("offline");
    return { changedKeys: [] };
  }
}

async function pullAndNotify(): Promise<void> {
  const { changedKeys } = await initialPull();
  if (changedKeys.length > 0) notifyDataChanges(changedKeys);
}
