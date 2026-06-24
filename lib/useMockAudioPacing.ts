import { useCallback, useEffect, useMemo, useState } from "react";
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
 * Per-part answering countdown after the audio finishes, mirroring the real
 * exam's pacing (ETS allows ~5 seconds after each P1/P2 item and ~8 seconds
 * per P3/P4 question). Self-paced listening lets students take unrealistic
 * thinking time, which inflates listening mock scores.
 */
const COUNTDOWN_SECONDS: Record<string, number> = {
  "Part 1": 5,
  "Part 2": 5,
  "Part 3": 8,
  "Part 4": 8,
};

function countdownSecondsFor(part: string): number {
  return COUNTDOWN_SECONDS[part] ?? 8;
}

/** Parts whose countdown starts right after the (shared) audio ends. */
const AUTO_COUNTDOWN_PARTS = new Set(["Part 1", "Part 2", "Part 4"]);

/**
 * Shared listening audio "no replay" + listening pacing state machine for the
 * mock runners. Owns which audio groups / question stems have been consumed,
 * which are actively playing, and the per-question answering countdown.
 *
 * Pacing model (real-exam style):
 * - Part 1/2: item audio plays → fixed countdown → auto-advance.
 * - Part 3: conversation plays → question-stem narration → countdown → advance.
 * - Part 4: talk plays once for the group → countdown per question → advance.
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
  // Questions whose countdown already elapsed once — never restart it, so
  // navigating back to an answered question doesn't yank the user forward.
  const [completedCountdownIds, setCompletedCountdownIds] = useState<Set<string>>(
    new Set(),
  );

  const handleAudioStarted = useCallback((groupKey: string) => {
    setActiveAudioGroup(groupKey);
    setPlayedGroups((previous) => {
      if (previous.has(groupKey)) return previous;
      const next = new Set(previous);
      next.add(groupKey);
      return next;
    });
    persistAudioGroup(groupKey);
  }, [persistAudioGroup]);

  const handleAudioEnded = useCallback((groupKey: string) => {
    setActiveAudioGroup((current) => (current === groupKey ? null : current));
  }, []);

  const markAudioGroupFailed = useCallback((groupKey: string) => {
    setFailedAudioGroups((groups) => new Set(groups).add(groupKey));
  }, []);

  const handleQuestionAudioStarted = useCallback((questionId: string) => {
    setActiveQuestionAudioId(questionId);
    setPlayedQuestionAudioIds((previous) => {
      if (previous.has(questionId)) return previous;
      const next = new Set(previous);
      next.add(questionId);
      return next;
    });
    persistQuestionAudio(questionId);
  }, [persistQuestionAudio]);

  const beginQuestionCountdown = useCallback((questionId: string) => {
    setActiveQuestionAudioId((current) => (current === questionId ? null : current));
    setCountdownQuestionId(questionId);
    setCountdownSec(8);
  }, []);

  const handleQuestionAudioError = useCallback((questionId: string) => {
    setFailedQuestionAudioIds((previous) => new Set(previous).add(questionId));
    // Preserve the one-pass exam flow even if the remote stem cannot load.
    setPlayedQuestionAudioIds((previous) => new Set(previous).add(questionId));
    persistQuestionAudio(questionId);
    beginQuestionCountdown(questionId);
  }, [beginQuestionCountdown, persistQuestionAudio]);

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

  const clearListeningPacing = useCallback(() => {
    setActiveAudioGroup(null);
    resetQuestionPacing();
  }, [resetQuestionPacing]);

  /** Reset all pacing state for a fresh test run. */
  const resetForStart = useCallback(() => {
    setFailedAudioGroups(new Set());
    setPlayedGroups(new Set());
    setActiveAudioGroup(null);
    setPlayedQuestionAudioIds(new Set());
    setFailedQuestionAudioIds(new Set());
    setCompletedCountdownIds(new Set());
    resetQuestionPacing();
  }, [resetQuestionPacing]);

  /** Restore consumed-audio state when resuming a persisted session. */
  const hydrateFromSession = useCallback(
    (options: { playedAudioGroups?: string[]; playedQuestionAudioIds?: string[] }) => {
      setPlayedGroups(new Set(options.playedAudioGroups ?? []));
      setPlayedQuestionAudioIds(new Set(options.playedQuestionAudioIds ?? []));
      setActiveAudioGroup(null);
      setCompletedCountdownIds(new Set());
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
      countdownQuestionId !== question.id &&
      !completedCountdownIds.has(question.id)
    ) {
      const id = window.setTimeout(() => {
        setCountdownQuestionId(question.id);
        setCountdownSec(countdownSecondsFor(question.part));
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, [
    activeAudioGroup,
    activeQuestionAudioId,
    completedCountdownIds,
    countdownQuestionId,
    currentIndex,
    isListeningActive,
    isTesting,
    playedGroups,
    playedQuestionAudioIds,
    questions,
  ]);

  // Real-exam pacing for Part 1/2/4: once the (shared) audio for the current
  // question has finished, a fixed answering countdown starts and the test
  // auto-advances. Audio that failed to load never forces a countdown — the
  // student self-paces instead of being rushed past a question they never heard.
  useEffect(() => {
    if (!isTesting || !isListeningActive) return;
    const question = questions[currentIndex];
    if (!question || !AUTO_COUNTDOWN_PARTS.has(question.part)) return;
    const groupKey = audioGroupKey(question);
    if (
      playedGroups.has(groupKey) &&
      activeAudioGroup !== groupKey &&
      !failedAudioGroups.has(groupKey) &&
      countdownQuestionId !== question.id &&
      !completedCountdownIds.has(question.id)
    ) {
      const id = window.setTimeout(() => {
        setCountdownQuestionId(question.id);
        setCountdownSec(countdownSecondsFor(question.part));
      }, 0);
      return () => window.clearTimeout(id);
    }
  }, [
    activeAudioGroup,
    completedCountdownIds,
    countdownQuestionId,
    currentIndex,
    failedAudioGroups,
    isListeningActive,
    isTesting,
    playedGroups,
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
      setCompletedCountdownIds((previous) => {
        if (previous.has(question.id)) return previous;
        const next = new Set(previous);
        next.add(question.id);
        return next;
      });
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

  return useMemo(
    () => ({
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
      clearListeningPacing,
      resetForStart,
      hydrateFromSession,
    }),
    [
      activeAudioGroup,
      activeQuestionAudioId,
      beginQuestionCountdown,
      clearActiveAudioGroup,
      clearListeningPacing,
      countdownQuestionId,
      countdownSec,
      failedAudioGroups,
      failedQuestionAudioIds,
      handleAudioEnded,
      handleAudioStarted,
      handleQuestionAudioError,
      handleQuestionAudioStarted,
      hydrateFromSession,
      markAudioGroupFailed,
      playedGroups,
      playedQuestionAudioIds,
      resetForStart,
      resetQuestionPacing,
      syncActiveGroupOnNavigate,
    ],
  );
}
