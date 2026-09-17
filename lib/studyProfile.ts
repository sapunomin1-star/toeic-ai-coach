import { isBrowser, readJSON, STORAGE_KEYS, writeJSON } from "@/lib/storageCore";

export const STUDY_MINUTES = [10, 15, 20, 30] as const;
export type StudyMinutes = (typeof STUDY_MINUTES)[number];
export const DEFAULT_STUDY_MINUTES: StudyMinutes = 20;

export type StudyProfile = {
  targetScore: number;
  currentScore: number | null;
  examDate: string | null;
  dailyMinutes: StudyMinutes;
};

export function isToeicScore(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) &&
    value >= 10 && value <= 990 && value % 5 === 0;
}

/** Date-only values must survive round trips; Date.parse accepts February 30. */
export function isCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function isStudyProfile(value: unknown): value is StudyProfile {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const profile = value as Partial<StudyProfile>;
  return isToeicScore(profile.targetScore) &&
    (profile.currentScore === null || isToeicScore(profile.currentScore)) &&
    (profile.examDate === null || isCalendarDate(profile.examDate)) &&
    STUDY_MINUTES.includes(profile.dailyMinutes as StudyMinutes);
}

export function getStudyProfile(): StudyProfile | null {
  const value = readJSON<unknown>(STORAGE_KEYS.studyProfile, null);
  return isStudyProfile(value) ? value : null;
}

export function saveStudyProfile(profile: StudyProfile): boolean {
  return isBrowser() && isStudyProfile(profile) && writeJSON(STORAGE_KEYS.studyProfile, profile);
}

/** Compare local calendar days, independent of UTC offsets and DST hours. */
export function daysUntilExam(examDate: string | null, now = new Date()): number | null {
  if (!isCalendarDate(examDate)) return null;
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((Date.parse(`${examDate}T00:00:00Z`) - today) / 86_400_000);
}

export function getGoalGuidance(profile: StudyProfile, now = new Date()): {
  label: string;
  detail: string;
} {
  const days = daysUntilExam(profile.examDate, now);
  if (days !== null && days < 0) {
    return { label: "準備下一個目標", detail: "原訂考試日期已過。更新日期或最近成績，接著安排下一階段。" };
  }
  if (days === 0) {
    return { label: "今天是考試日", detail: "簡單回顧熟悉的筆記，留時間休息與確認應試準備。" };
  }
  if (profile.currentScore !== null && profile.currentScore >= profile.targetScore) {
    return { label: "已達到你設定的目標", detail: "目前填寫的成績已達標；可以維持練習，或設定下一個想挑戰的分數。" };
  }
  if (days !== null && days <= 14) {
    return { label: "考前鞏固期", detail: "以到期錯題、熟字回想與模考檢討為主；另找完整時段確認應試節奏。" };
  }
  return { label: "穩定累積期", detail: `每段安排約 ${profile.dailyMinutes} 分鐘題目訓練，用完整題組逐步完成日課；單字另外安排。` };
}
