import { fileURLToPath } from "url";
import { deepseek, parseGeneratedJson } from "./llm-client";
import { saveToJson } from "./questions-writer";
import { validateQuestion } from "./validator";
import type { RawGeneratedQuestion } from "./types";

export const PART2_SYSTEM_PROMPT = `You are a TOEIC Part 2 (Question-Response) question writer. TOEIC Part 2 plays one short spoken question/statement, followed by three spoken responses (A/B/C). Part 2 has exactly 3 choices — never 4.

Output ONLY a JSON array. Each item:

{
  "id": "p2-gen-XXX",
  "part": "Part 2",
  "skill_tag": "listening_response",
  "difficulty": "A2" | "B1" | "B2",
  "audioScript": "Q: ...\\n(A) ...\\n(B) ...\\n(C) ...",
  "question": "<same as Q line, for display>",
  "choices": { "A": "...", "B": "...", "C": "..." },
  "answer": "A" | "B" | "C",
  "explanation_zh": "<2-4 sentence Traditional Chinese>",
  "vocabulary": ["<2-5 key words>"]
}

Rules:
- Mix question types: wh-questions, yes-no, tag, statements, indirect requests, choice questions
- One distractor phonetically similar to question, one answers different question, one plausible but wrong follow-up
- Distribute answer key A/B/C over a batch (each 30-40%)
- NO choices.D
- Use Traditional Chinese (zh-Hant) for explanation_zh
- Output JSON only`;

export async function generatePart2(count: number): Promise<RawGeneratedQuestion[]> {
  const userPrompt = `Generate ${count} TOEIC Part 2 questions.`;
  console.log(`  Calling DeepSeek for ${count} Part 2 questions...`);
  const response = await deepseek(PART2_SYSTEM_PROMPT, userPrompt);
  console.log(`  DeepSeek returned ${response.content.length} chars`);

  const parsed = parseGeneratedJson(response.content);
  if (!Array.isArray(parsed)) {
    throw new Error("Part 2 response is not an array");
  }

  const questions: RawGeneratedQuestion[] = [];
  for (let i = 0; i < parsed.length; i++) {
    const raw = parsed[i] as Partial<RawGeneratedQuestion>;
    raw.part = "Part 2";
    raw.skill_tag = "listening_response";
    const validation = validateQuestion(raw, i);

    if (!validation.valid) {
      console.warn(`  Validation: ${validation.errors.join("; ")}`);
      continue;
    }

    questions.push(raw as RawGeneratedQuestion);
  }

  saveToJson(
    questions as unknown as Record<string, unknown>[],
    `part2-batch-${Date.now()}.json`
  );
  return questions;
}

if (process.argv.includes("--help") && process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("Usage: npx tsx src/generator-part2.ts --help");
  console.log("Exports generatePart2(count); writes output/part2-batch-{timestamp}.json.");
}
