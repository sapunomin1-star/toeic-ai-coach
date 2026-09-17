import type { AnswerRecord } from "@/types/question";

/** Exposure precedes source filtering: reviewing a mock item is never a new item. */
export function partitionAttempts(records: AnswerRecord[]): {
  fresh: AnswerRecord[];
  repeats: AnswerRecord[];
} {
  const ordered = records.slice().sort((a, b) => Date.parse(a.answeredAt) - Date.parse(b.answeredAt));
  const seen = new Set<string>();
  const fresh: AnswerRecord[] = [];
  const repeats: AnswerRecord[] = [];
  for (const record of ordered) {
    const repeated = seen.has(record.questionId) || record.attempt?.first === false || record.attempt?.plan === "wrongbook";
    (repeated ? repeats : fresh).push(record);
    seen.add(record.questionId);
  }
  return { fresh, repeats };
}
