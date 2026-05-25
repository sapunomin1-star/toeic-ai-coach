export type VocabularyItem = {
  id: string;
  word: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  meaning_zh: string;
  example: string;
  example_zh: string;
  collocations?: string[];
  difficulty: "A2" | "B1" | "B2";
  category:
    | "business"
    | "office"
    | "travel"
    | "shopping"
    | "meeting"
    | "email"
    | "finance"
    | "daily";
};

export type VocabularyStatus = "new" | "seen" | "familiar" | "mastered";

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
