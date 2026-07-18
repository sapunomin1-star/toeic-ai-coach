import { strict as assert } from "node:assert";
import type { AnswerRecord, SkillTag } from "../types/question";

// ─── localStorage stub (same approach as repro-c1.ts) ───────────────────────

class MemoryLocalStorage {
  private readonly data = new Map<string, string>();
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
  clear(): void {
    this.data.clear();
  }
}

const localStorageMock = new MemoryLocalStorage();
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});
Object.defineProperty(globalThis, "window", {
  value: { localStorage: localStorageMock },
  configurable: true,
});
Object.defineProperty(globalThis, "alert", {
  value: () => {},
  configurable: true,
});

// ─── helpers ─────────────────────────────────────────────────────────────────

let recSeq = 0;
function rec(
  skill: SkillTag,
  questionId: string,
  isCorrect: boolean,
  minutesAgo: number,
  source?: "daily" | "mock",
): AnswerRecord {
  recSeq++;
  return {
    questionId,
    userAnswer: "A",
    correctAnswer: isCorrect ? "A" : "B",
    isCorrect,
    skill_tag: skill,
    answeredAt: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
    ...(source ? { source } : {}),
  };
}

function localDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function main(): Promise<void> {
  // ── 1. Part attribution: Part 5 stats must use the id prefix, not skill
  //       tags — 87 Part 6 questions carry grammar tags and used to leak in.
  const analysis = await import("../lib/analysis");

  const attribution: AnswerRecord[] = [
    rec("word_form", "p5-x-001", true, 50),
    rec("word_form", "p6-a-001", false, 40), // P6 with a grammar tag
    rec("business_vocabulary", "p6-b-002", true, 30), // P6 with a vocab tag
    rec("reading_detail", "p7-c-003", false, 20),
    rec("word_form", "p5-mock-004", false, 10, "mock"), // mock excluded
  ];
  assert.equal(
    analysis.countPart5Attempts(attribution),
    1,
    "Part 5 attempts must count only p5- records (P6 grammar tags excluded)",
  );
  assert.equal(
    analysis.calculatePart5Accuracy(attribution),
    100,
    "Part 5 accuracy must ignore the wrong P6 answer",
  );
  assert.equal(analysis.countPart6Attempts(attribution), 2);
  assert.equal(analysis.calculatePart6Accuracy(attribution), 50);

  // ── 2. Weakness ranking: recent error rate with a minimum sample, not
  //       lifetime mistake count. 5/6 wrong must outrank 8/20 wrong; a 2/2
  //       skill (too few samples) ranks after the qualified ones.
  const weakness: AnswerRecord[] = [];
  // word_form: 25 attempts — newest 20 have 8 wrong, oldest 5 all wrong
  // (outside the window; must not count).
  for (let i = 0; i < 20; i++) {
    weakness.push(rec("word_form", `p5-wf-${i}`, i >= 8, 100 + i));
  }
  for (let i = 0; i < 5; i++) {
    weakness.push(rec("word_form", `p5-wf-old-${i}`, false, 10_000 + i));
  }
  // tense: 6 attempts, 5 wrong → 83% error rate.
  for (let i = 0; i < 6; i++) {
    weakness.push(rec("tense", `p5-ts-${i}`, i === 0, 200 + i));
  }
  // preposition: 2 attempts, 2 wrong → below the minimum sample.
  weakness.push(rec("preposition", "p5-pr-0", false, 300));
  weakness.push(rec("preposition", "p5-pr-1", false, 301));

  const ranked = analysis.getWeakestSkills(weakness, 3);
  assert.deepEqual(
    ranked.map((r) => r.skill),
    ["tense", "word_form", "preposition"],
    "rate-qualified skills first (by error rate), low-sample skills appended",
  );
  assert.equal(
    ranked[1].mistakes,
    8,
    "window must cap word_form mistakes at the recent 20 attempts (8, not 13)",
  );

  const defaultListeningMix = analysis.getNextDayListeningMix([]);
  assert.deepEqual(
    {
      p1: defaultListeningMix.part1Count,
      p2: defaultListeningMix.part2Count,
      p3: defaultListeningMix.part3GroupCount,
      p4: defaultListeningMix.part4GroupCount,
    },
    { p1: 1, p2: 2, p3: 1, p4: 1 },
    "default listening mix must stay within the short daily workload",
  );

  const allListeningWeak: AnswerRecord[] = [];
  for (const part of [1, 2, 3, 4] as const) {
    const skill: SkillTag =
      part === 1
        ? "listening_photo"
        : part === 2
          ? "listening_response"
          : "listening_detail";
    for (let i = 0; i < 6; i++) {
      allListeningWeak.push(rec(skill, `p${part}-weak-${i}`, false, 400 + part * 10 + i));
    }
  }
  const cappedListeningMix = analysis.getNextDayListeningMix(allListeningWeak);
  const adaptiveListeningTotal =
    cappedListeningMix.part1Count +
    cappedListeningMix.part2Count +
    cappedListeningMix.part3GroupCount * 3 +
    cappedListeningMix.part4GroupCount * 3;
  assert.ok(
    adaptiveListeningTotal <= 12,
    `adaptive listening must stay at or below 12 questions, got ${adaptiveListeningTotal}`,
  );

  // ── 3. Daily plan prefers unanswered questions and falls back gracefully.
  const { buildDailyPlan, QUESTIONS } = await import("../data/questions");

  const part5 = QUESTIONS.filter((q) => q.part === "Part 5");
  const answeredExceptWordForm = new Set(
    part5.filter((q) => q.skill_tag !== "word_form").map((q) => q.id),
  );
  const plan = buildDailyPlan({
    weakSkillTags: ["word_form"],
    answeredIds: answeredExceptWordForm,
  });
  const p5Picks = plan.questions.filter((q) => q.id.startsWith("p5-"));
  assert.equal(p5Picks.length, 6, "default plan carries 3 weak + 3 new P5 questions");
  for (const q of p5Picks) {
    assert.ok(
      !answeredExceptWordForm.has(q.id),
      `plan must prefer unanswered questions, got repeat ${q.id}`,
    );
  }

  const defaultPart6 = plan.questions.filter((q) => q.part === "Part 6");
  assert.equal(defaultPart6.length, 4, "daily Part 6 must contain one complete 4-Q group");
  assert.equal(
    new Set(defaultPart6.map((q) => q.passage_group_id)).size,
    1,
    "daily Part 6 questions must share one passage group",
  );
  assert.deepEqual(
    defaultPart6.map((q) => q.question_order),
    [1, 2, 3, 4],
    "daily Part 6 group must preserve question_order",
  );

  const defaultPart7 = plan.questions.filter((q) => q.part === "Part 7");
  assert.ok(
    defaultPart7.length >= 2 && defaultPart7.length <= 4,
    `daily Part 7 single group must contain 2-4 questions, got ${defaultPart7.length}`,
  );
  assert.equal(
    new Set(defaultPart7.map((q) => q.passage_group_id)).size,
    1,
    "daily Part 7 questions must share one passage group",
  );
  assert.ok(
    defaultPart7.every((q) => q.passage_group_type === "single"),
    "daily Part 7 must use a complete single-passage group",
  );
  assert.deepEqual(
    defaultPart7.map((q) => q.question_order),
    [...defaultPart7]
      .sort((a, b) => (a.question_order ?? 0) - (b.question_order ?? 0))
      .map((q) => q.question_order),
    "daily Part 7 group must preserve question_order",
  );

  const validP6Groups = new Map<string, typeof QUESTIONS>();
  for (const question of QUESTIONS.filter(
    (q) => q.part === "Part 6" && q.passage_group_id,
  )) {
    const key = question.passage_group_id as string;
    validP6Groups.set(key, [...(validP6Groups.get(key) ?? []), question]);
  }
  const targetP6 = [...validP6Groups.values()].find((group) => group.length === 4);
  const validP7Groups = new Map<string, typeof QUESTIONS>();
  for (const question of QUESTIONS.filter(
      (q) =>
        q.part === "Part 7" &&
        q.passage_group_id &&
        q.passage_group_type === "single",
  )) {
    const key = question.passage_group_id as string;
    validP7Groups.set(key, [...(validP7Groups.get(key) ?? []), question]);
  }
  const targetP7 = [...validP7Groups.values()].find(
    (group) => group.length >= 2 && group.length <= 4,
  );
  assert.ok(targetP6 && targetP7, "question bank must contain valid daily P6/P7 groups");
  const targetP6Ids = new Set(targetP6.map((q) => q.id));
  const targetP7Ids = new Set(targetP7.map((q) => q.id));
  const groupedAnsweredIds = new Set(
    QUESTIONS.filter(
      (q) =>
        (q.part === "Part 6" && !targetP6Ids.has(q.id)) ||
        (q.part === "Part 7" && !targetP7Ids.has(q.id)),
    ).map((q) => q.id),
  );
  const unseenGroupPlan = buildDailyPlan({
    weakCount: 0,
    newCount: 0,
    part1Count: 0,
    part2Count: 0,
    part3GroupCount: 0,
    part4GroupCount: 0,
    answeredIds: groupedAnsweredIds,
  });
  assert.deepEqual(
    new Set(unseenGroupPlan.questions.filter((q) => q.part === "Part 6").map((q) => q.id)),
    targetP6Ids,
    "Part 6 group selection must prefer the only fully unseen group",
  );
  assert.deepEqual(
    new Set(unseenGroupPlan.questions.filter((q) => q.part === "Part 7").map((q) => q.id)),
    targetP7Ids,
    "Part 7 group selection must prefer the only fully unseen group",
  );

  const reviewIds = part5.slice(0, 4).map((q) => q.id);
  const reviewOnlyPlan = buildDailyPlan({
    weakCount: 0,
    newCount: 0,
    part6GroupCount: 0,
    part1Count: 0,
    part2Count: 0,
    part3GroupCount: 0,
    part4GroupCount: 0,
    readingGroupCount: 0,
    reviewIds,
  });
  assert.deepEqual(
    reviewOnlyPlan.questions.map((q) => q.id),
    reviewIds.slice(0, 3),
    "due reviews must be capped at 3 and placed at the very start of the plan",
  );

  const everything = new Set(QUESTIONS.map((q) => q.id));
  const fallbackPlan = buildDailyPlan({ answeredIds: everything });
  assert.equal(fallbackPlan.counts.weak, 3, "exhausted bank must still fill weak slots");
  assert.equal(fallbackPlan.counts.new, 3, "exhausted bank must still fill new slots");
  assert.equal(fallbackPlan.counts.part1, 1);
  assert.equal(fallbackPlan.counts.part2, 2);
  assert.equal(fallbackPlan.counts.part6, 4);
  assert.ok(fallbackPlan.counts.reading >= 2 && fallbackPlan.counts.reading <= 4);
  assert.equal(fallbackPlan.counts.part3, 3);

  // ── 4. Wrong-book SRS: a correct answer BEFORE the interval elapsed must
  //       not advance the ladder (same-day drilling used to reach "mastered").
  const { STORAGE_KEYS } = await import("../lib/storageCore");
  const {
    getDailyPlan,
    getQuizPlan,
    getReviewableIds,
    getWrongStatusMap,
    removeSingleWrong,
    saveDailyPlan,
    saveWrongPracticePlan,
    updateWrongStatus,
  } = await import("../lib/storage");

  // Submitted feedback advances the durable cursor immediately while keeping
  // the explanation resumable. A completed wrong-book plan with feedback must
  // not be discarded before the learner taps Next.
  localStorageMock.clear();
  const feedbackPlan = {
    questionIds: ["feedback-q1", "feedback-q2"],
    createdAt: new Date().toISOString(),
    cursor: 1,
    pendingFeedback: { questionId: "feedback-q1", userAnswer: "B" as const },
  };
  assert.equal(saveDailyPlan(feedbackPlan), true);
  assert.deepEqual(getDailyPlan()?.pendingFeedback, feedbackPlan.pendingFeedback);

  assert.equal(
    saveWrongPracticePlan({
      questionIds: ["wrong-feedback-q1"],
      createdAt: new Date().toISOString(),
      cursor: 1,
      pendingFeedback: {
        questionId: "wrong-feedback-q1",
        userAnswer: "C",
      },
    }),
    true,
  );
  assert.equal(
    getQuizPlan()?.source,
    "wrongbook",
    "completed wrong-book cursor must remain resumable while feedback is pending",
  );

  localStorageMock.setItem(
    STORAGE_KEYS.dailyPlan,
    JSON.stringify({
      ...feedbackPlan,
      pendingFeedback: { questionId: "feedback-q2", userAnswer: "B" },
    }),
  );
  localStorageMock.removeItem(STORAGE_KEYS.wrongPracticePlan);
  assert.equal(
    getDailyPlan(),
    null,
    "pending feedback must match the question immediately before the cursor",
  );

  localStorageMock.clear();
  updateWrongStatus("q1", false);
  let entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 1);
  assert.equal(entry.nextReviewDate, localDate(1));

  updateWrongStatus("q1", true); // same-day drill — not due yet
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 1, "early correct must not climb the interval");
  assert.equal(entry.consecutiveCorrect, 0, "early correct must not count toward mastery");
  assert.equal(entry.status, "new");

  function forceDue(): void {
    const map = getWrongStatusMap();
    map["q1"].nextReviewDate = localDate(-1);
    localStorageMock.setItem(STORAGE_KEYS.wrongStatus, JSON.stringify(map));
  }

  forceDue();
  updateWrongStatus("q1", true); // first spaced success
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 3);
  assert.equal(entry.status, "improving");
  assert.equal(entry.consecutiveCorrect, 1);

  forceDue();
  updateWrongStatus("q1", true); // second spaced success → mastered
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 7);
  assert.equal(entry.status, "mastered");
  assert.equal(entry.consecutiveCorrect, 2);

  updateWrongStatus("q1", false); // lapse always applies immediately
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 1);
  assert.equal(entry.status, "reviewing");
  assert.equal(entry.consecutiveCorrect, 0);

  // Due queue is oldest-first, stable on ties, excludes future/mastered/
  // dismissed entries, and treats manual review as immediately due.
  localStorageMock.clear();
  localStorageMock.setItem(
    STORAGE_KEYS.wrongStatus,
    JSON.stringify({
      "overdue-old": {
        status: "reviewing",
        consecutiveCorrect: 0,
        intervalDays: 1,
        nextReviewDate: localDate(-5),
      },
      "overdue-recent": {
        status: "reviewing",
        consecutiveCorrect: 0,
        intervalDays: 1,
        nextReviewDate: localDate(-1),
      },
      "today-b": {
        status: "new",
        consecutiveCorrect: 0,
        intervalDays: 1,
        nextReviewDate: localDate(0),
      },
      "today-a": {
        status: "new",
        consecutiveCorrect: 0,
        intervalDays: 1,
        nextReviewDate: localDate(0),
      },
      legacy: { status: "new", consecutiveCorrect: 0 },
      future: {
        status: "reviewing",
        consecutiveCorrect: 0,
        intervalDays: 3,
        nextReviewDate: localDate(2),
      },
      dismissed: {
        status: "new",
        consecutiveCorrect: 0,
        dismissed: true,
      },
      mastered: {
        status: "mastered",
        consecutiveCorrect: 2,
        intervalDays: 7,
        nextReviewDate: localDate(-1),
      },
    }),
  );
  localStorageMock.setItem(
    STORAGE_KEYS.manualReviewItems,
    JSON.stringify([
      {
        questionId: "manual-old",
        skill_tag: "word_form",
        correctAnswer: "A",
        addedAt: `${localDate(-3)}T12:00:00.000Z`,
        source: "mock-review",
      },
    ]),
  );
  assert.deepEqual(
    getReviewableIds(),
    ["overdue-old", "manual-old", "overdue-recent", "legacy", "today-a", "today-b"],
    "review queue must be overdue-first, stable on ties, and due-only",
  );

  // ── 5. Every newly-created vocabulary session keeps the learner's 20-new-
  //       word target; separately capped review buckets cannot crowd it out.
  const { VOCABULARY } = await import("../data/vocabulary");
  const { buildDailySession, getDailySessionActivity, loadVocabularyBank } =
    await import("../lib/vocabularyStorage");
  await loadVocabularyBank();

  localStorageMock.clear();
  const freshVocabularySession = buildDailySession();
  assert.equal(freshVocabularySession.items.length, 20);
  assert.equal(freshVocabularySession.counts.new, 20);
  assert.equal(freshVocabularySession.counts.due, 0);

  // A same-day session created under the former 8-word target is expanded in
  // place without losing already-reviewed or validated activity.
  localStorageMock.setItem(
    STORAGE_KEYS.vocabularyDailySession,
    JSON.stringify({
      date: localDate(0),
      itemBuckets: VOCABULARY.slice(0, 8).map((item) => ({
        wordId: item.id,
        bucket: "new",
      })),
      counts: { retry: 0, due: 0, masteredReview: 0, new: 8 },
      warnings: { newSuppressed: false, retryDeferred: 0 },
      reviewedIds: [VOCABULARY[0].id],
      validatedIds: [VOCABULARY[0].id],
      reinforcementIds: [],
      reinforcementRound: 0,
    }),
  );
  const upgradedVocabularySession = buildDailySession();
  assert.equal(upgradedVocabularySession.counts.new, 20);
  assert.equal(upgradedVocabularySession.items.length, 20);
  assert.equal(getDailySessionActivity().reviewedCount, 1);
  assert.equal(getDailySessionActivity().validatedCount, 1);

  const nowIso = new Date().toISOString();
  const retryProgress = VOCABULARY.slice(0, 3).map((item) => ({
    wordId: item.id,
    status: "seen",
    intervalDays: 0,
    nextReviewDate: localDate(0),
    consecutiveCorrect: 0,
    reviewedAt: nowIso,
    selfCheckCount: 0,
    lastSelfCheckDate: null,
    addedAt: nowIso,
  }));
  const dueProgress = VOCABULARY.slice(3, 8).map((item) => ({
    wordId: item.id,
    status: "seen",
    intervalDays: 1,
    nextReviewDate: localDate(-1),
    consecutiveCorrect: 0,
    reviewedAt: nowIso,
    selfCheckCount: 0,
    lastSelfCheckDate: null,
    addedAt: nowIso,
  }));
  const masteredProgress = VOCABULARY.slice(8, 10).map((item) => ({
    wordId: item.id,
    status: "mastered",
    intervalDays: 30,
    nextReviewDate: localDate(-1),
    consecutiveCorrect: 3,
    reviewedAt: nowIso,
    selfCheckCount: 0,
    lastSelfCheckDate: null,
    addedAt: nowIso,
  }));
  localStorageMock.clear();
  localStorageMock.setItem(
    STORAGE_KEYS.vocabularyProgress,
    JSON.stringify([...retryProgress, ...dueProgress, ...masteredProgress]),
  );
  const loadedVocabularySession = buildDailySession();
  assert.deepEqual(loadedVocabularySession.counts, {
    retry: 3,
    due: 5,
    masteredReview: 2,
    new: 20,
  });
  assert.equal(loadedVocabularySession.items.length, 30);
  assert.equal(loadedVocabularySession.warnings.newSuppressed, false);

  const retryOverflowProgress = VOCABULARY.slice(0, 20).map((item) => ({
    wordId: item.id,
    status: "seen",
    intervalDays: 0,
    nextReviewDate: localDate(0),
    consecutiveCorrect: 0,
    reviewedAt: nowIso,
    selfCheckCount: 0,
    lastSelfCheckDate: null,
    addedAt: nowIso,
  }));
  localStorageMock.clear();
  localStorageMock.setItem(
    STORAGE_KEYS.vocabularyProgress,
    JSON.stringify(retryOverflowProgress),
  );
  const cappedVocabularySession = buildDailySession();
  assert.equal(cappedVocabularySession.items.length, 30);
  assert.equal(cappedVocabularySession.counts.retry, 10);
  assert.equal(cappedVocabularySession.warnings.retryDeferred, 10);
  assert.equal(cappedVocabularySession.counts.new, 20);

  // ── 6. The wrong-status cap may prune dismissed tombstones, never active
  //       learning state. Active-only maps are allowed to remain over the soft cap.
  const activeStatusMap: Record<
    string,
    { status: "reviewing"; consecutiveCorrect: number; intervalDays: number; nextReviewDate: string }
  > = {};
  for (let i = 0; i < 501; i++) {
    activeStatusMap[`active-${String(i).padStart(3, "0")}`] = {
      status: "reviewing",
      consecutiveCorrect: 0,
      intervalDays: 1,
      nextReviewDate: localDate(1),
    };
  }
  localStorageMock.clear();
  localStorageMock.setItem(STORAGE_KEYS.wrongStatus, JSON.stringify(activeStatusMap));
  removeSingleWrong("new-dismissed-tombstone");
  const preservedActiveMap = getWrongStatusMap();
  assert.equal(
    Object.keys(preservedActiveMap).length,
    501,
    "active entries may remain over the soft cap when no dismissed entries remain",
  );
  for (const questionId of Object.keys(activeStatusMap)) {
    assert.ok(preservedActiveMap[questionId], `active status must never be pruned: ${questionId}`);
  }

  console.log(`Review regression checks passed (${recSeq} synthetic records)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
