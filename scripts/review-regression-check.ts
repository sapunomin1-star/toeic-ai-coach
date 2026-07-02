import { strict as assert } from "node:assert";
import type { AnswerRecord, SkillTag } from "../types/question";

// ─── localStorage stub (same approach as repro-c1.ts) ───────────────────────

class MemoryLocalStorage {
  private readonly data = new Map<string, string>();
  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
  removeItem(key: string): void {
    this.data.delete(key);
  }
  clear(): void {
    this.data.clear();
  }
}

const localStorageMock = new MemoryLocalStorage();
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});
Object.defineProperty(globalThis, "window", {
  value: { localStorage: localStorageMock },
  configurable: true,
});
Object.defineProperty(globalThis, "alert", {
  value: () => {},
  configurable: true,
});

// ─── helpers ─────────────────────────────────────────────────────────────────

let recSeq = 0;
function rec(
  skill: SkillTag,
  questionId: string,
  isCorrect: boolean,
  minutesAgo: number,
  source?: "daily" | "mock",
): AnswerRecord {
  recSeq++;
  return {
    questionId,
    userAnswer: "A",
    correctAnswer: isCorrect ? "A" : "B",
    isCorrect,
    skill_tag: skill,
    answeredAt: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
    ...(source ? { source } : {}),
  };
}

function localDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function main(): Promise<void> {
  // ── 1. Part attribution: Part 5 stats must use the id prefix, not skill
  //       tags — 87 Part 6 questions carry grammar tags and used to leak in.
  const analysis = await import("../lib/analysis");

  const attribution: AnswerRecord[] = [
    rec("word_form", "p5-x-001", true, 50),
    rec("word_form", "p6-a-001", false, 40), // P6 with a grammar tag
    rec("business_vocabulary", "p6-b-002", true, 30), // P6 with a vocab tag
    rec("reading_detail", "p7-c-003", false, 20),
    rec("word_form", "p5-mock-004", false, 10, "mock"), // mock excluded
  ];
  assert.equal(
    analysis.countPart5Attempts(attribution),
    1,
    "Part 5 attempts must count only p5- records (P6 grammar tags excluded)",
  );
  assert.equal(
    analysis.calculatePart5Accuracy(attribution),
    100,
    "Part 5 accuracy must ignore the wrong P6 answer",
  );
  assert.equal(analysis.countPart6Attempts(attribution), 2);
  assert.equal(analysis.calculatePart6Accuracy(attribution), 50);

  // ── 2. Weakness ranking: recent error rate with a minimum sample, not
  //       lifetime mistake count. 5/6 wrong must outrank 8/20 wrong; a 2/2
  //       skill (too few samples) ranks after the qualified ones.
  const weakness: AnswerRecord[] = [];
  // word_form: 25 attempts — newest 20 have 8 wrong, oldest 5 all wrong
  // (outside the window; must not count).
  for (let i = 0; i < 20; i++) {
    weakness.push(rec("word_form", `p5-wf-${i}`, i >= 8, 100 + i));
  }
  for (let i = 0; i < 5; i++) {
    weakness.push(rec("word_form", `p5-wf-old-${i}`, false, 10_000 + i));
  }
  // tense: 6 attempts, 5 wrong → 83% error rate.
  for (let i = 0; i < 6; i++) {
    weakness.push(rec("tense", `p5-ts-${i}`, i === 0, 200 + i));
  }
  // preposition: 2 attempts, 2 wrong → below the minimum sample.
  weakness.push(rec("preposition", "p5-pr-0", false, 300));
  weakness.push(rec("preposition", "p5-pr-1", false, 301));

  const ranked = analysis.getWeakestSkills(weakness, 3);
  assert.deepEqual(
    ranked.map((r) => r.skill),
    ["tense", "word_form", "preposition"],
    "rate-qualified skills first (by error rate), low-sample skills appended",
  );
  assert.equal(
    ranked[1].mistakes,
    8,
    "window must cap word_form mistakes at the recent 20 attempts (8, not 13)",
  );

  // ── 3. Daily plan prefers unanswered questions and falls back gracefully.
  const { buildDailyPlan, QUESTIONS } = await import("../data/questions");

  const part5 = QUESTIONS.filter((q) => q.part === "Part 5");
  const answeredExceptWordForm = new Set(
    part5.filter((q) => q.skill_tag !== "word_form").map((q) => q.id),
  );
  const plan = buildDailyPlan({
    weakSkillTags: ["word_form"],
    answeredIds: answeredExceptWordForm,
  });
  const p5Picks = plan.questions.filter((q) => q.id.startsWith("p5-"));
  assert.equal(p5Picks.length, 15, "default plan carries 8 weak + 7 new P5 questions");
  for (const q of p5Picks) {
    assert.ok(
      !answeredExceptWordForm.has(q.id),
      `plan must prefer unanswered questions, got repeat ${q.id}`,
    );
  }

  const everything = new Set(QUESTIONS.map((q) => q.id));
  const fallbackPlan = buildDailyPlan({ answeredIds: everything });
  assert.equal(fallbackPlan.counts.weak, 8, "exhausted bank must still fill weak slots");
  assert.equal(fallbackPlan.counts.new, 7, "exhausted bank must still fill new slots");
  assert.equal(fallbackPlan.counts.reading, 3);
  assert.equal(fallbackPlan.counts.part3, 3);

  // ── 4. Wrong-book SRS: a correct answer BEFORE the interval elapsed must
  //       not advance the ladder (same-day drilling used to reach "mastered").
  const { STORAGE_KEYS } = await import("../lib/storageCore");
  const { getWrongStatusMap, updateWrongStatus } = await import("../lib/storage");

  localStorageMock.clear();
  updateWrongStatus("q1", false);
  let entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 1);
  assert.equal(entry.nextReviewDate, localDate(1));

  updateWrongStatus("q1", true); // same-day drill — not due yet
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 1, "early correct must not climb the interval");
  assert.equal(entry.consecutiveCorrect, 0, "early correct must not count toward mastery");
  assert.equal(entry.status, "new");

  function forceDue(): void {
    const map = getWrongStatusMap();
    map["q1"].nextReviewDate = localDate(-1);
    localStorageMock.setItem(STORAGE_KEYS.wrongStatus, JSON.stringify(map));
  }

  forceDue();
  updateWrongStatus("q1", true); // first spaced success
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 3);
  assert.equal(entry.status, "improving");
  assert.equal(entry.consecutiveCorrect, 1);

  forceDue();
  updateWrongStatus("q1", true); // second spaced success → mastered
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 7);
  assert.equal(entry.status, "mastered");
  assert.equal(entry.consecutiveCorrect, 2);

  updateWrongStatus("q1", false); // lapse always applies immediately
  entry = getWrongStatusMap()["q1"];
  assert.equal(entry.intervalDays, 1);
  assert.equal(entry.status, "reviewing");
  assert.equal(entry.consecutiveCorrect, 0);

  console.log(`Review regression checks passed (${recSeq} synthetic records)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
