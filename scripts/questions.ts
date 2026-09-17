import {
  readFileSync,
  writeFileSync,
  openSync,
  closeSync,
  rmSync,
} from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PART_LIST, type Part } from "../types/question";
import { createPackDraft } from "./questions/templates";
import { parseQuestionPack, BANK_ID_PATTERN } from "../lib/questions/pack";
import {
  assertRegistryCurrent,
  readManifest,
  renderRegistry,
  REGISTRY_PATH,
} from "./questions/registry";
import {
  assertQuestionSchemas,
  loadSources,
  reviewAddition,
  writePack,
} from "./questions/service";

const root = fileURLToPath(new URL("../", import.meta.url));
const [command, ...args] = process.argv.slice(2);
const help = `Question bank tools (run from repository root):
  npm run questions -- list
  npm run questions -- new <bank-id> <draft.json> [--part 1..7]
  npm run questions -- import <draft.json>           # validate + preview only
  npm run questions -- import <draft.json> --write   # register approved content
  npm run questions -- check                        # schemas + registry freshness
  npm run questions -- sync                         # regenerate static registry

Imports also check complete groups, global IDs, answer quality and vocabulary links.
New media still requires pipeline check-media; this tool does not publish or call AI.`;

async function main() {
  if (!command || command === "--help" || command === "help") {
    console.log(help);
    return;
  }
  if (command === "new") {
    const part = `Part ${args[3] ?? "5"}` as Part;
    if (
      !(args.length === 2 || (args.length === 4 && args[2] === "--part")) ||
      !BANK_ID_PATTERN.test(args[0]) ||
      !PART_LIST.includes(part)
    )
      throw new Error(
        "Usage: new <lowercase-bank-id> <draft.json> [--part 1..7]",
      );
    const draft = createPackDraft(args[0], part);
    writeFileSync(resolve(args[1]), `${JSON.stringify(draft, null, 2)}\n`, {
      flag: "wx",
    });
    console.log(
      `Created ${args[1]}. Add reviewed questions; see docs/QUESTION_BANKS.md for all seven Part templates.`,
    );
    return;
  }
  if (!["list", "check", "sync", "import"].includes(command))
    throw new Error(help);
  const writing =
    command === "sync" || (command === "import" && args.includes("--write"));
  if (
    command === "import"
      ? !(args.length === 1 || (args.length === 2 && args[1] === "--write")) ||
        args[0].startsWith("--")
      : args.length > 0
  )
    throw new Error(help);
  const lockPath = resolve(root, "data/.question-bank.lock");
  const lock = writing ? openSync(lockPath, "wx") : null;
  try {
    const entries = readManifest(root);
    const sources = await loadSources(root, entries);
    assertQuestionSchemas(sources);
    if (command === "sync") {
      writeFileSync(resolve(root, REGISTRY_PATH), renderRegistry(entries));
      console.log(`Registry regenerated for ${sources.length} banks.`);
      return;
    }
    assertRegistryCurrent(root, entries);
    if (command === "list")
      console.table(
        sources.map(({ id, title, questions }) => ({
          id,
          title,
          questions: questions.length,
        })),
      );
    if (command === "check")
      console.log(
        `Question registry + schemas passed: ${sources.length} banks, ${sources.reduce((sum, source) => sum + source.questions.length, 0)} questions.`,
      );
    if (command === "import") {
      const pack = parseQuestionPack(
        JSON.parse(readFileSync(resolve(args[0]), "utf8")),
      );
      console.log(JSON.stringify(reviewAddition(pack, sources), null, 2));
      if (writing) {
        writePack(root, pack, entries);
        console.log(
          `Registered data/question-packs/${pack.id}.json. Run npm run verify and media checks before deployment.`,
        );
      } else
        console.log(
          "Preview passed; no files changed. Add --write to register this bank.",
        );
    }
  } finally {
    if (lock !== null) {
      closeSync(lock);
      rmSync(lockPath);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
