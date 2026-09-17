import { PART_LIST, SKILL_TAG_LIST } from "@/types/question";
import type { Question } from "@/types/question";

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};
export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const text = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Validate unknown JSON/LLM output before treating it as a Question. No I/O or bank imports. */
export function validateQuestion(value: unknown, index = 0): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!isRecord(value))
    return {
      valid: false,
      errors: [`[${index}] Question must be an object`],
      warnings,
    };
  const q = value;
  const id = typeof q.id === "string" ? q.id : String(index);
  const error = (message: string) => errors.push(`[${id}] ${message}`);
  for (const field of [
    "id",
    "part",
    "question",
    "answer",
    "explanation_zh",
    "skill_tag",
    "difficulty",
  ]) {
    if (!text(q[field])) error(`Missing or invalid ${field}`);
  }
  if (!PART_LIST.some((part) => part === q.part))
    error(`Invalid part: ${q.part}`);
  if (!SKILL_TAG_LIST.some((skill) => skill === q.skill_tag))
    error(`Invalid skill_tag: ${q.skill_tag}`);
  if (!["A2", "B1", "B2", "C1"].includes(String(q.difficulty)))
    error(`Invalid difficulty: ${q.difficulty}`);
  const letters = q.part === "Part 2" ? ["A", "B", "C"] : ["A", "B", "C", "D"];
  if (!isRecord(q.choices)) error("Missing or invalid choices");
  else {
    for (const letter of letters)
      if (!text(q.choices[letter]))
        error(`Missing or invalid choice: ${letter}`);
    if (Object.keys(q.choices).some((key) => !letters.includes(key)))
      error("Unexpected choice key");
  }
  if (!letters.includes(String(q.answer))) error(`Invalid answer: ${q.answer}`);
  if (
    !Array.isArray(q.vocabulary) ||
    !q.vocabulary.length ||
    !q.vocabulary.every(text)
  )
    error("vocabulary must be a non-empty array of strings");
  else if (q.vocabulary.length < 3)
    warnings.push(`[${id}] vocabulary has fewer than 3 items`);
  if (typeof q.explanation_zh === "string" && q.explanation_zh.length < 20)
    warnings.push(`[${id}] explanation_zh is very short`);
  for (const field of [
    "explanation_en",
    "transcript",
    "passage",
    "passage_group_id",
    "imageUrl",
    "imageAlt",
    "audioUrl",
    "audioScript",
  ]) {
    if (q[field] !== undefined && !text(q[field])) error(`Invalid ${field}`);
  }
  for (const field of ["question_order", "passage_order"]) {
    if (
      q[field] !== undefined &&
      (typeof q[field] !== "number" ||
        !Number.isInteger(q[field]) ||
        q[field] < 1)
    )
      error(`Invalid ${field}`);
  }
  if (
    q.passage_group_type !== undefined &&
    (typeof q.passage_group_type !== "string" ||
      !["single", "double", "triple"].includes(q.passage_group_type))
  )
    error("Invalid passage_group_type");
  const audioChoices = q.audioChoices;
  if (audioChoices !== undefined) {
    if (
      !isRecord(audioChoices) ||
      letters.some((letter) => !text(audioChoices[letter])) ||
      Object.keys(audioChoices).some((letter) => !letters.includes(letter))
    )
      error("Invalid audioChoices");
  }
  if ((q.part === "Part 3" || q.part === "Part 4") && !text(q.transcript))
    error(`${q.part} requires transcript`);
  if ((q.part === "Part 6" || q.part === "Part 7") && !text(q.passage))
    error(`${q.part} requires passage`);
  if (
    q.part === "Part 6" &&
    typeof q.passage === "string" &&
    !/___\([A-D]\)___/.test(q.passage)
  )
    error("Part 6 passage has no labelled blanks");
  if (q.part === "Part 1" && !text(q.imageAlt))
    error("Part 1 requires imageAlt");
  if (q.part === "Part 1" || q.part === "Part 2") {
    const labels =
      q.part === "Part 2"
        ? ["Q:", "(A)", "(B)", "(C)"]
        : ["(A)", "(B)", "(C)", "(D)"];
    const script = q.audioScript;
    if (
      typeof script !== "string" ||
      !labels.every((label) => script.includes(label))
    )
      error(`${q.part} requires labelled audioScript`);
  }
  return { valid: errors.length === 0, errors, warnings };
}

/** A generator's one-passage batch. Multi-passage imports use parseQuestionPack instead. */
export function validateQuestionGroup(questions: unknown[]): ValidationResult {
  const results = questions.map(validateQuestion);
  const errors = results.flatMap((result) => result.errors);
  const warnings = results.flatMap((result) => result.warnings);
  for (const part of ["Part 6", "Part 7"]) {
    const passages = new Set(
      questions
        .filter(isRecord)
        .filter((q) => q.part === part)
        .map((q) => q.passage),
    );
    if (passages.size > 1)
      errors.push(`${part} group: not all questions share the same passage`);
  }
  return { valid: errors.length === 0, errors, warnings };
}

/** Type assertion used only after the runtime validator succeeds. */
export function parseQuestion(value: unknown, index = 0): Question {
  const result = validateQuestion(value, index);
  if (!result.valid) throw new Error(result.errors.join("\n"));
  return value as Question;
}
