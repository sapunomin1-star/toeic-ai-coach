import type {
  AnswerRecord,
  MistakeReason,
  Part,
  Question,
  SkillTag,
} from "@/types/question";
import {
  MISTAKE_REASONS,
  MISTAKE_REASON_LABELS,
  SKILL_LABELS,
  SKILL_TAG_LIST,
  getSkillCategory,
} from "@/types/question";
import { partitionAttempts } from "@/lib/attemptEvidence";
import { READING_BUDGET_MS } from "@/lib/pacing";

export const LISTENING_SKILLS: SkillTag[] = [
  "listening_photo",
  "listening_response",
  "listening_main_idea",
  "listening_inference",
  "listening_next_action",
  "listening_detail",
];

export const READING_SKILLS: SkillTag[] = [
  "reading_main_idea",
  "reading_detail",
  "reading_inference",
  "reading_vocab",
  "sentence_insertion",
];

function excludeMock(records: AnswerRecord[]): AnswerRecord[] {
  return records.filter((r) => r.source !== "mock");
}

/**
 * Drop attempts recorded before a question's content revision: the item the
 * learner answered no longer exists in that form, so its outcome says nothing
 * about the current one (review F04). Pure; `lib/storage.getEvidenceRecords`
 * supplies the revision map so this module stays free of data imports.
 */
export function excludeRecordsBeforeRevision(
  records: AnswerRecord[],
  revisedAt: Readonly<Record<string, string>>,
): AnswerRecord[] {
  return records.filter((r) => {
    const at = revisedAt[r.questionId];
    return at === undefined || r.answeredAt >= at;
  });
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
  // Derive from the SKILLS registry so newly added skill tags are counted
  // automatically (a hardcoded list silently produced NaN for unknown tags).
  const init = Object.fromEntries(SKILL_TAG_LIST.map((t) => [t, 0])) as Record<
    SkillTag,
    number
  >;
  for (const r of filtered) {
    if (!r.isCorrect) init[r.skill_tag] += 1;
  }
  return init;
}

/** Sliding window per skill for weakness ranking (most-recent FRESH attempts). */
export const SKILL_RECENT_WINDOW = 20;
/** Below this many fresh attempts in the window, a skill's error rate is noise (1/1 = 100%). */
export const MIN_SKILL_ATTEMPTS_FOR_RATE = 5;

export { partitionAttempts } from "@/lib/attemptEvidence";

export type SkillEvidence = {
  skill: SkillTag;
  /** Fresh, non-mock attempts inside the window (the most recent SKILL_RECENT_WINDOW). */
  attempts: number;
  wrong: number;
  errorRate: number;
  /** "insufficient" below MIN_SKILL_ATTEMPTS_FOR_RATE: worth re-checking, not a verdict. */
  confidence: "ok" | "insufficient";
  /** ISO timestamps bounding the window, for 期間 labels. */
  from: string | null;
  to: string | null;
  /** Wrong answers in the window the learner confirmed as a grammar problem. */
  confirmedGrammarWrong: number;
  /** Repeat attempts (same question again) that were left out of the numbers above. */
  repeatsExcluded: number;
};

/**
 * ONE evidence table for every skill card. The weakness ranking, the
 * tomorrow recommendation and the grammar-remediation card all read this, so
 * they can never quote different numbers for the same skill (REVIEW F06).
 */
export function getSkillEvidence(records: AnswerRecord[], part?: number): SkillEvidence[] {
  const pool = part != null
    ? records.filter((r) => r.questionId.startsWith(`p${part}-`))
    : records;
  const partitioned = partitionAttempts(pool);
  const fresh = excludeMock(partitioned.fresh);
  const repeats = excludeMock(partitioned.repeats);
  const repeatsBySkill = new Map<SkillTag, number>();
  for (const r of repeats) repeatsBySkill.set(r.skill_tag, (repeatsBySkill.get(r.skill_tag) ?? 0) + 1);

  const newestFirst = fresh.slice().sort((a, b) => b.answeredAt.localeCompare(a.answeredAt));
  const recentBySkill = new Map<SkillTag, AnswerRecord[]>();
  for (const record of newestFirst) {
    const recent = recentBySkill.get(record.skill_tag) ?? [];
    if (recent.length >= SKILL_RECENT_WINDOW) continue;
    recent.push(record);
    recentBySkill.set(record.skill_tag, recent);
  }

  const evidence: SkillEvidence[] = [];
  for (const [skill, recent] of recentBySkill) {
    const wrong = recent.filter((r) => !r.isCorrect).length;
    evidence.push({
      skill,
      attempts: recent.length,
      wrong,
      errorRate: wrong / recent.length,
      confidence: recent.length >= MIN_SKILL_ATTEMPTS_FOR_RATE ? "ok" : "insufficient",
      from: recent[recent.length - 1]?.answeredAt ?? null,
      to: recent[0]?.answeredAt ?? null,
      confirmedGrammarWrong: recent.filter(
        (r) => !r.isCorrect && r.mistakeReason === "grammar" && r.reasonSource !== "inferred",
      ).length,
      repeatsExcluded: repeatsBySkill.get(skill) ?? 0,
    });
  }
  return evidence;
}

export type WeakSkill = {
  skill: SkillTag;
  mistakes: number;
  attempts: number;
  errorRate: number;
  confidence: SkillEvidence["confidence"];
};

/**
 * Rank skills by recent ERROR RATE on fresh attempts, not lifetime mistake
 * count — a skill practiced 100 times with 20 misses must not outrank one
 * missed 4/5, and re-doing one question 20 times must not erase 19 other
 * misses. Skills with wrongs but too few attempts rank after the qualified
 * ones (by wrong count) and carry `confidence: "insufficient"` so the UI can
 * say "值得再確認" instead of "最弱".
 */
export function getWeakestSkills(
  records: AnswerRecord[],
  topN = 3,
  part?: number
): WeakSkill[] {
  const evidence = getSkillEvidence(records, part).filter((e) => e.wrong > 0);
  const qualified = evidence
    .filter((e) => e.confidence === "ok")
    .sort((a, b) => b.errorRate - a.errorRate || b.wrong - a.wrong);
  const lowSample = evidence
    .filter((e) => e.confidence === "insufficient")
    .sort((a, b) => b.wrong - a.wrong);
  return [...qualified, ...lowSample].slice(0, topN).map((e) => ({
    skill: e.skill,
    mistakes: e.wrong,
    attempts: e.attempts,
    errorRate: e.errorRate,
    confidence: e.confidence,
  }));
}

/** A grammar skill leaves remediation once its recent fresh error rate drops below this. */
export const GRAMMAR_REMEDIATION_MIN_ERROR_RATE = 0.2;

export type GrammarWeakSkill = {
  skill: SkillTag;
  /** Confirmed grammar-reason wrongs inside the same window the weakness card uses. */
  wrongCount: number;
  attempts: number;
  errorRate: number;
  confidence: SkillEvidence["confidence"];
};

/**
 * Grammar skills still failing on fresh attempts where the learner confirmed
 * a grammar cause. Reads the same evidence window as getWeakestSkills, so the
 * two cards agree, and retires a skill once recent new-question accuracy has
 * recovered — lifetime counts never did. Only a chip the user actually tapped
 * is evidence of WHY they missed it; inferred labels never count.
 */
export function getGrammarWeakSkills(records: AnswerRecord[]): GrammarWeakSkill[] {
  return getSkillEvidence(records)
    .filter(
      (e) =>
        getSkillCategory(e.skill) === "grammar" &&
        e.confirmedGrammarWrong > 0 &&
        e.errorRate >= GRAMMAR_REMEDIATION_MIN_ERROR_RATE,
    )
    .sort((a, b) => b.confirmedGrammarWrong - a.confirmedGrammarWrong || b.errorRate - a.errorRate)
    .map((e) => ({
      skill: e.skill,
      wrongCount: e.confirmedGrammarWrong,
      attempts: e.attempts,
      errorRate: e.errorRate,
      confidence: e.confidence,
    }));
}

// ─── Time analytics ────────────────────────────────────────────────────────
// Pacing lives in lib/pacing.ts and only reads the timing split; the former
// averages over `responseTimeMs` (audio + reading + hidden tab) were removed
// because they could not support any pacing claim (REVIEW F05).

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
  reading_vocab:
    "明天請優先練字彙語境題（closest in meaning），重點是依上下文判斷多義字的意思，而非背單一中譯。",
  sentence_insertion:
    "明天請優先練句子插入題，先抓代名詞/連接詞的指涉對象（this、such、also），再驗證前後句邏輯是否連貫。",
  listening_detail:
    "明天請優先練聽力細節題，練習邊聽邊抓數字、時間、地點與指令動詞，聽到關鍵資訊立刻在心中複誦一次。",
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
        "目前還沒有足夠的近期弱點訊號。先完成一回合建立基準；若持續穩定答對，教練會維持探索題而不刻意製造弱點。",
    };
  }

  const primary = weak[0]
    ? { skill: weak[0].skill, label: SKILL_LABELS[weak[0].skill] }
    : null;
  const secondary = weak[1]
    ? { skill: weak[1].skill, label: SKILL_LABELS[weak[1].skill] }
    : null;

  const lead = weak[0];
  const evidenceNote =
    lead.confidence === "ok"
      ? `（近 ${lead.attempts} 題新題錯 ${lead.mistakes}，${Math.round(lead.errorRate * 100)}%）`
      : `（只有 ${lead.attempts} 題新題樣本，先當作值得再確認）`;
  const advice =
    ((primary && SKILL_ADVICE[primary.skill]) ??
      `明天請優先練 ${primary?.label}，加強相關題型。`) + evidenceNote;

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

// ─── Part detection ───────────────────────────────────────────────────────
// Part membership comes from the question-id prefix (enforced bank-wide by
// the integrity check). Skill tags must NOT be used for this: 87 of the Part 6
// questions carry grammar tags (word_form/tense/...), so a tag-based "Part 5"
// silently absorbs Part 6 answers and double-counts them across cards.

function isPart5Record(r: { questionId: string }): boolean {
  return r.questionId.startsWith("p5-");
}

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
  return calculateAccuracy(excludeMock(records).filter((r) => isPart5Record(r)));
}

export function countPart5Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => isPart5Record(r)).length;
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

/**
 * Wrong Part 6 answers, on the same daily-only basis as countPart6Attempts.
 * The dashboard prints the two side by side, so a mock-inclusive count here
 * produced impossible cards like "4 題 · 錯 16 題".
 */
export function countPart6Mistakes(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => !r.isCorrect && isPart6Record(r)).length;
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
  part1Count: 1,
  part2Count: 2,
  part3GroupCount: 1,
  part4GroupCount: 1,
};

const MIX_CAPS: Omit<NextDayListeningMix, "reason" | "boosted"> = {
  part1Count: 2,
  part2Count: 3,
  part3GroupCount: 2,
  part4GroupCount: 2,
};

/** Default is 9 questions; adaptive boosts may add at most 3 more. */
const MAX_DAILY_LISTENING_QUESTIONS = 12;

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
 * Default mix: 1 P1 + 2 P2 + 1 P3 group (3 Q) + 1 P4 group (3 Q) = 9 listening Q.
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

  type BoostKey = keyof typeof DEFAULT_LISTENING_MIX;
  type BoostCandidate = {
    key: BoostKey;
    label: string;
    accuracy: number;
    questionCost: number;
  };

  function makeCandidate(
    key: BoostKey,
    label: string,
    part: 1 | 2 | 3 | 4,
    questionCost: number,
  ): BoostCandidate | null {
    const recent = recentListeningRecordsForPart(records, part);
    const accuracy = accuracyPct(recent);
    return recent.length >= MIN_ATTEMPTS_FOR_BOOST && accuracy < WEAKNESS_THRESHOLD
      ? { key, label, accuracy, questionCost }
      : null;
  }

  const candidates = [
    makeCandidate("part1Count", "Part 1", 1, 1),
    makeCandidate("part2Count", "Part 2", 2, 1),
    makeCandidate("part3GroupCount", "Part 3", 3, 3),
    makeCandidate("part4GroupCount", "Part 4", 4, 3),
  ].filter((candidate): candidate is BoostCandidate => candidate !== null);

  // Spend the small adaptive budget on the weakest parts first. A full P3/P4
  // group is atomic (cost 3), so the global cap can never be exceeded even
  // when several parts simultaneously fall below the threshold.
  candidates.sort(
    (a, b) =>
      a.accuracy - b.accuracy ||
      b.questionCost - a.questionCost ||
      a.label.localeCompare(b.label),
  );

  let totalQuestions =
    part1Count + part2Count + part3GroupCount * 3 + part4GroupCount * 3;
  for (const candidate of candidates) {
    if (totalQuestions + candidate.questionCost > MAX_DAILY_LISTENING_QUESTIONS) {
      continue;
    }

    if (candidate.key === "part1Count" && part1Count < MIX_CAPS.part1Count) {
      part1Count += 1;
    } else if (candidate.key === "part2Count" && part2Count < MIX_CAPS.part2Count) {
      part2Count += 1;
    } else if (
      candidate.key === "part3GroupCount" &&
      part3GroupCount < MIX_CAPS.part3GroupCount
    ) {
      part3GroupCount += 1;
    } else if (
      candidate.key === "part4GroupCount" &&
      part4GroupCount < MIX_CAPS.part4GroupCount
    ) {
      part4GroupCount += 1;
    } else {
      continue;
    }

    totalQuestions += candidate.questionCost;
    boosted.push(candidate.label);
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

/** Faster than this (reading parts) + wrong → hint "careless" (too quick to think). */
export const FAST_FLOOR_MS: Partial<Record<Part, number>> = {
  "Part 5": 5_000,
  "Part 6": 6_000,
  "Part 7": 10_000,
};

/** Wrong + visible answering time above this multiple of the part's pacing budget → hint "speed". */
const SLOW_BUDGET_MULTIPLIER = 1.6;

/**
 * Suggest a mistake reason for a wrong answer, to pre-select in the chip UI.
 * Best-effort and pure: returns null when there is no clear signal (let the
 * learner decide). A suggestion is a HINT the learner must confirm; it never
 * enters any statistic on its own.
 *
 * - speed: reading parts only, and only from the timing split (visible time,
 *   hidden tab removed) on a question that did not also carry the passage
 *   reading for its group. Legacy `responseTimeMs` mixes audio, reading and
 *   background time and is never a speed signal (REVIEW F05).
 * - vocab: only when an `isWeakWord` predicate is supplied; the caller decides
 *   what "weak" means — a word with no record is unknown, not weak (F08).
 * - careless: very fast + wrong, reading parts only.
 *
 * Priority when several could apply: speed > vocab > careless.
 */
export function inferMistakeReason(
  question: Pick<Question, "part" | "vocabulary">,
  record: Pick<AnswerRecord, "isCorrect" | "responseTimeMs" | "timing">,
  isWeakWord?: (word: string) => boolean,
): MistakeReason | null {
  if (record.isCorrect) return null;

  const timing = record.timing;
  const budget = READING_BUDGET_MS[question.part];
  const carriesGroupReading =
    timing !== undefined && (timing.groupSize ?? 1) > 1 && (timing.groupIndex ?? 0) === 0;
  if (
    budget !== undefined &&
    timing !== undefined &&
    !carriesGroupReading &&
    timing.activeMs > budget * SLOW_BUDGET_MULTIPLIER
  ) {
    return "speed";
  }

  if (isWeakWord && question.vocabulary && question.vocabulary.length > 0) {
    if (question.vocabulary.some((word) => isWeakWord(word))) {
      return "vocab";
    }
  }

  const floor = FAST_FLOOR_MS[question.part];
  const fastMs = timing?.activeMs ?? record.responseTimeMs;
  if (floor !== undefined && fastMs !== undefined && fastMs < floor) {
    return "careless";
  }

  return null;
}

/** The reason chart and the headline read the same recent window. */
export const REASON_WINDOW_DAYS = 30;
/** Minimum confirmed wrong answers in the window before a headline is shown (avoids 1/1 = 100%). */
export const MIN_LABELED_FOR_INSIGHT = 8;
/** A reason at or above this share of confirmed wrongs counts as dominant. */
const DOMINANT_REASON_RATIO = 0.35;
/** "careless" confirmed at least this many times triggers the over-use guard. */
const CARELESS_ABUSE_MIN = 5;

/** A wrong answer whose reason the learner tapped (legacy labels without a source count as confirmed). */
function isConfirmedWrong(record: AnswerRecord): boolean {
  return (
    !record.isCorrect && record.mistakeReason !== undefined && record.reasonSource !== "inferred"
  );
}

function withinDays(record: AnswerRecord, now: Date, days: number): boolean {
  const at = Date.parse(record.answeredAt);
  return (
    !Number.isNaN(at) &&
    at >= now.getTime() - days * 86_400_000 &&
    at <= now.getTime() + 60_000
  );
}

/**
 * Confirmed wrong answers per reason in the last REASON_WINDOW_DAYS days (mock
 * excluded). Old auto-inferred labels never count: a heuristic suggestion is
 * not the learner's diagnosis. Same filter as getReasonInsight, so the chart
 * and the headline can never disagree about the denominator (REVIEW F08).
 */
export function countMistakesByReason(
  records: AnswerRecord[],
  now: Date = new Date(),
): Record<MistakeReason, number> {
  const counts = {} as Record<MistakeReason, number>;
  for (const reason of MISTAKE_REASONS) counts[reason] = 0;
  for (const r of excludeMock(records)) {
    if (isConfirmedWrong(r) && withinDays(r, now, REASON_WINDOW_DAYS) && r.mistakeReason) {
      counts[r.mistakeReason] += 1;
    }
  }
  return counts;
}

export type ReasonInsight = {
  windowDays: number;
  /** Confirmed (learner-tapped) wrong answers in the window — the denominator of every share. */
  labeled: number;
  /** Every wrong answer in the window, so the UI can say how many are still unlabeled. */
  wrongInWindow: number;
  /** Confirmed answers needed before a headline is shown. */
  required: number;
  top: { reason: MistakeReason; count: number; share: number } | null;
  /** Descriptive sentence about the learner's OWN labels, or null below `required`. */
  message: string | null;
  carelessGuard: boolean;
};

/** Neutral follow-up per reason — what to check next, not a promise about scores. */
const REASON_FOLLOW_UP: Record<MistakeReason, string> = {
  speed: "是否真的配速不足，請對照配速卡的新版計時；讀題慢也可能是單字或文法卡住。",
  vocab: "把這些題的關鍵字加入待學，下次到期再用新題確認。",
  grammar: "文法補強會用同考點的新題練習，不重做原題。",
  comprehension: "重點放在段落理解與同義改寫，不是單字量。",
  careless: "放慢、看完整句再作答；若同類型持續錯，可能不是粗心。",
  guess: "代表底層觀念還沒建立，先回到該考點的解析與新題。",
};

/**
 * Headline about the learner's self-reported reasons in the recent window.
 * Every number is "what you labeled", never an objective diagnosis:
 *  1. fewer than MIN_LABELED_FOR_INSIGHT confirmed wrongs → no message
 *  2. "careless" over-use guard (many careless labels, same skills still failing)
 *  3. a dominant reason (>= 35% of confirmed wrongs) → descriptive sentence
 *  4. otherwise → "spread out"
 */
export function getReasonInsight(records: AnswerRecord[], now: Date = new Date()): ReasonInsight {
  const inWindow = excludeMock(records).filter(
    (r) => !r.isCorrect && withinDays(r, now, REASON_WINDOW_DAYS),
  );
  const confirmed = inWindow.filter(isConfirmedWrong);
  const base: ReasonInsight = {
    windowDays: REASON_WINDOW_DAYS,
    labeled: confirmed.length,
    wrongInWindow: inWindow.length,
    required: MIN_LABELED_FOR_INSIGHT,
    top: null,
    message: null,
    carelessGuard: false,
  };
  if (confirmed.length < MIN_LABELED_FOR_INSIGHT) return base;

  const counts = countMistakesByReason(records, now);

  if (counts.careless >= CARELESS_ABUSE_MIN) {
    const skills = new Set(
      confirmed.filter((r) => r.mistakeReason === "careless").map((r) => r.skill_tag),
    );
    const onSkills = excludeMock(records).filter(
      (r) => skills.has(r.skill_tag) && withinDays(r, now, REASON_WINDOW_DAYS),
    );
    const accuracy =
      onSkills.length === 0 ? 1 : onSkills.filter((r) => r.isCorrect).length / onSkills.length;
    if (accuracy < 0.5) {
      return {
        ...base,
        carelessGuard: true,
        message: `最近 ${REASON_WINDOW_DAYS} 天你把 ${counts.careless} 題標成「粗心」，但同類型仍持續答錯——也許其實是觀念盲點？`,
      };
    }
  }

  let top: ReasonInsight["top"] = null;
  for (const reason of MISTAKE_REASONS) {
    if (counts[reason] > (top?.count ?? 0)) {
      top = { reason, count: counts[reason], share: counts[reason] / confirmed.length };
    }
  }
  if (top && top.share >= DOMINANT_REASON_RATIO) {
    const pct = Math.round(top.share * 100);
    return {
      ...base,
      top,
      message: `最近 ${REASON_WINDOW_DAYS} 天你標註的 ${confirmed.length} 題錯題中，${top.count} 題（${pct}%）標為「${MISTAKE_REASON_LABELS[top.reason]}」。${REASON_FOLLOW_UP[top.reason]}`,
    };
  }
  return {
    ...base,
    top,
    message: `最近 ${REASON_WINDOW_DAYS} 天你標註的 ${confirmed.length} 題錯題原因分散，沒有單一主因。`,
  };
}
