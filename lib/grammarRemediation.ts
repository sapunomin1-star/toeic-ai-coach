import { queryQuestions } from "@/data/questions";
import { getGrammarWeakSkills } from "@/lib/analysis";
import type { AnswerRecord } from "@/types/question";

export function buildGrammarVariantPlan(
  records: AnswerRecord[],
  options?: { maxQuestions?: number },
): string[] {
  const maxQuestions = Math.max(0, Math.floor(options?.maxQuestions ?? 5));
  if (maxQuestions === 0) return [];

  const excludeIds = new Set(records.map((record) => record.questionId));
  const pools = getGrammarWeakSkills(records)
    .map(({ skill }) =>
      queryQuestions({ skills: [skill], excludeIds }).map((question) => question.id),
    )
    .filter((ids) => ids.length > 0);

  const selectedIds = new Set<string>();
  const plan: string[] = [];
  let round = 0;

  while (
    plan.length < maxQuestions &&
    pools.some((ids) => round < ids.length)
  ) {
    for (const ids of pools) {
      if (plan.length >= maxQuestions) break;
      const id = ids[round];
      if (!id || selectedIds.has(id)) continue;
      selectedIds.add(id);
      plan.push(id);
    }
    round++;
  }

  return plan;
}
