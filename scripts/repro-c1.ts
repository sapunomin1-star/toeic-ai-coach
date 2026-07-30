import { strict as assert } from "node:assert";
import type { FullMockResult } from "../types/mock";

type LocalStorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
};

class MemoryLocalStorage implements LocalStorageLike {
  private readonly data = new Map<string, string>();
  private setCalls = 0;
  private failOnSetCall: number | null = null;

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.setCalls++;
    if (this.setCalls === this.failOnSetCall) {
      this.failOnSetCall = null;
      throw new DOMException("Storage full", "QuotaExceededError");
    }
    this.data.set(key, value);
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  clear(): void {
    this.data.clear();
  }

  failAfterSuccessfulWrites(count: number): void {
    this.failOnSetCall = this.setCalls + count + 1;
  }
}

const localStorageMock = new MemoryLocalStorage();
const alerts: string[] = [];
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});
Object.defineProperty(globalThis, "window", {
  value: { localStorage: localStorageMock },
  configurable: true,
});
Object.defineProperty(globalThis, "alert", {
  value: (message: string) => alerts.push(message),
  configurable: true,
});

async function main(): Promise<void> {
  const { STORAGE_KEYS } = await import("../lib/storageCore");
  const {
    addManualReviewEntry,
    clearWrongAnswers,
    exportAllData,
    getManualReviewEntries,
    getReviewableIds,
    getWrongBookEntries,
    getWrongStatusMap,
    importAllData,
    removeManualReviewEntry,
    sanitizeBackupValue,
  } = await import("../lib/storage");
  const {
    getDailySessionActivity,
    getVocabularyProgress,
    saveVocabularyQuizResult,
  } = await import("../lib/vocabularyStorage");
  const {
    getMockResults,
    getMockSession,
    saveMockResult,
    startMockSession,
  } = await import("../lib/mockStorage");
  const {
    getFullMockSession,
    saveFullMockResult,
    startFullMockSession,
  } = await import("../lib/fullMockStorage");

  localStorage.clear();
  localStorage.setItem(STORAGE_KEYS.answerRecords, JSON.stringify([]));

  const exported = exportAllData();
  assert.ok(exported, "exportAllData should return JSON");
  const snapshot = JSON.parse(exported);
  assert.equal(
    Object.hasOwn(snapshot, STORAGE_KEYS.wrongStatus),
    false,
    "export should omit missing wrong-status key instead of serializing null",
  );

  localStorage.clear();
  assert.equal(importAllData(exported), true, "round-trip import should succeed");
  assert.equal(
    localStorage.getItem(STORAGE_KEYS.wrongStatus),
    null,
    "import should not write missing wrong-status key as string null",
  );
  assert.deepEqual(getWrongStatusMap(), {});
  assert.deepEqual(getReviewableIds(), []);
  assert.deepEqual(getWrongBookEntries(), []);

  localStorage.setItem(STORAGE_KEYS.wrongStatus, "null");
  assert.deepEqual(
    getWrongStatusMap(),
    {},
    "legacy poisoned string null should be read as an empty wrong-status map",
  );
  assert.deepEqual(getReviewableIds(), []);
  assert.deepEqual(getWrongBookEntries(), []);

  // Import must be atomic: a quota failure after one successful write should
  // restore every touched key instead of leaving new and old data mixed.
  localStorage.clear();
  const oldAnswers = JSON.stringify([
    {
      questionId: "p5-gen-001",
      userAnswer: "A",
      correctAnswer: "D",
      isCorrect: false,
      skill_tag: "passive_voice",
      answeredAt: new Date().toISOString(),
    },
  ]);
  const oldPlan = JSON.stringify({
    questionIds: ["old-question"],
    createdAt: new Date().toISOString(),
    cursor: 0,
  });
  localStorage.setItem(STORAGE_KEYS.answerRecords, oldAnswers);
  localStorage.setItem(STORAGE_KEYS.dailyPlan, oldPlan);

  const replacement = JSON.stringify({
    _exportedAt: new Date().toISOString(),
    [STORAGE_KEYS.answerRecords]: [],
    [STORAGE_KEYS.dailyPlan]: {
      questionIds: ["new-question"],
      createdAt: new Date().toISOString(),
      cursor: 0,
    },
  });
  localStorageMock.failAfterSuccessfulWrites(1);
  assert.equal(importAllData(replacement), false);
  assert.equal(localStorage.getItem(STORAGE_KEYS.answerRecords), oldAnswers);
  assert.equal(localStorage.getItem(STORAGE_KEYS.dailyPlan), oldPlan);
  assert.match(alerts.at(-1) ?? "", /儲存空間不足/);

  // Mock result persistence must report quota failures so the runner can keep
  // the active session instead of deleting the only recoverable exam state.
  localStorage.clear();
  const mockSession = startMockSession(["mock-question-1"], "reading");
  const mockResult = {
    id: "mock-reading-regression",
    mode: "reading" as const,
    questionIds: ["mock-question-1"],
    answers: {},
    unansweredIds: ["mock-question-1"],
    startedAt: mockSession.startedAt,
    endTime: mockSession.endTime,
    submittedAt: new Date().toISOString(),
    rawScore: 0,
    scoreRange: { min: 5, max: 15 },
    partBreakdown: { "Part 5": { correct: 0, total: 1 } },
    timeUsedMs: 1_000,
  };

  localStorageMock.failAfterSuccessfulWrites(0);
  assert.equal(saveMockResult(mockResult, "reading"), false);
  assert.ok(
    getMockSession("reading"),
    "failed result persistence must leave the active session recoverable",
  );
  assert.deepEqual(getMockResults("reading"), []);

  assert.equal(saveMockResult(mockResult, "reading"), true);
  assert.equal(
    saveMockResult(
      { ...mockResult, reviewSnapshotId: "review-mock-reading-regression" },
      "reading",
    ),
    true,
  );
  const storedResults = getMockResults("reading");
  assert.equal(storedResults.length, 1, "saving the same result id must upsert, not duplicate");
  assert.equal(storedResults[0].reviewSnapshotId, "review-mock-reading-regression");

  // A malformed/legacy half-mock session without unansweredIds previously
  // passed validation and then crashed saveAnswer on .filter/.includes.
  const malformedSession = { ...mockSession } as Record<string, unknown>;
  delete malformedSession.unansweredIds;
  localStorage.setItem(
    STORAGE_KEYS.readingMockSession,
    JSON.stringify(malformedSession),
  );
  assert.equal(
    getMockSession("reading"),
    null,
    "sessions missing unansweredIds must be rejected before mutation",
  );

  // Full-mock storage uses the same boolean contract and must likewise leave
  // all 200-question progress available when the result write is rejected.
  localStorage.clear();
  const fullQuestionIds = Array.from(
    { length: 200 },
    (_, index) => `full-mock-question-${index + 1}`,
  );
  const fullSession = startFullMockSession(fullQuestionIds);
  const fullResult: FullMockResult = {
    id: "mock-full-regression",
    questionIds: fullQuestionIds,
    answers: {},
    unansweredIds: fullQuestionIds,
    startedAt: fullSession.startedAt,
    endTime: fullSession.endTime,
    submittedAt: new Date().toISOString(),
    listeningRaw: 0,
    readingRaw: 0,
    listeningRange: { min: 5, max: 15 },
    readingRange: { min: 5, max: 15 },
    totalRange: { min: 10, max: 30 },
    listeningCEFR: { primary: "A1" },
    readingCEFR: { primary: "A1" },
    partBreakdown: {},
    leftAppDuringTest: false,
    timeUsedMs: 1_000,
    listeningTimeUsedMs: 1_000,
  };
  localStorageMock.failAfterSuccessfulWrites(0);
  assert.equal(saveFullMockResult(fullResult), false);
  assert.ok(
    getFullMockSession(),
    "failed full-mock result persistence must leave the active session recoverable",
  );

  // A mock lives entirely in its persisted session: starting one that was
  // never written puts the student into a 45-120 minute exam that one refresh
  // erases. The start must fail loudly instead.
  localStorage.clear();
  localStorageMock.failAfterSuccessfulWrites(0);
  assert.throws(
    () => startMockSession(["mock-question-1"], "reading"),
    /儲存空間不足/,
    "an unwritable reading-mock session must abort the start",
  );
  assert.equal(getMockSession("reading"), null);

  localStorageMock.failAfterSuccessfulWrites(0);
  assert.throws(
    () => startFullMockSession(fullQuestionIds),
    /儲存空間不足/,
    "an unwritable full-mock session must abort the start",
  );
  assert.equal(getFullMockSession(), null);

  // ─── Clearing review queues must leave tombstones, not holes ──────────────
  // Both queues merge as a union across devices, so an emptied map gives the
  // other device's stale copy nothing to lose against: see sync-merge-check
  // for the merge half of this contract.
  localStorage.clear();
  localStorage.setItem(
    STORAGE_KEYS.wrongStatus,
    JSON.stringify({
      "p5-gen-001": { status: "new", consecutiveCorrect: 0, nextReviewDate: "2026-01-01" },
    }),
  );
  addManualReviewEntry({
    questionId: "p7-gen-010",
    skill_tag: "reading_detail",
    correctAnswer: "B",
  });
  assert.equal(getManualReviewEntries().length, 1);

  clearWrongAnswers();
  const clearedStatus = getWrongStatusMap();
  assert.equal(
    Object.keys(clearedStatus).length,
    1,
    "clearing must keep the row as a tombstone, not delete it",
  );
  assert.equal(clearedStatus["p5-gen-001"].dismissed, true);
  assert.ok(clearedStatus["p5-gen-001"].dismissedAt, "a dismissal needs a timestamp to merge on");
  assert.deepEqual(getReviewableIds(), [], "dismissed entries must leave the review queue");
  assert.deepEqual(getManualReviewEntries(), [], "cleared manual entries must be hidden");
  const storedManual = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.manualReviewItems) ?? "[]",
  ) as Array<{ questionId: string; dismissedAt?: string }>;
  assert.equal(storedManual.length, 1, "the manual row must survive as a tombstone");
  assert.ok(storedManual[0].dismissedAt);

  // Re-adding after a dismissal revives the entry (addedAt > dismissedAt).
  addManualReviewEntry({
    questionId: "p7-gen-010",
    skill_tag: "reading_detail",
    correctAnswer: "B",
  });
  assert.equal(getManualReviewEntries().length, 1, "re-adding must clear the tombstone");
  removeManualReviewEntry("p7-gen-010");
  assert.deepEqual(getManualReviewEntries(), [], "removal must hide it again");

  // ─── Vocabulary progress must never be traded for a failed write ──────────
  // Legacy rows (no SRS fields) trigger a migration write-back. That write is
  // an optimisation; if it throws, the parsed rows are still correct and must
  // be returned, or the next save persists a near-empty array over them.
  localStorage.clear();
  const legacyProgress = Array.from({ length: 20 }, (_, index) => ({
    wordId: `word-${index}`,
    status: "seen",
    reviewedAt: "2026-07-01T00:00:00.000Z",
  }));
  localStorage.setItem(
    STORAGE_KEYS.vocabularyProgress,
    JSON.stringify(legacyProgress),
  );
  localStorageMock.failAfterSuccessfulWrites(0);
  assert.equal(
    getVocabularyProgress().length,
    20,
    "a failed migration write-back must not discard the progress it just parsed",
  );

  // Let the migration land this time, so the next read needs no write-back and
  // the injected failure lands on the SRS write itself.
  assert.equal(getVocabularyProgress().length, 20);

  // A quiz answer whose SRS row could not be written must not be credited:
  // marking the daily session done over an unsaved row shows the user progress
  // the next session cannot see.
  // Local date, matching vocabularyStorage's todayStr — a UTC slice is a day
  // off in CST for eight hours out of every twenty-four.
  const now = new Date();
  const todayLocal = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  localStorage.setItem(
    STORAGE_KEYS.vocabularyDailySession,
    JSON.stringify({
      date: todayLocal,
      itemBuckets: [{ wordId: "word-0", bucket: "due" }],
      counts: { retry: 0, due: 1, masteredReview: 0, new: 0 },
      warnings: { newSuppressed: false, retryDeferred: 0 },
      reviewedIds: [],
      validatedIds: [],
      reinforcementIds: [],
      reinforcementRound: 0,
    }),
  );
  localStorageMock.failAfterSuccessfulWrites(0);
  const failedQuiz = saveVocabularyQuizResult("word-0", true, "daily");
  assert.equal(failedQuiz.persisted, false, "an unwritable SRS update must report failure");
  assert.deepEqual(
    getDailySessionActivity().validatedIds,
    [],
    "the daily session must not be credited for an unsaved answer",
  );

  const savedQuiz = saveVocabularyQuizResult("word-0", true, "daily");
  assert.equal(savedQuiz.persisted, true);
  assert.deepEqual(getDailySessionActivity().validatedIds, ["word-0"]);

  // ─── Inbound payloads are cleaned per ROW, not just per container ────────
  // lib/syncMerge reads wordId / id / submittedAt off every element, so one
  // null row from a hand-edited backup or corrupted cloud value threw inside
  // the merge and broke every later pull.
  assert.deepEqual(
    sanitizeBackupValue(STORAGE_KEYS.vocabularyProgress, [null, { wordId: "ok" }]),
    [{ wordId: "ok" }],
  );
  assert.deepEqual(
    sanitizeBackupValue(STORAGE_KEYS.readingMockResults, [
      null,
      "junk",
      { id: "r1" },
      { id: "r2", submittedAt: "2026-07-01T00:00:00.000Z" },
    ]),
    [{ id: "r2", submittedAt: "2026-07-01T00:00:00.000Z" }],
  );

  console.log("Storage import and mock persistence regressions passed");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
