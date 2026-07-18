import { questionBank } from "@/lib/questionBank";
import type { Question } from "@/types/question";

// The bank is immutable after load and these lookups run in render paths
// (every countdown tick during listening mocks), so cache each transcript
// group instead of re-scanning ~1900 questions per call.
const transcriptGroupCache = new Map<string, Question[]>();

function getTranscriptGroup(question: Question): Question[] {
  if (
    (question.part !== "Part 3" && question.part !== "Part 4") ||
    !question.transcript
  ) {
    return [];
  }

  const cacheKey = `${question.part}:${question.transcript}`;
  const cached = transcriptGroupCache.get(cacheKey);
  if (cached) return cached;

  const group = questionBank()
    .getQuestionsByPart(question.part)
    .filter((candidate) => candidate.transcript === question.transcript)
    .sort((a, b) => a.id.localeCompare(b.id));
  transcriptGroupCache.set(cacheKey, group);
  return group;
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
