import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { QUESTIONS } from "../../data/questions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GENERATED_QUESTIONS_PATH = path.resolve(
  __dirname,
  "../../data/questions-generated.ts"
);

const GENERATED_EXPORT_MARKER = "export const GENERATED_QUESTIONS";

function findGeneratedArrayClose(raw: string): number {
  const exportIdx = raw.indexOf(GENERATED_EXPORT_MARKER);
  if (exportIdx === -1) {
    throw new Error("Could not find GENERATED_QUESTIONS export marker");
  }

  const closeIdx = raw.lastIndexOf("\n];");
  if (closeIdx < exportIdx) {
    throw new Error("Could not find closing ]; for GENERATED_QUESTIONS array");
  }

  return closeIdx;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Find the highest numeric suffix across the complete, split question bank. */
export function getMaxExistingIdNumber(prefix: string): number {
  const pattern = new RegExp(`^${escapeRegExp(prefix)}(\\d+)$`);
  let max = 0;
  for (const question of QUESTIONS) {
    const match = question.id.match(pattern);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max;
}

/** Allocate IDs strictly above the highest existing suffix. */
export function generateNextIds(
  prefix: string,
  count: number
): string[] {
  const maxExistingId = getMaxExistingIdNumber(prefix);
  return Array.from({ length: count }, (_, i) => {
    const num = (maxExistingId + i + 1).toString().padStart(3, "0");
    return `${prefix}${num}`;
  });
}

function extractIds(raw: string): Set<string> {
  return new Set(
    [...raw.matchAll(/(?:"id"|id):\s*"([^"]+)"/g)].map((match) => match[1])
  );
}

function assertNoIdCollisions(
  newQuestions: Record<string, unknown>[],
  generatedRaw: string,
): void {
  const existingIds = new Set(QUESTIONS.map((question) => question.id));
  for (const id of extractIds(generatedRaw)) existingIds.add(id);

  const incomingIds = new Set<string>();
  for (const question of newQuestions) {
    if (typeof question.id !== "string" || question.id.length === 0) {
      throw new Error("Generated question is missing a valid string id");
    }
    if (existingIds.has(question.id)) {
      throw new Error(`Refusing to append duplicate question id: ${question.id}`);
    }
    if (incomingIds.has(question.id)) {
      throw new Error(`Generated batch contains duplicate question id: ${question.id}`);
    }
    incomingIds.add(question.id);
  }
}

/** Append approved reading questions to data/questions-generated.ts. */
export function appendQuestions(
  newQuestions: Record<string, unknown>[],
  dryRun = false
): void {
  if (newQuestions.length === 0) {
    console.log("No questions to append.");
    return;
  }

  const raw = fs.readFileSync(GENERATED_QUESTIONS_PATH, "utf-8");
  assertNoIdCollisions(newQuestions, raw);

  if (dryRun) {
    console.log(
      `[DRY RUN] Would append ${newQuestions.length} questions:`
    );
    for (const q of newQuestions) {
      const id = q.id ?? "?";
      const qText =
        typeof q.question === "string" ? q.question.slice(0, 60) : "?";
      console.log(`  - ${id}: ${qText}...`);
    }
    return;
  }

  const closeIdx = findGeneratedArrayClose(raw);
  const newEntries = newQuestions
    .map((question) =>
      JSON.stringify(question, null, 2)
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n")
    )
    .join(",\n");

  const prefix = raw.slice(0, closeIdx);
  const suffix = raw.slice(closeIdx);
  const separator = prefix.trimEnd().endsWith(",") ? "\n" : ",\n";
  const updated = `${prefix}${separator}${newEntries}${suffix}`;

  fs.writeFileSync(GENERATED_QUESTIONS_PATH, updated, "utf-8");
  console.log(
    `Appended ${newQuestions.length} questions to data/questions-generated.ts`
  );
}

/** Save questions to a JSON file in pipeline/output/ as backup. */
export function saveToJson(
  questions: Record<string, unknown>[],
  filename: string
): void {
  const outputDir = path.resolve(__dirname, "../output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(outputDir, filename),
    JSON.stringify(questions, null, 2),
    "utf-8"
  );
  console.log(`Saved ${questions.length} questions to output/${filename}`);
}
