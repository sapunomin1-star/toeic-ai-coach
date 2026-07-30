"use client";

import Image from "next/image";
import AudioPlayer from "@/components/AudioPlayer";
import { getAudioOwnerQuestion } from "@/lib/audioOwner";
import {
  getAudioUrl,
  getImageUrl,
  getQuestionAudioUrl,
  hasMediaSupport,
} from "@/lib/media";
import { audioGroupKey } from "@/lib/mockShared";
import type { Choice, Question } from "@/types/question";

const CHOICE_KEYS: Choice[] = ["A", "B", "C", "D"];

/** Pacing state the runner reads from useMockAudioPacing for this question. */
export type MockPacingView = {
  audioFailed: boolean;
  audioAlreadyPlayed: boolean;
  audioIsActive: boolean;
  questionAudioPlayed: boolean;
  questionAudioIsActive: boolean;
  questionAudioFailed: boolean;
  countdownActive: boolean;
  countdownSec: number;
};

/** The subset of useMockAudioPacing's return value makePacingView reads. */
export type MockPacingSource = {
  failedAudioGroups: ReadonlySet<string>;
  playedGroups: ReadonlySet<string>;
  activeAudioGroup: string | null;
  playedQuestionAudioIds: ReadonlySet<string>;
  failedQuestionAudioIds: ReadonlySet<string>;
  activeQuestionAudioId: string | null;
  countdownQuestionId: string | null;
  countdownSec: number;
};

/**
 * Project the pacing machine's state onto one question. Both runners use this
 * so the set→flag mapping lives in exactly one place.
 */
export function makePacingView(
  pacing: MockPacingSource,
  groupKey: string,
  questionId: string,
): MockPacingView {
  return {
    audioFailed: pacing.failedAudioGroups.has(groupKey),
    audioAlreadyPlayed: pacing.playedGroups.has(groupKey),
    audioIsActive: pacing.activeAudioGroup === groupKey,
    questionAudioPlayed: pacing.playedQuestionAudioIds.has(questionId),
    questionAudioIsActive: pacing.activeQuestionAudioId === questionId,
    questionAudioFailed: pacing.failedQuestionAudioIds.has(questionId),
    countdownActive: pacing.countdownQuestionId === questionId,
    countdownSec: pacing.countdownSec,
  };
}

/**
 * The per-question exam canvas (image, group audio + no-replay banner, Part 3
 * narrated stem + countdown, passage, stem, choices) shared by both mock
 * runners. Pure presentation: every pacing decision stays in
 * useMockAudioPacing and the runners; this component only renders the given
 * state and forwards events.
 *
 * The AudioPlayer keys are load-bearing: keying the group player by
 * audioGroupKey keeps it mounted while navigating among the questions of one
 * Part 3/4 transcript group, so the recording does not remount or restart.
 * In listening flows Part 1/2 on-screen text IS the spoken audio, so it stays
 * hidden while answering, and per-choice audio is never exposed.
 */
export default function MockQuestionCanvas({
  question,
  displayNumber,
  isListeningActive,
  groupPosition,
  selectedChoice,
  pacing,
  onAudioStarted,
  onAudioEnded,
  onAudioError,
  onQuestionAudioStarted,
  onQuestionAudioEnded,
  onQuestionAudioError,
  onPick,
}: {
  question: Question;
  displayNumber: number;
  isListeningActive: boolean;
  groupPosition: { index: number; total: number } | null;
  selectedChoice: Choice | undefined;
  pacing: MockPacingView;
  onAudioStarted: () => void;
  onAudioEnded: () => void;
  onAudioError: () => void;
  onQuestionAudioStarted: () => void;
  onQuestionAudioEnded: () => void;
  onQuestionAudioError: () => void;
  onPick: (choice: Choice) => void;
}) {
  const groupKey = audioGroupKey(question);
  const visibleChoices: Choice[] =
    question.choices.D === undefined ? ["A", "B", "C"] : CHOICE_KEYS;
  const questionText = question.question.trim() || "請聽音檔後選擇答案";
  const imageUrl = getImageUrl(question);
  const mediaSupport = hasMediaSupport(question);
  // P3/P4 group audio is stored on the canonical smallest-id member only.
  const audioUrl = isListeningActive
    ? getAudioUrl(getAudioOwnerQuestion(question))
    : null;
  const hideText =
    isListeningActive &&
    (question.part === "Part 1" || question.part === "Part 2");
  const questionAudioUrl =
    isListeningActive && question.part === "Part 3"
      ? getQuestionAudioUrl(question)
      : null;
  const enableP3MockPacing = questionAudioUrl !== null;
  const conversationFinishedOrSkipped =
    pacing.audioAlreadyPlayed && !pacing.audioIsActive;
  const showQuestionAudio =
    enableP3MockPacing &&
    conversationFinishedOrSkipped &&
    !pacing.countdownActive &&
    !pacing.questionAudioFailed &&
    (!pacing.questionAudioPlayed || pacing.questionAudioIsActive);

  return (
    <>
      {imageUrl && (
        <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <Image
            src={imageUrl}
            alt={question.imageAlt ?? "TOEIC listening question image"}
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {audioUrl && !pacing.audioFailed && (!pacing.audioAlreadyPlayed || pacing.audioIsActive) ? (
        <div className="mb-4">
          <AudioPlayer
            key={groupKey}
            src={audioUrl}
            autoPlay
            onPlaybackStart={onAudioStarted}
            onEnded={onAudioEnded}
            onError={onAudioError}
          />
        </div>
      ) : audioUrl && pacing.audioAlreadyPlayed ? (
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-600">
          🔇 此段音檔已播放過，模擬考不可重播
        </div>
      ) : isListeningActive && mediaSupport.audio ? (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
          ⚠ 音檔未載入
        </div>
      ) : null}

      {showQuestionAudio && (
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-slate-500">題目朗讀</p>
          <AudioPlayer
            key={`${question.id}-question-audio`}
            src={questionAudioUrl}
            autoPlay
            onPlaybackStart={onQuestionAudioStarted}
            onEnded={onQuestionAudioEnded}
            onError={onQuestionAudioError}
          />
        </div>
      )}

      {enableP3MockPacing && pacing.questionAudioFailed && pacing.countdownActive && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
          ⚠ 題目朗讀載入失敗，倒數仍進行
        </div>
      )}

      {pacing.countdownActive && (
        <div
          role="timer"
          aria-live="polite"
          aria-label={`此題剩餘 ${pacing.countdownSec} 秒`}
          className={`mb-4 rounded-xl border p-4 text-center ${
            pacing.countdownSec <= 3
              ? "animate-pulse border-rose-200 bg-rose-50 text-rose-700"
              : "border-indigo-200 bg-indigo-50 text-indigo-700"
          }`}
        >
          <p className="text-xs font-semibold">作答倒數</p>
          <p className="mt-1 text-4xl font-bold">⏱ {pacing.countdownSec}</p>
        </div>
      )}

      {question.passage && (
        // For Part 3/4 the passage is the printed graphic — a timetable or price
        // list read against the audio. It needs a monospaced face to keep its
        // columns aligned, and `pre` + horizontal scroll rather than `pre-wrap`:
        // the widest table is ~51 characters, which wraps on a phone and
        // destroys the alignment the columns depend on. Reading parts keep
        // wrapping prose in the body face.
        <div
          className={`mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 ${
            question.part === "Part 3" || question.part === "Part 4"
              ? "overflow-x-auto whitespace-pre font-mono"
              : "whitespace-pre-wrap"
          }`}
        >
          {question.passage}
        </div>
      )}

      {/* Note: transcript is intentionally NOT shown during mock testing.
          Real-exam simulation — students must rely on the audio alone. */}

      {hideText ? (
        <p className="text-sm font-medium text-slate-900">
          {displayNumber}. 請依音檔內容選擇答案
        </p>
      ) : (
        <p className="text-sm font-medium text-slate-900">
          {displayNumber}. {questionText}
        </p>
      )}

      {groupPosition && (
        <p className="mt-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          {question.part} 題組題 {groupPosition.index}/{groupPosition.total}
        </p>
      )}

      <div
        className={
          hideText
            ? `mt-4 grid ${
                visibleChoices.length === 3 ? "grid-cols-3" : "grid-cols-4"
              } gap-3`
            : "mt-3 space-y-2"
        }
      >
        {visibleChoices.map((choice) => {
          const selected = selectedChoice === choice;
          const choiceAudio = question.audioChoices?.[choice];
          return (
            <div key={choice} className="space-y-2">
              {/* In listening flows, never expose per-choice audio replay —
                  it would let students re-hear individual responses. */}
              {choiceAudio && !isListeningActive && (
                <AudioPlayer key={choiceAudio} src={choiceAudio} allowReplay />
              )}
              <button
                onClick={() => onPick(choice)}
                aria-label={hideText ? `選擇答案 ${choice}` : undefined}
                aria-pressed={selected}
                className={`block w-full rounded-xl border px-4 py-3 text-sm ${
                  hideText ? "min-h-14 text-center text-base" : "text-left"
                } ${
                  selected
                    ? "border-indigo-300 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <span className="font-bold">{hideText ? choice : `${choice}.`}</span>
                {hideText ? null : <> {question.choices[choice]}</>}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
