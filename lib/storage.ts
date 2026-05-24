import type {
  AnswerRecord,
  Choice,
  SkillTag,
  WrongBookStatus,
} from "@/types/question";
import { clearAllMockData } from "@/lib/mockStorage";

const ANSWER_KEY = "toeic_answer_records_v1";
const DAILY_PLAN_KEY = "toeic_daily_plan_v1";
const WRONG_STATUS_KEY = "toeic_wrong_status_v1";
const WRONG_PRACTICE_PLAN_KEY = "toeic_wrong_practice_plan_v1";

const DAILY_PLAN_TTL_MS = 24 * 60 * 60 * 1000;

const CHOICES = ["A", "B", "C", "D"] satisfies Choice[];
const SKILL_TAGS = [
  "passive_voice",
  "word_form",
  "tense",
  "preposition",
  "conjunction",
  "pronoun",
  "relative_clause",
  "business_vocabulary",
  "listening_photo",
  "listening_response",
  "listening_main_idea",
  "listening_inference",
  "listening_next_action",
  "reading_main_idea",
  "reading_detail",
  "reading_inference",
] satisfies SkillTag[];

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`[storage] Failed to read "${key}":`, e);
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): boolean {
  if (!isBrowser()) return true;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[storage] Failed to write "${key}":`, e);
    if (
      e instanceof DOMException &&
      (e.name === "QuotaExceededError" || e.code === 22)
    ) {
      alert(
        "儲存空間已滿，請匯出學習資料後清除舊紀錄。\n\n" +
          "請至 Dashboard → 清除所有學習紀錄"
      );
    }
    return false;
  }
}

function isChoice(value: unknown): value is Choice {
  return typeof value === "string" && CHOICES.includes(value as Choice);
}

function isSkillTag(value: unknown): value is SkillTag {
  return typeof value === "string" && SKILL_TAGS.includes(value as SkillTag);
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
    (r.responseTimeMs === undefined || typeof r.responseTimeMs === "number")
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
}

export function clearAllProgress(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(ANSWER_KEY);
    localStorage.removeItem(DAILY_PLAN_KEY);
    localStorage.removeItem(WRONG_STATUS_KEY);
    localStorage.removeItem(WRONG_PRACTICE_PLAN_KEY);
    clearAllMockData();
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
  "toeic_vocabulary_progress_v1",
  "toeic_mock_results_v1",
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
  // Preserve full AnswerRecord history for dashboard; only clear wrong status map
  writeJSON(WRONG_STATUS_KEY, {});
}

// IDs of wrong questions that should appear in daily review
export function getReviewableIds(): string[] {
  const map = getWrongStatusMap();
  return Object.entries(map)
    .filter(([, e]) => !e.dismissed && e.status !== "mastered")
    .map(([id]) => id);
}

// Legacy alias used by quiz page
export function getUniqueWrongQuestionIds(): string[] {
  return getReviewableIds();
}

export type WrongBookEntry = {
  questionId: string;
  skill_tag: SkillTag;
  status: WrongBookStatus;
  userAnswer: Choice;
  correctAnswer: Choice;
  lastAnsweredAt: string;
};

export function getWrongBookEntries(): WrongBookEntry[] {
  const statusMap = getWrongStatusMap();
  const allRecords = getAnswerRecords();

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
    });
  }

  return result;
}

// ─── Daily plan ────────────────────────────────────────────────────────────

export type DailyPlan = {
  questionIds: string[];
  createdAt: string;
  cursor: number;
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
    cursor >= 0
  );
}

export function saveDailyPlan(plan: DailyPlan): void {
  writeJSON(DAILY_PLAN_KEY, plan);
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
  writeJSON(WRONG_PRACTICE_PLAN_KEY, plan);
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
