#!/usr/bin/env npx tsx

import { fileURLToPath } from "node:url";
import { QUESTIONS } from "../data/questions";
import {
  printIntegrityReport,
  runIntegrityCheck,
} from "./src/integrity";
import {
  VOCABULARY_LINK_BASELINE_FILE,
  checkVocabularyLinks,
} from "./src/vocabulary-links";

const report = runIntegrityCheck(QUESTIONS);
printIntegrityReport(report);

// Question-term teaching links (review F02): ratchets the known debt down.
const links = checkVocabularyLinks(QUESTIONS, {
  baselinePath: fileURLToPath(new URL(VOCABULARY_LINK_BASELINE_FILE, import.meta.url)),
  updateBaseline: process.argv.includes("--update-baseline"),
});

if (!report.passed || !links.passed) {
  process.exit(1);
}
