#!/usr/bin/env npx tsx
/**
 * Length-balance the Part 6 sentence-insertion distractors.
 *
 * Every one of the 29 `p6-si-*` items shipped with a key that was the longest
 * option by a wide margin, so "pick the longest" scored 29/29 without reading
 * the passage. This rewrites only the three wrong options per item (padding
 * their existing wrong content with neutral detail); stems, passages and
 * answer keys are untouched.
 *
 * Surgical string replacement rather than a parse/serialize round-trip: the
 * generated file is ~1.9 MB and reformatting it would bury the real change in
 * diff noise. Each replacement asserts the old text appears exactly once.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const patchFile = join(here, "..", "patches", "p6-si-distractors.json");
const target = join(here, "..", "..", "data", "questions-generated.ts");

const patch: Record<string, Record<string, string>> = JSON.parse(readFileSync(patchFile, "utf8"));
const bank = JSON.parse(
  readFileSync(join(here, "..", "..", "data", "questions-generated.ts"), "utf8")
    .replace(/^[\s\S]*?=\s*\[/, "[")
    .replace(/;\s*$/, ""),
) as { id: string; answer: string; choices: Record<string, string> }[];
const byId = new Map(bank.map((q) => [q.id, q]));

let src = readFileSync(target, "utf8");
let replaced = 0;
const problems: string[] = [];

for (const [id, choices] of Object.entries(patch)) {
  if (id.startsWith("_")) continue;
  const q = byId.get(id);
  if (!q) {
    problems.push(`${id}: not found in bank`);
    continue;
  }
  for (const [letter, next] of Object.entries(choices)) {
    if (letter === q.answer) {
      problems.push(`${id}: refusing to rewrite the answer option ${letter}`);
      continue;
    }
    const prev = q.choices[letter];
    if (prev === next) continue;
    const needle = JSON.stringify(prev);
    const hits = src.split(needle).length - 1;
    if (hits !== 1) {
      problems.push(`${id}.${letter}: old text appears ${hits} times, skipped`);
      continue;
    }
    src = src.replace(needle, JSON.stringify(next));
    replaced++;
  }
}

if (problems.length > 0) {
  console.log(`problems:\n  ${problems.join("\n  ")}`);
}
writeFileSync(target, src);
console.log(`rewrote ${replaced} distractor options across ${Object.keys(patch).length - 1} items`);
