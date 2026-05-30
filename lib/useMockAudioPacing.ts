import { useCallback, useEffect, useState } from "react";
import { getQuestionAudioUrl } from "@/lib/media";
import { audioGroupKey } from "@/lib/mockShared";
import type { Question } from "@/types/question";

type UseMockAudioPacingConfig = {
  /** True while the test is being taken (phase === "testing"). */
  isTesting: boolean;
  /** True while the current section plays audio (listening mock / full-mock listening half). */
  isListeningActive: boolean;
  questions: Question[];
  currentIndex: number;
  /** Persist a consumed audio group to the session (no-replay rule). */
  persistAudioGroup: (groupKey: string) => void;
  /** Persist a consumed Part 3 question-stem to the session. */
  persistQuestionAudio: (questionId: string) => void;
  /** What to do when a Part 3 answering countdown elapses (advance / submit). */
  onCountdownAdvance: () => void;
};

/**
 * Shared listening audio "no replay" + Part 3 pacing state machine for the
 * mock runners. Owns which audio groups / question stems have been consumed,
 * which are actively playing, and the per-question answering countdown.
 *
 * Consumption is persisted the instant audible playback starts (via the
 * caller's persist* callbacks fired from AudioPlayer.onPlaybackStart), so
 * navigating away or refreshing cannot replay partial audio.
 */
export function useMockAudioPacing({
  isTesting,
  isListeningActive,
  questions,
  currentIndex,
  persistAudioGroup,
  persistQuestionAudio,
  onCountdownAdvance,
}: UseMockAudioPacingConfig) {
  const [failedAudioGroups, setFailedAudioGroups] = useState<Set<string>>(new Set());
  const [playedGroups, setPlayedGroups] = useState<Set<string>>(new Set());
  const [activeAudioGroup, setActiveAudioGroup] = useState<string | null>(null);
  const [playedQuestionAudioIds, setPlayedQuestionAudioIds] = useState<Set<string>>(new Set());
  const [failedQuestionAudioIds, setFailedQuestionAudioIds] = useState<Set<string>>(new Set());
  const [activeQuestionAudioId, setActiveQuestionAudioId] = useState<string | null>(null);
  const [countdownQuestionId, setCountdownQuestionId] = useState<string | null>(null);
  const [countdownSec, setCountdownSec] = useState(8);

  function handleAudioStarted(groupKey: string) {
    setActiveAudioGroup(groupKey);
    setPlayedGroups((previous) => {
      if (previous.has(groupKey)) return previous;
      const next = new Set(previous);
      next.add(groupKey);
      return next;
    });
    persistAudioGroup(groupKey);
  }

  function handleAudioEnded(groupKey: string) {
    setActiveAudioGroup((current) => (current === groupKey ? null : current));
  }

  function markAudioGroupFailed(groupKey: string) {
    setFailedAudioGroups((groups) => new Set(groups).add(groupKey));
  }

  function handleQuestionAudioStarted(questionId: string) {
    setActiveQuestionAudioId(questionId);
    setPlayedQuestionAudioIds((previous) => {
      if (previous.has(questionId)) return previous;
      const next = new Set(previous);
      next.add(questionId);
      return next;
    });
    persistQuestionAudio(questionId);
  }

  function beginQuestionCountdown(questionId: string) {
    setActiveQuestionAudioId((current) => (current === questionId ? null : current));
    setCountdownQuestionId(questionId);
    setCountdownSec(8);
  }

  function handleQuestionAudioError(questionId: string) {
    setFailedQuestionAudioIds((previous) => new Set(previous).add(questionId));
    // Preserve the one-pass exam flow even if the remote stem cannot load.
    setPlayedQuestionAudioIds((previous) => new Set(previous).add(questionId));
    persistQuestionAudio(questionId);
    beginQuestionCountdown(questionId);
  }

  const resetQuestionPacing = useCallback(() => {
    setActiveQuestionAudioId(null);
    setCountdownQuestionId(null);
    setCountdownSec(8);
  }, []);

  /** On navigation, drop the active group unless the next question shares it. */
  const syncActiveGroupOnNavigate = useCallback((nextGroupKey: string) => {
    setActiveAudioGroup((current) => (current === nextGroupKey ? current : null));
  }, []);

  const clearActiveAudioGroup = useCallback(() => {
    setActiveAudioGroup(null);
  }, []);

  /** Reset all pacing state for a fresh test run. */
  const resetForStart = useCallback(() => {
    setFailedAudioGroups(new Set());
    setPlayedGroups(new Set());
    setActiveAudioGroup(null);
    setPlayedQuestionAudioIds(new Set());
    setFailedQuestionAudioIds(new Set());
    resetQuestionPacing();
  }, [resetQuestionPacing]);

  /** Restore consumed-audio state when resuming a persisted session. */
  const hydrateFromSession = useCallback(
    (options: { playedAudioGroups?: string[]; playedQuestionAudioIds?: string[] }) => {
      setPlayedGroups(new Set(options.playedAudioGroups ?? []));
      setPlayedQuestionAudioIds(new Set(options.playedQuestionAudioIds ?? []));
      setActiveAudioGroup(null);
      resetQuestionPacing();
    },
    [resetQuestionPacing],
  );

  // A Part 3 stem that began playing is consumed. If the conversation and the
  // stem are both done (not active), start the answering countdown.
  useEffect(() => {
    if (!isTesting || !isListeningActive) return;
    const question = questions[currentIndex];
    if (!question || question.part !== "Part 3" || !getQuestionAudioUrl(question)) return;
    const groupKey = audioGroupKey(question);
    if (
      playedGroups.has(groupKey) &&
      activeAudioGroup !== groupKey &&
      playedQuestionAudioIds.has(question.id) &&
      activeQuestionAudioId !== question.id &&
      countdownQuestionId !== question.id
    ) {
      const id = window.setTimeout(() => {
        setCountdownQuestionId(question.id);
        setCountdownSec(8);
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, [
    activeAudioGroup,
    activeQuestionAudioId,
    countdownQuestionId,
    currentIndex,
    isListeningActive,
    isTesting,
    playedGroups,
    playedQuestionAudioIds,
    questions,
  ]);

  useEffect(() => {
    if (!isTesting || !isListeningActive || countdownQuestionId === null) return;
    const question = questions[currentIndex];
    if (!question || question.id !== countdownQuestionId) return;
    const id = window.setTimeout(() => {
      if (countdownSec > 1) {
        setCountdownSec((previous) => previous - 1);
        return;
      }
      resetQuestionPacing();
      onCountdownAdvance();
    }, 1000);
    return () => window.clearTimeout(id);
  }, [
    countdownQuestionId,
    countdownSec,
    currentIndex,
    isListeningActive,
    isTesting,
    onCountdownAdvance,
    questions,
    resetQuestionPacing,
  ]);

  return {
    failedAudioGroups,
    playedGroups,
    activeAudioGroup,
    playedQuestionAudioIds,
    failedQuestionAudioIds,
    activeQuestionAudioId,
    countdownQuestionId,
    countdownSec,
    handleAudioStarted,
    handleAudioEnded,
    markAudioGroupFailed,
    handleQuestionAudioStarted,
    beginQuestionCountdown,
    handleQuestionAudioError,
    resetQuestionPacing,
    syncActiveGroupOnNavigate,
    clearActiveAudioGroup,
    resetForStart,
    hydrateFromSession,
  };
}
