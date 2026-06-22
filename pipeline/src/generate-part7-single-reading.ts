#!/usr/bin/env npx tsx
/**
 * Generate official-ratio TOEIC Part 7 single-passage groups.
 *
 * For one Reading Test equivalent, Part 7 has 29 single-passage questions in
 * 10 groups: 3 groups of 2, 5 groups of 3, and 2 groups of 4. Scaled to
 * 300 Reading questions, run --questions 29 three times or --questions 87 once.
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { QUESTIONS } from "../../data/questions";
import type { Choice } from "../../types/question";
import { deepseek, getLlmUsage } from "./llm-client";
import { generatePart7 } from "./generator-part7";
import { saveToJson } from "./questions-writer";
import type { Pattern, PatternLibrary, RawGeneratedQuestion } from "./types";
import { validateQuestion, validateQuestionGroup } from "./validator";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_STEM = "reading-p7-single";

type Part7Question = RawGeneratedQuestion & {
  passage_group_id?: string;
  passage_group_type?: "single" | "double" | "triple";
  question_order?: number;
};

function parseQuestionsArg(argv: string[]): number {
  const raw = argv[argv.indexOf("--questions") + 1] ?? "87";
  const questions = Number.parseInt(raw, 10);
  if (!Number.isInteger(questions) || questions < 1) {
    throw new Error("--questions must be a positive integer");
  }
  if (questions !== 29 && questions !== 87) {
    throw new Error("This script is calibrated for --questions 29 or --questions 87");
  }
  return questions;
}

function readSinglePatterns(): Pattern[] {
  const file = path.resolve(__dirname, "../patterns/part7-patterns.json");
  const library = JSON.parse(fs.readFileSync(file, "utf8")) as PatternLibrary;
  return library.patterns.filter((pattern) => pattern.document_type === "single-passage");
}

function officialGroupSizes(questions: number): number[] {
  const oneTest = [2, 3, 3, 4, 2, 3, 3, 4, 2, 3];
  return questions === 29 ? oneTest : [...oneTest, ...oneTest, ...oneTest];
}

function withQuestionCount(pattern: Pattern, count: number): Pattern {
  const questionMix: Pattern["question_mix"] =
    count === 2
      ? { reading_main_idea: 1, reading_detail: 1 }
      : count === 3
        ? { reading_main_idea: 1, reading_detail: 1, reading_inference: 1 }
        : { reading_main_idea: 1, reading_detail: 2, reading_inference: 1 };
  return {
    ...pattern,
    question_mix: questionMix,
    generation_instruction:
      `${pattern.generation_instruction} Generate exactly ${count} questions for this single passage. Do not add extra questions.`,
  };
}

function nextQuestionNumber(): number {
  const prefix = "p7-gen-";
  return QUESTIONS.reduce((max, question) => {
    if (!question.id.startsWith(prefix)) return max;
    const numeric = Number.parseInt(question.id.slice(prefix.length), 10);
    return Number.isNaN(numeric) ? max : Math.max(max, numeric);
  }, 0) + 1;
}

function nextGroupNumber(): number {
  const prefix = "p7-exp-";
  return QUESTIONS.reduce((max, question) => {
    if (!question.passage_group_id?.startsWith(prefix)) return max;
    const numeric = Number.parseInt(question.passage_group_id.slice(prefix.length), 10);
    return Number.isNaN(numeric) ? max : Math.max(max, numeric);
  }, 0) + 1;
}

function assignIdsAndGroups(groups: Part7Question[][]): void {
  let nextQuestion = nextQuestionNumber();
  let nextGroup = nextGroupNumber();
  for (const group of groups) {
    const groupId = `p7-exp-${String(nextGroup++).padStart(3, "0")}`;
    group.forEach((question, index) => {
      question.id = `p7-gen-${String(nextQuestion++).padStart(3, "0")}`;
      question.part = "Part 7";
      question.passage_group_id = groupId;
      question.passage_group_type = "single";
      question.question_order = index + 1;
    });
  }
}

function answerPlan(size: number, groupIndex: number): Choice[] {
  const plans: Record<number, Choice[][]> = {
    2: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
    3: [["A", "B", "C"], ["B", "C", "D"], ["C", "D", "A"], ["D", "A", "B"]],
    4: [["A", "B", "C", "D"], ["B", "C", "D", "A"], ["C", "D", "A", "B"], ["D", "A", "B", "C"]],
  };
  return plans[size][groupIndex % plans[size].length];
}

async function conformAnswerPlan(
  questions: Part7Question[],
  expectedAnswers: Choice[],
): Promise<boolean> {
  let changed = false;
  questions.forEach((question, index) => {
    const desired = expectedAnswers[index] as keyof typeof question.choices;
    const current = question.answer as keyof typeof question.choices;
    if (desired === current) return;
    const correctText = question.choices[current]!;
    question.choices[current] = question.choices[desired]!;
    question.choices[desired] = correctText;
    question.answer = desired;
    changed = true;
  });
  if (!changed) return true;

  const response = await deepseek(
    "You are a TOEIC tutor. The supplied Part 7 passage, option positions, and answer keys are final and correct. Write one accurate Traditional Chinese explanation per question. Each explanation must state the assigned answer letter, cite passage evidence, and reject distractors. Return only a JSON array of strings in question order.",
    JSON.stringify({
      passage: questions[0]?.passage,
      questions: questions.map((question) => ({
        question: question.question,
        choices: question.choices,
        answer: question.answer,
      })),
    }),
    0.2,
  );
  try {
    const explanations = JSON.parse(
      response.content.replace(/```(?:json)?|```/g, "").trim(),
    ) as unknown;
    if (
      !Array.isArray(explanations) ||
      explanations.length !== questions.length ||
      explanations.some((item) => typeof item !== "string" || item.length < 20)
    ) return false;
    questions.forEach((question, index) => {
      question.explanation_zh = explanations[index] as string;
    });
    return true;
  } catch {
    return false;
  }
}

async function reviewGroup(
  questions: Part7Question[],
): Promise<{ pass: boolean; reason: string }> {
  const response = await deepseek(
    "You are an independent TOEIC Part 7 single-passage reviewer. Reject if a keyed answer lacks explicit evidence or a conservative inference, if another option is defensible, if the passage is unnatural, or if questions require outside knowledge. Return only JSON: {\"pass\":true|false,\"reason\":\"brief reason\"}.",
    JSON.stringify({
      passage: questions[0]?.passage,
      questions: questions.map((question) => ({
        question: question.question,
        choices: question.choices,
        answer: question.answer,
      })),
    }),
    0.1,
  );
  try {
    const parsed = JSON.parse(response.content.replace(/```(?:json)?|```/g, "").trim()) as {
      pass?: boolean;
      reason?: string;
    };
    return { pass: parsed.pass === true, reason: parsed.reason ?? "No reason supplied" };
  } catch {
    return { pass: false, reason: "Reviewer returned invalid JSON" };
  }
}

function validateGroup(questions: Part7Question[], expectedSize: number): string[] {
  const errors: string[] = [];
  if (questions.length !== expectedSize) errors.push(`expected ${expectedSize}, got ${questions.length}`);
  questions.forEach((question, index) => {
    errors.push(...validateQuestion(question, index).errors);
  });
  errors.push(...validateQuestionGroup(questions).errors);
  const passage = questions[0]?.passage ?? "";
  if (!passage.trim()) errors.push("missing passage");
  if (questions.some((question) => question.passage !== passage)) {
    errors.push("questions do not share the same passage");
  }
  if (/\*\*|```|^#{1,6}\s/m.test(passage)) {
    errors.push("passage includes markup");
  }
  return errors;
}

function printCost(): void {
  let cost = 0;
  for (const [model, usage] of Object.entries(getLlmUsage())) {
    const modelCost = (usage.promptTokens / 1_000_000) * 0.14 +
      (usage.completionTokens / 1_000_000) * 0.28;
    cost += modelCost;
    console.log(
      `Usage ${model}: ${usage.calls} calls, ${usage.promptTokens} input + ${usage.completionTokens} output tokens, <= $${modelCost.toFixed(4)}`,
    );
  }
  console.log(`Estimated text-generation batch cost: $${cost.toFixed(4)} USD`);
}

async function main(): Promise<void> {
  if (process.argv.includes("--help")) {
    console.log("Usage: npx tsx src/generate-part7-single-reading.ts --questions 29|87");
    return;
  }
  const requested = parseQuestionsArg(process.argv.slice(2));
  const sizes = officialGroupSizes(requested);
  if (sizes.reduce((sum, size) => sum + size, 0) !== requested) {
    throw new Error("Internal Part 7 single-passage distribution does not sum to request");
  }

  const patterns = readSinglePatterns();
  const acceptedGroups: Part7Question[][] = [];

  for (let groupIndex = 0; groupIndex < sizes.length; groupIndex++) {
    const size = sizes[groupIndex];
    const pattern = withQuestionCount(patterns[groupIndex % patterns.length], size);
    let accepted: Part7Question[] = [];
    for (let attempt = 1; attempt <= 6; attempt++) {
      let generated: Part7Question[];
      try {
        generated = (await generatePart7(pattern, { skipKimi: true })) as Part7Question[];
      } catch (error) {
        console.warn(`Part 7 single group ${groupIndex + 1} attempt ${attempt}: ${(error as Error).message.slice(0, 160)}`);
        continue;
      }
      const errors = validateGroup(generated, size);
      if (errors.length > 0) {
        console.warn(`Part 7 single group ${groupIndex + 1} attempt ${attempt} structural reject: ${errors.join("; ").slice(0, 220)}`);
        continue;
      }
      if (!await conformAnswerPlan(generated, answerPlan(size, groupIndex))) {
        console.warn(`Part 7 single group ${groupIndex + 1} attempt ${attempt}: could not rewrite explanations`);
        continue;
      }
      const review = await reviewGroup(generated);
      console.log(`Part 7 single group ${groupIndex + 1}/${sizes.length} attempt ${attempt}: reviewer ${review.pass ? "pass" : "reject"} - ${review.reason}`);
      if (!review.pass) continue;
      accepted = generated;
      break;
    }
    if (accepted.length !== size) {
      throw new Error(`Could not generate valid Part 7 single group ${groupIndex + 1}`);
    }
    acceptedGroups.push(accepted);
  }

  assignIdsAndGroups(acceptedGroups);
  const questions = acceptedGroups.flat();
  const duplicateIds = new Set(QUESTIONS.map((question) => question.id));
  const duplicate = questions.find((question) => duplicateIds.has(question.id));
  if (duplicate) throw new Error(`Duplicate ID: ${duplicate.id}`);

  const file = `${OUTPUT_STEM}-${Date.now()}.json`;
  saveToJson(questions as unknown as Record<string, unknown>[], file);
  console.log(`Validated ${questions.length} Part 7 single-passage questions -> output/${file}`);
  printCost();
}

main().catch((error) => {
  console.error((error as Error).message);
  process.exit(1);
});
