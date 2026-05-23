#!/usr/bin/env npx tsx

import { QUESTIONS } from "../data/questions";
import {
  printIntegrityReport,
  runIntegrityCheck,
} from "./src/integrity";

const report = runIntegrityCheck(QUESTIONS);
printIntegrityReport(report);

if (!report.passed) {
  process.exit(1);
}
