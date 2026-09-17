/**
 * Learning-quality audit, post-remediation baseline (report only).
 *
 * The 2026-09-12 version of this script asserted the DEFECTS it found so the
 * review could reproduce them. Those defects are fixed (see
 * docs/audits/2026-09-12-learning-quality/REMEDIATION.md) and the desired
 * behaviour is now guarded by scripts/learning-quality-check.ts in `npm test`.
 * This script re-runs the same scans and synthetic scenarios and writes
 * `evidence-after.json` next to the original evidence, so the before/after can
 * be compared with the same instruments. Synthetic storage only; it never
 * reads learner data or cloud state.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { QUESTIONS } from "../data/questions";
import { VOCABULARY } from "../data/vocabulary";
import { QUESTION_SENSES, TERM_GLOSSES } from "../data/vocabulary-support";
import { createTermResolver, normalizeTerm } from "../lib/termResolution";
import { PART_LIST, SKILL_TAG_LIST, type AnswerRecord } from "../types/question";
import type { VocabularyProgress } from "../types/vocabulary";
import * as analysis from "../lib/analysis";
import { buildPacingReport } from "../lib/pacing";
import * as vocab from "../lib/vocabularyStorage";

class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
  clear() { this.data.clear(); }
}

type Tier = "sense" | "cardExact" | "cardInflection" | "glossExact" | "glossInflection" | "components" | "missing";

async function main() {
  const memory = new MemoryStorage();
  Object.defineProperty(globalThis, "localStorage", { value: memory, configurable: true });
  Object.defineProperty(globalThis, "window", { value: { localStorage: memory }, configurable: true });
  Object.defineProperty(globalThis, "alert", { value: () => {}, configurable: true });
  await vocab.loadVocabularyBank();

  // ── Question-term links, same resolver the app and the pipeline gate use ──
  const resolver = createTermResolver({ items: VOCABULARY, glosses: TERM_GLOSSES, senses: QUESTION_SENSES });
  const links = QUESTIONS.map((q) => {
    const terms = [...new Set((q.vocabulary ?? []).map(normalizeTerm).filter(Boolean))];
    const tiers = terms.map((term): { term: string; tier: Tier } => {
      const r = resolver.resolve(term, q.id);
      const tier: Tier =
        r.kind === "sense" ? "sense"
        : r.kind === "card" ? (r.match === "exact" ? "cardExact" : "cardInflection")
        : r.kind === "gloss" ? (r.match === "exact" ? "glossExact" : "glossInflection")
        : r.kind === "components" ? "components" : "missing";
      return { term, tier };
    });
    return { id: q.id, part: q.part, tiers };
  });
  const supportedTiers = new Set<Tier>(["sense", "cardExact", "cardInflection", "glossExact", "glossInflection"]);
  const summarize = (rows: typeof links) => {
    const counts = Object.fromEntries(
      (["sense", "cardExact", "cardInflection", "glossExact", "glossInflection", "components", "missing"] as Tier[]).map((t) => [t, 0]),
    ) as Record<Tier, number>;
    let references = 0;
    let zeroSupport = 0;
    for (const row of rows) {
      let hits = 0;
      for (const { tier } of row.tiers) { references++; counts[tier]++; if (supportedTiers.has(tier)) hits++; }
      if (row.tiers.length > 0 && hits === 0) zeroSupport++;
    }
    const supported = references - counts.components - counts.missing;
    return { questions: rows.length, references, ...counts, fullyResolved: supported, fullyResolvedRate: references === 0 ? 0 : supported / references, zeroSupportQuestions: zeroSupport };
  };

  // ── Cloze: an answer must reproduce the example; inflected-only examples fall back ──
  let clozeEligible = 0;
  let clozeMismatch = 0;
  for (const item of VOCABULARY) {
    const blank = vocab.makeFillBlank(item);
    if (blank === null) continue;
    clozeEligible++;
    if (blank.replace("______", item.word).toLowerCase() !== item.example.toLowerCase()) clozeMismatch++;
  }

  // ── Synthetic learner scenarios (same shapes as the 2026-09-12 audit) ──
  let sequence = 0;
  const rec = (overrides: Partial<AnswerRecord> = {}): AnswerRecord => ({
    questionId: `p5-audit-${sequence}`,
    userAnswer: "A", correctAnswer: "B", isCorrect: false, skill_tag: "word_form", source: "daily",
    answeredAt: new Date(Date.now() - (5_000 - sequence++) * 60_000).toISOString(),
    responseTimeMs: 20_000, ...overrides,
  });
  const mistakes = Array.from({ length: 20 }, (_, i) => rec({ questionId: `p5-unseen-${i}`, mistakeReason: "grammar", reasonSource: "user" }));
  const repeated = Array.from({ length: 20 }, () => rec({ questionId: "p5-unseen-0", isCorrect: true, correctAnswer: "A" }));
  const practice = [...mistakes, ...repeated];
  const oneListeningLegacy = rec({ questionId: "p3-audit-1", skill_tag: "listening_detail", responseTimeMs: 90_000, isCorrect: true, correctAnswer: "A" });
  const oneReadingLegacy = rec({ isCorrect: true, correctAnswer: "A" });
  const confirmed = Array.from({ length: 8 }, () => rec({ mistakeReason: "grammar", reasonSource: "user" }));
  const inferred = Array.from({ length: 20 }, () => rec({ mistakeReason: "speed", reasonSource: "inferred" }));
  const unknownWordIsNotWeak = () => false;
  const coldStart = QUESTIONS.filter(
    (q) => analysis.inferMistakeReason(q, { isCorrect: false, responseTimeMs: 20_000 }, unknownWordIsNotWeak) === "vocab",
  );
  const legacySpeedHints = QUESTIONS.filter(
    (q) => analysis.inferMistakeReason(q, { isCorrect: false, responseTimeMs: 120_000 }) === "speed",
  );

  memory.clear();
  const session = vocab.buildDailySession();
  for (const { item } of session.items) vocab.saveVocabularyQuizResult(item.id, false, "daily", "en-to-zh");
  const allWrongActivity = vocab.getDailySessionActivity();

  memory.clear();
  const today = new Date();
  const date = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  vocab.saveVocabularyProgress(VOCABULARY.slice(0, 20).map((item) => ({
    wordId: item.id, status: "familiar", intervalDays: 1, nextReviewDate: date, consecutiveCorrect: 1,
    reviewedAt: today.toISOString(), selfCheckCount: 0, lastSelfCheckDate: null, addedAt: today.toISOString(),
  })));
  const dueSession = vocab.buildDailySession();
  const backlog = vocab.getDueBacklog();

  let progress: VocabularyProgress = {
    wordId: "audit-only", status: "new", intervalDays: 0, nextReviewDate: "2026-09-01", consecutiveCorrect: 0,
    reviewedAt: "2026-09-01T00:00:00Z", selfCheckCount: 0, lastSelfCheckDate: null, addedAt: "2026-09-01T00:00:00Z",
  };
  const schedule = [];
  for (let i = 0; i < 5; i++) {
    const at = progress.nextReviewDate;
    const previousIntervalDays = progress.intervalDays;
    progress = vocab.advanceSchedule(progress, true, at);
    schedule.push({ date: at, previousIntervalDays, status: progress.status, scheduledNextIntervalDays: progress.intervalDays });
  }

  const evidence = {
    auditedAt: new Date().toISOString(),
    method: "Post-remediation re-run of the 2026-09-12 audit with the same instruments: full-bank term resolution through lib/termResolution, cloze generation, and isolated in-memory synthetic histories. No real learner records accessed. Numbers describe current behaviour; regression guards live in scripts/learning-quality-check.ts.",
    bank: { questions: QUESTIONS.length, vocabulary: VOCABULARY.length, skills: SKILL_TAG_LIST.length, glosses: TERM_GLOSSES.length, senses: QUESTION_SENSES.length },
    vocabularyCoverage: {
      total: summarize(links),
      byPart: Object.fromEntries(PART_LIST.map((part) => [part, summarize(links.filter((r) => r.part === part))])),
    },
    clozeGeneration: { eligibleExamples: clozeEligible, fallBackToMeaning: VOCABULARY.length - clozeEligible, answerDoesNotReproduceExample: clozeMismatch },
    reproductions: {
      legacyTimingIsNotPacing: buildPacingReport([oneListeningLegacy, oneReadingLegacy]),
      legacySpeedHints: { hypotheticalWrongAt120Seconds: QUESTIONS.length, suggestsSpeed: legacySpeedHints.length },
      repeatedItem: {
        initialUniqueWrongQuestions: mistakes.length, correctRepeatsOfOneQuestion: repeated.length,
        partition: { fresh: analysis.partitionAttempts(practice).fresh.length, repeats: analysis.partitionAttempts(practice).repeats.length },
        weaknessAfter: analysis.getWeakestSkills(practice), grammarWeaknessAfter: analysis.getGrammarWeakSkills(practice),
      },
      singleWrongWeakness: analysis.getWeakestSkills([rec()]),
      confirmedReasonDenominator: {
        confirmedOnly: analysis.getReasonInsight(confirmed),
        sameConfirmedWith20ExcludedInferred: analysis.getReasonInsight([...confirmed, ...inferred]),
        countsWithInferred: analysis.countMistakesByReason([...confirmed, ...inferred]),
        oneConfirmedSevenInferred: analysis.getReasonInsight([confirmed[0], ...inferred.slice(0, 7)]),
      },
      coldStartVocabularySuggestions: { hypotheticalWrongAt20Seconds: QUESTIONS.length, suggestsVocab: coldStart.length },
      allDailyWordsWrong: { words: session.items.length, validatedCount: allWrongActivity.validatedCount, validatedCorrectCount: allWrongActivity.validatedCorrectCount, validatedWrongCount: allWrongActivity.validatedWrongCount, reinforcementCount: allWrongActivity.reinforcementCount },
      masterySchedule: schedule,
      twentyDueWords: { dueAvailable: 20, selectedDue: dueSession.counts.due, newSelected: dueSession.counts.new, warnings: dueSession.warnings, backlogVisible: backlog.length },
    },
  };
  const out = resolve("docs/audits/2026-09-12-learning-quality");
  mkdirSync(out, { recursive: true });
  writeFileSync(resolve(out, "evidence-after.json"), JSON.stringify(evidence, null, 2) + "\n");
  writeFileSync(resolve(out, "vocabulary-links-after.json"), JSON.stringify(links, null, 1) + "\n");
  console.log(JSON.stringify({ bank: evidence.bank, coverage: evidence.vocabularyCoverage.total, cloze: evidence.clozeGeneration, reproductions: evidence.reproductions, output: out }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
