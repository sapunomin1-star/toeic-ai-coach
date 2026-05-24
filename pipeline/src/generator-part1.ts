import { fileURLToPath } from "url";
import { deepseek, parseGeneratedJson } from "./llm-client";
import { saveToJson } from "./questions-writer";
import { validateQuestion } from "./validator";
import type { RawGeneratedQuestion } from "./types";

export const PART1_SYSTEM_PROMPT = `You are a TOEIC Part 1 (Photographs) question writer. TOEIC Part 1 shows a photo and plays four short English statements (A/B/C/D). The test-taker chooses the statement that best describes the photo.

Output ONLY a JSON array. Each item must follow this exact schema:

{
  "id": "p1-gen-XXX",
  "part": "Part 1",
  "skill_tag": "listening_photo",
  "difficulty": "A2" | "B1" | "B2",
  "imageAlt": "<one-sentence English description of the photo, 12-25 words>",
  "audioScript": "(A) ...\\n(B) ...\\n(C) ...\\n(D) ...",
  "question": "Look at the photo and choose the statement that best describes it.",
  "choices": { "A": "...", "B": "...", "C": "...", "D": "..." },
  "answer": "A" | "B" | "C" | "D",
  "explanation_zh": "<2-4 sentence Traditional Chinese: why correct, why each distractor wrong>",
  "vocabulary": ["<3-6 key words>"]
}

Rules:
- B1/B2 business contexts (offices, meetings, factories, transport, restaurants, retail)
- Distractors should be wrong because of: incorrect tense, wrong action, wrong number, wrong location, wrong object
- Distribute answer key across A/B/C/D over a batch (each 20-30%)
- Do NOT generate the actual photo
- Use Traditional Chinese (zh-Hant) for explanation_zh
- Output JSON only, no markdown fences or extra text`;

export async function generatePart1(count: number): Promise<RawGeneratedQuestion[]> {
  const userPrompt = `Generate ${count} TOEIC Part 1 questions.`;
  console.log(`  Calling DeepSeek for ${count} Part 1 questions...`);
  const response = await deepseek(PART1_SYSTEM_PROMPT, userPrompt);
  console.log(`  DeepSeek returned ${response.content.length} chars`);

  const parsed = parseGeneratedJson(response.content);
  if (!Array.isArray(parsed)) {
    throw new Error("Part 1 response is not an array");
  }

  const questions: RawGeneratedQuestion[] = [];
  for (let i = 0; i < parsed.length; i++) {
    const raw = parsed[i] as Partial<RawGeneratedQuestion>;
    raw.part = "Part 1";
    raw.skill_tag = "listening_photo";
    const validation = validateQuestion(raw, i);

    if (!validation.valid) {
      console.warn(`  Validation: ${validation.errors.join("; ")}`);
      continue;
    }

    questions.push(raw as RawGeneratedQuestion);
  }

  saveToJson(
    questions as unknown as Record<string, unknown>[],
    `part1-batch-${Date.now()}.json`
  );
  return questions;
}

if (process.argv.includes("--help") && process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("Usage: npx tsx src/generator-part1.ts --help");
  console.log("Exports generatePart1(count); writes output/part1-batch-{timestamp}.json.");
}
