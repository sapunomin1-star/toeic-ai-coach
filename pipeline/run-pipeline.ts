#!/usr/bin/env npx tsx
/**
 * TOEIC Question Generation Pipeline — Main Entry Point
 *
 * Usage:
 *   npx tsx run-pipeline.ts                          # Full run
 *   npx tsx run-pipeline.ts --part=7 --count=7:1     # Part 7, 1 passage
 *   npx tsx run-pipeline.ts --dry-run                 # Validate without writing
 *   npx tsx run-pipeline.ts --skip-kimi               # Skip Kimi review
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { checkConfig } from "./src/config";
import { matchDiversePatterns } from "./src/pattern-matcher";
import { generatePart1 } from "./src/generator-part1";
import { generatePart2 } from "./src/generator-part2";
import { generatePart5 } from "./src/generator-part5";
import { generatePart6 } from "./src/generator-part6";
import { generatePart7 } from "./src/generator-part7";
import {
  appendQuestions,
  generateNextIds,
  saveToJson,
} from "./src/questions-writer";
import type {
  PatternLibrary,
  RawGeneratedQuestion,
  PipelineConfig,
} from "./src/types";

// ─── Parse CLI Args ─────────────────────────────────────────────────────────

function parseArgs(): PipelineConfig {
  const args = process.argv.slice(2);
  const getArgValue = (name: string): string | undefined => {
    const equalsArg = args.find((a) => a.startsWith(`${name}=`));
    if (equalsArg) return equalsArg.split("=")[1];
    const idx = args.indexOf(name);
    return idx >= 0 ? args[idx + 1] : undefined;
  };
  const partArg = getArgValue("--part");
  const countArg = getArgValue("--count");

  const parts = partArg
    ? partArg.split(",")
    : ["5", "6", "7"];

  const countMap: Record<string, number> = {
    "1": 10,
    "2": 10,
    "5": 20,
    "6": 2,
    "7": 5,
  };

  // --count=7:1 means Part 7, 1 passage
  if (countArg) {
    const val = countArg;
    if (val.includes(":")) {
      const [p, n] = val.split(":");
      if (p && n) countMap[p] = parseInt(n, 10);
    } else {
      const n = parseInt(val, 10);
      if (!Number.isNaN(n)) {
        for (const p of parts) countMap[p] = n;
      }
    }
  }

  return {
    part: parts,
    count: countMap,
    dryRun: args.includes("--dry-run"),
    skipKimi: args.includes("--skip-kimi"),
  };
}

// ─── Load Patterns ───────────────────────────────────────────────────────────

function loadPatterns(part: string): PatternLibrary {
  const fileMap: Record<string, string> = {
    "5": "part5-patterns.json",
    "6": "part6-patterns.json",
    "7": "part7-patterns.json",
  };
  const file = fileMap[part];
  if (!file) throw new Error(`Unknown part: ${part}`);
  const filePath = path.resolve(__dirname, "patterns", file);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as PatternLibrary;
}

// ─── Assign IDs to Generated Questions ───────────────────────────────────────

function assignIds(questions: RawGeneratedQuestion[]): void {
  // Group by part, assign IDs in batch
  const groups = new Map<string, RawGeneratedQuestion[]>();
  for (const q of questions) {
    const key = q.part ?? "Unknown";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(q);
  }

  const idPrefixes: Record<string, string> = {
    "Part 5": "p5-gen-",
    "Part 6": "p6-gen-",
    "Part 7": "p7-gen-",
  };

  for (const [part, qs] of groups) {
    const prefix = idPrefixes[part] ?? "gen-";
    const ids = generateNextIds(prefix, qs.length);
    for (let i = 0; i < qs.length; i++) {
      qs[i].id = ids[i];
    }
  }
}

// ─── Main Pipeline ───────────────────────────────────────────────────────────

async function run(): Promise<void> {
  const args = parseArgs();

  console.log("========================================");
  console.log("  TOEIC Question Generation Pipeline");
  console.log("========================================");
  console.log(`  Parts: ${args.part.join(", ")} | Dry run: ${args.dryRun}`);
  console.log(
    `  Counts: P1=${args.count["1"]} P2=${args.count["2"]} P5=${args.count["5"]} P6=${args.count["6"]} P7=${args.count["7"]}`
  );
  console.log(`  Skip Kimi: ${args.skipKimi}`);
  console.log("========================================\n");

  // Check API keys
  const configErrors = checkConfig();
  if (configErrors.length > 0) {
    console.error("Configuration errors:");
    for (const err of configErrors) console.error(`  - ${err}`);
    process.exit(1);
  }

  const allGenerated: RawGeneratedQuestion[] = [];
  const draftOnlyGenerated: RawGeneratedQuestion[] = [];

  // ─── Part 1 ────────────────────────────────────────────────────────────
  if (args.part.includes("1") && args.count["1"] > 0) {
    console.log("── Part 1 Generation ──");
    try {
      const questions = await generatePart1(args.count["1"]);
      console.log(`  Generated ${questions.length} draft questions`);
      draftOnlyGenerated.push(...questions);
    } catch (e) {
      console.error(`  Error: ${(e as Error).message.slice(0, 300)}`);
    }
  }

  // ─── Part 2 ────────────────────────────────────────────────────────────
  if (args.part.includes("2") && args.count["2"] > 0) {
    console.log("\n── Part 2 Generation ──");
    try {
      const questions = await generatePart2(args.count["2"]);
      console.log(`  Generated ${questions.length} draft questions`);
      draftOnlyGenerated.push(...questions);
    } catch (e) {
      console.error(`  Error: ${(e as Error).message.slice(0, 300)}`);
    }
  }

  // ─── Part 5 ────────────────────────────────────────────────────────────
  if (args.part.includes("5") && args.count["5"] > 0) {
    console.log("── Part 5 Generation ──");
    const library = loadPatterns("5");
    const patterns = matchDiversePatterns(
      library,
      "Part 5",
      Math.min(args.count["5"], library.patterns.length)
    );

    for (const pattern of patterns) {
      console.log(
        `\n📝 Pattern: ${pattern.pattern_id} (${pattern.subtype})`
      );
      try {
        const questions = await generatePart5(
          pattern,
          3,
          { skipKimi: args.skipKimi }
        );
        console.log(`  Generated ${questions.length} questions`);
        allGenerated.push(...questions);
      } catch (e) {
        console.error(
          `  Error: ${(e as Error).message.slice(0, 300)}`
        );
      }
    }
  }

  // ─── Part 6 ────────────────────────────────────────────────────────────
  if (args.part.includes("6") && args.count["6"] > 0) {
    console.log("\n── Part 6 Generation ──");
    const library = loadPatterns("6");
    const count = args.count["6"];

    for (let i = 0; i < count && i < library.patterns.length; i++) {
      const pattern = library.patterns[i];
      console.log(
        `\n📝 Pattern: ${pattern.pattern_id} (${pattern.subtype})`
      );
      try {
        const questions = await generatePart6(pattern, {
          skipKimi: args.skipKimi,
        });
        console.log(
          `  Generated ${questions.length} questions (1 passage)`
        );
        allGenerated.push(...questions);
      } catch (e) {
        console.error(
          `  Error: ${(e as Error).message.slice(0, 300)}`
        );
      }
    }
  }

  // ─── Part 7 ────────────────────────────────────────────────────────────
  if (args.part.includes("7") && args.count["7"] > 0) {
    console.log("\n── Part 7 Generation ──");
    const library = loadPatterns("7");
    const patterns = matchDiversePatterns(
      library,
      "Part 7",
      Math.min(args.count["7"], library.patterns.length)
    );

    for (const pattern of patterns) {
      console.log(
        `\n📝 Pattern: ${pattern.pattern_id} (${pattern.document_type}/${pattern.subtype})`
      );
      try {
        const questions = await generatePart7(pattern, {
          skipKimi: args.skipKimi,
        });
        console.log(
          `  Generated ${questions.length} questions (1 passage)`
        );
        allGenerated.push(...questions);
      } catch (e) {
        console.error(
          `  Error: ${(e as Error).message.slice(0, 300)}`
        );
      }
    }
  }

  // ─── Summary ───────────────────────────────────────────────────────────
  console.log("\n========================================");
  console.log("  Generation Summary");
  console.log("========================================");

  const byPart = new Map<string, RawGeneratedQuestion[]>();
  for (const q of [...draftOnlyGenerated, ...allGenerated]) {
    const key = q.part ?? "Unknown";
    if (!byPart.has(key)) byPart.set(key, []);
    byPart.get(key)!.push(q);
  }

  for (const [part, qs] of byPart) {
    console.log(`  ${part}: ${qs.length} questions`);
  }
  console.log(`  Total: ${draftOnlyGenerated.length + allGenerated.length} questions`);
  console.log("========================================\n");

  if (allGenerated.length === 0) {
    if (draftOnlyGenerated.length > 0) {
      console.log("Draft listening output saved to pipeline/output. No app data appended.");
      return;
    }
    console.log("No questions generated. Exiting.");
    return;
  }

  // Assign IDs
  assignIds(allGenerated);

  // Save to output JSON (always)
  saveToJson(
    allGenerated as unknown as Record<string, unknown>[],
    `generated-${Date.now()}.json`
  );

  // Write to questions.ts
  appendQuestions(
    allGenerated as unknown as Record<string, unknown>[],
    args.dryRun
  );

  console.log("\nDone!");
}

run().catch((e) => {
  console.error("Pipeline failed:", e);
  process.exit(1);
});
