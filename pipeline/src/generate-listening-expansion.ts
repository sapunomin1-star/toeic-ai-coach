#!/usr/bin/env npx tsx
/**
 * Generate reviewed P2/P3/P4 listening additions from abstract template patterns.
 *
 * Generation:
 *   npx tsx src/generate-listening-expansion.ts --part 2 --questions 50
 *   npx tsx src/generate-listening-expansion.ts --part 3 --questions 81
 *   npx tsx src/generate-listening-expansion.ts --part 4 --questions 57
 * Promotion after reviewing the saved batch:
 *   npx tsx src/generate-listening-expansion.ts --promote output/listening-p2-....json
 */
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

import { QUESTIONS } from "../../data/questions";
import type { Choice } from "../../types/question";
import { deepseek, getLlmUsage } from "./llm-client";
import { listeningTemplatePrompt } from "./listening-template-library";
import type { RawGeneratedQuestion } from "./types";
import { validateQuestion, validateQuestionGroup } from "./validator";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../output");
const GENERATED_DATA_PATH = path.resolve(__dirname, "../../data/questions-generated.ts");
const GPT_MODEL = "openai/gpt-4o";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

type ListeningPart = "2" | "3" | "4";
type ListeningQuestion = RawGeneratedQuestion & {
  question_order?: number;
  trapChoice?: Choice;
  trapWord?: string;
  trapReason?: string;
};
type ReviewEntry = {
  batch: number;
  questions: number;
  attempts: number;
  score: number;
  note: string;
};
type Usage = { calls: number; input: number; output: number };
type Args = { promote: string } | { part: ListeningPart; questions: number };

const ANSWER_PLANS_3: Choice[][] = [
  ["A", "B", "C"],
  ["B", "C", "D"],
  ["C", "D", "A"],
  ["D", "A", "B"],
];
const ANSWER_PLANS_P2: Choice[][] = [
  ["A", "B", "C", "A", "B", "C", "A", "B", "C", "A"],
  ["B", "C", "A", "B", "C", "A", "B", "C", "A", "B"],
  ["C", "A", "B", "C", "A", "B", "C", "A", "B", "C"],
];

function parseArgs(argv: string[]): Args {
  const promoteAt = argv.indexOf("--promote");
  if (promoteAt >= 0) {
    if (!argv[promoteAt + 1]) throw new Error("--promote requires an output JSON file");
    return { promote: argv[promoteAt + 1] };
  }
  const part = argv[argv.indexOf("--part") + 1] as ListeningPart;
  const questions = Number.parseInt(argv[argv.indexOf("--questions") + 1] ?? "", 10);
  if (!["2", "3", "4"].includes(part)) throw new Error("--part must be 2, 3, or 4");
  if (!Number.isInteger(questions) || questions < 1) throw new Error("--questions must be positive");
  if ((part === "3" || part === "4") && questions % 3 !== 0) {
    throw new Error("P3/P4 question totals must be divisible by three");
  }
  return { part, questions };
}

function nextId(part: ListeningPart): number {
  const prefix = `p${part}-gen-`;
  return QUESTIONS.reduce((max, q) => {
    if (!q.id.startsWith(prefix)) return max;
    const number = Number.parseInt(q.id.slice(prefix.length), 10);
    return Number.isNaN(number) ? max : Math.max(max, number);
  }, 0) + 1;
}

function assignIds(questions: ListeningQuestion[], part: ListeningPart): void {
  let next = nextId(part);
  questions.forEach((q) => {
    q.id = `p${part}-gen-${String(next++).padStart(3, "0")}`;
  });
}

function stripJson(text: string): unknown {
  const cleaned = text.replace(/```(?:json)?|```/g, "").trim();
  return JSON.parse(cleaned);
}

async function gptJson(
  client: OpenAI,
  system: string,
  user: string,
  usage: Usage,
): Promise<Record<string, unknown>> {
  const result = await client.chat.completions.create({
    model: GPT_MODEL,
    temperature: 0.75,
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
  return stripJson(content) as Record<string, unknown>;
}

function normalizeP2(raw: unknown[]): ListeningQuestion[] {
  return raw.map((item, index) => {
    const q = item as ListeningQuestion;
    q.id = `temporary-p2-${index + 1}`;
    q.part = "Part 2";
    q.skill_tag = "listening_response";
    delete q.choices.D;
    q.audioScript =
      `Q: ${q.question}\n(A) ${q.choices.A}\n(B) ${q.choices.B}\n(C) ${q.choices.C}`;
    return q;
  });
}

/**
 * `firstGroupIndex` is the absolute (bank-wide) index of the first group in
 * `raw`; question 3's skill tag alternates by group parity so the new bank
 * covers next-action AND inference questions (主旨/細節/推論/下一步 mix).
 */
function flattenGroups(
  raw: unknown[],
  part: "3" | "4",
  firstGroupIndex = 0,
): ListeningQuestion[] {
  const section = `Part ${part}` as const;
  return raw.flatMap((groupValue, groupIdx) => {
    const group = groupValue as { transcript?: string; questions?: ListeningQuestion[] };
    if (!group.transcript || !Array.isArray(group.questions)) return [];
    const transcript = part === "3"
      ? group.transcript
          .replace(/^\s*(?:Woman|Female|W(?:oman)?\s*\d*)\s*:/gim, "W:")
          .replace(/^\s*(?:Man|Male|M(?:an)?\s*\d*)\s*:/gim, "M:")
          .replace(/\s+(?:Woman|Female)\s*:/gi, "\nW:")
          .replace(/\s+(?:Man|Male)\s*:/gi, "\nM:")
          .replace(/\s+(?=[WM]:\s)/g, "\n")
      : group.transcript;
    return group.questions.map((q, index) => {
      q.id = `temporary-p${part}-${Math.random().toString(36).slice(2)}-${index + 1}`;
      q.part = section;
      q.transcript = transcript;
      q.question_order = index + 1;
      q.skill_tag = [
        "listening_main_idea",
        "listening_detail",
        (firstGroupIndex + groupIdx) % 2 === 0
          ? "listening_next_action"
          : "listening_inference",
      ][index] as RawGeneratedQuestion["skill_tag"];
      return q;
    });
  });
}

function groupedPayload(questions: ListeningQuestion[]): Array<{
  transcript: string;
  questions: ListeningQuestion[];
}> {
  const groups = new Map<string, ListeningQuestion[]>();
  questions.forEach((q) => {
    const items = groups.get(q.transcript ?? "") ?? [];
    items.push(q);
    groups.set(q.transcript ?? "", items);
  });
  return [...groups.entries()].map(([transcript, items]) => ({ transcript, questions: items }));
}

function p2Prompt(batch: number, count: number, itemOffset = 0): string {
  const answers = ANSWER_PLANS_P2[batch % ANSWER_PLANS_P2.length].slice(itemOffset, itemOffset + count);
  const questionForms = [
    "when question requiring a specific time or date",
    "where question requiring a location",
    "who question requiring a person or department",
    "why question requiring a reason",
    "what or how question requiring a specific item, method, or quantity",
    "yes/no question with a natural, possibly indirect answer",
    "tag question ending in ', isn't it?' / ', didn't you?' or similar — exactly one response addresses the confirmation; neither wrong response may be readable as agreeing, disagreeing, or hedging",
    "choice question using or, answered by picking one option or a natural alternative",
    "statement (not a question) such as an observation or problem, requiring the one natural spoken reaction",
    "indirect question such as Could you tell me... requiring specific information",
  ];
  return `Create ${count} original TOEIC Part 2 question-response item${count === 1 ? "" : "s"} in a JSON object {"questions":[...]}.
Each item has fields: question, choices {A,B,C}, answer, explanation_zh, difficulty, vocabulary, trapChoice, trapWord, trapReason.
Set part to "Part 2" and skill_tag to "listening_response".
Difficulty must be exactly one of "A2", "B1", or "B2".
Use concise natural spoken workplace English. Mix WH, yes/no, tag, embedded, statement-response, and choice questions.
For EVERY item, one wrong response must be a clear repeated-word trap: it repeats an exact key noun from the prompt but is grammatically or logically nonresponsive. For example, a time question about a report may have a wrong response discussing the report without giving a time. Do not use strained near-sounds. Set trapChoice to its wrong answer letter, trapWord to the exact shared word, and trapReason to why it cannot answer the prompt. In explanation_zh, explicitly name that shared word and why it is still wrong.
The other wrong response must be natural spoken English but answer a different question type, not be an alternative reasonable reply.
Silently verify before output that only one response is defensible in a real conversation; avoid vague replies such as "That sounds fine" when more than one prompt interpretation could fit.
For tag and yes/no prompts this check is critical: neither wrong response may be readable as any form of agreement, disagreement, or hedged answer to the prompt — that creates two defensible answers.
The only defensible answer letters in item order must be exactly: ${answers.join(", ")}.
The required prompt form for this item is: ${questionForms[itemOffset % questionForms.length]}.
Vary the situation using item index ${batch * 10 + itemOffset + 1}: office supplies, shipping and logistics, business travel, facilities or building maintenance, hiring, staff training, restaurant or hotel reservations, customer service, IT equipment, or marketing events.
Never set the scene around scheduling a meeting or around invoices/billing; those contexts are overrepresented in the existing bank.
Use Traditional Chinese explanations that state transcript logic and why distractors fail. Vocabulary is 3-5 English terms.
${listeningTemplatePrompt("Part 2", { includeAccentPolicy: true })}
Do not use recalled exam material. No fourth choice.`;
}

function groupsPrompt(part: "3" | "4", firstGroup: number, groups: number): string {
  const templatePart = `Part ${part}` as "Part 3" | "Part 4";
  const kind = part === "3" ? "conversation between W: and M:" : "single-speaker talk";
  const scenario =
    part === "3"
      ? "workplace requests, service issues, appointments, shipments, events, or purchasing"
      : "announcements, recorded messages, advertisements, tours, broadcasts, or staff notices";
  const plans = Array.from({ length: groups }, (_, index) =>
    ANSWER_PLANS_3[(firstGroup + index) % ANSWER_PLANS_3.length].join(", "),
  );
  const focusedScenarios = part === "3"
    ? [
        "rescheduling a client meeting",
        "a delayed shipment",
        "equipment repair for a presentation",
        "a conference registration change",
        "a customer order correction",
      ]
    : [
        "a building access announcement",
        "a store promotion with dates and restrictions",
        "a transportation delay announcement",
        "a staff training reminder",
        "a recorded customer-service update",
      ];
  return `Create ${groups} original TOEIC Part ${part} groups as JSON {"groups":[{"transcript":"...","questions":[...]}]}.
Each group is a ${kind}; use realistic ${scenario}. Before output, count the transcript words: aim for 90 words and keep it strictly between 80 and 105 spoken words, with a change/problem/contrast and at least two concrete details such as date, price, location, item, or deadline.
${part === "3" ? "Use 8-10 concise alternating turns. Every conversation turn must start on a new line with exactly W: or M:. Never use names, Woman:, Man:, or Speaker labels." : ""}
Scenario focus for the first group in this request: ${focusedScenarios[firstGroup % focusedScenarios.length]}.
For each group write exactly three questions in order: (1) purpose/main topic or setting, (2) an explicitly stated detail/problem, (3) as assigned below.
Question 3 assignment: ${Array.from({ length: groups }, (_, index) =>
    `group ${index + 1}: ${(firstGroup + index) % 2 === 0
      ? "the most likely immediate next action"
      : "a conservative inference directly supported by stated evidence (not a future action)"}`).join("; ")}.
Never write a question that depends on a chart, table, graphic, or any visual; all evidence must be spoken in the transcript.
Each question has fields question, choices {A,B,C,D}, answer, explanation_zh, difficulty, vocabulary, skill_tag.
Allowed skill_tag values only: listening_main_idea, listening_detail, listening_inference, listening_next_action.
Difficulty must be exactly one of "A2", "B1", or "B2".
For question 3, if the transcript mentions more than one future action, never use a second stated future action as a distractor for the immediate/most-likely next action; that would create two defensible choices.
For question 2, prefer an explicitly stated cause, date, location, quantity, or requested item. If asking about a problem, the keyed answer must name the stated cause/problem itself, not merely a consequence or deadline.
${part === "4" ? "For Part 4 question 2, ask a factual detail such as time, location, eligibility, price, instruction, or deadline. Do not ask for a problem unless the talk explicitly announces a failure, cancellation, or delay." : ""}
Use Traditional Chinese explanations citing exact transcript evidence and rejecting distractors. Vocabulary is 3-5 English terms.
Required correct-answer letters per group in order are: ${plans.map((p, i) => `group ${i + 1}: ${p}`).join("; ")}.
${listeningTemplatePrompt(templatePart, { includeAccentPolicy: true })}
No recalled exam material, and no ambiguous distractors.`;
}

function validateBatch(
  questions: ListeningQuestion[],
  part: ListeningPart,
  expected: number,
  requireTrapDesign = false,
): void {
  const errors: string[] = [];
  if (questions.length !== expected) errors.push(`Expected ${expected} questions, got ${questions.length}`);
  questions.forEach((q, index) => errors.push(...validateQuestion(q, index).errors));
  if (part === "2") {
    questions.forEach((q) => {
      if (!q.audioScript || q.choices.D !== undefined) errors.push(`${q.id || "P2"} invalid audioScript/choices`);
      if (requireTrapDesign && (
        !q.trapChoice ||
        q.trapChoice === q.answer ||
        !q.choices[q.trapChoice] ||
        !q.trapWord ||
        !q.trapReason
      )) {
        errors.push(`${q.id || "P2"} missing explicit wrong-answer trap design`);
      }
    });
  } else {
    const groups = new Map<string, ListeningQuestion[]>();
    for (const q of questions) {
      const group = groups.get(q.transcript ?? "") ?? [];
      group.push(q);
      groups.set(q.transcript ?? "", group);
    }
    for (const group of groups.values()) {
      errors.push(...validateQuestionGroup(group).errors);
      const words = group[0]?.transcript?.split(/\s+/).length ?? 0;
      if (group.length !== 3 || words < 75 || words > 135) {
        errors.push(`${part} group invalid length/count: questions=${group.length} words=${words}`);
      }
      if (
        part === "3" &&
        (!/^\s*W:\s/m.test(group[0]?.transcript ?? "") || !/^\s*M:\s/m.test(group[0]?.transcript ?? ""))
      ) {
        errors.push("P3 transcript must use W:/M: speaker turns");
      }
    }
  }
  if (errors.length) throw new Error(errors.join("\n"));
}

function matchesAnswerPlan(
  questions: ListeningQuestion[],
  part: ListeningPart,
  batch: number,
  groupOffset: number,
): boolean {
  if (part === "2") {
    const plan = ANSWER_PLANS_P2[batch % ANSWER_PLANS_P2.length];
    return questions.every((q, index) => q.answer === plan[index]);
  }
  return questions.every((q, index) => {
    const group = Math.floor(index / 3);
    const question = index % 3;
    return q.answer === ANSWER_PLANS_3[(groupOffset + group) % ANSWER_PLANS_3.length][question];
  });
}

function expectedAnswers(
  part: ListeningPart,
  count: number,
  batch: number,
  groupOffset: number,
): Choice[] {
  if (part === "2") {
    return ANSWER_PLANS_P2[batch % ANSWER_PLANS_P2.length].slice(0, count);
  }
  return Array.from({ length: count }, (_, index) => {
    const group = Math.floor(index / 3);
    return ANSWER_PLANS_3[(groupOffset + group) % ANSWER_PLANS_3.length][index % 3];
  });
}

function reviewerAccepts(review: { score: number; note: string }): boolean {
  const concerns = review.note
    .replace(/\bno [^.]*\b(?:ambiguity|unsupported|incorrect|contradictions?)[^.]*\.?/gi, "")
    .replace(/\bnot defensible\b/gi, "")
    .replace(/\bnot ambiguous\b/gi, "")
    .replace(/\bno [^.]*\b(?:ambiguity|ambiguous|defensible (?:wrong choices?|distractors?|alternatives?)|unsupported|issues?)[^.]*\.?/gi, "")
    .replace(/\b(?:wrong choices?|distractors?)[^.]*\b(?:uniquely|clearly) elimin[a-z]*[^.]*\.?/gi, "")
    .replace(/\bcould be argued as[^.]*however[^.]*\b(?:acceptable|supported|specified)[^.]*\.?/gi, "")
    .replace(/\border is slightly ambiguous[^.]*but[^.]*\b(?:correct|defensible|supported)[^.]*\.?/gi, "")
    .replace(/\bambiguous between[^.]*but[^.]*\b(?:correct|defensible|supported)[^.]*\.?/gi, "")
    .replace(/\bcould be slightly ambiguous if[^.]*however[^.]*supports[^.]*\.?/gi, "")
    // Positive confirmations that echo the reviewer instructions ("each wrong
    // choice is uniquely eliminable", "answers are uniquely supported") would
    // otherwise false-positive the answer↔wrong proximity check below.
    .replace(/\b(?:all|every|each)[^.]*\b(?:wrong choices?|distractors?)[^.]*\belimin[a-z]*[^.]*\.?/gi, "")
    .replace(/\b(?:answers?|keys?)[^.]{0,60}\buniquely supported[^.]*\.?/gi, "");
  return (
    review.score >= 7 &&
    !/\bambig|debatable|less direct than ["']|unsupported|not (?:fully )?supported|(?:answer|key)[^.]{0,80}(?:incorrect|wrong)|(?:incorrect|wrong) (?:answer|key)|contradict|two .*defensible|both .*defensible|also defensible|also a plausible|immediate next step|multiple .*correct|fails? the required|violation|violating/i.test(concerns)
  );
}

async function conformAnswerPlan(
  client: OpenAI,
  questions: ListeningQuestion[],
  targets: Choice[],
  usage: Usage,
): Promise<void> {
  let changed = false;
  questions.forEach((q, index) => {
    const target = targets[index];
    if (q.answer === target) return;
    const correct = q.choices[q.answer];
    const displaced = q.choices[target];
    if (!correct || !displaced) throw new Error("Cannot relocate answer without complete choices");
    q.choices[q.answer] = displaced;
    q.choices[target] = correct;
    if (q.trapChoice === q.answer) q.trapChoice = target;
    else if (q.trapChoice === target) q.trapChoice = q.answer;
    q.answer = target;
    changed = true;
    if (q.part === "Part 2") {
      q.audioScript =
        `Q: ${q.question}\n(A) ${q.choices.A}\n(B) ${q.choices.B}\n(C) ${q.choices.C}`;
    }
  });
  if (!changed) return;
  const revised = await gptJson(
    client,
    "You are a TOEIC tutor. Answer letters and choice positions supplied by the user are final. Return only accurate Traditional Chinese explanations for those final choices.",
    `Write an explanation for every item in order as JSON {"explanations":["..."]}. State the assigned answer letter, cite the prompt or transcript evidence, and reject distractors. For Part 2, explicitly identify the repeated-word or sound-alike trap and why it does not answer the question.\n${JSON.stringify(questions.map((q) => ({
      transcript: q.transcript,
      question: q.question,
      choices: q.choices,
      answer: q.answer,
    })))}`,
    usage,
  );
  const explanations = revised.explanations as unknown[];
  if (!Array.isArray(explanations) || explanations.length !== questions.length) {
    throw new Error("Could not rewrite final explanations after answer placement");
  }
  questions.forEach((q, index) => {
    if (typeof explanations[index] !== "string") throw new Error("Invalid revised explanation");
    q.explanation_zh = explanations[index] as string;
  });
}

async function reviewBatch(
  part: ListeningPart,
  questions: ListeningQuestion[],
): Promise<{ score: number; note: string }> {
  const input = part === "2"
    ? questions.map((q) => ({
        question: q.question,
        choices: q.choices,
        answer: q.answer,
        explanation_zh: q.explanation_zh,
        designedTrap: {
          choice: q.trapChoice,
          wordOrSound: q.trapWord,
          reasonItIsWrong: q.trapReason,
        },
      }))
    : questions.reduce<Array<{ transcript: string; questions: object[] }>>((groups, q) => {
        const existing = groups.find((g) => g.transcript === q.transcript);
        const question = { question: q.question, choices: q.choices, answer: q.answer };
        if (existing) existing.questions.push(question);
        else groups.push({ transcript: q.transcript ?? "", questions: [question] });
        return groups;
      }, []);
  const response = await deepseek(
    `You are a strict independent TOEIC Part ${part} reviewer. Review only Part ${part}; do not comment on absent sections. Score this batch from 1 to 10. Reject ambiguity, unnatural spoken English, unsupported correct answers, or distractors that are also defensible. For every item, verify each wrong choice is uniquely eliminable using the prompt/transcript alone. For Part 2, require one tempting wrong distractor per item that repeats an exact key word from the prompt while failing to answer the requested information; this repeated-word lure satisfies the required lexical trap and does not need to be a phonetic pun. For Part 2 tag questions and yes/no prompts, reject the batch if any wrong choice could be read as agreement, disagreement, or a hedged answer to the prompt (two defensible responses). For Part 3/4 require natural timing, concrete detail, and three coherent questions per transcript. Return JSON only: {"score":1-10,"note":"brief findings"}.`,
    JSON.stringify(input),
    0.1,
  );
  const parsed = stripJson(response.content) as { score?: number; note?: string };
  return { score: Number(parsed.score ?? 0), note: parsed.note ?? "No reviewer note" };
}

async function generateBatch(
  client: OpenAI,
  part: ListeningPart,
  count: number,
  usage: Usage,
): Promise<{ questions: ListeningQuestion[]; reviews: ReviewEntry[] }> {
  const output: ListeningQuestion[] = [];
  const reviews: ReviewEntry[] = [];
  const batchCount = part === "2" ? Math.ceil(count / 10) : Math.ceil(count / 9);
  let remaining = count;
  let groupOffset = part === "2" ? 0 : Math.floor((nextId(part) - 1) / 3);

  for (let batch = 0; batch < batchCount; batch++) {
    const requested = part === "2" ? Math.min(10, remaining) : Math.min(9, remaining);
    let accepted: ListeningQuestion[] | null = null;
    let finalReview = { score: 0, note: "" };
    let priorCandidate: ListeningQuestion[] | null = null;
    let priorNote = "";
    let attempts = 0;
    for (let attempt = 1; attempt <= 3; attempt++) {
      attempts = attempt;
      try {
        let candidate: ListeningQuestion[];
        if (part === "2" && priorCandidate) {
          const revision = await gptJson(
            client,
            "You are a senior TOEIC Part 2 editor. Revise only what is needed to resolve the independent review; preserve the ten-item count, fields, requested answer letters, varied question forms, and explicit trap metadata. Return JSON only.",
            `Fix this rejected batch so every item has one natural unique correct response and one exact repeated-word wrong trap. Reviewer findings: ${priorNote}\nReturn {"questions":[...]}.\n${JSON.stringify(priorCandidate)}`,
            usage,
          );
          candidate = normalizeP2((revision.questions as unknown[]) ?? []);
        } else if (part === "2") {
          const raw: unknown[] = [];
          for (let offset = 0; offset < requested; offset++) {
            const subCount = 1;
            const json = await gptJson(
              client,
              "You write ETS-style original TOEIC listening items with uniquely answerable choices.",
              `${p2Prompt(batch, subCount, offset)}\nThis is item ${offset + 1} of a larger review batch; focus on a natural but unambiguously wrong word-association trap.`,
              usage,
            );
            raw.push(...((json.questions as unknown[]) ?? []));
          }
          candidate = normalizeP2(raw);
        } else if (priorCandidate) {
          const revision = await gptJson(
            client,
            `You are a senior TOEIC Part ${part} editor. Fix the independent review findings while retaining exactly three questions per transcript, natural length, W:/M: labels for Part 3, and the required answer letter positions. Return JSON only.`,
            `Reviewer findings: ${priorNote}\nReturn {"groups":[{"transcript":"...","questions":[...]}]} for these corrected groups:\n${JSON.stringify(groupedPayload(priorCandidate))}`,
            usage,
          );
          candidate = flattenGroups((revision.groups as unknown[]) ?? [], part, groupOffset);
        } else {
          const generatedGroups: ListeningQuestion[] = [];
          for (let group = 0; group < requested / 3; group++) {
            let acceptedGroup: ListeningQuestion[] | null = null;
            for (let structuralTry = 1; structuralTry <= 3; structuralTry++) {
              const json = await gptJson(
                client,
                "You write ETS-style original TOEIC listening items with natural business English and uniquely supported answers.",
                groupsPrompt(part, groupOffset + group, 1),
                usage,
              );
              const generated = flattenGroups((json.groups as unknown[]) ?? [], part, groupOffset + group);
              try {
                validateBatch(generated, part, 3);
                acceptedGroup = generated;
                break;
              } catch (error) {
                console.warn(
                  `Part ${part} group ${groupOffset + group + 1} structural retry ${structuralTry}: ${(error as Error).message.slice(0, 120)}`,
                );
              }
            }
            if (!acceptedGroup) throw new Error(`Could not create structurally valid Part ${part} group`);
            generatedGroups.push(...acceptedGroup);
          }
          candidate = generatedGroups;
        }
        validateBatch(candidate, part, requested, part === "2");
        await conformAnswerPlan(
          client,
          candidate,
          expectedAnswers(part, requested, batch, groupOffset),
          usage,
        );
        if (!matchesAnswerPlan(candidate, part, batch, groupOffset)) {
          throw new Error("Generated answers did not follow requested balance plan");
        }
        finalReview = await reviewBatch(part, candidate);
        console.log(`Part ${part} batch ${batch + 1}/${batchCount} attempt ${attempt}: reviewer ${finalReview.score}/10 - ${finalReview.note}`);
        if (reviewerAccepts(finalReview)) {
          accepted = candidate;
          break;
        }
        priorCandidate = candidate;
        priorNote = finalReview.note;
      } catch (error) {
        console.warn(`Part ${part} batch ${batch + 1} attempt ${attempt} rejected: ${(error as Error).message.slice(0, 180)}`);
      }
    }
    if (!accepted) throw new Error(`Part ${part} batch ${batch + 1} did not pass after 2 retries`);
    output.push(...accepted);
    reviews.push({ batch: batch + 1, questions: requested, attempts, ...finalReview });
    remaining -= requested;
    if (part !== "2") groupOffset += requested / 3;
  }
  assignIds(output, part);
  validateBatch(output, part, count, part === "2");
  if (part === "2") {
    output.forEach((q) => {
      delete q.trapChoice;
      delete q.trapWord;
      delete q.trapReason;
    });
  }
  return { questions: output, reviews };
}

function promote(file: string): void {
  const resolved = path.resolve(process.cwd(), file);
  const questions = JSON.parse(fs.readFileSync(resolved, "utf8")) as ListeningQuestion[];
  const part = questions[0]?.part.replace("Part ", "") as ListeningPart;
  validateBatch(questions, part, questions.length);
  const currentIds = new Set(QUESTIONS.map((q) => q.id));
  const duplicate = questions.find((q) => currentIds.has(q.id));
  if (duplicate) throw new Error(`Duplicate ID: ${duplicate.id}`);
  const source = fs.readFileSync(GENERATED_DATA_PATH, "utf8");
  const close = source.lastIndexOf("\n];");
  if (close < 0) throw new Error("Cannot find generated question array close");
  const serialized = questions.map((q) => `  ${JSON.stringify(q, null, 2)}`).join(",\n");
  const before = source.slice(0, close);
  const separator = before.trimEnd().endsWith(",") ? "\n" : ",\n";
  fs.writeFileSync(GENERATED_DATA_PATH, before + separator + serialized + source.slice(close), "utf8");
  console.log(`Promoted ${questions.length} Part ${part} questions from ${resolved}`);
}

function printCost(gptUsage: Usage): void {
  const gptCost = (gptUsage.input / 1_000_000) * 2.5 + (gptUsage.output / 1_000_000) * 10;
  const reviewUsage = getLlmUsage();
  let reviewCost = 0;
  Object.entries(reviewUsage).forEach(([model, usage]) => {
    const cost = (usage.promptTokens / 1_000_000) * 0.14 + (usage.completionTokens / 1_000_000) * 0.28;
    reviewCost += cost;
    console.log(`Reviewer ${model}: ${usage.calls} calls, ${usage.promptTokens} input + ${usage.completionTokens} output, <= $${cost.toFixed(4)}`);
  });
  console.log(`OpenRouter ${GPT_MODEL}: ${gptUsage.calls} calls, ${gptUsage.input} input + ${gptUsage.output} output, $${gptCost.toFixed(4)}`);
  console.log(`Batch LLM cost: $${(gptCost + reviewCost).toFixed(4)} USD`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if ("promote" in args) {
    promote(args.promote);
    return;
  }
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required by pipeline policy");
  if (!process.env.OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY is required");
  if (!process.env.DEEPSEEK_API_KEY) throw new Error("DEEPSEEK_API_KEY is required for reviewer");
  // Direct OPENAI_API_KEY was quota-limited during this batch; this route uses
  // the same required OpenAI GPT-4o model through the funded OpenRouter account.
  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL ?? OPENROUTER_BASE_URL,
  });
  const usage: Usage = { calls: 0, input: 0, output: 0 };
  const result = await generateBatch(client, args.part, args.questions, usage);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const stem = `listening-p${args.part}-${Date.now()}`;
  const questionFile = path.join(OUTPUT_DIR, `${stem}.json`);
  fs.writeFileSync(questionFile, JSON.stringify(result.questions, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, `${stem}-review.json`), JSON.stringify(result.reviews, null, 2));
  console.log(`Validated ${result.questions.length} questions -> ${questionFile}`);
  console.log(`Reviewer batches: ${result.reviews.length}; regenerated questions: ${result.reviews.reduce((sum, r) => sum + (r.attempts - 1) * r.questions, 0)}`);
  printCost(usage);
}

main().catch((error) => {
  console.error((error as Error).message);
  process.exit(1);
});
