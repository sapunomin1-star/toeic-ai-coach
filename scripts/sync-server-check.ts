/**
 * Regression check for the production Upstash read path.
 *
 * The production client intentionally sets automaticDeserialization=false.
 * In that mode @upstash/redis returns HGETALL replies as alternating raw
 * [field, value, ...] arrays, unlike the object returned by the dev fallback.
 * This test keeps that SDK boundary real and mocks only the HTTP response.
 */
import { strict as assert } from "node:assert";

type RawHash = Record<string, string>;

const META_HASH = "toeic:sync:v1:meta";
const DATA_HASH = "toeic:sync:v1:data";

function rawHashReply(hash: RawHash): string[] {
  return Object.entries(hash).flatMap(([field, value]) => [field, value]);
}

async function main(): Promise<void> {
  // Supplying Redis credentials forces lib/server/redis.ts down the production
  // Upstash path even when this script runs under NODE_ENV=development.
  process.env.UPSTASH_REDIS_REST_URL = "https://sync-server-check.invalid";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
  process.env.UPSTASH_DISABLE_TELEMETRY = "1";

  const { SYNC_KEYS } = await import("../lib/syncShared");
  assert.equal(SYNC_KEYS.length, 12, "the fixture must cover every synced key");

  const tombstoneKey = SYNC_KEYS[SYNC_KEYS.length - 2];
  const missingDataKey = SYNC_KEYS[SYNC_KEYS.length - 1];
  const rawMeta: RawHash = {};
  const rawData: RawHash = {};
  const expected: Record<
    string,
    { t: number; deleted?: boolean; v?: string }
  > = {};

  SYNC_KEYS.forEach((key, index) => {
    const t = 1_720_000_000_000 + index;
    if (key === tombstoneKey) {
      rawMeta[key] = JSON.stringify({ t, deleted: true });
      // A stale data-hash field must never escape through a tombstone.
      rawData[key] = JSON.stringify({ stale: true });
      expected[key] = { t, deleted: true };
      return;
    }

    rawMeta[key] = JSON.stringify({ t });
    if (key === missingDataKey) {
      // A valid meta entry without a data field remains value-less.
      expected[key] = { t };
      return;
    }

    const value = JSON.stringify({ device: "A", key, index });
    rawData[key] = value;
    expected[key] = { t, v: value };
  });

  // Corrupt metadata must not expose its corresponding data, and an orphaned
  // data field without metadata must not become an envelope.
  rawMeta["corrupt-meta-json"] = "{not-json";
  rawData["corrupt-meta-json"] = JSON.stringify({ mustNotLeak: true });
  rawMeta["corrupt-meta-time"] = JSON.stringify({ t: "soon" });
  rawData["corrupt-meta-time"] = JSON.stringify({ mustNotLeak: true });
  rawData["orphan-data-only"] = JSON.stringify({ mustNotLeak: true });

  const originalFetch = globalThis.fetch;
  let requestCount = 0;
  const mockFetch: typeof fetch = async (_input, init) => {
    requestCount += 1;
    assert.equal(init?.method, "POST", "Upstash pipeline should use POST");
    assert.equal(
      typeof init?.body,
      "string",
      "Upstash pipeline body should be JSON text",
    );

    const commands = JSON.parse(init.body as string) as unknown;
    assert.deepEqual(
      commands,
      [
        ["hgetall", META_HASH],
        ["hgetall", DATA_HASH],
      ],
      "readAll must request both Redis hashes in one pipeline",
    );

    return new Response(
      JSON.stringify([
        { result: rawHashReply(rawMeta) },
        { result: rawHashReply(rawData) },
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  };
  globalThis.fetch = mockFetch;

  try {
    // Import after installing the HTTP mock so the test uses the real SDK
    // client while guaranteeing no external request can escape.
    const { readAll } = await import("../lib/server/redis");
    const items = await readAll();

    assert.equal(requestCount, 1, "readAll should make exactly one pipeline request");
    assert.deepEqual(
      items,
      expected,
      "raw Upstash HGETALL replies must reconstruct the complete sync envelope map",
    );
    assert.equal(
      Object.prototype.hasOwnProperty.call(items[tombstoneKey], "v"),
      false,
      "tombstones must never expose stale data",
    );
    assert.equal(
      Object.prototype.hasOwnProperty.call(items[missingDataKey], "v"),
      false,
      "missing data must not become an undefined value field",
    );
    assert.equal(
      "corrupt-meta-json" in items ||
        "corrupt-meta-time" in items ||
        "orphan-data-only" in items,
      false,
      "corrupt or orphaned Redis fields must not leak into API items",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  console.log("Sync server Upstash regression checks passed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
