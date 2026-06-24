import { strict as assert } from "node:assert";

type LocalStorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
};

class MemoryLocalStorage implements LocalStorageLike {
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
  value: () => undefined,
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

  console.log("C1 regression passed");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
