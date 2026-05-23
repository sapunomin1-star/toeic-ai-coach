import type { RawGeneratedQuestion, ValidationResult } from "./types";
import type { Choice, SkillTag, Part, Difficulty } from "../types/question";

const VALID_PARTS: Part[] = ["Part 5", "Part 3", "Part 4", "Part 6", "Part 7"];
const VALID_CHOICES: Choice[] = ["A", "B", "C", "D"];
const VALID_DIFFICULTY: Difficulty[] = ["A2", "B1", "B2"];
const VALID_SKILL_TAGS: SkillTag[] = [
  "passive_voice",
  "word_form",
  "tense",
  "preposition",
  "conjunction",
  "pronoun",
  "relative_clause",
  "business_vocabulary",
  "listening_main_idea",
  "listening_inference",
  "listening_next_action",
  "reading_main_idea",
  "reading_detail",
  "reading_inference",
];

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
  if (!VALID_PARTS.includes(q.part!)) {
    errors.push(`[${q.id}] Invalid part: ${q.part}`);
  }

  // Validate choices
  for (const key of VALID_CHOICES) {
    if (!q.choices![key] || typeof q.choices![key] !== "string") {
      errors.push(`[${q.id}] Missing or invalid choice: ${key}`);
    }
  }

  // Validate answer
  if (!VALID_CHOICES.includes(q.answer!)) {
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
  if (!VALID_SKILL_TAGS.includes(q.skill_tag!)) {
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
