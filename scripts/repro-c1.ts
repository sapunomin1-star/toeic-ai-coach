import { strict as assert } from "node:assert";

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

  console.log("Storage import regressions passed");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
