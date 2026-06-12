import type { RawGeneratedQuestion, ValidationResult } from "./types";
import type { Choice, Difficulty } from "../../types/question";
// Part / skill validity derives from the single-source-of-truth registries in
// types/question.ts (PARTS / SKILLS). Add a part or skill there and the
// pipeline validator picks it up automatically — no second list to maintain.
import { PART_LIST, SKILL_TAG_LIST } from "../../types/question";

const VALID_CHOICES: Choice[] = ["A", "B", "C", "D"];
const VALID_PART2_CHOICES: Choice[] = ["A", "B", "C"];
const VALID_DIFFICULTY: Difficulty[] = ["A2", "B1", "B2", "C1"];

export function validateQuestion(
  q: Partial<RawGeneratedQuestion>,
  index: number
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields exist
  if (!q.id) errors.push(`[${index}] Missing id`);
  if (!q.part) errors.push(`[${index}] Missing part`);
  if (!q.question) errors.push(`[${index}] Missing question`);
  if (!q.choices) errors.push(`[${index}] Missing choices`);
  if (!q.answer) errors.push(`[${index}] Missing answer`);
  if (!q.explanation_zh) errors.push(`[${index}] Missing explanation_zh`);
  if (!q.skill_tag) errors.push(`[${index}] Missing skill_tag`);
  if (!q.difficulty) errors.push(`[${index}] Missing difficulty`);
  if (!q.vocabulary) errors.push(`[${index}] Missing vocabulary`);

  if (errors.length > 0) return { valid: false, errors, warnings };

  // Validate types
  if (!PART_LIST.includes(q.part!)) {
    errors.push(`[${q.id}] Invalid part: ${q.part}`);
  }

  // Validate choices
  const requiredChoices = q.part === "Part 2" ? VALID_PART2_CHOICES : VALID_CHOICES;
  for (const key of requiredChoices) {
    if (!q.choices![key] || typeof q.choices![key] !== "string") {
      errors.push(`[${q.id}] Missing or invalid choice: ${key}`);
    }
  }
  if (q.part === "Part 2" && q.choices!.D !== undefined) {
    errors.push(`[${q.id}] Part 2 choices.D must be undefined`);
  }

  // Validate answer
  const validAnswers = q.part === "Part 2" ? VALID_PART2_CHOICES : VALID_CHOICES;
  if (!validAnswers.includes(q.answer!)) {
    errors.push(`[${q.id}] Invalid answer: ${q.answer}`);
  }

  // Check answer matches a choice
  if (
    q.choices &&
    q.answer &&
    VALID_CHOICES.includes(q.answer) &&
    q.choices[q.answer] === undefined
  ) {
    errors.push(`[${q.id}] Answer ${q.answer} has no choice text`);
  }

  // Validate skill_tag
  if (!SKILL_TAG_LIST.includes(q.skill_tag!)) {
    errors.push(`[${q.id}] Invalid skill_tag: ${q.skill_tag}`);
  }

  // Validate difficulty
  if (!VALID_DIFFICULTY.includes(q.difficulty!)) {
    errors.push(`[${q.id}] Invalid difficulty: ${q.difficulty}`);
  }

  // Validate vocabulary
  if (!Array.isArray(q.vocabulary)) {
    errors.push(`[${q.id}] vocabulary is not an array`);
  } else if (q.vocabulary!.length < 3) {
    warnings.push(`[${q.id}] vocabulary has fewer than 3 items`);
  }

  // Validate explanation_zh
  if (q.explanation_zh && q.explanation_zh.length < 20) {
    warnings.push(
      `[${q.id}] explanation_zh is very short (${q.explanation_zh.length} chars)`
    );
  }

  // Validate passage for Part 6 and Part 7
  if ((q.part === "Part 6" || q.part === "Part 7") && !q.passage) {
    errors.push(`[${q.id}] ${q.part} requires passage`);
  }

  // Validate Part 6 blanks
  if (q.part === "Part 6" && q.passage) {
    const blankCount = (q.passage.match(/___\([A-D]\)___/g) ?? []).length;
    if (blankCount === 0) {
      errors.push(
        `[${q.id}] Part 6 passage has no blanks (e.g. ____(A)____)`
      );
    }
  }

  // Validate Part 1 listening/photo schema
  if (q.part === "Part 1") {
    if (!q.imageAlt || typeof q.imageAlt !== "string") {
      errors.push(`[${q.id}] Part 1 requires imageAlt`);
    }
    const labels = ["(A)", "(B)", "(C)", "(D)"];
    if (
      !q.audioScript ||
      typeof q.audioScript !== "string" ||
      !labels.every((label) => q.audioScript!.includes(label))
    ) {
      errors.push(`[${q.id}] Part 1 requires audioScript with (A)/(B)/(C)/(D) statements`);
    }
  }

  // Validate Part 2 listening response schema
  if (q.part === "Part 2") {
    const labels = ["Q:", "(A)", "(B)", "(C)"];
    if (
      !q.audioScript ||
      typeof q.audioScript !== "string" ||
      !labels.every((label) => q.audioScript!.includes(label))
    ) {
      errors.push(`[${q.id}] Part 2 requires audioScript with Q and (A)/(B)/(C) responses`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateQuestionGroup(
  questions: Partial<RawGeneratedQuestion>[]
): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  for (let i = 0; i < questions.length; i++) {
    const result = validateQuestion(questions[i], i);
    allErrors.push(...result.errors);
    allWarnings.push(...result.warnings);
  }

  // Extra: Part 6 — all questions in group must share same passage
  const part6s = questions.filter((q) => q.part === "Part 6");
  if (part6s.length > 1) {
    const passages = new Set(part6s.map((q) => q.passage));
    if (passages.size > 1) {
      allErrors.push(
        "Part 6 group: not all questions share the same passage"
      );
    }
  }

  // Extra: Part 7 — all questions in group must share same passage
  const part7s = questions.filter((q) => q.part === "Part 7");
  if (part7s.length > 1) {
    const passages = new Set(part7s.map((q) => q.passage));
    if (passages.size > 1) {
      allErrors.push(
        "Part 7 group: not all questions share the same passage"
      );
    }
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}
