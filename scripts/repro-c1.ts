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
    exportAllData,
    getReviewableIds,
    getWrongBookEntries,
    getWrongStatusMap,
    importAllData,
  } = await import("../lib/storage");
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

  console.log("Storage import and mock persistence regressions passed");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
