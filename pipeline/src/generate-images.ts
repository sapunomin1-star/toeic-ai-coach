#!/usr/bin/env npx tsx
/**
 * Generate TOEIC Part 1 photographs via OpenAI DALL-E 3 and upload to Vercel Blob.
 *
 * Usage:
 *   npx tsx pipeline/src/generate-images.ts --dry-run                  # preview only
 *   npx tsx pipeline/src/generate-images.ts --limit 2                  # test 2 questions
 *   npx tsx pipeline/src/generate-images.ts                            # all Part 1
 *   npx tsx pipeline/src/generate-images.ts --question p1-gen-005      # single
 *   npx tsx pipeline/src/generate-images.ts --force                    # re-upload existing
 *
 * Flags:
 *   --limit N               Process first N matching questions.
 *   --question <id>         Process one specific question (must be Part 1).
 *   --id-prefix <prefix>    Process only matching question ID prefixes.
 *   --id-from <id>          Process matching IDs lexically at or after this ID.
 *   --dry-run               Show plan only, no API calls.
 *   --force                 Re-generate even if Blob already has images/<id>.jpg.
 *   --quality <q>           "standard" (default) or "hd" (2x cost).
 *   --size <s>              "1024x1024" (default), "1792x1024", or "1024x1792".
 */
import "dotenv/config";
import OpenAI from "openai";
import { del, head, put } from "@vercel/blob";

import { QUESTIONS } from "../../data/questions";
import type { Question } from "../../types/question";

// ─── Config ──────────────────────────────────────────────────────────────
const MODEL = "gpt-image-1";
const RATE_LIMIT_RPM = 5;           // OpenAI tier 1 image-gen cap
// gpt-image-1 pricing (token-based; rough $/image for 1024x1024):
//   low:    ~$0.011
//   medium: ~$0.042
//   high:   ~$0.167
const COST_PER_IMAGE_USD = {
  low:    { "1024x1024": 0.011, "1536x1024": 0.016, "1024x1536": 0.016 },
  medium: { "1024x1024": 0.042, "1536x1024": 0.063, "1024x1536": 0.063 },
  high:   { "1024x1024": 0.167, "1536x1024": 0.250, "1024x1536": 0.250 },
};

const STYLE_PREFIX =
  "Photorealistic professional photograph of a business workplace setting. ";
const STYLE_SUFFIX =
  " Natural lighting, sharp focus, no text overlay, no watermark, no signage, no logos. People should be engaged in their activity rather than posing for the camera.";

type Quality = "low" | "medium" | "high";
type Size = "1024x1024" | "1536x1024" | "1024x1536";

// ─── CLI parsing ─────────────────────────────────────────────────────────
type Args = {
  limit?: number;
  question?: string;
  idPrefix?: string;
  idFrom?: string;
  dryRun: boolean;
  force: boolean;
  quality: Quality;
  size: Size;
};

function parseArgs(argv: string[]): Args {
  const out: Args = {
    dryRun: false,
    force: false,
    quality: "medium",
    size: "1024x1024",
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
    else if (a === "--limit") out.limit = parseInt(argv[++i], 10);
    else if (a === "--question") out.question = argv[++i];
    else if (a === "--id-prefix") out.idPrefix = argv[++i];
    else if (a === "--id-from") out.idFrom = argv[++i];
    else if (a === "--quality") out.quality = argv[++i] as Quality;
    else if (a === "--size") out.size = argv[++i] as Size;
    else if (a === "--help") {
      console.log("Usage: see file header");
      process.exit(0);
    }
  }
  return out;
}

function validateEnv(args: Args): void {
  const need: Record<string, string | undefined> = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  };
  const missing = Object.entries(need)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0 && !args.dryRun) {
    console.error("ERROR: missing env vars (must be set in pipeline/.env):");
    for (const k of missing) console.error(`  - ${k}`);
    process.exit(1);
  }
}

function buildPrompt(q: Question): string {
  if (!q.imageAlt) {
    throw new Error(`[${q.id}] no imageAlt field — required for DALL-E`);
  }
  return STYLE_PREFIX + q.imageAlt + STYLE_SUFFIX;
}

async function blobExists(pathname: string): Promise<boolean> {
  try {
    await head(pathname, { token: process.env.BLOB_READ_WRITE_TOKEN! });
    return true;
  } catch {
    return false;
  }
}

function selectQuestions(args: Args): Question[] {
  if (args.question) {
    const q = QUESTIONS.find((x) => x.id === args.question);
    if (!q) throw new Error(`question id not found: ${args.question}`);
    if (q.part !== "Part 1") {
      throw new Error(`images only supported for Part 1 (got ${q.part})`);
    }
    return [q];
  }
  let qs = QUESTIONS.filter((q) => q.part === "Part 1");
  if (args.idPrefix) qs = qs.filter((q) => q.id.startsWith(args.idPrefix!));
  if (args.idFrom) qs = qs.filter((q) => q.id.localeCompare(args.idFrom!) >= 0);
  if (args.limit !== undefined) qs = qs.slice(0, args.limit);
  return qs;
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv.slice(2));
  validateEnv(args);

  const questions = selectQuestions(args);
  console.log(`Selected ${questions.length} Part 1 questions`);
  if (questions.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  const costPer = COST_PER_IMAGE_USD[args.quality][args.size];
  const estCostUsd = questions.length * costPer;
  console.log(`Model:              ${MODEL}`);
  console.log(`Quality / size:     ${args.quality} / ${args.size}`);
  console.log(`Cost per image:     $${costPer.toFixed(3)}`);
  console.log(`Estimated cost:     $${estCostUsd.toFixed(2)} USD`);
  console.log(`Rate limit:         ${RATE_LIMIT_RPM} requests/min`);
  console.log(`Estimated runtime:  ${Math.ceil(questions.length / RATE_LIMIT_RPM)} min(s)`);

  if (args.dryRun) {
    console.log("\n[dry-run] Plan:");
    for (const q of questions.slice(0, 5)) {
      const prompt = buildPrompt(q);
      console.log(`  [${q.id}] prompt chars=${prompt.length}`);
      console.log(`    "${prompt.slice(0, 100)}..."`);
    }
    if (questions.length > 5) console.log(`  ... and ${questions.length - 5} more`);
    return;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const token = process.env.BLOB_READ_WRITE_TOKEN!;

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  const failedIds: { id: string; reason: string }[] = [];

  const startTime = Date.now();
  const minMsPerRequest = 60_000 / RATE_LIMIT_RPM;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const pathname = `images/${q.id}.jpg`;

    try {
      const exists = await blobExists(pathname);
      if (!args.force && exists) {
        console.log(`[${i + 1}/${questions.length}] SKIP ${q.id} (exists)`);
        skipped++;
      } else {
        if (args.force && exists) {
          await del(pathname, { token });
        }
        const prompt = buildPrompt(q);
        const t0 = Date.now();

        const response = await openai.images.generate({
          model: MODEL,
          prompt,
          n: 1,
          size: args.size,
          quality: args.quality,
        });

        // gpt-image-1 returns b64_json by default (no response_format param)
        const b64 = response.data?.[0]?.b64_json;
        const tempUrl = response.data?.[0]?.url;
        let buf: Buffer;
        if (b64) {
          buf = Buffer.from(b64, "base64");
        } else if (tempUrl) {
          const imgResp = await fetch(tempUrl);
          if (!imgResp.ok) throw new Error(`download failed: ${imgResp.status}`);
          buf = Buffer.from(await imgResp.arrayBuffer());
        } else {
          throw new Error("no b64_json or url in response");
        }

        const blob = await put(pathname, buf, {
          access: "public",
          contentType: "image/jpeg",
          token,
          addRandomSuffix: false,
        });

        const ms = Date.now() - t0;
        console.log(
          `[${i + 1}/${questions.length}] OK   ${q.id} ${buf.length}B ${ms}ms -> ${blob.url}`,
        );
        generated++;
      }
    } catch (e) {
      failed++;
      const reason = (e as Error).message;
      failedIds.push({ id: q.id, reason });
      console.error(`[${i + 1}/${questions.length}] FAIL ${q.id}: ${reason}`);
    }

    const elapsedThisCycle = Date.now() - startTime - i * minMsPerRequest;
    const sleepMs = Math.max(0, minMsPerRequest - elapsedThisCycle);
    if (sleepMs > 0 && i < questions.length - 1) {
      await new Promise((r) => setTimeout(r, sleepMs));
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Generated: ${generated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);
  if (failedIds.length > 0) {
    console.log(`Failed details:`);
    for (const f of failedIds) console.log(`  ${f.id}: ${f.reason}`);
  }
  console.log(`Total time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
  console.log(`Estimated cost spent: $${(generated * costPer).toFixed(2)}`);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
