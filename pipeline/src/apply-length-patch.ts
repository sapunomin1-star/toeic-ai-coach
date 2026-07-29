#!/usr/bin/env npx tsx
/**
 * Rewrite distractors so the key is no longer visibly the longest option.
 *
 * Works across every data file, since the affected items live in four of them.
 * Surgical string replacement rather than parse/serialize: the generated banks
 * run to megabytes and reformatting them would bury the change in diff noise.
 *
 * Safety rails, because this edits answer options in bulk:
 *   - refuses to write the slot that holds the key
 *   - requires the old text to appear exactly once across all files
 *   - reports anything it skipped instead of silently moving on
 *
 * Idempotent: re-running finds the new text already in place and does nothing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "..", "data");
const patchFile = join(here, "..", "patches", "visible-length-bias.json");

const FILES = [
  "questions-part5.ts",
  "questions-part7.ts",
  "questions-listening.ts",
  "questions-generated.ts",
  "questions-imported-xd.ts",
  "questions-imported-ed.ts",
  "questions-imported-ed-listening.ts",
];

type Bank = { id: string; answer: string; choices: Record<string, string> }[];

function parseBank(source: string): Bank {
  const start = source.indexOf("[", source.indexOf("=", source.indexOf("Question[]")));
  const end = source.lastIndexOf("]");
  if (start < 0 || end < 0) return [];
  // Some banks are hand-edited TS and carry trailing commas, which JSON rejects.
  const literal = source.slice(start, end + 1).replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(literal) as Bank;
}

const patch: Record<string, Record<string, string>> = JSON.parse(readFileSync(patchFile, "utf8"));

const sources = new Map<string, string>();
const byId = new Map<string, { file: string; q: Bank[number] }>();
for (const file of FILES) {
  const source = readFileSync(join(dataDir, file), "utf8");
  sources.set(file, source);
  for (const q of parseBank(source)) byId.set(q.id, { file, q });
}

let rewritten = 0;
const skipped: string[] = [];

for (const [id, choices] of Object.entries(patch)) {
  if (id.startsWith("_")) continue;
  const entry = byId.get(id);
  if (!entry) {
    skipped.push(`${id}: not found in any data file`);
    continue;
  }
  for (const [letter, next] of Object.entries(choices)) {
    if (letter === entry.q.answer) {
      skipped.push(`${id}.${letter}: refused — that slot holds the answer`);
      continue;
    }
    const prev = entry.q.choices[letter];
    if (prev === undefined) {
      skipped.push(`${id}.${letter}: no such option`);
      continue;
    }
    if (prev === next) continue;
    const needle = JSON.stringify(prev);
    const source = sources.get(entry.file)!;
    // Scope the replacement to this question's own object. Short options like
    // "Weather conditions" recur across the bank, so a global replace would
    // silently edit unrelated questions. Field order varies between files —
    // some put `id` after `choices` — so bound the window by the array
    // element delimiters (top-level objects are indented two spaces) rather
    // than by the id itself.
    const idPos = source.indexOf(`"id": ${JSON.stringify(id)}`);
    if (idPos < 0) {
      skipped.push(`${id}: id not found in ${entry.file}`);
      continue;
    }
    const objectStart = source.lastIndexOf("\n  {", idPos);
    const nextObject = source.indexOf("\n  {", idPos);
    const windowEnd = nextObject < 0 ? source.length : nextObject;
    const window = source.slice(objectStart, windowEnd);
    const hits = window.split(needle).length - 1;
    if (hits !== 1) {
      skipped.push(`${id}.${letter}: old text appears ${hits} times within the question`);
      continue;
    }
    sources.set(
      entry.file,
      source.slice(0, objectStart) + window.replace(needle, JSON.stringify(next)) + source.slice(windowEnd),
    );
    rewritten++;
  }
}

for (const [file, source] of sources) writeFileSync(join(dataDir, file), source);

console.log(`rewrote ${rewritten} distractor options across ${Object.keys(patch).length - 1} items`);
if (skipped.length > 0) console.log(`skipped:\n  ${skipped.join("\n  ")}`);
