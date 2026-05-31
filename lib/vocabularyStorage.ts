import { VOCABULARY } from "@/data/vocabulary";
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
import { STORAGE_KEYS, isBrowser, writeJSON } from "@/lib/storageCore";

const VOCABULARY_PROGRESS_KEY = STORAGE_KEYS.vocabularyProgress;
const DAILY_SESSION_KEY = STORAGE_KEYS.vocabularyDailySession;
const MAX_DAILY_ITEMS = 25;
const MAX_DUE_ITEMS = 8;
const MAX_MASTERED_REVIEW_ITEMS = 3;
const MAX_NEW_ITEMS = 5;
const SUPPRESS_NEW_THRESHOLD = 15;
const MAX_REINFORCEMENT_ROUNDS = 2;
const SRS_INTERVALS = [0, 1, 3, 7, 14, 30] as const;

function normalizeVocabularyWord(word: string): string {
  return word.trim().toLowerCase();
}

const VOCABULARY_BY_NORMALIZED_WORD = new Map<string, VocabularyItem>();
for (const item of VOCABULARY) {
  const normalized = normalizeVocabularyWord(item.word);
  if (!VOCABULARY_BY_NORMALIZED_WORD.has(normalized)) {
    VOCABULARY_BY_NORMALIZED_WORD.set(normalized, item);
  }
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
  for (const source of ["daily", "random", "reinforcement"] as VocabularyQuizSource[]) {
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
      localStorage.setItem(VOCABULARY_PROGRESS_KEY, JSON.stringify(progress));
    }
    return progress;
  } catch (e) {
    console.warn("[vocabularyStorage] Failed to read progress:", e);
    return [];
  }
}

function writeProgress(progress: VocabularyProgress[]): void {
  writeJSON(VOCABULARY_PROGRESS_KEY, progress);
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

  if (next.consecutiveCorrect >= 3 && next.intervalDays >= 14) {
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
  return VOCABULARY_BY_NORMALIZED_WORD.get(normalizeVocabularyWord(word)) ?? null;
}

export function bumpWordsToDueByWords(words: string[]): void {
  if (!Array.isArray(words) || words.length === 0) return;

  const wordIds = new Set<string>();
  for (const word of words) {
    if (typeof word !== "string") continue;
    const item = findVocabularyByWord(word);
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

    entry.nextReviewDate = today;
    changed = true;
  }

  if (changed) {
    saveVocabularyProgress(progress);
  }
}

export function getMasteredWordIds(): string[] {
  return readProgress()
    .filter((p) => p.status === "mastered")
    .map((p) => p.wordId);
}

type StoredDailySession = {
  date: string;
  itemBuckets: Array<{ wordId: string; bucket: DailySessionBucket }>;
  counts: DailySession["counts"];
  warnings: DailySession["warnings"];
  reviewedIds: string[];
  validatedIds: string[];
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
      validatedIds: stringIds(session.validatedIds),
      reinforcementIds: stringIds(session.reinforcementIds),
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
  if (!session.validatedIds.includes(wordId)) session.validatedIds.push(wordId);
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
    reinforcementCount: session.reinforcementIds.length,
    reinforcementRound: session.reinforcementRound,
    canReinforce:
      session.reinforcementIds.length > 0 &&
      session.reinforcementRound < MAX_REINFORCEMENT_ROUNDS,
    validatedIds: session.validatedIds,
    reinforcementIds: session.reinforcementIds,
  };
}

export function getDailySessionCompletedCount(): number {
  return getDailySessionActivity().validatedCount;
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

// Legacy aliases
export function markWordLearning(wordId: string): void {
  markWordAgain(wordId);
}

export function markWordMastered(wordId: string): void {
  markWordKnown(wordId);
}

// ─── Daily vocabulary selection ────────────────────────────────────────────

function materializeDailySession(
  stored: StoredDailySession,
  progressMap: Map<string, VocabularyProgress>
): DailySession {
  const vocabularyMap = new Map(VOCABULARY.map((item) => [item.id, item]));
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
  const progress = readProgress();
  const progressMap = new Map(progress.map((p) => [p.wordId, p]));
  const stored = readStoredDailySession();
  if (stored) return materializeDailySession(stored, progressMap);

  const today = todayStr();
  const result: DailySession["items"] = [];
  const usedIds = new Set<string>();
  const retryCandidates = VOCABULARY.filter((item) => {
    const p = progressMap.get(item.id);
    return p?.intervalDays === 0 && p.status !== "new";
  });
  const retryDeferred = Math.max(0, retryCandidates.length - MAX_DAILY_ITEMS);

  for (const item of retryCandidates.slice(0, MAX_DAILY_ITEMS)) {
    result.push({ item, bucket: "retry", progress: progressMap.get(item.id) ?? null });
    usedIds.add(item.id);
  }

  let dueAdded = 0;
  for (const item of VOCABULARY) {
    if (result.length >= MAX_DAILY_ITEMS || dueAdded >= MAX_DUE_ITEMS) break;
    const p = progressMap.get(item.id);
    if (
      !usedIds.has(item.id) &&
      p &&
      p.intervalDays !== 0 &&
      (p.status === "seen" || p.status === "familiar") &&
      p.nextReviewDate <= today
    ) {
      result.push({ item, bucket: "due", progress: p });
      usedIds.add(item.id);
      dueAdded += 1;
    }
  }

  let masteredReviewAdded = 0;
  for (const item of VOCABULARY) {
    if (
      result.length >= MAX_DAILY_ITEMS ||
      masteredReviewAdded >= MAX_MASTERED_REVIEW_ITEMS
    ) {
      break;
    }
    const p = progressMap.get(item.id);
    if (!usedIds.has(item.id) && p?.status === "mastered" && p.nextReviewDate <= today) {
      result.push({ item, bucket: "masteredReview", progress: p });
      usedIds.add(item.id);
      masteredReviewAdded += 1;
    }
  }

  const newSuppressed =
    retryCandidates.slice(0, MAX_DAILY_ITEMS).length + dueAdded >=
    SUPPRESS_NEW_THRESHOLD;
  let newAdded = 0;
  if (!newSuppressed) {
    for (const item of VOCABULARY) {
      if (result.length >= MAX_DAILY_ITEMS || newAdded >= MAX_NEW_ITEMS) break;
      const p = progressMap.get(item.id);
      if (!usedIds.has(item.id) && (!p || p.status === "new")) {
        result.push({ item, bucket: "new", progress: p ?? null });
        usedIds.add(item.id);
        newAdded += 1;
      }
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
    warnings: { newSuppressed, retryDeferred },
  };
  writeStoredDailySession({
    date: today,
    itemBuckets: result.map(({ item, bucket }) => ({ wordId: item.id, bucket })),
    counts: session.counts,
    warnings: session.warnings,
    reviewedIds: [],
    validatedIds: [],
    reinforcementIds: [],
    reinforcementRound: 0,
  });
  return session;
}

export function getTodayVocabulary(): VocabularyItem[] {
  return buildDailySession().items.map(({ item }) => item);
}

// ─── Vocabulary quiz ───────────────────────────────────────────────────────

function placeCorrect(
  correct: string,
  wrongPool: string[]
): { choices: string[]; correctIndex: number } {
  const wrong = shuffleArr(
    [...new Set(wrongPool)].filter((w) => w !== correct)
  ).slice(0, 3);
  while (wrong.length < 3) wrong.push("—");
  const pos = Math.floor(Math.random() * 4);
  const choices = [...wrong];
  choices.splice(pos, 0, correct);
  return { choices: choices.slice(0, 4), correctIndex: pos };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function makeFillBlank(item: VocabularyItem): string | null {
  const regex = new RegExp(`\\b${escapeRegExp(item.word)}s?\\b`, "i");
  if (!regex.test(item.example)) return null;
  return item.example.replace(regex, "______");
}

export function buildVocabularyQuiz(
  source: "today" | "random" | "reinforcement" = "today"
): VocabularyQuizQuestion[] {
  const progress = readProgress();
  const progressMap = new Map(progress.map((p) => [p.wordId, p]));
  let pool: VocabularyItem[];
  if (source === "today") {
    const session = buildDailySession();
    const validatedIds = new Set(readStoredDailySession()?.validatedIds ?? []);
    pool = session.items
      .filter(({ item }) => !validatedIds.has(item.id))
      .map(({ item }) => item);
  } else if (source === "reinforcement") {
    const stored = readStoredDailySession();
    const itemMap = new Map(VOCABULARY.map((item) => [item.id, item]));
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
          others.map((v) => v.meaning_zh)
        );
      } else {
        prompt = blank;
        result = placeCorrect(target.word, others.map((v) => v.word));
      }
    } else if (qType === "zh-to-en") {
      prompt = target.meaning_zh;
      result = placeCorrect(target.word, others.map((v) => v.word));
    } else {
      // en-to-zh
      prompt = target.word;
      result = placeCorrect(
        target.meaning_zh,
        others.map((v) => v.meaning_zh)
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
};

export function saveVocabularyQuizResult(
  wordId: string,
  isCorrect: boolean,
  source: VocabularyQuizSource = "daily"
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
  };
  // Early correct answers are useful practice, but must not fast-forward SRS.
  // A wrong answer always proves a lapse and is applied immediately.
  const shouldApplySchedule =
    source !== "reinforcement" &&
    (!isCorrect || current.nextReviewDate <= todayStr());
  const after =
    shouldApplySchedule ? advanceSchedule(withQuizCounts, isCorrect) : withQuizCounts;
  if (index >= 0) progress[index] = after;
  else progress.push(after);
  writeProgress(progress);
  if (source === "daily") markDailySessionItemValidated(wordId, isCorrect);
  else if (source === "reinforcement") updateReinforcementItem(wordId, isCorrect);
  return { before, after };
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
