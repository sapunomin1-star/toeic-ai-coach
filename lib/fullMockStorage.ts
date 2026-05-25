import type { FullMockResult, FullMockSession } from "@/types/mock";
import type { Choice } from "@/types/question";

const FULL_SESSION_KEY = "toeic_full_mock_session_v1";
const FULL_RESULTS_KEY = "toeic_full_mock_results_v1";
const MAX_RESULTS = 20;
const VALID_CHOICES = new Set(["A", "B", "C", "D"]);
const VALID_SECTIONS = new Set(["listening", "reading"]);

export const FULL_LISTENING_DURATION_MS = 45 * 60 * 1000;
export const FULL_MOCK_DURATION_MS = 120 * 60 * 1000;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isValidChoice(value: unknown): value is Choice {
  return typeof value === "string" && VALID_CHOICES.has(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isValidAnswers(value: unknown): value is Partial<Record<string, Choice>> {
  if (!value || typeof value !== "object") return false;
  return Object.entries(value).every(
    ([questionId, choice]) => typeof questionId === "string" && isValidChoice(choice),
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

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("[fullMockStorage] write failed:", error);
  }
}

export function getFullMockSession(): FullMockSession | null {
  const session = validateFullSession(readJSON<unknown>(FULL_SESSION_KEY, null));
  if (!session || session.submittedAt) return null;
  return session;
}

export function saveFullMockSession(session: FullMockSession): void {
  writeJSON(FULL_SESSION_KEY, session);
}

export function clearFullMockSession(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(FULL_SESSION_KEY);
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
    playedAudioGroups: [],
    playedQuestionAudioIds: [],
    leftAppDuringTest: false,
    currentSection: "listening",
  };
  saveFullMockSession(session);
  return session;
}

export function saveFullMockAnswer(questionId: string, choice: Choice | null): void {
  const session = getFullMockSession();
  if (!session) return;
  if (choice) {
    session.answers[questionId] = choice;
    session.unansweredIds = session.unansweredIds.filter((id) => id !== questionId);
  } else {
    delete session.answers[questionId];
    if (!session.unansweredIds.includes(questionId)) {
      session.unansweredIds.push(questionId);
    }
  }
  saveFullMockSession(session);
}

export function markFullMockAudioGroupPlayed(groupKey: string): void {
  const session = getFullMockSession();
  if (!session) return;
  const played = new Set(session.playedAudioGroups ?? []);
  if (played.has(groupKey)) return;
  played.add(groupKey);
  session.playedAudioGroups = [...played];
  saveFullMockSession(session);
}

export function markFullMockQuestionAudioPlayed(questionId: string): void {
  const session = getFullMockSession();
  if (!session) return;
  const played = new Set(session.playedQuestionAudioIds ?? []);
  if (played.has(questionId)) return;
  played.add(questionId);
  session.playedQuestionAudioIds = [...played];
  saveFullMockSession(session);
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
  const raw = readJSON<unknown[]>(FULL_RESULTS_KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter((result): result is FullMockResult => validateFullResult(result) !== null);
}

export function saveFullMockResult(result: FullMockResult): void {
  const results = getFullMockResults();
  results.push(result);
  writeJSON(FULL_RESULTS_KEY, results.slice(-MAX_RESULTS));
}

export function clearAllFullMockData(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(FULL_SESSION_KEY);
  localStorage.removeItem(FULL_RESULTS_KEY);
}
