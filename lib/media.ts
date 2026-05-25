import type { Question } from "@/types/question";

const SUPPORTED_AUDIO_PARTS = new Set(["Part 1", "Part 2", "Part 3", "Part 4"]);
const SUPPORTED_IMAGE_PARTS = new Set(["Part 1"]);

function getBlobBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/+$/, "") ?? "";
}

/**
 * Returns the canonical Blob URL for a question's audio, or null if:
 *   1) BLOB base URL is not configured, OR
 *   2) the question's part doesn't have audio (e.g. Part 5/6/7 reading), OR
 *   3) explicit override via question.audioUrl points elsewhere (use that instead).
 *
 * Storage convention: audio/<questionId>.mp3
 */
export function getAudioUrl(
  question: Pick<Question, "id" | "part" | "audioUrl">
): string | null {
  if (question.audioUrl) return question.audioUrl;
  const blobBaseUrl = getBlobBaseUrl();
  if (!blobBaseUrl) return null;
  if (!SUPPORTED_AUDIO_PARTS.has(question.part)) return null;
  return `${blobBaseUrl}/audio/${question.id}.mp3`;
}

/**
 * Returns the narrated question-stem audio URL for Part 3 listening flows.
 * Storage convention: audio/<questionId>-q.mp3
 */
export function getQuestionAudioUrl(
  question: Pick<Question, "id" | "part">
): string | null {
  if (question.part !== "Part 3") return null;
  const blobBaseUrl = getBlobBaseUrl();
  if (!blobBaseUrl) return null;
  return `${blobBaseUrl}/audio/${question.id}-q.mp3`;
}

/**
 * Returns the canonical Blob URL for a question's image, or null if:
 *   1) BLOB base URL is not configured, OR
 *   2) the question's part doesn't have an image (only Part 1), OR
 *   3) explicit override via question.imageUrl is set.
 *
 * Storage convention: images/<questionId>.jpg
 */
export function getImageUrl(
  question: Pick<Question, "id" | "part" | "imageUrl">
): string | null {
  if (question.imageUrl) return question.imageUrl;
  const blobBaseUrl = getBlobBaseUrl();
  if (!blobBaseUrl) return null;
  if (!SUPPORTED_IMAGE_PARTS.has(question.part)) return null;
  return `${blobBaseUrl}/images/${question.id}.jpg`;
}

/**
 * Pure check: does this question's part support media?
 * UI uses this to decide whether to even attempt fetching.
 */
export function hasMediaSupport(question: Pick<Question, "part">): {
  audio: boolean;
  image: boolean;
} {
  return {
    audio: SUPPORTED_AUDIO_PARTS.has(question.part),
    image: SUPPORTED_IMAGE_PARTS.has(question.part),
  };
}
