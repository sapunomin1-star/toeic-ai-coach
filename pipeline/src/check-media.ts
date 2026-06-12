#!/usr/bin/env npx tsx
/**
 * Verify every listening/image question's expected media exists in Vercel Blob.
 *
 * Expected paths are derived from the same conventions the app uses to build
 * URLs (lib/media.ts + app/quiz getAudioOwnerQuestion), so this catches any
 * question that would 404 at runtime:
 *
 *   Part 1:   images/<id>.jpg AND audio/<id>.mp3
 *   Part 2:   audio/<id>.mp3
 *   Part 3/4: ONE shared audio per transcript group, owned by the
 *             lexicographically smallest question id: audio/<ownerId>.mp3
 *   Part 3:   per-question narrated stem audio/<id>-q.mp3
 *
 * Questions with an explicit audioUrl/imageUrl override are not expected at
 * the convention path (the app uses the override instead); they are listed
 * separately so overrides never silently mask a missing file.
 *
 * Each path is HEAD-checked against NEXT_PUBLIC_BLOB_BASE_URL (public URLs,
 * no token required). Exits 1 if anything is missing.
 *
 * Usage (from pipeline/):
 *   npm run check-media              # summary + missing list
 *   npm run check-media -- --verbose # also dump every expected path + result
 */
import "dotenv/config";

import { QUESTIONS } from "../../data/questions";
import type { Question } from "../../types/question";

const CONCURRENCY = 12;

type MediaKind = "image" | "item-audio" | "group-audio" | "question-audio";

type ExpectedMedia = {
  pathname: string;
  questionId: string;
  kind: MediaKind;
};

type CheckResult = ExpectedMedia & {
  found: boolean;
  status: number | string;
};

function getBlobBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/+$/, "") ?? "";
}

/** Same grouping as lib/mockShared audioGroupKey: (part, transcript). */
function groupKey(q: Question): string {
  return q.transcript ? `${q.part}:${q.transcript}` : q.id;
}

function buildExpectations(questions: Question[]): {
  expected: ExpectedMedia[];
  overridden: string[];
} {
  const byPathname = new Map<string, ExpectedMedia>();
  const overridden: string[] = [];
  const add = (item: ExpectedMedia) => {
    if (!byPathname.has(item.pathname)) byPathname.set(item.pathname, item);
  };

  const p34Groups = new Map<string, Question[]>();

  for (const q of questions) {
    if (q.part === "Part 1") {
      if (q.imageUrl) overridden.push(`${q.id} (imageUrl)`);
      else add({ pathname: `images/${q.id}.jpg`, questionId: q.id, kind: "image" });
      if (q.audioUrl) overridden.push(`${q.id} (audioUrl)`);
      else add({ pathname: `audio/${q.id}.mp3`, questionId: q.id, kind: "item-audio" });
    } else if (q.part === "Part 2") {
      if (q.audioUrl) overridden.push(`${q.id} (audioUrl)`);
      else add({ pathname: `audio/${q.id}.mp3`, questionId: q.id, kind: "item-audio" });
    } else if (q.part === "Part 3" || q.part === "Part 4") {
      const group = p34Groups.get(groupKey(q)) ?? [];
      group.push(q);
      p34Groups.set(groupKey(q), group);
      if (q.part === "Part 3") {
        add({ pathname: `audio/${q.id}-q.mp3`, questionId: q.id, kind: "question-audio" });
      }
    }
  }

  for (const group of p34Groups.values()) {
    const owner = [...group].sort((a, b) => a.id.localeCompare(b.id))[0];
    if (owner.audioUrl) overridden.push(`${owner.id} (audioUrl, group owner)`);
    else add({ pathname: `audio/${owner.id}.mp3`, questionId: owner.id, kind: "group-audio" });
  }

  return { expected: [...byPathname.values()], overridden };
}

async function headCheck(baseUrl: string, item: ExpectedMedia): Promise<CheckResult> {
  try {
    const response = await fetch(`${baseUrl}/${item.pathname}`, { method: "HEAD" });
    return { ...item, found: response.status === 200, status: response.status };
  } catch (error) {
    return { ...item, found: false, status: (error as Error).message };
  }
}

async function runPool<T, R>(items: T[], worker: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  let done = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (nextIndex < items.length) {
        const i = nextIndex++;
        results[i] = await worker(items[i]);
        done++;
        if (done % 100 === 0) console.log(`  ...checked ${done}/${items.length}`);
      }
    }),
  );
  return results;
}

function countByKind(items: { kind: MediaKind }[]): string {
  const counts: Record<MediaKind, number> = {
    image: 0,
    "item-audio": 0,
    "group-audio": 0,
    "question-audio": 0,
  };
  for (const item of items) counts[item.kind]++;
  return `image=${counts.image} item-audio=${counts["item-audio"]} group-audio=${counts["group-audio"]} question-audio=${counts["question-audio"]}`;
}

async function main() {
  const verbose = process.argv.includes("--verbose");
  const baseUrl = getBlobBaseUrl();
  if (!baseUrl) {
    console.error("ERROR: NEXT_PUBLIC_BLOB_BASE_URL must be set in pipeline/.env");
    process.exit(1);
  }

  const { expected, overridden } = buildExpectations(QUESTIONS);
  console.log(`Questions:      ${QUESTIONS.length}`);
  console.log(`Expected paths: ${expected.length} (${countByKind(expected)})`);
  if (overridden.length > 0) {
    console.log(`URL overrides (not checked): ${overridden.join(", ")}`);
  }
  console.log(`HEAD-checking against ${baseUrl} (concurrency ${CONCURRENCY})...`);

  const results = await runPool(expected, (item) => headCheck(baseUrl, item));
  const found = results.filter((r) => r.found);
  const missing = results.filter((r) => !r.found);

  if (verbose) {
    console.log("\n[verbose] All expected paths:");
    for (const r of results) {
      console.log(`  ${r.found ? "OK  " : "MISS"} ${r.pathname} [${r.kind}] (${r.status})`);
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Media Integrity Report");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Expected: ${expected.length}`);
  console.log(`  Found:    ${found.length}`);
  console.log(`  Missing:  ${missing.length}`);
  console.log(`  Status: ${missing.length === 0 ? "PASSED" : "FAILED"}`);
  if (missing.length > 0) {
    console.log("\n  Missing paths:");
    for (const r of missing) {
      console.log(`  - ${r.pathname} [${r.kind}] question=${r.questionId} status=${r.status}`);
    }
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (missing.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error("FATAL:", (error as Error).message);
  process.exit(1);
});
