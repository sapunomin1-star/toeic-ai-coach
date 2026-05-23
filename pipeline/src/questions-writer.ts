import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_PATH = path.resolve(
  __dirname,
  "../../data/questions.ts"
);

/** Count existing question IDs in data/questions.ts by grepping id patterns */
export function countExistingIds(prefix: string): number {
  const raw = fs.readFileSync(QUESTIONS_PATH, "utf-8");
  const ids = raw.match(new RegExp(`id:\\s*"${prefix}\\d+"`, "g")) ?? [];
  return ids.length;
}

/** Extract question text blocks for few-shot examples by ID prefix */
export function findExampleTexts(
  prefix: string,
  maxCount: number
): string[] {
  const raw = fs.readFileSync(QUESTIONS_PATH, "utf-8");
  // Find question objects by matching { ... id: "prefix..." ... }
  const pattern = new RegExp(
    `\\{[^}]*id:\\s*"${prefix}\\d+"[^}]*\\}`,
    "gs"
  );
  const matches = raw.match(pattern) ?? [];
  return matches.slice(0, maxCount);
}

/** Get the next available IDs given existing count */
export function generateNextIds(
  prefix: string,
  count: number
): string[] {
  // Also check generated files in pipeline/output/
  const existingCount = countExistingIds(prefix);
  return Array.from({ length: count }, (_, i) => {
    const num = (existingCount + i + 1).toString().padStart(3, "0");
    return `${prefix}${num}`;
  });
}

/** Append new questions to data/questions.ts */
export function appendQuestions(
  newQuestions: Record<string, unknown>[],
  dryRun = false
): void {
  if (newQuestions.length === 0) {
    console.log("No questions to append.");
    return;
  }

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

  const raw = fs.readFileSync(QUESTIONS_PATH, "utf-8");

  // Find the closing ]; of the QUESTIONS array
  const closeIdx = raw.lastIndexOf("];");
  if (closeIdx === -1) {
    throw new Error("Could not find closing ]; in questions.ts");
  }

  // Build new questions TypeScript text
  const newEntries = newQuestions
    .map((q) => {
      const json = JSON.stringify(q, null, 6);
      // Fix indentation to match existing style
      return json
        .split("\n")
        .map((line, i) => (i === 0 ? `  ${line}` : `  ${line}`))
        .join("\n");
    })
    .join(",\n");

  const prefix = raw.slice(0, closeIdx);
  const suffix = raw.slice(closeIdx);

  let updated = prefix;
  if (!prefix.trimEnd().endsWith(",")) {
    updated += ",";
  }
  updated += "\n" + newEntries;
  updated += suffix;

  fs.writeFileSync(QUESTIONS_PATH, updated, "utf-8");
  console.log(
    `Appended ${newQuestions.length} questions to data/questions.ts`
  );
}

/** Save questions to a JSON file in pipeline/output/ as backup */
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
