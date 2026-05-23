/**
 * Mark Part 6 / Part 7 passage groups in question data files.
 *
 * Dry run:
 *   npx tsx src/mark-groups.ts
 *
 * Write changes:
 *   npx tsx src/mark-groups.ts --write
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const WRITE = process.argv.includes("--write");

type GroupType = "single" | "double" | "triple";

type QuestionBlock = {
  start: number;
  end: number;
  text: string;
  id: string;
  part: string;
  passage: string;
  existingType?: GroupType;
};

const TARGETS = [
  path.resolve(ROOT, "data/questions.ts"),
  path.resolve(ROOT, "data/questions-generated.ts"),
];

function decodeStringLiteral(value: string): string {
  return JSON.parse(`"${value.replace(/"/g, '\\"')}"`) as string;
}

function extractStringField(text: string, field: string): string | null {
  const pattern = new RegExp(
    `(?:${field}|"${field}")\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`,
    "s"
  );
  const match = text.match(pattern);
  return match ? decodeStringLiteral(match[1]) : null;
}

function extractGroupType(text: string): GroupType | undefined {
  const raw = extractStringField(text, "passage_group_type");
  return raw === "single" || raw === "double" || raw === "triple"
    ? raw
    : undefined;
}

function findQuestionBlocks(raw: string): QuestionBlock[] {
  const blocks: QuestionBlock[] = [];
  let inString = false;
  let escape = false;
  let depth = 0;
  let blockStart = -1;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];

    if (inString) {
      if (escape) {
        escape = false;
      } else if (ch === "\\") {
        escape = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === "{") {
      if (depth === 0) blockStart = i;
      depth++;
      continue;
    }

    if (ch === "}") {
      depth--;
      if (depth === 0 && blockStart >= 0) {
        const text = raw.slice(blockStart, i + 1);
        const id = extractStringField(text, "id");
        const part = extractStringField(text, "part");
        const passage = extractStringField(text, "passage");
        if (id && part && passage && (part === "Part 6" || part === "Part 7")) {
          blocks.push({
            start: blockStart,
            end: i + 1,
            text,
            id,
            part,
            passage,
            existingType: extractGroupType(text),
          });
        }
        blockStart = -1;
      }
    }
  }

  return blocks;
}

function removeExistingGroupFields(text: string): string {
  return text
    .replace(/\n\s*(?:"?passage_group_id"?|"?passage_group_type"?|"?passage_order"?|"?question_order"?)\s*:\s*[^,\n}]+,?/g, "")
    .replace(/,\s*}/g, "\n  }");
}

function appendGroupFields(
  text: string,
  groupId: string,
  groupType: GroupType | null,
  order: number
): string {
  const cleaned = removeExistingGroupFields(text).replace(/\s*$/, "");
  const closeIndex = cleaned.lastIndexOf("}");
  const beforeClose = cleaned.slice(0, closeIndex).replace(/\s*$/, "");
  const afterClose = cleaned.slice(closeIndex);
  const needsComma = !beforeClose.endsWith("{") && !beforeClose.endsWith(",");
  const fields = [
    `${needsComma ? "," : ""}`,
    `  passage_group_id: "${groupId}",`,
    ...(groupType ? [`  passage_group_type: "${groupType}",`] : []),
    `  question_order: ${order},`,
  ].join("\n");

  return `${beforeClose}\n${fields}\n${afterClose}`;
}

function makeGroupId(part: string, groupType: GroupType | null, index: number): string {
  const prefix =
    part === "Part 6"
      ? "p6"
      : groupType === "double"
        ? "p7-double"
        : groupType === "triple"
          ? "p7-triple"
          : "p7-single";
  return `${prefix}-${String(index).padStart(3, "0")}`;
}

const groupIndexes: Record<string, number> = {
  "Part 6": 0,
  single: 0,
  double: 0,
  triple: 0,
};

function processFile(filePath: string): void {
  const raw = fs.readFileSync(filePath, "utf8");
  const blocks = findQuestionBlocks(raw);
  const grouped = new Map<string, QuestionBlock[]>();

  for (const block of blocks) {
    const key = `${block.part}\n${block.passage}`;
    const list = grouped.get(key) ?? [];
    list.push(block);
    grouped.set(key, list);
  }

  const replacements = new Map<number, string>();

  for (const [, group] of grouped) {
    group.sort((a, b) => a.start - b.start);
    const part = group[0].part;
    const type =
      part === "Part 7"
        ? group.find((q) => q.existingType)?.existingType ?? "single"
        : null;
    const indexKey = part === "Part 6" ? "Part 6" : type!;
    groupIndexes[indexKey] += 1;
    const groupId = makeGroupId(part, type, groupIndexes[indexKey]);

    for (let i = 0; i < group.length; i++) {
      const block = group[i];
      replacements.set(
        block.start,
        appendGroupFields(block.text, groupId, type, i + 1)
      );
      console.log(
        `${path.basename(filePath)} ${block.id}: ${groupId}, order=${i + 1}${
          type ? `, type=${type}` : ""
        }`
      );
    }
  }

  let next = "";
  let cursor = 0;
  for (const block of blocks.sort((a, b) => a.start - b.start)) {
    next += raw.slice(cursor, block.start);
    next += replacements.get(block.start) ?? block.text;
    cursor = block.end;
  }
  next += raw.slice(cursor);

  console.log(
    `${path.relative(ROOT, filePath)}: ${blocks.length} questions, ${grouped.size} groups${
      WRITE ? " (written)" : " (dry-run)"
    }`
  );

  if (WRITE) {
    fs.writeFileSync(filePath, next);
  }
}

for (const target of TARGETS) {
  if (fs.existsSync(target)) {
    processFile(target);
  }
}
