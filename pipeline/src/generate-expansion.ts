#!/usr/bin/env npx tsx
/**
 * Generate validated TOEIC expansion batches without mutating application data.
 *
 * Generation:
 *   npx tsx src/generate-expansion.ts --part 6 --questions 100
 * Promotion after review:
 *   npx tsx src/generate-expansion.ts --promote output/expansion-p6-....json
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { QUESTIONS } from "../../data/questions";
import { generatePart1 } from "./generator-part1";
import { generatePart5 } from "./generator-part5";
import { generatePart6 } from "./generator-part6";
import { generatePart7 } from "./generator-part7";
import { deepseek, getLlmUsage, parseGeneratedJson } from "./llm-client";
import { saveToJson } from "./questions-writer";
import type { Pattern, PatternLibrary, RawGeneratedQuestion } from "./types";
import { validateQuestion, validateQuestionGroup } from "./validator";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GENERATED_DATA_PATH = path.resolve(__dirname, "../../data/questions-generated.ts");

type SupportedPart = "1" | "3" | "4" | "5" | "6" | "7";
type ExpansionQuestion = RawGeneratedQuestion & {
  passage_group_id?: string;
  passage_group_type?: "single" | "double" | "triple";
  question_order?: number;
};

type Args =
  | { promote: string }
  | { part: SupportedPart; questions: number };

function parseArgs(argv: string[]): Args {
  const promoteIndex = argv.indexOf("--promote");
  if (promoteIndex >= 0) {
    const file = argv[promoteIndex + 1];
    if (!file) throw new Error("--promote requires a JSON path");
    return { promote: file };
  }
  const part = argv[argv.indexOf("--part") + 1] as SupportedPart | undefined;
  const rawCount = argv[argv.indexOf("--questions") + 1];
  const questions = Number.parseInt(rawCount ?? "", 10);
  if (!part || !["1", "3", "4", "5", "6", "7"].includes(part)) {
    throw new Error("--part must be one of: 1, 3, 4, 5, 6, 7");
  }
  if (!Number.isInteger(questions) || questions < 1) {
    throw new Error("--questions must be a positive integer");
  }
  if ((part === "3" || part === "4") && questions % 3 !== 0) {
    throw new Error("Part 3 and Part 4 question counts must be divisible by 3");
  }
  if (part === "6" && questions % 4 !== 0) {
    throw new Error("Part 6 question counts must be divisible by 4");
  }
  if (part === "7" && questions % 5 !== 0) {
    throw new Error("This expansion uses five-question multi-passage Part 7 groups");
  }
  return { part, questions };
}

function readPatterns(part: "5" | "6" | "7"): Pattern[] {
  const file = path.resolve(__dirname, `../patterns/part${part}-patterns.json`);
  const library = JSON.parse(fs.readFileSync(file, "utf8")) as PatternLibrary;
  return library.patterns;
}

function nextQuestionNumber(part: SupportedPart): number {
  const prefix = `p${part}-gen-`;
  return QUESTIONS.reduce((max, question) => {
    if (!question.id.startsWith(prefix)) return max;
    const numeric = Number.parseInt(question.id.slice(prefix.length), 10);
    return Number.isNaN(numeric) ? max : Math.max(max, numeric);
  }, 0) + 1;
}

function assignIds(questions: ExpansionQuestion[], part: SupportedPart): void {
  let next = nextQuestionNumber(part);
  for (const question of questions) {
    question.id = `p${part}-gen-${String(next++).padStart(3, "0")}`;
  }
}

function nextGroupNumber(prefix: string): number {
  return QUESTIONS.reduce((max, question) => {
    if (question.passage_group_id?.startsWith(prefix)) {
      const numeric = Number.parseInt(question.passage_group_id.slice(prefix.length), 10);
      if (!Number.isNaN(numeric)) return Math.max(max, numeric);
    }
    return max;
  }, 0) + 1;
}

function setPassageGroups(questions: ExpansionQuestion[], part: "6" | "7"): void {
  let p6Index = nextGroupNumber("p6-");
  let p7Index = nextGroupNumber("p7-exp-");
  const byPassage = new Map<string, ExpansionQuestion[]>();
  for (const question of questions) {
    const list = byPassage.get(question.passage ?? "") ?? [];
    list.push(question);
    byPassage.set(question.passage ?? "", list);
  }
  for (const group of byPassage.values()) {
    const type = part === "7" ? group[0].passage_group_type ?? "double" : undefined;
    const id =
      part === "6"
        ? `p6-${String(p6Index++).padStart(3, "0")}`
        : `p7-exp-${String(p7Index++).padStart(3, "0")}`;
    group.forEach((question, index) => {
      question.passage_group_id = id;
      if (type) question.passage_group_type = type;
      question.question_order = index + 1;
    });
  }
}

const LISTENING_PROMPTS = {
  "3": `You write original TOEIC Listening Part 3 conversations. Produce exactly three multiple-choice questions for one conversation. The conversation must be an everyday workplace or service interaction of 90-135 words, formatted as alternating lines labeled "W:" and "M:" (or W1/M1/M2 only when necessary). Include a purpose/detail question, an inference or problem question, and a next-action question. Keep distractors plausible but contradicted or unsupported. No copyrighted or recalled test material. Use Traditional Chinese explanations.`,
  "4": `You write original TOEIC Listening Part 4 talks. Produce exactly three multiple-choice questions for one monologue. The transcript must be a realistic announcement, recorded message, advertisement, tour introduction, or broadcast of 95-145 words. Include a purpose/main-idea question, one factual detail question, and an inference or next-action question. Keep distractors plausible but unsupported. No copyrighted or recalled test material. Use Traditional Chinese explanations.`,
} as const;

async function generateListeningGroup(part: "3" | "4", index: number): Promise<ExpansionQuestion[]> {
  const section: "Part 3" | "Part 4" = part === "3" ? "Part 3" : "Part 4";
  const schema = `Output ONLY a JSON array of 3 objects with this schema:
{
  "id": "temporary",
  "part": "${section}",
  "transcript": "<identical full transcript on all three objects>",
  "question": "<spoken test question>",
  "choices": {"A":"...", "B":"...", "C":"...", "D":"..."},
  "answer": "A" | "B" | "C" | "D",
  "explanation_zh": "<Traditional Chinese explanation identifying transcript evidence and distractor flaws>",
  "skill_tag": "listening_main_idea" | "listening_inference" | "listening_next_action",
  "difficulty": "A2" | "B1" | "B2",
  "vocabulary": ["<3-6 useful business words>"]
}
All three objects must repeat the identical transcript. The three correct answers MUST use three different letters; never key two questions to the same answer letter within one group.`;
  const topic = [
    "scheduling or rescheduling a service",
    "a delivery, inventory, or order issue",
    "a workplace facility or equipment update",
    "a conference, training, or travel arrangement",
    "a customer request and staff response",
  ][index % 5];
  const answerPlans = [
    ["A", "B", "C"],
    ["B", "C", "D"],
    ["C", "D", "A"],
    ["D", "A", "B"],
  ];
  const requiredAnswers = answerPlans[index % answerPlans.length].join(", ");
  const response = await deepseek(
    LISTENING_PROMPTS[part],
    `${schema}\nScenario focus: ${topic}. For the three questions in output order, the correct answer letters MUST be exactly: ${requiredAnswers}. Write choices and explanations consistently with those required keys. Create group ${index + 1} now.`,
    0.75,
  );
  const parsed = parseGeneratedJson(response.content);
  return parsed.map((item) => {
    const question = item as ExpansionQuestion;
    question.part = section;
    return question;
  });
}

async function reviewPart6Group(
  group: ExpansionQuestion[],
): Promise<{ pass: boolean; reason: string }> {
  const reviewInput = group.map((question) => ({
    passage: question.passage,
    blank: question.question,
    choices: question.choices,
    answer: question.answer,
  }));
  const response = await deepseek(
    "You are an independent TOEIC Part 6 quality reviewer. Reject a group if any keyed answer is grammatically wrong, logically weaker than another option, if a transition does not match the relation between its sentences, or if the passage is unnatural. Return only JSON: {\"pass\":true|false,\"reason\":\"brief reason\"}. Be strict.",
    JSON.stringify(reviewInput),
    0.1,
  );
  const cleaned = response.content.replace(/```(?:json)?|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned) as { pass?: boolean; reason?: string };
    return {
      pass: parsed.pass === true,
      reason: parsed.reason ?? "Reviewer supplied no reason",
    };
  } catch {
    return { pass: false, reason: "Reviewer returned invalid JSON" };
  }
}

async function conformPart6AnswerPlan(
  questions: ExpansionQuestion[],
  expectedAnswers: RawGeneratedQuestion["answer"][],
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
    "You are a TOEIC tutor. The supplied Part 6 passage, option positions, and answer keys are final and correct. Write one accurate Traditional Chinese explanation per blank. Each explanation must state its assigned answer letter, explain why it fits the surrounding sentence and passage, and reject the other choices. Return only a JSON array of four strings in blank order.",
    JSON.stringify({
      passage: questions[0]?.passage,
      questions: questions.map((question) => ({
        blank: question.question,
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

async function reviewPart5Set(
  questions: ExpansionQuestion[],
): Promise<{ pass: boolean; reason: string }> {
  const response = await deepseek(
    "You are an independent TOEIC Part 5 quality reviewer. Reject this set if any keyed option is not the unique grammatically and contextually correct completion, if a distractor is also correct, or if the sentence is unnatural for workplace English. Return only JSON: {\"pass\":true|false,\"reason\":\"brief reason\"}. Be strict.",
    JSON.stringify(
      questions.map((question) => ({
        question: question.question,
        choices: question.choices,
        answer: question.answer,
      })),
    ),
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

async function conformPart5AnswerPlan(
  questions: ExpansionQuestion[],
  expectedAnswers: string[],
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
    "You are a TOEIC tutor. The option positions and answer keys in the supplied Part 5 questions are final and correct. Write one accurate Traditional Chinese explanation per question; state the assigned answer letter, explain the grammar or collocation, and reject the other choices. Return only a JSON array of strings in question order.",
    JSON.stringify(
      questions.map((question) => ({
        question: question.question,
        choices: question.choices,
        answer: question.answer,
      })),
    ),
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

async function conformPart1AnswerPlan(
  questions: ExpansionQuestion[],
  expectedAnswers: string[],
): Promise<boolean> {
  let changed = false;
  questions.forEach((question, index) => {
    const desired = expectedAnswers[index] as keyof typeof question.choices;
    const current = question.answer as keyof typeof question.choices;
    if (desired !== current) {
      const correctText = question.choices[current]!;
      question.choices[current] = question.choices[desired]!;
      question.choices[desired] = correctText;
      question.answer = desired;
      changed = true;
    }
    question.audioScript = (["A", "B", "C", "D"] as const)
      .map((letter) => `(${letter}) ${question.choices[letter]}`)
      .join("\n");
  });
  if (!changed) return true;
  const response = await deepseek(
    "You are a TOEIC tutor. For each Part 1 item, the photo description, spoken statements, and assigned answer key are final and correct. Write an accurate Traditional Chinese explanation stating the assigned letter, why it visibly matches the photo, and why each distractor does not. Return only a JSON array of strings in question order.",
    JSON.stringify(
      questions.map((question) => ({
        imageAlt: question.imageAlt,
        choices: question.choices,
        answer: question.answer,
      })),
    ),
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

async function reviewPart1Set(
  questions: ExpansionQuestion[],
): Promise<{ pass: boolean; reason: string }> {
  const response = await deepseek(
    "You are an independent TOEIC Part 1 photograph-question reviewer. Reject the set if an image description is ambiguous or difficult to render, if the keyed statement is not visibly established by that image description, or if a distractor could also describe the same photograph. Return only JSON: {\"pass\":true|false,\"reason\":\"brief reason\"}. Be strict.",
    JSON.stringify(
      questions.map((question) => ({
        imageAlt: question.imageAlt,
        choices: question.choices,
        answer: question.answer,
      })),
    ),
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

async function conformPart7AnswerPlan(
  questions: ExpansionQuestion[],
  expectedAnswers: string[],
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
    "You are a TOEIC tutor. The supplied Part 7 passages, questions, choices, and answer keys are final and correct. Write one accurate Traditional Chinese explanation per question. Each explanation must state the assigned answer letter, cite specific evidence from the passage or linked documents, and reject the distractors. Return only a JSON array of strings in question order.",
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

async function reviewPart7Group(
  questions: ExpansionQuestion[],
): Promise<{ pass: boolean; reason: string }> {
  const response = await deepseek(
    "You are an independent TOEIC Part 7 quality reviewer. Check the linked documents and all five questions. Reject if a keyed answer lacks explicit evidence or a conservative inference, if another option is defensible, if facts or dates contradict across documents unintentionally, or if the texts are not natural business English. Return only JSON: {\"pass\":true|false,\"reason\":\"brief reason\"}. Be strict.",
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

async function reviewListeningGroup(
  part: "3" | "4",
  group: ExpansionQuestion[],
): Promise<{ pass: boolean; reason: string }> {
  const reviewInput = {
    part: `Part ${part}`,
    transcript: group[0]?.transcript,
    questions: group.map((question) => ({
      question: question.question,
      choices: question.choices,
      answer: question.answer,
    })),
  };
  const response = await deepseek(
    "You are an independent TOEIC listening quality reviewer. Check that the transcript sounds natural, each keyed answer is directly supported or a conservative inference, and no distractor is also defensible. Reject over-strong inferences. Return only JSON: {\"pass\":true|false,\"reason\":\"brief reason\"}. Be strict.",
    JSON.stringify(reviewInput),
    0.1,
  );
  const cleaned = response.content.replace(/```(?:json)?|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned) as { pass?: boolean; reason?: string };
    return {
      pass: parsed.pass === true,
      reason: parsed.reason ?? "Reviewer supplied no reason",
    };
  } catch {
    return { pass: false, reason: "Reviewer returned invalid JSON" };
  }
}

async function conformListeningAnswerPlan(
  group: ExpansionQuestion[],
  expectedAnswers: string[],
): Promise<boolean> {
  let changed = false;
  group.forEach((question, index) => {
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
    "You are a TOEIC tutor. The answer keys and option positions in the supplied listening questions are final and correct. Write one accurate Traditional Chinese explanation for each question. Each explanation must cite transcript evidence, state the assigned answer letter, and briefly reject the distractors. Return only a JSON array of three strings in question order.",
    JSON.stringify({
      transcript: group[0]?.transcript,
      questions: group.map((question) => ({
        question: question.question,
        choices: question.choices,
        answer: question.answer,
      })),
    }),
    0.2,
  );
  try {
    const cleaned = response.content.replace(/```(?:json)?|```/g, "").trim();
    const explanations = JSON.parse(cleaned) as unknown;
    if (
      !Array.isArray(explanations) ||
      explanations.length !== group.length ||
      explanations.some((item) => typeof item !== "string" || item.length < 20)
    ) {
      return false;
    }
    group.forEach((question, index) => {
      question.explanation_zh = explanations[index] as string;
    });
    return true;
  } catch {
    return false;
  }
}

async function generateBatch(part: SupportedPart, count: number): Promise<ExpansionQuestion[]> {
  const result: ExpansionQuestion[] = [];
  if (part === "1") {
    const answerPlans = [
      ["A", "B", "C", "D", "A"],
      ["B", "C", "D", "A", "B"],
      ["C", "D", "A", "B", "C"],
      ["D", "A", "B", "C", "D"],
    ];
    for (let i = 0; i < Math.ceil(count / 5); i++) {
      const requested = Math.min(5, count - result.length);
      let accepted: ExpansionQuestion[] = [];
      for (let attempt = 1; attempt <= 5; attempt++) {
        let generated: ExpansionQuestion[];
        try {
          generated = (await generatePart1(requested)) as ExpansionQuestion[];
        } catch (error) {
          console.warn(`  Retrying Part 1 batch ${i + 1}: generation error: ${(error as Error).message.slice(0, 120)}`);
          continue;
        }
        if (generated.length !== requested) {
          console.warn(`  Retrying Part 1 batch ${i + 1}: received ${generated.length}/${requested} questions`);
          continue;
        }
        if (!await conformPart1AnswerPlan(generated, answerPlans[i % answerPlans.length].slice(0, requested))) {
          console.warn(`  Retrying Part 1 batch ${i + 1}: could not rewrite explanations for answer plan`);
          continue;
        }
        const validation = validateQuestionGroup(generated);
        if (!validation.valid) {
          console.warn(`  Retrying Part 1 batch ${i + 1}: ${validation.errors.join("; ")}`);
          continue;
        }
        const review = await reviewPart1Set(generated);
        if (!review.pass) {
          console.warn(`  Retrying Part 1 batch ${i + 1}: semantic review rejected it: ${review.reason}`);
          continue;
        }
        accepted = generated;
        break;
      }
      if (accepted.length !== requested) throw new Error(`Could not generate valid Part 1 batch ${i + 1}`);
      result.push(...accepted);
    }
  } else if (part === "3" || part === "4") {
    for (let i = 0; i < count / 3; i++) {
      let group: ExpansionQuestion[] = [];
      const answerPlans = [
        ["A", "B", "C"],
        ["B", "C", "D"],
        ["C", "D", "A"],
        ["D", "A", "B"],
      ];
      const expectedAnswerList = answerPlans[i % answerPlans.length];
      const expectedAnswers = expectedAnswerList.join("");
      for (let attempt = 1; attempt <= 8; attempt++) {
        try {
          group = await generateListeningGroup(part, i);
        } catch (error) {
          console.warn(
            `  Retrying Part ${part} group ${i + 1}: generation error: ${(error as Error).message.slice(0, 120)}`,
          );
          group = [];
          continue;
        }
        const transcript = group[0]?.transcript ?? "";
        const transcriptWords = transcript.trim().split(/\s+/).length;
        const sharedTranscript =
          group.length === 3 && group.every((question) => question.transcript === transcript);
        let distinctAnswerCount = new Set(group.map((question) => question.answer)).size;
        let answerSequence = group.map((question) => question.answer).join("");
        const requiredWords = part === "3" ? 80 : 85;
        const validation = validateQuestionGroup(group);
        const structurallyReady =
          sharedTranscript &&
          transcriptWords >= requiredWords &&
          !/\*\*|```|^#{1,6}\s/m.test(transcript) &&
          validation.valid;
        if (structurallyReady && answerSequence !== expectedAnswers) {
          const conformed = await conformListeningAnswerPlan(group, expectedAnswerList);
          if (!conformed) {
            console.warn(`  Retrying Part ${part} group ${i + 1}: could not rewrite explanations for answer plan`);
            group = [];
            continue;
          }
          distinctAnswerCount = new Set(group.map((question) => question.answer)).size;
          answerSequence = group.map((question) => question.answer).join("");
        }
        if (
          structurallyReady &&
          distinctAnswerCount === 3 &&
          answerSequence === expectedAnswers
        ) {
          const review = await reviewListeningGroup(part, group);
          if (review.pass) break;
          console.warn(
            `  Retrying Part ${part} group ${i + 1}: semantic review rejected it: ${review.reason}`,
          );
          group = [];
          continue;
        }
        console.warn(
          `  Retrying Part ${part} group ${i + 1}: ${group.length} questions, shared=${sharedTranscript}, answers=${answerSequence}/${expectedAnswers}, ${transcriptWords} words; ${validation.errors.join("; ")}`,
        );
        group = [];
      }
      if (group.length !== 3) {
        throw new Error(`Could not generate valid Part ${part} listening group ${i + 1}`);
      }
      result.push(...group);
    }
  } else if (part === "5") {
    const patterns = readPatterns("5");
    const answerPlans = [
      ["A", "B", "C", "D", "A"],
      ["B", "C", "D", "A", "B"],
      ["C", "D", "A", "B", "C"],
      ["D", "A", "B", "C", "D"],
    ];
    let batchIndex = 0;
    while (result.length < count) {
      const currentBatch = batchIndex++;
      const pattern = patterns[currentBatch % patterns.length];
      const expectedAnswers = answerPlans[currentBatch % answerPlans.length];
      const remaining = count - result.length;
      const requested = Math.min(5, remaining);
      let accepted: ExpansionQuestion[] = [];
      for (let attempt = 1; attempt <= 5; attempt++) {
        const generated = (await generatePart5(pattern, requested, {
          skipKimi: true,
        })) as ExpansionQuestion[];
        if (generated.length !== requested) {
          console.warn(`  Retrying Part 5 ${pattern.pattern_id}: received ${generated.length}/${requested} questions`);
          continue;
        }
        const malformed = generated.filter(
          (question) => {
            const blanks = question.question.match(/_+/g) ?? [];
            return blanks.length !== 1 || blanks[0] !== "_______";
          },
        );
        if (malformed.length) {
          console.warn(`  Retrying Part 5 ${pattern.pattern_id}: nonstandard blank format`);
          continue;
        }
        const conformed = await conformPart5AnswerPlan(
          generated,
          expectedAnswers.slice(0, requested),
        );
        if (!conformed) {
          console.warn(`  Retrying Part 5 ${pattern.pattern_id}: could not rewrite explanations for answer plan`);
          continue;
        }
        const review = await reviewPart5Set(generated);
        if (review.pass) {
          accepted = generated;
          break;
        }
        console.warn(`  Retrying Part 5 ${pattern.pattern_id}: semantic review rejected it: ${review.reason}`);
      }
      if (accepted.length !== requested) {
        throw new Error(`Could not generate valid Part 5 set for ${pattern.pattern_id}`);
      }
      result.push(...accepted);
    }
  } else if (part === "6") {
    // The advertisement pattern repeatedly returns sub-80-word copy, and the
    // customer_notice pattern often creates weak modal/transition keys under
    // the strict reviewer. Keep the more stable email/memo/letter templates
    // for high-volume expansion batches.
    const patterns = readPatterns("6").filter(
      (pattern) => !["advertisement", "customer_notice"].includes(pattern.subtype),
    );
    const answerPlans: Array<Array<RawGeneratedQuestion["answer"]>> = [
      ["A", "B", "C", "D"],
      ["B", "C", "D", "A"],
      ["C", "D", "A", "B"],
      ["D", "A", "B", "C"],
    ];
    for (let i = 0; i < count / 4; i++) {
      let group: ExpansionQuestion[] = [];
      const expectedAnswers = answerPlans[i % answerPlans.length];
      for (let attempt = 1; attempt <= 8; attempt++) {
        try {
          group = (await generatePart6(patterns[i % patterns.length], {
            skipKimi: true,
            expectedAnswers,
          })) as ExpansionQuestion[];
        } catch (error) {
          console.warn(
            `  Retrying Part 6 passage ${i + 1}: generation error: ${(error as Error).message.slice(0, 120)}`,
          );
          group = [];
          continue;
        }
        const blankCount = (group[0]?.passage?.match(/____\([A-D]\)____/g) ?? []).length;
        const wordCount = group[0]?.passage?.trim().split(/\s+/).length ?? 0;
        const hasMarkup = /\*\*|```|^#{1,6}\s/m.test(group[0]?.passage ?? "");
        const validation = validateQuestionGroup(group);
        if (
          group.length === 4 &&
          blankCount === 4 &&
          wordCount >= 80 &&
          !hasMarkup &&
          validation.valid
        ) {
          if (!await conformPart6AnswerPlan(group, expectedAnswers)) {
            console.warn(`  Retrying Part 6 passage ${i + 1}: could not rewrite explanations for answer plan`);
            group = [];
            continue;
          }
          const review = await reviewPart6Group(group);
          if (review.pass) break;
          console.warn(`  Retrying Part 6 passage ${i + 1}: semantic review rejected it: ${review.reason}`);
          group = [];
          continue;
        }
        console.warn(
          `  Retrying Part 6 passage ${i + 1}: received ${group.length} questions, ${blankCount} blanks, ${wordCount} words, markup=${hasMarkup}; ${validation.errors.join("; ")}`,
        );
        group = [];
      }
      if (group.length !== 4) {
        throw new Error(`Could not generate valid Part 6 passage ${i + 1} after 8 attempts`);
      }
      result.push(...group);
    }
    setPassageGroups(result, "6");
  } else {
    const doublePassagePatterns = readPatterns("7").filter(
      (pattern) => pattern.document_type === "double-passage",
    );
    const triplePassagePatterns = readPatterns("7").filter(
      (pattern) => pattern.document_type === "triple-passage",
    );
    const part7MultiPattern = (groupIndex: number): Pattern => {
      const slot = groupIndex % 5;
      if (slot === 0 || slot === 3) {
        return doublePassagePatterns[Math.floor(groupIndex / 5 + slot) % doublePassagePatterns.length];
      }
      return triplePassagePatterns[Math.floor(groupIndex / 5 + slot) % triplePassagePatterns.length];
    };
    const answerPlans = [
      ["A", "B", "C", "D", "A"],
      ["B", "C", "D", "A", "B"],
      ["C", "D", "A", "B", "C"],
      ["D", "A", "B", "C", "D"],
    ];
    for (let i = 0; i < count / 5; i++) {
      const pattern = part7MultiPattern(i);
      let accepted: ExpansionQuestion[] = [];
      for (let attempt = 1; attempt <= 5; attempt++) {
        let generated: ExpansionQuestion[];
        try {
          generated = (await generatePart7(pattern, { skipKimi: true })) as ExpansionQuestion[];
        } catch (error) {
          console.warn(`  Retrying Part 7 group ${i + 1}: generation error: ${(error as Error).message.slice(0, 120)}`);
          continue;
        }
        const passage = generated[0]?.passage;
        const sharedPassage =
          generated.length === 5 &&
          !!passage &&
          generated.every((question) => question.passage === passage);
        if (!sharedPassage) {
          console.warn(`  Retrying Part 7 group ${i + 1}: expected five questions with shared passage`);
          continue;
        }
        if (!await conformPart7AnswerPlan(generated, answerPlans[i % answerPlans.length])) {
          console.warn(`  Retrying Part 7 group ${i + 1}: could not rewrite explanations for answer plan`);
          continue;
        }
        const review = await reviewPart7Group(generated);
        if (!review.pass) {
          console.warn(`  Retrying Part 7 group ${i + 1}: semantic review rejected it: ${review.reason}`);
          continue;
        }
        accepted = generated;
        break;
      }
      if (accepted.length !== 5) {
        throw new Error(`Could not generate valid Part 7 group ${i + 1}`);
      }
      result.push(...accepted);
    }
    setPassageGroups(result, "7");
  }
  assignIds(result, part);
  return result;
}

function validateBatch(questions: ExpansionQuestion[]): void {
  if (questions.length === 0) throw new Error("Batch contains no questions");
  const errors: string[] = [];
  questions.forEach((question, index) => {
    errors.push(...validateQuestion(question, index).errors);
  });
  const grouped = new Map<string, ExpansionQuestion[]>();
  for (const question of questions) {
    const key = question.transcript ?? question.passage ?? question.id;
    const group = grouped.get(key) ?? [];
    group.push(question);
    grouped.set(key, group);
  }
  for (const group of grouped.values()) {
    errors.push(...validateQuestionGroup(group).errors);
    if (group[0].part === "Part 6") {
      const blanks = group[0].passage?.match(/____\([A-D]\)____/g) ?? [];
      const words = group[0].passage?.trim().split(/\s+/).length ?? 0;
      if (group.length !== 4 || blanks.length !== 4 || words < 80) {
        errors.push(
          `Part 6 group has ${group.length} questions, ${blanks.length} blanks, and ${words} words`,
        );
      }
      if (/\*\*|```|^#{1,6}\s/m.test(group[0].passage ?? "")) {
        errors.push("Part 6 group includes markup instead of test-paper text");
      }
    }
    if ((group[0].part === "Part 3" || group[0].part === "Part 4") && group.length !== 3) {
      errors.push(`${group[0].part} listening group has ${group.length} questions, expected 3`);
    }
    if (group[0].part === "Part 3" || group[0].part === "Part 4") {
      const minWords = group[0].part === "Part 3" ? 80 : 85;
      const transcript = group[0].transcript ?? "";
      const words = transcript.trim().split(/\s+/).length;
      if (!transcript || words < minWords || group.some((q) => q.transcript !== transcript)) {
        errors.push(`${group[0].part} transcript is missing, too short, or not shared`);
      }
      if (new Set(group.map((question) => question.answer)).size !== 3) {
        errors.push(`${group[0].part} listening group does not contain three distinct answer keys`);
      }
    }
  }
  const duplicates = new Set<string>();
  const seen = new Set(QUESTIONS.map((question) => question.id));
  for (const question of questions) {
    if (seen.has(question.id)) duplicates.add(question.id);
    seen.add(question.id);
  }
  if (duplicates.size) errors.push(`Duplicate IDs: ${[...duplicates].join(", ")}`);
  if (errors.length) {
    throw new Error(`Batch validation failed:\n${errors.join("\n")}`);
  }
}

function printEstimatedTextCost(): void {
  const usage = getLlmUsage();
  let cost = 0;
  for (const [model, tokens] of Object.entries(usage)) {
    // deepseek-chat maps to DeepSeek V4 Flash. Official pricing checked 2026-05-26:
    // https://api-docs.deepseek.com/quick_start/pricing
    const inputCost = (tokens.promptTokens / 1_000_000) * 0.14;
    const outputCost = (tokens.completionTokens / 1_000_000) * 0.28;
    const modelCost = inputCost + outputCost;
    cost += modelCost;
    console.log(
      `Usage ${model}: ${tokens.calls} calls, ${tokens.promptTokens} input + ${tokens.completionTokens} output tokens, <= $${modelCost.toFixed(4)}`,
    );
  }
  console.log(`Estimated text-generation batch cost (cache-miss ceiling): $${cost.toFixed(4)} USD`);
}

function promote(filePath: string): void {
  const resolved = path.resolve(process.cwd(), filePath);
  const parsed = JSON.parse(fs.readFileSync(resolved, "utf8")) as ExpansionQuestion[];
  validateBatch(parsed);
  const existing = fs.readFileSync(GENERATED_DATA_PATH, "utf8");
  const closeIndex = existing.lastIndexOf("\n];");
  if (closeIndex < 0) throw new Error("Cannot find GENERATED_QUESTIONS array terminator");
  const serialized = parsed.map((question) => `  ${JSON.stringify(question, null, 2)}`).join(",\n");
  const beforeClose = existing.slice(0, closeIndex);
  const trimmed = beforeClose.trimEnd();
  const separator = trimmed.endsWith("[") || trimmed.endsWith(",") ? "\n" : ",\n";
  const next =
    beforeClose + separator + serialized + existing.slice(closeIndex);
  fs.writeFileSync(GENERATED_DATA_PATH, next, "utf8");
  console.log(`Promoted ${parsed.length} validated questions from ${resolved}`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if ("promote" in args) {
    promote(args.promote);
    return;
  }
  const questions = await generateBatch(args.part, args.questions);
  if (questions.length !== args.questions) {
    throw new Error(`Generated ${questions.length}, expected exactly ${args.questions}`);
  }
  validateBatch(questions);
  const file = `expansion-p${args.part}-${Date.now()}.json`;
  saveToJson(questions as unknown as Record<string, unknown>[], file);
  console.log(`Validated ${questions.length} new Part ${args.part} questions; review before promotion.`);
  printEstimatedTextCost();
}

main().catch((error) => {
  console.error((error as Error).message);
  process.exit(1);
});
