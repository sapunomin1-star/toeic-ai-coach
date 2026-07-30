/**
 * Regression checks for the cross-device sync merge layer:
 * - merge functions are deterministic, idempotent, and never lose user work
 * - reconcileKey decisions (tombstones, baseline, malformed payloads)
 * - sync meta bookkeeping (dirty lifecycle, in-flight protection)
 * - storageCore write events (silent vs user-intent removals)
 * Run via `npm test`.
 */
import { strict as assert } from "node:assert";
import type { AnswerRecord } from "../types/question";
import type { VocabularyProgress } from "../types/vocabulary";

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
  value: globalThis,
  configurable: true,
});

async function main(): Promise<void> {
  const { SKILL_TAG_LIST } = await import("../types/question");
  const { STORAGE_KEYS, removeJSON, subscribeStorageWrites, writeJSON } =
    await import("../lib/storageCore");
  const { SYNC_KEYS } = await import("../lib/syncShared");
  const { BACKUP_KEYS } = await import("../lib/storage");
  const { mergeAnswerRecords, mergeKey, reconcileKey } = await import(
    "../lib/syncMerge"
  );
  const {
    applyRemoteMeta,
    baselineMissingMeta,
    bumpDirty,
    dirtyKeys,
    markClean,
    readSyncMeta,
    recordTombstone,
  } = await import("../lib/syncMeta");

  const TAG = SKILL_TAG_LIST[0];
  const mkRecord = (
    questionId: string,
    answeredAt: string,
    extra: Partial<AnswerRecord> = {},
  ): AnswerRecord => ({
    questionId,
    userAnswer: "A",
    correctAnswer: "B",
    isCorrect: false,
    skill_tag: TAG,
    answeredAt,
    ...extra,
  });
  const mkVocab = (
    wordId: string,
    reviewedAt: string,
    extra: Partial<VocabularyProgress> = {},
  ): VocabularyProgress => ({
    wordId,
    status: "seen",
    intervalDays: 1,
    nextReviewDate: "2026-07-25",
    consecutiveCorrect: 1,
    reviewedAt,
    selfCheckCount: 0,
    lastSelfCheckDate: null,
    addedAt: "2026-07-01T00:00:00.000Z",
    ...extra,
  });

  // 1. SYNC_KEYS must stay the exact BACKUP_KEYS set.
  assert.deepEqual(
    [...SYNC_KEYS].sort(),
    [...BACKUP_KEYS].sort(),
    "SYNC_KEYS and BACKUP_KEYS drifted apart",
  );

  // 2. answerRecords: union, dedupe, label preservation, canonical order.
  const r1 = mkRecord("q1", "2026-07-20T01:00:00.000Z");
  const r2 = mkRecord("q2", "2026-07-20T02:00:00.000Z");
  const r2Labeled = { ...r2, mistakeReason: "vocab" as const };
  const r3 = mkRecord("q3", "2026-07-20T03:00:00.000Z");
  {
    const merged = mergeAnswerRecords([r1, r2Labeled], [r2, r3]);
    assert.equal(merged.length, 3, "union should dedupe by identity");
    assert.equal(
      merged.find((r) => r.questionId === "q2")?.mistakeReason,
      "vocab",
      "an unlabeled duplicate must not erase a mistake-reason label",
    );
    const labeledWins = mergeAnswerRecords([r2], [r2Labeled]);
    assert.equal(labeledWins[0].mistakeReason, "vocab", "labeled side should win");
    assert.deepEqual(
      merged.map((r) => r.questionId),
      ["q1", "q2", "q3"],
      "canonical order is by answeredAt",
    );
  }
  {
    const once = mergeKey(
      STORAGE_KEYS.answerRecords,
      [r1],
      [r2, r3],
      { localT: 1, remoteT: 2 },
    );
    const twice = mergeKey(
      STORAGE_KEYS.answerRecords,
      once.merged,
      [r2, r3],
      { localT: 3, remoteT: 2 },
    );
    assert.deepEqual(twice.merged, once.merged, "merge must be idempotent");
    assert.equal(twice.changedLocal, false, "re-merge must not change local");
    assert.equal(once.changedLocal, true);
    assert.equal(once.needPush, true);
  }

  // 3. vocabularyProgress: per-word activity beats whole-key freshness.
  {
    const localWord = mkVocab("w1", "2026-07-21T00:00:00.000Z");
    const remoteWord = mkVocab("w1", "2026-07-19T00:00:00.000Z", {
      lastQuizAt: "2026-07-22T00:00:00.000Z",
    });
    const res = mergeKey(
      STORAGE_KEYS.vocabularyProgress,
      [localWord],
      [remoteWord, mkVocab("w2", "2026-07-10T00:00:00.000Z")],
      { localT: 5, remoteT: 1 },
    );
    const words = res.merged as VocabularyProgress[];
    assert.equal(words.length, 2);
    assert.equal(
      words.find((w) => w.wordId === "w1")?.lastQuizAt,
      "2026-07-22T00:00:00.000Z",
      "the side that touched the word last must win even when its key is older",
    );
  }

  // 4. wrongStatus: union + dismissal preservation + re-surface semantics.
  {
    const dismissed = {
      status: "reviewing" as const,
      consecutiveCorrect: 0,
      dismissed: true,
      dismissedAt: "2026-07-20T00:00:00.000Z",
    };
    const plain = { status: "reviewing" as const, consecutiveCorrect: 1 };
    const union = mergeKey(
      STORAGE_KEYS.wrongStatus,
      { q1: plain },
      { q2: dismissed },
      { localT: 2, remoteT: 1 },
    ).merged as Record<string, unknown>;
    assert.deepEqual(Object.keys(union).sort(), ["q1", "q2"]);

    const kept = mergeKey(
      STORAGE_KEYS.wrongStatus,
      { q1: plain },
      { q1: dismissed },
      { localT: 2, remoteT: 1 },
    ).merged as Record<string, { dismissed?: boolean }>;
    assert.equal(
      kept.q1.dismissed,
      true,
      "a dismissal without newer counter-evidence must survive",
    );

    const resurfaced = {
      ...dismissed,
      dismissed: false,
      consecutiveCorrect: 0,
    };
    const stays = mergeKey(
      STORAGE_KEYS.wrongStatus,
      { q1: resurfaced },
      { q1: dismissed },
      { localT: 2, remoteT: 1 },
    ).merged as Record<string, { dismissed?: boolean }>;
    assert.equal(
      stays.q1.dismissed,
      false,
      "a re-surfaced entry (equal dismissedAt) must stay visible",
    );
  }

  // 5. manualReviewItems: answered-after-added entries stay removed.
  {
    const entry = {
      questionId: "q9",
      skill_tag: TAG,
      correctAnswer: "B" as const,
      addedAt: "2026-07-20T00:00:00.000Z",
      source: "mock-review" as const,
    };
    const answeredLater = mkRecord("q9", "2026-07-21T00:00:00.000Z");
    const res = mergeKey(STORAGE_KEYS.manualReviewItems, [], [entry], {
      localT: 2,
      remoteT: 1,
      mergedAnswerRecords: [answeredLater],
    });
    assert.deepEqual(res.merged, [], "practiced entries must not resurrect");

    const answeredBefore = mkRecord("q9", "2026-07-19T00:00:00.000Z");
    const keep = mergeKey(STORAGE_KEYS.manualReviewItems, [], [entry], {
      localT: 2,
      remoteT: 1,
      mergedAnswerRecords: [answeredBefore],
    });
    assert.equal((keep.merged as unknown[]).length, 1, "older answers keep entry");

    // Removal without practice: only a tombstone outlives the other device's
    // still-active copy. This is what "清除所有錯題" writes.
    const dismissed = { ...entry, dismissedAt: "2026-07-22T00:00:00.000Z" };
    const cleared = mergeKey(STORAGE_KEYS.manualReviewItems, [dismissed], [entry], {
      localT: 2,
      remoteT: 1,
    }).merged as Array<{ dismissedAt?: string }>;
    assert.equal(cleared.length, 1, "the row stays, as a tombstone");
    assert.equal(
      cleared[0].dismissedAt,
      "2026-07-22T00:00:00.000Z",
      "a dismissal must survive a stale active copy on the other device",
    );

    // …and the same in reverse: the dismissing device may be the older side.
    const clearedReversed = mergeKey(
      STORAGE_KEYS.manualReviewItems,
      [entry],
      [dismissed],
      { localT: 2, remoteT: 1 },
    ).merged as Array<{ dismissedAt?: string }>;
    assert.equal(clearedReversed[0].dismissedAt, "2026-07-22T00:00:00.000Z");

    // Re-adding after the dismissal revives it (addedAt > dismissedAt).
    const readded = { ...entry, addedAt: "2026-07-23T00:00:00.000Z" };
    const revived = mergeKey(STORAGE_KEYS.manualReviewItems, [readded], [dismissed], {
      localT: 2,
      remoteT: 1,
    }).merged as Array<{ dismissedAt?: string }>;
    assert.equal(
      revived[0].dismissedAt,
      undefined,
      "an entry added after the dismissal must come back",
    );
  }

  // 5b. A cleared wrong-book must stay cleared. Every entry is dismissed at
  // clear time (lib/storage clearWrongAnswers); the other device still holds
  // the live rows, and the union must not hand them back.
  {
    const live = { status: "reviewing" as const, consecutiveCorrect: 1 };
    const clearedAt = "2026-07-25T00:00:00.000Z";
    const localCleared = {
      q1: { ...live, dismissed: true, dismissedAt: clearedAt },
      q2: { ...live, dismissed: true, dismissedAt: clearedAt },
    };
    const staleRemote = { q1: live, q2: live };

    for (const [label, ctx] of [
      ["clearing device is newer", { localT: 2, remoteT: 1 }],
      ["clearing device is older", { localT: 1, remoteT: 2 }],
    ] as const) {
      const merged = mergeKey(
        STORAGE_KEYS.wrongStatus,
        localCleared,
        staleRemote,
        ctx,
      ).merged as Record<string, { dismissed?: boolean }>;
      assert.equal(merged.q1.dismissed, true, `q1 must stay cleared (${label})`);
      assert.equal(merged.q2.dismissed, true, `q2 must stay cleared (${label})`);
    }
  }

  // 6. mockSeenQuestionIds: sorted set union.
  {
    const res = mergeKey(
      STORAGE_KEYS.mockSeenQuestionIds,
      ["b", "a"],
      ["c", "a"],
      { localT: 1, remoteT: 2 },
    );
    assert.deepEqual(res.merged, ["a", "b", "c"]);
  }

  // 7. results: id union, cap 20, newest kept.
  {
    const mk = (i: number) => ({
      id: `r${i}`,
      submittedAt: `2026-07-${String((i % 28) + 1).padStart(2, "0")}T0${i % 10}:00:00.000Z`,
    });
    const local = Array.from({ length: 15 }, (_, i) => mk(i));
    const remote = Array.from({ length: 10 }, (_, i) => mk(i + 15));
    const res = mergeKey(STORAGE_KEYS.readingMockResults, local, remote, {
      localT: 1,
      remoteT: 2,
    });
    const merged = res.merged as Array<{ id: string }>;
    assert.equal(merged.length, 20, "capped at 20");
    assert.equal(
      merged.some((r) => r.id === "r24"),
      true,
      "newest results survive the cap",
    );
  }

  // 8. Transient keys: whole-key LWW.
  {
    const localPlan = { questionIds: ["q1"], createdAt: "2026-07-24T01:00:00.000Z", cursor: 1 };
    const remotePlan = { questionIds: ["q2"], createdAt: "2026-07-24T02:00:00.000Z", cursor: 0 };
    const remoteWins = mergeKey(STORAGE_KEYS.dailyPlan, localPlan, remotePlan, {
      localT: 1,
      remoteT: 2,
    });
    assert.deepEqual(remoteWins.merged, remotePlan);
    assert.equal(remoteWins.changedLocal, true);
    const localWins = mergeKey(STORAGE_KEYS.dailyPlan, localPlan, remotePlan, {
      localT: 3,
      remoteT: 2,
    });
    assert.deepEqual(localWins.merged, localPlan);
    assert.equal(localWins.needPush, true);
  }

  // 9. reconcileKey: tombstones in both directions.
  {
    const del = reconcileKey(
      STORAGE_KEYS.dailyPlan,
      { value: { questionIds: [], createdAt: "x", cursor: 0 }, metaT: 5, metaDeleted: false },
      { t: 9, deleted: true },
      100,
    );
    assert.deepEqual(del, { action: "removeLocal", t: 9 });

    const survive = reconcileKey(
      STORAGE_KEYS.answerRecords,
      { value: [r1], metaT: 9, metaDeleted: false },
      { t: 5, deleted: true },
      100,
    );
    assert.deepEqual(survive, { action: "pushLocal" }, "newer local beats old tombstone");
  }

  // 10. reconcileKey baseline (first login): remote must never clobber local.
  {
    const res = reconcileKey(
      STORAGE_KEYS.answerRecords,
      { value: [r1], metaT: 100, metaDeleted: false },
      { t: 50, v: JSON.stringify([r3]) },
      100,
    );
    assert.equal(res.action, "writeLocalAndPush", "disjoint histories must union");
    assert.equal(
      (res as { value: AnswerRecord[] }).value.length,
      2,
      "both sides' records survive first sync",
    );

    const planRes = reconcileKey(
      STORAGE_KEYS.dailyPlan,
      {
        value: { questionIds: ["q1"], createdAt: "2026-07-24T01:00:00.000Z", cursor: 1 },
        metaT: 100,
        metaDeleted: false,
      },
      {
        t: 50,
        v: JSON.stringify({ questionIds: ["q2"], createdAt: "2026-07-24T00:00:00.000Z", cursor: 0 }),
      },
      100,
    );
    assert.deepEqual(planRes, { action: "pushLocal" }, "newer local plan wins LWW");
  }

  // 11. Malformed remote payloads never win.
  {
    const bad = reconcileKey(
      STORAGE_KEYS.answerRecords,
      { value: [r1], metaT: 1, metaDeleted: false },
      { t: 9, v: "{not json" },
      100,
    );
    assert.deepEqual(bad, { action: "pushLocal" });

    const filtered = reconcileKey(
      STORAGE_KEYS.answerRecords,
      { value: undefined, metaT: 0, metaDeleted: false },
      { t: 9, v: JSON.stringify([r1, { junk: true }, 42]) },
      100,
    );
    assert.equal(filtered.action, "writeLocal");
    assert.deepEqual(
      (filtered as { value: unknown }).value,
      [r1],
      "sanitizer strips garbage rows from remote payloads",
    );
  }

  // 12. Sync meta bookkeeping.
  {
    localStorageMock.clear();
    const KEY = STORAGE_KEYS.answerRecords;
    bumpDirty(KEY, 10);
    assert.deepEqual(dirtyKeys(), [KEY]);
    markClean(KEY, 9);
    assert.deepEqual(dirtyKeys(), [KEY], "stale flush must not clear dirty");
    markClean(KEY, 10);
    assert.deepEqual(dirtyKeys(), [], "exact flush clears dirty");
    assert.equal(readSyncMeta()[KEY]?.t, 10);

    recordTombstone(KEY, 20);
    assert.equal(readSyncMeta()[KEY]?.deleted, true);
    markClean(KEY, 20);
    assert.equal(readSyncMeta()[KEY]?.deleted, true, "tombstone survives clean");
    assert.equal(readSyncMeta()[KEY]?.dirty, undefined);

    applyRemoteMeta(KEY, 30);
    assert.deepEqual(readSyncMeta()[KEY], { t: 30 });

    localStorageMock.clear();
    localStorageMock.setItem(STORAGE_KEYS.wrongStatus, "{}");
    const stamped = baselineMissingMeta(77);
    assert.deepEqual(stamped, [STORAGE_KEYS.wrongStatus]);
    assert.deepEqual(readSyncMeta()[STORAGE_KEYS.wrongStatus], { t: 77, dirty: true });
    assert.deepEqual(baselineMissingMeta(88), [], "baseline stamps only once");
  }

  // 13. storageCore events: silent vs user-intent.
  {
    const events: Array<{ key: string; kind: string; silent: boolean }> = [];
    const unsubscribe = subscribeStorageWrites((e) => events.push(e));
    writeJSON("k1", { a: 1 });
    removeJSON("k1");
    removeJSON("k1", { silent: true });
    unsubscribe();
    writeJSON("k1", { a: 2 });
    assert.deepEqual(events, [
      { key: "k1", kind: "write", silent: false },
      { key: "k1", kind: "remove", silent: false },
      { key: "k1", kind: "remove", silent: true },
    ]);
  }

  // 14. B2 regression: a silent TTL expiry leaves no tombstone, so a newer
  // remote plan still lands after the local copy expired.
  {
    const res = reconcileKey(
      STORAGE_KEYS.dailyPlan,
      { value: undefined, metaT: 10, metaDeleted: false },
      {
        t: 20,
        v: JSON.stringify({ questionIds: ["q5"], createdAt: "2026-07-24T05:00:00.000Z", cursor: 0 }),
      },
      100,
    );
    assert.equal(res.action, "writeLocal", "expiry must not block newer remote plans");
  }

  console.log("Sync merge and meta regression checks passed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
