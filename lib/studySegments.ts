import type { Part, Question } from "@/types/question";

const QUESTION_SECONDS: Record<Part, number> = {
  "Part 1": 30, "Part 2": 30, "Part 3": 50, "Part 4": 50,
  "Part 5": 38, "Part 6": 50, "Part 7": 65,
};

export type StudySegment = {
  start: number;
  /** Exclusive cursor, matching the persisted plan cursor. */
  end: number;
  estimatedMinutes: number;
};

function groupKey(question: Question): string {
  if (question.part === "Part 3" || question.part === "Part 4") {
    return `${question.part}:${question.transcript ?? question.id}`;
  }
  if (question.part === "Part 6" || question.part === "Part 7") {
    return `${question.part}:${question.passage_group_id ?? question.passage ?? question.id}`;
  }
  return question.id;
}

/** Suggest breaks without removing, reordering, or splitting passage/audio groups.
 * A group larger than the budget remains whole; time is an estimate, never a timer.
 */
export function buildStudySegments(questions: Question[], minutes: number): StudySegment[] {
  const budget = (Number.isFinite(minutes) && minutes > 0 ? minutes : 20) * 60;
  const segments: StudySegment[] = [];
  // Extend a unit to the last occurrence of its group, including non-contiguous
  // review entries. This also protects groups in legacy/imported plans.
  const lastIndex = new Map(questions.map((question, index) => [groupKey(question), index]));
  let start = 0;
  let seconds = 0;
  let index = 0;
  while (index < questions.length) {
    const unitStart = index;
    let unitEnd = lastIndex.get(groupKey(questions[index])) ?? index;
    let unitSeconds = 0;
    while (index <= unitEnd) {
      unitEnd = Math.max(unitEnd, lastIndex.get(groupKey(questions[index])) ?? index);
      unitSeconds += QUESTION_SECONDS[questions[index].part];
      index += 1;
    }
    if (seconds > 0 && seconds + unitSeconds > budget) {
      segments.push({ start, end: unitStart, estimatedMinutes: Math.max(1, Math.ceil(seconds / 60)) });
      start = unitStart;
      seconds = 0;
    }
    seconds += unitSeconds;
  }
  if (seconds > 0) {
    segments.push({ start, end: questions.length, estimatedMinutes: Math.max(1, Math.ceil(seconds / 60)) });
  }
  return segments;
}
