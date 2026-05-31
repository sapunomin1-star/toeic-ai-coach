import type { Choice, Question } from "@/types/question";
import type { CEFRResult, ScoreRange } from "@/lib/toeicScoreEstimate";

export type MockMode = "reading" | "listening";
export type MockReviewMode = MockMode | "full";

export type MockPartKey =
  | "Part 1"
  | "Part 2"
  | "Part 3"
  | "Part 4"
  | "Part 5"
  | "Part 6"
  | "Part 7";

export type MockTestSession = {
  /** "reading" (default for back-compat) or "listening". Optional for legacy. */
  mode?: MockMode;
  questionIds: string[];
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  startedAt: string;
  endTime: string;
  submittedAt?: string;
  /**
   * Group keys whose audio playback has started. Listening mock only.
   * - Part 3/4 group: `${part}:${transcript}` (3 questions share 1 key)
   * - Part 1/2: question id
   * Once a key is here, the group is consumed even if the student navigates
   * away before playback ends. Real TOEIC: no replay.
   */
  playedAudioGroups?: string[];
  /**
   * Part 3 question-stem audio IDs whose audible playback has started.
   * Persisted separately from conversation groups so each of the three
   * spoken questions can be consumed exactly once in listening mock mode.
   */
  playedQuestionAudioIds?: string[];
};

/** Partial so reading results only need P5/6/7 and listening only need P1-4. */
export type MockPartBreakdown = Partial<
  Record<
    MockPartKey,
    {
      correct: number;
      total: number;
    }
  >
>;

export type MockTestResult = {
  id: string;
  mode?: MockMode;
  questionIds: string[];
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  startedAt: string;
  endTime: string;
  submittedAt: string;
  rawScore: number;
  scoreRange: {
    min: number;
    max: number;
  };
  partBreakdown: MockPartBreakdown;
  timeUsedMs: number;
  reviewSnapshotId?: string;
};

export type MockReviewQuestionSnapshot = {
  questionId: string;
  part: Question["part"];
  question: string;
  choices: Question["choices"];
  correctAnswer: Choice;
  userAnswer?: Choice;
  isCorrect: boolean;
  responseTimeMs?: number;
  explanation_zh: string;
  explanation_en?: string;
  skill_tag: Question["skill_tag"];
  difficulty: Question["difficulty"];
  vocabulary?: string[];
  transcript?: string;
  passage?: string;
  passage_group_id?: string;
  passage_group_type?: Question["passage_group_type"];
  passage_order?: number;
  question_order?: number;
  imageUrl?: string;
  imageAlt?: string;
  audioUrl?: string;
  questionAudioUrl?: string;
  audioChoices?: Question["audioChoices"];
  audioScript?: string;
};

export type MockReviewSnapshot = {
  id: string;
  resultId: string;
  mode: MockReviewMode;
  startedAt: string;
  submittedAt: string;
  questionIds: string[];
  items: MockReviewQuestionSnapshot[];
};

export type FullMockSection = "listening" | "reading";

export type FullMockSession = {
  /** Ordered as Listening 100 followed by Reading 100. */
  questionIds: string[];
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  startedAt: string;
  listeningEndsAt: string;
  endTime: string;
  submittedAt?: string;
  /** Audio consumed in Listening; identical no-replay rule to listening mock. */
  playedAudioGroups?: string[];
  playedQuestionAudioIds?: string[];
  /** Set when Page Visibility reports that the test page was hidden. */
  leftAppDuringTest?: boolean;
  /** Once Reading starts, the runner never permits navigation back to Listening. */
  currentSection: FullMockSection;
};

export type FullMockResult = {
  id: string;
  questionIds: string[];
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  startedAt: string;
  endTime: string;
  submittedAt: string;
  listeningRaw: number;
  readingRaw: number;
  listeningRange: ScoreRange;
  readingRange: ScoreRange;
  totalRange: ScoreRange;
  listeningCEFR: CEFRResult;
  readingCEFR: CEFRResult;
  partBreakdown: MockPartBreakdown;
  leftAppDuringTest: boolean;
  timeUsedMs: number;
  listeningTimeUsedMs: number;
  reviewSnapshotId?: string;
};
