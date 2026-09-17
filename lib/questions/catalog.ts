import type {
  Question,
  Part,
  SkillTag,
  SkillCategory,
  Difficulty,
} from "@/types/question";
import { getSkillCategory } from "@/types/question";
import { isDisputedQuestion } from "@/data/question-revisions";

export type QuestionBankSource = {
  id: string;
  title: string;
  questions: Question[];
};

export type QuestionFilter = {
  parts?: Part[];
  skills?: SkillTag[];
  categories?: SkillCategory[];
  difficulties?: Difficulty[];
  bankIds?: string[];
  excludeIds?: Iterable<string>;
  /** Only enable for historical review; disputed questions are excluded from practice. */
  includeDisputed?: boolean;
};

/** Content-independent index. A new source needs no changes to planners or UI. */
export function createQuestionCatalog(sources: readonly QuestionBankSource[]) {
  const QUESTIONS = sources.flatMap((source) => source.questions);
  const byId = new Map<string, Question>();
  const byPart = new Map<Part, Question[]>();
  const sourceByQuestion = new Map<string, QuestionBankSource>();
  const sourceIds = new Set<string>();
  for (const source of sources) {
    if (sourceIds.has(source.id))
      throw new Error(`Duplicate question bank: ${source.id}`);
    sourceIds.add(source.id);
    for (const question of source.questions) {
      if (byId.has(question.id))
        throw new Error(`Duplicate question id: ${question.id}`);
      byId.set(question.id, question);
      const part = byPart.get(question.part) ?? [];
      part.push(question);
      byPart.set(question.part, part);
      sourceByQuestion.set(question.id, source);
    }
  }

  function queryQuestions(filter: QuestionFilter = {}): Question[] {
    const exclude = filter.excludeIds ? new Set(filter.excludeIds) : null;
    const parts = filter.parts ? new Set(filter.parts) : null;
    const skills = filter.skills ? new Set(filter.skills) : null;
    const categories = filter.categories ? new Set(filter.categories) : null;
    const difficulties = filter.difficulties
      ? new Set(filter.difficulties)
      : null;
    const banks = filter.bankIds ? new Set(filter.bankIds) : null;
    return QUESTIONS.filter((q) => {
      if (!filter.includeDisputed && isDisputedQuestion(q.id)) return false;
      if (exclude?.has(q.id)) return false;
      if (parts && !parts.has(q.part)) return false;
      if (skills && !skills.has(q.skill_tag)) return false;
      if (categories && !categories.has(getSkillCategory(q.skill_tag)))
        return false;
      if (difficulties && !difficulties.has(q.difficulty)) return false;
      if (banks && !banks.has(sourceByQuestion.get(q.id)!.id)) return false;
      return true;
    });
  }

  return {
    QUESTIONS,
    QUESTION_BANKS: sources.map(({ id, title, questions }) => ({
      id,
      title,
      count: questions.length,
    })),
    queryQuestions,
    getQuestionById: (id: string) => byId.get(id),
    getQuestionSource: (id: string) => sourceByQuestion.get(id)?.id,
    getQuestionsByPart: (part: Part) =>
      (byPart.get(part) ?? []).filter((q) => !isDisputedQuestion(q.id)),
  };
}

export type QuestionCatalog = ReturnType<typeof createQuestionCatalog>;
