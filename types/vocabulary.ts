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
  reviewedAt: string;
  selfCheckCount: number;
  lastSelfCheckDate: string | null; // YYYY-MM-DD
  addedAt: string;
};
