#!/usr/bin/env npx tsx
/**
 * Re-apply the hand-authored corrections for the `ed` print-book import.
 *
 * Why this exists: the pdf-import run broadcast one generated explanation
 * across each block of ~15 questions, so 259 items shipped with an
 * explanation, vocabulary list and skill tag belonging to a different
 * question. The stems, choices and answer keys were fine — only the
 * generated fields were wrong. The corrections live in pipeline/patches/*.json
 * so that a future re-import can replay them instead of losing them again.
 *
 * Idempotent: run it as many times as you like.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const patchDir = join(here, "..", "patches");
const target = join(here, "..", "..", "data", "questions-imported-ed.ts");

type Patch = {
  explanation_zh?: string;
  skill_tag?: string;
  vocabulary?: string[];
  question?: string;
  choices?: Record<string, string>;
  answer?: string;
};

/** Items whose source passage was mangled beyond repair by the PDF extractor. */
const DROP = new Set(["p7-ed-0011", "p7-ed-0012"]);

/** Stem typos introduced by OCR. */
const STEM_FIXES: Record<string, string> = {
  "p5-ed-0199":
    "_______ Mr. Zhang not failed to meet his sales quota for the quarter, he might have been considered for the promotion.",
};

const patches: Record<string, Patch> = {};
for (const file of readdirSync(patchDir).filter((f) => f.startsWith("ed-") && f.endsWith(".json"))) {
  Object.assign(patches, JSON.parse(readFileSync(join(patchDir, file), "utf8")));
}

const src = readFileSync(target, "utf8");
// NB: search from the `=`, not from the identifier — otherwise the `[` of the
// `Question[]` type annotation wins and JSON.parse chokes.
const start = src.indexOf("[", src.indexOf("=", src.indexOf("IMPORTED_QUESTIONS_ED")));
const end = src.lastIndexOf("]");
if (start < 0 || end < 0) throw new Error("could not locate question array");
const header = src.slice(0, start);
const questions: Record<string, unknown>[] = JSON.parse(src.slice(start, end + 1));

let patched = 0;
let dropped = 0;
const unmatched = new Set(Object.keys(patches));
const kept = questions.filter((q) => {
  const id = q.id as string;
  if (DROP.has(id)) {
    dropped++;
    return false;
  }
  if (STEM_FIXES[id]) q.question = STEM_FIXES[id];
  const patch = patches[id];
  if (patch) {
    Object.assign(q, patch);
    unmatched.delete(id);
    patched++;
  }
  return true;
});

writeFileSync(target, `${header}${JSON.stringify(kept, null, 2)};\n`);

console.log(`patched ${patched} questions, dropped ${dropped}, kept ${kept.length}`);
if (unmatched.size > 0) console.log(`  WARNING unmatched patch ids: ${[...unmatched].join(", ")}`);
