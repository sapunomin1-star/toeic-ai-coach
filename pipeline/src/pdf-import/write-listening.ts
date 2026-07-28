/**
 * Write the imported listening questions to `data/questions-imported-ed-listening.ts`.
 *
 * Separate from `write-bank.ts` because listening has a different shape: no
 * passages, a transcript shared by exactly three questions, and Part 2 items
 * that carry a spoken script instead of printed choices.
 *
 * Audio is not referenced here. `lib/media.ts` derives it from the question id
 * (`audio/<id>.mp3`), so the files just have to exist in Blob under the ids this
 * script assigns — that is what `generate-audio.ts` produces afterwards.
 *
 * Usage:
 *   npx tsx src/pdf-import/write-listening.ts [--dry-run]
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { QUESTIONS } from "../../../data/questions";
import type { Question, Choice, Difficulty, SkillTag } from "../../../types/question";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.resolve(__dirname, "../../output/pdf-import");
const DATA_DIR = path.resolve(__dirname, "../../../data");

type Listening = {
  part: "Part 2" | "Part 3" | "Part 4";
  number: number;
  stem: string;
  choices: Record<string, string>;
  answer: Choice;
  transcript?: string | null;
  transcript_group?: string | null;
  question_order?: number;
  explanation_zh: string;
  skill_tag: SkillTag;
  difficulty: Difficulty;
  vocabulary: string[];
  verification?: { verdict: string } | null;
};

/**
 * The book prints speaker turns as "W Hassan, I've finished..."; the rest of the
 * bank — and the speaker-splitting in `generate-audio.ts` — expects "W: ...".
 * Without the colon a two-person conversation is synthesised in a single voice.
 */
function normaliseSpeakerLabels(transcript: string): string {
  return transcript
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(W|M|M\d|W\d|Woman|Man)\s+(?=\S)/i, "$1: "))
    .join("\n");
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const records = JSON.parse(
    fs.readFileSync(path.join(OUT_ROOT, "ed-listening-enriched.json"), "utf8")
  ) as Listening[];

  const existingIds = new Set(QUESTIONS.map((q) => q.id));
  const existingTranscripts = new Set(
    QUESTIONS.map((q) => (q.transcript ?? "").replace(/\s+/g, " ").trim()).filter(Boolean)
  );
  const existingP2 = new Set(
    QUESTIONS.filter((q) => q.part === "Part 2").map((q) =>
      q.question.toLowerCase().replace(/[^a-z0-9]+/g, "")
    )
  );

  const skipped: Record<string, number> = {};
  const skip = (reason: string) => {
    skipped[reason] = (skipped[reason] ?? 0) + 1;
  };

  const counters: Record<string, number> = { "Part 2": 0, "Part 3": 0, "Part 4": 0 };
  const nextId = (part: "Part 2" | "Part 3" | "Part 4"): string => {
    const n = part.slice(-1);
    let id: string;
    do {
      counters[part] += 1;
      id = `p${n}-ed-${String(counters[part]).padStart(4, "0")}`;
    } while (existingIds.has(id));
    existingIds.add(id);
    return id;
  };

  const out: Question[] = [];

  for (const r of records.filter((r) => r.part === "Part 2").sort((a, b) => a.number - b.number)) {
    if (r.verification && r.verification.verdict !== "confirmed") {
      skip("answer not confirmed independently");
      continue;
    }
    const key = r.stem.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (existingP2.has(key)) {
      skip("Part 2 prompt already in the bank");
      continue;
    }
    const letters = ["A", "B", "C"] as const;
    if (!letters.every((l) => (r.choices[l] ?? "").trim())) {
      skip("Part 2 item is missing one of its three responses");
      continue;
    }
    existingP2.add(key);
    out.push({
      id: nextId("Part 2"),
      part: "Part 2",
      question: r.stem,
      choices: { A: r.choices.A, B: r.choices.B, C: r.choices.C },
      answer: r.answer,
      explanation_zh: r.explanation_zh,
      skill_tag: r.skill_tag,
      difficulty: r.difficulty,
      vocabulary: r.vocabulary,
      // The generator splits this into the spoken prompt and three replies.
      audioScript:
        `Q: ${r.stem}\n` +
        letters.map((l) => `(${l}) ${r.choices[l]}`).join("\n"),
    });
  }

  const groups = new Map<string, Listening[]>();
  for (const r of records) {
    if (r.part === "Part 2") continue;
    const key = r.transcript_group ?? String(r.number);
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }

  for (const [key, groupRaw] of [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const group = [...groupRaw].sort(
      (a, b) => (a.question_order ?? a.number) - (b.question_order ?? b.number)
    );
    // The daily and mock planners pull whole transcript groups and require
    // exactly three questions, so a short group cannot be shipped at all.
    if (group.length !== 3) {
      skip(`transcript group ${key} has ${group.length} questions (needs exactly 3)`);
      continue;
    }
    if (group.some((r) => r.verification && r.verification.verdict !== "confirmed")) {
      skip("transcript group contains an unconfirmed answer");
      continue;
    }
    const transcript = normaliseSpeakerLabels(
      (group.find((r) => r.transcript)?.transcript ?? "").trim()
    );
    if (!transcript) {
      skip(`transcript group ${key} has no transcript`);
      continue;
    }
    const norm = transcript.replace(/\s+/g, " ").trim();
    if (existingTranscripts.has(norm)) {
      skip("transcript already in the bank");
      continue;
    }
    existingTranscripts.add(norm);
    const part = group[0].part as "Part 3" | "Part 4";
    group.forEach((r, i) => {
      out.push({
        id: nextId(part),
        part,
        question: r.stem,
        choices: {
          A: r.choices.A,
          B: r.choices.B,
          C: r.choices.C,
          D: r.choices.D,
        },
        answer: r.answer,
        explanation_zh: r.explanation_zh,
        skill_tag: r.skill_tag,
        difficulty: r.difficulty,
        vocabulary: r.vocabulary,
        transcript,
        question_order: i + 1,
      });
    });
  }

  const byPart: Record<string, number> = {};
  for (const q of out) byPart[q.part] = (byPart[q.part] ?? 0) + 1;
  console.log(`source records: ${records.length}`);
  console.log(`importable:     ${out.length}`, byPart);
  console.log("skipped:");
  for (const [reason, count] of Object.entries(skipped).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(4)}x ${reason}`);
  }

  if (dryRun) {
    console.log("\n--dry-run: nothing written");
    return;
  }
  const target = path.join(DATA_DIR, "questions-imported-ed-listening.ts");
  fs.writeFileSync(
    target,
    `import type { Question } from "@/types/question";\n\n` +
      `/**\n` +
      ` * Listening questions transcribed from the Eduwill mock test.\n` +
      ` * Questions, choices, transcripts and answer key come from the book; the\n` +
      ` * Chinese explanations, skill tags, difficulties and vocabulary are generated.\n` +
      ` * Audio is synthesised — the book's own recordings are not included with it.\n` +
      ` * Generated by pipeline/src/pdf-import — do not hand-edit.\n` +
      ` */\n` +
      `export const IMPORTED_LISTENING_ED: Question[] = ` +
      `${JSON.stringify(out, null, 2)};\n`
  );
  console.log(`\nwrote ${out.length} questions to data/questions-imported-ed-listening.ts`);
}

main();
