import type { MockTestSession, MockTestResult } from "@/types/mock";
import type { Choice } from "@/types/question";

const SESSION_KEY = "toeic_mock_session_v1";
const RESULTS_KEY = "toeic_mock_results_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
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

export function getMockSession(): MockTestSession | null {
  const s = readJSON<MockTestSession | null>(SESSION_KEY, null);
  if (!s || s.submittedAt) return null;
  return s;
}

export function saveMockSession(session: MockTestSession): void {
  writeJSON(SESSION_KEY, session);
}

export function clearMockSession(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
}

export function startMockSession(questionIds: string[]): MockTestSession {
  const now = Date.now();
  const session: MockTestSession = {
    questionIds,
    answers: {},
    unansweredIds: [],
    startedAt: new Date(now).toISOString(),
    endTime: new Date(now + 75 * 60 * 1000).toISOString(),
  };
  saveMockSession(session);
  return session;
}

export function saveAnswer(questionId: string, choice: Choice | null): void {
  const session = getMockSession();
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
  saveMockSession(session);
}

export function getMockResults(): MockTestResult[] {
  return readJSON<MockTestResult[]>(RESULTS_KEY, []);
}

export function saveMockResult(result: MockTestResult): void {
  const results = getMockResults();
  results.push(result);
  writeJSON(RESULTS_KEY, results);
}

export function clearAllMockData(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(RESULTS_KEY);
}
