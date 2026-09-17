#!/usr/bin/env npx tsx
/**
 * Apply patches/p2-answer-uniqueness.json — the four Part 2 items whose
 * distractor could also be a correct response (learning-quality review F04).
 *
 * Same rails as apply-p2-dupe-patch.ts: id, answer letter, difficulty and
 * skill_tag come from the existing item; the key must exist; Part 2 keeps
 * exactly three options; the key must not become the visibly longest option;
 * audioScript is derived from prompt + choices so screen and recording agree.
 *
 * AFTER applying: regenerate audio for every rewritten id
 * (`npx tsx src/generate-audio.ts --question <id> --version <release>`)
 * then verify the public audio and set audioUrl + revisedAt before removing the id
 * from DISPUTED_QUESTIONS in data/question-revisions.ts. Idempotent.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "..", "data");
const patchFile = join(here, "..", "patches", "p2-answer-uniqueness.json");
const target = join(dataDir, "questions-generated.ts");

const LETTERS = ["A", "B", "C"] as const;
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
const rewrittenIds: string[] = [];

for (const [id, patch] of Object.entries(patches)) {
  if (id.startsWith("_")) continue;
  const current = byId.get(id);
  if (!current) {
    skipped.push(`${id}: not found`);
    continue;
  }
  const sameChoices = LETTERS.every((l) => current.choices[l] === patch.choices[l]);
  if (current.question === patch.question && sameChoices) {
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
  if (patch.choices[current.answer] !== current.choices[current.answer]) {
    skipped.push(`${id}: the key text must not change (only distractors are rewritten)`);
    continue;
  }
  const lengths = LETTERS.map((l) => patch.choices[l].length).sort((a, b) => b - a);
  const [longest, runnerUp] = lengths;
  const keyLength = patch.choices[current.answer].length;
  if (keyLength === longest && longest - runnerUp >= GAP_CHARS && longest / runnerUp >= GAP_RATIO) {
    skipped.push(`${id}: key is visibly the longest option (${longest} vs ${runnerUp}) — would trip the length gate`);
    continue;
  }

  const next: Item = {
    ...current,
    id: current.id,
    part: current.part,
    question: patch.question,
    choices: { A: patch.choices.A, B: patch.choices.B, C: patch.choices.C },
    answer: current.answer,
    explanation_zh: patch.explanation_zh,
    skill_tag: current.skill_tag,
    difficulty: current.difficulty,
    vocabulary: patch.vocabulary,
    audioScript: [`Q: ${patch.question}`, ...LETTERS.map((l) => `(${l}) ${patch.choices[l]}`)].join("\n"),
  };

  const idPos = out.indexOf(`"id": ${JSON.stringify(id)}`);
  if (idPos < 0) {
    skipped.push(`${id}: id not found in the source text`);
    continue;
  }
  const objectStart = out.lastIndexOf("\n  {", idPos);
  const nextObject = out.indexOf("\n  {", idPos);
  const windowEnd = nextObject < 0 ? out.lastIndexOf("\n]") : nextObject;
  const serialized =
    "\n  " + JSON.stringify(next, null, 2).split("\n").join("\n  ").trimEnd() + ",";
  out = out.slice(0, objectStart) + serialized + out.slice(windowEnd);
  rewritten++;
  rewrittenIds.push(id);
}

writeFileSync(target, out);

const total = Object.keys(patches).filter((k) => !k.startsWith("_")).length;
console.log(`rewrote ${rewritten} of ${total} items (${alreadyDone} already rewritten)`);
if (rewrittenIds.length > 0) {
  console.log(
    `next: regenerate audio —\n  ${rewrittenIds.map((id) => `npx tsx src/generate-audio.ts --question ${id} --version <new-release>`).join("\n  ")}\nthen remove ${rewrittenIds.join(", ")} from DISPUTED_QUESTIONS in data/question-revisions.ts`,
  );
}
if (skipped.length > 0) console.log(`skipped:\n  ${skipped.join("\n  ")}`);
