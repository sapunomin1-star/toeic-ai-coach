import { getQuestionsByPart } from "@/data/questions";
import type { Question } from "@/types/question";

function getTranscriptGroup(question: Question): Question[] {
  if (
    (question.part !== "Part 3" && question.part !== "Part 4") ||
    !question.transcript
  ) {
    return [];
  }

  return getQuestionsByPart(question.part)
    .filter((candidate) => candidate.transcript === question.transcript)
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getListeningGroupKey(question: Question): string | null {
  const group = getTranscriptGroup(question);
  if (group.length === 0) return null;
  return `${question.part}:${group[0]!.id}`;
}

/**
 * P3/P4 group audio is stored once, on the canonical smallest-id question.
 * Resolve by full-bank transcript group instead of current plan order.
 */
export function getAudioOwnerQuestion(question: Question): Question {
  return getTranscriptGroup(question)[0] ?? question;
}
