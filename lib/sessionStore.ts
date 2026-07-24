import type { Choice } from "@/types/question";
import { readJSON, removeJSON, writeJSON } from "@/lib/storageCore";

/**
 * Fields every mock-style session shares. The factory only ever reads or
 * mutates these; section/timer/flag fields are owned by each caller.
 */
export type SessionLike = {
  answers: Partial<Record<string, Choice>>;
  unansweredIds: string[];
  currentIndex?: number;
  responseTimes?: Partial<Record<string, number>>;
  submittedAt?: string;
  playedAudioGroups?: string[];
  playedQuestionAudioIds?: string[];
};

export type SessionStoreConfig<
  TSession extends SessionLike,
  TResult extends { id: string },
> = {
  sessionKey: string;
  resultsKey: string;
  validateSession: (raw: unknown) => TSession | null;
  validateResult: (raw: unknown) => TResult | null;
  /** Most recent N results to keep. Defaults to 20. */
  maxResults?: number;
};

export type SessionStore<
  TSession extends SessionLike,
  TResult extends { id: string },
> = {
  getSession: () => TSession | null;
  saveSession: (session: TSession) => void;
  clearSession: () => void;
  saveAnswer: (questionId: string, choice: Choice | null) => void;
  saveCurrentIndex: (index: number) => void;
  saveResponseTime: (questionId: string, responseTimeMs: number) => void;
  markAudioGroupPlayed: (groupKey: string) => void;
  markQuestionAudioPlayed: (questionId: string) => void;
  getResults: () => TResult[];
  /** Returns false when the result could not be persisted. */
  saveResult: (result: TResult) => boolean;
  clearAll: () => void;
};

/**
 * Builds a localStorage-backed store for one mock-test session + its result
 * history. Reading mock, listening mock, and full mock each create one of
 * these; the audio "no replay" consumption and answer-toggle semantics live
 * here so all three behave identically.
 */
export function createSessionStore<
  TSession extends SessionLike,
  TResult extends { id: string },
>(
  config: SessionStoreConfig<TSession, TResult>,
): SessionStore<TSession, TResult> {
  const { sessionKey, resultsKey, validateSession, validateResult } = config;
  const maxResults = config.maxResults ?? 20;

  function getSession(): TSession | null {
    const session = validateSession(readJSON<unknown>(sessionKey, null));
    if (!session || session.submittedAt) return null;
    return session;
  }

  function saveSession(session: TSession): void {
    writeJSON(sessionKey, session);
  }

  function clearSession(): void {
    removeJSON(sessionKey);
  }

  function saveAnswer(questionId: string, choice: Choice | null): void {
    const session = getSession();
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
    saveSession(session);
  }

  function saveCurrentIndex(index: number): void {
    const session = getSession();
    if (!session || !Number.isInteger(index) || index < 0) return;
    session.currentIndex = index;
    saveSession(session);
  }

  function saveResponseTime(questionId: string, responseTimeMs: number): void {
    const session = getSession();
    if (!session || !Number.isFinite(responseTimeMs) || responseTimeMs < 0) return;
    session.responseTimes = {
      ...session.responseTimes,
      [questionId]: Math.round(responseTimeMs),
    };
    saveSession(session);
  }

  function markAudioGroupPlayed(groupKey: string): void {
    const session = getSession();
    if (!session) return;
    const played = new Set(session.playedAudioGroups ?? []);
    if (played.has(groupKey)) return;
    played.add(groupKey);
    session.playedAudioGroups = [...played];
    saveSession(session);
  }

  function markQuestionAudioPlayed(questionId: string): void {
    const session = getSession();
    if (!session) return;
    const played = new Set(session.playedQuestionAudioIds ?? []);
    if (played.has(questionId)) return;
    played.add(questionId);
    session.playedQuestionAudioIds = [...played];
    saveSession(session);
  }

  function getResults(): TResult[] {
    const raw = readJSON<unknown[]>(resultsKey, []);
    if (!Array.isArray(raw)) return [];
    return raw.filter((item): item is TResult => validateResult(item) !== null);
  }

  function saveResult(result: TResult): boolean {
    // Upsert by id so a result can first be persisted safely and then enriched
    // with optional review metadata without creating duplicate history rows.
    const results = getResults().filter((item) => item.id !== result.id);
    results.push(result);
    return writeJSON(resultsKey, results.slice(-maxResults));
  }

  function clearAll(): void {
    removeJSON(sessionKey);
    removeJSON(resultsKey);
  }

  return {
    getSession,
    saveSession,
    clearSession,
    saveAnswer,
    saveCurrentIndex,
    saveResponseTime,
    markAudioGroupPlayed,
    markQuestionAudioPlayed,
    getResults,
    saveResult,
    clearAll,
  };
}
