/**
 * Regression checks for the 2026-09-12 learning-quality review (REVIEW.md
 * F01–F12). Every case asserts the DESIRED behaviour with synthetic,
 * in-memory learner records; no real learner data is read or written.
 * Run via `npm test`.
 */
import { strict as assert } from "node:assert";
import type { AnswerRecord } from "../types/question";
import type { VocabularyProgress } from "../types/vocabulary";

class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
  clear() { this.data.clear(); }
}

const memory = new MemoryStorage();
Object.defineProperty(globalThis, "localStorage", { value: memory, configurable: true });
Object.defineProperty(globalThis, "window", { value: globalThis, configurable: true });
Object.defineProperty(globalThis, "alert", { value: () => {}, configurable: true });

const RealDate = Date;
let frozenNow: string | null = null;
/** Freeze "today" for the SRS simulations (todayStr() reads `new Date()`). */
function freezeDate(iso: string | null): void {
  frozenNow = iso;
  if (iso === null) {
    globalThis.Date = RealDate;
    return;
  }
  class FrozenDate extends RealDate {
    constructor(...args: unknown[]) {
      if (args.length === 0) super(frozenNow as string);
      else super(...(args as [string | number | Date]));
    }
    static now(): number { return new RealDate(frozenNow as string).getTime(); }
  }
  globalThis.Date = FrozenDate as DateConstructor;
}

function localDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function main(): Promise<void> {
  const { STORAGE_KEYS } = await import("../lib/storageCore");
  const { VOCABULARY } = await import("../data/vocabulary");
  const vocab = await import("../lib/vocabularyStorage");
  await vocab.loadVocabularyBank();
  const byId = new Map(VOCABULARY.map((item) => [item.id, item]));

  // ── F01: a cloze's marked answer must reproduce the example exactly ──────
  let clozeCount = 0;
  for (const item of VOCABULARY) {
    const blank = vocab.makeFillBlank(item);
    if (blank === null) continue;
    clozeCount++;
    assert.equal(
      blank.replace("______", item.word).toLowerCase(),
      item.example.toLowerCase(),
      `${item.id}: refilling the blank with the headword must give back the example`,
    );
  }
  assert.ok(clozeCount > 1000, `cloze coverage collapsed to ${clozeCount}`);
  for (const [id, word] of [["vocab-025", "require"], ["vocab-050", "document"], ["vocab-045", "attendee"]] as const) {
    const item = byId.get(id);
    assert.ok(item && item.word === word, `${id} fixture drifted`);
    assert.equal(vocab.makeFillBlank(item), null, `${word}: example only holds an inflected form, must not become a cloze`);
  }
  // Generated quizzes: every cloze answer is the headword, distractors share
  // its part of speech (same grammatical frame) and are never the same stem.
  const bankByWord = new Map(VOCABULARY.map((item) => [item.word.toLowerCase(), item]));
  let generatedCloze = 0;
  for (let round = 0; round < 40; round++) {
    for (const question of vocab.buildVocabularyQuiz("random")) {
      if (question.type !== "fill-blank") continue;
      generatedCloze++;
      const target = byId.get(question.wordId);
      assert.ok(target);
      assert.equal(question.choices[question.correctIndex], target.word);
      assert.equal(
        question.prompt.replace("______", target.word).toLowerCase(),
        target.example.toLowerCase(),
      );
      for (const choice of question.choices) {
        if (choice === target.word) continue;
        const distractor = bankByWord.get(choice.toLowerCase());
        assert.ok(distractor, `cloze distractor ${choice} is not a bank headword`);
        assert.equal(distractor.partOfSpeech, target.partOfSpeech, `${target.word}: distractor ${choice} changes the grammatical frame`);
        assert.ok(!choice.toLowerCase().includes(target.word.toLowerCase()) && !target.word.toLowerCase().includes(choice.toLowerCase()));
      }
    }
  }
  assert.ok(generatedCloze > 50, "random quizzes must still produce cloze items");
  // The audit's exact reproduction: vocab-025 in a fill-blank slot falls back.
  memory.clear();
  const clozeIds = VOCABULARY.slice(0, 20).map((item) => item.id);
  clozeIds[2] = "vocab-025";
  memory.setItem(STORAGE_KEYS.vocabularyDailySession, JSON.stringify({
    date: localDate(0), itemBuckets: clozeIds.map((wordId) => ({ wordId, bucket: "new" })),
    counts: { retry: 0, due: 0, masteredReview: 0, new: 20 }, warnings: { newSuppressed: false, retryDeferred: 0 },
    reviewedIds: [], validatedIds: [], reinforcementIds: [], reinforcementRound: 0,
  }));
  const originalRandom = Math.random;
  try {
    Math.random = () => 0.999999;
    const requireQuestion = vocab.buildVocabularyQuiz("today").find((q) => q.wordId === "vocab-025");
    assert.ok(requireQuestion);
    assert.notEqual(requireQuestion.type, "fill-blank", "require must not be served as a cloze");
    assert.equal(requireQuestion.choices[requireQuestion.correctIndex], "要求；需要");
  } finally {
    Math.random = originalRandom;
  }

  // ── F07: tested is not passed ─────────────────────────────────────────────
  memory.clear();
  const allWrong = vocab.buildDailySession();
  for (const { item } of allWrong.items) {
    assert.ok(vocab.saveVocabularyQuizResult(item.id, false, "daily", "en-to-zh").persisted);
  }
  let activity = vocab.getDailySessionActivity();
  assert.equal(activity.validatedCount, 20);
  assert.equal(activity.validatedCorrectCount, 0, "all-wrong must not report any word as passed");
  assert.equal(activity.validatedWrongCount, 20);
  assert.equal(activity.reinforcementCount, 20);
  memory.clear();
  const mixed = vocab.buildDailySession();
  mixed.items.forEach(({ item }, index) => {
    assert.ok(vocab.saveVocabularyQuizResult(item.id, index < 12, "daily", "zh-to-en").persisted);
  });
  activity = vocab.getDailySessionActivity();
  assert.deepEqual(
    [activity.validatedCount, activity.validatedCorrectCount, activity.validatedWrongCount],
    [20, 12, 8],
  );
  // Reinforcement success must not rewrite the day's validation outcome.
  const firstWrong = mixed.items[12].item.id;
  assert.ok(vocab.saveVocabularyQuizResult(firstWrong, true, "reinforcement", "en-to-zh").persisted);
  activity = vocab.getDailySessionActivity();
  assert.equal(activity.validatedWrongCount, 8);
  assert.equal(activity.reinforcementCount, 7);
  // Legacy same-day session without outcome ids: best-effort derivation.
  memory.clear();
  memory.setItem(STORAGE_KEYS.vocabularyDailySession, JSON.stringify({
    date: localDate(0), itemBuckets: clozeIds.map((wordId) => ({ wordId, bucket: "new" })),
    counts: { retry: 0, due: 0, masteredReview: 0, new: 20 }, warnings: { newSuppressed: false, retryDeferred: 0 },
    reviewedIds: [], validatedIds: clozeIds.slice(0, 3), reinforcementIds: [clozeIds[2]], reinforcementRound: 0,
  }));
  activity = vocab.getDailySessionActivity();
  assert.deepEqual([activity.validatedCount, activity.validatedCorrectCount, activity.validatedWrongCount], [3, 2, 1]);

  // ── F11: mastered only after PASSING the 14-day interval ─────────────────
  let progress: VocabularyProgress = {
    wordId: "sim", status: "new", intervalDays: 0, nextReviewDate: "2026-09-01", consecutiveCorrect: 0,
    reviewedAt: "2026-09-01T00:00:00Z", selfCheckCount: 0, lastSelfCheckDate: null, addedAt: "2026-09-01T00:00:00Z",
  };
  const statuses: string[] = [];
  const completed: number[] = [];
  for (let i = 0; i < 5; i++) {
    completed.push(progress.intervalDays);
    progress = vocab.advanceSchedule(progress, true, progress.nextReviewDate);
    statuses.push(progress.status);
  }
  assert.deepEqual(completed, [0, 1, 3, 7, 14]);
  assert.deepEqual(statuses, ["familiar", "familiar", "familiar", "familiar", "mastered"],
    "scheduling a 14-day gap is not passing it; mastery arrives after the 14-day review is answered correctly");
  assert.equal(progress.intervalDays, 30);
  assert.equal(vocab.advanceSchedule(progress, true, progress.nextReviewDate).status, "mastered");
  assert.equal(vocab.advanceSchedule(progress, false, progress.nextReviewDate).status, "familiar");
  // Per-type evidence is recorded so the report can say what was measured.
  memory.clear();
  vocab.saveVocabularyQuizResult("vocab-001", true, "random", "fill-blank");
  vocab.saveVocabularyQuizResult("vocab-001", false, "random", "zh-to-en");
  const typeStats = vocab.getVocabularyQuizTypeStats();
  assert.deepEqual([typeStats["fill-blank"].totalCorrect, typeStats["zh-to-en"].totalWrong, typeStats["en-to-zh"].totalCorrect + typeStats["en-to-zh"].totalWrong], [1, 1, 0]);

  // ── F12: deferred due reviews are visible and can be made up ─────────────
  memory.clear();
  const nowIso = new Date().toISOString();
  const dueRows = VOCABULARY.slice(0, 20).map((item, index) => ({
    wordId: item.id, status: "familiar" as const, intervalDays: 1,
    // Five words overdue by 3 days, the rest due today.
    nextReviewDate: localDate(index < 5 ? -3 : 0), consecutiveCorrect: 1,
    reviewedAt: nowIso, selfCheckCount: 0, lastSelfCheckDate: null, addedAt: nowIso,
  }));
  vocab.saveVocabularyProgress(dueRows);
  const dueSession = vocab.buildDailySession();
  assert.equal(dueSession.counts.due, 5);
  assert.equal(dueSession.counts.new, 20, "the 20-new-word preference is untouched");
  assert.equal(dueSession.warnings.dueDeferred, 15, "15 due words beyond the cap must be reported, not dropped");
  assert.equal(dueSession.warnings.oldestDeferredDays, 0, "the five most-overdue words were served first");
  assert.deepEqual(
    dueSession.items.filter((entry) => entry.bucket === "due").map((entry) => entry.item.id),
    dueRows.slice(0, 5).map((row) => row.wordId),
    "most overdue words are selected first",
  );
  const backlog = vocab.getDueBacklog();
  assert.equal(backlog.length, 15);
  const backlogQuiz = vocab.buildVocabularyQuiz("backlog");
  assert.equal(backlogQuiz.length, 15);
  for (const question of backlogQuiz) {
    assert.ok(vocab.saveVocabularyQuizResult(question.wordId, true, "backlog", question.type).persisted);
  }
  assert.equal(vocab.getDueBacklog().length, 0, "made-up reviews leave the backlog");
  for (const row of vocab.getVocabularyProgress().filter((p) => backlogQuiz.some((q) => q.wordId === p.wordId))) {
    assert.equal(row.intervalDays, 3, "a due backlog review that is passed advances the SRS interval");
  }
  assert.equal(vocab.getVocabularyQuizStats("backlog").totalCorrect, 15);
  assert.equal(vocab.getVocabularyQuizStats("daily").totalCorrect, 0, "backlog rounds do not inflate the daily card");

  // Multi-day load: 20 new words a day, all answered correctly, no backlog
  // rounds. The core session's 5-per-day due cap must surface the growth.
  memory.clear();
  try {
    const day = (n: number) => `2026-10-${String(n).padStart(2, "0")}T09:00:00`;
    const observed: Array<{ day: number; due: number; deferred: number; oldest: number; backlog: number }> = [];
    for (let n = 1; n <= 4; n++) {
      freezeDate(day(n));
      const session = vocab.buildDailySession();
      for (const { item } of session.items) vocab.saveVocabularyQuizResult(item.id, true, "daily", "en-to-zh");
      observed.push({
        day: n, due: session.counts.due, deferred: session.warnings.dueDeferred ?? -1,
        oldest: session.warnings.oldestDeferredDays ?? -1, backlog: vocab.getDueBacklog().length,
      });
    }
    assert.deepEqual(observed, [
      { day: 1, due: 0, deferred: 0, oldest: 0, backlog: 0 },
      { day: 2, due: 5, deferred: 15, oldest: 0, backlog: 15 },
      { day: 3, due: 5, deferred: 30, oldest: 1, backlog: 30 },
      { day: 4, due: 5, deferred: 45, oldest: 2, backlog: 45 },
    ], "the review debt and its age are reported every day instead of being hidden");
  } finally {
    freezeDate(null);
  }

  // ── F02/F03: question terms resolve to the RIGHT teaching content ────────
  const { QUESTIONS } = await import("../data/questions");
  const senseCases: Array<[string, string, string, string]> = [
    ["p5-gen-038", "update", "noun", "更新版本"],
    ["p3-ext-007", "issue", "noun", "問題"],
    ["p2-gen-011", "order", "verb", "訂購"],
    ["p5-xd-0191", "address", "verb", "發言"],
  ];
  for (const [questionId, term, pos, fragment] of senseCases) {
    const resolution = vocab.resolveQuestionTerm(term, questionId);
    assert.equal(resolution.kind, "sense", `${questionId} ${term} must carry a per-question sense`);
    if (resolution.kind === "sense") {
      assert.equal(resolution.sense.partOfSpeech, pos);
      assert.ok(resolution.sense.meaning_zh.includes(fragment), `${questionId} ${term}: ${resolution.sense.meaning_zh}`);
    }
  }
  const issueElsewhere = vocab.resolveQuestionTerm("issue", "p5-nonexistent");
  assert.equal(issueElsewhere.kind, "card", "a sense override must not leak to other questions");
  const scheduled = vocab.resolveQuestionTerm("scheduled");
  assert.ok(scheduled.kind === "card" && scheduled.match === "inflection" && scheduled.card.word === "schedule");
  const cordially = vocab.resolveQuestionTerm("cordially");
  assert.notEqual(cordially.kind, "card", "derivations that change part of speech are not merged into a card");
  assert.equal(vocab.resolveQuestionTerm("zzqqx-unknown").kind, "missing", "unknown terms are reported as missing, never faked");
  assert.equal(vocab.resolveQuestionTerm("conference room").kind, "gloss");
  const rawMaterials = vocab.resolveQuestionTerm("raw materials");
  assert.ok(rawMaterials.kind === "card" && rawMaterials.card.word === "raw material", "phrase inflections resolve to the phrase card");
  assert.equal(vocab.findVocabularyCardForTerm("scheduled")?.word, "schedule");
  let references = 0;
  let supported = 0;
  let questionsWithoutSupport = 0;
  for (const question of QUESTIONS) {
    const terms = [...new Set((question.vocabulary ?? []).map((t) => t.trim().toLowerCase()).filter(Boolean))];
    let hits = 0;
    for (const term of terms) {
      references += 1;
      const kind = vocab.resolveQuestionTerm(term, question.id).kind;
      if (kind === "sense" || kind === "card" || kind === "gloss") { supported += 1; hits += 1; }
    }
    if (terms.length > 0 && hits === 0) questionsWithoutSupport += 1;
  }
  assert.equal(supported, references, "every question-term link must have a full definition");
  assert.equal(questionsWithoutSupport, 0, "no question may lack vocabulary support");
  const { rankQuestionTerms } = await import("../components/quiz/QuestionVocabulary");
  const p5ext032 = QUESTIONS.find((q) => q.id === "p5-ext-032");
  assert.ok(p5ext032);
  const ranked = rankQuestionTerms(p5ext032);
  assert.ok(ranked.every((entry) => entry.resolution.kind !== "missing"), "p5-ext-032 terms all have teaching content now");
  assert.equal(ranked[0].term, "specialize", "the term in the key option ranks first");
  assert.equal(ranked[0].key, true);

  // ── F05: pacing and speed hints read only the timing split ────────────────
  const analysis = await import("../lib/analysis");
  const { buildPacingReport } = await import("../lib/pacing");
  let seq = 0;
  const record = (overrides: Partial<AnswerRecord> = {}): AnswerRecord => {
    seq += 1;
    return {
      questionId: `p5-lq-${seq}`, userAnswer: "A", correctAnswer: "A", isCorrect: true,
      skill_tag: "word_form", source: "daily",
      answeredAt: new Date(Date.now() - (10_000 - seq) * 60_000).toISOString(),
      ...overrides,
    };
  };
  const legacy = Array.from({ length: 30 }, () => record({ responseTimeMs: 90_000 }));
  const legacyReport = buildPacingReport(legacy);
  assert.ok(legacyReport.rows.every((row) => row.status === "insufficient"), "wall-clock-only records can never produce a pacing verdict");
  assert.equal(legacyReport.legacyRecords, 30);
  const hiddenTab = Array.from({ length: 10 }, () =>
    record({ responseTimeMs: 620_000, timing: { activeMs: 20_000, hiddenMs: 600_000 } }),
  );
  const part5Row = (rows: AnswerRecord[]) => buildPacingReport(rows).rows.find((row) => row.part === "Part 5");
  assert.deepEqual([part5Row(hiddenTab)?.medianMs, part5Row(hiddenTab)?.status], [20_000, "within"], "ten minutes in another tab must not count as answering time");
  const slowPart5 = Array.from({ length: 10 }, () => record({ timing: { activeMs: 45_000, hiddenMs: 0 } }));
  assert.equal(part5Row(slowPart5)?.status, "over");
  const listening = Array.from({ length: 10 }, (_, i) =>
    record({ questionId: `p3-lq-${i}`, skill_tag: "listening_detail", timing: { version: 2, activeMs: 90_000, hiddenMs: 0, audioMs: 80_000 } }),
  );
  const part3Row = buildPacingReport(listening).rows.find((row) => row.part === "Part 3");
  assert.deepEqual([part3Row?.status, part3Row?.medianMs], ["listening", 10_000], "a fully played 80-second recording is not slow answering");
  const groups = Array.from({ length: 9 }, (_, g) =>
    [150_000, 10_000, 10_000].map((activeMs, index) =>
      record({ questionId: `p7-lq-${g}-${index}`, skill_tag: "reading_detail", timing: { activeMs, hiddenMs: 0, groupIndex: index, groupSize: 3, groupId: `passage-${g}`, sessionId: "fixture" } }),
    ),
  ).flat();
  const part7Row = buildPacingReport(groups).rows.find((row) => row.part === "Part 7");
  assert.deepEqual([part7Row?.sample, part7Row?.medianMs, part7Row?.status], [27, 56_667, "within"], "passage reading is spread across the group, so the first question is not the slow one");
  const p5 = { part: "Part 5" as const, vocabulary: ["budget"] };
  assert.equal(analysis.inferMistakeReason(p5, { isCorrect: false, responseTimeMs: 120_000 }), null, "legacy wall-clock time never hints 來不及");
  assert.equal(analysis.inferMistakeReason(p5, { isCorrect: false, responseTimeMs: 50_000, timing: { activeMs: 50_000, hiddenMs: 0 } }), "speed");
  assert.equal(analysis.inferMistakeReason(p5, { isCorrect: false, responseTimeMs: 650_000, timing: { activeMs: 20_000, hiddenMs: 630_000 } }), null, "hidden-tab time is not slowness");
  assert.equal(analysis.inferMistakeReason({ part: "Part 7", vocabulary: [] }, { isCorrect: false, timing: { activeMs: 200_000, hiddenMs: 0, groupIndex: 0, groupSize: 3 } }), null, "the first question of a passage carries the reading and is not judged for speed");
  assert.equal(analysis.inferMistakeReason({ part: "Part 3", vocabulary: [] }, { isCorrect: false, timing: { activeMs: 200_000, hiddenMs: 0, audioMs: 190_000 } }), null, "listening is never judged for speed");
  assert.equal(analysis.inferMistakeReason(p5, { isCorrect: false, timing: { activeMs: 3_000, hiddenMs: 0 } }), "careless");

  // ── F06: skill evidence is first attempts only, and every card reads it ──
  const wrongs = Array.from({ length: 20 }, (_, i) =>
    record({ questionId: `p5-fresh-${i}`, isCorrect: false, correctAnswer: "B", mistakeReason: "grammar", reasonSource: "user" }),
  );
  const repeats = Array.from({ length: 20 }, () => record({ questionId: "p5-fresh-0", isCorrect: true }));
  const practice = [...wrongs, ...repeats];
  assert.equal(analysis.partitionAttempts(practice).repeats.length, 20);
  const weakest = analysis.getWeakestSkills(practice, 3);
  assert.deepEqual([weakest[0]?.skill, weakest[0]?.mistakes, weakest[0]?.attempts, weakest[0]?.confidence], ["word_form", 20, 20, "ok"], "re-doing one question 20 times must not erase 19 other misses");
  const grammar = analysis.getGrammarWeakSkills(practice);
  assert.deepEqual([grammar[0]?.skill, grammar[0]?.wrongCount, grammar[0]?.attempts], ["word_form", 20, 20], "the grammar card reads the same evidence as the weakness card");
  const single = analysis.getWeakestSkills([record({ isCorrect: false, correctAnswer: "B" })]);
  assert.deepEqual([single[0]?.confidence, single[0]?.attempts], ["insufficient", 1], "one miss is a flag to re-check, not a verdict");
  const recovered = [...wrongs, ...Array.from({ length: 20 }, (_, i) => record({ questionId: `p5-later-${i}` }))];
  assert.equal(analysis.getWeakestSkills(recovered).length, 0, "twenty NEW correct questions retire the weakness");
  assert.equal(analysis.getGrammarWeakSkills(recovered).length, 0, "grammar remediation retires with the same evidence");
  assert.equal(analysis.getSkillEvidence(practice)[0]?.repeatsExcluded, 20);

  // ── F08: reason statistics count only the learner's confirmations ────────
  const confirmedEight = Array.from({ length: 8 }, () => record({ isCorrect: false, correctAnswer: "B", mistakeReason: "grammar", reasonSource: "user" }));
  const inferredTwenty = Array.from({ length: 20 }, () => record({ isCorrect: false, correctAnswer: "B", mistakeReason: "speed", reasonSource: "inferred" }));
  const onlyConfirmed = analysis.getReasonInsight(confirmedEight);
  assert.deepEqual([onlyConfirmed.labeled, onlyConfirmed.top?.reason, onlyConfirmed.top?.share], [8, "grammar", 1]);
  assert.ok(onlyConfirmed.message?.includes("8 題錯題中，8 題（100%）標為「文法不懂」"), onlyConfirmed.message ?? "no message");
  const withInferred = analysis.getReasonInsight([...confirmedEight, ...inferredTwenty]);
  assert.deepEqual([withInferred.labeled, withInferred.wrongInWindow, withInferred.message], [8, 28, onlyConfirmed.message], "inferred labels change neither the denominator nor the headline");
  assert.equal(analysis.countMistakesByReason([...confirmedEight, ...inferredTwenty]).speed, 0);
  const oneConfirmed = analysis.getReasonInsight([confirmedEight[0], ...inferredTwenty.slice(0, 7)]);
  assert.deepEqual([oneConfirmed.labeled, oneConfirmed.message], [1, null], "one confirmation plus seven guesses does not reach the threshold");
  const stale = confirmedEight.map((r) => ({ ...r, answeredAt: new Date(Date.now() - 40 * 86_400_000).toISOString() }));
  assert.equal(analysis.getReasonInsight(stale).labeled, 0, "labels older than the window are not 最近");
  assert.equal(analysis.inferMistakeReason(p5, { isCorrect: false, responseTimeMs: 20_000 }, () => false), null, "a word with no record is unknown, not 不會單字");
  const { reasonOrderFor } = await import("../components/quiz/MistakeReasonChips");
  assert.equal(reasonOrderFor("word_form")[0], "grammar", "a grammar item leads with 文法不懂");
  assert.equal(reasonOrderFor("listening_detail")[0], "comprehension");
  assert.equal(new Set(reasonOrderFor("reading_inference")).size, 6, "all six reasons are offered");

  // ── F09: a recommendation reaches the plan, or the plan says it could not ──
  const { buildDailyPlan } = await import("../data/questions");
  const { SKILL_LABELS } = await import("../types/question");
  const inferencePlan = buildDailyPlan({ focusSkills: ["reading_inference"], weakSkillTags: ["tense"] });
  assert.ok((inferencePlan.focus.matched.reading_inference ?? 0) > 0, "a 閱讀推論 focus must land inference questions in the plan");
  assert.ok(inferencePlan.questions.some((q) => q.part === "Part 7" && q.skill_tag === "reading_inference"), "the Part 7 group must contain the focus skill");
  assert.ok(inferencePlan.focus.note.includes(SKILL_LABELS.reading_inference) && inferencePlan.focus.note.includes("排入"), inferencePlan.focus.note);
  const nextActionPlan = buildDailyPlan({ focusSkills: ["listening_next_action"], weakSkillTags: ["tense"] });
  assert.ok(nextActionPlan.questions.some((q) => (q.part === "Part 3" || q.part === "Part 4") && q.skill_tag === "listening_next_action"), "listening focus must reach a transcript group");
  const exhausted = buildDailyPlan({
    focusSkills: ["reading_inference"], weakSkillTags: ["tense"],
    answeredIds: new Set(QUESTIONS.filter((q) => q.skill_tag === "reading_inference").map((q) => q.id)),
  });
  assert.equal(exhausted.focus.matched.reading_inference ?? 0, 0, "seen focus groups must not outrank unseen material");
  assert.ok(exhausted.focus.note.includes("沒有可用的未見新題"), "the plan must say when a focus could not be served");
  const baselinePlan = buildDailyPlan({});
  assert.equal(baselinePlan.focus.baseline, true);
  assert.ok(baselinePlan.focus.note.includes("建立基準") && baselinePlan.focus.note.includes("不算弱點補強"), baselinePlan.focus.note);

  // ── F10: a flagged word becomes trackable work, and syncs safely ──────────
  const queue = await import("../lib/vocabularyQueue");
  const { BACKUP_KEYS, sanitizeBackupValue } = await import("../lib/storage");
  const { SYNC_KEYS } = await import("../lib/syncShared");
  const { mergeKey } = await import("../lib/syncMerge");
  memory.clear();
  assert.ok(vocab.enqueueQuestionTerm("small businesses", "p5-ext-032"), "a gloss-only phrase can be flagged");
  const flagged = queue.getVocabularyQueue();
  assert.equal(flagged.length, 1);
  assert.equal(flagged[0].wordId, undefined, "no card means no wordId, but the entry survives");
  assert.ok(flagged[0].meaning_zh?.includes("小型企業"), "the gloss shown is kept for the queue");
  vocab.saveVocabularyProgress([{
    wordId: "vocab-002", status: "familiar", intervalDays: 7, nextReviewDate: localDate(5), consecutiveCorrect: 2,
    reviewedAt: new Date().toISOString(), selfCheckCount: 0, lastSelfCheckDate: null, addedAt: new Date().toISOString(),
  }]);
  assert.ok(vocab.enqueueQuestionTerm("scheduled", "p2-gen-070"), "an inflected form flags its card");
  const pulled = vocab.getVocabularyProgress().find((p) => p.wordId === "vocab-002");
  assert.deepEqual(
    [pulled?.nextReviewDate, pulled?.status, pulled?.intervalDays, pulled?.consecutiveCorrect],
    [localDate(0), "familiar", 7, 2],
    "flagging pulls the review to today without touching status, interval or streak",
  );
  assert.equal(queue.getVocabularyQueue().find((entry) => entry.term === "scheduled")?.wordId, "vocab-002");
  memory.clear();
  assert.ok(vocab.enqueueQuestionTerm("stakeholder", "p7-lq-flag"));
  const prioritized = vocab.buildDailySession();
  assert.equal(prioritized.counts.new, 20, "flagged words use new-word slots inside the 20-word target");
  assert.equal(prioritized.warnings.queuedPrioritized, 1);
  assert.ok(prioritized.items.some((entry) => entry.item.word === "stakeholder" && entry.bucket === "new"), "a flagged new word is served today instead of waiting for the bank order");
  assert.ok(queue.dismissVocabularyQueueTerm("stakeholder"));
  assert.equal(queue.getVocabularyQueue().some((entry) => entry.term === "stakeholder"), false);
  assert.ok(BACKUP_KEYS.includes(STORAGE_KEYS.vocabularyQueue) && SYNC_KEYS.includes(STORAGE_KEYS.vocabularyQueue), "the queue is backed up and synced");
  const alpha = { key: "alpha", term: "alpha", questionId: "q1", addedAt: "2026-09-01T00:00:00.000Z" };
  const beta = { key: "beta", term: "beta", questionId: "q2", addedAt: "2026-09-02T00:00:00.000Z" };
  const union = mergeKey(STORAGE_KEYS.vocabularyQueue, [alpha], [beta], { localT: 1, remoteT: 2 }).merged as Array<{ key: string }>;
  assert.deepEqual(union.map((entry) => entry.key).sort(), ["alpha", "beta"], "entries from both devices are kept");
  const dismissedElsewhere = mergeKey(
    STORAGE_KEYS.vocabularyQueue, [alpha], [{ ...alpha, dismissedAt: "2026-09-03T00:00:00.000Z" }], { localT: 9, remoteT: 2 },
  ).merged as Array<{ key: string; dismissedAt?: string }>;
  assert.equal(dismissedElsewhere[0]?.dismissedAt, "2026-09-03T00:00:00.000Z", "a dismissal on the other device survives the merge");
  assert.deepEqual(sanitizeBackupValue(STORAGE_KEYS.vocabularyQueue, [alpha, { bad: true }, null]), [alpha], "malformed rows are dropped on import");

  console.log("Learning quality checks passed: F01 cloze forms, F02/F03 term resolution, F05 timing split, F06 first-attempt evidence, F07 tested≠passed, F08 confirmed-only reasons, F09 focus reaches the plan, F10 vocabulary queue, F11 mastery gap, F12 review backlog.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
