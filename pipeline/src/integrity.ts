import type { Question } from "../types/question";
import type { IntegrityReport } from "./types";

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

    // Invalid answers
    if (!["A", "B", "C", "D"].includes(q.answer)) {
      invalidAnswers.push(q.id);
    }

    // Missing choices
    if (
      !q.choices.A ||
      !q.choices.B ||
      !q.choices.C ||
      !q.choices.D
    ) {
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

  const passed =
    duplicateIds.length === 0 &&
    invalidAnswers.length === 0 &&
    missingChoices.length === 0 &&
    missingExplanation.length === 0 &&
    missingVocabulary.length === 0 &&
    missingTranscript.length === 0 &&
    missingPassage.length === 0;

  return {
    duplicateIds,
    invalidAnswers,
    missingChoices,
    missingExplanation,
    missingVocabulary,
    missingTranscript,
    missingPassage,
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
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}
