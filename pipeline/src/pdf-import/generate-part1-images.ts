/**
 * Create the photograph a Part 1 question is about, and prove it is the right one.
 *
 * The books keep their photographs inside scanned pages, so the picture here is
 * generated from the choice the answer key marks correct. That alone is not
 * enough: in Part 1 the three wrong choices describe the same scene, so a photo
 * built only from the correct sentence can easily make a distractor true as well
 * ("some lamps are hanging from the ceiling" is easy to satisfy by accident in a
 * kitchen). A question whose photo matches two choices is worse than no question,
 * so the wrong choices are given to the image model as things to avoid, and every
 * generated image is then read back by a vision model that judges all four
 * sentences without being told which is correct. Only an image where exactly the
 * keyed sentence is true gets uploaded.
 *
 * Usage:
 *   npx tsx src/pdf-import/generate-part1-images.ts [--dry-run] [--limit N] [--force]
 */

import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { head, put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.resolve(__dirname, "../../output/pdf-import");

const IMAGE_MODEL = process.env.PART1_IMAGE_MODEL ?? "google/gemini-3.1-flash-image";
const JUDGE_MODEL = process.env.PART1_JUDGE_MODEL ?? "google/gemini-2.5-flash";
const OPENROUTER = "https://openrouter.ai/api/v1/chat/completions";
const MAX_ATTEMPTS = 4;

type Item = {
  part: string;
  number: number;
  choices: Record<string, string>;
  answer: string;
  image_alt?: string;
  image_exclusions?: string[];
  image?: { attempts: number; verdict: "ok" | "failed"; judged?: Record<string, boolean> };
};

const STYLE =
  "A realistic, natural-looking colour photograph, as used in an English " +
  "listening exam. Ordinary everyday scene, candid framing, plain lighting, " +
  "no text, no captions, no watermarks, no logos, no collage, no illustration.";

function buildImagePrompt(item: Item, attempt: number): string {
  const must = item.image_alt ?? item.choices[item.answer];
  const avoid = (item.image_exclusions ?? []).map((s) => `- ${s}`).join("\n");
  const insist =
    attempt === 0
      ? ""
      : "\n\nA previous attempt showed more than one of the statements below as " +
        "true. Be strict: the scene must clearly show the required action and " +
        "must leave no room to read any avoided statement as true.";
  return (
    `${STYLE}\n\nThe photograph must clearly show: ${must}\n\n` +
    `It must NOT show, and must not let a viewer honestly say, any of these:\n${avoid}` +
    insist
  );
}

type OpenRouterReply = {
  choices?: {
    message?: {
      content?: string;
      images?: { image_url?: { url?: string } }[];
    };
  }[];
};

async function openrouter(body: unknown): Promise<OpenRouterReply> {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(OPENROUTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        if (res.status === 429 || res.status >= 500) {
          await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
          continue;
        }
        throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      }
      return await res.json();
    } catch (err) {
      if (attempt === 4) throw err;
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
    }
  }
  throw new Error("unreachable");
}

async function generateImage(prompt: string): Promise<Buffer> {
  const data = await openrouter({
    model: IMAGE_MODEL,
    messages: [{ role: "user", content: prompt }],
    modalities: ["image", "text"],
  });
  const images = data.choices?.[0]?.message?.images;
  const url: string | undefined = images?.[0]?.image_url?.url;
  if (!url?.startsWith("data:")) {
    throw new Error("model returned no inline image");
  }
  return Buffer.from(url.slice(url.indexOf(",") + 1), "base64");
}

/**
 * Ask which of the four sentences are true of this photo, without saying which
 * one is supposed to be. A photo that satisfies two of them is unusable even
 * when one of the two is the keyed answer.
 */
async function judgeImage(
  jpeg: Buffer,
  choices: Record<string, string>
): Promise<Record<string, boolean>> {
  const letters = ["A", "B", "C", "D"] as const;
  const list = letters.map((l) => `${l}. ${choices[l]}`).join("\n");
  const data = await openrouter({
    model: JUDGE_MODEL,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Look at this photograph and judge each statement strictly on what ` +
              `is visible.\n\n${list}\n\n` +
              `Reply with JSON only: {"A": true|false, "B": ..., "C": ..., "D": ...}. ` +
              `Mark a statement true only if the photo plainly shows it.`,
          },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${jpeg.toString("base64")}` },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
  });
  const raw = data.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  return Object.fromEntries(
    letters.map((l) => [l, parsed[l] === true])
  ) as Record<string, boolean>;
}

async function blobExists(pathname: string): Promise<boolean> {
  try {
    await head(pathname, { token: process.env.BLOB_READ_WRITE_TOKEN! });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const force = args.includes("--force");
  const limitFlag = args.indexOf("--limit");
  const limit = limitFlag === -1 ? Infinity : Number(args[limitFlag + 1]);

  const inPath = path.join(OUT_ROOT, "ed-listening.json");
  const all = JSON.parse(fs.readFileSync(inPath, "utf8")) as Item[];
  const part1 = all.filter((q) => q.part === "Part 1").slice(0, limit);

  console.log(`Part 1 items: ${part1.length}   image model: ${IMAGE_MODEL}`);
  if (dryRun) {
    for (const item of part1) {
      console.log(`\n--- Q${item.number} (answer ${item.answer})`);
      console.log(buildImagePrompt(item, 0));
    }
    return;
  }

  let ok = 0;
  let failed = 0;
  for (const item of part1) {
    // Ids are assigned by write-listening.ts in question order.
    const id = `p1-ed-${String(part1.indexOf(item) + 1).padStart(4, "0")}`;
    const pathname = `images/${id}.jpg`;
    if (!force && (await blobExists(pathname))) {
      console.log(`SKIP ${id} (exists)`);
      ok++;
      continue;
    }

    let accepted = false;
    let lastJudged: Record<string, boolean> = {};
    for (let attempt = 0; attempt < MAX_ATTEMPTS && !accepted; attempt++) {
      try {
        const raw = await generateImage(buildImagePrompt(item, attempt));
        const jpeg = await sharp(raw)
          .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 82 })
          .toBuffer();
        const judged = await judgeImage(jpeg, item.choices);
        lastJudged = judged;
        const trueOnes = Object.entries(judged)
          .filter(([, v]) => v)
          .map(([k]) => k);
        const isClean = trueOnes.length === 1 && trueOnes[0] === item.answer;
        console.log(
          `  ${id} attempt ${attempt + 1}: true=${trueOnes.join("") || "none"} ` +
            `(need ${item.answer}) ${isClean ? "OK" : "retry"}`
        );
        if (!isClean) continue;

        await put(pathname, jpeg, {
          access: "public",
          addRandomSuffix: false,
          contentType: "image/jpeg",
          token: process.env.BLOB_READ_WRITE_TOKEN!,
        });
        console.log(`OK   ${id} ${Math.round(jpeg.length / 1024)}KB -> ${pathname}`);
        item.image = { attempts: attempt + 1, verdict: "ok", judged };
        accepted = true;
        ok++;
      } catch (err) {
        console.error(`  ${id} attempt ${attempt + 1} error: ${(err as Error).message}`);
      }
    }
    if (!accepted) {
      item.image = { attempts: MAX_ATTEMPTS, verdict: "failed", judged: lastJudged };
      console.error(`FAIL ${id}: no image satisfied only choice ${item.answer}`);
      failed++;
    }
  }

  fs.writeFileSync(inPath, JSON.stringify(all, null, 1));
  console.log(`\nusable photos: ${ok}   unusable: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
