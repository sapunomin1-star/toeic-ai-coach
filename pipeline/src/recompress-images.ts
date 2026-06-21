#!/usr/bin/env npx tsx
/**
 * One-time backfill: re-encode existing Part 1 photographs in Vercel Blob.
 *
 * gpt-image-1 images were uploaded raw (~1.4 MB PNG bytes mislabelled as
 * image/jpeg). This downloads each, backs up the original locally, re-encodes
 * to a real JPEG with sharp, and overwrites the SAME path (images/<id>.jpg).
 *
 * The path/extension/contentType never change, so nothing in the app needs to
 * change (lib/media.ts hardcodes images/<id>.jpg, contentType image/jpeg).
 *
 * Already-JPEG blobs are skipped, so this is idempotent / safe to re-run.
 *
 * Usage (from pipeline/):
 *   npm run recompress-images -- --dry-run        # plan only, no writes
 *   npm run recompress-images -- --id p1-gen-001  # one image
 *   npm run recompress-images -- --limit 1        # first matching image
 *   npm run recompress-images                      # all Part 1
 *   npm run recompress-images -- --force          # re-encode even if already JPEG
 *   npm run recompress-images -- --quality 80     # override JPEG quality (default 82)
 *   npm run recompress-images -- --no-backup      # skip local backup (not advised)
 */
import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { put } from "@vercel/blob";

import { QUESTIONS } from "../../data/questions";
import type { Question } from "../../types/question";

const DEFAULT_QUALITY = 82;
const MAX_EDGE = 1024;
const BACKUP_DIR = fileURLToPath(new URL("../output/backup-images/", import.meta.url));

type Args = {
  dryRun: boolean;
  force: boolean;
  backup: boolean;
  limit?: number;
  id?: string;
  quality: number;
};

function parseArgs(argv: string[]): Args {
  const out: Args = { dryRun: false, force: false, backup: true, quality: DEFAULT_QUALITY };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
    else if (a === "--no-backup") out.backup = false;
    else if (a === "--limit") out.limit = parseInt(argv[++i], 10);
    else if (a === "--id") out.id = argv[++i];
    else if (a === "--quality") out.quality = parseInt(argv[++i], 10);
    else if (a === "--help") {
      console.log("Usage: see file header");
      process.exit(0);
    }
  }
  return out;
}

function getBlobBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/+$/, "") ?? "";
}

function detectFormat(buf: Buffer): { kind: "png" | "jpeg" | "webp" | "unknown"; ext: string } {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return { kind: "png", ext: "png" };
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff)
    return { kind: "jpeg", ext: "jpg" };
  if (buf.length >= 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP")
    return { kind: "webp", ext: "webp" };
  return { kind: "unknown", ext: "bin" };
}

function selectQuestions(args: Args): Question[] {
  let qs = QUESTIONS.filter((q) => q.part === "Part 1");
  // Skip explicit overrides: those images don't live at the convention path.
  qs = qs.filter((q) => !q.imageUrl);
  if (args.id) {
    qs = qs.filter((q) => q.id === args.id);
    if (qs.length === 0) throw new Error(`Part 1 question not found (or has imageUrl override): ${args.id}`);
  }
  if (args.limit !== undefined) qs = qs.slice(0, args.limit);
  return qs;
}

function kb(n: number): string {
  return `${(n / 1024).toFixed(0)}KB`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const baseUrl = getBlobBaseUrl();
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!baseUrl) {
    console.error("ERROR: NEXT_PUBLIC_BLOB_BASE_URL must be set in pipeline/.env");
    process.exit(1);
  }
  if (!token && !args.dryRun) {
    console.error("ERROR: BLOB_READ_WRITE_TOKEN must be set in pipeline/.env");
    process.exit(1);
  }

  const questions = selectQuestions(args);
  console.log(`Selected ${questions.length} Part 1 image(s)`);
  console.log(`Quality: ${args.quality}  Max edge: ${MAX_EDGE}px  Backup: ${args.backup ? BACKUP_DIR : "OFF"}`);
  console.log(`Mode: ${args.dryRun ? "DRY-RUN (no writes)" : "LIVE (overwrites Blob)"}\n`);

  if (args.backup && !args.dryRun) await mkdir(BACKUP_DIR, { recursive: true });

  let recompressed = 0;
  let skipped = 0;
  let failed = 0;
  let totalBefore = 0;
  let totalAfter = 0;
  const fails: { id: string; reason: string }[] = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const pathname = `images/${q.id}.jpg`;
    const tag = `[${i + 1}/${questions.length}] ${q.id}`;
    try {
      const resp = await fetch(`${baseUrl}/${pathname}`);
      if (!resp.ok) throw new Error(`download ${resp.status}`);
      const original = Buffer.from(await resp.arrayBuffer());
      const fmt = detectFormat(original);
      totalBefore += original.length;

      if (fmt.kind === "jpeg" && !args.force) {
        console.log(`${tag} SKIP already JPEG (${kb(original.length)})`);
        skipped++;
        totalAfter += original.length;
        continue;
      }

      const jpeg = await sharp(original)
        .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: args.quality, mozjpeg: true })
        .toBuffer();

      const pct = ((1 - jpeg.length / original.length) * 100).toFixed(0);

      if (args.dryRun) {
        console.log(`${tag} would recompress ${fmt.kind} ${kb(original.length)} -> ${kb(jpeg.length)} (-${pct}%)`);
        totalAfter += jpeg.length;
        recompressed++;
        continue;
      }

      if (args.backup) {
        await writeFile(`${BACKUP_DIR}${q.id}.${fmt.ext}`, original);
      }

      const blob = await put(pathname, jpeg, {
        access: "public",
        contentType: "image/jpeg",
        token,
        addRandomSuffix: false,
      });

      console.log(`${tag} OK ${fmt.kind} ${kb(original.length)} -> ${kb(jpeg.length)} (-${pct}%) ${blob.url}`);
      totalAfter += jpeg.length;
      recompressed++;
    } catch (e) {
      failed++;
      const reason = (e as Error).message;
      fails.push({ id: q.id, reason });
      console.error(`${tag} FAIL ${reason}`);
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Recompressed: ${recompressed}`);
  console.log(`Skipped:      ${skipped}`);
  console.log(`Failed:       ${failed}`);
  console.log(`Size: ${kb(totalBefore)} -> ${kb(totalAfter)} (${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB)`);
  if (fails.length > 0) {
    console.log("Failed details:");
    for (const f of fails) console.log(`  ${f.id}: ${f.reason}`);
  }
  if (args.backup && !args.dryRun && recompressed > 0) {
    console.log(`Originals backed up to: ${BACKUP_DIR}`);
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
