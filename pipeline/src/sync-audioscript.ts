#!/usr/bin/env npx tsx
/**
 * Keep Part 1/2 `audioScript` in step with `choices`.
 *
 * For those parts the options are spoken, not printed, so the audio is
 * synthesised from `audioScript`. Editing an option without editing the script
 * leaves the recording saying one thing while the screen shows another — a
 * silent desync that no existing gate catches, because both fields are
 * individually well-formed.
 *
 * Rewrites each `(X) ...` line to match `choices.X`, then reports which
 * question ids changed so their audio can be regenerated:
 *   npx tsx src/generate-audio.ts --provider openrouter --force --question <id>
 *
 * Pass --check to report drift without writing (useful as a gate).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "..", "data");
const check = process.argv.includes("--check");

const FILES = [
  "questions-listening.ts",
  "questions-generated.ts",
  "questions-imported-ed-listening.ts",
];

type Q = {
  id: string;
  part: string;
  choices: Record<string, string>;
  audioScript?: string;
};

const stale: string[] = [];

for (const file of FILES) {
  const path = join(dataDir, file);
  let source = readFileSync(path, "utf8");
  const start = source.indexOf("[", source.indexOf("=", source.indexOf("Question[]")));
  const end = source.lastIndexOf("]");
  if (start < 0 || end < 0) continue;
  const bank: Q[] = JSON.parse(source.slice(start, end + 1).replace(/,(\s*[}\]])/g, "$1"));

  for (const q of bank) {
    if (q.part !== "Part 1" && q.part !== "Part 2") continue;
    if (!q.audioScript) continue;
    const next = q.audioScript
      .split("\n")
      .map((line) => {
        const match = line.match(/^\(([A-D])\)\s*(.*)$/);
        if (!match) return line;
        const option = q.choices[match[1]];
        return option === undefined ? line : `(${match[1]}) ${option}`;
      })
      .join("\n");
    if (next === q.audioScript) continue;

    stale.push(q.id);
    if (check) continue;
    const needle = JSON.stringify(q.audioScript);
    if (source.split(needle).length - 1 !== 1) {
      console.log(`  WARNING ${q.id}: audioScript not uniquely locatable, skipped`);
      continue;
    }
    source = source.replace(needle, JSON.stringify(next));
  }
  if (!check) writeFileSync(path, source);
}

if (stale.length === 0) {
  console.log("audioScript is in step with choices for every Part 1/2 question");
} else if (check) {
  console.log(`${stale.length} question(s) have audioScript out of step with choices:\n  ${stale.join("\n  ")}`);
  process.exit(1);
} else {
  console.log(`updated ${stale.length} audioScript(s). Regenerate their audio:\n`);
  console.log(stale.map((id) => `  npx tsx src/generate-audio.ts --provider openrouter --force --question ${id}`).join("\n"));
}
