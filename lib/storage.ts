import type {
  AnswerRecord,
  Choice,
  MistakeReason,
  ReasonSource,
  SkillTag,
  WrongBookStatus,
} from "@/types/question";
import { clearAllFullMockData } from "@/lib/fullMockStorage";
import { clearAllMockData } from "@/lib/mockStorage";
import { clearMockReviewSnapshots } from "@/lib/mockReviewStorage";
import {
  STORAGE_KEYS,
  isBrowser,
  notifyExternalWrite,
  readJSON,
  removeJSON,
  writeJSON,
  isChoice,
} from "@/lib/storageCore";
import { MISTAKE_REASONS, SKILL_TAG_LIST } from "@/types/question";

const ANSWER_KEY = STORAGE_KEYS.answerRecords;
const DAILY_PLAN_KEY = STORAGE_KEYS.dailyPlan;
const WRONG_STATUS_KEY = STORAGE_KEYS.wrongStatus;
const WRONG_PRACTICE_PLAN_KEY = STORAGE_KEYS.wrongPracticePlan;
const MANUAL_REVIEW_KEY = STORAGE_KEYS.manualReviewItems;
const MOCK_SEEN_KEY = STORAGE_KEYS.mockSeenQuestionIds;

const DAILY_PLAN_TTL_MS = 24 * 60 * 60 * 1000;

function isSkillTag(value: unknown): value is SkillTag {
  return typeof value === "string" && SKILL_TAG_LIST.includes(value as SkillTag);
}

function isAnswerRecord(value: unknown): value is AnswerRecord {
  if (!value || typeof value !== "object") return false;
  const r = value as Partial<AnswerRecord>;
  return (
    typeof r.questionId === "string" &&
    isChoice(r.userAnswer) &&
    isChoice(r.correctAnswer) &&
    typeof r.isCorrect === "boolean" &&
    isSkillTag(r.skill_tag) &&
    typeof r.answeredAt === "string" &&
    !Number.isNaN(Date.parse(r.answeredAt)) &&
    (r.responseTimeMs === undefined || typeof r.responseTimeMs === "number") &&
    // Mistake Reason System (Phase 1): optional — undefined passes, bad values rejected.
    (r.mistakeReason === undefined || MISTAKE_REASONS.includes(r.mistakeReason)) &&
    (r.reasonSource === undefined ||
      r.reasonSource === "user" ||
      r.reasonSource === "inferred")
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

// ─── Answer records ────────────────────────────────────────────────────────

export function getAnswerRecords(): AnswerRecord[] {
  const records = readJSON<unknown>(ANSWER_KEY, []);
  return Array.isArray(records) ? records.filter(isAnswerRecord) : [];
}

export function saveAnswer(record: AnswerRecord): boolean {
  const all = getAnswerRecords();
  all.push(record);
  if (!writeJSON(ANSWER_KEY, all)) return false;

  // Update spaced repetition status
  const statusMap = getWrongStatusMap();
  const hasEntry = statusMap[record.questionId] !== undefined;
  if (!record.isCorrect || hasEntry) {
    updateWrongStatus(record.questionId, record.isCorrect);
  }
  if (isManualReviewQuestion(record.questionId)) {
    removeManualReviewEntry(record.questionId);
  }
  return true;
}

export function updateLatestReason(
  questionId: string,
  reason: MistakeReason,
  source: ReasonSource,
): void {
  const all = getAnswerRecords();
  for (let i = all.length - 1; i >= 0; i--) {
    const record = all[i];
    if (record.questionId !== questionId || record.isCorrect) continue;
    record.mistakeReason = reason;
    record.reasonSource = source;
    writeJSON(ANSWER_KEY, all);
    return;
  }
}

export function clearAllProgress(): void {
  if (!isBrowser()) return;
  removeJSON(ANSWER_KEY);
  removeJSON(DAILY_PLAN_KEY);
  removeJSON(WRONG_STATUS_KEY);
  removeJSON(WRONG_PRACTICE_PLAN_KEY);
  removeJSON(MANUAL_REVIEW_KEY);
  removeJSON(MOCK_SEEN_KEY);
  removeJSON(STORAGE_KEYS.vocabularyProgress);
  removeJSON(STORAGE_KEYS.vocabularyDailySession);
  clearAllMockData();
  clearAllFullMockData();
  clearMockReviewSnapshots();
}

// ─── Backup / Restore ────────────────────────────────────────────────────────

export const BACKUP_KEYS = [
  ANSWER_KEY,
  DAILY_PLAN_KEY,
  WRONG_STATUS_KEY,
  WRONG_PRACTICE_PLAN_KEY,
  STORAGE_KEYS.vocabularyProgress,
  STORAGE_KEYS.vocabularyDailySession,
  STORAGE_KEYS.readingMockResults,
  STORAGE_KEYS.listeningMockResults,
  STORAGE_KEYS.fullMockResults,
  STORAGE_KEYS.mockReviewSnapshots,
  STORAGE_KEYS.manualReviewItems,
  STORAGE_KEYS.mockSeenQuestionIds,
] as const;

export function exportAllData(): string | null {
  if (!isBrowser()) return null;
  try {
    const snapshot: Record<string, unknown> = {};
    for (const key of BACKUP_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw === null) continue;
      snapshot[key] = JSON.parse(raw);
    }
    snapshot._exportedAt = new Date().toISOString();
    return JSON.stringify(snapshot, null, 2);
  } catch (e) {
    console.warn("[storage] Failed to export data:", e);
    return null;
  }
}

type PendingBackupWrite = {
  key: (typeof BACKUP_KEYS)[number];
  value: unknown;
  previousRaw: string | null;
};

function isQuotaExceededError(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === "QuotaExceededError" || error.code === 22)
  );
}

function rollbackBackupWrites(entries: PendingBackupWrite[]): boolean {
  try {
    // Remove every touched value first so restoring the previously valid
    // snapshot cannot fail merely because a larger imported value remains.
    for (const { key } of entries) localStorage.removeItem(key);
    for (const { key, previousRaw } of entries) {
      if (previousRaw !== null) localStorage.setItem(key, previousRaw);
    }
    return true;
  } catch (error) {
    console.error("[storage] Failed to roll back imported data:", error);
    return false;
  }
}

export function importAllData(json: string): boolean {
  if (!isBrowser()) return false;

  let pendingWrites: PendingBackupWrite[];
  let skipped = 0;

  try {
    const snapshot = JSON.parse(json);
    if (
      !isPlainObject(snapshot) ||
      typeof snapshot._exportedAt !== "string" ||
      Number.isNaN(Date.parse(snapshot._exportedAt))
    ) {
      alert("匯入失敗：檔案格式不符。");
      return false;
    }

    pendingWrites = [];
    for (const key of BACKUP_KEYS) {
      if (!(key in snapshot)) continue;
      const value = sanitizeBackupValue(key, snapshot[key]);
      if (value === undefined) {
        skipped++;
        continue;
      }
      pendingWrites.push({
        key,
        value,
        previousRaw: localStorage.getItem(key),
      });
    }
  } catch (e) {
    console.warn("[storage] Failed to parse imported data:", e);
    alert("匯入失敗：無法解析檔案。");
    return false;
  }

  try {
    for (const { key, value } of pendingWrites) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn("[storage] Failed to write imported data:", error);
    const rolledBack = rollbackBackupWrites(pendingWrites);
    if (rolledBack) {
      for (const { key } of pendingWrites) notifyExternalWrite(key);
    }
    if (!rolledBack) {
      alert("匯入失敗，且無法完整還原原有資料。請先匯出目前資料以供檢查。");
    } else if (isQuotaExceededError(error)) {
      alert("匯入失敗：瀏覽器儲存空間不足，原有資料已還原。");
    } else {
      alert("匯入失敗：寫入資料時發生錯誤，原有資料已還原。");
    }
    return false;
  }

  for (const { key } of pendingWrites) notifyExternalWrite(key);

  const count = pendingWrites.length;
  alert(
    skipped > 0
      ? `已匯入 ${count} 筆資料，略過 ${skipped} 筆格式不符資料。請重新整理頁面。`
      : `已匯入 ${count} 筆資料。請重新整理頁面。`,
  );
  return true;
}

/** Row predicate: a plain object carrying a non-empty string under `field`. */
function hasStringField(field: string): (row: unknown) => boolean {
  return (row) =>
    isPlainObject(row) &&
    typeof (row as Record<string, unknown>)[field] === "string" &&
    ((row as Record<string, unknown>)[field] as string).length > 0;
}

/**
 * Per-key inbound cleaning shared by backup import and cloud sync: returns the
 * validated value, or undefined when the payload is unusable for that key.
 */
export function sanitizeBackupValue(
  key: (typeof BACKUP_KEYS)[number],
  value: unknown,
): unknown | undefined {
  if (value === null || value === undefined) return undefined;

  switch (key) {
    case ANSWER_KEY:
      return Array.isArray(value) ? value.filter(isAnswerRecord) : undefined;
    case DAILY_PLAN_KEY:
    case WRONG_PRACTICE_PLAN_KEY:
      return isDailyPlan(value) ? value : undefined;
    case WRONG_STATUS_KEY: {
      const map = sanitizeWrongStatusMap(value);
      return Object.keys(map).length > 0 || isPlainObject(value) ? map : undefined;
    }
    // Element shape matters as much as the container: lib/syncMerge reads
    // `wordId` / `id` / `submittedAt` off every row, so one `null` or bare
    // string in the array throws inside the merge and takes down every
    // subsequent pull. Drop unusable rows here instead.
    case STORAGE_KEYS.vocabularyProgress:
      return Array.isArray(value) ? value.filter(hasStringField("wordId")) : undefined;
    case STORAGE_KEYS.vocabularyDailySession:
      return isPlainObject(value) ? value : undefined;
    case STORAGE_KEYS.readingMockResults:
    case STORAGE_KEYS.listeningMockResults:
    case STORAGE_KEYS.fullMockResults:
    case STORAGE_KEYS.mockReviewSnapshots:
      return Array.isArray(value)
        ? value.filter(hasStringField("id")).filter(hasStringField("submittedAt"))
        : undefined;
    case STORAGE_KEYS.manualReviewItems:
      return Array.isArray(value) ? value.filter(isManualReviewEntry) : undefined;
    case STORAGE_KEYS.mockSeenQuestionIds:
      return isStringArray(value) ? [...new Set(value)] : undefined;
  }
}

/**
 * Question ids the user already answered in any previous mock. Mock plan
 * builders use this to prefer unseen material, so a repeat mock measures
 * ability rather than memory of the previous attempt.
 */
export function getMockSeenQuestionIds(): Set<string> {
  const storedSeen = readJSON<unknown>(MOCK_SEEN_KEY, []);
  const seen = new Set(isStringArray(storedSeen) ? storedSeen : []);
  for (const record of getAnswerRecords()) {
    if (record.source === "mock") {
      seen.add(record.questionId);
    }
  }
  return seen;
}

export function markMockQuestionsSeen(questionIds: string[]): void {
  const seen = getMockSeenQuestionIds();
  let changed = false;
  for (const questionId of questionIds) {
    if (typeof questionId !== "string" || seen.has(questionId)) continue;
    seen.add(questionId);
    changed = true;
  }
  if (changed) {
    writeJSON(MOCK_SEEN_KEY, [...seen].sort());
  }
}

/**
 * Persist a submitted mock's wrong answers to the answer history with
 * `source: "mock"`. Unanswered questions are intentionally skipped — a blank
 * is not evidence of a wrong skill — and correct mock answers never enter the
 * daily history (project policy: mock data must not inflate daily stats).
 */
export function saveMockWrongAnswers(
  questions: ReadonlyArray<{ id: string; answer: Choice; skill_tag: SkillTag }>,
  answers: Partial<Record<string, Choice>>,
  answeredAt: string,
): void {
  for (const question of questions) {
    const userAnswer = answers[question.id];
    if (userAnswer && userAnswer !== question.answer) {
      saveAnswer({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.answer,
        isCorrect: false,
        skill_tag: question.skill_tag,
        answeredAt,
        source: "mock",
      });
    }
  }
}

// ─── Wrong-book status (spaced repetition) ────────────────────────────────

/**
 * Review interval ladder (days). A wrong answer resets to the start; each
 * correct answer climbs one rung. Re-drilling a question minutes after
 * getting it wrong only proves short-term recall, so the daily review queue
 * (getReviewableIds) only serves questions whose interval has elapsed.
 */
const WRONG_SRS_INTERVALS = [1, 3, 7, 14] as const;

export type WrongStatusEntry = {
  status: WrongBookStatus;
  consecutiveCorrect: number;
  /** Current SRS interval in days. Absent on legacy entries. */
  intervalDays?: number;
  /** YYYY-MM-DD due date. Absent (legacy) is treated as due now. */
  nextReviewDate?: string;
  dismissed?: boolean;
  dismissedAt?: string;
};

export type WrongStatusMap = Record<string, WrongStatusEntry>;

const WRONG_BOOK_STATUSES: WrongBookStatus[] = [
  "new",
  "reviewing",
  "improving",
  "mastered",
];

function isWrongStatusEntry(value: unknown): value is WrongStatusEntry {
  if (!isPlainObject(value)) return false;
  return (
    typeof value.consecutiveCorrect === "number" &&
    WRONG_BOOK_STATUSES.includes(value.status as WrongBookStatus) &&
    (value.intervalDays === undefined || typeof value.intervalDays === "number") &&
    (value.nextReviewDate === undefined || typeof value.nextReviewDate === "string") &&
    (value.dismissed === undefined || typeof value.dismissed === "boolean") &&
    (value.dismissedAt === undefined || typeof value.dismissedAt === "string")
  );
}

function sanitizeWrongStatusMap(value: unknown): WrongStatusMap {
  if (!isPlainObject(value)) return {};
  const map: WrongStatusMap = {};
  for (const [questionId, entry] of Object.entries(value)) {
    if (typeof questionId === "string" && isWrongStatusEntry(entry)) {
      map[questionId] = entry;
    }
  }
  return map;
}

function localDateStr(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isDueForReview(entry: WrongStatusEntry): boolean {
  if (!entry.nextReviewDate) return true; // legacy entry → due now
  return entry.nextReviewDate <= localDateStr();
}

export function getWrongStatusMap(): WrongStatusMap {
  return sanitizeWrongStatusMap(readJSON<unknown>(WRONG_STATUS_KEY, {}));
}

export function updateWrongStatus(
  questionId: string,
  isCorrect: boolean
): void {
  const map = getWrongStatusMap();
  const existing = map[questionId];
  const entry: WrongStatusEntry = existing ?? {
    status: "new",
    consecutiveCorrect: 0,
  };

  if (!isCorrect) {
    entry.status = existing ? "reviewing" : "new";
    entry.consecutiveCorrect = 0;
    entry.dismissed = false; // re-surface if answered wrong again
    entry.intervalDays = WRONG_SRS_INTERVALS[0];
    entry.nextReviewDate = localDateStr(WRONG_SRS_INTERVALS[0]);
  } else {
    // A correct answer BEFORE the interval elapsed (e.g. drilling the wrong
    // book minutes after missing) proves same-day recall, not retention.
    // Leave the schedule untouched — same rule as the vocabulary SRS. A
    // wrong answer always applies immediately (it always proves a lapse).
    if (existing && !isDueForReview(existing)) return;
    entry.consecutiveCorrect = (entry.consecutiveCorrect ?? 0) + 1;
    const currentIdx = WRONG_SRS_INTERVALS.indexOf(
      (entry.intervalDays ?? 1) as (typeof WRONG_SRS_INTERVALS)[number],
    );
    const nextInterval =
      WRONG_SRS_INTERVALS[
        Math.min(currentIdx < 0 ? 1 : currentIdx + 1, WRONG_SRS_INTERVALS.length - 1)
      ];
    entry.intervalDays = nextInterval;
    entry.nextReviewDate = localDateStr(nextInterval);
    // Mastered = two correct answers with real spacing between them (interval
    // has climbed past the first rung), not two answers in the same session.
    if (entry.consecutiveCorrect >= 2 && nextInterval >= 3) {
      entry.status = "mastered";
    } else {
      entry.status = "improving";
    }
  }

  map[questionId] = entry;
  writeJSON(WRONG_STATUS_KEY, map);
}

export function removeSingleWrong(questionId: string): void {
  const map = getWrongStatusMap();
  const entry: WrongStatusEntry = map[questionId] ?? {
    status: "new",
    consecutiveCorrect: 0,
  };
  entry.dismissed = true;
  entry.dismissedAt = new Date().toISOString();
  map[questionId] = entry;
  writeJSON(WRONG_STATUS_KEY, pruneDismissed(map));
  removeManualReviewEntry(questionId);
}

// ─── Pruning ─────────────────────────────────────────────────────────────────

const MAX_DISMISSED_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const MAX_STATUS_ENTRIES = 500;

function pruneDismissed(map: WrongStatusMap): WrongStatusMap {
  const now = Date.now();
  // Expired dismissed tombstones are always safe to remove, regardless of the
  // current map size.
  for (const [questionId, entry] of Object.entries(map)) {
    if (
      entry.dismissed &&
      entry.dismissedAt &&
      now - new Date(entry.dismissedAt).getTime() > MAX_DISMISSED_AGE_MS
    ) {
      delete map[questionId];
    }
  }

  let excess = Object.keys(map).length - MAX_STATUS_ENTRIES;
  if (excess <= 0) return map;

  // The cap is a tombstone-retention bound, not permission to delete active
  // learning state. Remove the oldest remaining dismissed entries only. If
  // active entries alone exceed the cap, retain them all and allow the map to
  // remain over the soft limit.
  const dismissedOldestFirst = Object.entries(map)
    .filter(([, entry]) => entry.dismissed)
    .sort(([aId, a], [bId, b]) => {
      const byDate = (a.dismissedAt ?? "").localeCompare(b.dismissedAt ?? "");
      return byDate || aId.localeCompare(bId);
    });
  for (const [questionId] of dismissedOldestFirst) {
    if (excess <= 0) break;
    delete map[questionId];
    excess--;
  }
  return map;
}

export function clearWrongAnswers(): void {
  // Preserve full AnswerRecord history for dashboard; clear review queues only.
  //
  // Cleared entries are DISMISSED, not deleted. Both queues merge as a union
  // across devices, so an emptied map loses every argument for staying empty:
  // the other device's stale copy would hand the whole wrong-book back on the
  // next pull. A dismissal is evidence the merge already knows how to keep —
  // exactly what removeSingleWrong writes for one question.
  const now = new Date().toISOString();

  const map = getWrongStatusMap();
  for (const entry of Object.values(map)) {
    entry.dismissed = true;
    entry.dismissedAt = now;
  }
  writeJSON(WRONG_STATUS_KEY, pruneDismissed(map));

  writeJSON(
    MANUAL_REVIEW_KEY,
    pruneDismissedManualReview(
      readAllManualReviewEntries().map((entry) => ({ ...entry, dismissedAt: now })),
    ),
  );
}

export type ManualReviewEntry = {
  questionId: string;
  skill_tag: SkillTag;
  correctAnswer: Choice;
  userAnswer?: Choice;
  addedAt: string;
  source: "mock-review";
  snapshotId?: string;
  /**
   * Set when the user removed the entry. Kept in storage rather than deleting
   * the row: the cross-device merge unions both sides, so only a tombstone
   * outlives the other device's stale copy. An entry re-added afterwards has
   * `addedAt > dismissedAt` and counts as active again.
   */
  dismissedAt?: string;
};

function isManualReviewEntry(value: unknown): value is ManualReviewEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<ManualReviewEntry>;
  return (
    typeof entry.questionId === "string" &&
    isSkillTag(entry.skill_tag) &&
    isChoice(entry.correctAnswer) &&
    (entry.userAnswer === undefined || isChoice(entry.userAnswer)) &&
    typeof entry.addedAt === "string" &&
    !Number.isNaN(Date.parse(entry.addedAt)) &&
    entry.source === "mock-review" &&
    (entry.snapshotId === undefined || typeof entry.snapshotId === "string") &&
    (entry.dismissedAt === undefined ||
      (typeof entry.dismissedAt === "string" && !Number.isNaN(Date.parse(entry.dismissedAt))))
  );
}

/** True while the entry has not been dismissed since it was last added. */
export function isActiveManualReviewEntry(entry: ManualReviewEntry): boolean {
  return entry.dismissedAt === undefined || entry.dismissedAt < entry.addedAt;
}

/** Same 90-day retention the wrong-status tombstones get. */
function pruneDismissedManualReview(entries: ManualReviewEntry[]): ManualReviewEntry[] {
  const now = Date.now();
  return entries.filter(
    (entry) =>
      isActiveManualReviewEntry(entry) ||
      now - new Date(entry.dismissedAt as string).getTime() <= MAX_DISMISSED_AGE_MS,
  );
}

/** Every stored row, tombstones included — the write path and merge need them. */
function readAllManualReviewEntries(): ManualReviewEntry[] {
  const entries = readJSON<unknown>(MANUAL_REVIEW_KEY, []);
  return Array.isArray(entries) ? entries.filter(isManualReviewEntry) : [];
}

/** The review queue as the user sees it: dismissed rows excluded. */
export function getManualReviewEntries(): ManualReviewEntry[] {
  return readAllManualReviewEntries().filter(isActiveManualReviewEntry);
}

export function addManualReviewEntry(
  entry: Omit<ManualReviewEntry, "addedAt" | "source">,
): void {
  const all = readAllManualReviewEntries();
  const now = new Date().toISOString();
  const next: ManualReviewEntry = {
    ...entry,
    addedAt: now,
    source: "mock-review",
  };
  const existingIndex = all.findIndex((item) => item.questionId === entry.questionId);
  if (existingIndex >= 0) {
    // Re-adding clears any tombstone: the fresh addedAt is what makes it active.
    all[existingIndex] = next;
  } else {
    all.push(next);
  }
  writeJSON(MANUAL_REVIEW_KEY, all);
}

export function removeManualReviewEntry(questionId: string): void {
  const all = readAllManualReviewEntries();
  const index = all.findIndex((entry) => entry.questionId === questionId);
  if (index < 0) return;
  all[index] = { ...all[index], dismissedAt: new Date().toISOString() };
  writeJSON(MANUAL_REVIEW_KEY, pruneDismissedManualReview(all));
}

export function isManualReviewQuestion(questionId: string): boolean {
  return getManualReviewEntries().some((entry) => entry.questionId === questionId);
}

// IDs of wrong/manual-review questions that should appear in daily review.
// SRS-gated: a question only re-enters the queue once its interval elapsed,
// so "correct" answers prove retention rather than same-day recall.
export function getReviewableIds(): string[] {
  const map = getWrongStatusMap();
  const today = localDateStr();
  const candidates = new Map<string, string>();

  for (const [questionId, entry] of Object.entries(map)) {
    if (entry.dismissed || entry.status === "mastered" || !isDueForReview(entry)) {
      continue;
    }
    // Legacy entries without a date are due today, rather than artificially
    // appearing more overdue than every scheduled item.
    candidates.set(questionId, entry.nextReviewDate ?? today);
  }

  for (const entry of getManualReviewEntries()) {
    // Manual review is due immediately. Its added date supplies deterministic
    // overdue ordering while preserving an earlier wrong-book due date if the
    // same question appears in both sources.
    const manualDueDate = entry.addedAt.slice(0, 10);
    const existingDueDate = candidates.get(entry.questionId);
    if (!existingDueDate || manualDueDate < existingDueDate) {
      candidates.set(entry.questionId, manualDueDate);
    }
  }

  return [...candidates.entries()]
    .sort(([aId, aDate], [bId, bDate]) => {
      const byDueDate = aDate.localeCompare(bDate);
      return byDueDate || aId.localeCompare(bId);
    })
    .map(([questionId]) => questionId);
}

export type WrongBookEntry = {
  questionId: string;
  skill_tag: SkillTag;
  status: WrongBookStatus;
  userAnswer?: Choice;
  correctAnswer: Choice;
  lastAnsweredAt: string;
  nextReviewDate?: string;
  source?: "wrong" | "manual";
};

export function getWrongBookEntries(): WrongBookEntry[] {
  const statusMap = getWrongStatusMap();
  const allRecords = getAnswerRecords();
  const manualEntries = getManualReviewEntries();
  const manualIds = new Set(manualEntries.map((entry) => entry.questionId));

  // Latest wrong record per question
  const latestWrong = new Map<string, AnswerRecord>();
  // Latest record (any) per question
  const latestAny = new Map<string, AnswerRecord>();

  for (const r of allRecords) {
    const existing = latestAny.get(r.questionId);
    if (
      !existing ||
      new Date(r.answeredAt) > new Date(existing.answeredAt)
    ) {
      latestAny.set(r.questionId, r);
    }
    if (!r.isCorrect) {
      const ew = latestWrong.get(r.questionId);
      if (
        !ew ||
        new Date(r.answeredAt) > new Date(ew.answeredAt)
      ) {
        latestWrong.set(r.questionId, r);
      }
    }
  }

  const result: WrongBookEntry[] = [];

  for (const [questionId, entry] of Object.entries(statusMap)) {
    if (entry.dismissed) continue;
    if (entry.status === "mastered" && manualIds.has(questionId)) continue;
    const wrongRecord = latestWrong.get(questionId);
    if (!wrongRecord) continue; // no wrong record means it shouldn't be here
    result.push({
      questionId,
      skill_tag: wrongRecord.skill_tag,
      status: entry.status,
      userAnswer: wrongRecord.userAnswer,
      correctAnswer: wrongRecord.correctAnswer,
      lastAnsweredAt:
        latestAny.get(questionId)?.answeredAt ?? wrongRecord.answeredAt,
      nextReviewDate: entry.nextReviewDate,
      source: "wrong",
    });
  }

  const existingIds = new Set(result.map((entry) => entry.questionId));
  for (const entry of manualEntries) {
    if (existingIds.has(entry.questionId)) continue;
    result.push({
      questionId: entry.questionId,
      skill_tag: entry.skill_tag,
      status: "new",
      userAnswer: entry.userAnswer,
      correctAnswer: entry.correctAnswer,
      lastAnsweredAt: entry.addedAt,
      source: "manual",
    });
  }

  return result;
}

// ─── Daily plan ────────────────────────────────────────────────────────────

export type DailyPlan = {
  questionIds: string[];
  createdAt: string;
  cursor: number;
  autoPlayedListeningGroups?: string[];
  /**
   * The submitted question whose explanation is still on screen. The cursor
   * already points to the next question, so refresh cannot submit it twice.
   */
  pendingFeedback?: {
    questionId: string;
    userAnswer: Choice;
  };
};

function isDailyPlan(value: unknown): value is DailyPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Partial<DailyPlan>;
  const cursor = plan.cursor;
  const pendingFeedback = plan.pendingFeedback;
  const pendingFeedbackIsValid =
    pendingFeedback === undefined ||
    (Boolean(pendingFeedback) &&
      typeof pendingFeedback === "object" &&
      typeof pendingFeedback.questionId === "string" &&
      isChoice(pendingFeedback.userAnswer) &&
      cursor !== undefined &&
      cursor > 0 &&
      Array.isArray(plan.questionIds) &&
      plan.questionIds[cursor - 1] === pendingFeedback.questionId);
  return (
    Array.isArray(plan.questionIds) &&
    plan.questionIds.every((id) => typeof id === "string") &&
    typeof plan.createdAt === "string" &&
    !Number.isNaN(Date.parse(plan.createdAt)) &&
    Number.isInteger(cursor) &&
    cursor !== undefined &&
    cursor >= 0 &&
    cursor <= plan.questionIds.length &&
    (plan.autoPlayedListeningGroups === undefined ||
      (Array.isArray(plan.autoPlayedListeningGroups) &&
        plan.autoPlayedListeningGroups.every((key) => typeof key === "string"))) &&
    pendingFeedbackIsValid
  );
}

export function saveDailyPlan(plan: DailyPlan): boolean {
  return writeJSON(DAILY_PLAN_KEY, {
    ...plan,
    autoPlayedListeningGroups: plan.autoPlayedListeningGroups ?? [],
  });
}

export function getDailyPlan(): DailyPlan | null {
  const plan = readJSON<unknown>(DAILY_PLAN_KEY, null);
  if (!isDailyPlan(plan)) return null;

  // Expire after 24 hours
  const age = Date.now() - new Date(plan.createdAt).getTime();
  if (age > DAILY_PLAN_TTL_MS) {
    clearDailyPlan({ silent: true });
    return null;
  }

  return plan;
}

/**
 * `silent: true` is for read-path expiry cleanup only: every device expires
 * plans on its own, so expiry must never sync as a deletion — a stale device
 * waking up would otherwise wipe another device's in-progress plan.
 */
export function clearDailyPlan(opts?: { silent?: boolean }): void {
  removeJSON(DAILY_PLAN_KEY, opts);
}

export type QuizPlanSource = "daily" | "wrongbook";

export function saveWrongPracticePlan(plan: DailyPlan): boolean {
  return writeJSON(WRONG_PRACTICE_PLAN_KEY, {
    ...plan,
    autoPlayedListeningGroups: plan.autoPlayedListeningGroups ?? [],
  });
}

export function startGrammarVariantPractice(questionIds: string[]): boolean {
  if (questionIds.length === 0) return false;
  return saveWrongPracticePlan({
    questionIds,
    createdAt: new Date().toISOString(),
    cursor: 0,
  });
}

/** See clearDailyPlan for the `silent` contract. */
export function clearWrongPracticePlan(opts?: { silent?: boolean }): void {
  removeJSON(WRONG_PRACTICE_PLAN_KEY, opts);
}

export function getQuizPlan():
  | { plan: DailyPlan; source: QuizPlanSource }
  | null {
  const wrongPracticePlan = readJSON<unknown>(WRONG_PRACTICE_PLAN_KEY, null);
  if (isDailyPlan(wrongPracticePlan)) {
    const age = Date.now() - new Date(wrongPracticePlan.createdAt).getTime();
    if (age > DAILY_PLAN_TTL_MS) {
      clearWrongPracticePlan({ silent: true });
    } else if (
      wrongPracticePlan.cursor < wrongPracticePlan.questionIds.length ||
      wrongPracticePlan.pendingFeedback
    ) {
      return { plan: wrongPracticePlan, source: "wrongbook" };
    } else {
      clearWrongPracticePlan({ silent: true });
    }
  }

  const dailyPlan = getDailyPlan();
  return dailyPlan ? { plan: dailyPlan, source: "daily" } : null;
}

export function saveQuizPlan(plan: DailyPlan, source: QuizPlanSource): boolean {
  if (source === "wrongbook") {
    return saveWrongPracticePlan(plan);
  }
  return saveDailyPlan(plan);
}

/**
 * Persists that a daily-study listening group has already received its one
 * automatic playback attempt. Manual replay remains available in the UI.
 */
export function markQuizPlanListeningGroupAutoPlayed(
  groupKey: string,
  source: QuizPlanSource,
): void {
  const plan =
    source === "wrongbook"
      ? readJSON<unknown>(WRONG_PRACTICE_PLAN_KEY, null)
      : readJSON<unknown>(DAILY_PLAN_KEY, null);
  if (!isDailyPlan(plan)) return;

  const played = new Set(plan.autoPlayedListeningGroups ?? []);
  if (played.has(groupKey)) return;
  played.add(groupKey);
  saveQuizPlan(
    { ...plan, autoPlayedListeningGroups: [...played] },
    source,
  );
}
