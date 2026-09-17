import type { Question } from "@/types/question";
import type { QuestionCatalog } from "./catalog";
import { groupByPassage, groupByTranscript } from "./groups";
import {
  shuffleUnseenFirst,
  shuffleUnseenGroupsFirst,
  selectGroupsForTotal,
} from "./selection";

type PassageGroupType = NonNullable<Question["passage_group_type"]>;

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
    throw new Error(
      `Mock test plan invalid:\n${errors.map((e) => `  - ${e}`).join("\n")}`,
    );
  }
}

/**
 * Build a 100-question mock test plan with strict part distribution:
 * Part 5 = 30, Part 6 = 16, Part 7 = 54 (single=29, double=10, triple=15).
 *
 * Pass `seenIds` (question ids answered in previous mocks) to bias selection
 * toward unseen material; seen questions are only used as a fallback.
 */
export function buildMockTestPlan(
  catalog: QuestionCatalog,
  seenIds: ReadonlySet<string> = new Set(),
): Question[] {
  const { getQuestionsByPart } = catalog;
  const errors: string[] = [];

  const part5Qs = shuffleUnseenFirst(
    getQuestionsByPart("Part 5"),
    seenIds,
  ).slice(0, 30);
  if (part5Qs.length < 30) {
    errors.push(`Part 5 只有 ${part5Qs.length}/30 題`);
  }

  const p6Groups = groupByPassage(getQuestionsByPart("Part 6")).filter(
    (group) => group.length === 4,
  );
  const selectedP6 = shuffleUnseenGroupsFirst(p6Groups, seenIds).slice(0, 4);
  if (selectedP6.length < 4) {
    errors.push(`Part 6 只有 ${selectedP6.length}/4 valid groups`);
  }

  const p7Groups = groupByPassage(getQuestionsByPart("Part 7"));
  const getType = (group: Question[]): PassageGroupType =>
    group[0]?.passage_group_type ?? "single";
  const singleGroups = p7Groups.filter((group) => getType(group) === "single");
  const doubleGroups = p7Groups.filter(
    (group) => getType(group) === "double" && group.length === 5,
  );
  const tripleGroups = p7Groups.filter(
    (group) => getType(group) === "triple" && group.length === 5,
  );

  const selectedSingles = selectGroupsForTotal(
    shuffleUnseenGroupsFirst(singleGroups, seenIds),
    29,
  );
  if (!selectedSingles) {
    const available = singleGroups.reduce(
      (sum, group) => sum + group.length,
      0,
    );
    errors.push(`Part 7 single 無法剛好組成 29 題 (available ${available})`);
  }

  const selectedDoubles = shuffleUnseenGroupsFirst(doubleGroups, seenIds).slice(
    0,
    2,
  );
  if (selectedDoubles.length < 2) {
    errors.push(`Part 7 double 只有 ${selectedDoubles.length}/2 valid groups`);
  }

  const selectedTriples = shuffleUnseenGroupsFirst(tripleGroups, seenIds).slice(
    0,
    3,
  );
  if (selectedTriples.length < 3) {
    errors.push(`Part 7 triple 只有 ${selectedTriples.length}/3 valid groups`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Mock test plan incomplete:\n${errors.map((e) => `  - ${e}`).join("\n")}`,
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
    throw new Error(
      `Listening mock test plan invalid:\n${errors.map((e) => `  - ${e}`).join("\n")}`,
    );
  }
}

/**
 * Build a 100-question TOEIC listening mock test plan.
 * Part 1 = 6, Part 2 = 25, Part 3 = 39 (13 groups × 3), Part 4 = 30 (10 groups × 3).
 *
 * Pass `seenIds` (question ids answered in previous mocks) to bias selection
 * toward unseen material; seen questions are only used as a fallback.
 */
export function buildListeningMockPlan(
  catalog: QuestionCatalog,
  seenIds: ReadonlySet<string> = new Set(),
): Question[] {
  const { getQuestionsByPart } = catalog;
  const errors: string[] = [];

  const part1Pool = shuffleUnseenFirst(getQuestionsByPart("Part 1"), seenIds);
  if (part1Pool.length < 6) {
    errors.push(`Part 1 只有 ${part1Pool.length}/6 題`);
  }

  const part2Pool = shuffleUnseenFirst(getQuestionsByPart("Part 2"), seenIds);
  if (part2Pool.length < 25) {
    errors.push(`Part 2 只有 ${part2Pool.length}/25 題`);
  }

  const part3Groups = groupByTranscript(getQuestionsByPart("Part 3")).filter(
    (group) => group.length === 3,
  );
  if (part3Groups.length < 13) {
    errors.push(`Part 3 只有 ${part3Groups.length}/13 valid transcript groups`);
  }

  const part4Groups = groupByTranscript(getQuestionsByPart("Part 4")).filter(
    (group) => group.length === 3,
  );
  if (part4Groups.length < 10) {
    errors.push(`Part 4 只有 ${part4Groups.length}/10 valid transcript groups`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Listening mock test plan incomplete:\n${errors.map((e) => `  - ${e}`).join("\n")}`,
    );
  }

  const plan = [
    ...part1Pool.slice(0, 6),
    ...part2Pool.slice(0, 25),
    ...shuffleUnseenGroupsFirst(part3Groups, seenIds).slice(0, 13).flat(),
    ...shuffleUnseenGroupsFirst(part4Groups, seenIds).slice(0, 10).flat(),
  ];
  assertListeningMockPlan(plan);
  return plan;
}
