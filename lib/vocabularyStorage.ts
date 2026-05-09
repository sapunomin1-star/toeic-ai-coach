import { VOCABULARY } from "@/data/vocabulary";
import type {
  QuizQuestionType,
  VocabularyItem,
  VocabularyProgress,
  VocabularyQuizQuestion,
  VocabularyStatus,
} from "@/types/vocabulary";

const VOCABULARY_PROGRESS_KEY = "toeic_vocabulary_progress_v1";
const DAILY_VOCABULARY_MAX = 10;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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

  return {
    wordId: p.wordId as string,
    status,
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
  };
}

function readProgress(): VocabularyProgress[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(VOCABULARY_PROGRESS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(migrateEntry)
      .filter((x): x is VocabularyProgress => x !== null);
  } catch (e) {
    console.warn("[vocabularyStorage] Failed to read progress:", e);
    return [];
  }
}

function writeProgress(progress: VocabularyProgress[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(VOCABULARY_PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("[vocabularyStorage] Failed to write progress:", e);
  }
}

function makeNewEntry(
  wordId: string,
  status: VocabularyStatus
): VocabularyProgress {
  const now = new Date().toISOString();
  return {
    wordId,
    status,
    reviewedAt: now,
    selfCheckCount: 0,
    lastSelfCheckDate: null,
    addedAt: now,
  };
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

export function getMasteredWordIds(): string[] {
  return readProgress()
    .filter((p) => p.status === "mastered")
    .map((p) => p.wordId);
}

// ─── Flashcard mark actions ────────────────────────────────────────────────

export function markWordAgain(wordId: string): void {
  const progress = readProgress();
  const existing = progress.find((p) => p.wordId === wordId);
  if (existing) {
    existing.status = "seen";
    existing.reviewedAt = new Date().toISOString();
  } else {
    progress.push({ ...makeNewEntry(wordId, "seen") });
  }
  writeProgress(progress);
}

export function markWordFamiliar(wordId: string): void {
  const progress = readProgress();
  const existing = progress.find((p) => p.wordId === wordId);
  if (existing) {
    existing.status = "familiar";
    existing.reviewedAt = new Date().toISOString();
  } else {
    progress.push({ ...makeNewEntry(wordId, "familiar") });
  }
  writeProgress(progress);
}

export function markWordKnown(wordId: string): void {
  const progress = readProgress();
  const today = todayStr();
  const existing = progress.find((p) => p.wordId === wordId);

  if (!existing) {
    progress.push({
      ...makeNewEntry(wordId, "familiar"),
      selfCheckCount: 1,
      lastSelfCheckDate: today,
    });
    writeProgress(progress);
    return;
  }

  if (existing.status === "mastered") return;

  const prevDate = existing.lastSelfCheckDate;
  existing.selfCheckCount += 1;
  existing.reviewedAt = new Date().toISOString();

  if (
    prevDate !== null &&
    prevDate !== today &&
    existing.selfCheckCount >= 2
  ) {
    existing.status = "mastered";
  } else {
    existing.status = "familiar";
  }

  existing.lastSelfCheckDate = today;
  writeProgress(progress);
}

// Legacy aliases
export function markWordLearning(wordId: string): void {
  markWordAgain(wordId);
}

export function markWordMastered(wordId: string): void {
  markWordKnown(wordId);
}

// ─── Daily vocabulary selection ────────────────────────────────────────────

export function getTodayVocabulary(): VocabularyItem[] {
  const progress = readProgress();
  const progressMap = new Map(progress.map((p) => [p.wordId, p]));
  const today = todayStr();
  const result: VocabularyItem[] = [];
  const usedIds = new Set<string>();

  // Priority 1: familiar words awaiting cross-day confirmation, up to 3
  for (const item of VOCABULARY) {
    if (result.length >= 3) break;
    const p = progressMap.get(item.id);
    if (
      p?.status === "familiar" &&
      p.lastSelfCheckDate !== null &&
      p.lastSelfCheckDate !== today
    ) {
      result.push(item);
      usedIds.add(item.id);
    }
  }

  // Priority 2: seen words, up to 3 more
  for (const item of VOCABULARY) {
    if (result.length >= 6) break;
    if (usedIds.has(item.id)) continue;
    const p = progressMap.get(item.id);
    if (p?.status === "seen") {
      result.push(item);
      usedIds.add(item.id);
    }
  }

  // Priority 3: new words to fill up to max
  for (const item of VOCABULARY) {
    if (result.length >= DAILY_VOCABULARY_MAX) break;
    if (usedIds.has(item.id)) continue;
    const p = progressMap.get(item.id);
    if (!p || p.status === "new") {
      result.push(item);
      usedIds.add(item.id);
    }
  }

  // Priority 4: mastered as fallback
  for (const item of VOCABULARY) {
    if (result.length >= DAILY_VOCABULARY_MAX) break;
    if (usedIds.has(item.id)) continue;
    const p = progressMap.get(item.id);
    if (p?.status === "mastered") {
      result.push(item);
      usedIds.add(item.id);
    }
  }

  // Priority 5: remaining familiar (same-day)
  for (const item of VOCABULARY) {
    if (result.length >= DAILY_VOCABULARY_MAX) break;
    if (usedIds.has(item.id)) continue;
    const p = progressMap.get(item.id);
    if (p?.status === "familiar") {
      result.push(item);
      usedIds.add(item.id);
    }
  }

  return result;
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

function makeFillBlank(item: VocabularyItem): string | null {
  const regex = new RegExp(`\\b${item.word}s?\\b`, "i");
  if (!regex.test(item.example)) return null;
  return item.example.replace(regex, "______");
}

export function buildVocabularyQuiz(): VocabularyQuizQuestion[] {
  const progress = readProgress();
  const progressMap = new Map(progress.map((p) => [p.wordId, p]));

  const nonMastered = shuffleArr(
    VOCABULARY.filter(
      (v) => (progressMap.get(v.id)?.status ?? "new") !== "mastered"
    )
  );
  const mastered = shuffleArr(
    VOCABULARY.filter((v) => progressMap.get(v.id)?.status === "mastered")
  );

  const pool = [...nonMastered, ...mastered].slice(0, 10);
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

export function saveVocabularyQuizResult(
  wordId: string,
  isCorrect: boolean
): void {
  const progress = readProgress();
  const now = new Date().toISOString();
  const existing = progress.find((p) => p.wordId === wordId);

  if (!existing) {
    progress.push({
      ...makeNewEntry(wordId, isCorrect ? "familiar" : "seen"),
      quizCorrectCount: isCorrect ? 1 : 0,
      quizWrongCount: isCorrect ? 0 : 1,
      lastQuizAt: now,
    });
  } else {
    existing.quizCorrectCount = (existing.quizCorrectCount ?? 0) + (isCorrect ? 1 : 0);
    existing.quizWrongCount = (existing.quizWrongCount ?? 0) + (isCorrect ? 0 : 1);
    existing.lastQuizAt = now;
    existing.reviewedAt = now;

    if (isCorrect) {
      // new or seen → promote to familiar (not mastered)
      if (existing.status === "new" || existing.status === "seen") {
        existing.status = "familiar";
      }
    } else {
      // wrong: ensure at least "seen"
      if (existing.status === "new") {
        existing.status = "seen";
      }
    }
  }

  writeProgress(progress);
}

export type VocabularyQuizStats = {
  totalCorrect: number;
  totalWrong: number;
  accuracy: number;
  lastQuizAt: string | null;
};

export function getVocabularyQuizStats(): VocabularyQuizStats {
  const progress = readProgress();
  let totalCorrect = 0;
  let totalWrong = 0;
  let lastQuizAt: string | null = null;

  for (const p of progress) {
    totalCorrect += p.quizCorrectCount ?? 0;
    totalWrong += p.quizWrongCount ?? 0;
    if (p.lastQuizAt && (!lastQuizAt || p.lastQuizAt > lastQuizAt)) {
      lastQuizAt = p.lastQuizAt;
    }
  }

  const total = totalCorrect + totalWrong;
  const accuracy =
    total === 0 ? 0 : Math.round((totalCorrect / total) * 1000) / 10;

  return { totalCorrect, totalWrong, accuracy, lastQuizAt };
}
