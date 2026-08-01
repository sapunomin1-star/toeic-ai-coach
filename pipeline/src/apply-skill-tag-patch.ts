#!/usr/bin/env npx tsx
/**
 * Correct Part 5 skill_tag mislabels.
 *
 * `word_form` (詞性判斷) only earns its name when the options differ in part of
 * speech, because that is what lets the slot's grammar decide the answer. The
 * items in patches/skill-tag-mislabels.json all carry an explanation asserting
 * a part-of-speech rule ("空格修飾動詞，需用副詞") over four options that already
 * satisfy it — the rule eliminates nothing, so meaning does the whole job. The
 * tag matters because it drives the weakness analysis: a learner told to drill
 * derivational morphology for a vocabulary gap practises the wrong thing.
 *
 * The evidence is re-checked here rather than trusted from the list: every
 * `all -x` entry must really have four options sharing that ending, and every
 * `family` entry must really share a root. A re-import that changed an item's
 * options will fail the check instead of getting a tag it no longer deserves.
 *
 * Scoped string replacement, matching apply-length-patch.ts: the banks are
 * megabytes and reformatting them would bury the change in diff noise.
 *
 * Idempotent: an item already carrying the target tag is left alone.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "..", "data");
const patchFile = join(here, "..", "patches", "skill-tag-mislabels.json");

const FILES = [
  "questions-part5.ts",
  "questions-part6.ts",
  "questions-generated.ts",
  "questions-imported-xd.ts",
  "questions-imported-ed.ts",
];

type Item = { id: string; skill_tag: string; choices: Record<string, string> };
type Patch = { from: string; to: string; shape: string; why: string };

function parseBank(source: string): Item[] {
  const start = source.indexOf("[", source.indexOf("=", source.indexOf("Question[]")));
  const end = source.lastIndexOf("]");
  if (start < 0 || end < 0) return [];
  const literal = source.slice(start, end + 1).replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(literal) as Item[];
}

/** Longest common prefix — the root a derivational family shares. */
function commonPrefix(words: string[]): number {
  const lower = words.map((w) => w.toLowerCase());
  let n = 0;
  while (n < lower[0].length && lower.every((w) => w[n] === lower[0][n])) n++;
  return n;
}

/** Does the item still look the way the patch claims it does? */
function evidenceHolds(shape: string, options: string[]): boolean {
  if (shape === "manual") return true;
  if (shape === "family") return commonPrefix(options) >= 4;
  const ending = shape.replace(/^all -/, "");
  return options.every((o) => o.toLowerCase().endsWith(ending));
}

const patch: Record<string, Patch> = JSON.parse(readFileSync(patchFile, "utf8"));

const sources = new Map<string, string>();
const byId = new Map<string, { file: string; item: Item }>();
for (const file of FILES) {
  const source = readFileSync(join(dataDir, file), "utf8");
  sources.set(file, source);
  for (const item of parseBank(source)) byId.set(item.id, { file, item });
}

let retagged = 0;
let alreadyDone = 0;
const skipped: string[] = [];

for (const [id, spec] of Object.entries(patch)) {
  if (id.startsWith("_")) continue;
  const entry = byId.get(id);
  if (!entry) {
    skipped.push(`${id}: not found in any data file`);
    continue;
  }
  const { file, item } = entry;
  if (item.skill_tag === spec.to) {
    alreadyDone++;
    continue;
  }
  if (item.skill_tag !== spec.from) {
    skipped.push(`${id}: expected "${spec.from}" but found "${item.skill_tag}" — left alone`);
    continue;
  }
  const options = Object.values(item.choices).filter(Boolean);
  if (!evidenceHolds(spec.shape, options)) {
    skipped.push(
      `${id}: options no longer match "${spec.shape}" (${options.join(", ")}) — left alone`,
    );
    continue;
  }

  // Scope to this question's own object; `"skill_tag": "word_form"` occurs
  // hundreds of times per file. Top-level array elements are indented two
  // spaces, and field order varies between files, so bound by the delimiters
  // rather than assuming skill_tag follows id.
  const source = sources.get(file)!;
  const idPos = source.indexOf(`"id": ${JSON.stringify(id)}`);
  if (idPos < 0) {
    skipped.push(`${id}: id not found in ${file}`);
    continue;
  }
  const objectStart = source.lastIndexOf("\n  {", idPos);
  const nextObject = source.indexOf("\n  {", idPos);
  const windowEnd = nextObject < 0 ? source.length : nextObject;
  const window = source.slice(objectStart, windowEnd);
  const needle = `"skill_tag": ${JSON.stringify(spec.from)}`;
  const hits = window.split(needle).length - 1;
  if (hits !== 1) {
    skipped.push(`${id}: skill_tag appears ${hits} times within the question — left alone`);
    continue;
  }
  sources.set(
    file,
    source.slice(0, objectStart) +
      window.replace(needle, `"skill_tag": ${JSON.stringify(spec.to)}`) +
      source.slice(windowEnd),
  );
  retagged++;
}

for (const [file, source] of sources) writeFileSync(join(dataDir, file), source);

const total = Object.keys(patch).filter((k) => !k.startsWith("_")).length;
console.log(`retagged ${retagged} of ${total} items (${alreadyDone} already correct)`);
if (skipped.length > 0) console.log(`skipped:\n  ${skipped.join("\n  ")}`);
