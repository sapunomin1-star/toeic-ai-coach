/**
 * Turn enriched import records into a `data/questions-imported-<book>.ts` file.
 *
 * Kept in its own file per book rather than appended to `questions-generated.ts`:
 * that file is already ~30k lines, and the repo has hit TS2590 on oversized
 * literal arrays before.
 *
 * Usage:
 *   npx tsx src/pdf-import/write-bank.ts --book xd [--dry-run]
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { QUESTIONS } from "../../../data/questions";
import type { Question, Choice, Difficulty, SkillTag } from "../../../types/question";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.resolve(__dirname, "../../output/pdf-import");
const DATA_DIR = path.resolve(__dirname, "../../../data");

type Enriched = {
  source: string;
  test: number;
  number: number;
  part: "Part 5" | "Part 6" | "Part 7";
  stem: string;
  choices: Record<Choice, string>;
  answer: Choice;
  passage?: string | null;
  passage_numbers?: number[] | null;
  passage_group_key?: string | null;
  passage_header?: string | null;
  doc_type?: string | null;
  explanation_zh: string;
  skill_tag: SkillTag;
  difficulty: Difficulty;
  vocabulary: string[];
};

const BLANK_LABELS = ["A", "B", "C", "D"] as const;

/** Normalise the dashes the books print for a blank to the app's underscores. */
function normaliseStem(stem: string): string {
  return stem.replace(/-{3,}/g, "_______").replace(/\s+/g, " ").trim();
}

const CJK = /[㐀-鿿豈-﫿]/g;

/**
 * TOEIC items are English. Teaching books print a Chinese translation beside
 * every question, and the transcription sometimes captured that instead — which
 * yields an item that looks complete but gives the answer away and cannot be
 * practised. Anything with real Chinese in the question, choices, or passage is
 * not usable.
 */
function hasChineseContent(q: {
  stem: string;
  choices: Record<string, string>;
  passage?: string | null;
}): boolean {
  const count = (s: string) => (s.match(CJK) ?? []).length;
  if (count(q.stem) > 2) return true;
  if (BLANK_LABELS.some((l) => count(q.choices[l] ?? "") > 2)) return true;
  return count(q.passage ?? "") > 10;
}

function signature(q: { stem: string; choices: Record<string, string> }): string {
  const parts = [q.stem, ...BLANK_LABELS.map((l) => q.choices[l] ?? "")];
  return parts.join("|").toLowerCase().replace(/[^a-z0-9|]+/g, "");
}

/**
 * How many separate documents a Part 7 set puts in front of the reader.
 * The book states it in the instruction line ("refer to the following letter
 * and e-mail"), which is more reliable than counting blocks of merged text.
 */
function groupTypeFromHeader(header: string | null | undefined, size: number):
  "single" | "double" | "triple" {
  const h = (header ?? "").toLowerCase();
  if (/\bthree\b|,[^,]+,[^,]*\band\b/.test(h)) return "triple";
  if (/\btwo\b|\band\b/.test(h)) return "double";
  return size >= 5 ? "double" : "single";
}

function main() {
  const args = process.argv.slice(2);
  const book = args[args.indexOf("--book") + 1];
  const dryRun = args.includes("--dry-run");
  if (!book) throw new Error("--book is required");

  const records = JSON.parse(
    fs.readFileSync(path.join(OUT_ROOT, `${book}-enriched.json`), "utf8")
  ) as Enriched[];

  const existingSignatures = new Set(
    QUESTIONS.map((q) =>
      signature({ stem: q.question, choices: q.choices as Record<string, string> })
    )
  );
  const existingIds = new Set(QUESTIONS.map((q) => q.id));

  const skipped: Record<string, number> = {};
  const skip = (reason: string) => {
    skipped[reason] = (skipped[reason] ?? 0) + 1;
  };

  // Group passage-based questions so group-level rules can be applied.
  const groups = new Map<string, Enriched[]>();
  const part5: Enriched[] = [];
  for (const r of records) {
    if (r.part === "Part 5") {
      part5.push(r);
      continue;
    }
    const key = r.passage_group_key ?? `${r.test}:${(r.passage_numbers ?? [r.number]).join(",")}`;
    const group = groups.get(key) ?? [];
    group.push(r);
    groups.set(key, group);
  }

  const out: Question[] = [];
  const seen = new Set(existingSignatures);
  let counters = { 5: 0, 6: 0, 7: 0 };

  const nextId = (part: 5 | 6 | 7): string => {
    counters = { ...counters, [part]: counters[part] + 1 };
    let id = `p${part}-${book}-${String(counters[part]).padStart(4, "0")}`;
    while (existingIds.has(id)) {
      counters = { ...counters, [part]: counters[part] + 1 };
      id = `p${part}-${book}-${String(counters[part]).padStart(4, "0")}`;
    }
    existingIds.add(id);
    return id;
  };

  for (const r of part5.sort((a, b) => a.test - b.test || a.number - b.number)) {
    const stem = normaliseStem(r.stem);
    const sig = signature({ stem, choices: r.choices });
    if (seen.has(sig)) {
      skip("duplicate of a question already in the bank");
      continue;
    }
    if (!stem.includes("_______")) {
      skip("Part 5 stem has no blank after normalisation");
      continue;
    }
    if (hasChineseContent({ stem, choices: r.choices })) {
      skip("Chinese text captured instead of the English item");
      continue;
    }
    seen.add(sig);
    out.push({
      id: nextId(5),
      part: "Part 5",
      question: stem,
      choices: r.choices,
      answer: r.answer,
      explanation_zh: r.explanation_zh,
      skill_tag: r.skill_tag,
      difficulty: r.difficulty,
      vocabulary: r.vocabulary,
    });
  }

  const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  for (const [key, groupRaw] of sortedGroups) {
    const group = [...groupRaw].sort((a, b) => a.number - b.number);
    const part = group[0].part;
    const passage = group.find((r) => r.passage)?.passage ?? "";
    if (!passage) {
      skip(`${part} group without passage text`);
      continue;
    }
    if (group.some((r) => hasChineseContent({ ...r, passage }))) {
      skip("Chinese text captured instead of the English item");
      continue;
    }

    if (part === "Part 6") {
      // The app requires exactly four labelled blanks per passage; the older
      // TOEIC format these books predate used three, and a short group would
      // break the daily and mock planners that select whole groups.
      if (group.length !== 4) {
        skip(`Part 6 group has ${group.length} blanks (app requires exactly 4)`);
        continue;
      }
      let text = passage;
      let ok = true;
      group.forEach((r, i) => {
        const marker = `---(${r.number})---`;
        if (!text.includes(marker)) ok = false;
        text = text.replace(marker, `____(${BLANK_LABELS[i]})____`);
      });
      if (!ok || BLANK_LABELS.some((l) => !text.includes(`____(${l})____`))) {
        skip("Part 6 passage blanks did not line up with its questions");
        continue;
      }
      // Part 6 stems are just blank labels, so the passage is what identifies
      // the group for duplicate detection.
      const passageSig = signature({ stem: text.slice(0, 300), choices: {} });
      if (seen.has(passageSig)) {
        skip("Part 6 passage already in the bank");
        continue;
      }
      seen.add(passageSig);
      const groupId = `p6-${book}-${key.replace(/[^0-9]/g, "-")}`;
      group.forEach((r, i) => {
        out.push({
          id: nextId(6),
          part: "Part 6",
          question: `____(${BLANK_LABELS[i]})____`,
          choices: r.choices,
          answer: r.answer,
          explanation_zh: r.explanation_zh,
          skill_tag: r.skill_tag,
          difficulty: r.difficulty,
          vocabulary: r.vocabulary,
          passage: text,
          passage_group_id: groupId,
          question_order: i + 1,
        });
      });
      continue;
    }

    // Part 7
    if (group.length < 2) {
      skip("Part 7 group has fewer than 2 questions");
      continue;
    }
    // A real TOEIC passage set is at most 5 questions; anything larger means
    // unrelated documents were merged and the questions would be shown against
    // the wrong reading.
    if (group.length > 5) {
      skip(`Part 7 group has ${group.length} questions (max 5) — passages merged`);
      continue;
    }
    const passageSig = signature({ stem: passage.slice(0, 300), choices: {} });
    if (seen.has(passageSig)) {
      skip("Part 7 passage already in the bank");
      continue;
    }
    seen.add(passageSig);
    const groupType = groupTypeFromHeader(
      group.find((r) => r.passage_header)?.passage_header,
      group.length
    );
    const groupId = `p7-${book}-${key.replace(/[^0-9]/g, "-")}`;
    group.forEach((r, i) => {
      out.push({
        id: nextId(7),
        part: "Part 7",
        question: normaliseStem(r.stem),
        choices: r.choices,
        answer: r.answer,
        explanation_zh: r.explanation_zh,
        skill_tag: r.skill_tag,
        difficulty: r.difficulty,
        vocabulary: r.vocabulary,
        passage,
        passage_group_id: groupId,
        passage_group_type: groupType,
        question_order: i + 1,
      });
    });
  }

  const byPart: Record<string, number> = {};
  const byAnswer: Record<string, Record<string, number>> = {};
  for (const q of out) {
    byPart[q.part] = (byPart[q.part] ?? 0) + 1;
    byAnswer[q.part] = byAnswer[q.part] ?? {};
    byAnswer[q.part][q.answer] = (byAnswer[q.part][q.answer] ?? 0) + 1;
  }

  console.log(`source records: ${records.length}`);
  console.log(`importable:     ${out.length}`, byPart);
  console.log("answer spread: ", JSON.stringify(byAnswer));
  console.log("skipped:");
  for (const [reason, count] of Object.entries(skipped).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(4)}x ${reason}`);
  }

  if (dryRun) {
    console.log("\n--dry-run: nothing written");
    return;
  }

  const exportName = `IMPORTED_QUESTIONS_${book.toUpperCase()}`;
  const target = path.join(DATA_DIR, `questions-imported-${book}.ts`);
  const banner =
    `import type { Question } from "@/types/question";\n\n` +
    `/**\n` +
    ` * Questions transcribed from a print TOEIC practice book (source: ${book}).\n` +
    ` * Stems, choices, passages and answer keys come from the book; the Chinese\n` +
    ` * explanations, skill tags, difficulties and vocabulary lists are generated.\n` +
    ` * Generated by pipeline/src/pdf-import — do not hand-edit.\n` +
    ` */\n` +
    `export const ${exportName}: Question[] = `;
  fs.writeFileSync(target, `${banner}${JSON.stringify(out, null, 2)};\n`);
  console.log(`\nwrote ${out.length} questions to data/questions-imported-${book}.ts`);
}

main();
