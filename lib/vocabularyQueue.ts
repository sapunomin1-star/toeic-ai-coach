import { STORAGE_KEYS, readJSON, writeJSON } from "@/lib/storageCore";
import { normalizeTerm, type TermGlossPartOfSpeech } from "@/lib/termResolution";

/**
 * 待學佇列 — words the learner flagged as unfamiliar on a question (review
 * F10). Separate from the SRS progress on purpose: a flag is a request to
 * study, not evidence of memory. Terms with a card carry `wordId` (and get
 * pulled into the daily session by lib/vocabularyStorage); terms the bank does
 * not hold keep a snapshot of the gloss they were shown, so they stay visible
 * as 尚無字卡 instead of vanishing.
 *
 * Storage: `toeic_vocabulary_queue_v1`, one entry per normalized term, with
 * `dismissedAt` tombstones (learned / removed) so the cross-device union
 * merge cannot resurrect a dismissed word — same design as manualReviewItems.
 * This module reads only storageCore, so vocabularyStorage may import it
 * without a cycle.
 */
export type VocabularyQueueEntry = {
  /** Normalized term — the entry's identity across devices. */
  key: string;
  /** The term as it appeared in the question. */
  term: string;
  /** Vocabulary card id when the term resolves to one (exact or inflected). */
  wordId?: string;
  /** Question where it was flagged. */
  questionId: string;
  /** Meaning shown at flag time; the only teaching content for card-less terms. */
  meaning_zh?: string;
  partOfSpeech?: TermGlossPartOfSpeech;
  addedAt: string;
  /** Tombstone. A later re-flag (addedAt > dismissedAt) re-activates the entry. */
  dismissedAt?: string;
};

const QUEUE_KEY = STORAGE_KEYS.vocabularyQueue;
const MAX_DISMISSED_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const PARTS_OF_SPEECH = new Set<string>([
  "noun", "verb", "adjective", "adverb", "phrase", "preposition", "conjunction", "pronoun", "other",
]);

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export function isVocabularyQueueEntry(value: unknown): value is VocabularyQueueEntry {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entry = value as Partial<VocabularyQueueEntry>;
  return (
    typeof entry.key === "string" &&
    entry.key.length > 0 &&
    typeof entry.term === "string" &&
    typeof entry.questionId === "string" &&
    isIsoDate(entry.addedAt) &&
    (entry.wordId === undefined || typeof entry.wordId === "string") &&
    (entry.meaning_zh === undefined || typeof entry.meaning_zh === "string") &&
    (entry.partOfSpeech === undefined || PARTS_OF_SPEECH.has(entry.partOfSpeech)) &&
    (entry.dismissedAt === undefined || isIsoDate(entry.dismissedAt))
  );
}

/** True while the entry has not been dismissed since it was last added. */
export function isActiveQueueEntry(entry: VocabularyQueueEntry): boolean {
  return entry.dismissedAt === undefined || entry.dismissedAt < entry.addedAt;
}

/** Every stored row, tombstones included — the write path and the merge need them. */
export function readAllVocabularyQueueEntries(): VocabularyQueueEntry[] {
  const raw = readJSON<unknown>(QUEUE_KEY, []);
  return Array.isArray(raw) ? raw.filter(isVocabularyQueueEntry) : [];
}

/** The queue as the learner sees it: active entries, newest first. */
export function getVocabularyQueue(): VocabularyQueueEntry[] {
  return readAllVocabularyQueueEntries()
    .filter(isActiveQueueEntry)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.key.localeCompare(b.key));
}

export function isTermQueued(term: string): boolean {
  const key = normalizeTerm(term);
  return getVocabularyQueue().some((entry) => entry.key === key);
}

/** Card ids of active entries — the daily session prioritizes these as new words. */
export function queuedWordIds(): Set<string> {
  const ids = new Set<string>();
  for (const entry of getVocabularyQueue()) if (entry.wordId) ids.add(entry.wordId);
  return ids;
}

function pruneTombstones(entries: VocabularyQueueEntry[]): VocabularyQueueEntry[] {
  const now = Date.now();
  return entries.filter(
    (entry) =>
      isActiveQueueEntry(entry) ||
      now - Date.parse(entry.dismissedAt as string) <= MAX_DISMISSED_AGE_MS,
  );
}

/**
 * Add or re-activate an entry. Returns false when the write failed (quota),
 * so the caller must not show the word as queued.
 */
export function upsertVocabularyQueueEntry(
  input: Omit<VocabularyQueueEntry, "key" | "addedAt" | "dismissedAt">,
): boolean {
  const key = normalizeTerm(input.term);
  if (!key) return false;
  const entries = readAllVocabularyQueueEntries().filter((entry) => entry.key !== key);
  const next: VocabularyQueueEntry = {
    key,
    term: input.term.trim(),
    questionId: input.questionId,
    addedAt: new Date().toISOString(),
    ...(input.wordId ? { wordId: input.wordId } : {}),
    ...(input.meaning_zh ? { meaning_zh: input.meaning_zh } : {}),
    ...(input.partOfSpeech ? { partOfSpeech: input.partOfSpeech } : {}),
  };
  entries.push(next);
  return writeJSON(QUEUE_KEY, pruneTombstones(entries));
}

/** Mark an entry learned / removed. Kept as a tombstone for the merge. */
export function dismissVocabularyQueueTerm(term: string): boolean {
  const key = normalizeTerm(term);
  const entries = readAllVocabularyQueueEntries();
  const index = entries.findIndex((entry) => entry.key === key);
  if (index < 0) return false;
  entries[index] = { ...entries[index], dismissedAt: new Date().toISOString() };
  return writeJSON(QUEUE_KEY, pruneTombstones(entries));
}
