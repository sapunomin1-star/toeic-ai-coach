/**
 * Independently re-derive the answer to questions that only had one source.
 *
 * Questions confirmed by two separate places in the book are safe. The rest
 * rest on a single reading, and measurement on the overlap showed each reading
 * is wrong roughly 3% of the time — enough that a single-source question can
 * teach the wrong thing. So each one is solved again from scratch by a model
 * that is not shown the book's answer, giving a genuinely independent second
 * opinion.
 *
 * Agreement promotes the question. Disagreement goes to a stronger model to
 * adjudicate; if that still disagrees with the book, the question is dropped
 * rather than shipped on a coin flip.
 *
 * Usage:
 *   npx tsx src/pdf-import/verify-answers.ts --book ed [--limit 20]
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { config } from "../config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.resolve(__dirname, "../../output/pdf-import");

/** Sources where a second place in the book already confirms the letter. */
const TWO_SOURCE = new Set(["paper+explanation+table", "booklet-cross-checked"]);

const ADJUDICATOR = "google/gemini-2.5-flash";

type Assembled = {
  test: number;
  number: number;
  part: string;
  stem: string;
  choices: Record<string, string>;
  answer: string;
  passage?: string | null;
  transcript?: string | null;
  answer_source?: string;
  verification?: {
    solver: string | null;
    adjudicator?: string | null;
    verdict: "confirmed" | "rejected" | "unresolved";
  };
};

function buildPrompt(q: Assembled): string {
  const source = q.transcript
    ? `Here is what the listener hears:\n"""\n${q.transcript.slice(0, 4000)}\n"""\n\n`
    : q.passage
      ? `Read this first:\n"""\n${q.passage.slice(0, 4000)}\n"""\n\n`
      : "";
  const passage = source;
  const stem = q.stem?.trim()
    ? q.stem
    : q.part === "Part 2"
      ? "(pick the most natural reply to what was just said)"
      : "(the blank marked in the passage above for this item)";
  return (
    `${passage}TOEIC ${q.part} question.\n${stem}\n` +
    ["A", "B", "C", "D"]
      .filter((l) => q.choices[l])
      .map((l) => `(${l}) ${q.choices[l]}`)
      .join("\n") +
    `\n\nWhich choice is correct? Reply with the single letter only.`
  );
}

function parseLetter(text: string): string | null {
  const m = text.trim().toUpperCase().match(/\b([ABCD])\b/);
  return m ? m[1] : null;
}

async function ask(
  baseUrl: string,
  apiKey: string,
  model: string,
  prompt: string
): Promise<string | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are a TOEIC expert. Answer with one letter and nothing else.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0,
          max_tokens: 2000,
        }),
      });
      if (!res.ok) {
        if (res.status === 429 || res.status >= 500) {
          await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
          continue;
        }
        return null;
      }
      const data = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      return parseLetter(data.choices?.[0]?.message?.content ?? "");
    } catch {
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
    }
  }
  return null;
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        results[i] = await fn(items[i], i);
      }
    })
  );
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const book = args[args.indexOf("--book") + 1];
  const limitFlag = args.indexOf("--limit");
  const limit = limitFlag === -1 ? Infinity : Number(args[limitFlag + 1]);
  if (!book) throw new Error("--book is required");

  const openrouterKey = process.env.OPENROUTER_API_KEY ?? "";
  const fileFlag = args.indexOf("--file");
  const inPath = path.join(
    OUT_ROOT,
    fileFlag === -1 ? `${book}-assembled.json` : args[fileFlag + 1]
  );
  const all = JSON.parse(fs.readFileSync(inPath, "utf8")) as Assembled[];

  const needsCheck = all.filter(
    (q) => !TWO_SOURCE.has(q.answer_source ?? "") && !q.verification
  );
  const todo = limit === Infinity ? needsCheck : needsCheck.slice(0, limit);
  console.log(
    `${book}: ${all.length} assembled, ` +
      `${all.length - needsCheck.length} already have two sources, ` +
      `${todo.length} to verify independently`
  );

  let done = 0;
  const stats = { confirmed: 0, rejected: 0, unresolved: 0 };

  await mapWithConcurrency(todo, 6, async (q) => {
    const prompt = buildPrompt(q);
    const solver = await ask(
      config.deepseek.baseUrl,
      config.deepseek.apiKey,
      config.deepseek.model,
      prompt
    );

    let verdict: "confirmed" | "rejected" | "unresolved";
    let adjudicator: string | null = null;

    if (solver === null) {
      verdict = "unresolved";
    } else if (solver === q.answer) {
      verdict = "confirmed";
    } else {
      // The two disagree, so bring in a stronger, differently-trained model
      // rather than picking whichever answer came first.
      adjudicator = openrouterKey
        ? await ask(
            "https://openrouter.ai/api/v1",
            openrouterKey,
            ADJUDICATOR,
            prompt
          )
        : null;
      verdict =
        adjudicator === null
          ? "unresolved"
          : adjudicator === q.answer
            ? "confirmed"
            : "rejected";
    }

    q.verification = { solver, adjudicator, verdict };
    stats[verdict] += 1;
    done += 1;
    if (done % 25 === 0) console.log(`  [${done}/${todo.length}] ${JSON.stringify(stats)}`);
  });

  fs.writeFileSync(inPath, JSON.stringify(all, null, 1));
  console.log(
    `verified ${todo.length}: ${stats.confirmed} confirmed, ` +
      `${stats.rejected} rejected (book answer contradicted twice), ` +
      `${stats.unresolved} unresolved`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
