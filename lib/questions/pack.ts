import type { Question } from "@/types/question";
import { isRecord, parseQuestion } from "./validation";
import type { QuestionBankSource } from "./catalog";

export type QuestionPack = QuestionBankSource & { schemaVersion: 1 };
export const BANK_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const QUESTION_FIELDS = new Set([
  "id",
  "part",
  "question",
  "choices",
  "answer",
  "explanation_zh",
  "explanation_en",
  "skill_tag",
  "difficulty",
  "vocabulary",
  "transcript",
  "passage",
  "passage_group_id",
  "passage_group_type",
  "passage_order",
  "question_order",
  "imageUrl",
  "imageAlt",
  "audioUrl",
  "audioChoices",
  "audioScript",
]);

/** Versioned, complete content pack. Drafts never enter the runtime catalog. */
export function parseQuestionPack(value: unknown): QuestionPack {
  if (!isRecord(value) || value.schemaVersion !== 1)
    throw new Error("Question pack requires schemaVersion: 1");
  if (
    Object.keys(value).some(
      (key) => !["schemaVersion", "id", "title", "questions"].includes(key),
    )
  )
    throw new Error("Unknown question pack field");
  if (typeof value.id !== "string" || !BANK_ID_PATTERN.test(value.id))
    throw new Error("Bank id must use lowercase letters, digits and hyphens");
  if (typeof value.title !== "string" || !value.title.trim())
    throw new Error("Question pack requires a title");
  if (!Array.isArray(value.questions) || value.questions.length === 0)
    throw new Error("Question pack requires at least one completed question");
  const questions = value.questions.map((item, index) => {
    const question = parseQuestion(item, index);
    if (Object.keys(question).some((key) => !QUESTION_FIELDS.has(key)))
      throw new Error(`[${question.id}] Unknown question field`);
    // Existing history analytics infer the Part from the stable id prefix.
    if (
      !new RegExp(
        `^p${question.part.slice(-1)}-[a-z0-9]+(?:-[a-z0-9]+)*$`,
      ).test(question.id)
    )
      throw new Error(
        `[${question.id}] id must begin with p${question.part.slice(-1)}- and contain lowercase letters, digits or hyphens`,
      );
    return question;
  });
  assertCompleteGroups(questions);
  return { schemaVersion: 1, id: value.id, title: value.title, questions };
}

function assertCompleteGroups(questions: Question[]): void {
  const ids = new Set<string>();
  const groups = new Map<string, Question[]>();
  for (const q of questions) {
    if (ids.has(q.id)) throw new Error(`Duplicate question id: ${q.id}`);
    ids.add(q.id);
    const reading = q.part === "Part 6" || q.part === "Part 7";
    const listening = q.part === "Part 3" || q.part === "Part 4";
    if (!reading && !listening) continue;
    if (reading && !q.passage_group_id)
      throw new Error(`[${q.id}] passage_group_id is required`);
    const key = reading
      ? `passage:${q.passage_group_id}`
      : `${q.part}:${q.transcript}`;
    const group = groups.get(key) ?? [];
    group.push(q);
    groups.set(key, group);
  }
  for (const [key, group] of groups) {
    const first = group[0];
    const part7 = first.part === "Part 7";
    const expected =
      first.part === "Part 6"
        ? 4
        : part7
          ? first.passage_group_type === "single"
            ? null
            : 5
          : 3;
    if (
      group.some(
        (q) =>
          q.part !== first.part ||
          q.passage !== first.passage ||
          q.transcript !== first.transcript ||
          q.passage_group_type !== first.passage_group_type,
      )
    )
      throw new Error(`Inconsistent content or Part in group ${key}`);
    if (part7 && !first.passage_group_type)
      throw new Error(`[${first.id}] Part 7 requires passage_group_type`);
    if (
      expected
        ? group.length !== expected
        : group.length < 2 || group.length > 4
    )
      throw new Error(
        `[${first.id}] Incomplete group: ${group.length} questions; expected ${expected ?? "2–4"}`,
      );
    const orders = group
      .map((q) => q.question_order)
      .sort((a, b) => (a ?? 0) - (b ?? 0));
    if (orders.some((order, index) => order !== index + 1))
      throw new Error(
        `[${first.id}] question_order must cover 1..${group.length} exactly once`,
      );
    if (first.part === "Part 6") {
      const labels = ["A", "B", "C", "D"];
      if (
        labels.some(
          (label) => first.passage!.split(`____(${label})____`).length !== 2,
        )
      )
        throw new Error(
          `[${first.id}] Part 6 requires exactly four blanks A–D`,
        );
      if (
        group.some(
          (q) =>
            q.question.match(/____\(([A-D])\)____/)?.[1] !==
            labels[q.question_order! - 1],
        )
      )
        throw new Error(
          `[${first.id}] Part 6 question_order must match its blank label`,
        );
    }
  }
}
