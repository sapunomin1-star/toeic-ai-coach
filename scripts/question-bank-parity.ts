/** Audit fingerprint, not a frozen test baseline: intentional bank additions change it.
 * Compare this output across revisions to verify behavior-preserving refactors.
 */
import { createHash } from "node:crypto";
import {
  QUESTIONS,
  buildDailyPlan,
  buildMockTestPlan,
  buildListeningMockPlan,
  queryQuestions,
} from "../data/questions";
const hash = (v: unknown) =>
  createHash("sha256").update(JSON.stringify(v)).digest("hex");
const scenarios: unknown[] = [];
const originalRandom = Math.random;
for (let seed = 1; seed <= 25; seed++) {
  let state = seed;
  Math.random = () =>
    (state = (1664525 * state + 1013904223) >>> 0) / 4294967296;
  const seen = new Set(
    QUESTIONS.filter((_, i) => i % 3 === 0).map((q) => q.id),
  );
  scenarios.push(
    buildDailyPlan(),
    buildDailyPlan({
      answeredIds: seen,
      reviewIds: [...seen].slice(0, 3),
      focusSkills: ["reading_inference", "listening_detail"],
      weakSkillTags: ["tense"],
    }),
    buildMockTestPlan(seen),
    buildListeningMockPlan(seen),
  );
}
Math.random = originalRandom;
console.log(
  JSON.stringify(
    {
      questions: QUESTIONS.length,
      content: hash(QUESTIONS),
      selection: hash(scenarios),
      filters: hash(
        queryQuestions({ categories: ["grammar"], difficulties: ["B1"] }),
      ),
    },
    null,
    2,
  ),
);
