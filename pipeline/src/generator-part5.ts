import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { deepseek, kimi, parseGeneratedJson } from "./llm-client";
import { validateQuestion } from "./validator";
import type { Pattern, RawGeneratedQuestion } from "./types";

/** Map pattern subtype to valid SkillTag */
const SUBTYPE_TO_SKILL: Record<string, string> = {
  passive_voice: "passive_voice",
  word_form_noun_adj: "word_form",
  word_form: "word_form",
  tense_present_perfect: "tense",
  tense_past_perfect: "tense",
  tense: "tense",
  preposition_time_place: "preposition",
  preposition_collocation: "preposition",
  preposition: "preposition",
  conjunction_transition: "conjunction",
  conjunction: "conjunction",
  pronoun: "pronoun",
  relative_clause: "relative_clause",
  business_vocabulary: "business_vocabulary",
};

const PROMPT_TEMPLATE = fs.readFileSync(
  path.resolve(__dirname, "../templates/part5-prompt.md"),
  "utf-8"
);
const KIMI_TEMPLATE = fs.readFileSync(
  path.resolve(__dirname, "../templates/kimi-explain.md"),
  "utf-8"
);

export async function generatePart5(
  pattern: Pattern,
  count: number,
  options: { skipKimi?: boolean } = {}
): Promise<RawGeneratedQuestion[]> {
  const systemPrompt =
    "You are a TOEIC Part 5 writer. Output ONLY a JSON array. No markdown, no explanation.";
  let userPrompt = PROMPT_TEMPLATE.replace(/\{\{count\}\}/g, String(count))
    .replace(/\{\{skill_tag\}\}/g, pattern.subtype)
    .replace(/\{\{skill_label\}\}/g, pattern.subtype.replace(/_/g, " "))
    .replace(/\{\{grammar_focus\}\}/g, pattern.grammar_focus ?? "")
    .replace(/\{\{difficulty\}\}/g, pattern.difficulty)
    .replace(/\{\{topic\}\}/g, pattern.topic)
    .replace(/\{\{tone\}\}/g, pattern.tone)
    .replace(
      /\{\{distractor_patterns\}\}/g,
      pattern.distractor_patterns.join(", ")
    )
    .replace(/\{\{few_shot_examples\}\}/g, "")
    .replace(
      /\{\{generation_instruction\}\}/g,
      pattern.generation_instruction
    );

  console.log(`  Calling DeepSeek for ${count} Part 5 questions...`);
  const response = await deepseek(systemPrompt, userPrompt);
  console.log(`  DeepSeek returned ${response.content.length} chars`);

  const parsed = parseGeneratedJson(response.content);

  if (!Array.isArray(parsed)) {
    console.warn(
      `  Raw response: ${response.content.slice(0, 500)}`
    );
    throw new Error(`Part 5 response is not an array`);
  }

  const questions: RawGeneratedQuestion[] = [];

  for (let i = 0; i < parsed.length; i++) {
    const raw = parsed[i] as Partial<RawGeneratedQuestion>;
    const validation = validateQuestion(raw, i);

    if (!validation.valid) {
      console.warn(
        `  Validation: ${validation.errors.join("; ")}`
      );
      continue;
    }

    raw.skill_tag = (SUBTYPE_TO_SKILL[pattern.subtype] ??
      pattern.subtype) as RawGeneratedQuestion["skill_tag"];
    raw.part = "Part 5";
    raw.difficulty = pattern.difficulty;

    // Optimize explanation with Kimi
    if (!options.skipKimi && raw.explanation_zh) {
      try {
        const improved = await optimizeExplanation(raw as RawGeneratedQuestion);
        if (improved) raw.explanation_zh = improved;
      } catch (e) {
        // Keep original explanation
      }
    }

    questions.push(raw as RawGeneratedQuestion);
  }

  return questions;
}

async function optimizeExplanation(
  q: RawGeneratedQuestion
): Promise<string> {
  const choicesSummary = `A: ${q.choices.A}, B: ${q.choices.B}, C: ${q.choices.C}, D: ${q.choices.D}`;
  const prompt = KIMI_TEMPLATE.replace(
    /\{\{question\}\}/g,
    q.question
  )
    .replace(/\{\{choices_summary\}\}/g, choicesSummary)
    .replace(/\{\{answer\}\}/g, q.answer)
    .replace(/\{\{correct_choice_text\}\}/g, q.choices[q.answer] ?? "")
    .replace(
      /\{\{existing_explanation_zh\}\}/g,
      q.explanation_zh
    );

  const response = await kimi(
    "You are a TOEIC tutor. Output only the improved Chinese explanation.",
    prompt
  );
  return response.content.trim();
}
