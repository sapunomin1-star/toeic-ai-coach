import type { Question } from "@/types/question";

function getPassageGroupKey(q: Question): string | null {
  if (!q.passage) return null;
  return q.passage_group_id
    ? `${q.part}:${q.passage_group_id}:${q.passage}`
    : `${q.part}:passage:${q.passage}`;
}

export function groupByPassage(questions: Question[]): Question[][] {
  const groups = new Map<string, Question[]>();

  for (const q of questions) {
    const key = getPassageGroupKey(q);
    if (!key) continue;
    const group = groups.get(key) ?? [];
    group.push(q);
    groups.set(key, group);
  }

  return [...groups.values()].map((group) =>
    [...group].sort(
      (a, b) =>
        (a.question_order ?? Number.MAX_SAFE_INTEGER) -
        (b.question_order ?? Number.MAX_SAFE_INTEGER),
    ),
  );
}

export function groupByTranscript(questions: Question[]): Question[][] {
  const groups = new Map<string, Question[]>();

  for (const q of questions) {
    if (!q.transcript) continue;
    const key = `${q.part}:transcript:${q.transcript}`;
    const group = groups.get(key) ?? [];
    group.push(q);
    groups.set(key, group);
  }

  return [...groups.values()].map((group) =>
    [...group].sort(
      (a, b) =>
        (a.question_order ?? Number.MAX_SAFE_INTEGER) -
        (b.question_order ?? Number.MAX_SAFE_INTEGER),
    ),
  );
}
