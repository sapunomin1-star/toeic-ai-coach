import type { Choice } from "./question";

export type MockTestSession = {
  questionIds: string[];
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  startedAt: string;
  endTime: string;
  submittedAt?: string;
};

export type MockTestResult = {
  id: string;
  questionIds: string[];
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  startedAt: string;
  endTime: string;
  submittedAt: string;
  rawScore: number;
  scoreRange: { min: number; max: number };
  partBreakdown: Record<string, { correct: number; total: number }>;
  timeUsedMs: number;
};
