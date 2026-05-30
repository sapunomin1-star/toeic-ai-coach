import type { Choice } from "@/types/question";

/**
 * Single source of truth for every localStorage key the app uses.
 * Never rename a value without a migration: existing user data is keyed by it.
 */
export const STORAGE_KEYS = {
  answerRecords: "toeic_answer_records_v1",
  dailyPlan: "toeic_daily_plan_v1",
  wrongStatus: "toeic_wrong_status_v1",
  wrongPracticePlan: "toeic_wrong_practice_plan_v1",
  vocabularyProgress: "toeic_vocabulary_progress_v1",
  vocabularyDailySession: "toeic_vocabulary_daily_session_v1",
  readingMockSession: "toeic_mock_session_v1",
  readingMockResults: "toeic_mock_results_v1",
  listeningMockSession: "toeic_listening_mock_session_v1",
  listeningMockResults: "toeic_listening_mock_results_v1",
  fullMockSession: "toeic_full_mock_session_v1",
  fullMockResults: "toeic_full_mock_results_v1",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function readJSON<T>(key: string, fallback: T): T {
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

/**
 * Persist a JSON value. Returns false on failure. On QuotaExceededError it
 * alerts the user so silent data loss cannot happen (localStorage is 5-10MB).
 */
export function writeJSON<T>(key: string, value: T): boolean {
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

export function removeKey(key: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`[storage] Failed to remove "${key}":`, e);
  }
}

const CHOICES = ["A", "B", "C", "D"] satisfies Choice[];

export function isChoice(value: unknown): value is Choice {
  return typeof value === "string" && CHOICES.includes(value as Choice);
}

export function isValidDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}
