import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { deepseek, parseGeneratedJson } from "./llm-client";
import { validateQuestion, validateQuestionGroup } from "./validator";
import type { Pattern, RawGeneratedQuestion } from "./types";

const PROMPT_TEMPLATE = fs.readFileSync(
  path.resolve(__dirname, "../templates/part6-prompt.md"),
  "utf-8"
);

export async function generatePart6(
  pattern: Pattern,
  options: { skipKimi?: boolean; skipHy3?: boolean } = {}
): Promise<RawGeneratedQuestion[]> {
  const systemPrompt =
    "You are a TOEIC Part 6 question writer. Output only valid JSON array with 4 question objects.";
  let userPrompt = PROMPT_TEMPLATE.replace(
    /\{\{difficulty\}\}/g,
    pattern.difficulty
  )
    .replace(/\{\{document_type\}\}/g, pattern.subtype)
    .replace(/\{\{topic\}\}/g, pattern.topic)
    .replace(/\{\{tone\}\}/g, pattern.tone)
    .replace(
      /\{\{passage_length\}\}/g,
      pattern.passage_length ?? "100–140 words"
    )
    .replace(
      /\{\{tested_skills\}\}/g,
      (pattern.tested_skills ?? []).join(", ")
    )
    .replace(
      /\{\{distractor_patterns\}\}/g,
      pattern.distractor_patterns.join(", ")
    )
    .replace(/\{\{few_shot_examples\}\}/g, PART6_EXAMPLE)
    .replace(
      /\{\{generation_instruction\}\}/g,
      pattern.generation_instruction
    );

  console.log(`  Generating Part 6 passage via DeepSeek...`);
  const response = await deepseek(systemPrompt, userPrompt);
  const parsed = parseGeneratedJson(response.content);

  if (!Array.isArray(parsed)) {
    throw new Error(
      `Part 6 generation returned non-array: ${response.content.slice(0, 200)}`
    );
  }

  // Validate all 4 questions as a group
  const questions = parsed.map((r) => {
    const q = r as Partial<RawGeneratedQuestion>;
    q.part = "Part 6";
    q.skill_tag = "reading_detail";
    q.difficulty = pattern.difficulty;
    return q;
  });

  const groupValidation = validateQuestionGroup(questions);

  if (!groupValidation.valid) {
    console.warn(
      `  ⚠️ Part 6 validation errors: ${groupValidation.errors.join("; ")}`
    );
    if (groupValidation.errors.some((e) => e.includes("share the same passage"))) {
      // Fix: set all 4 to use the first question's passage
      const passage = questions[0]?.passage;
      if (passage) {
        for (const q of questions) {
          q.passage = passage;
        }
        console.log("  Fixed: unified passage across all 4 Part 6 questions");
      }
    }
  }

  // Check we have 4 questions
  if (questions.length !== 4) {
    console.warn(
      `  ⚠️ Expected 4 Part 6 questions, got ${questions.length}`
    );
  }

  const valid = questions.filter((q) => {
    const v = validateQuestion(q, 0); // dummy index
    return v.valid || v.errors.every((e) => !e.includes("share"));
  });

  return valid as RawGeneratedQuestion[];
}

const PART6_EXAMPLE = `Example Part 6 passage (from TOEIC practice):
Passage: "It has come to our attention that there has been a noticeable increase in eye injuries... Effective Monday, June 8, all employees working in Zone B will be required to wear ____(A)____ goggles at all times. The goggles will be ____(B)____ by the company... ____(C)____, failure to comply with this new requirement may result in disciplinary action... ____(D)____ Your safety is our top priority."
(A) choices: A.protect B.protection C.protectively D.protective → Answer: D (adjective needed)
(B) choices: A.provided B.produced C.prepared D.purchased → Answer: A (supplied by company)
(C) choices: A.In other words B.Please note C.For instance D.Similarly → Answer: B (draws attention)
(D) choices: (sentence insertion — choose most logical next sentence)`;
