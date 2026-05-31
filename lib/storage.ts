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
  readJSON,
  writeJSON,
  isChoice,
} from "@/lib/storageCore";
import { MISTAKE_REASONS, SKILL_TAG_LIST } from "@/types/question";

const ANSWER_KEY = STORAGE_KEYS.answerRecords;
const DAILY_PLAN_KEY = STORAGE_KEYS.dailyPlan;
const WRONG_STATUS_KEY = STORAGE_KEYS.wrongStatus;
const WRONG_PRACTICE_PLAN_KEY = STORAGE_KEYS.wrongPracticePlan;
const MANUAL_REVIEW_KEY = STORAGE_KEYS.manualReviewItems;

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

// ─── Answer records ────────────────────────────────────────────────────────

export function getAnswerRecords(): AnswerRecord[] {
  const records = readJSON<unknown>(ANSWER_KEY, []);
  return Array.isArray(records) ? records.filter(isAnswerRecord) : [];
}

export function saveAnswer(record: AnswerRecord): void {
  const all = getAnswerRecords();
  all.push(record);
  writeJSON(ANSWER_KEY, all);

  // Update spaced repetition status
  const statusMap = getWrongStatusMap();
  const hasEntry = statusMap[record.questionId] !== undefined;
  if (!record.isCorrect || hasEntry) {
    updateWrongStatus(record.questionId, record.isCorrect);
  }
  if (isManualReviewQuestion(record.questionId)) {
    removeManualReviewEntry(record.questionId);
  }
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
  try {
    localStorage.removeItem(ANSWER_KEY);
    localStorage.removeItem(DAILY_PLAN_KEY);
    localStorage.removeItem(WRONG_STATUS_KEY);
    localStorage.removeItem(WRONG_PRACTICE_PLAN_KEY);
    localStorage.removeItem(MANUAL_REVIEW_KEY);
    localStorage.removeItem(STORAGE_KEYS.vocabularyProgress);
    localStorage.removeItem(STORAGE_KEYS.vocabularyDailySession);
    clearAllMockData();
    clearAllFullMockData();
    clearMockReviewSnapshots();
  } catch (e) {
    console.warn("[storage] Failed to clear all progress:", e);
  }
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
] as const;

export function exportAllData(): string | null {
  if (!isBrowser()) return null;
  try {
    const snapshot: Record<string, unknown> = {};
    for (const key of BACKUP_KEYS) {
      const raw = localStorage.getItem(key);
      snapshot[key] = raw ? JSON.parse(raw) : null;
    }
    snapshot._exportedAt = new Date().toISOString();
    return JSON.stringify(snapshot, null, 2);
  } catch (e) {
    console.warn("[storage] Failed to export data:", e);
    return null;
  }
}

export function importAllData(json: string): boolean {
  if (!isBrowser()) return false;
  try {
    const snapshot = JSON.parse(json);
    if (typeof snapshot !== "object" || !snapshot._exportedAt) {
      alert("匯入失敗：檔案格式不符。");
      return false;
    }
    let count = 0;
    for (const key of BACKUP_KEYS) {
      if (snapshot[key] !== undefined) {
        localStorage.setItem(key, JSON.stringify(snapshot[key]));
        count++;
      }
    }
    alert(`已匯入 ${count} 筆資料。請重新整理頁面。`);
    return true;
  } catch (e) {
    console.warn("[storage] Failed to import data:", e);
    alert("匯入失敗：無法解析檔案。");
    return false;
  }
}

// ─── Wrong-book status (spaced repetition) ────────────────────────────────

export type WrongStatusEntry = {
  status: WrongBookStatus;
  consecutiveCorrect: number;
  dismissed?: boolean;
  dismissedAt?: string;
};

export type WrongStatusMap = Record<string, WrongStatusEntry>;

export function getWrongStatusMap(): WrongStatusMap {
  return readJSON<WrongStatusMap>(WRONG_STATUS_KEY, {});
}

export function updateWrongStatus(
  questionId: string,
  isCorrect: boolean
): void {
  const map = getWrongStatusMap();
  const entry: WrongStatusEntry = map[questionId] ?? {
    status: "new",
    consecutiveCorrect: 0,
  };

  if (!isCorrect) {
    entry.status = map[questionId] ? "reviewing" : "new";
    entry.consecutiveCorrect = 0;
    entry.dismissed = false; // re-surface if answered wrong again
  } else {
    entry.consecutiveCorrect = (entry.consecutiveCorrect ?? 0) + 1;
    if (entry.consecutiveCorrect >= 2) {
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
  const keys = Object.keys(map);
  if (keys.length <= MAX_STATUS_ENTRIES) {
    // Only prune by age
    for (const key of keys) {
      const entry = map[key];
      if (
        entry.dismissed &&
        entry.dismissedAt &&
        now - new Date(entry.dismissedAt).getTime() > MAX_DISMISSED_AGE_MS
      ) {
        delete map[key];
      }
    }
    return map;
  }
  // Over cap: remove oldest dismissed first, then drop excess
  const sorted = keys
    .map((k) => ({ k, e: map[k] }))
    .sort((a, b) => {
      const aDismissed = a.e.dismissed ? 1 : 0;
      const bDismissed = b.e.dismissed ? 1 : 0;
      if (aDismissed !== bDismissed) return aDismissed - bDismissed; // dismissed first
      return 0; // stable
    });
  for (const { k } of sorted.slice(MAX_STATUS_ENTRIES)) {
    delete map[k];
  }
  return map;
}

export function clearWrongAnswers(): void {
  // Preserve full AnswerRecord history for dashboard; clear review queues only.
  writeJSON(WRONG_STATUS_KEY, {});
  writeJSON(MANUAL_REVIEW_KEY, []);
}

export type ManualReviewEntry = {
  questionId: string;
  skill_tag: SkillTag;
  correctAnswer: Choice;
  userAnswer?: Choice;
  addedAt: string;
  source: "mock-review";
  snapshotId?: string;
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
    (entry.snapshotId === undefined || typeof entry.snapshotId === "string")
  );
}

export function getManualReviewEntries(): ManualReviewEntry[] {
  const entries = readJSON<unknown>(MANUAL_REVIEW_KEY, []);
  return Array.isArray(entries) ? entries.filter(isManualReviewEntry) : [];
}

export function addManualReviewEntry(
  entry: Omit<ManualReviewEntry, "addedAt" | "source">,
): void {
  const all = getManualReviewEntries();
  const now = new Date().toISOString();
  const next: ManualReviewEntry = {
    ...entry,
    addedAt: now,
    source: "mock-review",
  };
  const existingIndex = all.findIndex((item) => item.questionId === entry.questionId);
  if (existingIndex >= 0) {
    all[existingIndex] = next;
  } else {
    all.push(next);
  }
  writeJSON(MANUAL_REVIEW_KEY, all);
}

export function removeManualReviewEntry(questionId: string): void {
  const next = getManualReviewEntries().filter((entry) => entry.questionId !== questionId);
  writeJSON(MANUAL_REVIEW_KEY, next);
}

export function isManualReviewQuestion(questionId: string): boolean {
  return getManualReviewEntries().some((entry) => entry.questionId === questionId);
}

// IDs of wrong/manual-review questions that should appear in daily review
export function getReviewableIds(): string[] {
  const map = getWrongStatusMap();
  const ids = new Set(
    Object.entries(map)
      .filter(([, e]) => !e.dismissed && e.status !== "mastered")
      .map(([id]) => id),
  );
  for (const entry of getManualReviewEntries()) {
    ids.add(entry.questionId);
  }
  return [...ids];
}

// Legacy alias used by quiz page
export function getUniqueWrongQuestionIds(): string[] {
  return getReviewableIds();
}

export type WrongBookEntry = {
  questionId: string;
  skill_tag: SkillTag;
  status: WrongBookStatus;
  userAnswer?: Choice;
  correctAnswer: Choice;
  lastAnsweredAt: string;
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
};

function isDailyPlan(value: unknown): value is DailyPlan {
  if (!value || typeof value !== "object") return false;
  const plan = value as Partial<DailyPlan>;
  const cursor = plan.cursor;
  return (
    Array.isArray(plan.questionIds) &&
    plan.questionIds.every((id) => typeof id === "string") &&
    typeof plan.createdAt === "string" &&
    !Number.isNaN(Date.parse(plan.createdAt)) &&
    Number.isInteger(cursor) &&
    cursor !== undefined &&
    cursor >= 0 &&
    (plan.autoPlayedListeningGroups === undefined ||
      (Array.isArray(plan.autoPlayedListeningGroups) &&
        plan.autoPlayedListeningGroups.every((key) => typeof key === "string")))
  );
}

export function saveDailyPlan(plan: DailyPlan): void {
  writeJSON(DAILY_PLAN_KEY, {
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
    clearDailyPlan();
    return null;
  }

  return plan;
}

export function clearDailyPlan(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(DAILY_PLAN_KEY);
  } catch (e) {
    console.warn("[storage] Failed to clear daily plan:", e);
  }
}

export type QuizPlanSource = "daily" | "wrongbook";

export function saveWrongPracticePlan(plan: DailyPlan): void {
  writeJSON(WRONG_PRACTICE_PLAN_KEY, {
    ...plan,
    autoPlayedListeningGroups: plan.autoPlayedListeningGroups ?? [],
  });
}

export function startGrammarVariantPractice(questionIds: string[]): boolean {
  if (questionIds.length === 0) return false;
  saveWrongPracticePlan({
    questionIds,
    createdAt: new Date().toISOString(),
    cursor: 0,
  });
  return true;
}

export function clearWrongPracticePlan(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(WRONG_PRACTICE_PLAN_KEY);
  } catch (e) {
    console.warn("[storage] Failed to clear wrong-practice plan:", e);
  }
}

export function getQuizPlan():
  | { plan: DailyPlan; source: QuizPlanSource }
  | null {
  const wrongPracticePlan = readJSON<unknown>(WRONG_PRACTICE_PLAN_KEY, null);
  if (isDailyPlan(wrongPracticePlan)) {
    const age = Date.now() - new Date(wrongPracticePlan.createdAt).getTime();
    if (age > DAILY_PLAN_TTL_MS) {
      clearWrongPracticePlan();
    } else if (wrongPracticePlan.cursor < wrongPracticePlan.questionIds.length) {
      return { plan: wrongPracticePlan, source: "wrongbook" };
    } else {
      clearWrongPracticePlan();
    }
  }

  const dailyPlan = getDailyPlan();
  return dailyPlan ? { plan: dailyPlan, source: "daily" } : null;
}

export function saveQuizPlan(plan: DailyPlan, source: QuizPlanSource): void {
  if (source === "wrongbook") {
    saveWrongPracticePlan(plan);
  } else {
    saveDailyPlan(plan);
  }
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
