import { createQuestionCatalog, type QuestionBankSource } from "./catalog";
import { buildDailyPlan, type DailyPlanOptions } from "./dailyPlan";
import { buildMockTestPlan, buildListeningMockPlan } from "./mockPlans";

/** Bind pure selection functions to a catalog; callers retain the existing API. */
export function createQuestionBank(sources: readonly QuestionBankSource[]) {
  const catalog = createQuestionCatalog(sources);
  return {
    ...catalog,
    buildDailyPlan: (options?: DailyPlanOptions) =>
      buildDailyPlan(catalog, options),
    buildMockTestPlan: (seenIds?: ReadonlySet<string>) =>
      buildMockTestPlan(catalog, seenIds),
    buildListeningMockPlan: (seenIds?: ReadonlySet<string>) =>
      buildListeningMockPlan(catalog, seenIds),
  };
}
