import type { AnswerRecord, SkillTag } from "@/types/question";
import { SKILL_LABELS } from "@/types/question";

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
  const part6Mistakes = records.filter(
    (r) => !r.isCorrect && isPart6Record(r)
  ).length;
  const part6Total = records.filter((r) => isPart6Record(r)).length;
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

// ─── Part 5 / Part 6 / Listening breakdown ──────────────────────────────────

export function calculatePart5Accuracy(records: AnswerRecord[]): number {
  return calculateAccuracy(excludeMock(records).filter((r) => PART5_SKILLS.has(r.skill_tag)));
}

export function countPart5Attempts(records: AnswerRecord[]): number {
  return excludeMock(records).filter((r) => PART5_SKILLS.has(r.skill_tag)).length;
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
