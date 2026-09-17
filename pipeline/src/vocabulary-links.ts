import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { VOCABULARY } from "../../data/vocabulary";
import { QUESTION_SENSES, TERM_GLOSSES } from "../../data/vocabulary-support";
import { createTermResolver, normalizeTerm } from "../../lib/termResolution";
import type { Question } from "../../types/question";

/**
 * Question-term linkage gate (2026-09-16 review, F02).
 *
 * Every term in a question's `vocabulary` array is shown to the learner as a
 * teaching item after they answer. The 2026-09-12 audit found 67% of those
 * links resolved to nothing, so the panel told a struggling learner to "work
 * it out from context" 7,822 times. The app now resolves terms through
 * lib/termResolution (per-question senses → cards, with inflections → general
 * glosses → phrase components → missing) and this check runs the SAME
 * resolver over the whole bank.
 *
 * It is a ratchet, not a cliff: `components` and `missing` links are debt.
 * The known debt lives in pipeline/baselines/vocabulary-link-debt.json; new
 * debt (a link not in the baseline) fails the check, retired debt is reported
 * and can be committed with `--update-baseline`. So a new question cannot
 * ship with an unteachable term, while the 7k historical gap shrinks in the
 * open instead of blocking every other change.
 */

/** Relative to the pipeline directory; run-integrity.ts resolves it. */
export const VOCABULARY_LINK_BASELINE_FILE = "baselines/vocabulary-link-debt.json";

export type VocabularyLinkReport = {
  references: number;
  tiers: Record<"sense" | "cardExact" | "cardInflection" | "glossExact" | "glossInflection" | "components" | "missing", number>;
  /** Questions where NO term is fully resolved (sense/card/gloss). */
  questionsWithoutSupport: number;
  fullyResolvedRate: number;
  /** "questionId :: term" for every components/missing link. */
  debt: string[];
  newDebt: string[];
  retiredDebt: string[];
  baselineSize: number | null;
  passed: boolean;
};

function debtKey(questionId: string, term: string): string {
  return `${questionId} :: ${normalizeTerm(term)}`;
}

export function readVocabularyLinkBaseline(path: string): Set<string> | null {
  if (!existsSync(path)) return null;
  const parsed: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(parsed)) return null;
  return new Set(parsed.filter((row): row is string => typeof row === "string"));
}

export function writeVocabularyLinkBaseline(path: string, debt: string[]): void {
  writeFileSync(path, `${JSON.stringify([...debt].sort(), null, 0)}\n`);
}

export function buildVocabularyLinkReport(
  questions: Question[],
  baseline: Set<string> | null,
): VocabularyLinkReport {
  const resolver = createTermResolver({
    items: VOCABULARY,
    glosses: TERM_GLOSSES,
    senses: QUESTION_SENSES,
  });
  const tiers: VocabularyLinkReport["tiers"] = {
    sense: 0, cardExact: 0, cardInflection: 0, glossExact: 0, glossInflection: 0, components: 0, missing: 0,
  };
  const debt: string[] = [];
  let references = 0;
  let questionsWithoutSupport = 0;

  for (const question of questions) {
    const terms = [...new Set((question.vocabulary ?? []).map(normalizeTerm).filter(Boolean))];
    let supported = 0;
    for (const term of terms) {
      references += 1;
      const resolution = resolver.resolve(term, question.id);
      switch (resolution.kind) {
        case "sense":
          tiers.sense += 1; supported += 1; break;
        case "card":
          tiers[resolution.match === "exact" ? "cardExact" : "cardInflection"] += 1; supported += 1; break;
        case "gloss":
          tiers[resolution.match === "exact" ? "glossExact" : "glossInflection"] += 1; supported += 1; break;
        case "components":
          tiers.components += 1; debt.push(debtKey(question.id, term)); break;
        case "missing":
          tiers.missing += 1; debt.push(debtKey(question.id, term)); break;
      }
    }
    if (terms.length > 0 && supported === 0) questionsWithoutSupport += 1;
  }

  const debtSet = new Set(debt);
  const newDebt = baseline ? debt.filter((row) => !baseline.has(row)) : [];
  const retiredDebt = baseline ? [...baseline].filter((row) => !debtSet.has(row)) : [];
  const fullyResolved = references - debt.length;
  return {
    references,
    tiers,
    questionsWithoutSupport,
    fullyResolvedRate: references === 0 ? 1 : fullyResolved / references,
    debt,
    newDebt,
    retiredDebt,
    baselineSize: baseline ? baseline.size : null,
    // No baseline yet = first run; write one with --update-baseline.
    passed: baseline !== null && newDebt.length === 0,
  };
}

export function printVocabularyLinkReport(report: VocabularyLinkReport): void {
  const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Question-term Link Report");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Term references:        ${report.references}`);
  console.log(`  Per-question senses:    ${report.tiers.sense}`);
  console.log(`  Cards (exact/inflect):  ${report.tiers.cardExact} / ${report.tiers.cardInflection}`);
  console.log(`  Glosses (exact/inflect):${report.tiers.glossExact} / ${report.tiers.glossInflection}`);
  console.log(`  Components only:        ${report.tiers.components}`);
  console.log(`  Missing:                ${report.tiers.missing}`);
  console.log(`  Fully resolved:         ${pct(report.fullyResolvedRate)}`);
  console.log(`  Questions w/o support:  ${report.questionsWithoutSupport}`);
  console.log(
    `  Debt vs baseline:       ${report.debt.length} now / ${report.baselineSize ?? "no baseline"} baseline · new ${report.newDebt.length} · retired ${report.retiredDebt.length}`,
  );
  console.log(`  Status: ${report.passed ? "PASSED" : "FAILED"}`);
  if (report.baselineSize === null) {
    console.log("\n  - No baseline file. Run `npm run check -- --update-baseline` once to record the known debt.");
  }
  if (report.newDebt.length > 0) {
    console.log(
      `\n  - New unteachable links (add a gloss in data/term-glosses.ts, a sense in data/question-senses.ts, or a card):\n      ${report.newDebt.slice(0, 40).join("\n      ")}${report.newDebt.length > 40 ? `\n      … ${report.newDebt.length - 40} more` : ""}`,
    );
  }
  if (report.retiredDebt.length > 0) {
    console.log(`\n  - ${report.retiredDebt.length} baseline links are now resolved; run with --update-baseline to shrink the baseline.`);
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

/** Convenience for run-integrity.ts: build, optionally rewrite the baseline, print. */
export function checkVocabularyLinks(
  questions: Question[],
  options: { baselinePath: string; updateBaseline?: boolean },
): VocabularyLinkReport {
  const baseline = readVocabularyLinkBaseline(options.baselinePath);
  let report = buildVocabularyLinkReport(questions, baseline);
  if (options.updateBaseline && (baseline === null || report.newDebt.length === 0)) {
    writeVocabularyLinkBaseline(options.baselinePath, report.debt);
    report = buildVocabularyLinkReport(questions, new Set(report.debt));
    console.log(`  (baseline rewritten: ${report.debt.length} links)`);
  }
  printVocabularyLinkReport(report);
  return report;
}
