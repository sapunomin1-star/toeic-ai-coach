#!/usr/bin/env npx tsx
/**
 * Rewrite the redundant p2-gen prompts onto fresh topics.
 *
 * See patches/p2-near-duplicates.json for why these are rewritten rather than
 * deleted: Part 2 holds 293 items and ten non-repeating listening mocks need
 * 250, so removing 42 would leave the pool with no headroom.
 *
 * Safety rails, because this replaces whole questions in bulk:
 *   - the answer letter, difficulty, skill_tag and id are carried over, never
 *     taken from the patch, so answer balance and media paths cannot shift
 *   - the key must exist and Part 2 must keep exactly three options
 *   - the key must not become the visibly longest option (the integrity gate)
 *   - audioScript is DERIVED here from prompt + choices. For Part 1/2 the
 *     options are spoken, so hand-writing it invites a recording that says
 *     something the screen does not show — with both fields well-formed.
 *
 * Idempotent: an item already carrying the new prompt is left alone.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "..", "data");
const patchFile = join(here, "..", "patches", "p2-near-duplicates.json");
const target = join(dataDir, "questions-generated.ts");

const LETTERS = ["A", "B", "C"] as const;

/** Same thresholds as checkVisibleAnswerLengthLeaks in integrity.ts. */
const GAP_CHARS = 15;
const GAP_RATIO = 1.25;

type Patch = {
  question: string;
  choices: Record<string, string>;
  explanation_zh: string;
  vocabulary: string[];
};

type Item = {
  id: string;
  part: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation_zh: string;
  skill_tag: string;
  difficulty: string;
  vocabulary: string[];
  audioScript?: string;
};

const patches: Record<string, Patch> = JSON.parse(readFileSync(patchFile, "utf8"));
const source = readFileSync(target, "utf8");

const start = source.indexOf("[", source.indexOf("=", source.indexOf("Question[]")));
const end = source.lastIndexOf("]");
if (start < 0 || end < 0) throw new Error("could not locate the question array");
const items: Item[] = JSON.parse(source.slice(start, end + 1).replace(/,(\s*[}\]])/g, "$1"));
const byId = new Map(items.map((q) => [q.id, q]));

let out = source;
let rewritten = 0;
let alreadyDone = 0;
const skipped: string[] = [];

for (const [id, patch] of Object.entries(patches)) {
  if (id.startsWith("_")) continue;
  const current = byId.get(id);
  if (!current) {
    skipped.push(`${id}: not found`);
    continue;
  }
  if (current.question === patch.question) {
    alreadyDone++;
    continue;
  }

  const letters = Object.keys(patch.choices).sort();
  if (letters.join("") !== "ABC") {
    skipped.push(`${id}: Part 2 needs exactly A/B/C, got ${letters.join("")}`);
    continue;
  }
  if (!patch.choices[current.answer]) {
    skipped.push(`${id}: no option at the preserved answer letter ${current.answer}`);
    continue;
  }

  const lengths = LETTERS.map((l) => patch.choices[l].length).sort((a, b) => b - a);
  const [longest, runnerUp] = lengths;
  const keyLength = patch.choices[current.answer].length;
  if (
    keyLength === longest &&
    longest - runnerUp >= GAP_CHARS &&
    longest / runnerUp >= GAP_RATIO
  ) {
    skipped.push(
      `${id}: key is visibly the longest option (${longest} vs ${runnerUp}) — would trip the length gate`,
    );
    continue;
  }

  // Everything structural comes from the existing item; the patch only supplies
  // content. audioScript is derived so the recording matches the screen.
  const next: Item = {
    id: current.id,
    part: current.part,
    question: patch.question,
    choices: { A: patch.choices.A, B: patch.choices.B, C: patch.choices.C },
    answer: current.answer,
    explanation_zh: patch.explanation_zh,
    skill_tag: current.skill_tag,
    difficulty: current.difficulty,
    vocabulary: patch.vocabulary,
    audioScript: [
      `Q: ${patch.question}`,
      ...LETTERS.map((l) => `(${l}) ${patch.choices[l]}`),
    ].join("\n"),
  };

  // Replace the item's own object, bounded by the array-element delimiters.
  const idPos = out.indexOf(`"id": ${JSON.stringify(id)}`);
  if (idPos < 0) {
    skipped.push(`${id}: id not found in the source text`);
    continue;
  }
  const objectStart = out.lastIndexOf("\n  {", idPos);
  const nextObject = out.indexOf("\n  {", idPos);
  const windowEnd = nextObject < 0 ? out.lastIndexOf("\n]") : nextObject;
  const serialized =
    "\n  " +
    JSON.stringify(next, null, 2)
      .split("\n")
      .join("\n  ")
      .trimEnd() +
    ",";
  out = out.slice(0, objectStart) + serialized + out.slice(windowEnd);
  rewritten++;
}

writeFileSync(target, out);

const total = Object.keys(patches).filter((k) => !k.startsWith("_")).length;
console.log(`rewrote ${rewritten} of ${total} items (${alreadyDone} already rewritten)`);
if (skipped.length > 0) console.log(`skipped:\n  ${skipped.join("\n  ")}`);
