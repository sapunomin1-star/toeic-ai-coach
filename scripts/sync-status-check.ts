/**
 * Regression checks for what the sync badge is allowed to claim.
 *
 * "已同步" is the only signal the user has that their answers left the device.
 * Two paths used to reach it while the device was demonstrably behind: a CAS
 * rejection (server had newer state, so our push was refused and the key stayed
 * dirty) and a pull whose merged value could not be written to localStorage.
 * Both reported success. Run via `npm test`.
 */
import { strict as assert } from "node:assert";

class MemoryLocalStorage {
  private readonly data = new Map<string, string>();
  /** Keys whose writes throw, simulating a full quota for that value. */
  readonly rejectWrites = new Set<string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    if (this.rejectWrites.has(key)) {
      throw new DOMException("Storage full", "QuotaExceededError");
    }
    this.data.set(key, value);
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  clear(): void {
    this.data.clear();
    this.rejectWrites.clear();
  }
}

const localStorageMock = new MemoryLocalStorage();
const noopEvents = { addEventListener: () => {}, removeEventListener: () => {} };
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});
Object.defineProperty(globalThis, "window", {
  value: { localStorage: localStorageMock, ...noopEvents },
  configurable: true,
});
Object.defineProperty(globalThis, "document", {
  value: { visibilityState: "visible", ...noopEvents },
  configurable: true,
});

type FetchResult = { status?: number; body: unknown };
let nextResponses: FetchResult[] = [];
let fetchCalls = 0;

Object.defineProperty(globalThis, "fetch", {
  value: () => {
    fetchCalls++;
    const next = nextResponses.shift() ?? { body: { rejected: [] } };
    return Promise.resolve({
      ok: (next.status ?? 200) < 400,
      status: next.status ?? 200,
      json: () => Promise.resolve(next.body),
    });
  },
  configurable: true,
});

async function main(): Promise<void> {
  const { STORAGE_KEYS, SYNC_HINT_KEY } = await import("../lib/storageCore");
  const { bumpDirty, dirtyKeys, readSyncMeta } = await import("../lib/syncMeta");
  const { flush, getSyncStatus, initSyncEngine, initialPull } = await import(
    "../lib/syncEngine"
  );

  const KEY = STORAGE_KEYS.mockSeenQuestionIds;

  function bootEngine(): void {
    localStorageMock.clear();
    localStorage.setItem(SYNC_HINT_KEY, "1");
    assert.equal(initSyncEngine(), true, "the hint flag must enable the engine");
  }

  // 1. A CAS rejection leaves the key dirty. Claiming "synced" there tells the
  //    user their work is on the server when the server refused it.
  {
    bootEngine();
    localStorage.setItem(KEY, JSON.stringify(["q1"]));
    bumpDirty(KEY, 1_000);

    nextResponses = [
      // The push is rejected; the server hands back its newer state inline.
      { body: { rejected: [{ key: KEY, t: 2_000, v: JSON.stringify(["q2"]) }] } },
    ];
    await flush();

    assert.notEqual(
      getSyncStatus(),
      "synced",
      "a flush that ended with unpushed local state must not report synced",
    );
    assert.ok(
      dirtyKeys().length > 0 || getSyncStatus() === "syncing",
      "the rejected key must still be queued for a retry",
    );
    // The merged value (union of both sides) is what should be sitting locally.
    assert.deepEqual(
      JSON.parse(localStorage.getItem(KEY) ?? "[]"),
      ["q1", "q2"],
      "the rejected push must still merge the server's state in",
    );
  }

  // 2. A clean push (nothing rejected) is exactly when "synced" is honest.
  {
    bootEngine();
    localStorage.setItem(KEY, JSON.stringify(["q1"]));
    bumpDirty(KEY, 1_000);
    nextResponses = [{ body: { rejected: [] } }];
    await flush();
    assert.equal(getSyncStatus(), "synced", "an accepted push must report synced");
    assert.deepEqual(dirtyKeys(), [], "an accepted push must clear the dirty flag");
  }

  // 3. A pull whose value cannot be written locally leaves this device behind,
  //    so the badge must show an error rather than success.
  {
    bootEngine();
    localStorageMock.rejectWrites.add(KEY);
    nextResponses = [
      { body: { items: { [KEY]: { t: 5_000, v: JSON.stringify(["remote"]) } } } },
    ];
    await initialPull();

    assert.equal(
      localStorage.getItem(KEY),
      null,
      "precondition: the pulled value really did fail to persist",
    );
    assert.equal(
      getSyncStatus(),
      "error",
      "a pull that could not be persisted must not report synced",
    );
    assert.equal(
      readSyncMeta()[KEY],
      undefined,
      "meta must not adopt a server timestamp for state this device never stored",
    );
  }

  // 4. A pull that lands cleanly does report synced.
  {
    bootEngine();
    nextResponses = [
      { body: { items: { [KEY]: { t: 5_000, v: JSON.stringify(["remote"]) } } } },
    ];
    await initialPull();
    assert.deepEqual(JSON.parse(localStorage.getItem(KEY) ?? "[]"), ["remote"]);
    assert.equal(getSyncStatus(), "synced");
  }

  assert.ok(fetchCalls >= 4, "every case above must have reached the network stub");
  console.log("Sync status regression checks passed (4 cases)");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
