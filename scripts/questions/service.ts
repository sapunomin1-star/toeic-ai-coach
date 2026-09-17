import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { QuestionBankSource } from "../../lib/questions/catalog";
import { createQuestionCatalog } from "../../lib/questions/catalog";
import { parseQuestionPack, type QuestionPack } from "../../lib/questions/pack";
import { validateQuestion } from "../../lib/questions/validation";
import { runIntegrityCheck } from "../../pipeline/src/integrity";
import { buildVocabularyLinkReport } from "../../pipeline/src/vocabulary-links";
import {
  MANIFEST_PATH,
  REGISTRY_PATH,
  readManifest,
  renderRegistry,
  type BankEntry,
} from "./registry";

export async function loadSources(
  root: string,
  entries = readManifest(root),
): Promise<QuestionBankSource[]> {
  const sources: QuestionBankSource[] = [];
  for (const entry of entries) {
    const file = resolve(root, "data", entry.file);
    if (entry.exportName) {
      const bankModule = await import(pathToFileURL(file).href);
      if (!Array.isArray(bankModule[entry.exportName]))
        throw new Error(
          `Missing bank export: ${entry.file} ${entry.exportName}`,
        );
      sources.push({
        id: entry.id,
        title: entry.title,
        questions: bankModule[entry.exportName],
      });
    } else {
      const pack = parseQuestionPack(JSON.parse(readFileSync(file, "utf8")));
      if (pack.id !== entry.id || pack.title !== entry.title)
        throw new Error(`Manifest and pack metadata differ: ${entry.file}`);
      sources.push(pack);
    }
  }
  return sources;
}

export function assertQuestionSchemas(sources: QuestionBankSource[]): void {
  const errors = sources.flatMap((source) =>
    source.questions.flatMap((q, index) => validateQuestion(q, index).errors),
  );
  if (errors.length) throw new Error(errors.join("\n"));
  createQuestionCatalog(sources); // Reject duplicate bank/question IDs, including legacy sources.
  const owners = new Map<string, string>();
  for (const source of sources) {
    for (const q of source.questions) {
      const key = q.passage_group_id
        ? `passage:${q.passage_group_id}`
        : q.part === "Part 3" || q.part === "Part 4"
          ? `${q.part}:${q.transcript}`
          : null;
      if (!key) continue;
      const owner = owners.get(key);
      if (owner && owner !== source.id)
        throw new Error(
          `[${q.id}] passage_group_id or transcript already belongs to bank ${owner}`,
        );
      owners.set(key, source.id);
    }
  }
}

/** Read-only review, reused by CLI and import regression tests. */
export function reviewAddition(
  pack: QuestionPack,
  sources: QuestionBankSource[],
) {
  pack = parseQuestionPack(pack);
  assertQuestionSchemas([...sources, pack]);
  const existing = sources.flatMap((source) => source.questions);
  const integrity = runIntegrityCheck([...existing, ...pack.questions]);
  if (!integrity.passed) {
    const failures = Object.entries(integrity).filter(
      ([, value]) => Array.isArray(value) && value.length > 0,
    );
    throw new Error(
      `Combined bank quality check failed:\n${failures.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n")}`,
    );
  }
  const links = buildVocabularyLinkReport(pack.questions, new Set());
  if (!links.passed)
    throw new Error(
      `Add teaching definitions before importing:\n${links.newDebt.join("\n")}`,
    );
  const byPart: Record<string, number> = {};
  const answers: Record<string, Record<string, number>> = {};
  for (const q of pack.questions) {
    byPart[q.part] = (byPart[q.part] ?? 0) + 1;
    answers[q.part] ??= {};
    answers[q.part][q.answer] = (answers[q.part][q.answer] ?? 0) + 1;
  }
  return {
    id: pack.id,
    title: pack.title,
    questions: pack.questions.length,
    byPart,
    answers,
    supportedTerms: links.references,
  };
}

/** Add only: never overwrite an existing bank or renumber an existing question. */
export function writePack(
  root: string,
  pack: QuestionPack,
  entries: BankEntry[],
): void {
  const manifestPath = resolve(root, MANIFEST_PATH);
  const registryPath = resolve(root, REGISTRY_PATH);
  const previousManifest = readFileSync(manifestPath, "utf8");
  const previousRegistry = readFileSync(registryPath, "utf8");
  if (JSON.stringify(readManifest(root)) !== JSON.stringify(entries))
    throw new Error("Manifest changed during import; review again");
  const file = `question-packs/${pack.id}.json`;
  const target = resolve(root, "data", file);
  if (
    existsSync(target) ||
    entries.some((entry) => entry.id === pack.id || entry.file === file)
  )
    throw new Error(`Bank already exists: ${pack.id}`);
  const updated = [...entries, { id: pack.id, title: pack.title, file }];
  mkdirSync(dirname(target), { recursive: true });
  // Exclusive creation protects existing content. Restore metadata on ordinary I/O failure.
  writeFileSync(target, `${JSON.stringify(pack, null, 2)}\n`, { flag: "wx" });
  try {
    writeFileSync(manifestPath, `${JSON.stringify(updated, null, 2)}\n`);
    writeFileSync(registryPath, renderRegistry(updated));
  } catch (error) {
    writeFileSync(manifestPath, previousManifest);
    writeFileSync(registryPath, previousRegistry);
    rmSync(target);
    throw error;
  }
}
