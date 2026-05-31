import type {
  AnswerRecord,
  MistakeReason,
  Part,
  Question,
  SkillTag,
} from "@/types/question";
import { MISTAKE_REASONS, SKILL_LABELS, getSkillCategory } from "@/types/question";

const PART5_SKILLS = new Set<SkillTag>([
  "passive_voice",
  "word_form",
  "tense",
  "preposition",
  "conjunction",
  "pronoun",
  "business_vocabulary",
  "relative_clause",
]);

export const LISTENING_SKILLS: SkillTag[] = [
  "listening_photo",
  "listening_response",
  "listening_main_idea",
  "listening_inference",
  "listening_next_action",
];

export const READING_SKILLS: SkillTag[] = [
  "reading_main_idea",
  "reading_detail",
  "reading_inference",
];

function excludeMock(records: AnswerRecord[]): AnswerRecord[] {
  return records.filter((r) => r.source !== "mock");
}

export function calculateAccuracy(records: AnswerRecord[]): number {
  if (records.length === 0) return 0;
  const correct = records.filter((r) => r.isCorrect).length;
  return Math.round((correct / records.length) * 1000) / 10;
}

export function countMistakesBySkill(
  records: AnswerRecord[]
): Record<SkillTag, number> {
  const filtered = excludeMock(records);
  const tags: SkillTag[] = [
    "passive_voice",
    "word_form",
    "tense",
    "preposition",
    "conjunction",
    "pronoun",
    "business_vocabulary",
    "relative_clause",
    "listening_photo",
    "listening_response",
    "listening_main_idea",
    "listening_inference",
    "listening_next_action",
    "reading_main_idea",
    "reading_detail",
    "reading_inference",
  ];
  const init = Object.fromEntries(tags.map((t) => [t, 0])) as Record<
    SkillTag,
    number
  >;
  for (const r of filtered) {
    if (!r.isCorrect) init[r.skill_tag] += 1;
  }
  return init;
}

export function getWeakestSkills(
  records: AnswerRecord[],
  topN = 3,
  part?: number
): { skill: SkillTag; mistakes: number }[] {
  const pool = part != null
    ? records.filter((r) => r.questionId.startsWith(`p${part}-`))
    : records;
  const filtered = excludeMock(pool);
  const counts = countMistakesBySkill(filtered);
  return Object.entries(counts)
    .map(([skill, mistakes]) => ({ skill: skill as SkillTag, mistakes }))
    .filter((x) => x.mistakes > 0)
    .sort((a, b) => b.mistakes - a.mistakes)
    .slice(0, topN);
}

export function getGrammarWeakSkills(
  records: AnswerRecord[],
): { skill: SkillTag; wrongCount: number }[] {
  const counts = new Map<SkillTag, number>();

  for (const record of excludeMock(records)) {
    if (
      record.isCorrect ||
      record.mistakeReason !== "grammar" ||
      getSkillCategory(record.skill_tag) !== "grammar"
    ) {
      continue;
    }
    counts.set(record.skill_tag, (counts.get(record.skill_tag) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([skill, wrongCount]) => ({ skill, wrongCount }))
    .sort((a, b) => b.wrongCount - a.wrongCount);
}

// ─── Time analytics ────────────────────────────────────────────────────────

export function calculateAvgResponseTime(records: AnswerRecord[]): number {
  const filtered = excludeMock(records);
  const withTime = filtered.filter((r) => r.responseTimeMs !== undefined);
  if (withTime.length === 0) return 0;
  const total = withTime.reduce((s, r) => s + (r.responseTimeMs ?? 0), 0);
  return Math.round(total / withTime.length);
}

export function calculatePart5AvgTime(records: AnswerRecord[]): number {
  return calculateAvgResponseTime(
    excludeMock(records).filter((r) => PART5_SKILLS.has(r.skill_tag))
  );
}

export function countSlowQuestions(
  records: AnswerRecord[],
  thresholdMs = 40_000
): number {
  return excludeMock(records).filter((r) => (r.responseTimeMs ?? 0) > thresholdMs).length;
}

export function getSlowestSkill(records: AnswerRecord[]): SkillTag | null {
  const filtered = excludeMock(records);
  const bySkill: Record<string, { total: number; count: number }> = {};
  for (const r of filtered) {
    if (!r.responseTimeMs) continue;
    if (!bySkill[r.skill_tag])
      bySkill[r.skill_tag] = { total: 0, count: 0 };
    bySkill[r.skill_tag].total += r.responseTimeMs;
    bySkill[r.skill_tag].count += 1;
  }
  let slowest: SkillTag | null = null;
  let maxAvg = 0;
  for (const [skill, { total, count }] of Object.entries(bySkill)) {
    const avg = total / count;
    if (avg > maxAvg) {
      maxAvg = avg;
      slowest = skill as SkillTag;
    }
  }
  return slowest;
}

// ─── Today stats ───────────────────────────────────────────────────────────

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function getTodayRecords(records: AnswerRecord[]): AnswerRecord[] {
  return excludeMock(records).filter((r) => isToday(r.answeredAt));
}

// ─── Recommendation ────────────────────────────────────────────────────────

const SKILL_ADVICE: Partial<Record<SkillTag, string>> = {
  word_form:
    "明天請優先練詞性判斷，尤其注意形容詞 vs 副詞、名詞字尾 -tion/-ance/-ment。",
  passive_voice:
    "明天請優先練被動語態，重點掌握情態動詞被動（must be done）和完成式被動。",
  tense:
    "明天請優先練時態，重點區分現在完成式 vs 過去完成式，以及 since/for/by the time 的搭配。",
  preposition:
    "明天請優先練介系詞，牢記 in/on/at 的時間與地點用法，以及 responsible for / in charge of 等固定搭配。",
  conjunction:
    "明天請優先練連接詞，注意 although/despite 後面的結構差異，以及 unless/as long as 的條件句。",
  business_vocabulary:
    "明天請優先練商務單字，重點記憶 comply/implement/allocate/submit/collaborate 等核心動詞。",
  reading_detail:
    "明天請多練 Part 6 段落填空與 Part 7 細節題，注意文章中的上下文線索和關鍵資訊定位。",
};

export type Recommendation = {
  primary: { skill: SkillTag; label: string } | null;
  secondary: { skill: SkillTag; label: string } | null;
  message: string;
};

export function getTomorrowRecommendation(
  records: AnswerRecord[]
): Recommendation {
  const weak = getWeakestSkills(records, 2);

  if (weak.length === 0) {
    return {
      primary: null,
      secondary: null,
      message:
        "目前沒有錯題，明天繼續做一般 Part 5 訓練，保持節奏，並加強商務單字廣度。",
    };
  }

  const primary = weak[0]
    ? { skill: weak[0].skill, label: SKILL_LABELS[weak[0].skill] }
    : null;
  const secondary = weak[1]
    ? { skill: weak[1].skill, label: SKILL_LABELS[weak[1].skill] }
    : null;

  const advice =
    (primary && SKILL_ADVICE[primary.skill]) ??
    `明天請優先練 ${primary?.label}，加強相關題型。`;

  // If primary weakness is reading_detail, add Part 6-specific suggestion
  const dailyRecords = excludeMock(records);
  const part6Mistakes = dailyRecords.filter(
    (r) => !r.isCorrect && isPart6Record(r)
  ).length;
  const part6Total = dailyRecords.filter((r) => isPart6Record(r)).length;
  let part6Note = "";
  if (part6Total > 0 && part6Mistakes > 0) {
    const pct = Math.round((part6Mistakes / part6Total) * 100);
    if (pct >= 50) {
      part6Note = ` Part 6 段落填空目前錯 ${part6Mistakes}/${part6Total} 題，明天建議專注練上下文詞性判斷和連接詞。`;
    }
  }

  return { primary, secondary, message: advice + part6Note };
}

// ─── Part 6 detection ─────────────────────────────────────────────────────

function isPart6Record(r: { questionId: string }): boolean {
  return r.questionId.startsWith("p6-");
}

function isPart7Record(r: { questionId: string }): boolean {
  return r.questionId.startsWith("p7-");
}

function isPart1Record(r: { questionId: string }): boolean {
  return r.questionId.startsWith("p1-");
}

function isPart2Record(r: { questionId: string }): boolean {
  return r.questionId.startsWith("p2-");
}

function isPart3Record(r: { questionId: string }): boolean {
  return r.questionId.startsWith("p3-");
}

function isPart4Record(r: { questionId: string }): boolean {
  return r.questionId.startsWith("p4-");
}

// ─── Part 5 / Part 6 / Listening breakdown ──────────────────────────────────

export function calculatePart5Accuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(excludeMock(records).filter((r) => PART5_SKILLS.has(r.skill_tag)));
}

export function countPart5Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => PART5_SKILLS.has(r.skill_tag)).length;
}

export function calculatePart1Accuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(excludeMock(records).filter((r) => isPart1Record(r)));
}

export function countPart1Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => isPart1Record(r)).length;
}

export function calculatePart2Accuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(excludeMock(records).filter((r) => isPart2Record(r)));
}

export function countPart2Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => isPart2Record(r)).length;
}

export function calculatePart3Accuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(excludeMock(records).filter((r) => isPart3Record(r)));
}

export function countPart3Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => isPart3Record(r)).length;
}

export function calculatePart4Accuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(excludeMock(records).filter((r) => isPart4Record(r)));
}

export function countPart4Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => isPart4Record(r)).length;
}

export function calculateListeningAccuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(
    excludeMock(records).filter((r) => (LISTENING_SKILLS as SkillTag[]).includes(r.skill_tag))
  );
}

export function countListeningAttempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) =>
    (LISTENING_SKILLS as SkillTag[]).includes(r.skill_tag)
  ).length;
}

export function calculateReadingAccuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(
    excludeMock(records).filter((r) => isPart7Record(r))
  );
}

export function countReadingAttempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => isPart7Record(r)).length;
}

export function calculatePart6Accuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(excludeMock(records).filter((r) => isPart6Record(r)));
}

export function countPart6Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => isPart6Record(r)).length;
}

export function calculatePart6AvgTime(records: AnswerRecord[]): number {
  return calculateAvgResponseTime(excludeMock(records).filter((r) => isPart6Record(r)));
}

export function calculateListeningAvgTime(records: AnswerRecord[]): number {
  return calculateAvgResponseTime(
    excludeMock(records).filter((r) => (LISTENING_SKILLS as SkillTag[]).includes(r.skill_tag))
  );
}

export function calculateReadingAvgTime(records: AnswerRecord[]): number {
  return calculateAvgResponseTime(excludeMock(records).filter((r) => isPart7Record(r)));
}

export function countPart1MistakesBySkill(
  records: AnswerRecord[]
): Record<SkillTag, number> {
  const filtered = excludeMock(records);
  const skills: SkillTag[] = ["listening_photo"];
  const init = Object.fromEntries(
    skills.map((skill) => [skill, 0])
  ) as Record<SkillTag, number>;

  for (const r of filtered) {
    if (!r.isCorrect && isPart1Record(r) && skills.includes(r.skill_tag)) {
      init[r.skill_tag] += 1;
    }
  }

  return init;
}

export function countPart7MistakesBySkill(
  records: AnswerRecord[]
): Record<SkillTag, number> {
  const filtered = excludeMock(records);
  const init = Object.fromEntries(
    READING_SKILLS.map((skill) => [skill, 0])
  ) as Record<SkillTag, number>;

  for (const r of filtered) {
    if (
      !r.isCorrect &&
      isPart7Record(r) &&
      (READING_SKILLS as SkillTag[]).includes(r.skill_tag)
    ) {
      init[r.skill_tag] += 1;
    }
  }

  return init;
}

export function summarize(records: AnswerRecord[]) {
  const filtered = excludeMock(records);
  const total = filtered.length;
  const wrong = filtered.filter((r) => !r.isCorrect).length;
  const accuracy = calculateAccuracy(filtered);
  const todayRecords = getTodayRecords(records);
  const todayTotal = todayRecords.length;
  const todayAccuracy = calculateAccuracy(todayRecords);
  return {
    total,
    wrong,
    correct: total - wrong,
    accuracy,
    todayTotal,
    todayAccuracy,
  };
}

// ─── Adaptive next-day listening mix ────────────────────────────────────────

export type NextDayListeningMix = {
  part1Count: number;
  part2Count: number;
  part3GroupCount: number;
  part4GroupCount: number;
  /** Human-readable Chinese label explaining why we picked these counts */
  reason: string;
  /** Names of parts that got boosted, e.g. ["Part 2"] */
  boosted: string[];
};

const DEFAULT_LISTENING_MIX: Omit<NextDayListeningMix, "reason" | "boosted"> = {
  part1Count: 2,
  part2Count: 3,
  part3GroupCount: 1,
  part4GroupCount: 1,
};

const MIX_CAPS: Omit<NextDayListeningMix, "reason" | "boosted"> = {
  part1Count: 4,
  part2Count: 6,
  part3GroupCount: 3,
  part4GroupCount: 2,
};

const MIN_ATTEMPTS_FOR_BOOST = 6;
const WEAKNESS_THRESHOLD = 60; // accuracy %
/**
 * Sliding window: only the most-recent N attempts per part count for boost decisions.
 * Kept small (10) so a recent slump is not diluted by old strong performance —
 * Codex review showed window=20 let 100 old correct mask 6 recent wrong.
 */
const ADAPTIVE_RECENT_WINDOW = 10;

/**
 * Most-recent N non-mock attempts for a given listening part, ordered most-recent first.
 * Sliding window so a student who used to do well but is recently slipping
 * still gets adaptive boost.
 */
function recentListeningRecordsForPart(
  records: AnswerRecord[],
  part: 1 | 2 | 3 | 4,
  limit: number = ADAPTIVE_RECENT_WINDOW,
): AnswerRecord[] {
  const prefix = `p${part}-`;
  return excludeMock(records)
    .filter((r) => r.questionId.startsWith(prefix))
    .slice()
    .sort((a, b) => b.answeredAt.localeCompare(a.answeredAt))
    .slice(0, limit);
}

function accuracyPct(records: AnswerRecord[]): number {
  if (records.length === 0) return 0;
  const correct = records.filter((r) => r.isCorrect).length;
  return (correct / records.length) * 100;
}

/**
 * Compute the suggested listening question mix for the next daily plan,
 * based on accuracy in the user's most-recent non-mock answers per part.
 *
 * Default mix: 2 P1 + 3 P2 + 1 P3 group (3 Q) + 1 P4 group (3 Q) = 11 listening Q.
 *
 * Each part is evaluated independently using a sliding window
 * (last {@link ADAPTIVE_RECENT_WINDOW} non-mock attempts of that part):
 * - need ≥ {@link MIN_ATTEMPTS_FOR_BOOST} samples in the window
 * - accuracy in window < {@link WEAKNESS_THRESHOLD}%
 * → that part is boosted by 1 (group or question), capped by {@link MIX_CAPS}.
 *
 * Lifetime statistics (used in dashboard cards) are intentionally NOT used
 * for boost decisions — otherwise old strong performance would mask current
 * weakness for established users.
 */
export function getNextDayListeningMix(records: AnswerRecord[]): NextDayListeningMix {
  let part1Count = DEFAULT_LISTENING_MIX.part1Count;
  let part2Count = DEFAULT_LISTENING_MIX.part2Count;
  let part3GroupCount = DEFAULT_LISTENING_MIX.part3GroupCount;
  let part4GroupCount = DEFAULT_LISTENING_MIX.part4GroupCount;
  const boosted: string[] = [];

  const p1Recent = recentListeningRecordsForPart(records, 1);
  if (
    p1Recent.length >= MIN_ATTEMPTS_FOR_BOOST &&
    accuracyPct(p1Recent) < WEAKNESS_THRESHOLD
  ) {
    part1Count = Math.min(MIX_CAPS.part1Count, part1Count + 1);
    boosted.push("Part 1");
  }

  const p2Recent = recentListeningRecordsForPart(records, 2);
  if (
    p2Recent.length >= MIN_ATTEMPTS_FOR_BOOST &&
    accuracyPct(p2Recent) < WEAKNESS_THRESHOLD
  ) {
    part2Count = Math.min(MIX_CAPS.part2Count, part2Count + 1);
    boosted.push("Part 2");
  }

  const p3Recent = recentListeningRecordsForPart(records, 3);
  if (
    p3Recent.length >= MIN_ATTEMPTS_FOR_BOOST &&
    accuracyPct(p3Recent) < WEAKNESS_THRESHOLD
  ) {
    part3GroupCount = Math.min(MIX_CAPS.part3GroupCount, part3GroupCount + 1);
    boosted.push("Part 3");
  }

  const p4Recent = recentListeningRecordsForPart(records, 4);
  if (
    p4Recent.length >= MIN_ATTEMPTS_FOR_BOOST &&
    accuracyPct(p4Recent) < WEAKNESS_THRESHOLD
  ) {
    part4GroupCount = Math.min(MIX_CAPS.part4GroupCount, part4GroupCount + 1);
    boosted.push("Part 4");
  }

  const reason =
    boosted.length === 0
      ? `依預設比例（最近 ${ADAPTIVE_RECENT_WINDOW} 題各部分表現穩定 / 資料還不足）`
      : `根據最近 ${ADAPTIVE_RECENT_WINDOW} 題表現加強 ${boosted.join("、")}`;

  return { part1Count, part2Count, part3GroupCount, part4GroupCount, reason, boosted };
}

// ─── Mistake Reason System (Phase 1) ────────────────────────────────────────
//
// Pure analysis helpers: infer a suggested reason for a wrong answer, count
// reasons for the dashboard, and produce the headline insight sentence. No
// storage / UI / vocab-SRS coupling — vocab is injected via a predicate.

/**
 * Per-part answering time budgets (ms). Reading parts only: in /quiz the
 * listening responseTimeMs includes audio playback, so it is NOT a usable
 * speed signal. Kept for reference / future per-question pacing.
 */
export const PART_TIME_BUDGET_MS: Partial<Record<Part, number>> = {
  "Part 5": 20_000,
  "Part 6": 25_000,
  "Part 7": 55_000,
};

/** Slower than this (reading parts) + wrong → infer "speed" (ran out of time). */
export const SLOW_THRESHOLD_MS: Partial<Record<Part, number>> = {
  "Part 5": 40_000,
  "Part 6": 50_000,
  "Part 7": 75_000,
};

/** Faster than this (reading parts) + wrong → infer "careless" (too quick to think). */
export const FAST_FLOOR_MS: Partial<Record<Part, number>> = {
  "Part 5": 5_000,
  "Part 6": 6_000,
  "Part 7": 10_000,
};

/**
 * Suggest a mistake reason for a wrong answer, to pre-select in the chip UI.
 * Best-effort and pure: returns null when there is no clear signal (let the
 * learner decide).
 *
 * - speed: reading parts only (listening time includes audio playback).
 * - vocab: only when an `isWeakWord` predicate is supplied (kept decoupled from
 *   vocabularyStorage so this stays a pure function; wired in a later step).
 * - careless: very fast + wrong, reading parts only (where "fast" is meaningful).
 *
 * Priority when several could apply: speed > vocab > careless.
 */
export function inferMistakeReason(
  question: Pick<Question, "part" | "vocabulary">,
  record: Pick<AnswerRecord, "isCorrect" | "responseTimeMs">,
  isWeakWord?: (word: string) => boolean,
): MistakeReason | null {
  if (record.isCorrect) return null;

  const ms = record.responseTimeMs;

  const slow = SLOW_THRESHOLD_MS[question.part];
  if (slow !== undefined && ms !== undefined && ms > slow) {
    return "speed";
  }

  if (isWeakWord && question.vocabulary && question.vocabulary.length > 0) {
    if (question.vocabulary.some((word) => isWeakWord(word))) {
      return "vocab";
    }
  }

  const floor = FAST_FLOOR_MS[question.part];
  if (floor !== undefined && ms !== undefined && ms < floor) {
    return "careless";
  }

  return null;
}

/**
 * Count wrong answers by mistake reason (mock excluded). Only labeled wrongs
 * are counted; legacy / unlabeled records are ignored. Every reason key is
 * present (zero-filled) so the dashboard can render a stable list.
 */
export function countMistakesByReason(
  records: AnswerRecord[],
): Record<MistakeReason, number> {
  const filtered = excludeMock(records);
  const counts = {} as Record<MistakeReason, number>;
  for (const reason of MISTAKE_REASONS) {
    counts[reason] = 0;
  }
  for (const r of filtered) {
    if (!r.isCorrect && r.mistakeReason) {
      counts[r.mistakeReason] = (counts[r.mistakeReason] ?? 0) + 1;
    }
  }
  return counts;
}

/** Minimum labeled wrong answers before an insight is shown (avoids 1/1 = 100%). */
const MIN_LABELED_FOR_INSIGHT = 8;
/** A reason at or above this share of labeled wrongs counts as dominant. */
const DOMINANT_REASON_RATIO = 0.35;
/** "careless" tagged at least this many times triggers the over-use guard. */
const CARELESS_ABUSE_MIN = 5;

/** Prescription clause appended after "你最近 N% 的錯…". */
const REASON_PRESCRIPTION: Record<MistakeReason, string> = {
  speed: "其實是「來不及」，不是不會。重心放在配速，分數最快上升。",
  vocab: "卡在單字。先把弱字背起來，正確率會明顯回升。",
  grammar: "集中在文法觀念。與其多寫題，不如先補對應觀念。",
  comprehension: "是「看懂字卻抓不到意思」。重點在整段理解，不是單字量。",
  careless: "是粗心。放慢一點、看完整句再作答，是最快的進步。",
  guess: "是用猜的，代表底層觀念還沒建立，建議回頭把基礎補起來。",
};

/**
 * Build the single dashboard headline from mistake-reason data, or null when
 * there isn't enough labeled data to be meaningful.
 *
 * Priority:
 *  1. fewer than MIN_LABELED_FOR_INSIGHT labeled wrongs → null
 *  2. "careless" over-use guard (self-deception) → corrective insight
 *  3. a dominant reason (>= 35%) → its prescription, with live percentage
 *  4. otherwise → neutral "spread out" message
 */
export function getReasonInsight(records: AnswerRecord[]): string | null {
  const filtered = excludeMock(records);
  const labeledWrong = filtered.filter((r) => !r.isCorrect && r.mistakeReason);
  if (labeledWrong.length < MIN_LABELED_FOR_INSIGHT) return null;

  const counts = countMistakesByReason(records);

  // (2) Over-use guard: many "careless" tags, but those skills still fail a lot.
  if (counts.careless >= CARELESS_ABUSE_MIN) {
    const skills = new Set(
      labeledWrong
        .filter((r) => r.mistakeReason === "careless")
        .map((r) => r.skill_tag),
    );
    const onSkills = filtered.filter((r) => skills.has(r.skill_tag));
    const accuracy =
      onSkills.length === 0
        ? 1
        : onSkills.filter((r) => r.isCorrect).length / onSkills.length;
    if (accuracy < 0.5) {
      return "你把不少題標成「粗心」，但同類型一直錯——也許其實是觀念盲點？";
    }
  }

  // (3) Dominant reason.
  const total = labeledWrong.length;
  let topReason: MistakeReason | null = null;
  let topCount = 0;
  for (const reason of MISTAKE_REASONS) {
    if (counts[reason] > topCount) {
      topCount = counts[reason];
      topReason = reason;
    }
  }
  if (topReason && topCount / total >= DOMINANT_REASON_RATIO) {
    const pct = Math.round((topCount / total) * 100);
    return `你最近 ${pct}% 的錯${REASON_PRESCRIPTION[topReason]}`;
  }

  // (4) Spread out.
  return "你的錯誤原因蠻分散的，持續累積資料會更準。";
}
