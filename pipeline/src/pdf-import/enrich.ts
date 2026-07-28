/**
 * Add the app-side fields the books do not supply.
 *
 * The extracted questions carry the parts that must come from the source —
 * stem, choices, passage, and the answer key. Everything the app additionally
 * requires (Traditional Chinese explanation, skill tag, difficulty, vocabulary)
 * is written fresh here rather than transcribed from the books' own commentary:
 * it keeps the explanations in this app's voice and in Traditional Chinese,
 * and avoids reproducing the publishers' annotations wholesale.
 *
 * The question, choices, and answer are never sent back through the model's
 * output path — only the new fields are taken from its reply.
 *
 * Usage:
 *   npx tsx src/pdf-import/enrich.ts --book xd [--limit 40]
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { deepseek, parseGeneratedJson } from "../llm-client";
import { SKILLS, type SkillTag, type Difficulty } from "../../../types/question";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.resolve(__dirname, "../../output/pdf-import");

type Assembled = {
  source: string;
  test?: number;
  number: number;
  part: "Part 2" | "Part 3" | "Part 4" | "Part 5" | "Part 6" | "Part 7";
  transcript?: string | null;
  transcript_group?: string | null;
  stem: string;
  choices: { A: string; B: string; C: string; D: string };
  answer: "A" | "B" | "C" | "D";
  passage?: string | null;
  passage_numbers?: number[] | null;
  passage_order?: number | null;
  doc_type?: string | null;
};

type Enrichment = {
  number: number;
  explanation_zh: string;
  skill_tag: SkillTag;
  difficulty: Difficulty;
  vocabulary: string[];
};

const READING_TAGS: SkillTag[] = [
  "reading_main_idea",
  "reading_detail",
  "reading_inference",
  "reading_vocab",
];
const LISTENING_TAGS: Record<string, SkillTag[]> = {
  "Part 2": ["listening_response"],
  "Part 3": [
    "listening_main_idea",
    "listening_detail",
    "listening_inference",
    "listening_next_action",
  ],
  "Part 4": [
    "listening_main_idea",
    "listening_detail",
    "listening_inference",
    "listening_next_action",
  ],
};
const P5_TAGS: SkillTag[] = [
  "passive_voice",
  "word_form",
  "tense",
  "preposition",
  "conjunction",
  "pronoun",
  "relative_clause",
  "business_vocabulary",
];
const ALL_TAGS = new Set(Object.keys(SKILLS) as SkillTag[]);
const DIFFICULTIES = new Set<Difficulty>(["A2", "B1", "B2", "C1"]);

const SYSTEM = `你是多益教學者，為既有的多益考題撰寫繁體中文解析與標籤。

鐵則：
1. 題目、選項、正確答案都已固定，你不得更動、不得質疑、不得重寫。你的工作只是說明「為什麼那個答案是對的」。
2. explanation_zh 用繁體中文，2-4 句，直接講解題關鍵：文法題點出規則，閱讀題指出原文哪一句是依據。不要寫「答案是(B)」這種空話。
3. 解析中若要提到選項，寫出選項的內容文字，不要只寫代號字母。
   但**在「答案為」「正確答案是」這類句子後面，必須先寫出正確代號再接內容**，
   例如「因此正確答案為 (C) A publishing company」。理由：英文選項常以冠詞
   A 開頭，若直接寫「答案為 A publishing company」，會被誤讀成答案是 A。
4. vocabulary 放 2-5 個該題真正值得記的商務／多益字詞，用英文原形。
5. 只輸出 JSON 陣列，不要任何其他文字。`;

function buildUserPrompt(items: Assembled[], passage?: string | null): string {
  const part = items[0].part;
  const tagList = (
    LISTENING_TAGS[part] ?? (part === "Part 5" ? P5_TAGS : READING_TAGS)
  ).join(" | ");
  const transcript = items.find((q) => q.transcript)?.transcript;
  const passageBlock = transcript
    ? `\n聽力錄音稿（考生只聽到這段，看不到文字）：\n"""\n${transcript}\n"""\n`
    : passage
      ? `\n共用文章（Part 6 的空格以 ---(題號)--- 標示）：\n"""\n${passage}\n"""\n`
      : "";
  const body = items
    .map(
      (q) =>
        `題號 ${q.number}（${q.part}）\n` +
        (q.part === "Part 2"
          ? `聽到的問句：${q.stem}\n`
          : q.stem
            ? `題幹：${q.stem}\n`
            : "題幹：（此題為文章中的空格）\n") +
        (["A", "B", "C", "D"] as const)
          .filter((l) => q.choices[l])
          .map((l) => `(${l}) ${q.choices[l]}`)
          .join("\n") + "\n" +
        `正確答案：${q.answer}`
    )
    .join("\n\n");

  return `${passageBlock}
${body}

為上面每一題輸出一個物件，格式：
[{"number": <題號>, "explanation_zh": "...", "skill_tag": "<${tagList}>", "difficulty": "A2|B1|B2|C1", "vocabulary": ["...", "..."]}]`;
}

function groupKey(q: Assembled): string {
  if (q.transcript_group) return `tr:${q.transcript_group}`;
  if (q.part === "Part 2") return `p2-${Math.floor(q.number / 6)}`;
  if (q.part === "Part 5") return `p5-${Math.floor(q.number / 8)}-${q.test}`;
  return `${q.test}:${(q.passage_numbers ?? [q.number]).join(",")}`;
}

async function enrichGroup(items: Assembled[]): Promise<Enrichment[]> {
  const passage = items.find((q) => q.passage)?.passage ?? null;
  const prompt = buildUserPrompt(items, passage);
  const wanted = new Set(items.map((q) => q.number));

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await deepseek(SYSTEM, prompt, 0.4);
      const parsed = parseGeneratedJson(res.content) as Enrichment[];
      const clean = parsed.filter(
        (e) =>
          e &&
          wanted.has(e.number) &&
          typeof e.explanation_zh === "string" &&
          e.explanation_zh.trim().length >= 10 &&
          ALL_TAGS.has(e.skill_tag) &&
          DIFFICULTIES.has(e.difficulty)
      );
      if (clean.length) return clean;
    } catch (err) {
      if (attempt === 2) {
        console.warn(
          `  group ${items[0].number}-${items[items.length - 1].number} failed: ${
            (err as Error).message.slice(0, 120)
          }`
        );
      }
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  return [];
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const book = args[args.indexOf("--book") + 1];
  const limitFlag = args.indexOf("--limit");
  const limit = limitFlag === -1 ? Infinity : Number(args[limitFlag + 1]);
  if (!book) throw new Error("--book is required");

  const fileFlag = args.indexOf("--file");
  const stem = fileFlag === -1 ? `${book}-assembled` : args[fileFlag + 1].replace(/\.json$/, "");
  const inPath = path.join(OUT_ROOT, `${stem}.json`);
  const outPath = path.join(OUT_ROOT, `${stem.replace(/-assembled$/, "")}-enriched.json`);
  const all = JSON.parse(fs.readFileSync(inPath, "utf8")) as Assembled[];

  // Resume support: keep whatever a previous run already enriched.
  const done = new Map<string, Assembled & Enrichment>();
  if (fs.existsSync(outPath)) {
    for (const q of JSON.parse(fs.readFileSync(outPath, "utf8")) as (Assembled &
      Enrichment)[]) {
      done.set(`${q.test ?? 0}:${q.number}:${q.part}`, q);
    }
  }

  const todo = all.filter((q) => !done.has(`${q.test ?? 0}:${q.number}:${q.part}`));
  const groups = new Map<string, Assembled[]>();
  for (const q of todo.slice(0, limit === Infinity ? undefined : limit)) {
    const key = groupKey(q);
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(q);
  }

  const groupList = [...groups.values()];
  console.log(
    `${book}: ${all.length} assembled, ${done.size} already enriched, ` +
      `${groupList.reduce((n, g) => n + g.length, 0)} questions in ${groupList.length} groups to do`
  );

  let completed = 0;
  const enrichedGroups = await mapWithConcurrency(groupList, 6, async (group) => {
    const enrichment = await enrichGroup(group);
    const byNumber = new Map(enrichment.map((e) => [e.number, e]));
    completed += 1;
    if (completed % 20 === 0) {
      console.log(`  [${completed}/${groupList.length}] groups done`);
    }
    return group
      .map((q) => {
        const e = byNumber.get(q.number);
        return e ? { ...q, ...e } : null;
      })
      .filter(Boolean) as (Assembled & Enrichment)[];
  });

  const merged = [...done.values(), ...enrichedGroups.flat()];
  fs.writeFileSync(outPath, JSON.stringify(merged, null, 1));
  const missing = all.length - merged.length;
  console.log(
    `enriched ${merged.length}/${all.length}` +
      (missing > 0 ? ` — ${missing} still missing, re-run to retry them` : "")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
