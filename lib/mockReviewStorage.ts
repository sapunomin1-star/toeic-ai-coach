import type {
  MockReviewMode,
  MockReviewQuestionSnapshot,
  MockReviewSnapshot,
} from "@/types/mock";
import type { Choice, Question } from "@/types/question";
import {
  STORAGE_KEYS,
  isBrowser,
  isChoice,
  isValidDate,
  readJSON,
  writeJSON,
} from "@/lib/storageCore";
import { getAudioUrl, getImageUrl, getQuestionAudioUrl } from "@/lib/media";
import { audioGroupKey } from "@/lib/mockShared";

const MAX_REVIEW_SNAPSHOTS = 20;
const VALID_REVIEW_MODES = new Set<MockReviewMode>(["reading", "listening", "full"]);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isChoiceMap(value: unknown): value is Question["choices"] {
  if (!value || typeof value !== "object") return false;
  const choices = value as Record<string, unknown>;
  return (
    typeof choices.A === "string" &&
    typeof choices.B === "string" &&
    typeof choices.C === "string" &&
    (choices.D === undefined || typeof choices.D === "string")
  );
}

function isAudioChoices(value: unknown): value is Question["audioChoices"] {
  return value === undefined || isChoiceMap(value);
}

function validateReviewItem(raw: unknown): MockReviewQuestionSnapshot | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;

  if (typeof item.questionId !== "string") return null;
  if (typeof item.part !== "string") return null;
  if (typeof item.question !== "string") return null;
  if (!isChoiceMap(item.choices)) return null;
  if (!isChoice(item.correctAnswer)) return null;
  if (item.userAnswer !== undefined && !isChoice(item.userAnswer)) return null;
  if (typeof item.isCorrect !== "boolean") return null;
  if (
    item.responseTimeMs !== undefined &&
    typeof item.responseTimeMs !== "number"
  ) {
    return null;
  }
  if (typeof item.explanation_zh !== "string") return null;
  if (item.explanation_en !== undefined && typeof item.explanation_en !== "string") {
    return null;
  }
  if (typeof item.skill_tag !== "string") return null;
  if (typeof item.difficulty !== "string") return null;
  if (item.vocabulary !== undefined && !isStringArray(item.vocabulary)) return null;
  if (item.transcript !== undefined && typeof item.transcript !== "string") return null;
  if (item.passage !== undefined && typeof item.passage !== "string") return null;
  if (
    item.passage_group_id !== undefined &&
    typeof item.passage_group_id !== "string"
  ) {
    return null;
  }
  if (
    item.passage_group_type !== undefined &&
    typeof item.passage_group_type !== "string"
  ) {
    return null;
  }
  if (item.passage_order !== undefined && typeof item.passage_order !== "number") {
    return null;
  }
  if (item.question_order !== undefined && typeof item.question_order !== "number") {
    return null;
  }
  if (item.imageUrl !== undefined && typeof item.imageUrl !== "string") return null;
  if (item.imageAlt !== undefined && typeof item.imageAlt !== "string") return null;
  if (item.audioUrl !== undefined && typeof item.audioUrl !== "string") return null;
  if (
    item.questionAudioUrl !== undefined &&
    typeof item.questionAudioUrl !== "string"
  ) {
    return null;
  }
  if (!isAudioChoices(item.audioChoices)) return null;
  if (item.audioScript !== undefined && typeof item.audioScript !== "string") {
    return null;
  }

  return item as MockReviewQuestionSnapshot;
}

function validateReviewSnapshot(raw: unknown): MockReviewSnapshot | null {
  if (!raw || typeof raw !== "object") return null;
  const snapshot = raw as Record<string, unknown>;

  if (typeof snapshot.id !== "string") return null;
  if (typeof snapshot.resultId !== "string") return null;
  if (
    typeof snapshot.mode !== "string" ||
    !VALID_REVIEW_MODES.has(snapshot.mode as MockReviewMode)
  ) {
    return null;
  }
  if (!isValidDate(snapshot.startedAt)) return null;
  if (!isValidDate(snapshot.submittedAt)) return null;
  if (!isStringArray(snapshot.questionIds)) return null;
  if (!Array.isArray(snapshot.items)) return null;

  const items = snapshot.items.map(validateReviewItem);
  if (items.some((item) => item === null)) return null;

  return {
    ...(snapshot as MockReviewSnapshot),
    items: items as MockReviewQuestionSnapshot[],
  };
}

function toReviewItem(
  question: Question,
  questions: Question[],
  answers: Partial<Record<string, Choice>>,
  responseTimes: Partial<Record<string, number>> = {},
): MockReviewQuestionSnapshot {
  const userAnswer = answers[question.id];
  const audioOwner =
    question.part === "Part 3" || question.part === "Part 4"
      ? questions.find(
          (candidate) => audioGroupKey(candidate) === audioGroupKey(question),
        ) ?? question
      : question;
  const imageUrl = getImageUrl(question);
  const audioUrl = getAudioUrl(audioOwner);
  const questionAudioUrl = getQuestionAudioUrl(question);

  return {
    questionId: question.id,
    part: question.part,
    question: question.question,
    choices: question.choices,
    correctAnswer: question.answer,
    ...(userAnswer ? { userAnswer } : {}),
    isCorrect: userAnswer === question.answer,
    ...(typeof responseTimes[question.id] === "number"
      ? { responseTimeMs: responseTimes[question.id] }
      : {}),
    explanation_zh: question.explanation_zh,
    ...(question.explanation_en ? { explanation_en: question.explanation_en } : {}),
    skill_tag: question.skill_tag,
    difficulty: question.difficulty,
    ...(question.vocabulary ? { vocabulary: question.vocabulary } : {}),
    ...(question.transcript ? { transcript: question.transcript } : {}),
    ...(question.passage ? { passage: question.passage } : {}),
    ...(question.passage_group_id ? { passage_group_id: question.passage_group_id } : {}),
    ...(question.passage_group_type
      ? { passage_group_type: question.passage_group_type }
      : {}),
    ...(question.passage_order !== undefined ? { passage_order: question.passage_order } : {}),
    ...(question.question_order !== undefined
      ? { question_order: question.question_order }
      : {}),
    ...(imageUrl ? { imageUrl } : {}),
    ...(question.imageAlt ? { imageAlt: question.imageAlt } : {}),
    ...(audioUrl ? { audioUrl } : {}),
    ...(questionAudioUrl ? { questionAudioUrl } : {}),
    ...(question.audioChoices ? { audioChoices: question.audioChoices } : {}),
    ...(question.audioScript ? { audioScript: question.audioScript } : {}),
  };
}

export function buildMockReviewSnapshot({
  resultId,
  mode,
  questions,
  answers,
  responseTimes,
  startedAt,
  submittedAt,
}: {
  resultId: string;
  mode: MockReviewMode;
  questions: Question[];
  answers: Partial<Record<string, Choice>>;
  responseTimes?: Partial<Record<string, number>>;
  startedAt: string;
  submittedAt: string;
}): MockReviewSnapshot {
  return {
    id: `review-${resultId}`,
    resultId,
    mode,
    startedAt,
    submittedAt,
    questionIds: questions.map((question) => question.id),
    items: questions.map((question) =>
      toReviewItem(question, questions, answers, responseTimes),
    ),
  };
}

export function getMockReviewSnapshots(): MockReviewSnapshot[] {
  const raw = readJSON<unknown[]>(STORAGE_KEYS.mockReviewSnapshots, []);
  if (!Array.isArray(raw)) return [];
  return raw
    .map(validateReviewSnapshot)
    .filter((item): item is MockReviewSnapshot => item !== null);
}

export function getMockReviewSnapshot(id: string): MockReviewSnapshot | null {
  return getMockReviewSnapshots().find((snapshot) => snapshot.id === id) ?? null;
}

export function saveMockReviewSnapshot(snapshot: MockReviewSnapshot): boolean {
  const snapshots = getMockReviewSnapshots().filter((item) => item.id !== snapshot.id);
  snapshots.push(snapshot);
  return writeJSON(
    STORAGE_KEYS.mockReviewSnapshots,
    snapshots.slice(-MAX_REVIEW_SNAPSHOTS),
  );
}

export function clearMockReviewSnapshots(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.mockReviewSnapshots);
}
