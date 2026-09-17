/** Lazy-loaded composition root. Browser code uses lib/questionBank.ts. */
import { QUESTION_BANK_SOURCES } from "./question-banks.generated";
import { createQuestionBank } from "@/lib/questions/createBank";

export type { QuestionFilter } from "@/lib/questions/catalog";
export type {
  DailyPlanOptions,
  PlanCounts,
  PlanFocus,
} from "@/lib/questions/dailyPlan";
export { BASELINE_WEAK_SKILLS } from "@/lib/questions/dailyPlan";

export const {
  QUESTIONS,
  QUESTION_BANKS,
  getQuestionById,
  getQuestionsByPart,
  queryQuestions,
  getQuestionSource,
  buildDailyPlan,
  buildMockTestPlan,
  buildListeningMockPlan,
} = createQuestionBank(QUESTION_BANK_SOURCES);
