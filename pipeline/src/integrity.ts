import type { Question } from "../../types/question";
import type { IntegrityReport } from "./types";

/**
 * Answer-position balance guard. A skewed key distribution lets students
 * score above chance by always picking the most common letter, which inflates
 * practice accuracy and corrupts weak-point analysis and mock score estimates.
 * Each letter's share must stay within these bounds (only enforced for parts
 * with a meaningful sample size).
 */
const BALANCE_MIN_SAMPLE = 40;
const FOUR_CHOICE_BOUNDS = { min: 0.18, max: 0.32 }; // ideal 0.25
const THREE_CHOICE_BOUNDS = { min: 0.25, max: 0.42 }; // ideal 0.333 (Part 2)

function checkAnswerBalance(questions: Question[]): string[] {
  const violations: string[] = [];
  const byPart = new Map<string, Question[]>();
  for (const q of questions) {
    const group = byPart.get(q.part) ?? [];
    group.push(q);
    byPart.set(q.part, group);
  }

  for (const [part, qs] of byPart) {
    if (qs.length < BALANCE_MIN_SAMPLE) continue;
    const letters = part === "Part 2" ? (["A", "B", "C"] as const) : (["A", "B", "C", "D"] as const);
    const bounds = part === "Part 2" ? THREE_CHOICE_BOUNDS : FOUR_CHOICE_BOUNDS;
    for (const letter of letters) {
      const count = qs.filter((q) => q.answer === letter).length;
      const share = count / qs.length;
      if (share < bounds.min || share > bounds.max) {
        violations.push(
          `${part}: ${letter}=${Math.round(share * 100)}% (${count}/${qs.length}), expected ${Math.round(bounds.min * 100)}-${Math.round(bounds.max * 100)}%`,
        );
      }
    }
  }
  return violations;
}

/**
 * Group-structure guard: P3/P4 transcript groups must have exactly 3
 * questions, P6 passage groups exactly 4. Incomplete groups break the daily
 * plan and mock planners, which select whole groups.
 */
function checkGroupStructure(questions: Question[]): string[] {
  const violations: string[] = [];

  for (const part of ["Part 3", "Part 4"] as const) {
    const groups = new Map<string, number>();
    for (const q of questions) {
      if (q.part !== part || !q.transcript) continue;
      const key = q.transcript;
      groups.set(key, (groups.get(key) ?? 0) + 1);
    }
    for (const [key, size] of groups) {
      if (size !== 3) {
        violations.push(
          `${part} transcript group has ${size} questions (expected 3): "${key.slice(0, 60)}..."`,
        );
      }
    }
  }

  const p6Groups = new Map<string, number>();
  for (const q of questions) {
    if (q.part !== "Part 6") continue;
    const key = q.passage_group_id ?? q.passage ?? q.id;
    p6Groups.set(key, (p6Groups.get(key) ?? 0) + 1);
  }
  for (const [key, size] of p6Groups) {
    if (size !== 4) {
      violations.push(`Part 6 group "${key}" has ${size} questions (expected 4)`);
    }
  }

  return violations;
}

/**
 * Explanation/answer-consistency guard. The documented failure mode of AI-
 * generated items is an `answer` field that disagrees with the letter the
 * Chinese explanation actually argues for (e.g. answer:"C" while the rationale
 * concludes 「正確答案為 A」). Structural checks miss this because both the
 * letter and the choice text are individually valid. We only flag when the
 * explanation states a letter with a strong lead-in ("正解/答案為 X"), and only
 * when none of the stated letters match `answer` — so prose that merely
 * mentions other options in passing does not trip the guard.
 */
function checkExplanationAnswerConsistency(questions: Question[]): string[] {
  const declareRe =
    /(?:正確答案|正解|正答|答案|應選|故選|因此選|所以選|答案應為|答案應該為|答案選)\s*(?:為|是|应为|應為|選|:|：)?\s*[「『"'（(]?\s*([A-D])(?![0-9A-Za-z])/g;
  const violations: string[] = [];
  for (const q of questions) {
    const text = q.explanation_zh ?? "";
    if (!text) continue;
    const declared = new Set<string>();
    let m: RegExpExecArray | null;
    declareRe.lastIndex = 0;
    while ((m = declareRe.exec(text)) !== null) declared.add(m[1]);
    if (declared.size > 0 && !declared.has(q.answer)) {
      violations.push(
        `${q.id}: answer=${q.answer} but explanation declares ${[...declared].join("/")}`,
      );
    }
  }
  return violations;
}

/**
 * Duplicate-stem guard. For Part 2 the question text IS the spoken stem and
 * for Part 5 it is the full test sentence — exact duplicates mean the student
 * can meet the same item twice in one mock. (Other parts legitimately repeat
 * stems like "What is the main purpose of this email?" across passages.)
 */
const UNIQUE_STEM_PARTS = new Set(["Part 2", "Part 5"]);

function checkDuplicateStems(questions: Question[]): string[] {
  const violations: string[] = [];
  for (const part of UNIQUE_STEM_PARTS) {
    const seen = new Map<string, string[]>();
    for (const q of questions) {
      if (q.part !== part) continue;
      const key = q.question.trim();
      const ids = seen.get(key) ?? [];
      ids.push(q.id);
      seen.set(key, ids);
    }
    for (const [stem, ids] of seen) {
      if (ids.length > 1) {
        violations.push(`${part} duplicate stem (${ids.join(", ")}): "${stem.slice(0, 60)}"`);
      }
    }
  }
  return violations;
}

export function runIntegrityCheck(questions: Question[]): IntegrityReport {
  const ids = new Set<string>();
  const duplicateIds: string[] = [];
  const invalidAnswers: string[] = [];
  const missingChoices: string[] = [];
  const missingExplanation: string[] = [];
  const missingVocabulary: string[] = [];
  const missingTranscript: string[] = [];
  const missingPassage: string[] = [];

  for (const q of questions) {
    // Duplicate IDs
    if (ids.has(q.id)) {
      duplicateIds.push(q.id);
    }
    ids.add(q.id);

    const requiredChoices =
      q.part === "Part 2" ? (["A", "B", "C"] as const) : (["A", "B", "C", "D"] as const);

    // Invalid answers
    if (!requiredChoices.some((choice) => choice === q.answer)) {
      invalidAnswers.push(q.id);
    }

    // Missing choices
    if (requiredChoices.some((choice) => !q.choices[choice])) {
      missingChoices.push(q.id);
    }

    if (q.part === "Part 2" && q.choices.D !== undefined) {
      missingChoices.push(q.id);
    }

    // Missing explanation_zh
    if (!q.explanation_zh || q.explanation_zh.trim().length === 0) {
      missingExplanation.push(q.id);
    }

    // Missing vocabulary
    if (!q.vocabulary || q.vocabulary.length === 0) {
      missingVocabulary.push(q.id);
    }

    // Missing transcript for Part 3/4
    if (
      (q.part === "Part 3" || q.part === "Part 4") &&
      (!q.transcript || q.transcript.trim().length === 0)
    ) {
      missingTranscript.push(q.id);
    }

    // Missing passage for Part 6/7
    if (
      (q.part === "Part 6" || q.part === "Part 7") &&
      (!q.passage || q.passage.trim().length === 0)
    ) {
      missingPassage.push(q.id);
    }
  }

  const answerBalanceViolations = checkAnswerBalance(questions);
  const groupStructureViolations = [
    ...checkGroupStructure(questions),
    ...checkDuplicateStems(questions),
  ];
  const explanationAnswerMismatches = checkExplanationAnswerConsistency(questions);

  const passed =
    duplicateIds.length === 0 &&
    invalidAnswers.length === 0 &&
    missingChoices.length === 0 &&
    missingExplanation.length === 0 &&
    missingVocabulary.length === 0 &&
    missingTranscript.length === 0 &&
    missingPassage.length === 0 &&
    answerBalanceViolations.length === 0 &&
    groupStructureViolations.length === 0 &&
    explanationAnswerMismatches.length === 0;

  return {
    duplicateIds,
    invalidAnswers,
    missingChoices,
    missingExplanation,
    missingVocabulary,
    missingTranscript,
    missingPassage,
    answerBalanceViolations,
    groupStructureViolations,
    explanationAnswerMismatches,
    totalQuestions: questions.length,
    passed,
  };
}

export function printIntegrityReport(report: IntegrityReport): void {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Data Integrity Report");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Total questions: ${report.totalQuestions}`);
  console.log(`  Duplicate IDs:   ${report.duplicateIds.length}`);
  console.log(`  Invalid answers: ${report.invalidAnswers.length}`);
  console.log(`  Missing choices: ${report.missingChoices.length}`);
  console.log(
    `  Missing explanation_zh: ${report.missingExplanation.length}`
  );
  console.log(
    `  Missing vocabulary:     ${report.missingVocabulary.length}`
  );
  console.log(
    `  Missing transcript:     ${report.missingTranscript.length}`
  );
  console.log(
    `  Missing passage:        ${report.missingPassage.length}`
  );
  console.log(
    `  Answer balance issues:  ${report.answerBalanceViolations.length}`
  );
  console.log(
    `  Group structure issues: ${report.groupStructureViolations.length}`
  );
  console.log(
    `  Explanation/answer mismatches: ${report.explanationAnswerMismatches.length}`
  );
  console.log(
    `  Status: ${report.passed ? "PASSED" : "FAILED"}`
  );

  if (!report.passed) {
    console.log("\n  Details:");
    if (report.duplicateIds.length > 0)
      console.log(`  - Duplicate IDs: ${report.duplicateIds.join(", ")}`);
    if (report.invalidAnswers.length > 0)
      console.log(`  - Invalid answers: ${report.invalidAnswers.join(", ")}`);
    if (report.missingChoices.length > 0)
      console.log(
        `  - Missing choices: ${report.missingChoices.join(", ")}`
      );
    if (report.missingExplanation.length > 0)
      console.log(
        `  - Missing explanation_zh: ${report.missingExplanation.join(", ")}`
      );
    if (report.missingVocabulary.length > 0)
      console.log(
        `  - Missing vocabulary: ${report.missingVocabulary.join(", ")}`
      );
    if (report.answerBalanceViolations.length > 0)
      console.log(
        `  - Answer balance: ${report.answerBalanceViolations.join("; ")}`
      );
    if (report.groupStructureViolations.length > 0)
      console.log(
        `  - Group structure:\n      ${report.groupStructureViolations.join("\n      ")}`
      );
    if (report.explanationAnswerMismatches.length > 0)
      console.log(
        `  - Explanation/answer mismatches:\n      ${report.explanationAnswerMismatches.join("\n      ")}`
      );
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}
