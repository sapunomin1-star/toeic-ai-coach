import type { Question, SkillTag, Part } from "@/types/question";
import { SKILL_LABELS } from "@/types/question";
import type { QuestionCatalog } from "./catalog";
import { groupByPassage, groupByTranscript } from "./groups";
import { shuffleUnseenFirst, shuffleUnseenGroupsFirst } from "./selection";

export type PlanCounts = {
  weak: number;
  new: number;
  part6: number;
  part1: number;
  part2: number;
  part3: number;
  part4: number;
  reading: number;
  review: number;
};

/**
 * What the plan did about the coach's focus (review F09): which focus skills
 * actually landed in the plan, and an honest note when none could — so the
 * practice page never calls a general draw "弱點補強".
 */
export type PlanFocus = {
  skills: SkillTag[];
  /** Previously unseen, non-review questions in the plan per focus skill. */
  matched: Partial<Record<SkillTag, number>>;
  /** True when no weakness evidence existed and Part 5 fell back to the baseline skills. */
  baseline: boolean;
  note: string;
};

/** Part 5 skills used to build a first baseline when there is no weakness evidence yet. */
export const BASELINE_WEAK_SKILLS: SkillTag[] = ["word_form", "passive_voice"];

function hasFocusSkill(
  question: Question,
  focusSkills: ReadonlySet<SkillTag>,
): boolean {
  return focusSkills.has(question.skill_tag);
}

/**
 * Plan ordering for single-question pools: unseen focus questions, then the
 * other unseen ones, then seen focus, then seen. Each tier stays shuffled so
 * the focus preference never makes the same item reappear day after day.
 */
function orderPoolForPlan(
  pool: Question[],
  seenIds: ReadonlySet<string>,
  focusSkills: ReadonlySet<SkillTag>,
): Question[] {
  const ordered = shuffleUnseenFirst(pool, seenIds);
  if (focusSkills.size === 0) return ordered;
  const unseen = ordered.filter((q) => !seenIds.has(q.id));
  const seen = ordered.filter((q) => seenIds.has(q.id));
  const split = (items: Question[]) => [
    ...items.filter((q) => hasFocusSkill(q, focusSkills)),
    ...items.filter((q) => !hasFocusSkill(q, focusSkills)),
  ];
  return [...split(unseen), ...split(seen)];
}

/** Same idea for groups: a group counts as focus when ANY member tests a focus skill. */
function orderGroupsForPlan(
  groups: Question[][],
  seenIds: ReadonlySet<string>,
  focusSkills: ReadonlySet<SkillTag>,
): Question[][] {
  const ordered = shuffleUnseenGroupsFirst(groups, seenIds);
  if (focusSkills.size === 0) return ordered;
  const isUnseen = (group: Question[]) =>
    group.every((q) => !seenIds.has(q.id));
  const isFocus = (group: Question[]) =>
    group.some((q) => hasFocusSkill(q, focusSkills));
  const split = (items: Question[][]) => [
    ...items.filter(isFocus),
    ...items.filter((g) => !isFocus(g)),
  ];
  return [
    ...split(ordered.filter(isUnseen)),
    ...split(ordered.filter((g) => !isUnseen(g))),
  ];
}

function describeFocus(
  focusSkills: SkillTag[],
  planned: Question[],
  baseline: boolean,
  weakSkillTags: SkillTag[],
  seenIds: ReadonlySet<string>,
): PlanFocus {
  const matched: PlanFocus["matched"] = {};
  for (const skill of focusSkills) {
    matched[skill] = planned.filter(
      (q) => q.skill_tag === skill && !seenIds.has(q.id),
    ).length;
  }
  const label = (skills: SkillTag[]) =>
    skills.map((skill) => SKILL_LABELS[skill]).join("、");
  let note: string;
  if (focusSkills.length === 0) {
    note = baseline
      ? `尚無弱點證據：Part 5 以預設考點（${label(weakSkillTags)}）建立基準，不算弱點補強；其餘依一般比例抽題。`
      : "本次沒有指定考點，依一般比例抽題。";
  } else {
    const hits = focusSkills.filter((skill) => (matched[skill] ?? 0) > 0);
    const misses = focusSkills.filter((skill) => (matched[skill] ?? 0) === 0);
    const hitTotal = hits.reduce(
      (sum, skill) => sum + (matched[skill] ?? 0),
      0,
    );
    if (hits.length === 0) {
      note = `「${label(focusSkills)}」目前沒有可用的未見新題，本次改為一般抽題，不算專項補強。`;
    } else {
      note =
        `針對「${label(hits)}」排入 ${hitTotal} 題新題` +
        (misses.length > 0
          ? `；「${label(misses)}」目前沒有可用的未見新題，這部分改為一般抽題，不算專項補強`
          : "") +
        "。";
    }
  }
  return { skills: focusSkills, matched, baseline, note };
}

export type DailyPlanOptions = {
  weakCount?: number;
  newCount?: number;
  /** @deprecated Daily Part 6 is now atomic by passage; use part6GroupCount. */
  part6Count?: number;
  part6GroupCount?: number;
  part1Count?: number;
  part2Count?: number;
  part3GroupCount?: number;
  part4GroupCount?: number;
  /** @deprecated Daily Part 7 is now atomic by passage; use readingGroupCount. */
  readingCount?: number;
  readingGroupCount?: number;
  reviewIds?: string[];
  reviewCount?: number;
  weakSkillTags?: SkillTag[];
  /**
   * Skills the coach is targeting today (any part). Group-based parts pick
   * unseen groups containing one of these skills before other unseen groups,
   * so a "閱讀推論待確認" recommendation actually reaches the plan; the
   * returned `focus` says what was matched, or that nothing could be (F09).
   */
  focusSkills?: SkillTag[];
  /**
   * Question ids the user has answered before (any source). Pools prefer
   * unanswered material and only fall back to repeats when a pool runs dry —
   * otherwise "新題" silently re-serves old questions and the daily accuracy
   * measures recall instead of ability. Mirrors the mock seen-ids mechanism.
   */
  answeredIds?: ReadonlySet<string>;
};

export function buildDailyPlan(
  catalog: QuestionCatalog,
  options?: DailyPlanOptions,
): { questions: Question[]; counts: PlanCounts; focus: PlanFocus } {
  const { getQuestionsByPart, getQuestionById } = catalog;
  const weakCount = options?.weakCount ?? 3;
  const newCount = options?.newCount ?? 3;
  // Passage-based parts are indivisible learning units. Legacy positive
  // question counts continue to mean "include one group" so old callers do
  // not silently lose the part, while zero still disables it.
  const requestedPart6Groups =
    options?.part6GroupCount ?? (options?.part6Count === 0 ? 0 : 1);
  const part6GroupCount = Math.max(0, Math.floor(requestedPart6Groups));
  const part1Count = options?.part1Count ?? 1;
  const part2Count = options?.part2Count ?? 2;
  const part3GroupCount = options?.part3GroupCount ?? 1;
  const part4GroupCount = options?.part4GroupCount ?? 1;
  const requestedReadingGroups =
    options?.readingGroupCount ?? (options?.readingCount === 0 ? 0 : 1);
  const readingGroupCount = Math.max(0, Math.floor(requestedReadingGroups));
  const reviewCount = Math.max(0, Math.floor(options?.reviewCount ?? 3));
  const reviewIds = (options?.reviewIds ?? []).slice(0, reviewCount);
  // NB: ?? does not catch empty arrays. A caller passing [] (e.g. a new user
  // whose history has no P5 wrong answers yet) must still get a usable default,
  // otherwise weakPool filter returns [] and we silently lose the weak block.
  const hasWeakEvidence = Boolean(
    options?.weakSkillTags && options.weakSkillTags.length > 0,
  );
  const weakSkillTags: SkillTag[] = hasWeakEvidence
    ? (options?.weakSkillTags as SkillTag[])
    : BASELINE_WEAK_SKILLS;
  const focusSkills = new Set<SkillTag>(options?.focusSkills ?? []);
  const reviewIdSet = new Set(reviewIds);
  const answeredIds = options?.answeredIds ?? new Set<string>();

  const part5Pool = getQuestionsByPart("Part 5").filter(
    (q) => !reviewIdSet.has(q.id),
  );

  const weakPool = shuffleUnseenFirst(
    part5Pool.filter((q) => weakSkillTags.includes(q.skill_tag)),
    answeredIds,
  );
  const weakQs = weakPool.slice(0, weakCount);

  if (weakQs.length < weakCount) {
    console.warn(
      `[buildDailyPlan] 弱點題庫不足，只有 ${weakQs.length}/${weakCount} 題`,
    );
  }

  const usedIds = new Set([...reviewIds, ...weakQs.map((q) => q.id)]);
  const otherPool = shuffleUnseenFirst(
    part5Pool.filter((q) => !usedIds.has(q.id)),
    answeredIds,
  );
  const newQs = otherPool.slice(0, newCount);

  if (newQs.length < newCount) {
    console.warn(
      `[buildDailyPlan] 新題題庫不足，只有 ${newQs.length}/${newCount} 題`,
    );
  }

  function selectSingles(part: Part, count: number): Question[] {
    const pool = getQuestionsByPart(part).filter((q) => !reviewIdSet.has(q.id));
    const selected = orderPoolForPlan(pool, answeredIds, focusSkills).slice(
      0,
      count,
    );
    if (selected.length < count)
      console.warn(
        `[buildDailyPlan] ${part} 題庫不足，只有 ${selected.length}/${count} 題`,
      );
    return selected;
  }

  function selectGroups(
    part: Part,
    groups: Question[][],
    count: number,
  ): Question[] {
    const pool = groups.filter((group) =>
      group.every((q) => !reviewIdSet.has(q.id)),
    );
    const selected = orderGroupsForPlan(pool, answeredIds, focusSkills).slice(
      0,
      count,
    );
    if (selected.length < count)
      console.warn(
        `[buildDailyPlan] ${part} groups 不足，只有 ${selected.length}/${count} 組`,
      );
    return selected.flat();
  }

  const part1Qs = selectSingles("Part 1", part1Count);
  const part2Qs = selectSingles("Part 2", part2Count);
  const part3Qs = selectGroups(
    "Part 3",
    groupByTranscript(getQuestionsByPart("Part 3")).filter(
      (group) => group.length === 3,
    ),
    part3GroupCount,
  );
  const part4Qs = selectGroups(
    "Part 4",
    groupByTranscript(getQuestionsByPart("Part 4")).filter(
      (group) => group.length === 3,
    ),
    part4GroupCount,
  );
  // Reading and listening groups stay atomic, even in a short daily session.
  const part6Qs = selectGroups(
    "Part 6",
    groupByPassage(getQuestionsByPart("Part 6")).filter(
      (group) => group.length === 4,
    ),
    part6GroupCount,
  );
  // Longer double/triple sets belong to mocks, where reading time is budgeted.
  const readingQs = selectGroups(
    "Part 7",
    groupByPassage(getQuestionsByPart("Part 7")).filter(
      (group) =>
        group.length >= 2 &&
        group.length <= 4 &&
        group.every((q) => q.passage_group_type === "single"),
    ),
    readingGroupCount,
  );

  const reviewQs = reviewIds
    .map((id) => getQuestionById(id))
    .filter((q): q is Question => Boolean(q));

  const focus = describeFocus(
    [...focusSkills],
    [
      ...weakQs,
      ...newQs,
      ...part6Qs,
      ...part1Qs,
      ...part2Qs,
      ...part3Qs,
      ...part4Qs,
      ...readingQs,
    ],
    !hasWeakEvidence,
    weakSkillTags,
    answeredIds,
  );

  return {
    questions: [
      // Retrieval practice has the highest learning value and is time-sensitive;
      // keep due reviews first so a short/abandoned session still reaches them.
      ...reviewQs,
      ...weakQs,
      ...newQs,
      ...part6Qs,
      ...part1Qs,
      ...part2Qs,
      ...part3Qs,
      ...part4Qs,
      ...readingQs,
    ],
    counts: {
      weak: weakQs.length,
      new: newQs.length,
      part6: part6Qs.length,
      part1: part1Qs.length,
      part2: part2Qs.length,
      part3: part3Qs.length,
      part4: part4Qs.length,
      reading: readingQs.length,
      review: reviewQs.length,
    },
    focus,
  };
}
