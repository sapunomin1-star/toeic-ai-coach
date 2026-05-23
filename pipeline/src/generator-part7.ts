import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { deepseek, kimi, parseGeneratedJson } from "./llm-client";
import { validateQuestion, validateQuestionGroup } from "./validator";
import type { Pattern, RawGeneratedQuestion } from "./types";
import type { SkillTag } from "../types/question";

const PROMPT_TEMPLATE = fs.readFileSync(
  path.resolve(__dirname, "../templates/part7-prompt.md"),
  "utf-8"
);
const KIMI_TEMPLATE = fs.readFileSync(
  path.resolve(__dirname, "../templates/kimi-explain.md"),
  "utf-8"
);

export async function generatePart7(
  pattern: Pattern,
  options: { skipKimi?: boolean } = {}
): Promise<RawGeneratedQuestion[]> {
  const questionMix = pattern.question_mix ?? {};
  const skills = Object.keys(questionMix) as SkillTag[];
  const totalQuestions = skills.reduce(
    (sum, s) => sum + (questionMix[s] ?? 0),
    0
  );

  if (skills.length === 0) {
    throw new Error(`Pattern ${pattern.pattern_id} has no question_mix`);
  }

  const mixSpec = skills
    .map((s) => `  - ${s}: ${questionMix[s]} question(s)`)
    .join("\n");

  const systemPrompt =
    "You are a TOEIC Part 7 question writer. Output ONLY a JSON array. No markdown, no explanation text.";

  let userPrompt = PROMPT_TEMPLATE
    .replace(/\{\{question_count\}\}/g, String(totalQuestions))
    .replace(/\{\{difficulty\}\}/g, pattern.difficulty)
    .replace(/\{\{document_type\}\}/g, pattern.document_type)
    .replace(/\{\{subtype\}\}/g, pattern.subtype)
    .replace(/\{\{topic\}\}/g, pattern.topic)
    .replace(/\{\{tone\}\}/g, pattern.tone)
    .replace(
      /\{\{passage_length\}\}/g,
      pattern.passage_length ?? "120–200 words"
    )
    .replace(/\{\{question_mix_spec\}\}/g, mixSpec)
    .replace(
      /\{\{distractor_patterns\}\}/g,
      pattern.distractor_patterns.join(", ")
    )
    .replace(/\{\{few_shot_examples\}\}/g, "")
    .replace(
      /\{\{generation_instruction\}\}/g,
      pattern.generation_instruction
    )
    .replace(/\{\{skill1\}\}/g, skills[0] ?? "reading_main_idea");

  console.log(
    `  Calling DeepSeek for ${totalQuestions} Part 7 questions...`
  );
  const response = await deepseek(systemPrompt, userPrompt);
  console.log(`  DeepSeek returned ${response.content.length} chars`);

  const parsed = parseGeneratedJson(response.content);

  if (!Array.isArray(parsed)) {
    console.warn(
      `  Raw response (first 500 chars): ${response.content.slice(0, 500)}`
    );
    throw new Error(`Part 7 response is not an array`);
  }

  const questions: RawGeneratedQuestion[] = [];

  for (let i = 0; i < parsed.length; i++) {
    const raw = parsed[i] as Partial<RawGeneratedQuestion>;
    raw.part = "Part 7";
    raw.difficulty = pattern.difficulty;

    const skillIndex = i % skills.length;
    raw.skill_tag = skills[skillIndex];

    // Optimize with Kimi
    if (!options.skipKimi && raw.explanation_zh) {
      try {
        const choicesSummary = `A: ${raw.choices?.A ?? ""}, B: ${raw.choices?.B ?? ""}, C: ${raw.choices?.C ?? ""}, D: ${raw.choices?.D ?? ""}`;
        const prompt = KIMI_TEMPLATE.replace(
          /\{\{question\}\}/g,
          raw.question ?? ""
        )
          .replace(/\{\{choices_summary\}\}/g, choicesSummary)
          .replace(/\{\{answer\}\}/g, raw.answer ?? "")
          .replace(
            /\{\{correct_choice_text\}\}/g,
            raw.choices?.[raw.answer ?? "A"] ?? ""
          )
          .replace(
            /\{\{existing_explanation_zh\}\}/g,
            raw.explanation_zh
          );
        const kimiResp = await kimi(
          "You are a TOEIC tutor. Output only the improved Chinese explanation.",
          prompt
        );
        raw.explanation_zh = kimiResp.content.trim();
      } catch (_e) {
        // Keep original
      }
    }

    questions.push(raw as RawGeneratedQuestion);
  }

  // Validate group
  const validation = validateQuestionGroup(
    questions as Partial<RawGeneratedQuestion>[]
  );
  if (!validation.valid) {
    console.warn(`  Validation: ${validation.errors.join("; ")}`);
    // Auto-fix shared passage
    const passage = questions[0]?.passage;
    if (passage && validation.errors.some((e) => e.includes("passage"))) {
      for (const q of questions) q.passage = passage;
    }
  }

  return questions.filter((q) => {
    const v = validateQuestion(q as Partial<RawGeneratedQuestion>, 0);
    return (
      v.valid || v.errors.every((e) => e.includes("passage"))
    );
  });
}
