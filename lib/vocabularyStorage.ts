import { VOCABULARY } from "@/data/vocabulary";
import type { VocabularyProgress, VocabularyStatus } from "@/types/vocabulary";
import type { VocabularyItem } from "@/types/vocabulary";

const VOCABULARY_PROGRESS_KEY = "toeic_vocabulary_progress_v1";
const DAILY_VOCABULARY_MAX = 10;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Accepts old format (learning → seen) and new format
function migrateEntry(raw: unknown): VocabularyProgress | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  if (typeof p.wordId !== "string") return null;
  if (typeof p.reviewedAt !== "string" || isNaN(Date.parse(p.reviewedAt as string)))
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
      typeof p.addedAt === "string"
        ? p.addedAt
        : (p.reviewedAt as string),
  };
}

function readProgress(): VocabularyProgress[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(VOCABULARY_PROGRESS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(migrateEntry).filter((x): x is VocabularyProgress => x !== null);
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

function makeNewEntry(wordId: string, status: VocabularyStatus): VocabularyProgress {
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

// ─── Mark actions ──────────────────────────────────────────────────────────

export function markWordAgain(wordId: string): void {
  const progress = readProgress();
  const existing = progress.find((p) => p.wordId === wordId);
  if (existing) {
    existing.status = "seen";
    existing.reviewedAt = new Date().toISOString();
    // preserve selfCheckCount — they've made effort before
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
    // First time marking — can't be mastered yet; start at familiar
    progress.push({
      ...makeNewEntry(wordId, "familiar"),
      selfCheckCount: 1,
      lastSelfCheckDate: today,
    });
    writeProgress(progress);
    return;
  }

  // Already mastered — no-op to prevent accidental demotion
  if (existing.status === "mastered") return;

  const prevDate = existing.lastSelfCheckDate;
  existing.selfCheckCount += 1;
  existing.reviewedAt = new Date().toISOString();

  // Cross-day + count >= 2 → mastered
  if (
    prevDate !== null &&
    prevDate !== today &&
    existing.selfCheckCount >= 2
  ) {
    existing.status = "mastered";
  } else {
    // Same day, or first check — stay at familiar
    existing.status = "familiar";
  }

  existing.lastSelfCheckDate = today;
  writeProgress(progress);
}

// ─── Legacy aliases (still used by storage.ts clearAllProgress path) ───────

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

  // Priority 1: familiar words where today differs from lastSelfCheckDate (cross-day confirm), up to 3
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

  // Priority 3: new words (no entry, or status === "new"), fill up to DAILY_VOCABULARY_MAX
  for (const item of VOCABULARY) {
    if (result.length >= DAILY_VOCABULARY_MAX) break;
    if (usedIds.has(item.id)) continue;
    const p = progressMap.get(item.id);
    if (!p || p.status === "new") {
      result.push(item);
      usedIds.add(item.id);
    }
  }

  // Priority 4: mastered words as fallback, so the page still shows 10 cards
  for (const item of VOCABULARY) {
    if (result.length >= DAILY_VOCABULARY_MAX) break;
    if (usedIds.has(item.id)) continue;
    const p = progressMap.get(item.id);
    if (p?.status === "mastered") {
      result.push(item);
      usedIds.add(item.id);
    }
  }

  // Priority 5: familiar words as fallback (e.g. same-day checked ones that fell through)
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
