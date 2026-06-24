import type { FullMockResult, FullMockSession } from "@/types/mock";
import type { Choice } from "@/types/question";
import { STORAGE_KEYS, isChoice, isValidDate } from "@/lib/storageCore";
import { createSessionStore } from "@/lib/sessionStore";

const VALID_SECTIONS = new Set(["listening", "reading"]);

export const FULL_LISTENING_DURATION_MS = 45 * 60 * 1000;
export const FULL_MOCK_DURATION_MS = 120 * 60 * 1000;

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isValidAnswers(value: unknown): value is Partial<Record<string, Choice>> {
  if (!value || typeof value !== "object") return false;
  return Object.entries(value).every(
    ([questionId, choice]) => typeof questionId === "string" && isChoice(choice),
  );
}

function isValidResponseTimes(value: unknown): value is Partial<Record<string, number>> {
  if (value === undefined || value === null) return true;
  if (typeof value !== "object" || Array.isArray(value)) return false;
  return Object.entries(value).every(
    ([questionId, ms]) =>
      typeof questionId === "string" &&
      typeof ms === "number" &&
      Number.isFinite(ms) &&
      ms >= 0,
  );
}

function isValidRange(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const range = value as Record<string, unknown>;
  return typeof range.min === "number" && typeof range.max === "number";
}

function isValidCEFR(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const cefr = value as Record<string, unknown>;
  return (
    typeof cefr.primary === "string" &&
    (cefr.spans === undefined || isStringArray(cefr.spans))
  );
}

function validateFullSession(raw: unknown): FullMockSession | null {
  if (!raw || typeof raw !== "object") return null;
  const session = raw as Record<string, unknown>;

  if (!isStringArray(session.questionIds) || session.questionIds.length !== 200) return null;
  if (!isValidAnswers(session.answers)) return null;
  if (!isStringArray(session.unansweredIds)) return null;
  if (!isValidDate(session.startedAt)) return null;
  if (!isValidDate(session.listeningEndsAt)) return null;
  if (!isValidDate(session.endTime)) return null;
  if (
    session.currentIndex !== undefined &&
    (!Number.isInteger(session.currentIndex) || (session.currentIndex as number) < 0)
  ) {
    return null;
  }
  if (!isValidResponseTimes(session.responseTimes)) return null;
  if (session.submittedAt !== undefined && !isValidDate(session.submittedAt)) return null;
  if (
    session.playedAudioGroups !== undefined &&
    !isStringArray(session.playedAudioGroups)
  ) {
    return null;
  }
  if (
    session.playedQuestionAudioIds !== undefined &&
    !isStringArray(session.playedQuestionAudioIds)
  ) {
    return null;
  }
  if (
    session.leftAppDuringTest !== undefined &&
    typeof session.leftAppDuringTest !== "boolean"
  ) {
    return null;
  }
  if (
    typeof session.currentSection !== "string" ||
    !VALID_SECTIONS.has(session.currentSection)
  ) {
    return null;
  }

  return session as FullMockSession;
}

function validateFullResult(raw: unknown): FullMockResult | null {
  if (!raw || typeof raw !== "object") return null;
  const result = raw as Record<string, unknown>;

  if (typeof result.id !== "string") return null;
  if (!isStringArray(result.questionIds) || result.questionIds.length !== 200) return null;
  if (!isValidAnswers(result.answers)) return null;
  if (!isStringArray(result.unansweredIds)) return null;
  if (!isValidDate(result.startedAt)) return null;
  if (!isValidDate(result.endTime)) return null;
  if (!isValidDate(result.submittedAt)) return null;
  if (typeof result.listeningRaw !== "number" || typeof result.readingRaw !== "number") {
    return null;
  }
  if (!isValidRange(result.listeningRange)) return null;
  if (!isValidRange(result.readingRange)) return null;
  if (!isValidRange(result.totalRange)) return null;
  if (!isValidCEFR(result.listeningCEFR) || !isValidCEFR(result.readingCEFR)) return null;
  if (!result.partBreakdown || typeof result.partBreakdown !== "object") return null;
  for (const part of Object.values(result.partBreakdown)) {
    if (!part || typeof part !== "object") return null;
    const breakdown = part as Record<string, unknown>;
    if (
      typeof breakdown.correct !== "number" ||
      typeof breakdown.total !== "number"
    ) {
      return null;
    }
  }
  if (typeof result.leftAppDuringTest !== "boolean") return null;
  if (typeof result.timeUsedMs !== "number") return null;
  if (typeof result.listeningTimeUsedMs !== "number") return null;

  return result as FullMockResult;
}

const store = createSessionStore<FullMockSession, FullMockResult>({
  sessionKey: STORAGE_KEYS.fullMockSession,
  resultsKey: STORAGE_KEYS.fullMockResults,
  validateSession: validateFullSession,
  validateResult: validateFullResult,
});

export function getFullMockSession(): FullMockSession | null {
  return store.getSession();
}

export function saveFullMockSession(session: FullMockSession): void {
  store.saveSession(session);
}

export function clearFullMockSession(): void {
  store.clearSession();
}

export function startFullMockSession(questionIds: string[]): FullMockSession {
  if (questionIds.length !== 200) {
    throw new Error(`Full mock test plan invalid: total ${questionIds.length}/200`);
  }

  const now = Date.now();
  const session: FullMockSession = {
    questionIds,
    answers: {},
    unansweredIds: [],
    startedAt: new Date(now).toISOString(),
    listeningEndsAt: new Date(now + FULL_LISTENING_DURATION_MS).toISOString(),
    endTime: new Date(now + FULL_MOCK_DURATION_MS).toISOString(),
    currentIndex: 0,
    responseTimes: {},
    playedAudioGroups: [],
    playedQuestionAudioIds: [],
    leftAppDuringTest: false,
    currentSection: "listening",
  };
  saveFullMockSession(session);
  return session;
}

export function saveFullMockAnswer(questionId: string, choice: Choice | null): void {
  store.saveAnswer(questionId, choice);
}

export function saveFullMockCurrentIndex(index: number): void {
  store.saveCurrentIndex(index);
}

export function saveFullMockResponseTime(
  questionId: string,
  responseTimeMs: number,
): void {
  store.saveResponseTime(questionId, responseTimeMs);
}

export function markFullMockAudioGroupPlayed(groupKey: string): void {
  store.markAudioGroupPlayed(groupKey);
}

export function markFullMockQuestionAudioPlayed(questionId: string): void {
  store.markQuestionAudioPlayed(questionId);
}

export function markFullMockLeftApp(): void {
  const session = getFullMockSession();
  if (!session || session.leftAppDuringTest) return;
  session.leftAppDuringTest = true;
  saveFullMockSession(session);
}

export function advanceFullMockToReading(): FullMockSession | null {
  const session = getFullMockSession();
  if (!session) return null;
  if (session.currentSection !== "reading") {
    session.currentSection = "reading";
    saveFullMockSession(session);
  }
  return session;
}

export function getFullMockResults(): FullMockResult[] {
  return store.getResults();
}

export function saveFullMockResult(result: FullMockResult): void {
  store.saveResult(result);
}

export function clearAllFullMockData(): void {
  store.clearAll();
}
