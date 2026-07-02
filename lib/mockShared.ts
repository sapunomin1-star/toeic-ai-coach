import type { MockPartBreakdown, MockPartKey, MockReviewMode } from "@/types/mock";
import type { Question } from "@/types/question";

/** Shared by the review page and every dashboard entry that links to one. */
export const MOCK_REVIEW_MODE_LABELS: Record<MockReviewMode, string> = {
  reading: "閱讀模擬考",
  listening: "聽力模擬考",
  full: "完整模擬考",
};

/**
 * Audio-group identity for the "no replay" mock rule:
 * - Part 3/4: 3 questions share the same transcript → group by transcript string
 * - Part 1/2: each question has its own audio → group by question id
 *
 * Once audible playback starts, the group is persisted into the mock session
 * so navigating away or refreshing the page does NOT restart partial audio.
 */
export function audioGroupKey(question: Question): string {
  if (
    (question.part === "Part 3" || question.part === "Part 4") &&
    question.transcript
  ) {
    return `${question.part}:${question.transcript}`;
  }
  return question.id;
}

export function getGroupPosition(
  questions: Question[],
  question: Question,
): { index: number; total: number } | null {
  if (
    (question.part !== "Part 3" && question.part !== "Part 4") ||
    !question.transcript
  ) {
    return null;
  }

  const groupKey = audioGroupKey(question);
  const group = questions.filter((candidate) => audioGroupKey(candidate) === groupKey);
  if (group.length <= 1) return null;

  const index = group.findIndex((candidate) => candidate.id === question.id);
  return { index: index >= 0 ? index + 1 : 1, total: group.length };
}

/** mm:ss countdown, rounding partial seconds up so 1ms still shows 00:01. */
export function formatTime(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

/** Zeroed correct/total counters for each part in scope. */
export function makeBreakdown(parts: MockPartKey[]): MockPartBreakdown {
  const breakdown: MockPartBreakdown = {};
  for (const part of parts) breakdown[part] = { correct: 0, total: 0 };
  return breakdown;
}
