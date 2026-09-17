import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Separate processes keep browser/storage mocks isolated. One installed tsx version,
// no npx downloads during tests; add each behavior suite here.
const checks = [
  "repro-c1",
  "review-regression-check",
  "integrity-guard-check",
  "sync-merge-check",
  "sync-status-check",
  "sync-server-check",
  "study-coach-check",
  "learning-quality-check",
  "remediation-review-check",
  "content-release-check",
  "question-bank-check",
];
for (const check of checks) {
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", `scripts/${check}.ts`],
    {
      cwd: fileURLToPath(new URL("../", import.meta.url)),
      stdio: "inherit",
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log(`All ${checks.length} check suites passed.`);
