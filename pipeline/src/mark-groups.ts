/**
 * One-off script: mark Part 7 passage groups in data/questions.ts.
 * Run: npx tsx src/mark-groups.ts
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const QUESTIONS_PATH = path.resolve(__dirname, "../../data/questions.ts");
const raw = fs.readFileSync(QUESTIONS_PATH, "utf-8");

// Extract passage from a question object text
function extractPassage(qText: string): string | null {
  const m = qText.match(/(?:passage|"passage"):\s*"((?:[^"\\]|\\.)*)"/s);
  if (!m) return null;
  return m[1].replace(/\n/g, " ").trim();
}

// Extract id from a question object text
function extractId(qText: string): string | null {
  const m = qText.match(/(?:id|"id"):\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// Extract part from a question object text
function extractPart(qText: string): string | null {
  const m = qText.match(/(?:part|"part"):\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// Split the file into individual question objects
// Find the QUESTIONS array
const arrayStart = raw.indexOf("export const QUESTIONS");
if (arrayStart === -1) throw new Error("QUESTIONS not found");

// Find all question objects for Part 7
const part7Regex = /(\{[^}]*?(?:part|"part"):\s*"Part 7"[^}]*\})/gs;
const matches = [...raw.matchAll(part7Regex)];

if (matches.length === 0) {
  console.log("No Part 7 questions found.");
  process.exit(0);
}

// Build passage -> question map
const passageMap = new Map<string, { id: string; start: number; end: number }[]>();

for (const m of matches) {
  const qText = m[0];
  const passage = extractPassage(qText);
  const id = extractId(qText);
  if (!passage || !id) continue;

  // Normalize passage for grouping (remove minor whitespace diffs)
  const key = passage.slice(0, 200);

  if (!passageMap.has(key)) passageMap.set(key, []);
  passageMap.get(key)!.push({
    id,
    start: m.index,
    end: m.index + m[0].length,
  });
}

console.log(`Found ${passageMap.size} unique Part 7 passage groups.`);

// Assign groups
let groupNum = 1;
const skillOrder: Record<string, number> = {
  reading_main_idea: 1,
  reading_detail: 2,
  reading_inference: 3,
};

for (const [, qs] of passageMap) {
  const groupId = `grp-${String(groupNum).padStart(3, "0")}`;
  for (const q of qs) {
    // Find the question text
    const qText = raw.slice(q.start, q.end);
    // Determine skill to set question_order
    let order = qs.indexOf(q) + 1; // fallback
    for (const [skill, n] of Object.entries(skillOrder)) {
      if (qText.includes(skill)) {
        order = n;
        break;
      }
    }

    // Insert group metadata before passage field if not already present
    const hasGroupId = qText.includes("passage_group_id");
    if (hasGroupId) {
      console.log(`  ${q.id}: already has group_id, skipping`);
      continue;
    }

    console.log(`  ${q.id}: group=${groupId}, order=${order}`);
  }
  groupNum++;
}

console.log("\nDone scanning. Now generating update script...");
console.log(`Groups to create: ${passageMap.size} (all single-type)`);
console.log("Run with --write to actually modify the file.");
