import { STORAGE_KEYS } from "@/lib/storageCore";

/**
 * Keys that sync to the cloud. Mirrors BACKUP_KEYS in lib/storage.ts (the
 * "worth persisting" set) — sync-merge-check.ts asserts the two never drift.
 * In-progress mock sessions stay device-local on purpose.
 */
export const SYNC_KEYS = [
  STORAGE_KEYS.answerRecords,
  STORAGE_KEYS.dailyPlan,
  STORAGE_KEYS.wrongStatus,
  STORAGE_KEYS.wrongPracticePlan,
  STORAGE_KEYS.vocabularyProgress,
  STORAGE_KEYS.vocabularyDailySession,
  STORAGE_KEYS.readingMockResults,
  STORAGE_KEYS.listeningMockResults,
  STORAGE_KEYS.fullMockResults,
  STORAGE_KEYS.mockReviewSnapshots,
  STORAGE_KEYS.manualReviewItems,
  STORAGE_KEYS.mockSeenQuestionIds,
] as const;

export type SyncKey = (typeof SYNC_KEYS)[number];

export function isSyncKey(key: string): key is SyncKey {
  return (SYNC_KEYS as readonly string[]).includes(key);
}

/**
 * Per-key state exchanged with the server. `t` is the wall-clock ms of the
 * client write that produced this state; the server only accepts strictly
 * newer writes per key (CAS), so an old device can never overwrite new data.
 */
export type SyncEnvelope = {
  t: number;
  deleted?: boolean;
  /** JSON-stringified value; absent on tombstones. */
  v?: string;
};

export type SyncChange = SyncEnvelope & { key: SyncKey };

/** Envelope tagged with its key, as returned in POST /api/sync rejections. */
export type KeyedEnvelope = SyncEnvelope & { key: SyncKey };

export function isValidSyncChange(value: unknown): value is SyncChange {
  if (!value || typeof value !== "object") return false;
  const c = value as Partial<SyncChange>;
  return (
    typeof c.key === "string" &&
    isSyncKey(c.key) &&
    typeof c.t === "number" &&
    Number.isFinite(c.t) &&
    c.t > 0 &&
    (c.deleted === undefined || c.deleted === true) &&
    (c.v === undefined || typeof c.v === "string") &&
    (c.deleted === true || typeof c.v === "string")
  );
}

/** Upstash free tier caps a request around 1MB; leave headroom per field. */
export const MAX_FIELD_BYTES = 900_000;

/** Browsers cap in-flight keepalive fetch bodies at 64KiB total. */
export const KEEPALIVE_BUDGET_BYTES = 60_000;
