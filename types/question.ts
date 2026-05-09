export type SkillTag =
  | "passive_voice"
  | "word_form"
  | "tense"
  | "preposition"
  | "conjunction"
  | "business_vocabulary"
  | "listening_main_idea"
  | "listening_inference"
  | "listening_next_action"
  | "reading_main_idea"
  | "reading_detail"
  | "reading_inference";

export type Choice = "A" | "B" | "C" | "D";

export type Difficulty = "A2" | "B1" | "B2";

export type Part = "Part 5" | "Part 3" | "Part 4" | "Part 7";

export type WrongBookStatus = "new" | "reviewing" | "improving" | "mastered";

export type Question = {
  id: string;
  part: Part;
  question: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: Choice;
  explanation_zh: string;
  explanation_en?: string;
  skill_tag: SkillTag;
  difficulty: Difficulty;
  vocabulary?: string[];
  transcript?: string;
  passage?: string;
};

export type AnswerRecord = {
  questionId: string;
  userAnswer: Choice;
  correctAnswer: Choice;
  isCorrect: boolean;
  skill_tag: SkillTag;
  answeredAt: string;
  responseTimeMs?: number;
};

export const SKILL_LABELS: Record<SkillTag, string> = {
  passive_voice: "被動語態",
  word_form: "詞性判斷",
  tense: "時態",
  preposition: "介系詞",
  conjunction: "連接詞",
  business_vocabulary: "商務單字",
  listening_main_idea: "聽力主旨",
  listening_inference: "聽力推論",
  listening_next_action: "聽力下一步",
  reading_main_idea: "閱讀主旨",
  reading_detail: "閱讀細節",
  reading_inference: "閱讀推論",
};
