import type {
  DailySession,
  DailySessionActivity,
  DailySessionBucket,
  QuizQuestionType,
  VocabularyItem,
  VocabularyProgress,
  VocabularyQuizQuestion,
  VocabularyQuizSource,
  VocabularyQuizSourceStats,
  VocabularyStatus,
} from "@/types/vocabulary";
import { createLazyLoader } from "@/lib/lazyLoader";
import {
  STORAGE_KEYS,
  isBrowser,
  notifyExternalWrite,
  writeJSON,
} from "@/lib/storageCore";
import {
  createTermResolver,
  resolutionCard,
  type TermResolution,
  type TermResolver,
} from "@/lib/termResolution";
import { getVocabularyQueue, upsertVocabularyQueueEntry, vocabularyQueueKey } from "@/lib/vocabularyQueue";

const VOCABULARY_PROGRESS_KEY = STORAGE_KEYS.vocabularyProgress;
const DAILY_SESSION_KEY = STORAGE_KEYS.vocabularyDailySession;
// The learner explicitly wants 20 new words every day. Bound review buckets
// separately so an overdue backlog cannot crowd those new words out.
const MAX_RETRY_ITEMS = 10;
const MAX_DUE_ITEMS = 5;
const MAX_MASTERED_REVIEW_ITEMS = 2;
const MAX_NEW_ITEMS = 20;
const MAX_DAILY_ITEMS =
  MAX_RETRY_ITEMS + MAX_DUE_ITEMS + MAX_MASTERED_REVIEW_ITEMS + MAX_NEW_ITEMS;
const MAX_REINFORCEMENT_ROUNDS = 2;
const SRS_INTERVALS = [0, 1, 3, 7, 14, 30] as const;
/** A word is mastered only after PASSING a review at this interval or longer. */
const MASTERY_INTERVAL_DAYS = 14;
/** How many deferred due words one backlog round serves. */
const MAX_BACKLOG_ITEMS = 20;

function normalizeVocabularyWord(word: string): string {
  return word.trim().toLowerCase();
}

// The vocabulary bank (~500 KB minified) is loaded on demand so it stays out
// of every route's first-load JS. Functions that read the bank call the
// require* helpers, which throw loudly when a caller forgot to await
// loadVocabularyBank() first — a silent empty bank would corrupt persisted
// state (e.g. writing an empty daily session).
type VocabularyBank = {
  list: VocabularyItem[];
  byNormalizedWord: Map<string, VocabularyItem>;
  byId: Map<string, VocabularyItem>;
  /** Question-term teaching resolver (cards + glosses + per-question senses). */
  resolver: TermResolver;
};

const vocabularyBankLoader = createLazyLoader<VocabularyBank>(
  async () => {
    // The gloss/sense overlay ships in the same lazy chunk group as the bank
    // so question-term resolution never lands in a route's first-load JS.
    const [mod, support] = await Promise.all([
      import("@/data/vocabulary"),
      import("@/data/vocabulary-support"),
    ]);
    const byNormalizedWord = new Map<string, VocabularyItem>();
    const byId = new Map<string, VocabularyItem>();
    for (const item of mod.VOCABULARY) {
      const normalized = normalizeVocabularyWord(item.word);
      if (!byNormalizedWord.has(normalized)) byNormalizedWord.set(normalized, item);
      byId.set(item.id, item);
    }
    const resolver = createTermResolver({
      items: mod.VOCABULARY,
      glosses: support.TERM_GLOSSES,
      senses: support.QUESTION_SENSES,
    });
    return { list: mod.VOCABULARY, byNormalizedWord, byId, resolver };
  },
  "[vocabularyStorage] vocabulary bank not loaded — await loadVocabularyBank() first",
);

export function loadVocabularyBank(): Promise<void> {
  return vocabularyBankLoader.load().then(() => undefined);
}

function requireVocabulary(): VocabularyItem[] {
  return vocabularyBankLoader.get().list;
}

function requireVocabularyIndex(): Map<string, VocabularyItem> {
  return vocabularyBankLoader.get().byNormalizedWord;
}

function requireVocabularyById(): Map<string, VocabularyItem> {
  return vocabularyBankLoader.get().byId;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Whole days from `from` to `to` (both YYYY-MM-DD); negative when `to` is earlier. */
function daysBetween(from: string, to: string): number {
  const a = Date.parse(`${from}T00:00:00Z`);
  const b = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}

/** Stable order by nextReviewDate ascending (most overdue first); ties keep bank order. */
function sortByDueDate(
  items: VocabularyItem[],
  progressMap: Map<string, VocabularyProgress>,
): VocabularyItem[] {
  return items
    .map((item, index) => ({ item, index, date: progressMap.get(item.id)?.nextReviewDate ?? "" }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.index - b.index)
    .map(({ item }) => item);
}

function isDateString(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function inferredSchedule(status: VocabularyStatus): Pick<
  VocabularyProgress,
  "intervalDays" | "nextReviewDate" | "consecutiveCorrect"
> {
  const today = todayStr();
  switch (status) {
    case "mastered":
      return { intervalDays: 30, nextReviewDate: addDays(today, 30), consecutiveCorrect: 3 };
    case "familiar":
      return { intervalDays: 7, nextReviewDate: addDays(today, 7), consecutiveCorrect: 1 };
    case "seen":
      return { intervalDays: 1, nextReviewDate: addDays(today, 1), consecutiveCorrect: 0 };
    case "new":
      return { intervalDays: 0, nextReviewDate: today, consecutiveCorrect: 0 };
  }
}

function hasSrsFields(p: Record<string, unknown>): boolean {
  return (
    typeof p.intervalDays === "number" &&
    SRS_INTERVALS.includes(p.intervalDays as (typeof SRS_INTERVALS)[number]) &&
    isDateString(p.nextReviewDate) &&
    typeof p.consecutiveCorrect === "number"
  );
}

function migrateQuizBySource(
  raw: unknown
): VocabularyProgress["quizBySource"] {
  if (!raw || typeof raw !== "object") return undefined;
  const stored = raw as Record<string, unknown>;
  const result: VocabularyProgress["quizBySource"] = {};
  for (const source of ["daily", "random", "reinforcement", "backlog"] as VocabularyQuizSource[]) {
    const value = stored[source];
    if (!value || typeof value !== "object") continue;
    const entry = value as Record<string, unknown>;
    result[source] = {
      correct: typeof entry.correct === "number" ? entry.correct : 0,
      wrong: typeof entry.wrong === "number" ? entry.wrong : 0,
      lastQuizAt:
        typeof entry.lastQuizAt === "string" ? entry.lastQuizAt : undefined,
    };
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

function migrateQuizByType(raw: unknown): VocabularyProgress["quizByType"] {
  if (!raw || typeof raw !== "object") return undefined;
  const stored = raw as Record<string, unknown>;
  const result: NonNullable<VocabularyProgress["quizByType"]> = {};
  for (const type of ["en-to-zh", "zh-to-en", "fill-blank"] as QuizQuestionType[]) {
    const value = stored[type];
    if (!value || typeof value !== "object") continue;
    const entry = value as Record<string, unknown>;
    result[type] = {
      correct: typeof entry.correct === "number" ? entry.correct : 0,
      wrong: typeof entry.wrong === "number" ? entry.wrong : 0,
      lastQuizAt: typeof entry.lastQuizAt === "string" ? entry.lastQuizAt : undefined,
    };
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

// Accepts old format (learning → seen) and new format, including quiz fields
function migrateEntry(raw: unknown): VocabularyProgress | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  if (typeof p.wordId !== "string") return null;
  if (
    typeof p.reviewedAt !== "string" ||
    isNaN(Date.parse(p.reviewedAt as string))
  )
    return null;

  let status: VocabularyStatus = "new";
  if (p.status === "mastered") status = "mastered";
  else if (p.status === "familiar") status = "familiar";
  else if (p.status === "seen" || p.status === "learning") status = "seen";
  else status = "new";

  const schedule = hasSrsFields(p)
    ? {
        intervalDays: p.intervalDays as number,
        nextReviewDate: p.nextReviewDate as string,
        consecutiveCorrect: p.consecutiveCorrect as number,
      }
    : inferredSchedule(status);

  return {
    wordId: p.wordId as string,
    status,
    ...schedule,
    ...(isDateString(p.scheduledReviewDate) ? { scheduledReviewDate: p.scheduledReviewDate as string } : {}),
    reviewedAt: p.reviewedAt as string,
    selfCheckCount:
      typeof p.selfCheckCount === "number" ? p.selfCheckCount : 0,
    lastSelfCheckDate:
      typeof p.lastSelfCheckDate === "string" ? p.lastSelfCheckDate : null,
    addedAt:
      typeof p.addedAt === "string" ? p.addedAt : (p.reviewedAt as string),
    // Quiz fields — optional, preserved when present
    quizCorrectCount:
      typeof p.quizCorrectCount === "number" ? p.quizCorrectCount : undefined,
    quizWrongCount:
      typeof p.quizWrongCount === "number" ? p.quizWrongCount : undefined,
    lastQuizAt:
      typeof p.lastQuizAt === "string" ? p.lastQuizAt : undefined,
    quizBySource: migrateQuizBySource(p.quizBySource),
    quizByType: migrateQuizByType(p.quizByType),
  };
}

function readProgress(): VocabularyProgress[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(VOCABULARY_PROGRESS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const progress = parsed
      .map(migrateEntry)
      .filter((x): x is VocabularyProgress => x !== null);
    const needsWriteBack = parsed.some(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        typeof (entry as Record<string, unknown>).wordId === "string" &&
        !hasSrsFields(entry as Record<string, unknown>)
    );
    if (needsWriteBack) {
      // The migrated rows are already in hand; persisting them is an
      // optimisation. A failure here (quota) must NOT fall through to the
      // catch below, which returns [] — the next write would then persist a
      // near-empty array over the user's real progress.
      try {
        localStorage.setItem(VOCABULARY_PROGRESS_KEY, JSON.stringify(progress));
        notifyExternalWrite(VOCABULARY_PROGRESS_KEY);
      } catch (e) {
        console.warn("[vocabularyStorage] Failed to persist migrated progress:", e);
      }
    }
    return progress;
  } catch (e) {
    console.warn("[vocabularyStorage] Failed to read progress:", e);
    return [];
  }
}

/** Returns false when the progress could not be persisted (quota). */
function writeProgress(progress: VocabularyProgress[]): boolean {
  return writeJSON(VOCABULARY_PROGRESS_KEY, progress);
}

function makeNewEntry(
  wordId: string,
  status: VocabularyStatus = "new"
): VocabularyProgress {
  const now = new Date().toISOString();
  const schedule = inferredSchedule("new");
  return {
    wordId,
    status,
    ...schedule,
    reviewedAt: now,
    selfCheckCount: 0,
    lastSelfCheckDate: null,
    addedAt: now,
  };
}

export function advanceSchedule(
  progress: VocabularyProgress,
  isCorrect: boolean,
  today = todayStr()
): VocabularyProgress {
  const next = { ...progress };
  delete next.scheduledReviewDate;

  if (!isCorrect) {
    next.consecutiveCorrect = 0;
    if (progress.status === "mastered") {
      next.status = "familiar";
      next.intervalDays = 0;
      next.nextReviewDate = today;
    } else {
      next.status =
        progress.status === "new" || progress.status === "familiar"
          ? "seen"
          : progress.status;
      next.intervalDays = 0;
      next.nextReviewDate = today;
    }
    return next;
  }

  const intervalIndex = SRS_INTERVALS.indexOf(
    progress.intervalDays as (typeof SRS_INTERVALS)[number]
  );
  const nextInterval =
    SRS_INTERVALS[Math.min(intervalIndex < 0 ? 1 : intervalIndex + 1, SRS_INTERVALS.length - 1)];
  next.intervalDays = nextInterval;
  next.nextReviewDate = addDays(today, nextInterval);
  next.consecutiveCorrect = progress.consecutiveCorrect + 1;

  // "Mastered" claims retention across a long gap, so it is granted only when
  // the learner has just PASSED a review whose scheduled interval was already
  // ≥ 14 days — not when the next review merely gets scheduled 14 days out
  // (that would label a word mastered before the gap was ever tested).
  // Already-mastered words keep their status on a correct answer. (REVIEW F11)
  if (
    progress.status === "mastered" ||
    (next.consecutiveCorrect >= 3 && progress.intervalDays >= MASTERY_INTERVAL_DAYS)
  ) {
    next.status = "mastered";
  } else if (progress.status === "new" || progress.status === "seen") {
    next.status = "familiar";
  }

  return next;
}

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Public read functions ─────────────────────────────────────────────────

export function getVocabularyProgress(): VocabularyProgress[] {
  return readProgress();
}

export function saveVocabularyProgress(progress: VocabularyProgress[]): void {
  writeProgress(progress);
}

export function findVocabularyByWord(word: string): VocabularyItem | null {
  if (typeof word !== "string") return null;
  return requireVocabularyIndex().get(normalizeVocabularyWord(word)) ?? null;
}

/**
 * What the app can teach about a question term: a per-question sense, a card
 * (exact or inflected), a general gloss, the phrase's component words, or an
 * explicit "missing". See lib/termResolution for the tiers. (REVIEW F02/F03)
 */
export function resolveQuestionTerm(term: string, questionId?: string): TermResolution {
  return vocabularyBankLoader.get().resolver.resolve(term, questionId);
}

/** The vocabulary card a term maps to, accepting inflected forms (scheduled → schedule). */
export function findVocabularyCardForTerm(term: string, questionId?: string): VocabularyItem | null {
  if (typeof term !== "string") return null;
  return resolutionCard(resolveQuestionTerm(term, questionId));
}

/** Hide legacy links to a card whose meaning differs from the saved request. */
export function getVocabularyStudyQueue() {
  return getVocabularyQueue().map((entry) => {
    const card = entry.wordId ? requireVocabularyById().get(entry.wordId) : undefined;
    const matches = card && entry.partOfSpeech === card.partOfSpeech &&
      entry.meaning_zh === card.meaning_zh;
    return matches ? entry : { ...entry, wordId: undefined };
  });
}

/**
 * The learner flagged a question term as unfamiliar (review F10). The term
 * enters the 待學佇列 with the meaning it was shown; when it has a card, that
 * card's next review is pulled to today so the word shows up in the due
 * bucket (or the backlog) instead of waiting for its scheduled date. Status,
 * interval and streak are never changed — a flag is a request to study, not
 * evidence of forgetting. Returns false when either persistence step fails;
 * the caller must reread the queue to distinguish partial success.
 */
function questionTermQueueInput(term: string, questionId: string) {
  const resolution = resolveQuestionTerm(term, questionId);
  const card = resolutionCard(resolution);
  const meaning =
    resolution.kind === "sense"
      ? resolution.sense.meaning_zh
      : resolution.kind === "gloss"
        ? resolution.gloss.meaning_zh
        : card?.meaning_zh;
  const partOfSpeech =
    resolution.kind === "sense"
      ? resolution.sense.partOfSpeech
      : resolution.kind === "gloss"
        ? resolution.gloss.partOfSpeech
        : card?.partOfSpeech;
  return {
    term,
    questionId,
    ...(card ? { wordId: card.id } : {}),
    ...(meaning ? { meaning_zh: meaning } : {}),
    ...(partOfSpeech ? { partOfSpeech } : {}),
  };
}

export function questionTermQueueKey(term: string, questionId: string): string {
  return vocabularyQueueKey(questionTermQueueInput(term, questionId));
}

export function enqueueQuestionTerm(term: string, questionId: string): boolean {
  const input = questionTermQueueInput(term, questionId);
  const queued = upsertVocabularyQueueEntry(input);
  if (!queued) return false;
  if (input.wordId) {
    const today = todayStr();
    const progress = getVocabularyProgress();
    const entry = progress.find((p) => p.wordId === input.wordId);
    if (entry && entry.nextReviewDate > today) {
      entry.scheduledReviewDate ??= entry.nextReviewDate;
      entry.nextReviewDate = today;
      return writeProgress(progress);
    }
  }
  return true;
}

export function bumpWordsToDueByWords(words: string[], questionId?: string): void {
  if (!Array.isArray(words) || words.length === 0) return;

  const wordIds = new Set<string>();
  for (const word of words) {
    if (typeof word !== "string") continue;
    const item = findVocabularyCardForTerm(word, questionId);
    if (item) wordIds.add(item.id);
  }
  if (wordIds.size === 0) return;

  const today = todayStr();
  const progress = getVocabularyProgress();
  let changed = false;

  for (const entry of progress) {
    if (!wordIds.has(entry.wordId)) continue;
    if (entry.status !== "seen" && entry.status !== "familiar") continue;
    if (entry.nextReviewDate <= today) continue;

    entry.scheduledReviewDate ??= entry.nextReviewDate;
    entry.nextReviewDate = today;
    changed = true;
  }

  if (changed) {
    saveVocabularyProgress(progress);
  }
}

type StoredDailySession = {
  date: string;
  itemBuckets: Array<{ wordId: string; bucket: DailySessionBucket }>;
  counts: DailySession["counts"];
  warnings: DailySession["warnings"];
  reviewedIds: string[];
  validatedIds: string[];
  /** Outcome of each validation — tested ≠ passed (REVIEW F07). */
  validatedCorrectIds: string[];
  validatedWrongIds: string[];
  reinforcementIds: string[];
  reinforcementRound: number;
};

function stringIds(raw: unknown): string[] {
  return Array.isArray(raw)
    ? raw.filter((id): id is string => typeof id === "string")
    : [];
}

function readStoredDailySession(): StoredDailySession | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(DAILY_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Partial<StoredDailySession>;
    if (
      session.date !== todayStr() ||
      !Array.isArray(session.itemBuckets) ||
      !session.counts ||
      !session.warnings
    ) {
      return null;
    }
    const legacyCompletedIds = stringIds(
      (session as Partial<StoredDailySession> & { completedIds?: unknown }).completedIds
    );
    const validatedIds = stringIds(session.validatedIds);
    const reinforcementIds = stringIds(session.reinforcementIds);
    // Sessions written before outcome tracking only know which words were
    // tested. Best effort: a word still queued for reinforcement was wrong;
    // the rest are treated as correct. Only same-day sessions can be legacy.
    const hasOutcomeIds =
      "validatedCorrectIds" in session || "validatedWrongIds" in session;
    const validatedWrongIds = hasOutcomeIds
      ? stringIds(session.validatedWrongIds).filter((id) => validatedIds.includes(id))
      : validatedIds.filter((id) => reinforcementIds.includes(id));
    const validatedCorrectIds = hasOutcomeIds
      ? stringIds(session.validatedCorrectIds).filter((id) => validatedIds.includes(id))
      : validatedIds.filter((id) => !validatedWrongIds.includes(id));
    return {
      date: session.date,
      itemBuckets: session.itemBuckets.filter(
        (entry): entry is { wordId: string; bucket: DailySessionBucket } =>
          typeof entry?.wordId === "string" &&
          ["retry", "due", "masteredReview", "new"].includes(entry.bucket as string)
      ),
      counts: session.counts,
      warnings: session.warnings,
      reviewedIds:
        "reviewedIds" in session
          ? stringIds(session.reviewedIds)
          : legacyCompletedIds,
      validatedIds,
      validatedCorrectIds,
      validatedWrongIds,
      reinforcementIds,
      reinforcementRound:
        typeof session.reinforcementRound === "number"
          ? Math.min(
              MAX_REINFORCEMENT_ROUNDS,
              Math.max(0, session.reinforcementRound)
            )
          : 0,
    };
  } catch (e) {
    console.warn("[vocabularyStorage] Failed to read daily session:", e);
    return null;
  }
}

function writeStoredDailySession(session: StoredDailySession): void {
  writeJSON(DAILY_SESSION_KEY, session);
}

/**
 * Upgrade an already-created same-day session from the former 8-word target.
 * Reviewed/validated IDs and reinforcement state stay intact; only missing new
 * items are appended, so the learner gets the requested 20 immediately.
 */
function ensureDailyNewWordTarget(
  stored: StoredDailySession,
  progressMap: Map<string, VocabularyProgress>,
): StoredDailySession {
  if (stored.counts.new >= MAX_NEW_ITEMS) return stored;
  const VOCABULARY = requireVocabulary();

  const itemBuckets = [...stored.itemBuckets];
  const usedIds = new Set(itemBuckets.map((entry) => entry.wordId));
  let newCount = stored.counts.new;

  for (const item of VOCABULARY) {
    if (newCount >= MAX_NEW_ITEMS) break;
    const progress = progressMap.get(item.id);
    if (usedIds.has(item.id) || (progress && progress.status !== "new")) continue;
    itemBuckets.push({ wordId: item.id, bucket: "new" });
    usedIds.add(item.id);
    newCount += 1;
  }

  if (newCount === stored.counts.new) return stored;
  const upgraded: StoredDailySession = {
    ...stored,
    itemBuckets,
    counts: { ...stored.counts, new: newCount },
    warnings: { ...stored.warnings, newSuppressed: false },
  };
  writeStoredDailySession(upgraded);
  return upgraded;
}

function markDailySessionItemReviewed(wordId: string): void {
  const session = readStoredDailySession();
  if (!session || !session.itemBuckets.some((entry) => entry.wordId === wordId)) return;
  if (!session.reviewedIds.includes(wordId)) {
    session.reviewedIds.push(wordId);
    writeStoredDailySession(session);
  }
}

function markDailySessionItemValidated(wordId: string, isCorrect: boolean): void {
  const session = readStoredDailySession();
  if (!session || !session.itemBuckets.some((entry) => entry.wordId === wordId)) return;
  if (!session.validatedIds.includes(wordId)) {
    session.validatedIds.push(wordId);
    // The first validation of the day fixes the outcome the home page reports;
    // "validated" alone only means the word was tested (REVIEW F07).
    if (isCorrect) session.validatedCorrectIds.push(wordId);
    else session.validatedWrongIds.push(wordId);
  }
  if (!isCorrect && !session.reinforcementIds.includes(wordId)) {
    session.reinforcementIds.push(wordId);
  }
  writeStoredDailySession(session);
}

function updateReinforcementItem(wordId: string, isCorrect: boolean): void {
  const session = readStoredDailySession();
  if (!session || !session.reinforcementIds.includes(wordId)) return;
  if (isCorrect) {
    session.reinforcementIds = session.reinforcementIds.filter((id) => id !== wordId);
  }
  writeStoredDailySession(session);
}

export function completeReinforcementRound(): DailySessionActivity {
  const session = readStoredDailySession();
  if (session && session.reinforcementRound < MAX_REINFORCEMENT_ROUNDS) {
    session.reinforcementRound += 1;
    writeStoredDailySession(session);
  }
  return getDailySessionActivity();
}

export function getDailySessionActivity(): DailySessionActivity {
  const session = readStoredDailySession();
  if (!session) {
    return {
      reviewedCount: 0,
      validatedCount: 0,
      validatedCorrectCount: 0,
      validatedWrongCount: 0,
      reinforcementCount: 0,
      reinforcementRound: 0,
      canReinforce: false,
      validatedIds: [],
      reinforcementIds: [],
    };
  }
  return {
    reviewedCount: session.reviewedIds.length,
    validatedCount: session.validatedIds.length,
    validatedCorrectCount: session.validatedCorrectIds.length,
    validatedWrongCount: session.validatedWrongIds.length,
    reinforcementCount: session.reinforcementIds.length,
    reinforcementRound: session.reinforcementRound,
    canReinforce:
      session.reinforcementIds.length > 0 &&
      session.reinforcementRound < MAX_REINFORCEMENT_ROUNDS,
    validatedIds: session.validatedIds,
    reinforcementIds: session.reinforcementIds,
  };
}

// ─── Flashcard mark actions ────────────────────────────────────────────────

export function markWordAgain(wordId: string): void {
  const progress = readProgress();
  const existing = progress.find((p) => p.wordId === wordId);
  if (existing) {
    existing.reviewedAt = new Date().toISOString();
  } else {
    progress.push(makeNewEntry(wordId));
  }
  writeProgress(progress);
  markDailySessionItemReviewed(wordId);
}

export function markWordFamiliar(wordId: string): void {
  const progress = readProgress();
  const existing = progress.find((p) => p.wordId === wordId);
  if (existing) {
    if (existing.status === "new") existing.status = "seen";
    else if (existing.status === "seen") existing.status = "familiar";
    existing.reviewedAt = new Date().toISOString();
  } else {
    progress.push(makeNewEntry(wordId, "seen"));
  }
  writeProgress(progress);
  markDailySessionItemReviewed(wordId);
}

export function markWordKnown(wordId: string): void {
  const progress = readProgress();
  const today = todayStr();
  const existing = progress.find((p) => p.wordId === wordId);

  if (!existing) {
    progress.push({
      ...makeNewEntry(wordId, "seen"),
      selfCheckCount: 1,
      lastSelfCheckDate: today,
    });
    writeProgress(progress);
    markDailySessionItemReviewed(wordId);
    return;
  }

  existing.selfCheckCount += 1;
  existing.reviewedAt = new Date().toISOString();
  if (existing.status === "new") existing.status = "seen";
  else if (existing.status === "seen") existing.status = "familiar";
  existing.lastSelfCheckDate = today;
  writeProgress(progress);
  markDailySessionItemReviewed(wordId);
}

// ─── Daily vocabulary selection ────────────────────────────────────────────

function materializeDailySession(
  stored: StoredDailySession,
  progressMap: Map<string, VocabularyProgress>
): DailySession {
  const vocabularyMap = requireVocabularyById();
  return {
    items: stored.itemBuckets.flatMap(({ wordId, bucket }) => {
      const item = vocabularyMap.get(wordId);
      return item ? [{ item, bucket, progress: progressMap.get(wordId) ?? null }] : [];
    }),
    counts: stored.counts,
    warnings: stored.warnings,
  };
}

export function buildDailySession(): DailySession {
  const VOCABULARY = requireVocabulary();
  const progress = readProgress();
  const progressMap = new Map(progress.map((p) => [p.wordId, p]));
  const stored = readStoredDailySession();
  if (stored) {
    return materializeDailySession(
      ensureDailyNewWordTarget(stored, progressMap),
      progressMap,
    );
  }

  const today = todayStr();
  const result: DailySession["items"] = [];
  const usedIds = new Set<string>();
  const retryCandidates = VOCABULARY.filter((item) => {
    const p = progressMap.get(item.id);
    return p?.intervalDays === 0 && p.status !== "new";
  });
  const retryDeferred = Math.max(0, retryCandidates.length - MAX_RETRY_ITEMS);

  for (const item of retryCandidates.slice(0, MAX_RETRY_ITEMS)) {
    result.push({ item, bucket: "retry", progress: progressMap.get(item.id) ?? null });
    usedIds.add(item.id);
  }

  // Most-overdue first, so a word deferred yesterday is not deferred again
  // behind one that only came due today. The caps are deliberate (they
  // protect the 20-new-word target); what they defer is now reported instead
  // of silently dropped (REVIEW F12).
  const dueCandidates = sortByDueDate(
    VOCABULARY.filter((item) => {
      const p = progressMap.get(item.id);
      return (
        !usedIds.has(item.id) &&
        p !== undefined &&
        p.intervalDays !== 0 &&
        (p.status === "seen" || p.status === "familiar") &&
        p.nextReviewDate <= today
      );
    }),
    progressMap,
  );
  let dueAdded = 0;
  for (const item of dueCandidates) {
    if (result.length >= MAX_DAILY_ITEMS || dueAdded >= MAX_DUE_ITEMS) break;
    result.push({ item, bucket: "due", progress: progressMap.get(item.id) ?? null });
    usedIds.add(item.id);
    dueAdded += 1;
  }

  const masteredCandidates = sortByDueDate(
    VOCABULARY.filter((item) => {
      const p = progressMap.get(item.id);
      return !usedIds.has(item.id) && p?.status === "mastered" && p.nextReviewDate <= today;
    }),
    progressMap,
  );
  let masteredReviewAdded = 0;
  for (const item of masteredCandidates) {
    if (
      result.length >= MAX_DAILY_ITEMS ||
      masteredReviewAdded >= MAX_MASTERED_REVIEW_ITEMS
    ) {
      break;
    }
    result.push({ item, bucket: "masteredReview", progress: progressMap.get(item.id) ?? null });
    usedIds.add(item.id);
    masteredReviewAdded += 1;
  }

  const deferred = [
    ...dueCandidates.slice(dueAdded),
    ...masteredCandidates.slice(masteredReviewAdded),
  ];
  const dueDeferred = dueCandidates.length - dueAdded;
  const masteredReviewDeferred = masteredCandidates.length - masteredReviewAdded;
  const oldestDeferredDays = deferred.reduce((oldest, item) => {
    const p = progressMap.get(item.id);
    return p ? Math.max(oldest, daysBetween(p.nextReviewDate, today)) : oldest;
  }, 0);

  // Kept in the persisted shape for backward compatibility. New items are no
  // longer suppressed by review load; review buckets have their own caps.
  const newSuppressed = false;
  let newAdded = 0;
  // Words the learner flagged on a question (待學佇列) take new-word slots
  // first — inside the 20-word target, never on top of it (REVIEW F10).
  const queuedIds = new Set(getVocabularyStudyQueue().flatMap((entry) => entry.wordId ? [entry.wordId] : []));
  let queuedPrioritized = 0;
  for (const item of VOCABULARY) {
    if (result.length >= MAX_DAILY_ITEMS || newAdded >= MAX_NEW_ITEMS) break;
    if (!queuedIds.has(item.id) || usedIds.has(item.id)) continue;
    const p = progressMap.get(item.id);
    if (p && p.status !== "new") continue;
    result.push({ item, bucket: "new", progress: p ?? null });
    usedIds.add(item.id);
    newAdded += 1;
    queuedPrioritized += 1;
  }
  for (const item of VOCABULARY) {
    if (result.length >= MAX_DAILY_ITEMS || newAdded >= MAX_NEW_ITEMS) break;
    const p = progressMap.get(item.id);
    if (!usedIds.has(item.id) && (!p || p.status === "new")) {
      result.push({ item, bucket: "new", progress: p ?? null });
      usedIds.add(item.id);
      newAdded += 1;
    }
  }

  const session: DailySession = {
    items: result,
    counts: {
      retry: result.filter((entry) => entry.bucket === "retry").length,
      due: dueAdded,
      masteredReview: masteredReviewAdded,
      new: newAdded,
    },
    warnings: {
      newSuppressed,
      retryDeferred,
      dueDeferred,
      masteredReviewDeferred,
      oldestDeferredDays,
      queuedPrioritized,
    },
  };
  writeStoredDailySession({
    date: today,
    itemBuckets: result.map(({ item, bucket }) => ({ wordId: item.id, bucket })),
    counts: session.counts,
    warnings: session.warnings,
    reviewedIds: [],
    validatedIds: [],
    validatedCorrectIds: [],
    validatedWrongIds: [],
    reinforcementIds: [],
    reinforcementRound: 0,
  });
  return session;
}

export function getTodayVocabulary(): VocabularyItem[] {
  return buildDailySession().items.map(({ item }) => item);
}

export type DueBacklogEntry = {
  item: VocabularyItem;
  progress: VocabularyProgress;
  /** Days past nextReviewDate (0 = due today). */
  overdueDays: number;
};

/**
 * Formal reviews that are due but not in today's core session — the words the
 * retry/due/mastered caps pushed out, plus anything that came due after the
 * session was built. Live (recomputed on every call), most overdue first, so
 * the learner can make them up in separate rounds instead of the core session
 * pretending every SRS due date was honoured (REVIEW F12).
 */
export function getDueBacklog(): DueBacklogEntry[] {
  const today = todayStr();
  const sessionIds = new Set(
    readStoredDailySession()?.itemBuckets.map((entry) => entry.wordId) ?? [],
  );
  const vocabularyMap = requireVocabularyById();
  return readProgress()
    .filter(
      (p) =>
        !sessionIds.has(p.wordId) &&
        p.status !== "new" &&
        p.nextReviewDate <= today &&
        vocabularyMap.has(p.wordId),
    )
    .map((progress) => ({
      item: vocabularyMap.get(progress.wordId) as VocabularyItem,
      progress,
      overdueDays: daysBetween(progress.nextReviewDate, today),
    }))
    .sort((a, b) => b.overdueDays - a.overdueDays || a.item.id.localeCompare(b.item.id));
}

// ─── Vocabulary quiz ───────────────────────────────────────────────────────

/**
 * `wrongPool` is consumed in priority order (best distractors first), so the
 * caller controls plausibility; only the correct answer's position is random.
 */
function placeCorrect(
  correct: string,
  wrongPool: string[]
): { choices: string[]; correctIndex: number } {
  const wrong = [...new Set(wrongPool)].filter((w) => w !== correct).slice(0, 3);
  while (wrong.length < 3) wrong.push("—");
  const pos = Math.floor(Math.random() * 4);
  const choices = [...wrong];
  choices.splice(pos, 0, correct);
  return { choices: choices.slice(0, 4), correctIndex: pos };
}

/**
 * Distractors drawn uniformly from the whole bank are usually trivial to
 * eliminate (wrong part of speech, unrelated topic), which turns a 4-choice
 * quiz into a 2-choice one. Prefer words sharing part of speech AND topic
 * category, then same part of speech, then anything — so the quiz measures
 * whether the learner knows THIS word, not whether they can spot outliers.
 */
function buildDistractorPool(
  target: VocabularyItem,
  others: VocabularyItem[],
  project: (item: VocabularyItem) => string,
): string[] {
  const samePosSameCat: VocabularyItem[] = [];
  const samePos: VocabularyItem[] = [];
  const rest: VocabularyItem[] = [];
  for (const v of others) {
    if (v.partOfSpeech === target.partOfSpeech) {
      if (v.category === target.category) samePosSameCat.push(v);
      else samePos.push(v);
    } else {
      rest.push(v);
    }
  }
  return [
    ...shuffleArr(samePosSameCat),
    ...shuffleArr(samePos),
    ...shuffleArr(rest),
  ].map(project);
}

/** Two-character Chinese chunks of a gloss, the unit a near-synonym shares. */
function glossBigrams(meaning: string): Set<string> {
  const chars = meaning.replace(/[^一-鿿]/g, "");
  const grams = new Set<string>();
  for (let i = 0; i + 1 < chars.length; i++) grams.add(chars.slice(i, i + 2));
  return grams;
}

/**
 * A distractor that means roughly the same thing (shares a gloss chunk, or is
 * the same stem) would fit the blank too, leaving the cloze with two right
 * answers. Cheap heuristic: it cannot prove uniqueness, only reduce collisions.
 */
function isNearSynonym(a: VocabularyItem, b: VocabularyItem): boolean {
  const wa = normalizeVocabularyWord(a.word);
  const wb = normalizeVocabularyWord(b.word);
  if (wa.includes(wb) || wb.includes(wa)) return true;
  const grams = glossBigrams(a.meaning_zh);
  for (const gram of glossBigrams(b.meaning_zh)) if (grams.has(gram)) return true;
  return false;
}

/**
 * Cloze options must all be grammatical in the blank (same part of speech,
 * dictionary form — see makeFillBlank) and must not ALSO fit it semantically.
 * Unlike the meaning quizzes, topic-mates are the risk here ("meeting
 * schedule" vs "meeting agenda"), so same-POS words from OTHER topics come
 * first, then same-topic words that are not near-synonyms, then the rest.
 */
function buildClozeDistractorPool(
  target: VocabularyItem,
  others: VocabularyItem[],
): string[] {
  const samePosOtherCat: VocabularyItem[] = [];
  const samePosSameCat: VocabularyItem[] = [];
  const rest: VocabularyItem[] = [];
  for (const v of others) {
    if (isNearSynonym(target, v)) continue;
    if (v.partOfSpeech !== target.partOfSpeech) rest.push(v);
    else if (v.category !== target.category) samePosOtherCat.push(v);
    else samePosSameCat.push(v);
  }
  return [
    ...shuffleArr(samePosOtherCat),
    ...shuffleArr(samePosSameCat),
    ...shuffleArr(rest),
  ].map((v) => v.word);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Only an example that contains the headword in EXACTLY its dictionary form
 * can become a cloze: the blank's answer is the headword, so filling it back
 * in reproduces the original, grammatical sentence. A headword that appears
 * only inflected (requires, documents, attendees) falls back to a meaning
 * question — the former `s?` match produced blanks whose marked answer
 * ("require") broke subject–verb agreement. Hyphenated compounds do not
 * count as occurrences ("check" inside "check-in"). (REVIEW F01)
 */
export function makeFillBlank(item: VocabularyItem): string | null {
  const regex = new RegExp(`(^|[^A-Za-z-])${escapeRegExp(item.word)}(?![A-Za-z-])`, "i");
  if (!regex.test(item.example)) return null;
  return item.example.replace(regex, "$1______");
}

export function buildVocabularyQuiz(
  source: "today" | "random" | "reinforcement" | "backlog" = "today"
): VocabularyQuizQuestion[] {
  const VOCABULARY = requireVocabulary();
  const progress = readProgress();
  const progressMap = new Map(progress.map((p) => [p.wordId, p]));
  let pool: VocabularyItem[];
  if (source === "today") {
    const session = buildDailySession();
    const validatedIds = new Set(readStoredDailySession()?.validatedIds ?? []);
    pool = session.items
      .filter(({ item }) => !validatedIds.has(item.id))
      .map(({ item }) => item);
  } else if (source === "backlog") {
    pool = getDueBacklog().slice(0, MAX_BACKLOG_ITEMS).map(({ item }) => item);
  } else if (source === "reinforcement") {
    const stored = readStoredDailySession();
    const itemMap = requireVocabularyById();
    const dailyValidationDone =
      stored !== null && stored.validatedIds.length >= stored.itemBuckets.length;
    pool =
      stored &&
      dailyValidationDone &&
      stored.reinforcementRound < MAX_REINFORCEMENT_ROUNDS
        ? stored.reinforcementIds.flatMap((id) => {
            const item = itemMap.get(id);
            return item ? [item] : [];
          })
        : [];
  } else {
    const nonMastered = shuffleArr(
      VOCABULARY.filter(
        (v) => (progressMap.get(v.id)?.status ?? "new") !== "mastered"
      )
    );
    const mastered = shuffleArr(
      VOCABULARY.filter((v) => progressMap.get(v.id)?.status === "mastered")
    );
    pool = [...nonMastered, ...mastered].slice(0, 10);
  }
  if (pool.length === 0) return [];

  // Balanced type assignment: cycle [A, B, C] then shuffle
  const typeList: QuizQuestionType[] = pool.map((_, i) => {
    const cycle: QuizQuestionType[] = ["en-to-zh", "zh-to-en", "fill-blank"];
    return cycle[i % 3];
  });
  const types = shuffleArr(typeList);

  return pool.map((target, i): VocabularyQuizQuestion => {
    let qType = types[i];
    const others = VOCABULARY.filter((v) => v.id !== target.id);
    let prompt: string;
    let result: { choices: string[]; correctIndex: number };

    if (qType === "fill-blank") {
      const blank = makeFillBlank(target);
      if (blank === null) {
        // fallback to en-to-zh when word not found in example
        qType = "en-to-zh";
        prompt = target.word;
        result = placeCorrect(
          target.meaning_zh,
          buildDistractorPool(target, others, (v) => v.meaning_zh)
        );
      } else {
        prompt = blank;
        result = placeCorrect(target.word, buildClozeDistractorPool(target, others));
      }
    } else if (qType === "zh-to-en") {
      prompt = target.meaning_zh;
      result = placeCorrect(
        target.word,
        buildDistractorPool(target, others, (v) => v.word)
      );
    } else {
      // en-to-zh
      prompt = target.word;
      result = placeCorrect(
        target.meaning_zh,
        buildDistractorPool(target, others, (v) => v.meaning_zh)
      );
    }

    return {
      type: qType,
      wordId: target.id,
      prompt,
      choices: result.choices,
      correctIndex: result.correctIndex,
      explanation: {
        word: target.word,
        meaning_zh: target.meaning_zh,
        example: target.example,
      },
    };
  });
}

export type VocabularyQuizProgressChange = {
  before: VocabularyProgress;
  after: VocabularyProgress;
  /**
   * False when the SRS update could not be written. The daily-session and
   * reinforcement bookkeeping is skipped in that case, so the item stays
   * pending and the caller must not credit the answer.
   */
  persisted: boolean;
};

export function saveVocabularyQuizResult(
  wordId: string,
  isCorrect: boolean,
  source: VocabularyQuizSource = "daily",
  questionType?: QuizQuestionType,
): VocabularyQuizProgressChange {
  const progress = readProgress();
  const now = new Date().toISOString();
  const index = progress.findIndex((p) => p.wordId === wordId);
  const current = index >= 0 ? progress[index] : makeNewEntry(wordId);
  const before = { ...current };
  const previousSourceStats: VocabularyQuizSourceStats = current.quizBySource?.[source] ?? {
    correct: 0,
    wrong: 0,
  };
  const previousTypeStats: VocabularyQuizSourceStats = questionType
    ? (current.quizByType?.[questionType] ?? { correct: 0, wrong: 0 })
    : { correct: 0, wrong: 0 };
  const withQuizCounts: VocabularyProgress = {
    ...current,
    reviewedAt: now,
    quizCorrectCount: (current.quizCorrectCount ?? 0) + (isCorrect ? 1 : 0),
    quizWrongCount: (current.quizWrongCount ?? 0) + (isCorrect ? 0 : 1),
    lastQuizAt: now,
    quizBySource: {
      ...current.quizBySource,
      [source]: {
        correct: previousSourceStats.correct + (isCorrect ? 1 : 0),
        wrong: previousSourceStats.wrong + (isCorrect ? 0 : 1),
        lastQuizAt: now,
      },
    },
    ...(questionType
      ? {
          quizByType: {
            ...current.quizByType,
            [questionType]: {
              correct: previousTypeStats.correct + (isCorrect ? 1 : 0),
              wrong: previousTypeStats.wrong + (isCorrect ? 0 : 1),
              lastQuizAt: now,
            },
          },
        }
      : {}),
  };
  // Early correct answers are useful practice, but must not fast-forward SRS.
  // A wrong answer always proves a lapse and is applied immediately.
  const shouldApplySchedule =
    source !== "reinforcement" &&
    (!isCorrect || (current.scheduledReviewDate ?? current.nextReviewDate) <= todayStr());
  const after =
    shouldApplySchedule ? advanceSchedule(withQuizCounts, isCorrect) : withQuizCounts;
  if (isCorrect && !shouldApplySchedule && (current.scheduledReviewDate ?? current.nextReviewDate) > todayStr()) {
    // Recall today restarts the same gap; restoring a nearer old due date
    // would later certify a 14-day interval after only a few unpractised days.
    const scheduled = current.scheduledReviewDate ?? current.nextReviewDate;
    const spaced = addDays(todayStr(), current.intervalDays);
    after.nextReviewDate = scheduled > spaced ? scheduled : spaced;
    delete after.scheduledReviewDate;
  }
  if (index >= 0) progress[index] = after;
  else progress.push(after);
  // The SRS row is the source of truth; the session bookkeeping below only
  // records that this word was validated today. Marking the session done over
  // an unwritten SRS row would credit review work that was never saved.
  const persisted = writeProgress(progress);
  if (persisted) {
    if (source === "daily") markDailySessionItemValidated(wordId, isCorrect);
    else if (source === "reinforcement") updateReinforcementItem(wordId, isCorrect);
  }
  return { before, after, persisted };
}

export type VocabularyQuizStats = {
  totalCorrect: number;
  totalWrong: number;
  accuracy: number;
  lastQuizAt: string | null;
};

export function getVocabularyQuizStats(
  source?: VocabularyQuizSource
): VocabularyQuizStats {
  const progress = readProgress();
  let totalCorrect = 0;
  let totalWrong = 0;
  let lastQuizAt: string | null = null;

  for (const p of progress) {
    const stats = source ? p.quizBySource?.[source] : undefined;
    totalCorrect += source ? stats?.correct ?? 0 : p.quizCorrectCount ?? 0;
    totalWrong += source ? stats?.wrong ?? 0 : p.quizWrongCount ?? 0;
    const eventAt = source ? stats?.lastQuizAt : p.lastQuizAt;
    if (eventAt && (!lastQuizAt || eventAt > lastQuizAt)) {
      lastQuizAt = eventAt;
    }
  }

  const total = totalCorrect + totalWrong;
  const accuracy =
    total === 0 ? 0 : Math.round((totalCorrect / total) * 1000) / 10;

  return { totalCorrect, totalWrong, accuracy, lastQuizAt };
}

/**
 * Per question form: what has actually been measured. Recognition (英→中),
 * recall from a Chinese cue (中→英) and cloze in the card's own example are
 * different evidence; a high recognition rate says nothing about recall.
 */
export function getVocabularyQuizTypeStats(): Record<QuizQuestionType, VocabularyQuizStats> {
  const types: QuizQuestionType[] = ["en-to-zh", "zh-to-en", "fill-blank"];
  const result = Object.fromEntries(
    types.map((type) => [type, { totalCorrect: 0, totalWrong: 0, accuracy: 0, lastQuizAt: null }]),
  ) as Record<QuizQuestionType, VocabularyQuizStats>;
  for (const p of readProgress()) {
    for (const type of types) {
      const stats = p.quizByType?.[type];
      if (!stats) continue;
      const entry = result[type];
      entry.totalCorrect += stats.correct;
      entry.totalWrong += stats.wrong;
      if (stats.lastQuizAt && (!entry.lastQuizAt || stats.lastQuizAt > entry.lastQuizAt)) {
        entry.lastQuizAt = stats.lastQuizAt;
      }
    }
  }
  for (const type of types) {
    const entry = result[type];
    const total = entry.totalCorrect + entry.totalWrong;
    entry.accuracy = total === 0 ? 0 : Math.round((entry.totalCorrect / total) * 1000) / 10;
  }
  return result;
}
