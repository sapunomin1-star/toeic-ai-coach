/** Follow-up review regressions. Synthetic storage only; no learner data or network. */
import { strict as assert } from "node:assert";
import type { AnswerRecord } from "../types/question";
import { QUESTIONS, buildDailyPlan } from "../data/questions";
import { buildPacingReport, studyGroupTiming } from "../lib/pacing";
import { createStudyClock } from "../lib/studyClock";
import { getSkillEvidence } from "../lib/analysis";
import { STORAGE_KEYS } from "../lib/storageCore";
import { saveAnswer, getAnswerRecords, getEvidenceRecords, sanitizeBackupValue } from "../lib/storage";
import * as vocab from "../lib/vocabularyStorage";
import * as queue from "../lib/vocabularyQueue";
import { mergeKey } from "../lib/syncMerge";

class MemoryStorage {
  data = new Map<string, string>();
  failKey: string | null = null;
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) {
    if (key === this.failKey) throw new Error("Synthetic storage failure");
    this.data.set(key, value);
  }
  removeItem(key: string) { this.data.delete(key); }
  clear() { this.data.clear(); this.failKey = null; }
}
const memory = new MemoryStorage();
Object.defineProperty(globalThis, "localStorage", { value: memory, configurable: true });
Object.defineProperty(globalThis, "window", { value: globalThis, configurable: true });
Object.defineProperty(globalThis, "alert", { value: () => {}, configurable: true });

function record(index: number, overrides: Partial<AnswerRecord> = {}): AnswerRecord {
  return { questionId: `p5-review-${index}`, userAnswer: "A", correctAnswer: "A", isCorrect: true,
    skill_tag: "word_form", source: "daily", answeredAt: new Date(Date.UTC(2026, 8, 17, 0, index)).toISOString(),
    timing: { activeMs: 20_000, hiddenMs: 0 }, ...overrides };
}
function day(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function main() {
  await vocab.loadVocabularyBank();
  let failures = 0;
  const check = (name: string, fn: () => void) => {
    memory.clear();
    try { fn(); console.log(`PASS ${name}`); }
    catch (error) { failures++; console.error(`FAIL ${name}: ${error instanceof Error ? error.message : error}`); }
  };
  check("playback timing excludes hidden overlap and counts replays", () => {
    const clock = createStudyClock();
    clock.start(0);
    clock.setAudioPlaying("conversation", true, 10_000);
    clock.setHidden(true, 15_000);
    clock.setHidden(false, 25_000);
    clock.setAudioPlaying("conversation", false, 30_000);
    clock.setAudioPlaying("conversation", true, 40_000);
    clock.setAudioPlaying("conversation", false, 50_000);
    assert.deepEqual(clock.finish(60_000), { activeMs: 50_000, hiddenMs: 10_000, audioMs: 20_000, wallMs: 60_000 });
  });
  check("shared audio and stem audio survive question changes without double counting", () => {
    const clock = createStudyClock();
    clock.start(0);
    clock.setAudioPlaying("conversation", true, 1000);
    clock.finish(5000);
    clock.start(10_000);
    clock.setAudioPlaying("stem", true, 12_000);
    clock.setAudioPlaying("conversation", false, 14_000);
    clock.setAudioPlaying("stem", false, 15_000);
    assert.equal(clock.finish(20_000).audioMs, 5000);
  });
  check("Part 6 and Part 7 use complete passage identities at capture time", () => {
    for (const part of ["Part 6", "Part 7"] as const) {
      const question = QUESTIONS.find(q => q.part === part)!;
      const bank = QUESTIONS.filter(q => q.part === part);
      const metadata = studyGroupTiming(question, bank, [question]);
      assert.ok((metadata.groupSize ?? 0) >= 2);
      assert.ok(metadata.groupId?.includes(question.id));
    }
  });
  check("repeated questions cannot inflate pacing samples", () => {
    const rows = Array.from({ length: 10 }, (_, i) => record(i, { questionId: "p5-same" }));
    const result = buildPacingReport(rows).rows.find(r => r.part === "Part 5");
    assert.equal(result?.sample, 1);
    assert.equal(result?.status, "insufficient");
  });
  check("different passage groups cannot be joined across sessions", () => {
    const rows = [0, 1].map(i => record(i, { questionId: `p7-different-${i}`, skill_tag: "reading_detail",
      timing: Object.assign({ activeMs: 60_000, hiddenMs: 0, groupIndex: i, groupSize: 2 }, { groupId: `group-${i}`, sessionId: `session-${i}` }) }));
    assert.equal(buildPacingReport(rows, { minSample: 1 }).rows.find(r => r.part === "Part 7")?.sample, 0);
  });
  check("complete passage averages reading time; legacy listening is excluded", () => {
    const rows = [0, 1].map(i => record(i, { questionId: `p7-same-${i}`, skill_tag: "reading_detail",
      timing: { activeMs: i === 0 ? 100_000 : 20_000, hiddenMs: 0, groupIndex: i, groupSize: 2, groupId: "passage", sessionId: "session" } }));
    const report = buildPacingReport([...rows, record(2, { questionId: "p2-old", timing: { activeMs: 30_000, hiddenMs: 0, audioMs: 25_000 } })], { minSample: 1 });
    assert.equal(report.rows.find(r => r.part === "Part 7")?.medianMs, 60_000);
    assert.equal(report.rows.find(r => r.part === "Part 7")?.sample, 2);
    assert.equal(report.rows.find(r => r.part === "Part 2")?.sample, 0);
  });
  check("mock exposure followed by review is not fresh skill evidence", () => {
    const first = record(0, { source: "mock", isCorrect: false, correctAnswer: "B" });
    const repeat = record(1, { questionId: first.questionId, attempt: { first: false, plan: "wrongbook" } });
    assert.equal(getSkillEvidence([first, repeat]).length, 0);
  });
  check("pre-revision answers cannot drive coaching", () => {
    memory.setItem(STORAGE_KEYS.answerRecords, JSON.stringify([record(0, { questionId: "p2-gen-179", skill_tag: "listening_response" })]));
    assert.equal(getEvidenceRecords().length, 0);
    memory.setItem(STORAGE_KEYS.answerRecords, JSON.stringify([record(0, { questionId: "p2-gen-179", skill_tag: "listening_response", answeredAt: "2027-01-01T00:00:00.000Z" })]));
    assert.equal(getEvidenceRecords().length, 0, "late saves from a cached old client must not count");
    const late = getAnswerRecords()[0];
    memory.clear();
    assert.ok(saveAnswer(late));
    const stamped = getAnswerRecords()[0];
    assert.ok(stamped.contentRevision, "current client must stamp the answered content version");
    assert.equal(getEvidenceRecords().length, 1, "current-version answers must count");
    const imported = sanitizeBackupValue(STORAGE_KEYS.answerRecords, [stamped]) as AnswerRecord[];
    assert.equal(imported[0].contentRevision, stamped.contentRevision, "backup/import must retain the version");
    memory.setItem(STORAGE_KEYS.answerRecords, JSON.stringify([{ ...stamped, contentRevision: "old-version" }]));
    assert.equal(getEvidenceRecords().length, 0, "a different explicit version cannot count");
  });
  check("exhausted focus pool does not advertise repeats as new questions", () => {
    const plan = buildDailyPlan({ answeredIds: new Set(QUESTIONS.map(q => q.id)), focusSkills: ["reading_inference"] });
    assert.equal(plan.focus.matched.reading_inference ?? 0, 0);
    assert.ok(!/排入 \d+ 題新題/.test(plan.focus.note), plan.focus.note);
  });
  check("question sense must not schedule a card teaching another sense", () => {
    assert.ok(vocab.enqueueQuestionTerm("issue", "p3-ext-007"));
    const entry = queue.getVocabularyQueue()[0];
    assert.ok(entry.meaning_zh?.includes("問題"));
    assert.equal(entry.wordId, undefined);
  });
  check("same spelling with different meanings keeps separate study requests", () => {
    queue.upsertVocabularyQueueEntry({ term: "issue", questionId: "q1", meaning_zh: "問題", partOfSpeech: "noun" });
    queue.upsertVocabularyQueueEntry({ term: "issue", questionId: "q2", meaning_zh: "發布", partOfSpeech: "verb" });
    assert.equal(queue.getVocabularyQueue().length, 2);
    const noun = queue.getVocabularyQueue().find(e => e.partOfSpeech === "noun")!;
    assert.ok(queue.dismissVocabularyQueueTerm(noun.key));
    assert.deepEqual(queue.getVocabularyQueue().map(e => e.partOfSpeech), ["verb"]);
  });
  check("same-millisecond dismissal survives synchronization", () => {
    const entry = { key: "alpha", term: "alpha", questionId: "q1", addedAt: "2026-09-17T00:00:00.000Z" };
    const merged = mergeKey(STORAGE_KEYS.vocabularyQueue, [entry], [{ ...entry, dismissedAt: entry.addedAt }], { localT: 2, remoteT: 3 }).merged as queue.VocabularyQueueEntry[];
    assert.equal(merged.filter(queue.isActiveQueueEntry).length, 0);
  });
  check("legacy queue keys migrate and re-adding survives symmetric idempotent sync", () => {
    const legacy = { key: "issue", term: "issue", questionId: "q1", meaning_zh: "問題", partOfSpeech: "noun" as const, addedAt: "2026-09-17T00:00:00.000Z" };
    memory.setItem(STORAGE_KEYS.vocabularyQueue, JSON.stringify([legacy]));
    const migrated = queue.getVocabularyQueue()[0];
    assert.notEqual(migrated.key, legacy.key);
    assert.ok(queue.dismissVocabularyQueueTerm(migrated.key));
    const dismissed = queue.readAllVocabularyQueueEntries();
    assert.ok(queue.upsertVocabularyQueueEntry(legacy));
    const active = queue.readAllVocabularyQueueEntries();
    const merged = mergeKey(STORAGE_KEYS.vocabularyQueue, active, dismissed, { localT: 2, remoteT: 3 }).merged as queue.VocabularyQueueEntry[];
    assert.equal(merged.filter(queue.isActiveQueueEntry).length, 1);
    assert.deepEqual(mergeKey(STORAGE_KEYS.vocabularyQueue, dismissed, active, { localT: 3, remoteT: 2 }).merged, merged);
    assert.deepEqual(mergeKey(STORAGE_KEYS.vocabularyQueue, merged, merged, { localT: 3, remoteT: 3 }).merged, merged);
  });
  check("legacy queue sense mismatch cannot inherit an unrelated card's mastery", () => {
    memory.setItem(STORAGE_KEYS.vocabularyQueue, JSON.stringify([{ key: "issue", term: "issue", wordId: "vocab-413", questionId: "p3-ext-007",
      meaning_zh: "問題", partOfSpeech: "noun", addedAt: new Date().toISOString() }]));
    assert.equal(vocab.getVocabularyStudyQueue()[0].wordId, undefined);
    assert.equal(vocab.findVocabularyCardForTerm("issue", "p3-ext-007"), null);
  });
  check("an early requested review cannot certify a 14-day retention interval", () => {
    const item = vocab.findVocabularyByWord("confirm");
    assert.ok(item);
    vocab.saveVocabularyProgress([{ wordId: item.id, status: "familiar", intervalDays: 14, nextReviewDate: day(7), consecutiveCorrect: 4,
      reviewedAt: new Date().toISOString(), addedAt: new Date().toISOString(), selfCheckCount: 0, lastSelfCheckDate: null }]);
    assert.ok(vocab.enqueueQuestionTerm("confirm", "p5-test"));
    assert.equal(vocab.getVocabularyProgress()[0].nextReviewDate, day());
    const backup = sanitizeBackupValue(STORAGE_KEYS.vocabularyProgress, vocab.getVocabularyProgress());
    const synced = mergeKey(STORAGE_KEYS.vocabularyProgress, [], backup, { localT: 1, remoteT: 2 }).merged;
    memory.setItem(STORAGE_KEYS.vocabularyProgress, JSON.stringify(synced));
    assert.equal(vocab.getVocabularyProgress()[0].scheduledReviewDate, day(7), "eligibility survives backup, sync and migration");
    const result = vocab.saveVocabularyQuizResult(item.id, true, "backlog");
    assert.equal(result.after.status, "familiar");
    assert.equal(result.after.intervalDays, 14);
    assert.equal(result.after.nextReviewDate, day(14));
  });
  check("due 14-day review can certify retention while an early wrong answer lapses", () => {
    const item = vocab.findVocabularyByWord("confirm")!;
    const base = { wordId: item.id, status: "familiar" as const, intervalDays: 14, nextReviewDate: day(), consecutiveCorrect: 4,
      reviewedAt: new Date().toISOString(), addedAt: new Date().toISOString(), selfCheckCount: 0, lastSelfCheckDate: null };
    vocab.saveVocabularyProgress([base]);
    assert.equal(vocab.saveVocabularyQuizResult(item.id, true, "backlog").after.status, "mastered");
    vocab.saveVocabularyProgress([{ ...base, scheduledReviewDate: day(14) }]);
    const failed = vocab.saveVocabularyQuizResult(item.id, false, "backlog").after;
    assert.notEqual(failed.status, "mastered");
    assert.equal(failed.intervalDays, 0);
    assert.equal(failed.nextReviewDate, day());
    assert.equal(failed.scheduledReviewDate, undefined);
  });
  check("queue survives a failed due-date write without claiming full success", () => {
    const item = vocab.findVocabularyByWord("confirm")!;
    vocab.saveVocabularyProgress([{ wordId: item.id, status: "familiar", intervalDays: 14, nextReviewDate: day(14), consecutiveCorrect: 4,
      reviewedAt: new Date().toISOString(), addedAt: new Date().toISOString(), selfCheckCount: 0, lastSelfCheckDate: null }]);
    memory.failKey = STORAGE_KEYS.vocabularyProgress;
    assert.equal(vocab.enqueueQuestionTerm("confirm", "p5-test"), false);
    assert.equal(queue.getVocabularyQueue().length, 1);
    assert.equal(vocab.getVocabularyProgress()[0].nextReviewDate, day(14));
  });
  assert.equal(failures, 0, `${failures} follow-up regression(s) failed`);
  console.log("Remediation review checks passed.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
