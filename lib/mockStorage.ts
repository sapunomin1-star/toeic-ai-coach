import type { MockMode, MockTestSession, MockTestResult } from "@/types/mock";
import type { Choice } from "@/types/question";

// Reading mock (existing keys — back-compat, never rename)
const READING_SESSION_KEY = "toeic_mock_session_v1";
const READING_RESULTS_KEY = "toeic_mock_results_v1";

// Listening mock (new in this iteration)
const LISTENING_SESSION_KEY = "toeic_listening_mock_session_v1";
const LISTENING_RESULTS_KEY = "toeic_listening_mock_results_v1";

const MAX_RESULTS = 20;

const VALID_CHOICES = new Set(["A", "B", "C", "D"]);

function sessionKey(mode: MockMode): string {
  return mode === "listening" ? LISTENING_SESSION_KEY : READING_SESSION_KEY;
}

function resultsKey(mode: MockMode): string {
  return mode === "listening" ? LISTENING_RESULTS_KEY : READING_RESULTS_KEY;
}

/** Default duration in ms for each mode (TOEIC official: listening 45 min, reading 75 min). */
export function getMockDurationMs(mode: MockMode): number {
  return mode === "listening" ? 45 * 60 * 1000 : 75 * 60 * 1000;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const ts = Date.parse(value);
  return !isNaN(ts) && ts > 0;
}

function isValidChoice(value: unknown): value is Choice {
  return typeof value === "string" && VALID_CHOICES.has(value);
}

function validateSession(raw: unknown): MockTestSession | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  if (!Array.isArray(obj.questionIds)) return null;
  if (obj.questionIds.some((id: unknown) => typeof id !== "string")) return null;

  if (!obj.answers || typeof obj.answers !== "object") return null;
  for (const [key, val] of Object.entries(obj.answers)) {
    if (typeof key !== "string") return null;
    if (val !== undefined && val !== null && !isValidChoice(val)) return null;
  }

  if (!isValidDate(obj.startedAt)) return null;
  if (!isValidDate(obj.endTime)) return null;
  if (obj.submittedAt !== undefined && obj.submittedAt !== null && !isValidDate(obj.submittedAt)) return null;
  if (
    obj.playedAudioGroups !== undefined &&
    (!Array.isArray(obj.playedAudioGroups) ||
      obj.playedAudioGroups.some((key: unknown) => typeof key !== "string"))
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
    if (val !== undefined && val !== null && !isValidChoice(val)) return null;
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
  } catch (e) {
    console.warn("[mockStorage] write failed:", e);
  }
}

export function getMockSession(mode: MockMode = "reading"): MockTestSession | null {
  const raw = readJSON<unknown>(sessionKey(mode), null);
  const session = validateSession(raw);
  if (!session || session.submittedAt) return null;
  return session;
}

export function saveMockSession(session: MockTestSession, mode: MockMode = "reading"): void {
  writeJSON(sessionKey(mode), session);
}

export function clearMockSession(mode: MockMode = "reading"): void {
  if (!isBrowser()) return;
  localStorage.removeItem(sessionKey(mode));
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
    playedAudioGroups: [],
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
  const session = getMockSession(mode);
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
  saveMockSession(session, mode);
}

/**
 * Consume a listening-mock audio group as soon as audible playback starts.
 * Persisted so navigation away / page refresh cannot replay partial audio.
 */
export function markAudioGroupPlayed(
  groupKey: string,
  mode: MockMode = "listening",
): void {
  const session = getMockSession(mode);
  if (!session) return;
  const played = new Set(session.playedAudioGroups ?? []);
  if (played.has(groupKey)) return;
  played.add(groupKey);
  session.playedAudioGroups = [...played];
  saveMockSession(session, mode);
}

export function getMockResults(mode: MockMode = "reading"): MockTestResult[] {
  const raw = readJSON<unknown[]>(resultsKey(mode), []);
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is MockTestResult => validateResult(item) !== null);
}

export function saveMockResult(result: MockTestResult, mode: MockMode = "reading"): void {
  const results = getMockResults(mode);
  results.push(result);
  // Keep only the most recent MAX_RESULTS entries
  const trimmed = results.slice(-MAX_RESULTS);
  writeJSON(resultsKey(mode), trimmed);
}

export function clearAllMockData(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(READING_SESSION_KEY);
  localStorage.removeItem(READING_RESULTS_KEY);
  localStorage.removeItem(LISTENING_SESSION_KEY);
  localStorage.removeItem(LISTENING_RESULTS_KEY);
}
