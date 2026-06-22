import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { deepseek, parseGeneratedJson } from "./llm-client";
import { readingTemplatePrompt } from "./reading-template-library";
import { validateQuestion, validateQuestionGroup } from "./validator";
import type { Pattern, RawGeneratedQuestion } from "./types";

const PROMPT_TEMPLATE = fs.readFileSync(
  path.resolve(__dirname, "../templates/part6-prompt.md"),
  "utf-8"
);

export async function generatePart6(
  pattern: Pattern,
  options: {
    skipKimi?: boolean;
    skipHy3?: boolean;
    expectedAnswers?: RawGeneratedQuestion["answer"][];
  } = {}
): Promise<RawGeneratedQuestion[]> {
  const systemPrompt =
    "You are a meticulous TOEIC Part 6 question writer. Output only a valid JSON array with 4 question objects. Use plain test-paper text without markdown. Respect the requested passage length. Before answering, verify that each keyed option is the only grammatically and logically defensible completion; in particular, transition words must match the actual contrast, cause, or addition between sentences.";
  const answerPlanInstruction = options.expectedAnswers
    ? `\nFor blanks (A), (B), (C), and (D) in that order, the keyed correct choice letters must be exactly ${options.expectedAnswers.join(", ")}. Design each option set around this answer placement from the outset; do not merely relabel an existing answer.`
    : "";
  const userPrompt = PROMPT_TEMPLATE.replace(
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
    .replace(/\{\{few_shot_examples\}\}/g, PART6_PATTERN_EXAMPLE)
    .replace(
      /\{\{generation_instruction\}\}/g,
      `${pattern.generation_instruction}\n\n${readingTemplatePrompt("Part 6")}`
    ) + answerPlanInstruction;

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

const PART6_PATTERN_EXAMPLE = `Abstract Part 6 pattern example:
- Passage type: internal workplace notice.
- Topic: a new safety or operations policy.
- Length: 100-140 words.
- Blank A: adjective or noun form selected by the following noun.
- Blank B: verb chosen by business collocation and passive/active context.
- Blank C: transition phrase that matches the logical relation.
- Blank D: sentence insertion that connects the previous warning to the final reassurance.
- Distractors: wrong word forms, plausible but wrong business verbs, transitions with the wrong logic, and a sentence that repeats keywords but breaks paragraph flow.
Create a new original passage. Do not reuse names, dates, wording, facts, or sentence structure from any source sample.`;
