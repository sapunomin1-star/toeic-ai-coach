import { strict as assert } from "node:assert";
import type { AnswerRecord, Question } from "../types/question";
import { buildStudySegments } from "../lib/studySegments";
import {
  daysUntilExam, getGoalGuidance, getStudyProfile, isCalendarDate,
  isStudyProfile, saveStudyProfile, type StudyProfile,
} from "../lib/studyProfile";
import { buildLearningPulse, getCoachAction, getResumeAction, type TodayCoachState } from "../lib/todayCoach";
import { STORAGE_KEYS } from "../lib/storageCore";
import { BACKUP_KEYS, clearAllProgress, exportAllData, importAllData, sanitizeBackupValue } from "../lib/storage";
import { mergeKey } from "../lib/syncMerge";
import { SYNC_KEYS } from "../lib/syncShared";
import { buildDailyPlan } from "../data/questions";
import { VOCABULARY } from "../data/vocabulary";
import { buildDailySession, buildVocabularyQuiz, loadVocabularyBank } from "../lib/vocabularyStorage";

class MemoryStorage {
  data = new Map<string, string>();
  failWrites = false;
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) {
    if (this.failWrites) throw new DOMException("Intentional quota test", "QuotaExceededError");
    this.data.set(key, value);
  }
  removeItem(key: string) { this.data.delete(key); }
}

async function main() {
  const memory = new MemoryStorage();
  Object.defineProperty(globalThis, "localStorage", { value: memory, configurable: true });
  Object.defineProperty(globalThis, "window", { value: globalThis, configurable: true });
  Object.defineProperty(globalThis, "alert", { value: () => {}, configurable: true });
  const profile: StudyProfile = { targetScore: 850, currentScore: null, examDate: "2026-12-06", dailyMinutes: 10 };

  assert.equal(getStudyProfile(), null, "new learners have no fabricated target or baseline");
  for (const invalid of [null, [], {}, { ...profile, targetScore: 851 }, { ...profile, currentScore: 0 }, { ...profile, dailyMinutes: 0 }, { ...profile, examDate: "2026-02-30" }]) {
    assert.equal(isStudyProfile(invalid), false);
    assert.equal(sanitizeBackupValue(STORAGE_KEYS.studyProfile, invalid), undefined);
  }
  assert.equal(isCalendarDate("2028-02-29"), true);
  assert.equal(isCalendarDate("2026-02-29"), false);
  assert.equal(saveStudyProfile(profile), true);
  assert.deepEqual(getStudyProfile(), profile);
  memory.failWrites = true;
  const previousWarn = console.warn;
  try {
    console.warn = () => {};
    assert.equal(saveStudyProfile({ ...profile, targetScore: 900 }), false, "quota failure must not claim success");
  } finally {
    memory.failWrites = false;
    console.warn = previousWarn;
  }
  assert.deepEqual(getStudyProfile(), profile, "unsaved edits must not overwrite the previous goal");
  assert(BACKUP_KEYS.includes(STORAGE_KEYS.studyProfile));
  assert(SYNC_KEYS.includes(STORAGE_KEYS.studyProfile));
  const backup = exportAllData();
  assert(backup);
  clearAllProgress();
  assert.equal(getStudyProfile(), null);
  assert.equal(importAllData(backup), true);
  assert.deepEqual(getStudyProfile(), profile);
  assert.equal(importAllData(JSON.stringify({ [STORAGE_KEYS.studyProfile]: { targetScore: "bad" } })), false);
  assert.deepEqual(getStudyProfile(), profile, "malformed import must leave the existing goal intact");
  const updated = { ...profile, targetScore: 900, dailyMinutes: 30 };
  assert.deepEqual(mergeKey(STORAGE_KEYS.studyProfile, profile, updated, { localT: 100, remoteT: 200 }).merged, updated);
  assert.deepEqual(mergeKey(STORAGE_KEYS.studyProfile, updated, profile, { localT: 200, remoteT: 100 }).merged, updated);
  assert.deepEqual(
    mergeKey(STORAGE_KEYS.studyProfile, updated, profile, { localT: 200, remoteT: 200 }).merged,
    mergeKey(STORAGE_KEYS.studyProfile, profile, updated, { localT: 200, remoteT: 200 }).merged,
    "equal timestamps converge regardless of device order",
  );

  const originalTz = process.env.TZ;
  try {
    for (const timezone of ["Asia/Taipei", "America/New_York", "Pacific/Honolulu"]) {
      process.env.TZ = timezone;
      assert.equal(daysUntilExam("2026-03-09", new Date(2026, 2, 7, 23, 55)), 2, timezone);
      assert.equal(daysUntilExam("2026-03-07", new Date(2026, 2, 7, 23, 55)), 0, timezone);
      const now = new Date(2026, 8, 12, 23, 0);
      const record = (at: Date, source: "daily" | "mock" = "daily"): AnswerRecord => ({
        questionId: "p5-fixture", userAnswer: "A", correctAnswer: "A", isCorrect: true,
        skill_tag: "word_form", answeredAt: at.toISOString(), source,
      });
      const pulse = buildLearningPulse([
        record(new Date(2026, 8, 6, 0, 1)), // whole first calendar day counts
        record(new Date(2026, 8, 5, 23, 59)), // previous week does not
        record(new Date(2026, 8, 13, 0, 1)), // future clocks do not
        record(new Date(2026, 8, 12, 12), "mock"),
      ], now);
      assert.equal(pulse.weeklyAnswered, 1, timezone);
      assert.equal(pulse.weeklyAccuracy, 100);
      assert.equal(buildLearningPulse([], now).weeklyAccuracy, null);
    }
  } finally {
    if (originalTz === undefined) delete process.env.TZ;
    else process.env.TZ = originalTz;
  }
  assert.equal(daysUntilExam(null), null);
  assert.equal(getGoalGuidance(profile, new Date(2026, 11, 1)).label, "考前鞏固期");
  assert.equal(getGoalGuidance(profile, new Date(2026, 11, 6)).label, "今天是考試日");
  assert.equal(getGoalGuidance(profile, new Date(2026, 11, 7)).label, "準備下一個目標");

  const plan = { questionIds: ["p5-1", "p5-2"], cursor: 1, createdAt: new Date().toISOString() };
  const resume = getResumeAction({ plan, source: "wrongbook" });
  assert.equal(resume?.label, "繼續錯題複習");
  const state: TodayCoachState = {
    vocabularyUnavailable: false, resumeAction: resume, vocabularyTotal: 20,
    reviewedCount: 0, validatedCount: 0, validatedCorrectCount: 0, validatedWrongCount: 0,
    reinforcementCount: 0, canReinforce: false, dueBacklogCount: 0,
    practiceCursor: 0, practiceTotal: 0, practiceHasPendingFeedback: false,
    reviewDueCount: 100, weeklyAnswered: 0, weeklyAccuracy: null, focusLabel: "建立學習基準",
    focusDetail: "先完成第一回合，用新題建立基準",
  };
  assert.equal(getCoachAction(state, false, false, false), resume, "interrupted review takes priority over unstarted vocabulary");
  assert.equal(getCoachAction({ ...state, vocabularyUnavailable: true }, false, false, false), resume, "a vocabulary outage cannot hide an existing quiz");
  assert.equal(getResumeAction({ plan: { ...plan, cursor: 2 }, source: "daily" }), null);
  const feedback = getResumeAction({ plan: { ...plan, cursor: 2, pendingFeedback: { questionId: "p5-2", userAnswer: "A" } }, source: "daily" });
  assert.equal(feedback?.label, "先看完上一題解析", "final explanation must remain resumable");
  assert.match(getCoachAction({ ...state, resumeAction: null }, true, true, false).detail, /3 題到期錯題/);

  const q = (id: string, extra: Partial<Question> = {}): Question => ({
    id, part: "Part 5", question: "Fixture", choices: { A: "a", B: "b", C: "c", D: "d" },
    answer: "A", explanation_zh: "測試", skill_tag: "word_form", difficulty: "B1", ...extra,
  });
  assert.deepEqual(buildStudySegments([], 10), []);
  const group = [0, 1, 2, 3].map((i) => q(`p6-${i}`, { part: "Part 6", passage: "same full passage" }));
  assert.deepEqual(buildStudySegments(group, 1), [{ start: 0, end: 4, estimatedMinutes: 4 }], "oversized groups stay whole");
  const interruptedGroup = [group[0], q("p5-between"), ...group.slice(1)];
  assert.equal(buildStudySegments(interruptedGroup, 1).length, 1, "legacy non-adjacent group members cannot cross a break");
  for (let sample = 0; sample < 15; sample++) {
    const questions = buildDailyPlan().questions;
    const originalIds = questions.map((item) => item.id);
    for (const minutes of [10, 15, 20, 30]) {
      const segments = buildStudySegments(questions, minutes);
      assert.equal(segments[0].start, 0);
      assert.equal(segments.at(-1)?.end, questions.length);
      assert.deepEqual(segments.flatMap((segment) => questions.slice(segment.start, segment.end).map((item) => item.id)), originalIds);
      const groupSegment = new Map<string, number>();
      segments.forEach((segment, index) => questions.slice(segment.start, segment.end).forEach((question) => {
        const context = question.part === "Part 3" || question.part === "Part 4" ? question.transcript : question.passage;
        if (!context) return;
        const key = `${question.part}:${context}`;
        if (groupSegment.has(key)) assert.equal(groupSegment.get(key), index, "no passage/audio group split across segments");
        groupSegment.set(key, index);
      }));
    }
    assert.deepEqual(questions.map((item) => item.id), originalIds, "segmentation does not mutate the plan");
  }

  // Existing vocabulary contract must survive adding another synced setting.
  assert.equal(new Set(VOCABULARY.map((word) => word.id)).size, VOCABULARY.length);
  await loadVocabularyBank();
  const session = buildDailySession();
  assert.equal(session.counts.new, 20);
  const dailyQuiz = buildVocabularyQuiz("today");
  assert.deepEqual(new Set(dailyQuiz.map((item) => item.wordId)), new Set(session.items.map(({ item }) => item.id)));
  const questionTypes = new Set<string>();
  for (let i = 0; i < 10; i++) {
    const random = buildVocabularyQuiz("random");
    assert.equal(random.length, 10);
    for (const question of [...dailyQuiz, ...random]) {
      assert.equal(question.choices.length, 4);
      assert.equal(new Set(question.choices).size, 4);
      assert(question.correctIndex >= 0 && question.correctIndex < 4);
      questionTypes.add(question.type);
    }
  }
  assert.equal(questionTypes.size, 3);
  console.log("Study coach checks passed: goals, backups, sync, quota, local dates, resume priority, atomic segments, vocabulary contracts.");
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
