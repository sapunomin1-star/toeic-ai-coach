/**
 * Lazy env resolution for the sync backend. Everything is read at request
 * time (never module top-level) so `next build` succeeds on machines without
 * the env configured — a known Vercel Marketplace client pitfall.
 */

export type RedisConfig = { url: string; token: string };

/**
 * The Vercel Marketplace "Upstash for Redis" integration injects KV-prefixed
 * names (Vercel KV heritage); a manually connected Upstash db injects
 * UPSTASH_-prefixed ones. Accept both.
 */
export function resolveRedisConfig(): RedisConfig {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error(
      "Redis env missing: set UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN " +
        "(install the Upstash for Redis integration on the Vercel project, then `vercel env pull`).",
    );
  }
  return { url, token };
}

export function getSessionSecret(): Uint8Array {
  const raw = process.env.SYNC_SESSION_SECRET;
  if (!raw) {
    throw new Error("SYNC_SESSION_SECRET missing (run scripts/sync-setup.ts).");
  }
  const secret = Buffer.from(raw, "base64url");
  if (secret.length < 32) {
    throw new Error("SYNC_SESSION_SECRET must be ≥32 bytes base64url.");
  }
  return new Uint8Array(secret);
}

export type ScryptParams = {
  N: number;
  r: number;
  p: number;
  salt: Buffer;
  hash: Buffer;
};

/** Format: `scrypt:N:r:p:<saltB64url>:<hashB64url>` (colon-separated — `$` would be eaten by .env variable expansion). */
export function getAccessCodeHash(): ScryptParams {
  const raw = process.env.SYNC_ACCESS_CODE_HASH;
  if (!raw) {
    throw new Error("SYNC_ACCESS_CODE_HASH missing (run scripts/sync-setup.ts).");
  }
  const parts = raw.split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt") {
    throw new Error("SYNC_ACCESS_CODE_HASH malformed (expected scrypt:N:r:p:salt:hash).");
  }
  const [, nStr, rStr, pStr, saltStr, hashStr] = parts;
  const N = Number(nStr);
  const r = Number(rStr);
  const p = Number(pStr);
  const salt = Buffer.from(saltStr, "base64url");
  const hash = Buffer.from(hashStr, "base64url");
  if (
    !Number.isInteger(N) ||
    !Number.isInteger(r) ||
    !Number.isInteger(p) ||
    salt.length === 0 ||
    hash.length === 0
  ) {
    throw new Error("SYNC_ACCESS_CODE_HASH malformed.");
  }
  return { N, r, p, salt, hash };
}
