export type VocabularyItem = {
  id: string;
  word: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  meaning_zh: string;
  example: string;
  example_zh: string;
  collocations?: string[];
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1";
  category:
    | "business"
    | "office"
    | "travel"
    | "shopping"
    | "meeting"
    | "email"
    | "finance"
    | "daily"
    // Extended categories (added with DeepSeek v3.2-exp batch, 2026-05):
    | "hr"
    | "retail"
    | "restaurant"
    | "contract"
    | "report"
    | "schedule"
    | "customer-service"
    | "marketing"
    | "production"
    | "logistics"
    // Extra categories added in batch 2 (576 → 1500):
    | "technology"
    | "legal"
    | "healthcare"
    | "insurance"
    | "real-estate"
    | "education"
    | "training"
    | "hospitality"
    | "security"
    | "presentation";
};

export type VocabularyStatus = "new" | "seen" | "familiar" | "mastered";
export type VocabularyQuizSource = "daily" | "random" | "reinforcement";

export type VocabularyQuizSourceStats = {
  correct: number;
  wrong: number;
  lastQuizAt?: string;
};

export type VocabularyProgress = {
  wordId: string;
  status: VocabularyStatus;
  intervalDays: number; // 0=retry today, then 1 / 3 / 7 / 14 / 30
  nextReviewDate: string; // YYYY-MM-DD
  consecutiveCorrect: number;
  reviewedAt: string;
  selfCheckCount: number;
  lastSelfCheckDate: string | null; // YYYY-MM-DD
  addedAt: string;
  quizCorrectCount?: number;
  quizWrongCount?: number;
  lastQuizAt?: string;
  quizBySource?: Partial<Record<VocabularyQuizSource, VocabularyQuizSourceStats>>;
};

export type DailySessionBucket = "retry" | "due" | "masteredReview" | "new";

export type DailySessionItem = {
  item: VocabularyItem;
  bucket: DailySessionBucket;
  progress: VocabularyProgress | null;
};

export type DailySession = {
  items: DailySessionItem[];
  counts: {
    retry: number;
    due: number;
    masteredReview: number;
    new: number;
  };
  warnings: {
    newSuppressed: boolean;
    retryDeferred: number;
  };
};

export type DailySessionActivity = {
  reviewedCount: number;
  validatedCount: number;
  reinforcementCount: number;
  reinforcementRound: number;
  canReinforce: boolean;
  validatedIds: string[];
  reinforcementIds: string[];
};

export type QuizQuestionType = "en-to-zh" | "zh-to-en" | "fill-blank";

export type VocabularyQuizQuestion = {
  type: QuizQuestionType;
  wordId: string;
  prompt: string;
  choices: string[]; // 4 items
  correctIndex: number; // 0–3
  explanation: {
    word: string;
    meaning_zh: string;
    example: string;
  };
};
