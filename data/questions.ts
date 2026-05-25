import type { Question, SkillTag } from "@/types/question";
import { QUESTIONS_PART5 } from "./questions-part5";
import { QUESTIONS_PART6 } from "./questions-part6";
import { QUESTIONS_PART7 } from "./questions-part7";
import { QUESTIONS_LISTENING } from "./questions-listening";
import { GENERATED_QUESTIONS } from "./questions-generated";

export const QUESTIONS: Question[] = [
  ...QUESTIONS_PART5,
  ...QUESTIONS_PART6,
  ...QUESTIONS_PART7,
  ...QUESTIONS_LISTENING,
  ...GENERATED_QUESTIONS,
];

export function getQuestionsByPart(part: Question["part"]): Question[] {
  return QUESTIONS.filter((q) => q.part === part);
}

export function getQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

export function getQuestionsBySkill(skill: SkillTag): Question[] {
  return QUESTIONS.filter((q) => q.skill_tag === skill);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

export function buildDailyPlan(options?: {
  weakCount?: number;
  newCount?: number;
  part6Count?: number;
  part1Count?: number;
  part2Count?: number;
  part3GroupCount?: number;
  part4GroupCount?: number;
  readingCount?: number;
  reviewIds?: string[];
  weakSkillTags?: SkillTag[];
}): { questions: Question[]; counts: PlanCounts } {
  const weakCount = options?.weakCount ?? 8;
  const newCount = options?.newCount ?? 7;
  const part6Count = options?.part6Count ?? 2;
  const part1Count = options?.part1Count ?? 2;
  const part2Count = options?.part2Count ?? 3;
  const part3GroupCount = options?.part3GroupCount ?? 1;
  const part4GroupCount = options?.part4GroupCount ?? 1;
  const readingCount = options?.readingCount ?? 3;
  const reviewIds = options?.reviewIds ?? [];
  // NB: ?? does not catch empty arrays. A caller passing [] (e.g. a new user
  // whose history has no P5 wrong answers yet) must still get a usable default,
  // otherwise weakPool filter returns [] and we silently lose 8 questions.
  const weakSkillTags =
    options?.weakSkillTags && options.weakSkillTags.length > 0
      ? options.weakSkillTags
      : ["word_form", "passive_voice"];
  const reviewIdSet = new Set(reviewIds);

  const part5Pool = getQuestionsByPart("Part 5").filter(
    (q) => !reviewIdSet.has(q.id)
  );

  const weakPool = shuffle(
    part5Pool.filter((q) => weakSkillTags.includes(q.skill_tag))
  );
  const weakQs = weakPool.slice(0, weakCount);

  if (weakQs.length < weakCount) {
    console.warn(
      `[buildDailyPlan] 弱點題庫不足，只有 ${weakQs.length}/${weakCount} 題`
    );
  }

  const usedIds = new Set([...reviewIds, ...weakQs.map((q) => q.id)]);
  const otherPool = shuffle(
    part5Pool.filter((q) => !usedIds.has(q.id))
  );
  const newQs = otherPool.slice(0, newCount);

  if (newQs.length < newCount) {
    console.warn(
      `[buildDailyPlan] 新題題庫不足，只有 ${newQs.length}/${newCount} 題`
    );
  }

  // Part 1 (photo questions, single items)
  const part1Pool = shuffle(
    getQuestionsByPart("Part 1").filter((q) => !reviewIdSet.has(q.id))
  );
  const part1Qs = part1Pool.slice(0, part1Count);
  if (part1Qs.length < part1Count) {
    console.warn(
      `[buildDailyPlan] Part 1 題庫不足，只有 ${part1Qs.length}/${part1Count} 題`
    );
  }

  // Part 2 (single Q+A items)
  const part2Pool = shuffle(
    getQuestionsByPart("Part 2").filter((q) => !reviewIdSet.has(q.id))
  );
  const part2Qs = part2Pool.slice(0, part2Count);
  if (part2Qs.length < part2Count) {
    console.warn(
      `[buildDailyPlan] Part 2 題庫不足，只有 ${part2Qs.length}/${part2Count} 題`
    );
  }

  // Part 3 — pull full transcript groups (3 Q per group) so context is intact
  const part3Groups = groupByTranscript(getQuestionsByPart("Part 3"))
    .filter((group) => group.length === 3)
    .filter((group) => group.every((q) => !reviewIdSet.has(q.id)));
  const selectedP3Groups = shuffle(part3Groups).slice(0, part3GroupCount);
  const part3Qs = selectedP3Groups.flat();
  if (selectedP3Groups.length < part3GroupCount) {
    console.warn(
      `[buildDailyPlan] Part 3 groups 不足，只有 ${selectedP3Groups.length}/${part3GroupCount} 組`
    );
  }

  // Part 4 — same group-based approach
  const part4Groups = groupByTranscript(getQuestionsByPart("Part 4"))
    .filter((group) => group.length === 3)
    .filter((group) => group.every((q) => !reviewIdSet.has(q.id)));
  const selectedP4Groups = shuffle(part4Groups).slice(0, part4GroupCount);
  const part4Qs = selectedP4Groups.flat();
  if (selectedP4Groups.length < part4GroupCount) {
    console.warn(
      `[buildDailyPlan] Part 4 groups 不足，只有 ${selectedP4Groups.length}/${part4GroupCount} 組`
    );
  }

  const part6Pool = shuffle(
    getQuestionsByPart("Part 6").filter((q) => !reviewIdSet.has(q.id))
  );
  const part6Qs = part6Pool.slice(0, part6Count);

  const readingPool = shuffle(
    getQuestionsByPart("Part 7").filter((q) => !reviewIdSet.has(q.id))
  );
  const readingQs = readingPool.slice(0, readingCount);

  if (readingQs.length < readingCount) {
    console.warn(
      `[buildDailyPlan] Part 7 題庫不足，只有 ${readingQs.length}/${readingCount} 題`
    );
  }

  const reviewQs = reviewIds
    .map((id) => getQuestionById(id))
    .filter((q): q is Question => Boolean(q))
    .slice(0, 5);

  return {
    questions: [
      ...weakQs,
      ...newQs,
      ...part6Qs,
      ...part1Qs,
      ...part2Qs,
      ...part3Qs,
      ...part4Qs,
      ...readingQs,
      ...reviewQs,
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
  };
}

// ─── Mock Test Plan ─────────────────────────────────────────────────────────

type PassageGroupType = NonNullable<Question["passage_group_type"]>;

function getPassageGroupKey(q: Question): string | null {
  if (!q.passage) return null;
  return q.passage_group_id
    ? `${q.part}:${q.passage_group_id}:${q.passage}`
    : `${q.part}:passage:${q.passage}`;
}

function groupByPassage(questions: Question[]): Question[][] {
  const groups = new Map<string, Question[]>();

  for (const q of questions) {
    const key = getPassageGroupKey(q);
    if (!key) continue;
    const group = groups.get(key) ?? [];
    group.push(q);
    groups.set(key, group);
  }

  return [...groups.values()].map((group) =>
    [...group].sort(
      (a, b) =>
        (a.question_order ?? Number.MAX_SAFE_INTEGER) -
        (b.question_order ?? Number.MAX_SAFE_INTEGER)
    )
  );
}

function selectGroupsForTotal(groups: Question[][], target: number): Question[][] | null {
  const shuffled = shuffle(groups);
  const sums = new Map<number, Question[][]>();
  sums.set(0, []);

  for (const group of shuffled) {
    const snapshots = [...sums.entries()];
    for (const [sum, selected] of snapshots) {
      const nextSum = sum + group.length;
      if (nextSum > target || sums.has(nextSum)) continue;
      const nextSelected = [...selected, group];
      if (nextSum === target) return nextSelected;
      sums.set(nextSum, nextSelected);
    }
  }

  return sums.get(target) ?? null;
}

function countPart(questions: Question[], part: Question["part"]): number {
  return questions.filter((q) => q.part === part).length;
}

function assertMockPlan(plan: Question[]): void {
  const part5 = countPart(plan, "Part 5");
  const part6 = countPart(plan, "Part 6");
  const part7 = countPart(plan, "Part 7");
  const errors: string[] = [];

  if (plan.length !== 100) errors.push(`總題數 ${plan.length}/100`);
  if (part5 !== 30) errors.push(`Part 5 ${part5}/30`);
  if (part6 !== 16) errors.push(`Part 6 ${part6}/16`);
  if (part7 !== 54) errors.push(`Part 7 ${part7}/54`);

  if (errors.length > 0) {
    throw new Error(`Mock test plan invalid:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  }
}

/**
 * Build a 100-question mock test plan with strict part distribution:
 * Part 5 = 30, Part 6 = 16, Part 7 = 54 (single=29, double=10, triple=15).
 */
export function buildMockTestPlan(): Question[] {
  const errors: string[] = [];

  const part5Qs = shuffle(getQuestionsByPart("Part 5")).slice(0, 30);
  if (part5Qs.length < 30) {
    errors.push(`Part 5 只有 ${part5Qs.length}/30 題`);
  }

  const p6Groups = groupByPassage(getQuestionsByPart("Part 6")).filter(
    (group) => group.length === 4
  );
  const selectedP6 = shuffle(p6Groups).slice(0, 4);
  if (selectedP6.length < 4) {
    errors.push(`Part 6 只有 ${selectedP6.length}/4 valid groups`);
  }

  const p7Groups = groupByPassage(getQuestionsByPart("Part 7"));
  const getType = (group: Question[]): PassageGroupType =>
    group[0]?.passage_group_type ?? "single";
  const singleGroups = p7Groups.filter((group) => getType(group) === "single");
  const doubleGroups = p7Groups.filter(
    (group) => getType(group) === "double" && group.length === 5
  );
  const tripleGroups = p7Groups.filter(
    (group) => getType(group) === "triple" && group.length === 5
  );

  const selectedSingles = selectGroupsForTotal(singleGroups, 29);
  if (!selectedSingles) {
    const available = singleGroups.reduce((sum, group) => sum + group.length, 0);
    errors.push(`Part 7 single 無法剛好組成 29 題 (available ${available})`);
  }

  const selectedDoubles = shuffle(doubleGroups).slice(0, 2);
  if (selectedDoubles.length < 2) {
    errors.push(`Part 7 double 只有 ${selectedDoubles.length}/2 valid groups`);
  }

  const selectedTriples = shuffle(tripleGroups).slice(0, 3);
  if (selectedTriples.length < 3) {
    errors.push(`Part 7 triple 只有 ${selectedTriples.length}/3 valid groups`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Mock test plan incomplete:\n${errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  const plan = [
    ...part5Qs,
    ...selectedP6.flat(),
    ...(selectedSingles ?? []).flat(),
    ...selectedDoubles.flat(),
    ...selectedTriples.flat(),
  ];
  assertMockPlan(plan);
  return plan;
}

// ─── Listening Mock Test Plan ───────────────────────────────────────────────

function groupByTranscript(questions: Question[]): Question[][] {
  const groups = new Map<string, Question[]>();

  for (const q of questions) {
    if (!q.transcript) continue;
    const key = `${q.part}:transcript:${q.transcript}`;
    const group = groups.get(key) ?? [];
    group.push(q);
    groups.set(key, group);
  }

  return [...groups.values()].map((group) =>
    [...group].sort(
      (a, b) =>
        (a.question_order ?? Number.MAX_SAFE_INTEGER) -
        (b.question_order ?? Number.MAX_SAFE_INTEGER)
    )
  );
}

function assertListeningMockPlan(plan: Question[]): void {
  const part1 = countPart(plan, "Part 1");
  const part2 = countPart(plan, "Part 2");
  const part3 = countPart(plan, "Part 3");
  const part4 = countPart(plan, "Part 4");
  const errors: string[] = [];

  if (plan.length !== 100) errors.push(`總題數 ${plan.length}/100`);
  if (part1 !== 6) errors.push(`Part 1 ${part1}/6`);
  if (part2 !== 25) errors.push(`Part 2 ${part2}/25`);
  if (part3 !== 39) errors.push(`Part 3 ${part3}/39`);
  if (part4 !== 30) errors.push(`Part 4 ${part4}/30`);

  if (errors.length > 0) {
    throw new Error(`Listening mock test plan invalid:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  }
}

/**
 * Build a 100-question TOEIC listening mock test plan.
 * Part 1 = 6, Part 2 = 25, Part 3 = 39 (13 groups × 3), Part 4 = 30 (10 groups × 3).
 */
export function buildListeningMockPlan(): Question[] {
  const errors: string[] = [];

  const part1Pool = shuffle(getQuestionsByPart("Part 1"));
  if (part1Pool.length < 6) {
    errors.push(`Part 1 只有 ${part1Pool.length}/6 題`);
  }

  const part2Pool = shuffle(getQuestionsByPart("Part 2"));
  if (part2Pool.length < 25) {
    errors.push(`Part 2 只有 ${part2Pool.length}/25 題`);
  }

  const part3Groups = groupByTranscript(getQuestionsByPart("Part 3")).filter(
    (group) => group.length === 3
  );
  if (part3Groups.length < 13) {
    errors.push(`Part 3 只有 ${part3Groups.length}/13 valid transcript groups`);
  }

  const part4Groups = groupByTranscript(getQuestionsByPart("Part 4")).filter(
    (group) => group.length === 3
  );
  if (part4Groups.length < 10) {
    errors.push(`Part 4 只有 ${part4Groups.length}/10 valid transcript groups`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Listening mock test plan incomplete:\n${errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  const plan = [
    ...part1Pool.slice(0, 6),
    ...part2Pool.slice(0, 25),
    ...shuffle(part3Groups).slice(0, 13).flat(),
    ...shuffle(part4Groups).slice(0, 10).flat(),
  ];
  assertListeningMockPlan(plan);
  return plan;
}
