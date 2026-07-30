import { strict as assert } from "node:assert";
import type { Choice, Question } from "../types/question";
import { runIntegrityCheck } from "../pipeline/src/integrity";

/**
 * Regression cover for the integrity guards themselves.
 *
 * `npm run check` reports zero on every guard, which is what we want — and also
 * exactly what a broken guard looks like. These cases feed the checker items
 * that SHOULD trip it, so a guard that silently stops detecting anything fails
 * here instead of going unnoticed for months.
 *
 * The visible-length guard earned this the hard way: its first version measured
 * something real but unexploitable (any length advantage, median 4-6 characters)
 * and flagged 13 batches nobody could act on, so it was left non-gating and its
 * output became noise. It now gates at zero, which only means something if it
 * demonstrably still fires.
 */

function question(overrides: Partial<Question> = {}): Question {
  return {
    id: "test-0001",
    part: "Part 7",
    question: "What is the purpose of the notice?",
    choices: {
      A: "To announce a change of venue",
      B: "To confirm a booking",
      C: "To request a refund",
      D: "To cancel an event",
    },
    answer: "A",
    explanation_zh: "測試用題目。",
    skill_tag: "reading_main_idea",
    difficulty: "B1",
    vocabulary: ["notice"],
    passage: "A test passage.",
    ...overrides,
  };
}

/** Pad the bank out so the answer-balance guard has an even, quiet baseline. */
function balancedFiller(count: number): Question[] {
  const letters: Choice[] = ["A", "B", "C", "D"];
  return Array.from({ length: count }, (_, i) =>
    question({
      id: `filler-${String(i).padStart(4, "0")}`,
      question: `Filler question ${i}?`,
      answer: letters[i % 4],
    }),
  );
}

// ─── visible answer-length leak ──────────────────────────────────────────────

{
  const clean = runIntegrityCheck(balancedFiller(80));
  assert.equal(clean.visibleLengthLeaks.length, 0, "baseline bank should have no length leaks");
  assert.equal(clean.passed, true, "baseline bank should pass");
}

{
  // Key 62 chars against a 24-char runner-up: over both thresholds.
  const leaky = question({
    id: "leak-0001",
    choices: {
      A: "To announce that the venue has changed and to explain why",
      B: "To confirm a booking",
      C: "To request a refund",
      D: "To cancel an event",
    },
    answer: "A",
  });
  const report = runIntegrityCheck([...balancedFiller(80), leaky]);
  assert.equal(report.visibleLengthLeaks.length, 1, "a visibly-longest key must be flagged");
  assert.match(report.visibleLengthLeaks[0], /leak-0001/, "the flag must name the item");
  assert.equal(report.passed, false, "a visible length leak must fail the run");
}

{
  // Same key, but a distractor matches its length — no signal, must not flag.
  const padded = question({
    id: "padded-0001",
    choices: {
      A: "To announce that the venue has changed and to explain why",
      B: "To confirm a booking that was made earlier in the month",
      C: "To request a refund",
      D: "To cancel an event",
    },
    answer: "A",
  });
  const report = runIntegrityCheck([...balancedFiller(80), padded]);
  assert.equal(report.visibleLengthLeaks.length, 0, "a matched distractor must clear the flag");
}

{
  // The gap a script sees but a reader cannot: 8 characters, under threshold.
  const subtle = question({
    id: "subtle-0001",
    choices: {
      A: "To announce a change of venue today",
      B: "To confirm a booking made",
      C: "To request a refund now",
      D: "To cancel an event soon",
    },
    answer: "A",
  });
  const report = runIntegrityCheck([...balancedFiller(80), subtle]);
  assert.equal(
    report.visibleLengthLeaks.length,
    0,
    "a sub-visible gap must not be flagged — that noise is why the old guard was ignored",
  );
}

{
  // A visibly-longest DISTRACTOR is fine; only the key leaking matters.
  const longDistractor = question({
    id: "distractor-0001",
    choices: {
      A: "To confirm a booking",
      B: "To announce that the venue has changed and to explain why",
      C: "To request a refund",
      D: "To cancel an event",
    },
    answer: "A",
  });
  const report = runIntegrityCheck([...balancedFiller(80), longDistractor]);
  assert.equal(report.visibleLengthLeaks.length, 0, "a long distractor is not a leak");
}

// ─── explanation / answer mismatch ──────────────────────────────────────────

{
  const mismatched = question({
    id: "mismatch-0001",
    answer: "B",
    explanation_zh: "主旨題：公告在說明場地變更，故選 (A)。",
  });
  const report = runIntegrityCheck([...balancedFiller(80), mismatched]);
  assert.equal(report.explanationAnswerMismatches.length, 1, "explanation/answer mismatch must be flagged");
  assert.equal(report.passed, false);
}

// ─── answer-position skew ───────────────────────────────────────────────────

{
  const allA = Array.from({ length: 80 }, (_, i) =>
    question({ id: `skew-${i}`, question: `Skewed question ${i}?`, answer: "A" }),
  );
  const report = runIntegrityCheck(allA);
  assert.ok(report.answerBalanceViolations.length > 0, "an all-A bank must be flagged as skewed");
  assert.equal(report.passed, false);
}

// ─── duplicate Part 5 stems ─────────────────────────────────────────────────

{
  const stem = "The report _______ by Friday.";
  const dupes: Question[] = ["A", "B"].map((_, i) =>
    question({
      id: `dupe-000${i}`,
      part: "Part 5",
      question: stem,
      passage: undefined,
      skill_tag: "tense",
    }),
  );
  const report = runIntegrityCheck([...balancedFiller(80), ...dupes]);
  assert.ok(
    report.groupStructureViolations.some((v) => v.includes("duplicate stem")),
    "duplicate Part 5 stems must be flagged",
  );
  assert.equal(report.passed, false);
}

console.log("Integrity guard regression checks passed (5 guards, 9 cases)");
