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
 * Answer-length leak guard. Generators write one full, specific correct option
 * next to three short lazy ones, so a student can beat chance by picking the
 * longest without reading the passage or hearing the audio — which inflates
 * practice accuracy, corrupts weak-point analysis, and flatters mock estimates.
 *
 * This flags the individual items where a reader could actually see the
 * difference, and names them, so the output is a work list rather than a score.
 *
 * The thresholds come from measurement, not taste. The first version of this
 * guard counted ANY length advantage and reported a per-batch percentage; that
 * put 13 batches over the line and made a "always pick longest scores 47/100
 * on listening" claim. Both were true of a script and false of a person: the
 * median advantage in those items was 4-6 characters, which nobody can see
 * while reading four options. Requiring the gap to be both 15+ characters and
 * 25% of the runner-up isolates the ~75 items that were genuinely readable —
 * all since fixed — and drops the exploit to the chance baseline.
 *
 * Measured over the 3,303-item bank after that fix: 27 items have an option
 * that stands out this way at all, and the key is that option in none of them
 * (chance would put it there ~7 times). So the guard now gates at zero. That
 * is marginally stricter than the real exam, where the key occasionally is the
 * long one, but the cost is bounded at those 27 items — under one per 100-item
 * mock — and in exchange a regression cannot ship quietly.
 *
 * No minimum sample size, deliberately: one leaky item in a batch of five is
 * still a leaky item. And no separate advisory for sub-visible bias — a batch
 * skewed badly enough to matter produces visible leaks too, so this subsumes
 * the dangerous cases without the noise that got the old advisory ignored.
 */
const VISIBLE_LENGTH_GAP_CHARS = 15;
const VISIBLE_LENGTH_GAP_RATIO = 1.25;

function checkVisibleAnswerLengthLeaks(questions: Question[]): string[] {
  const leaks: string[] = [];
  for (const q of questions) {
    const lengths = Object.values(q.choices)
      .filter((text): text is string => text != null)
      .map((text) => text.length)
      .sort((a, b) => b - a);
    const [longest, runnerUp] = lengths;
    if (runnerUp === undefined || runnerUp === 0) continue;
    // A tie for longest carries no signal, and is excluded by the gap test.
    if (longest - runnerUp < VISIBLE_LENGTH_GAP_CHARS) continue;
    if (longest / runnerUp < VISIBLE_LENGTH_GAP_RATIO) continue;
    if (q.choices[q.answer]?.length !== longest) continue;
    leaks.push(
      `${q.id} (${q.part}): key is ${longest} chars, next longest ${runnerUp} — pad a distractor`,
    );
  }
  return leaks;
}

/**
 * `word_form` (詞性判斷) means the four options are one lexeme in different
 * parts of speech, so the slot's grammar decides the answer. When every option
 * carries the SAME part-of-speech ending, grammar decides nothing — the item is
 * a vocabulary question wearing a grammar tag.
 *
 * The tag is not cosmetic: it drives the weakness analysis, so a mislabel sends
 * the learner to derivational-morphology drills for a vocabulary gap. Fifteen
 * Part 5 items were mislabelled this way, each carrying a generated explanation
 * that asserted a rule ("空格修飾動詞，需用副詞") which eliminated none of its
 * four adverbs.
 *
 * Measured across the 241 single-word `word_form` items: this rule flagged 13
 * before the fix and zero after, with no false positives — a real derivational
 * family cannot have all four options in one part of speech, which is what
 * makes the test safe. The two remaining mislabels (adjective sets with no
 * shared suffix) had to be found by reading; see patches/skill-tag-mislabels.
 */
const POS_ENDINGS = [
  "ly", "ing", "ive", "tion", "sion", "ment", "ness",
  "able", "ible", "ous", "ful", "ant", "ent",
];

function checkWordFormTags(questions: Question[]): string[] {
  const violations: string[] = [];
  for (const q of questions) {
    if (q.skill_tag !== "word_form") continue;
    const options = Object.values(q.choices)
      .filter((text): text is string => text != null)
      .map((text) => text.toLowerCase().trim());
    if (options.length < 3) continue;
    // Multi-word options are phrases (prepositions, connectors), not word forms.
    if (options.some((text) => text.split(/\s+/).length > 1)) continue;
    const shared = POS_ENDINGS.find((ending) => options.every((text) => text.endsWith(ending)));
    if (!shared) continue;
    violations.push(
      `${q.id} (${q.part}): every option ends in -${shared}, so part of speech cannot decide it — tag as business_vocabulary`,
    );
  }
  return violations;
}

/**
 * Near-duplicate Part 2 prompts.
 *
 * `checkDuplicateStems` below catches only byte-identical stems, which the
 * generated Part 2 batch sailed past while holding six ways of asking "Could
 * you tell me where the new X is stored?". Meeting two of those in one mock
 * wastes a slot and inflates the score on the second.
 *
 * Two guards against the mistake the length-bias advisory made — measuring
 * something real but unactionable, and rotting into noise:
 *
 * 1. Prompts are only compared within the same question type, with indirect
 *    lead-ins stripped first. "Where will the training be held?" and "When will
 *    the training be held?" share every content word but drill opposite skills;
 *    "Could you tell me where X is" and "Where is X" are the same question
 *    wearing different clothes, and typing off the first word hides that.
 * 2. The bar is deliberately high. Token Jaccard over short prompts is noisy in
 *    BOTH directions — it rates "When will the next training session be held?"
 *    against "When will the training session take place?" at only 0.43 — so a
 *    threshold tuned to catch borderline cases would also flag good ones. At
 *    0.75 it catches near-verbatim repeats and nothing else: 21 pairs in the
 *    pre-cleanup bank, zero after, with the highest surviving pair at 0.60.
 *
 * That leaves the 0.5-0.7 band to human reading, which is where it belongs.
 */
const P2_DUPLICATE_THRESHOLD = 0.75;

const P2_STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "have", "has", "had", "will", "would", "can",
  "could", "should", "shall", "may", "might", "must", "to", "of", "in",
  "on", "at", "for", "with", "by", "from", "as", "and", "or", "but",
  "you", "your", "i", "we", "he", "she", "it", "they", "me", "my",
  "this", "that", "these", "those", "there", "here",
]);

/** "Could you tell me where X is" asks on `where`, not on `could`. */
const INDIRECT_LEAD_IN =
  /^(could|can|would|will)\s+you\s+(please\s+)?(tell|let)\s+me\s+|^do\s+you\s+(know|happen\s+to\s+know)\s+/i;

function promptType(text: string): string {
  const direct = text.replace(INDIRECT_LEAD_IN, "");
  const first = direct.toLowerCase().replace(/[^a-z\s]/g, "").trim().split(/\s+/)[0] ?? "";
  if (["who", "what", "when", "where", "why", "how", "which"].includes(first)) return first;
  if (!text.trim().endsWith("?")) return "statement";
  return / or /.test(text) ? "choice" : "yes-no";
}

function contentTokens(text: string): Set<string> {
  return new Set(
    text
      .replace(INDIRECT_LEAD_IN, "")
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 1 && !P2_STOPWORDS.has(word)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let shared = 0;
  for (const token of a) if (b.has(token)) shared++;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

function checkPart2NearDuplicates(questions: Question[]): string[] {
  const items = questions
    .filter((q) => q.part === "Part 2")
    .map((q) => ({ id: q.id, prompt: q.question, type: promptType(q.question), tokens: contentTokens(q.question) }));

  const violations: string[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i].type !== items[j].type) continue;
      const score = jaccard(items[i].tokens, items[j].tokens);
      if (score < P2_DUPLICATE_THRESHOLD) continue;
      violations.push(
        `${items[i].id} / ${items[j].id}: prompts are ${(score * 100).toFixed(0)}% the same — "${items[i].prompt}" vs "${items[j].prompt}"`,
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
    ...checkPart2NearDuplicates(questions),
  ];
  const explanationAnswerMismatches = checkExplanationAnswerConsistency(questions);
  const visibleLengthLeaks = checkVisibleAnswerLengthLeaks(questions);
  const skillTagMismatches = checkWordFormTags(questions);

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
    explanationAnswerMismatches.length === 0 &&
    visibleLengthLeaks.length === 0 &&
    skillTagMismatches.length === 0;

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
    visibleLengthLeaks,
    skillTagMismatches,
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
    `  Visible length leaks:   ${report.visibleLengthLeaks.length}`
  );
  console.log(
    `  skill_tag mismatches:   ${report.skillTagMismatches.length}`
  );
  console.log(
    `  Status: ${report.passed ? "PASSED" : "FAILED"}`
  );

  if (report.visibleLengthLeaks.length > 0) {
    console.log(
      `\n  - 正解明顯是最長選項（讀四個選項就看得出來，等於不必讀文章／聽音檔）:\n      ${report.visibleLengthLeaks.join("\n      ")}`
    );
  }

  if (report.skillTagMismatches.length > 0) {
    console.log(
      `\n  - 標成 word_form 但四個選項詞性相同（詞性判斷不了，實際考的是字義；誤標會讓弱點分析叫使用者去練錯的東西）:\n      ${report.skillTagMismatches.join("\n      ")}`
    );
  }

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
