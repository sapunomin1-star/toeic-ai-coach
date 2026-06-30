import type { SkillTag, Difficulty, Part, Choice } from "../../types/question";

// ─── Pattern types ──────────────────────────────────────────────────────────

export type PatternId = string;

export type QuestionMix = Partial<Record<SkillTag, number>>;

export type Pattern = {
  pattern_id: PatternId;
  part: Part;
  /** e.g. "single-passage", "sentence-completion" */
  document_type: string;
  /** e.g. "email", "passive_voice" */
  subtype: string;
  /** business scenario topic */
  topic: string;
  /** formal / informal / neutral */
  tone: string;
  difficulty: Difficulty;
  /** e.g. "100-160 words" */
  passage_length?: string;
  /** e.g. "12-18 words" */
  sentence_length?: string;
  /** expected question type distribution */
  question_mix?: QuestionMix;
  /** grammar focus (Part 5) */
  grammar_focus?: string;
  /** tested skills (Part 6) */
  tested_skills?: string[];
  /** business vocabulary themes */
  vocabulary_themes: string[];
  /** common distractor strategies */
  distractor_patterns: string[];
  /** instruction for LLM generation */
  generation_instruction: string;
  /** flat tags for keyword matching */
  tags: string[];
  /** reference question IDs in existing bank */
  example_question_ids?: string[];
};

export type PatternLibrary = {
  patterns: Pattern[];
  metadata: {
    version: string;
    created_at: string;
    updated_at: string;
    total_patterns: number;
  };
};

// ─── Generation types ───────────────────────────────────────────────────────

/** Raw LLM output before validation */
export type RawGeneratedQuestion = {
  id: string;
  part: Part;
  question: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D?: string;
  };
  answer: Choice;
  explanation_zh: string;
  explanation_en?: string;
  skill_tag: SkillTag;
  difficulty: Difficulty;
  vocabulary: string[];
  transcript?: string;
  passage?: string;
  imageUrl?: string;
  imageAlt?: string;
  audioUrl?: string;
  audioChoices?: {
    A: string;
    B: string;
    C: string;
    D?: string;
  };
  audioScript?: string;
};

export type PipelineConfig = {
  part: string[];
  count: Record<string, number>;
  dryRun: boolean;
  skipKimi: boolean;
  skipHy3: boolean;
};

// ─── Validation types ───────────────────────────────────────────────────────

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

// ─── Integrity check types ──────────────────────────────────────────────────

export type IntegrityReport = {
  duplicateIds: string[];
  invalidAnswers: string[];
  missingChoices: string[];
  missingExplanation: string[];
  missingVocabulary: string[];
  missingTranscript: string[];
  missingPassage: string[];
  /** Per-part answer-position skew violations, e.g. "Part 7: B=54% (118/220)". */
  answerBalanceViolations: string[];
  /** Incomplete question groups, e.g. "Part 3 transcript group has 2 questions". */
  groupStructureViolations: string[];
  /** Items whose explanation argues for a different letter than `answer`. */
  explanationAnswerMismatches: string[];
  totalQuestions: number;
  passed: boolean;
};
