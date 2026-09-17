import type { AnswerRecord, AnswerTiming, Part, Question } from "@/types/question";
import { PART_LIST, getPartSection } from "@/types/question";
import { partitionAttempts } from "@/lib/attemptEvidence";

/**
 * Pacing evidence (review F05). Only records that carry the timing split
 * (`timing.activeMs`, hidden-tab time removed) can say anything about pacing;
 * legacy `responseTimeMs` mixed audio, passage reading and background time
 * and is excluded here — the report says how many such records were skipped
 * instead of quietly averaging them.
 *
 * Reading budgets are the usual test-prep guidance for the 75-minute reading
 * section (≈ 10 min / 30 Part 5, ≈ 8 min / 16 Part 6, ≈ 55 min / 54 Part 7);
 * ETS publishes the section times, not per-question targets, so these are
 * labelled as advice, never as an official standard. Listening is paced by
 * the recording: we report visible non-playback time (not reaction time) and
 * never flag it. Only first attempts contribute evidence.
 */
export const READING_BUDGET_MS: Partial<Record<Part, number>> = {
  "Part 5": 25_000,
  "Part 6": 35_000,
  "Part 7": 60_000,
};

export const PACING_BUDGET_SOURCE = "常見備考配速建議（非 ETS 官方標準）";

/** Fewer usable records than this per part → "資料不足", no verdict. */
export const PACING_MIN_SAMPLE = 8;

/** Full-bank size prevents an isolated wrongbook item from becoming a complete passage. */
export function studyGroupTiming(question: Question, bank: Question[], plan: Question[]):
  Pick<AnswerTiming, "groupId" | "groupSize" | "groupIndex"> {
  const key = (q: Question): string => {
    if (q.part === "Part 3" || q.part === "Part 4") return `${q.part}:${q.transcript ?? q.id}`;
    if (q.part === "Part 6" || q.part === "Part 7") return `${q.part}:${q.passage_group_id ?? q.passage ?? q.id}`;
    return q.id;
  };
  const group = bank.filter((q) => key(q) === key(question));
  if (group.length <= 1) return {};
  const planned = plan.filter((q) => key(q) === key(question));
  const ordered = planned.length === group.length ? planned : group;
  return {
    groupId: group.map((q) => q.id).sort().join(","),
    groupIndex: ordered.findIndex((q) => q.id === question.id),
    groupSize: group.length,
  };
}

export type PacingRow = {
  part: Part;
  /** Usable (timed, fresh, non-mock) attempts. */
  sample: number;
  /** Median per-question time in ms, or null when the sample is too small. */
  medianMs: number | null;
  budgetMs: number | null;
  status: "insufficient" | "within" | "over" | "listening";
  /** Timed records that could not be used (e.g. incomplete group). */
  legacyExcluded: number;
};

export type PacingReport = {
  rows: PacingRow[];
  usableRecords: number;
  /** Non-mock records without the timing split — invisible to pacing. */
  legacyRecords: number;
  minSample: number;
  budgetSource: string;
  repeatsExcluded: number;
};

function partOf(record: AnswerRecord): Part | null {
  const match = /^p([1-7])-/.exec(record.questionId);
  if (!match) return null;
  const part = `Part ${match[1]}` as Part;
  return PART_LIST.includes(part) ? part : null;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = values.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}

/**
 * Per-question times for one part. Passage/transcript groups are rebuilt from
 * consecutive first attempts with matching group and session identities
 * (groupIndex 0 … groupSize-1), and their total time
 * is spread evenly across the group, so the first question does not look slow
 * for having carried the reading. Incomplete groups are skipped.
 */
function perQuestionTimes(records: AnswerRecord[]): { times: number[]; skipped: number } {
  const ordered = records.slice().sort((a, b) => a.answeredAt.localeCompare(b.answeredAt));
  const times: number[] = [];
  let skipped = 0;
  let index = 0;
  while (index < ordered.length) {
    const record = ordered[index];
    const timing = record.timing;
    if (!timing) {
      index += 1;
      continue;
    }
    const size = timing.groupSize ?? 1;
    if (size <= 1) {
      times.push(answerTime(record));
      index += 1;
      continue;
    }
    if (timing.groupIndex !== 0 || !timing.groupId || !timing.sessionId) {
      // Orphaned member (its group start is missing or out of order).
      skipped += 1;
      index += 1;
      continue;
    }
    const group = ordered.slice(index, index + size);
    const complete =
      group.length === size &&
      group.every((member, offset) => member.timing?.groupIndex === offset && member.timing?.groupSize === size &&
        member.timing?.groupId === timing.groupId && member.timing?.sessionId === timing.sessionId);
    if (!complete) {
      skipped += 1;
      index += 1;
      continue;
    }
    const total = group.reduce((sum, member) => sum + answerTime(member), 0);
    for (let i = 0; i < size; i++) times.push(Math.round(total / size));
    index += size;
  }
  return { times, skipped };
}

/** Visible time spent answering; listening subtracts the audio playback. */
function answerTime(record: AnswerRecord): number {
  const timing = record.timing;
  if (!timing) return 0;
  const part = partOf(record);
  if (part && getPartSection(part) === "listening") {
    return Math.max(0, timing.activeMs - (timing.audioMs ?? 0));
  }
  return Math.max(0, timing.activeMs);
}

export function buildPacingReport(
  records: AnswerRecord[],
  options: { minSample?: number } = {},
): PacingReport {
  const minSample = options.minSample ?? PACING_MIN_SAMPLE;
  const partitioned = partitionAttempts(records);
  const nonMock = partitioned.fresh.filter((record) => record.source !== "mock");
  const timed = nonMock.filter((record) => {
    const timing = record.timing;
    const part = partOf(record);
    return timing !== undefined && Number.isFinite(timing.activeMs) && timing.activeMs >= 0 &&
      (part !== "Part 6" && part !== "Part 7" || (timing.groupSize ?? 0) > 1) &&
      (part === null || getPartSection(part) !== "listening" ||
        (timing.version === 2 && timing.audioMs !== undefined && Number.isFinite(timing.audioMs) &&
          timing.audioMs >= 0 && timing.audioMs <= timing.activeMs));
  });
  const rows: PacingRow[] = PART_LIST.map((part) => {
    const partRecords = timed.filter((record) => partOf(record) === part);
    const { times, skipped } = perQuestionTimes(partRecords);
    const budgetMs = READING_BUDGET_MS[part] ?? null;
    const medianMs = times.length >= minSample ? median(times) : null;
    let status: PacingRow["status"] = "insufficient";
    if (medianMs !== null) {
      if (getPartSection(part) === "listening") status = "listening";
      else if (budgetMs !== null && medianMs > budgetMs) status = "over";
      else status = "within";
    }
    return { part, sample: times.length, medianMs, budgetMs, status, legacyExcluded: skipped };
  });
  return {
    rows,
    usableRecords: rows.reduce((sum, row) => sum + row.sample, 0),
    legacyRecords: nonMock.length - timed.length,
    minSample,
    budgetSource: PACING_BUDGET_SOURCE,
    repeatsExcluded: partitioned.repeats.filter((record) => record.source !== "mock").length,
  };
}
