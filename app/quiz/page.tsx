"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import MistakeReasonChips from "@/components/quiz/MistakeReasonChips";
import QuestionVocabulary from "@/components/quiz/QuestionVocabulary";
import BankLoadError from "@/components/BankLoadError";
import {
  ensureQuestionBankLoaded,
  loadQuestionBank,
  questionBank,
} from "@/lib/questionBank";
import { getAudioOwnerQuestion, getListeningGroupKey } from "@/lib/audioOwner";
import {
  clearWrongPracticePlan,
  getAnswerRecords,
  getEvidenceRecords,
  getMockSeenQuestionIds,
  getQuizPlan,
  getReviewableIds,
  markQuizPlanListeningGroupAutoPlayed,
  saveAnswer,
  saveDailyPlan,
  saveQuizPlan,
  updateLatestReason,
} from "@/lib/storage";
import {
  getNextDayListeningMix,
  getWeakestSkills,
  inferMistakeReason,
} from "@/lib/analysis";
import { getAudioUrl, getImageUrl, getQuestionAudioUrl, hasMediaSupport } from "@/lib/media";
import { createStudyClock } from "@/lib/studyClock";
import { studyGroupTiming } from "@/lib/pacing";
import { getGroupPosition } from "@/lib/mockShared";
import {
  bumpWordsToDueByWords,
  findVocabularyCardForTerm,
  getVocabularyProgress,
  loadVocabularyBank,
} from "@/lib/vocabularyStorage";
import type {
  AnswerRecord,
  AnswerTiming,
  AttemptInfo,
  Choice,
  MistakeReason,
  Part,
  Question,
} from "@/types/question";
import { SKILL_LABELS, getPartSection } from "@/types/question";
import type { QuizPlanSource } from "@/lib/storage";
import { DEFAULT_STUDY_MINUTES, getStudyProfile, type StudyMinutes } from "@/lib/studyProfile";
import { buildStudySegments } from "@/lib/studySegments";

type Status =
  | "loading"
  | "answering"
  | "answered"
  | "finished"
  | "no-plan"
  | "load-error";

const CHOICES: Choice[] = ["A", "B", "C", "D"];

function latestPlanRecord(
  records: AnswerRecord[],
  questionId: string,
  planCreatedAt: string,
): AnswerRecord | null {
  const createdAtMs = new Date(planCreatedAt).getTime();
  let latest: AnswerRecord | null = null;
  for (const record of records) {
    if (record.questionId !== questionId) continue;
    if (new Date(record.answeredAt).getTime() < createdAtMs) continue;
    if (!latest || record.answeredAt > latest.answeredAt) latest = record;
  }
  return latest;
}

function calculatePlanSessionStats(
  records: AnswerRecord[],
  questionIds: string[],
  planCreatedAt: string,
): { correct: number; total: number } {
  const latestByQuestion = questionIds.flatMap((questionId) => {
    const record = latestPlanRecord(records, questionId, planCreatedAt);
    return record ? [record] : [];
  });
  return {
    correct: latestByQuestion.filter((record) => record.isCorrect).length,
    total: latestByQuestion.length,
  };
}

/**
 * What the `passage` block actually holds depends on the part: prose for the
 * reading parts, but for Part 3/4 it is the printed graphic — a timetable or
 * price list the learner reads against the audio, the way the real exam prints
 * one. Labelling that "Reading Passage" would be actively misleading.
 */
function passageLabel(part: Part): string {
  if (part === "Part 6") return "段落填空";
  if (part === "Part 3" || part === "Part 4") return "圖表";
  return "Reading Passage";
}

/**
 * Column-aligned tables only survive in a monospaced face, and they must scroll
 * rather than wrap: the widest graphic runs about 51 characters, which wraps on
 * a phone and destroys the alignment the columns depend on.
 */
function isGraphicPart(part: Part): boolean {
  return part === "Part 3" || part === "Part 4";
}

export default function QuizPage() {
  const router = useRouter();
  const [studyMinutes, setStudyMinutes] = useState<StudyMinutes>(DEFAULT_STUDY_MINUTES);
  const [status, setStatus] = useState<Status>("loading");
  const [planIds, setPlanIds] = useState<string[]>([]);
  const [planCreatedAt, setPlanCreatedAt] = useState<string | null>(null);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [submittedChoice, setSubmittedChoice] = useState<Choice | null>(null);
  const [inferredReason, setInferredReason] = useState<MistakeReason | null>(null);
  const [selectedReason, setSelectedReason] = useState<MistakeReason | null>(null);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [saveError, setSaveError] = useState<string | null>(null);
  const [failedAudioIds, setFailedAudioIds] = useState<Set<string>>(new Set());
  const [failedQuestionAudioIds, setFailedQuestionAudioIds] = useState<Set<string>>(new Set());
  const [autoPlayedListeningGroups, setAutoPlayedListeningGroups] = useState<Set<string>>(
    new Set(),
  );
  // The GROUP whose shared conversation/talk is currently audible — not the
  // question that started it. One <audio> serves every question in a Part 3/4
  // group and keeps playing across question changes (same src ⇒ same element),
  // so tracking the starting question id made the next question in the group
  // look silent and auto-play its stem narration over the conversation.
  const [activeAutoConversationGroup, setActiveAutoConversationGroup] = useState<
    string | null
  >(null);
  // False when the vocabulary chunk failed to load: weak-word inference and
  // the question-vocabulary panel degrade instead of blocking the quiz.
  const [vocabAvailable, setVocabAvailable] = useState(true);
  const startingFreshPlan = useRef(false);
  const submittedQuestionIds = useRef(new Set<string>());
  const questionStartTime = useRef<number>(0);
  const studyClock = useRef(createStudyClock());
  const timingSessionId = useRef<string>("");
  const [planSource, setPlanSource] = useState<QuizPlanSource>("daily");
  const [planKind, setPlanKind] = useState<AttemptInfo["plan"]>("daily");
  const [focusNote, setFocusNote] = useState<string | null>(null);

  function resetQuestionClock() {
    questionStartTime.current = Date.now();
    studyClock.current.start(performance.now(), document.hidden);
    timingSessionId.current ||= crypto.randomUUID();
  }

  useEffect(() => {
    const clock = studyClock.current;
    function onVisibilityChange() {
      clock.setHidden(document.hidden, performance.now());
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  function buildIsWeakWord(questionId: string): (word: string) => boolean {
    if (!vocabAvailable) return () => false;
    const statusByWordId = new Map(
      getVocabularyProgress().map((progress) => [progress.wordId, progress.status]),
    );
    // Only a word the learner has STUDIED and not yet secured is a vocabulary
    // signal. A word with no record is unknown, not weak: on a cold start the
    // old rule suggested 不會單字 on two thirds of the bank (review F08).
    return (word) => {
      const item = findVocabularyCardForTerm(word, questionId);
      if (!item) return false;
      const status = statusByWordId.get(item.id);
      return status === "new" || status === "seen";
    };
  }

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      // The question bank is load-bearing (plan questions). The vocabulary
      // bank only powers weak-word inference and the question-vocabulary
      // panel, so its failure degrades those features instead of blocking
      // the quiz — and must not be reported as a question-bank failure.
      const [questionResult, vocabularyResult] = await Promise.allSettled([
        loadQuestionBank(),
        loadVocabularyBank(),
      ]);
      if (cancelled) return;
      if (questionResult.status === "rejected") {
        console.error(
          "[quiz] failed to load question bank:",
          questionResult.reason,
        );
        setStatus("load-error");
        return;
      }
      if (vocabularyResult.status === "rejected") {
        console.error(
          "[quiz] failed to load vocabulary bank:",
          vocabularyResult.reason,
        );
        setVocabAvailable(false);
      }
      const quizPlan = getQuizPlan();
      if (!quizPlan || quizPlan.plan.questionIds.length === 0) {
        setStatus("no-plan");
        return;
      }
      const { source } = quizPlan;
      setStudyMinutes(getStudyProfile()?.dailyMinutes ?? DEFAULT_STUDY_MINUTES);
      let { plan } = quizPlan;
      const records = getAnswerRecords();

      // Legacy/interrupted feedback repair: older versions saved the answer
      // before advancing the cursor. If that record exists inside this plan,
      // rebuild the pending feedback state instead of submitting it twice.
      if (!plan.pendingFeedback && plan.cursor < plan.questionIds.length) {
        const questionId = plan.questionIds[plan.cursor];
        const existing = questionId
          ? latestPlanRecord(records, questionId, plan.createdAt)
          : null;
        if (existing) {
          plan = {
            ...plan,
            cursor: plan.cursor + 1,
            pendingFeedback: {
              questionId: existing.questionId,
              userAnswer: existing.userAnswer,
            },
          };
          saveQuizPlan(plan, source);
        }
      }

      setPlanSource(source);
      setPlanKind(
        source === "wrongbook"
          ? plan.kind === "grammar-variant"
            ? "grammar-variant"
            : "wrongbook"
          : "daily",
      );
      setPlanIds(plan.questionIds);
      setPlanCreatedAt(plan.createdAt);
      setFocusNote(source === "daily" ? (plan.focusNote ?? null) : null);
      setSessionStats(
        calculatePlanSessionStats(records, plan.questionIds, plan.createdAt),
      );
      setAutoPlayedListeningGroups(new Set(plan.autoPlayedListeningGroups ?? []));

      if (plan.pendingFeedback) {
        const feedbackCursor = plan.cursor - 1;
        const record = latestPlanRecord(
          records,
          plan.pendingFeedback.questionId,
          plan.createdAt,
        );
        setCursor(feedbackCursor);
        setSelected(plan.pendingFeedback.userAnswer);
        setSubmittedChoice(plan.pendingFeedback.userAnswer);
        submittedQuestionIds.current.add(plan.pendingFeedback.questionId);
        if (record?.mistakeReason && !record.isCorrect) {
          if (record.reasonSource === "user") {
            setSelectedReason(record.mistakeReason);
          } else {
            setInferredReason(record.mistakeReason);
          }
        }
        questionStartTime.current = 0;
        setStatus("answered");
      } else if (plan.cursor >= plan.questionIds.length) {
        setCursor(plan.cursor);
        setStatus("finished");
      } else {
        setCursor(plan.cursor);
        resetQuestionClock();
        setStatus("answering");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Start timer whenever a new question is presented
  useEffect(() => {
    if (status === "answering" && questionStartTime.current === 0) {
      resetQuestionClock();
    }
  }, [status, cursor]);

  // planIds is only non-empty after the init effect awaited the bank load, so
  // questionBank() is safe to call whenever these memos do real work.
  const currentQuestion: Question | undefined = useMemo(() => {
    if (planIds.length === 0) return undefined;
    const id = planIds[cursor];
    return id ? questionBank().getQuestionById(id) : undefined;
  }, [planIds, cursor]);

  const planQuestions = useMemo(
    () =>
      planIds
        .map((id) => questionBank().getQuestionById(id))
        .filter((question): question is Question => Boolean(question)),
    [planIds],
  );

  const studySegments = useMemo(
    () => buildStudySegments(planQuestions, studyMinutes),
    [planQuestions, studyMinutes],
  );
  const segmentIndex = studySegments.findIndex((segment) => cursor >= segment.start && cursor < segment.end);
  const currentSegment = studySegments[segmentIndex];
  const atStudyBreak = status === "answered" && currentSegment &&
    cursor + 1 === currentSegment.end && currentSegment.end < planIds.length;

  function markListeningGroupAutoPlayed(groupKey: string) {
    setAutoPlayedListeningGroups((groups) => {
      if (groups.has(groupKey)) return groups;
      const next = new Set(groups);
      next.add(groupKey);
      return next;
    });
    markQuizPlanListeningGroupAutoPlayed(groupKey, planSource);
  }

  function handleGroupedAudioStarted(questionId: string, groupKey: string) {
    setFailedAudioIds((ids) => {
      if (!ids.has(questionId)) return ids;
      const next = new Set(ids);
      next.delete(questionId);
      return next;
    });
    setActiveAutoConversationGroup(groupKey);
    markListeningGroupAutoPlayed(groupKey);
  }

  function handleGroupedAudioSettled(questionId: string, groupKey: string) {
    markListeningGroupAutoPlayed(groupKey);
    setActiveAutoConversationGroup((activeGroup) =>
      activeGroup === groupKey ? null : activeGroup,
    );
  }

  function handleGroupedAudioError(questionId: string, groupKey: string) {
    setFailedAudioIds((ids) => new Set(ids).add(questionId));
    handleGroupedAudioSettled(questionId, groupKey);
  }

  function handleSubmit() {
    if (
      status !== "answering" ||
      !selected ||
      !currentQuestion ||
      submittedQuestionIds.current.has(currentQuestion.id)
    ) {
      return;
    }
    submittedQuestionIds.current.add(currentQuestion.id);
    setSaveError(null);
    const submittedAt = performance.now();
    const elapsed = studyClock.current.snapshot(submittedAt);
    const responseTimeMs = elapsed.wallMs;
    const isCorrect = selected === currentQuestion.answer;
    const timing: AnswerTiming = {
      version: 2, activeMs: elapsed.activeMs, hiddenMs: elapsed.hiddenMs,
      ...(getPartSection(currentQuestion.part) === "listening" ? { audioMs: elapsed.audioMs } : {}),
      ...studyGroupTiming(currentQuestion, questionBank().getQuestionsByPart(currentQuestion.part), planQuestions),
      sessionId: timingSessionId.current,
    };
    const attempt: AttemptInfo = {
      first: !getEvidenceRecords().some((record) => record.questionId === currentQuestion.id) &&
        !getMockSeenQuestionIds().has(currentQuestion.id) && planKind !== "wrongbook",
      plan: planKind,
    };

    const answerSaved = saveAnswer({
      questionId: currentQuestion.id,
      userAnswer: selected,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      skill_tag: currentQuestion.skill_tag,
      answeredAt: new Date().toISOString(),
      responseTimeMs,
      source: "daily",
      timing,
      attempt,
    });
    if (!answerSaved) {
      submittedQuestionIds.current.delete(currentQuestion.id);
      setSaveError("答案尚未儲存，請確認瀏覽器儲存空間後再試一次。");
      return;
    }
    studyClock.current.finish(submittedAt);

    const quizPlan = getQuizPlan();
    if (
      quizPlan &&
      !saveQuizPlan(
        {
          ...quizPlan.plan,
          cursor: cursor + 1,
          pendingFeedback: {
            questionId: currentQuestion.id,
            userAnswer: selected,
          },
        },
        quizPlan.source,
      )
    ) {
      setSaveError("答案已儲存，但進度暫時無法寫入；重新開啟時會自動修復。");
    }
    if (!isCorrect) {
      const isWeakWord = buildIsWeakWord(currentQuestion.id);
      const inferred = inferMistakeReason(
        { part: currentQuestion.part, vocabulary: currentQuestion.vocabulary },
        { isCorrect: false, responseTimeMs, timing },
        isWeakWord,
      );
      setInferredReason(inferred);
      setSelectedReason(null);
    } else {
      setInferredReason(null);
      setSelectedReason(null);
    }
    setSubmittedChoice(selected);
    setSessionStats((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setStatus("answered");
  }

  function nextListeningGroupKey(questionId: string | undefined): string | null {
    if (!questionId) return null;
    const question = questionBank().getQuestionById(questionId);
    return question ? getListeningGroupKey(question) : null;
  }

  function handleNext(pause = false) {
    if (status !== "answered") return;
    const quizPlan = getQuizPlan();
    const nextCursor =
      quizPlan && quizPlan.plan.pendingFeedback?.questionId === currentQuestion?.id
        ? quizPlan.plan.cursor
        : cursor + 1;
    if (!quizPlan || quizPlan.plan.createdAt !== planCreatedAt ||
      !saveQuizPlan(
        { ...quizPlan.plan, cursor: nextCursor, pendingFeedback: undefined },
        quizPlan.source
      )) {
      setSaveError("暫時無法儲存接續位置，請再試一次；目前答案已保留。");
      return;
    }
    if (pause) {
      router.push("/");
      return;
    }
    setCursor(nextCursor);
    setSelected(null);
    setSubmittedChoice(null);
    setInferredReason(null);
    setSelectedReason(null);
    setSaveError(null);
    // Leaving a group unmounts its <audio>, which stops it; staying inside the
    // group keeps the same element playing, so the flag must survive. Mirrors
    // syncActiveGroupOnNavigate in the mock runners.
    const nextGroupKey = nextListeningGroupKey(planIds[nextCursor]);
    setActiveAutoConversationGroup((activeGroup) =>
      activeGroup !== null && activeGroup === nextGroupKey ? activeGroup : null,
    );
    questionStartTime.current = 0;

    if (nextCursor >= planIds.length) {
      if (planSource === "wrongbook") {
        clearWrongPracticePlan();
      }
      setStatus("finished");
    } else {
      resetQuestionClock();
      setStatus("answering");
    }
  }

  function getRecordedSessionStats(): { correct: number; total: number } {
    if (!planCreatedAt || planIds.length === 0) return sessionStats;
    const restored = calculatePlanSessionStats(
      getAnswerRecords(),
      planIds,
      planCreatedAt,
    );
    return restored.total === 0 ? sessionStats : restored;
  }

  async function startFreshPlan() {
    if (startingFreshPlan.current) return;
    startingFreshPlan.current = true;
    try {
      // Ensure the bank BEFORE clearing anything: a failed chunk load must
      // not destroy the finished plan and leave the button silently dead.
      if (!(await ensureQuestionBankLoaded())) return;
      const reviewIds = getReviewableIds().slice(0, 3);
      const records = getAnswerRecords();
      const evidence = getEvidenceRecords();
      const weakSkillTags = getWeakestSkills(evidence, 2, 5).map((w) => w.skill);
      const mix = getNextDayListeningMix(evidence);
      const plan = questionBank().buildDailyPlan({
        reviewIds,
        weakSkillTags,
        focusSkills: getWeakestSkills(evidence, 2).map((w) => w.skill),
        part1Count: mix.part1Count,
        part2Count: mix.part2Count,
        part3GroupCount: mix.part3GroupCount,
        part4GroupCount: mix.part4GroupCount,
        answeredIds: new Set([...records.map((r) => r.questionId), ...getMockSeenQuestionIds()]),
      });
      const saved = saveDailyPlan({
        questionIds: plan.questions.map((q) => q.id),
        createdAt: new Date().toISOString(),
        cursor: 0,
        focusNote: plan.focus.note,
      });
      if (!saved) {
        setSaveError("新課表尚未儲存，請確認瀏覽器儲存空間後重試。");
        return;
      }
      clearWrongPracticePlan();
      router.push("/practice");
    } catch (error) {
      console.error("[quiz] failed to start fresh plan:", error);
      setSaveError("暫時無法建立新課表，請稍後重試。");
    } finally {
      startingFreshPlan.current = false;
    }
  }

  function handleReasonSelect(reason: MistakeReason) {
    if (!currentQuestion) return;
    setSelectedReason(reason);
    updateLatestReason(currentQuestion.id, reason, "user");
    if (reason === "vocab" && vocabAvailable) {
      bumpWordsToDueByWords(currentQuestion.vocabulary ?? [], currentQuestion.id);
    }
  }

  if (status === "loading") {
    return (
      <section className="py-10 text-center" aria-live="polite">
        <h1 className="sr-only">今日訓練</h1>
        <p className="text-slate-500">正在載入訓練…</p>
      </section>
    );
  }

  if (status === "load-error") {
    return <BankLoadError bankLabel="題庫" />;
  }

  if (status === "no-plan") {
    return (
      <div className="space-y-4 py-6 text-center">
        <h1 className="text-xl font-bold text-slate-900">目前沒有訓練計畫</h1>
        <p className="text-sm text-slate-600">先建立今天的自適應處方，再開始作答。</p>
        <Link
          href="/practice"
          className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          前往今日訓練
        </Link>
      </div>
    );
  }

  if (status === "finished") {
    const recordedStats = getRecordedSessionStats();
    const accuracy =
      recordedStats.total === 0
        ? 0
        : Math.round((recordedStats.correct / recordedStats.total) * 100);
    return (
      <div className="space-y-5 py-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-md">
          <h1 className="text-lg font-bold">{planSource === "wrongbook" ? "這回合複習完成" : "今日訓練完成"}</h1>
          <p className="mt-2 text-3xl font-bold">{accuracy}%</p>
          <p className="mt-1 text-sm text-emerald-50">
            答對 {recordedStats.correct} / {recordedStats.total} 題
          </p>
        </div>
        {saveError && <p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{saveError}</p>}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white"
          >
            查看今日報告
          </Link>
          <Link
            href="/wrongbook"
            className="block w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center text-base font-semibold text-slate-700"
          >
            檢視錯題本
          </Link>
          <button
            onClick={() => {
              void startFreshPlan();
            }}
            className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm text-slate-600"
          >
            再做一輪
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="space-y-4 py-6 text-center">
        <h1 className="text-xl font-bold text-slate-900">找不到題目資料</h1>
        <p className="text-sm text-slate-600">這份計畫可能已過期，請重新建立今日處方。</p>
        <Link
          href="/practice"
          className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          重新開始
        </Link>
      </div>
    );
  }

  const total = planIds.length;
  const progress = ((cursor + (status === "answered" ? 1 : 0)) / total) * 100;
  const isAnswered = status === "answered";
  const isCorrect = submittedChoice === currentQuestion.answer;
  const visibleChoices: Choice[] =
    currentQuestion.choices.D === undefined ? ["A", "B", "C"] : CHOICES;
  const questionText =
    currentQuestion.question.trim() || "請聽音檔後選擇答案";
  const imageUrl = getImageUrl(currentQuestion);
  // P3/P4 group: audio lives on canonical (smallest-id) member only.
  const audioUrl = getAudioUrl(getAudioOwnerQuestion(currentQuestion));
  const questionAudioUrl = getQuestionAudioUrl(currentQuestion);
  const mediaSupport = hasMediaSupport(currentQuestion);
  const audioFailed = failedAudioIds.has(currentQuestion.id);
  const questionAudioFailed = failedQuestionAudioIds.has(currentQuestion.id);
  const audioFallbackText = currentQuestion.audioScript ?? null;
  const listeningGroupKey = getListeningGroupKey(currentQuestion);
  const isGroupedListeningQuestion = listeningGroupKey !== null;
  const groupPosition = getGroupPosition(planQuestions, currentQuestion);
  const groupAutoPlayed =
    listeningGroupKey !== null && autoPlayedListeningGroups.has(listeningGroupKey);
  const groupedAudioIsPlaying =
    listeningGroupKey !== null && activeAutoConversationGroup === listeningGroupKey;
  const groupReplayLabel =
    currentQuestion.part === "Part 3" ? "重播本組對話" : "重播本組獨白";
  const showP3QuestionAudio =
    currentQuestion.part === "Part 3" &&
    questionAudioUrl !== null &&
    groupAutoPlayed &&
    !groupedAudioIsPlaying;

  // For Part 1/2, the on-screen `question` text and `choices` text ARE the
  // spoken audio (P1 = the four photo statements, P2 = the question + three
  // responses). Showing them during answering lets the student read instead
  // of listen, which defeats the whole point. Hide while answering, reveal
  // once the answer is submitted (the post-answer panel already does that).
  const isListeningP1or2 =
    currentQuestion.part === "Part 1" || currentQuestion.part === "Part 2";
  const hideListeningText = isListeningP1or2 && !isAnswered;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-2">
        <div>
          <p className="text-xs font-black text-[var(--ink)]">{planSource === "wrongbook" ? "錯題複習" : "今日訓練"}{currentSegment ? ` · 第 ${segmentIndex + 1} / ${studySegments.length} 段` : ""}</p>
          <p className="mt-1 text-[11px] text-[var(--muted)]">{currentSegment ? `本段 ${currentSegment.end - currentSegment.start} 題 · 預估 ${currentSegment.estimatedMinutes} 分鐘` : "每題送出後保存進度"}</p>
        </div>
        <Link href="/" title="已送出的答案與解析會保留，未送出的選項不計入紀錄" className="inline-flex min-h-11 shrink-0 items-center rounded-xl bg-[var(--canvas)] px-3 text-xs font-bold text-[var(--ink)]">暫停，回首頁</Link>
      </div>
      {focusNote && (
        <p className="rounded-xl bg-[var(--canvas)] px-4 py-2 text-[11px] leading-5 text-[var(--muted)]">
          選題理由：{focusNote}
        </p>
      )}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span aria-label={`第 ${cursor + 1} 題，共 ${total} 題`}>
            {cursor + 1} / {total}
          </span>
          <span aria-label={`已答對 ${sessionStats.correct} 題，共 ${sessionStats.total} 題`}>
            正確 {sessionStats.correct} / {sessionStats.total}
          </span>
        </div>
        <div
          className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`答題進度 ${Math.round(progress)}%`}
        >
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {saveError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
        >
          {saveError}
        </div>
      )}

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {currentQuestion.part}
            {groupPosition ? ` · 題組 ${groupPosition.index}/${groupPosition.total}` : ""}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {SKILL_LABELS[currentQuestion.skill_tag]}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {currentQuestion.difficulty}
          </span>
        </div>
      </div>

      {imageUrl && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={imageUrl}
            alt={currentQuestion.imageAlt ?? "TOEIC listening question image"}
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {isGroupedListeningQuestion && listeningGroupKey && audioUrl ? (
        <div className="space-y-2">
          {groupAutoPlayed && !groupedAudioIsPlaying && (
            <p className="text-sm font-medium text-slate-700">🔁 {groupReplayLabel}</p>
          )}
          <AudioPlayer
            key={audioUrl}
            src={audioUrl}
            onPlaybackChange={(playing) => studyClock.current.setAudioPlaying(audioUrl, playing, performance.now())}
            autoPlay={!groupAutoPlayed}
            allowReplay={groupAutoPlayed || audioFailed}
            onPlaybackStart={() =>
              handleGroupedAudioStarted(currentQuestion.id, listeningGroupKey)
            }
            onEnded={() =>
              handleGroupedAudioSettled(currentQuestion.id, listeningGroupKey)
            }
            onError={() =>
              handleGroupedAudioError(currentQuestion.id, listeningGroupKey)
            }
          />
          {audioFailed && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              音檔載入失敗，可按重試播放；你仍可繼續作答。
            </p>
          )}
        </div>
      ) : audioUrl && !audioFailed ? (
        <AudioPlayer
          key={audioUrl}
          src={audioUrl}
          onPlaybackChange={(playing) => studyClock.current.setAudioPlaying(audioUrl, playing, performance.now())}
          autoPlay
          onError={() =>
            setFailedAudioIds((ids) => new Set(ids).add(currentQuestion.id))
          }
        />
      ) : mediaSupport.audio ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 shadow-sm">
          <p className="text-sm font-semibold text-sky-800">音檔尚未就緒</p>
          {/* Only show fallback transcript when not hiding for listening,
              so the script doesn't leak before the student has answered. */}
          {audioFallbackText && !hideListeningText && (
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {audioFallbackText}
            </p>
          )}
        </div>
      ) : null}

      {showP3QuestionAudio && (
        <div className="space-y-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Part 3 · 題目朗讀
          </p>
          <AudioPlayer
            key={questionAudioUrl}
            src={questionAudioUrl}
            onPlaybackChange={(playing) => studyClock.current.setAudioPlaying(questionAudioUrl, playing, performance.now())}
            autoPlay
            allowReplay
            onPlaybackStart={() =>
              setFailedQuestionAudioIds((ids) => {
                if (!ids.has(currentQuestion.id)) return ids;
                const next = new Set(ids);
                next.delete(currentQuestion.id);
                return next;
              })
            }
            onError={() =>
              setFailedQuestionAudioIds((ids) => new Set(ids).add(currentQuestion.id))
            }
          />
          {questionAudioFailed && (
            <p className="text-xs text-rose-700">
              題目朗讀音檔載入失敗；不影響作答，可按重試再次播放。
            </p>
          )}
        </div>
      )}

      {currentQuestion.passage && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            {currentQuestion.part} · {passageLabel(currentQuestion.part)}
          </p>
          <p
            className={`text-sm leading-relaxed text-slate-800 ${
              isGraphicPart(currentQuestion.part)
                ? "overflow-x-auto whitespace-pre font-mono"
                : "whitespace-pre-wrap"
            }`}
          >
            {currentQuestion.passage}
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-base leading-relaxed text-slate-900">
          {hideListeningText ? "請依音檔內容選擇答案" : questionText}
        </p>
      </div>

      {hideListeningText ? (
        // Letter-only buttons in a grid so the student must rely on listening,
        // not reading. Per-choice audio (P2's three responses) is also hidden
        // because the main audio already plays them in sequence — playing each
        // choice on demand would let students re-hear individual responses.
        <div
          className={`grid ${visibleChoices.length === 3 ? "grid-cols-3" : "grid-cols-4"} gap-3`}
          role="radiogroup"
          aria-label="請選擇答案"
        >
          {visibleChoices.map((c) => {
            const isSelected = selected === c;
            return (
              <label
                key={c}
                className={`grid min-h-14 cursor-pointer place-items-center rounded-2xl border px-4 py-3 text-center text-base font-bold transition active:scale-[0.99] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-500 ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-white text-slate-800"
                }`}
              >
                <input
                  type="radio"
                  name={`answer-${currentQuestion.id}`}
                  value={c}
                  checked={isSelected}
                  onChange={() => setSelected(c)}
                  aria-label={`選擇答案 ${c}`}
                  className="sr-only"
                />
                <span aria-hidden="true">{c}</span>
              </label>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-2" role="radiogroup" aria-label="請選擇答案">
          {visibleChoices.map((c) => {
            const isSelected = selected === c;
            const isCorrectChoice = c === currentQuestion.answer;
            const isUserChoice = submittedChoice === c;
            const choiceAudio = currentQuestion.audioChoices?.[c];

            let classes =
              "w-full rounded-2xl border px-4 py-3 text-left text-sm transition active:scale-[0.99]";
            if (isAnswered) {
              if (isCorrectChoice) {
                classes += " border-emerald-400 bg-emerald-50 text-emerald-900";
              } else if (isUserChoice) {
                classes += " border-rose-400 bg-rose-50 text-rose-900";
              } else {
                classes += " border-slate-200 bg-white text-slate-500";
              }
            } else if (isSelected) {
              classes += " border-indigo-500 bg-indigo-50 text-indigo-900";
            } else {
              classes += " border-slate-200 bg-white text-slate-800";
            }

            return (
              <li key={c} className="space-y-2">
                {choiceAudio && (
                  <AudioPlayer key={choiceAudio} src={choiceAudio} allowReplay />
                )}
                <label
                  className={`${classes} block cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-500 ${
                    isAnswered ? "cursor-default" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`answer-${currentQuestion.id}`}
                    value={c}
                    checked={isSelected}
                    disabled={isAnswered}
                    onChange={() => setSelected(c)}
                    className="sr-only"
                  />
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                    {c}
                  </span>
                  {currentQuestion.choices[c]}
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {isAnswered && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-2xl border p-4 shadow-sm ${
            isCorrect
              ? "border-emerald-200 bg-emerald-50"
              : "border-rose-200 bg-rose-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              isCorrect ? "text-emerald-800" : "text-rose-800"
            }`}
          >
            {isCorrect ? "✅ 答對了" : "❌ 答錯了"}
            <span className="ml-2 text-xs font-normal text-slate-600">
              正確答案：{currentQuestion.answer}
            </span>
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {currentQuestion.explanation_zh}
          </p>
        </div>
      )}

      {isAnswered && !isCorrect && currentQuestion && (
        <MistakeReasonChips
          part={currentQuestion.part}
          skillTag={currentQuestion.skill_tag}
          inferredReason={inferredReason}
          selectedReason={selectedReason}
          onSelect={handleReasonSelect}
        />
      )}

      {isAnswered &&
        vocabAvailable &&
        currentQuestion.vocabulary &&
        currentQuestion.vocabulary.length > 0 && (
          <QuestionVocabulary
            key={currentQuestion.id}
            question={currentQuestion}
            defaultOpen={!isCorrect}
          />
        )}

      {/* Post-answer audio script reveal + replay (listening only).
          Prefer `transcript` (P3/P4 conversations / talks).
          Fall back to `audioScript` (P1 photo descriptions, P2 Q+A). */}
      {isAnswered &&
        (currentQuestion.transcript || currentQuestion.audioScript) && (
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                {currentQuestion.part} · {currentQuestion.transcript ? "Transcript" : "Audio Script"}
              </p>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                答完才顯示
              </span>
            </div>
            {audioUrl && (
              <div className="mb-3">
                <AudioPlayer key={`${audioUrl}-replay`} src={audioUrl} allowReplay />
              </div>
            )}
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {currentQuestion.transcript ?? currentQuestion.audioScript}
            </p>
          </div>
        )}

      {atStudyBreak && (
        <section aria-label="段落完成，可以休息" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-black text-emerald-900">第 {segmentIndex + 1} 段完成，剛好休息一下。</p>
          <p className="mt-2 text-xs leading-6 text-emerald-800">這一段的完整題組已作答。看完解析後可以先休息，剩下 {total - cursor - 1} 題會從首頁接續。</p>
          <button onClick={() => handleNext(true)} className="mt-3 min-h-11 rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white">看完了，先休息</button>
        </section>
      )}

      <div className="sticky bottom-3 z-10">
        {isAnswered ? (
          <button
            onClick={() => handleNext()}
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white shadow-md active:scale-[0.99]"
          >
            {cursor + 1 >= total ? (planSource === "wrongbook" ? "完成這回合複習" : "完成今日訓練") : atStudyBreak ? "繼續下一段 →" : "下一題 →"}
          </button>
        ) : (
          <button
            disabled={!selected}
            onClick={handleSubmit}
            className={`block w-full rounded-2xl px-5 py-4 text-center text-base font-semibold shadow-md transition active:scale-[0.99] ${
              selected
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 text-slate-400"
            }`}
          >
            送出答案
          </button>
        )}
      </div>
    </div>
  );
}
