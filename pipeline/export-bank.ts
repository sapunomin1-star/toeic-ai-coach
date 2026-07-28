#!/usr/bin/env npx tsx
// One-off audit helper: dump the merged bank + per-source ids to JSON.
import { writeFileSync } from "node:fs";
import { QUESTIONS } from "../data/questions";
import { QUESTIONS_PART5 } from "../data/questions-part5";
import { QUESTIONS_PART6 } from "../data/questions-part6";
import { QUESTIONS_PART7 } from "../data/questions-part7";
import { QUESTIONS_LISTENING } from "../data/questions-listening";
import { GENERATED_QUESTIONS } from "../data/questions-generated";
import { IMPORTED_QUESTIONS_XD } from "../data/questions-imported-xd";
import { IMPORTED_QUESTIONS_ED } from "../data/questions-imported-ed";
import { IMPORTED_LISTENING_ED } from "../data/questions-imported-ed-listening";

const sources: Record<string, { id: string }[]> = {
  part5: QUESTIONS_PART5,
  part6: QUESTIONS_PART6,
  part7: QUESTIONS_PART7,
  listening: QUESTIONS_LISTENING,
  generated: GENERATED_QUESTIONS,
  imported_xd: IMPORTED_QUESTIONS_XD,
  imported_ed: IMPORTED_QUESTIONS_ED,
  imported_ed_listening: IMPORTED_LISTENING_ED,
};

const sourceOf = new Map<string, string>();
for (const [name, list] of Object.entries(sources)) {
  for (const q of list) sourceOf.set(q.id, name);
}

const out = QUESTIONS.map((q) => ({ ...q, __source: sourceOf.get(q.id) ?? "unknown" }));
const dir = process.argv[2] ?? ".";
writeFileSync(`${dir}/bank.json`, JSON.stringify(out, null, 1));
console.log(`wrote ${out.length} questions`);
for (const [name, list] of Object.entries(sources)) console.log(`  ${name}: ${list.length}`);
