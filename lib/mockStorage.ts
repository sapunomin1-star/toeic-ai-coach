import type { MockMode, MockTestSession, MockTestResult } from "@/types/mock";
import type { Choice } from "@/types/question";
import { STORAGE_KEYS, isChoice } from "@/lib/storageCore";
import { createSessionStore } from "@/lib/sessionStore";

/** Default duration in ms for each mode (TOEIC official: listening 45 min, reading 75 min). */
export function getMockDurationMs(mode: MockMode): number {
  return mode === "listening" ? 45 * 60 * 1000 : 75 * 60 * 1000;
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const ts = Date.parse(value);
  return !isNaN(ts) && ts > 0;
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

function validateSession(raw: unknown): MockTestSession | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  if (!Array.isArray(obj.questionIds)) return null;
  if (obj.questionIds.some((id: unknown) => typeof id !== "string")) return null;

  if (!obj.answers || typeof obj.answers !== "object") return null;
  for (const [key, val] of Object.entries(obj.answers)) {
    if (typeof key !== "string") return null;
    if (val !== undefined && val !== null && !isChoice(val)) return null;
  }

  if (!isValidDate(obj.startedAt)) return null;
  if (!isValidDate(obj.endTime)) return null;
  if (
    obj.currentIndex !== undefined &&
    (!Number.isInteger(obj.currentIndex) || (obj.currentIndex as number) < 0)
  ) {
    return null;
  }
  if (!isValidResponseTimes(obj.responseTimes)) return null;
  if (obj.submittedAt !== undefined && obj.submittedAt !== null && !isValidDate(obj.submittedAt)) return null;
  if (
    obj.playedAudioGroups !== undefined &&
    (!Array.isArray(obj.playedAudioGroups) ||
      obj.playedAudioGroups.some((key: unknown) => typeof key !== "string"))
  ) {
    return null;
  }
  if (
    obj.playedQuestionAudioIds !== undefined &&
    (!Array.isArray(obj.playedQuestionAudioIds) ||
      obj.playedQuestionAudioIds.some((id: unknown) => typeof id !== "string"))
  ) {
    return null;
  }

  return obj as MockTestSession;
}

function validateResult(raw: unknown): MockTestResult | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  if (typeof obj.id !== "string") return null;
  if (!Array.isArray(obj.questionIds)) return null;
  if (obj.questionIds.some((id: unknown) => typeof id !== "string")) return null;

  if (!obj.answers || typeof obj.answers !== "object") return null;
  for (const [key, val] of Object.entries(obj.answers)) {
    if (typeof key !== "string") return null;
    if (val !== undefined && val !== null && !isChoice(val)) return null;
  }

  if (!Array.isArray(obj.unansweredIds)) return null;
  if (!isValidDate(obj.startedAt)) return null;
  if (!isValidDate(obj.endTime)) return null;
  if (!isValidDate(obj.submittedAt)) return null;
  if (typeof obj.rawScore !== "number") return null;

  if (!obj.scoreRange || typeof obj.scoreRange !== "object") return null;
  const sr = obj.scoreRange as Record<string, unknown>;
  if (typeof sr.min !== "number" || typeof sr.max !== "number") return null;

  if (!obj.partBreakdown || typeof obj.partBreakdown !== "object") return null;
  for (const [, val] of Object.entries(obj.partBreakdown)) {
    if (!val || typeof val !== "object") return null;
    const pb = val as Record<string, unknown>;
    if (typeof pb.correct !== "number" || typeof pb.total !== "number") return null;
  }

  if (typeof obj.timeUsedMs !== "number") return null;

  return obj as MockTestResult;
}

// Reading and listening each get their own store; keys are the existing
// back-compat values and must never be renamed.
const readingStore = createSessionStore<MockTestSession, MockTestResult>({
  sessionKey: STORAGE_KEYS.readingMockSession,
  resultsKey: STORAGE_KEYS.readingMockResults,
  validateSession,
  validateResult,
});

const listeningStore = createSessionStore<MockTestSession, MockTestResult>({
  sessionKey: STORAGE_KEYS.listeningMockSession,
  resultsKey: STORAGE_KEYS.listeningMockResults,
  validateSession,
  validateResult,
});

function storeFor(mode: MockMode) {
  return mode === "listening" ? listeningStore : readingStore;
}

export function getMockSession(mode: MockMode = "reading"): MockTestSession | null {
  return storeFor(mode).getSession();
}

export function saveMockSession(session: MockTestSession, mode: MockMode = "reading"): void {
  storeFor(mode).saveSession(session);
}

export function clearMockSession(mode: MockMode = "reading"): void {
  storeFor(mode).clearSession();
}

export function startMockSession(
  questionIds: string[],
  mode: MockMode = "reading",
): MockTestSession {
  const now = Date.now();
  const session: MockTestSession = {
    mode,
    questionIds,
    answers: {},
    unansweredIds: [],
    currentIndex: 0,
    responseTimes: {},
    playedAudioGroups: [],
    playedQuestionAudioIds: [],
    startedAt: new Date(now).toISOString(),
    endTime: new Date(now + getMockDurationMs(mode)).toISOString(),
  };
  saveMockSession(session, mode);
  return session;
}

export function saveAnswer(
  questionId: string,
  choice: Choice | null,
  mode: MockMode = "reading",
): void {
  storeFor(mode).saveAnswer(questionId, choice);
}

export function saveCurrentIndex(
  index: number,
  mode: MockMode = "reading",
): void {
  storeFor(mode).saveCurrentIndex(index);
}

export function saveResponseTime(
  questionId: string,
  responseTimeMs: number,
  mode: MockMode = "reading",
): void {
  storeFor(mode).saveResponseTime(questionId, responseTimeMs);
}

/**
 * Consume a listening-mock audio group as soon as audible playback starts.
 * Persisted so navigation away / page refresh cannot replay partial audio.
 */
export function markAudioGroupPlayed(
  groupKey: string,
  mode: MockMode = "listening",
): void {
  storeFor(mode).markAudioGroupPlayed(groupKey);
}

/**
 * Consume a narrated Part 3 question stem as soon as audible playback starts.
 * It is independent of the shared conversation group: each spoken question
 * may be heard once in a listening mock session.
 */
export function markQuestionAudioPlayed(
  questionId: string,
  mode: MockMode = "listening",
): void {
  storeFor(mode).markQuestionAudioPlayed(questionId);
}

export function getMockResults(mode: MockMode = "reading"): MockTestResult[] {
  return storeFor(mode).getResults();
}

export function saveMockResult(result: MockTestResult, mode: MockMode = "reading"): void {
  storeFor(mode).saveResult(result);
}

export function clearAllMockData(): void {
  readingStore.clearAll();
  listeningStore.clearAll();
}
