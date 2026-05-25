#!/usr/bin/env npx tsx
/**
 * Generate TOEIC listening audio via OpenAI tts-1 and upload to Vercel Blob.
 *
 * Usage:
 *   npx tsx pipeline/src/generate-audio.ts --dry-run                  # preview only
 *   npx tsx pipeline/src/generate-audio.ts --part 1 --limit 3         # test 3 Part 1 questions
 *   npx tsx pipeline/src/generate-audio.ts --part 1                   # all Part 1
 *   npx tsx pipeline/src/generate-audio.ts --part all                 # all listening parts
 *   npx tsx pipeline/src/generate-audio.ts --question p1-gen-005      # single question
 *   npx tsx pipeline/src/generate-audio.ts --part 1 --force           # re-upload existing
 *   npx tsx pipeline/src/generate-audio.ts --question-audio --part 3  # P3 spoken questions
 *
 * Flags:
 *   --part <1|2|3|4|all>    Which part(s). Default: error (must specify, unless --question).
 *   --limit N               Process first N matching questions.
 *   --question <id>         Process one specific question (overrides --part).
 *   --dry-run               Show plan only, no API calls.
 *   --force                 Re-generate even if Blob already has audio/<id>.mp3.
 *   --voice <name>          Override voice rotation (alloy|echo|fable|onyx|nova|shimmer).
 *   --question-audio        Generate narrated Part 3 question stems at audio/<id>-q.mp3.
 */
import "dotenv/config";
import OpenAI from "openai";
import { del, head, put } from "@vercel/blob";

import { QUESTIONS } from "../../data/questions";
import type { Part, Question } from "../../types/question";

// ─── Config ──────────────────────────────────────────────────────────────
const LISTENING_PARTS: Part[] = ["Part 1", "Part 2", "Part 3", "Part 4"];
const VOICES = ["alloy", "echo", "nova", "shimmer"] as const;
const ALL_VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"] as const;
type Voice = (typeof ALL_VOICES)[number];
const MODEL = "tts-1";
const RATE_LIMIT_RPM = 30; // stay under OpenAI tier 1 = 50 RPM
const COST_PER_1M_CHARS_USD = 15; // tts-1 pricing as of 2024

type Segment = {
  voice: Voice;
  text: string;
};

type AudioPlan = {
  mode: "single" | "p2-multi" | "p3-multi" | "p3-question";
  segments: Segment[];
};

// ─── CLI parsing ─────────────────────────────────────────────────────────
type Args = {
  part?: "1" | "2" | "3" | "4" | "all";
  limit?: number;
  question?: string;
  dryRun: boolean;
  force: boolean;
  questionAudio: boolean;
  voiceOverride?: Voice;
};

function parseArgs(argv: string[]): Args {
  const out: Args = { dryRun: false, force: false, questionAudio: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
    else if (a === "--question-audio") out.questionAudio = true;
    else if (a === "--part") out.part = argv[++i] as Args["part"];
    else if (a === "--limit") out.limit = parseInt(argv[++i], 10);
    else if (a === "--question") out.question = argv[++i];
    else if (a === "--voice") out.voiceOverride = parseVoice(argv[++i]);
    else if (a === "--help") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`unknown argument: ${a}`);
    }
  }
  if (out.limit !== undefined && (!Number.isInteger(out.limit) || out.limit < 1)) {
    throw new Error("--limit must be a positive integer");
  }
  return out;
}

function parseVoice(value: string | undefined): Voice {
  if (!value || !ALL_VOICES.includes(value as Voice)) {
    throw new Error(`--voice must be one of: ${ALL_VOICES.join(", ")}`);
  }
  return value as Voice;
}

function printHelp(): void {
  console.log("Usage: see file header. Run with --dry-run first.");
}

// ─── Env validation ──────────────────────────────────────────────────────
function validateEnv(args: Args): void {
  const need: Record<string, string | undefined> = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    NEXT_PUBLIC_BLOB_BASE_URL: process.env.NEXT_PUBLIC_BLOB_BASE_URL,
  };
  const missing = Object.entries(need)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0 && !args.dryRun) {
    console.error("ERROR: missing env vars (must be set in pipeline/.env):");
    for (const k of missing) console.error(`  - ${k}`);
    process.exit(1);
  }
}

function getBlobBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/+$/, "") ?? "";
}

// ─── Audio source text builder ───────────────────────────────────────────
/**
 * Normalize an audio script for tts-1 input.
 *
 * Two transformations:
 * 1) `(A) ... (B) ... (C) ... (D) ...` → `Letter A. ... Letter B. ...`
 *    tts-1 has a known quirk where it elides "(D)" specifically (and
 *    occasionally other parenthesised letters); using natural prose form
 *    is robust. We do NOT modify the stored `audioScript` field because
 *    the UI uses that text for the post-answer reveal panel and the
 *    "(X)" form is what the test booklet shows.
 * 2) `Q: <stem>` → `<stem>` for Part 2. Real TOEIC audio just plays the
 *    question without an explicit marker; the "Q:" was a data-format
 *    convention, not something we want the announcer to read aloud
 *    ("Q colon ...").
 */
function normalizeForTTS(raw: string): string {
  return raw
    .replace(/^Q:\s*/gm, "")
    .replace(/\(\s*([A-D])\s*\)\s*/g, "Letter $1. ");
}

function buildAudioText(q: Question): string {
  const text = q.audioScript ?? q.transcript;
  if (!text) {
    throw new Error(`[${q.id}] no audioScript or transcript field`);
  }
  return normalizeForTTS(text);
}

// ─── Voice rotation (deterministic by id hash) ───────────────────────────
function pickVoice(questionId: string, override?: Voice): Voice {
  if (override) return override;
  let h = 0;
  for (let i = 0; i < questionId.length; i++) {
    h = (h * 31 + questionId.charCodeAt(i)) | 0;
  }
  return VOICES[Math.abs(h) % VOICES.length];
}

function mapSpeakerToVoice(label: string): Voice {
  switch (label.replace(/\s+/g, "").toUpperCase()) {
    case "W":
    case "W1":
    case "WOMAN":
      return "nova";
    case "W2":
      return "shimmer";
    case "M":
    case "M1":
    case "MAN":
      return "onyx";
    case "M2":
      return "echo";
    default:
      return "alloy";
  }
}

function opposingVoice(voice: Voice): Voice {
  return voice === "onyx" || voice === "echo" ? "nova" : "onyx";
}

function parseSpeakerSegments(transcript: string): Segment[] | null {
  const speakerPattern =
    /^(W|M|Woman|Man|M\d+|W\d+|Speaker\s*\d+)\s*:\s*(.+)$/i;
  const segments = transcript
    .split(/\r?\n/)
    .flatMap((line) => {
      const match = line.trim().match(speakerPattern);
      if (!match) return [];
      const text = normalizeForTTS(match[2]).trim();
      return text ? [{ voice: mapSpeakerToVoice(match[1]), text }] : [];
    });

  return segments.length > 1 ? segments : null;
}

function parseP2Segments(raw: string, questionVoice: Voice): Segment[] | null {
  const lines = normalizeForTTS(raw)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const firstResponseIndex = lines.findIndex((line) =>
    /^Letter\s+[A-C]\.\s*.+/i.test(line)
  );
  if (firstResponseIndex < 1) return null;

  const question = lines.slice(0, firstResponseIndex).join(" ").trim();
  const responses = lines.slice(firstResponseIndex).flatMap((line) => {
    const match = line.match(/^Letter\s+([A-C])\.\s*(.+)$/i);
    return match ? [`Letter ${match[1].toUpperCase()}. ${match[2].trim()}`] : [];
  });
  if (!question || responses.length !== 3) return null;

  const responseVoice = opposingVoice(questionVoice);
  return [
    { voice: questionVoice, text: question },
    ...responses.map((text) => ({ voice: responseVoice, text })),
  ];
}

function buildAudioPlan(q: Question, override?: Voice): AudioPlan {
  const raw = q.audioScript ?? q.transcript;
  if (!raw) {
    throw new Error(`[${q.id}] no audioScript or transcript field`);
  }

  if (q.part === "Part 3") {
    const segments = parseSpeakerSegments(raw);
    if (segments) return { mode: "p3-multi", segments };
  }

  if (q.part === "Part 2") {
    const segments = parseP2Segments(raw, pickVoice(q.id, override));
    if (segments) return { mode: "p2-multi", segments };
  }

  return {
    mode: "single",
    segments: [{ voice: pickVoice(q.id, override), text: buildAudioText(q) }],
  };
}

function buildQuestionAudioPlan(q: Question): AudioPlan {
  if (q.part !== "Part 3") {
    throw new Error(`question audio is supported only for Part 3: ${q.id}`);
  }
  if (!q.question.trim()) {
    throw new Error(`[${q.id}] no question text for narrated audio`);
  }
  return {
    mode: "p3-question",
    segments: [{ voice: "fable", text: normalizeForTTS(q.question) }],
  };
}

function describeAudioPlan(plan: AudioPlan): string {
  const voices = plan.segments.map((segment) => segment.voice).join(",");
  return `segments=${plan.segments.length} voices=[${voices}]`;
}

function createRequestLimiter(): () => Promise<void> {
  const minimumGapMs = 60_000 / RATE_LIMIT_RPM;
  let previousStartedAt = 0;
  return async () => {
    const sleepMs = Math.max(0, previousStartedAt + minimumGapMs - Date.now());
    if (sleepMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, sleepMs));
    }
    previousStartedAt = Date.now();
  };
}

async function generateSingleVoice(
  openai: OpenAI,
  segment: Segment,
  waitForRequestSlot: () => Promise<void>
): Promise<Buffer> {
  await waitForRequestSlot();
  const response = await openai.audio.speech.create({
    model: MODEL,
    voice: segment.voice,
    input: segment.text,
    response_format: "mp3",
  });
  return Buffer.from(await response.arrayBuffer());
}

async function generateMultiVoiceAudio(
  openai: OpenAI,
  segments: Segment[],
  waitForRequestSlot: () => Promise<void>
): Promise<Buffer> {
  const buffers: Buffer[] = [];
  for (const segment of segments) {
    buffers.push(await generateSingleVoice(openai, segment, waitForRequestSlot));
  }
  return Buffer.concat(buffers);
}

// ─── Blob existence check ────────────────────────────────────────────────
async function blobExists(pathname: string): Promise<boolean> {
  try {
    await head(`${getBlobBaseUrl()}/${pathname}`, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
    return true;
  } catch {
    return false;
  }
}

async function deleteBlob(pathname: string): Promise<void> {
  await del(`${getBlobBaseUrl()}/${pathname}`, {
    token: process.env.BLOB_READ_WRITE_TOKEN!,
  });
}

// ─── Filter ──────────────────────────────────────────────────────────────
function selectQuestions(args: Args): Question[] {
  if (args.question) {
    const q = QUESTIONS.find((x) => x.id === args.question);
    if (!q) throw new Error(`question id not found: ${args.question}`);
    if (args.questionAudio && q.part !== "Part 3") {
      throw new Error("--question-audio supports Part 3 questions only");
    }
    if (!LISTENING_PARTS.includes(q.part)) {
      throw new Error(`audio not supported for ${q.part} (only Part 1/2/3/4)`);
    }
    return [q];
  }
  if (!args.part) throw new Error("--part required (1/2/3/4/all)");
  if (args.questionAudio && args.part !== "3") {
    throw new Error("--question-audio requires --part 3 (or --question with a Part 3 id)");
  }
  if (args.part !== "all" && !["1", "2", "3", "4"].includes(args.part)) {
    throw new Error(`audio not supported for Part ${args.part} (only Part 1/2/3/4)`);
  }
  const parts: Part[] =
    args.part === "all" ? LISTENING_PARTS : [`Part ${args.part}` as Part];
  let qs = QUESTIONS.filter((q) => parts.includes(q.part));
  if (args.limit !== undefined) qs = qs.slice(0, args.limit);
  return qs;
}

function audioPathname(q: Question, args: Args): string {
  return args.questionAudio ? `audio/${q.id}-q.mp3` : `audio/${q.id}.mp3`;
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv.slice(2));
  validateEnv(args);

  const questions = selectQuestions(args);
  console.log(`Selected ${questions.length} questions`);
  if (questions.length === 0) {
    console.log("Nothing to do.");
    return;
  }

  const plans = questions.map((q) => ({
    question: q,
    plan: args.questionAudio
      ? buildQuestionAudioPlan(q)
      : buildAudioPlan(q, args.voiceOverride),
  }));
  const totalChars = plans.reduce(
    (sum, { plan }) =>
      sum + plan.segments.reduce((segmentSum, segment) => segmentSum + segment.text.length, 0),
    0,
  );
  const requestCount = plans.reduce((sum, { plan }) => sum + plan.segments.length, 0);
  const pathCounts = plans.reduce(
    (counts, { plan }) => {
      counts[plan.mode] += 1;
      return counts;
    },
    { single: 0, "p2-multi": 0, "p3-multi": 0, "p3-question": 0 },
  );
  const estCostUsd = (totalChars / 1_000_000) * COST_PER_1M_CHARS_USD;
  console.log(`Total chars to TTS: ${totalChars.toLocaleString()}`);
  console.log(`TTS requests:       ${requestCount.toLocaleString()}`);
  console.log(
    `Audio paths:        single=${pathCounts.single} p2-multi=${pathCounts["p2-multi"]} p3-multi=${pathCounts["p3-multi"]} p3-question=${pathCounts["p3-question"]}`,
  );
  console.log(`Estimated cost:     $${estCostUsd.toFixed(4)} USD`);
  console.log(`Rate limit:         ${RATE_LIMIT_RPM} requests/min`);
  console.log(`Estimated runtime:  ${Math.ceil(requestCount / RATE_LIMIT_RPM)} min(s)`);

  if (args.dryRun) {
    console.log("\n[dry-run] Plan:");
    for (const { question, plan } of plans.slice(0, 5)) {
      const chars = plan.segments.reduce((sum, segment) => sum + segment.text.length, 0);
      console.log(
        `  [${question.id}] ${question.part} ${describeAudioPlan(plan)} chars=${chars}`,
      );
    }
    if (questions.length > 5) console.log(`  ... and ${questions.length - 5} more`);
    return;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const token = process.env.BLOB_READ_WRITE_TOKEN!;

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  const failedIds: string[] = [];

  const startTime = Date.now();
  const waitForRequestSlot = createRequestLimiter();

  for (let i = 0; i < plans.length; i++) {
    const { question: q, plan } = plans[i];
    const pathname = audioPathname(q, args);

    try {
      if (await blobExists(pathname)) {
        if (!args.force) {
          console.log(`[${i + 1}/${plans.length}] SKIP ${q.id} (exists)`);
          skipped++;
          continue;
        }
        await deleteBlob(pathname);
      }

      const t0 = Date.now();
      const buf =
        plan.segments.length === 1
          ? await generateSingleVoice(openai, plan.segments[0], waitForRequestSlot)
          : await generateMultiVoiceAudio(openai, plan.segments, waitForRequestSlot);

      const blob = await put(pathname, buf, {
        access: "public",
        addRandomSuffix: false,
        contentType: "audio/mpeg",
        token,
      });

      const ms = Date.now() - t0;
      console.log(
        `[${i + 1}/${plans.length}] OK   ${q.id} ${describeAudioPlan(plan)} ${buf.length}B ${ms}ms -> ${blob.url}`,
      );
      generated++;
    } catch (e) {
      failed++;
      failedIds.push(q.id);
      console.error(`[${i + 1}/${plans.length}] FAIL ${q.id}: ${(e as Error).message}`);
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Generated: ${generated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);
  if (failedIds.length > 0) console.log(`Failed IDs: ${failedIds.join(", ")}`);
  console.log(`Total time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
}

main().catch((e) => {
  console.error("FATAL:", (e as Error).message);
  process.exit(1);
});
