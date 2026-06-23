#!/usr/bin/env npx tsx
/**
 * Generate reviewed Part 5 preposition questions and append them to
 * data/questions-part5.ts (the curated P5 bank, NOT questions-generated.ts).
 *
 * Flow:
 *   1. generatePart5() (DeepSeek + Kimi explanation polish) per difficulty
 *      bucket — B1 collocation/time-place, B2 advanced collocation, C1 formal
 *      fixed collocations (in compliance with / at the discretion of, ...).
 *   2. Independent GPT-4o review with per-item verdicts; rejected items are
 *      regenerated from the same bucket and re-reviewed (max 3 rounds).
 *      Rejection reasons include: a second defensible preposition, wrong key,
 *      unnatural sentence, blank not actually testing a preposition.
 *   3. Relocate answers onto a balanced A/B/C/D plan (5 each across 20),
 *      then rewrite explanations for moved items so letters stay accurate.
 *   4. Append to data/questions-part5.ts preserving its JSON-quoted-key,
 *      2-space-indent format and trailing comma; ids continue p5-pr-NNN.
 *
 * Usage (from pipeline/):
 *   npx tsx src/generate-p5-prepositions.ts            # generate + write
 *   npx tsx src/generate-p5-prepositions.ts --dry-run  # generate + review, no write
 */
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

import { QUESTIONS } from "../../data/questions";
import type { Choice } from "../../types/question";
import { generatePart5 } from "./generator-part5";
import { deepseek, getLlmUsage } from "./llm-client";
import { traditionalizeDeep } from "./traditionalize";
import type { Pattern, RawGeneratedQuestion } from "./types";
import { validateQuestion } from "./validator";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PART5_DATA_PATH = path.resolve(__dirname, "../../data/questions-part5.ts");
const OUTPUT_DIR = path.resolve(__dirname, "../output");
const GPT_MODEL = "openai/gpt-4o";
const ANSWER_PLAN: Choice[] = ["A", "B", "C", "D"]; // cycled → 5 each over 20

type Bucket = { name: string; count: number; pattern: Pattern };
type Usage = { calls: number; input: number; output: number };

function loadLibraryPattern(patternId: string): Pattern {
  const library = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../patterns/part5-patterns.json"), "utf-8"),
  ) as { patterns: Pattern[] };
  const pattern = library.patterns.find((p) => p.pattern_id === patternId);
  if (!pattern) throw new Error(`pattern not found: ${patternId}`);
  return pattern;
}

/**
 * The blank must sit on the preposition itself. Without this, DeepSeek
 * regularly blanks the adjective/verb of the collocation ("is ___ for
 * overseeing" testing 'responsible'), which the reviewer rightly rejects.
 */
const PREPOSITION_BLANK_RULE =
  " CRITICAL: the blank must replace ONLY the preposition or prepositional phrase itself" +
  " (e.g. 'responsible ___ the budget' testing 'for'); never blank the adjective, verb, or noun." +
  " All four choices must be prepositions or prepositional phrases.";

function buildBuckets(): Bucket[] {
  const collocationB1Base = loadLibraryPattern("p5-010");
  const collocationB1: Pattern = {
    ...collocationB1Base,
    generation_instruction: collocationB1Base.generation_instruction + PREPOSITION_BLANK_RULE,
  };
  const timePlaceB1: Pattern = {
    ...loadLibraryPattern("p5-004"),
    difficulty: "B1",
    generation_instruction:
      "Generate sentences testing time/place/deadline prepositions where ONLY one fits: " +
      "during vs. throughout vs. for, by vs. until, within vs. in, among vs. between. " +
      "Context: logistics, deliveries, office moves, product launches. The sentence must " +
      "contain a cue (duration phrase, deadline verb, plural/pair noun) that uniquely forces the key." +
      PREPOSITION_BLANK_RULE,
  };
  const advancedB2: Pattern = {
    ...collocationB1,
    pattern_id: "p5-prep-b2-inline",
    difficulty: "B2",
    grammar_focus:
      "formal dependent prepositions: in response to, on behalf of, with regard to, prior to, regardless of, in addition to",
    generation_instruction:
      "Generate sentences testing formal business preposition phrases: in response to, on behalf of, " +
      "with regard to, prior to, regardless of, in addition to, as of, in terms of. Context: corporate " +
      "communications, HR policy, contracts. Exactly one choice may be grammatical and idiomatic; " +
      "distractors must be prepositions that collocate with similar-looking but different heads." +
      PREPOSITION_BLANK_RULE,
  };
  const formalC1: Pattern = {
    ...collocationB1,
    pattern_id: "p5-prep-c1-inline",
    difficulty: "C1",
    tone: "formal",
    grammar_focus:
      "C1 fixed collocations: in compliance with, at the discretion of, in conjunction with, in lieu of, pending",
    generation_instruction:
      "Generate sentences testing advanced FIXED collocations in formal legal/corporate register. " +
      "Across the items, use 'in compliance with' and 'at the discretion of' at least once each; " +
      "other allowed targets: in conjunction with, in lieu of, in accordance with, notwithstanding. " +
      "The blank must remove only the preposition(s) of the collocation. Distractors must be " +
      "prepositions that form valid phrases elsewhere but are wrong in this collocation.",
  };
  return [
    { name: "B1-collocation", count: 5, pattern: collocationB1 },
    { name: "B1-time-place", count: 4, pattern: timePlaceB1 },
    { name: "B2-advanced", count: 8, pattern: advancedB2 },
    { name: "C1-formal-fixed", count: 3, pattern: formalC1 },
  ];
}

async function gptJson(
  client: OpenAI,
  system: string,
  user: string,
  usage: Usage,
): Promise<Record<string, unknown>> {
  const result = await client.chat.completions.create({
    model: GPT_MODEL,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  usage.calls++;
  usage.input += result.usage?.prompt_tokens ?? 0;
  usage.output += result.usage?.completion_tokens ?? 0;
  const content = result.choices[0]?.message.content;
  if (!content) throw new Error("GPT-4o returned no content");
  return traditionalizeDeep(
    JSON.parse(content.replace(/```(?:json)?|```/g, "").trim()),
  ) as Record<string, unknown>;
}

/** Fill a bucket to `count` valid, non-duplicate questions (max 4 attempts). */
async function fillBucket(
  bucket: Bucket,
  seenQuestions: Set<string>,
): Promise<RawGeneratedQuestion[]> {
  const collected: RawGeneratedQuestion[] = [];
  for (let attempt = 1; attempt <= 4 && collected.length < bucket.count; attempt++) {
    const need = bucket.count - collected.length;
    const generated = await generatePart5(bucket.pattern, need);
    for (const q of generated) {
      if (collected.length >= bucket.count) break;
      const key = q.question.trim().toLowerCase();
      if (q.skill_tag !== "preposition" || seenQuestions.has(key)) continue;
      seenQuestions.add(key);
      collected.push(q);
    }
    if (collected.length < bucket.count) {
      console.log(`  [${bucket.name}] ${collected.length}/${bucket.count} after attempt ${attempt}`);
    }
  }
  if (collected.length < bucket.count) {
    throw new Error(`bucket ${bucket.name}: only ${collected.length}/${bucket.count} valid questions`);
  }
  return collected;
}

type Verdict = { index: number; ok: boolean; issue?: string };

async function reviewItems(
  client: OpenAI,
  items: RawGeneratedQuestion[],
  usage: Usage,
): Promise<Verdict[]> {
  const payload = items.map((q, index) => ({
    index,
    question: q.question,
    choices: q.choices,
    answer: q.answer,
    difficulty: q.difficulty,
  }));
  const response = await gptJson(
    client,
    "You are a strict independent TOEIC Part 5 reviewer specializing in preposition items. " +
      "For EVERY item return a verdict. Mark ok=false when: (1) any OTHER choice is also " +
      "grammatical AND idiomatic in the sentence (two defensible answers — e.g. by/until or " +
      "in/at ambiguity without a forcing cue), (2) the keyed answer is not the best choice, " +
      "(3) the sentence is unnatural or not business-register, (4) the choices are not " +
      "prepositions: blanking a single preposition OR a multi-word prepositional phrase " +
      "(in compliance with / on behalf of / with regard to) both COUNT as testing prepositions " +
      "and are acceptable; reject only when the choices test another word class such as " +
      "adjectives or verbs, (5) a C1 item does not test a formal fixed collocation. " +
      'Return JSON only: {"verdicts":[{"index":0,"ok":true,"issue":""}, ...]}.',
    JSON.stringify(payload),
    usage,
  );
  const verdicts = (response.verdicts as Verdict[]) ?? [];
  if (!Array.isArray(verdicts) || verdicts.length !== items.length) {
    throw new Error(`reviewer returned ${verdicts.length ?? 0} verdicts for ${items.length} items`);
  }
  return verdicts;
}

/** Swap choice texts so the keyed answer sits at `target`. */
function relocateAnswer(q: RawGeneratedQuestion, target: Choice): boolean {
  if (q.answer === target) return false;
  const correctText = q.choices[q.answer];
  const displacedText = q.choices[target];
  if (!correctText || !displacedText) throw new Error(`[${q.id}] incomplete choices`);
  q.choices[q.answer] = displacedText;
  q.choices[target] = correctText;
  q.answer = target;
  return true;
}

async function rewriteMovedExplanations(
  moved: RawGeneratedQuestion[],
): Promise<void> {
  if (moved.length === 0) return;
  const response = await deepseek(
    "You are a TOEIC tutor. Answer letters and choice positions supplied by the user are final. " +
      "Return only accurate Traditional Chinese explanations for those final choices.",
    `Write one explanation per item in order as JSON {"explanations":["..."]}. State the assigned ` +
      `answer letter and the preposition/collocation it completes, and briefly reject the distractors.\n` +
      JSON.stringify(moved.map((q) => ({
        question: q.question,
        choices: q.choices,
        answer: q.answer,
      }))),
    0.3,
  );
  const parsed = traditionalizeDeep(
    JSON.parse(response.content.replace(/```(?:json)?|```/g, "").trim()),
  ) as { explanations?: unknown[] };
  const explanations = parsed.explanations ?? [];
  if (!Array.isArray(explanations) || explanations.length !== moved.length) {
    throw new Error("could not rewrite explanations after answer relocation");
  }
  moved.forEach((q, index) => {
    if (typeof explanations[index] !== "string" || (explanations[index] as string).length < 20) {
      throw new Error(`invalid rewritten explanation for ${q.id}`);
    }
    q.explanation_zh = explanations[index] as string;
  });
}

function nextPrIds(count: number): string[] {
  const raw = fs.readFileSync(PART5_DATA_PATH, "utf-8");
  const numbers = [...raw.matchAll(/"id":\s*"p5-pr-(\d+)"/g)].map((m) => Number.parseInt(m[1], 10));
  const fromBank = QUESTIONS.reduce((max, q) => {
    const match = q.id.match(/^p5-pr-(\d+)$/);
    return match ? Math.max(max, Number.parseInt(match[1], 10)) : max;
  }, 0);
  const start = Math.max(fromBank, ...numbers, 0) + 1;
  return Array.from({ length: count }, (_, i) => `p5-pr-${String(start + i).padStart(3, "0")}`);
}

function toOrderedEntry(q: RawGeneratedQuestion): string {
  const ordered = {
    id: q.id,
    part: q.part,
    question: q.question,
    choices: { A: q.choices.A, B: q.choices.B, C: q.choices.C, D: q.choices.D },
    answer: q.answer,
    explanation_zh: q.explanation_zh,
    skill_tag: q.skill_tag,
    difficulty: q.difficulty,
    vocabulary: q.vocabulary,
  };
  return JSON.stringify(ordered, null, 2)
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}

function appendToPart5File(questions: RawGeneratedQuestion[]): void {
  const raw = fs.readFileSync(PART5_DATA_PATH, "utf-8");
  const closeIdx = raw.lastIndexOf("\n];");
  if (closeIdx < 0) throw new Error("cannot find QUESTIONS_PART5 array close");
  const before = raw.slice(0, closeIdx);
  if (!before.trimEnd().endsWith(",")) {
    throw new Error("unexpected questions-part5.ts format: no trailing comma before ];");
  }
  const entries = questions.map(toOrderedEntry).join(",\n") + ",";
  fs.writeFileSync(PART5_DATA_PATH, `${before}\n${entries}${raw.slice(closeIdx)}`, "utf-8");
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  for (const key of ["DEEPSEEK_API_KEY", "OPENROUTER_API_KEY"]) {
    if (!process.env[key]) throw new Error(`${key} is required`);
  }
  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
  });
  const gptUsage: Usage = { calls: 0, input: 0, output: 0 };
  const buckets = buildBuckets();
  const seenQuestions = new Set<string>(
    QUESTIONS.filter((q) => q.part === "Part 5").map((q) => q.question.trim().toLowerCase()),
  );

  // 1. Generate per bucket
  const pool: { bucket: Bucket; question: RawGeneratedQuestion }[] = [];
  for (const bucket of buckets) {
    console.log(`── Generating ${bucket.count} × ${bucket.name} (${bucket.pattern.difficulty})`);
    const questions = await fillBucket(bucket, seenQuestions);
    pool.push(...questions.map((question) => ({ bucket, question })));
  }

  // 2. Independent review with per-item regeneration (max 5 rounds). The
  //    reviewer's rejection reason is fed back into the regeneration prompt
  //    so the replacement does not repeat the same defect.
  const MAX_REVIEW_ROUNDS = 5;
  for (let round = 1; round <= MAX_REVIEW_ROUNDS; round++) {
    const items = pool.map((entry) => entry.question);
    const verdicts = await reviewItems(client, items, gptUsage);
    const rejected = verdicts.filter((v) => !v.ok);
    console.log(`Review round ${round}: ${items.length - rejected.length}/${items.length} accepted`);
    if (rejected.length === 0) break;
    for (const verdict of rejected) {
      console.log(`  ✗ [${pool[verdict.index].bucket.name}] ${items[verdict.index].question.slice(0, 60)}… — ${verdict.issue}`);
    }
    if (round === MAX_REVIEW_ROUNDS) {
      throw new Error(`${rejected.length} items still rejected after ${MAX_REVIEW_ROUNDS} review rounds`);
    }
    for (const verdict of rejected) {
      const slot = pool[verdict.index];
      const feedbackPattern: Pattern = {
        ...slot.bucket.pattern,
        generation_instruction:
          slot.bucket.pattern.generation_instruction +
          ` A previous attempt was rejected by the reviewer because: "${verdict.issue}". Do not repeat that defect.`,
      };
      const replacement = await fillBucket(
        { ...slot.bucket, count: 1, pattern: feedbackPattern },
        seenQuestions,
      );
      slot.question = replacement[0];
    }
  }

  // 3. Balance answers A/B/C/D = 5 each, rewrite explanations for moved items
  const finalQuestions = pool.map((entry) => entry.question);
  finalQuestions.forEach((q, index) => {
    q.id = `pending-${index}`;
  });
  const moved = finalQuestions.filter((q, index) =>
    relocateAnswer(q, ANSWER_PLAN[index % ANSWER_PLAN.length]),
  );
  console.log(`Relocated ${moved.length} answers onto the A/B/C/D plan; rewriting their explanations`);
  await rewriteMovedExplanations(moved);

  // 4. Assign real ids + final validation
  const ids = nextPrIds(finalQuestions.length);
  finalQuestions.forEach((q, index) => {
    q.id = ids[index];
  });
  const errors = finalQuestions.flatMap((q, index) => validateQuestion(q, index).errors);
  if (errors.length > 0) throw new Error(`final validation failed:\n${errors.join("\n")}`);

  const distribution = finalQuestions.reduce<Record<string, number>>((acc, q) => {
    acc[q.answer] = (acc[q.answer] ?? 0) + 1;
    return acc;
  }, {});
  console.log(`Answers: ${JSON.stringify(distribution)}`);
  console.log(`Difficulties: ${JSON.stringify(finalQuestions.reduce<Record<string, number>>((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] ?? 0) + 1;
    return acc;
  }, {}))}`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const backup = path.join(OUTPUT_DIR, `p5-prepositions-${ids[0]}-${ids[ids.length - 1]}.json`);
  fs.writeFileSync(backup, JSON.stringify(finalQuestions, null, 2));
  console.log(`Backup written: ${backup}`);

  if (dryRun) {
    console.log("[dry-run] Not writing data/questions-part5.ts");
  } else {
    appendToPart5File(finalQuestions);
    console.log(`Appended ${finalQuestions.length} questions (${ids[0]}..${ids[ids.length - 1]}) to data/questions-part5.ts`);
  }

  const reviewUsage = getLlmUsage();
  let llmCost = (gptUsage.input / 1_000_000) * 2.5 + (gptUsage.output / 1_000_000) * 10;
  for (const [model, usage] of Object.entries(reviewUsage)) {
    const cost = (usage.promptTokens / 1_000_000) * 0.14 + (usage.completionTokens / 1_000_000) * 0.28;
    llmCost += cost;
    console.log(`${model}: ${usage.calls} calls, ${usage.promptTokens} in + ${usage.completionTokens} out`);
  }
  console.log(`GPT-4o reviewer: ${gptUsage.calls} calls, ${gptUsage.input} in + ${gptUsage.output} out`);
  console.log(`Total LLM cost: ~$${llmCost.toFixed(4)} USD`);
}

main().catch((error) => {
  console.error("FATAL:", (error as Error).message);
  process.exit(1);
});
