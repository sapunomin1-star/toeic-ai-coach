import type { Choice } from "@/types/question";

export type MockPartKey = "Part 5" | "Part 6" | "Part 7";

export type MockTestSession = {
  questionIds: string[];
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  startedAt: string;
  endTime: string;
  submittedAt?: string;
};

export type MockPartBreakdown = Record<
  MockPartKey,
  {
    correct: number;
    total: number;
  }
>;

export type MockTestResult = {
  id: string;
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
};
