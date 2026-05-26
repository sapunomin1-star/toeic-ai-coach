"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import {
  buildListeningMockPlan,
  buildMockTestPlan,
  getQuestionById,
} from "@/data/questions";
import {
  advanceFullMockToReading,
  clearFullMockSession,
  FULL_LISTENING_DURATION_MS,
  FULL_MOCK_DURATION_MS,
  getFullMockSession,
  markFullMockAudioGroupPlayed,
  markFullMockLeftApp,
  markFullMockQuestionAudioPlayed,
  saveFullMockAnswer,
  saveFullMockResult,
  startFullMockSession,
} from "@/lib/fullMockStorage";
import { getAudioUrl, getImageUrl, getQuestionAudioUrl, hasMediaSupport } from "@/lib/media";
import { saveAnswer as saveDailyAnswer } from "@/lib/storage";
import {
  getCEFRForSection,
  getTotalRange,
  PREDICTION_DISCLAIMER,
  rawToScaledRange,
} from "@/lib/toeicScoreEstimate";
import type {
  FullMockResult,
  FullMockSection,
  MockPartBreakdown,
  MockPartKey,
} from "@/types/mock";
import type { Choice, Question } from "@/types/question";

type Phase = "preview" | "testing" | "result";

const LISTENING_QUESTIONS = 100;
const SECTION_QUESTIONS = 100;
const ALL_PARTS: MockPartKey[] = [
  "Part 1",
  "Part 2",
  "Part 3",
  "Part 4",
  "Part 5",
  "Part 6",
  "Part 7",
];
const CHOICE_KEYS: Choice[] = ["A", "B", "C", "D"];

function defaultBreakdown(): MockPartBreakdown {
  const breakdown: MockPartBreakdown = {};
  for (const part of ALL_PARTS) breakdown[part] = { correct: 0, total: 0 };
  return breakdown;
}

function audioGroupKey(question: Question): string {
  if (
    (question.part === "Part 3" || question.part === "Part 4") &&
    question.transcript
  ) {
    return `${question.part}:${question.transcript}`;
  }
  return question.id;
}

function formatTime(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function cefrLabel(result: FullMockResult["listeningCEFR"]): string {
  return result.spans ? `約 ${result.spans.join("-")}` : result.primary;
}

export default function FullMockRunner() {
  const [phase, setPhase] = useState<Phase>("preview");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [section, setSection] = useState<FullMockSection>("listening");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Choice>>>({});
  const [listeningEndsAt, setListeningEndsAt] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [sectionRemainingMs, setSectionRemainingMs] = useState(
    FULL_LISTENING_DURATION_MS,
  );
  const [totalRemainingMs, setTotalRemainingMs] = useState(FULL_MOCK_DURATION_MS);
  const [leftAppDuringTest, setLeftAppDuringTest] = useState(false);
  const [result, setResult] = useState<FullMockResult | null>(null);
  const [failedAudioGroups, setFailedAudioGroups] = useState<Set<string>>(new Set());
  const [playedGroups, setPlayedGroups] = useState<Set<string>>(new Set());
  const [activeAudioGroup, setActiveAudioGroup] = useState<string | null>(null);
  const [playedQuestionAudioIds, setPlayedQuestionAudioIds] = useState<Set<string>>(
    new Set(),
  );
  const [failedQuestionAudioIds, setFailedQuestionAudioIds] = useState<Set<string>>(
    new Set(),
  );
  const [activeQuestionAudioId, setActiveQuestionAudioId] = useState<string | null>(
    null,
  );
  const [countdownQuestionId, setCountdownQuestionId] = useState<string | null>(
    null,
  );
  const [countdownSec, setCountdownSec] = useState(8);
  const submittedRef = useRef(false);

  function resetQuestionPacing() {
    setActiveQuestionAudioId(null);
    setCountdownQuestionId(null);
    setCountdownSec(8);
  }

  const beginReadingSection = useCallback(() => {
    advanceFullMockToReading();
    setSection("reading");
    setCurrentIndex(LISTENING_QUESTIONS);
    setActiveAudioGroup(null);
    resetQuestionPacing();
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const session = getFullMockSession();
      if (session) {
        const restoredQuestions = session.questionIds
          .map((questionId) => getQuestionById(questionId))
          .filter((question): question is Question => Boolean(question));
        if (restoredQuestions.length === session.questionIds.length) {
          const listeningDeadline = new Date(session.listeningEndsAt).getTime();
          const restoredSection =
            session.currentSection === "reading" || Date.now() >= listeningDeadline
              ? "reading"
              : "listening";
          setQuestions(restoredQuestions);
          setAnswers(session.answers ?? {});
          setListeningEndsAt(listeningDeadline);
          setEndTime(new Date(session.endTime).getTime());
          setLeftAppDuringTest(Boolean(session.leftAppDuringTest));
          setPlayedGroups(new Set(session.playedAudioGroups ?? []));
          setPlayedQuestionAudioIds(new Set(session.playedQuestionAudioIds ?? []));
          setSection(restoredSection);
          setCurrentIndex(restoredSection === "reading" ? LISTENING_QUESTIONS : 0);
          setPhase("testing");
          if (restoredSection === "reading" && session.currentSection !== "reading") {
            advanceFullMockToReading();
          }
          return;
        }
      }
      clearFullMockSession();
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function start() {
    try {
      const plan = [...buildListeningMockPlan(), ...buildMockTestPlan()];
      const session = startFullMockSession(plan.map((question) => question.id));
      submittedRef.current = false;
      setQuestions(plan);
      setSection("listening");
      setCurrentIndex(0);
      setAnswers({});
      setListeningEndsAt(new Date(session.listeningEndsAt).getTime());
      setEndTime(new Date(session.endTime).getTime());
      setSectionRemainingMs(FULL_LISTENING_DURATION_MS);
      setTotalRemainingMs(FULL_MOCK_DURATION_MS);
      setLeftAppDuringTest(false);
      setFailedAudioGroups(new Set());
      setPlayedGroups(new Set());
      setActiveAudioGroup(null);
      setPlayedQuestionAudioIds(new Set());
      setFailedQuestionAudioIds(new Set());
      resetQuestionPacing();
      setPhase("testing");
    } catch (error) {
      alert((error as Error).message);
    }
  }

  function handleAudioStarted(groupKey: string) {
    setActiveAudioGroup(groupKey);
    setPlayedGroups((previous) => {
      if (previous.has(groupKey)) return previous;
      const next = new Set(previous);
      next.add(groupKey);
      return next;
    });
    markFullMockAudioGroupPlayed(groupKey);
  }

  function handleAudioEnded(groupKey: string) {
    setActiveAudioGroup((current) => (current === groupKey ? null : current));
  }

  function handleQuestionAudioStarted(questionId: string) {
    setActiveQuestionAudioId(questionId);
    setPlayedQuestionAudioIds((previous) => {
      if (previous.has(questionId)) return previous;
      const next = new Set(previous);
      next.add(questionId);
      return next;
    });
    markFullMockQuestionAudioPlayed(questionId);
  }

  function beginQuestionCountdown(questionId: string) {
    setActiveQuestionAudioId((current) => (current === questionId ? null : current));
    setCountdownQuestionId(questionId);
    setCountdownSec(8);
  }

  function handleQuestionAudioError(questionId: string) {
    setFailedQuestionAudioIds((previous) => new Set(previous).add(questionId));
    setPlayedQuestionAudioIds((previous) => new Set(previous).add(questionId));
    markFullMockQuestionAudioPlayed(questionId);
    beginQuestionCountdown(questionId);
  }

  function goToQuestion(index: number) {
    const sectionStart = section === "listening" ? 0 : LISTENING_QUESTIONS;
    const sectionEnd = sectionStart + SECTION_QUESTIONS;
    if (index < sectionStart || index >= sectionEnd || !questions[index]) return;
    if (index !== currentIndex) resetQuestionPacing();
    if (audioGroupKey(questions[index]) !== activeAudioGroup) {
      setActiveAudioGroup(null);
    }
    setCurrentIndex(index);
  }

  function pick(questionId: string, choice: Choice) {
    const next = { ...answers, [questionId]: choice };
    setAnswers(next);
    saveFullMockAnswer(questionId, choice);
  }

  const submit = useCallback(() => {
    if (submittedRef.current || questions.length !== 200) return;
    submittedRef.current = true;

    let listeningRaw = 0;
    let readingRaw = 0;
    const partBreakdown = defaultBreakdown();
    const unansweredIds = questions
      .map((question) => question.id)
      .filter((questionId) => !answers[questionId]);
    const now = new Date().toISOString();

    questions.forEach((question, index) => {
      const part = question.part as MockPartKey;
      const breakdown = partBreakdown[part]!;
      breakdown.total++;
      if (answers[question.id] === question.answer) {
        breakdown.correct++;
        if (index < LISTENING_QUESTIONS) listeningRaw++;
        else readingRaw++;
      }

      const userAnswer = answers[question.id];
      if (userAnswer && userAnswer !== question.answer) {
        saveDailyAnswer({
          questionId: question.id,
          userAnswer,
          correctAnswer: question.answer,
          isCorrect: false,
          skill_tag: question.skill_tag,
          answeredAt: now,
          source: "mock",
        });
      }
    });

    const listeningRange = rawToScaledRange(listeningRaw, "listening");
    const readingRange = rawToScaledRange(readingRaw, "reading");
    const startedTime = endTime - FULL_MOCK_DURATION_MS;
    const submittedTime = Date.now();
    const fullResult: FullMockResult = {
      id: `mock-full-${submittedTime}`,
      questionIds: questions.map((question) => question.id),
      answers,
      unansweredIds,
      startedAt: new Date(startedTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      submittedAt: now,
      listeningRaw,
      readingRaw,
      listeningRange,
      readingRange,
      totalRange: getTotalRange(listeningRange, readingRange),
      listeningCEFR: getCEFRForSection(listeningRange, "listening"),
      readingCEFR: getCEFRForSection(readingRange, "reading"),
      partBreakdown,
      leftAppDuringTest,
      timeUsedMs: FULL_MOCK_DURATION_MS - Math.max(0, endTime - submittedTime),
      listeningTimeUsedMs: Math.min(
        FULL_LISTENING_DURATION_MS,
        Math.max(0, Math.min(submittedTime, listeningEndsAt) - startedTime),
      ),
    };

    saveFullMockResult(fullResult);
    clearFullMockSession();
    setResult(fullResult);
    setPhase("result");
  }, [answers, endTime, leftAppDuringTest, listeningEndsAt, questions]);

  useEffect(() => {
    if (phase !== "testing" || endTime === 0 || listeningEndsAt === 0) return;
    const tick = () => {
      const totalRemaining = Math.max(0, endTime - Date.now());
      const listeningRemaining = Math.max(0, listeningEndsAt - Date.now());
      setTotalRemainingMs(totalRemaining);
      setSectionRemainingMs(
        section === "listening" ? listeningRemaining : totalRemaining,
      );
      if (totalRemaining <= 0) {
        submit();
      } else if (section === "listening" && listeningRemaining <= 0) {
        beginReadingSection();
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [beginReadingSection, endTime, listeningEndsAt, phase, section, submit]);

  useEffect(() => {
    if (phase !== "testing") return;
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden") return;
      setLeftAppDuringTest(true);
      markFullMockLeftApp();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [phase]);

  useEffect(() => {
    if (phase !== "testing" || section !== "listening") return;
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
    phase,
    playedGroups,
    playedQuestionAudioIds,
    questions,
    section,
  ]);

  useEffect(() => {
    if (
      phase !== "testing" ||
      section !== "listening" ||
      countdownQuestionId === null
    ) {
      return;
    }
    const question = questions[currentIndex];
    if (!question || question.id !== countdownQuestionId) return;
    const id = window.setTimeout(() => {
      if (countdownSec > 1) {
        setCountdownSec((previous) => previous - 1);
        return;
      }
      resetQuestionPacing();
      if (currentIndex < LISTENING_QUESTIONS - 1) {
        setCurrentIndex((previous) => Math.min(LISTENING_QUESTIONS - 1, previous + 1));
      }
    }, 1000);
    return () => window.clearTimeout(id);
  }, [countdownQuestionId, countdownSec, currentIndex, phase, questions, section]);

  function confirmSubmit() {
    if (!window.confirm("確定要交卷嗎？未作答的題目將視為空白。")) return;
    submit();
  }

  if (phase === "preview") {
    return (
      <div className="space-y-5">
        <section className="rounded-2xl bg-gradient-to-br from-slate-800 to-indigo-900 p-5 text-white shadow-md">
          <p className="text-xs uppercase tracking-widest text-indigo-200">TOEIC Full Mock Test</p>
          <h1 className="mt-2 text-2xl font-bold">完整 TOEIC 模擬考</h1>
          <p className="mt-2 text-sm text-slate-200">
            200 題 · 120 分鐘 · Listening 先行，接續 Reading
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">正式模考規則</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>🎧 Listening：100 題 · 45 分鐘 · Part 1-4</li>
            <li>📖 Reading：100 題 · 75 分鐘 · Part 5-7</li>
          </ul>
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            <li>• 中間沒有休息；聽力時間到會直接進入閱讀</li>
            <li>• 進入 Reading 後不可返回 Listening 修改答案</li>
            <li>• 聽力音檔不可重播，作答時不顯示 transcript</li>
            <li>• 離開頁面仍持續計時，結果會註記離頁紀錄</li>
            <li>• 答錯的題目會加入錯題本，未作答不進</li>
          </ul>
        </section>

        <button
          onClick={start}
          className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white active:scale-[0.99]"
        >
          開始完整模擬考 →
        </button>
        <Link
          href="/"
          className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600"
        >
          返回首頁
        </Link>
      </div>
    );
  }

  if (phase === "testing") {
    const question = questions[currentIndex];
    const isListening = section === "listening";
    const sectionStart = isListening ? 0 : LISTENING_QUESTIONS;
    const currentQuestions = questions.slice(sectionStart, sectionStart + SECTION_QUESTIONS);
    const low = sectionRemainingMs < 5 * 60 * 1000;

    if (!question) {
      return <p className="py-10 text-center text-slate-500">找不到題目資料。</p>;
    }

    const visibleChoices: Choice[] =
      question.choices.D === undefined ? ["A", "B", "C"] : CHOICE_KEYS;
    const questionText = question.question.trim() || "請聽音檔後選擇答案";
    const imageUrl = getImageUrl(question);
    const mediaSupport = hasMediaSupport(question);
    const groupKey = audioGroupKey(question);
    // Audio resolution: pipeline uploads P3/P4 group audio only to the
    // canonical (smallest-id) member via --group-primary. The find() below
    // relies on plan-internal group ordering equalling full-bank ID order
    // (stable sort by question_order in buildListeningMockPlan + new P3/P4
    // lack question_order so push order = ID order). If a future plan
    // builder shuffles members, replace this with getAudioOwnerQuestion()
    // from app/quiz/page.tsx (full-bank canonical lookup independent of
    // plan order). See MockTestRunner for the same rationale.
    const audioQuestion =
      question.part === "Part 3" || question.part === "Part 4"
        ? currentQuestions.find((candidate) => audioGroupKey(candidate) === groupKey) ??
          question
        : question;
    const audioUrl = isListening ? getAudioUrl(audioQuestion) : null;
    const audioFailed = failedAudioGroups.has(groupKey);
    const audioAlreadyPlayed = playedGroups.has(groupKey);
    const audioIsActive = activeAudioGroup === groupKey;
    const hideText =
      isListening && (question.part === "Part 1" || question.part === "Part 2");
    const questionAudioUrl =
      isListening && question.part === "Part 3" ? getQuestionAudioUrl(question) : null;
    const enableP3MockPacing = questionAudioUrl !== null;
    const questionAudioPlayed = playedQuestionAudioIds.has(question.id);
    const questionAudioIsActive = activeQuestionAudioId === question.id;
    const questionAudioFailed = failedQuestionAudioIds.has(question.id);
    const countdownActive = countdownQuestionId === question.id;
    const conversationFinishedOrSkipped = audioAlreadyPlayed && !audioIsActive;
    const showQuestionAudio =
      enableP3MockPacing &&
      conversationFinishedOrSkipped &&
      !countdownActive &&
      !questionAudioFailed &&
      (!questionAudioPlayed || questionAudioIsActive);

    return (
      <div className="flex min-h-screen flex-col">
        <div
          role="timer"
          aria-live="off"
          className={`sticky top-0 z-10 border-b px-3 py-2 text-center ${
            low
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-slate-200 bg-white text-slate-800"
          }`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider">
            {isListening ? "Listening 剩餘時間" : "Reading 剩餘時間"}
          </p>
          <p className="font-mono text-lg font-bold">
            {low && "⚠ "}
            {formatTime(sectionRemainingMs)}
          </p>
          {isListening && (
            <p className="text-[10px] text-slate-500">
              全測驗剩餘 {formatTime(totalRemainingMs)}
            </p>
          )}
        </div>

        <div className="border-b border-slate-100 bg-white px-2 py-2">
          <div className="mb-2 grid grid-cols-2 gap-2 text-center text-xs font-semibold">
            <span className="rounded-lg bg-indigo-100 px-2 py-1.5 text-indigo-800">
              Listening {isListening ? "進行中" : "已結束"}
            </span>
            <span
              className={`rounded-lg px-2 py-1.5 ${
                isListening
                  ? "bg-slate-100 text-slate-400"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              Reading {isListening ? "尚未開始" : "進行中"}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {currentQuestions.map((candidate, offset) => {
              const index = sectionStart + offset;
              const done = Boolean(answers[candidate.id]);
              const current = index === currentIndex;
              return (
                <button
                  key={candidate.id}
                  onClick={() => goToQuestion(index)}
                  aria-label={`第 ${index + 1} 題${done ? "（已答）" : ""}`}
                  aria-current={current ? "true" : undefined}
                  className={`flex h-7 w-7 items-center justify-center rounded text-[10px] font-medium ${
                    current
                      ? "bg-slate-900 text-white"
                      : done
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-slate-400">
            <span>
              本區已答{" "}
              {currentQuestions.filter((candidate) => Boolean(answers[candidate.id])).length} /{" "}
              {SECTION_QUESTIONS}
            </span>
            <span>{question.part}</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 py-4">
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

          {audioUrl && !audioFailed && (!audioAlreadyPlayed || audioIsActive) ? (
            <div className="mb-4">
              <AudioPlayer
                key={groupKey}
                src={audioUrl}
                autoPlay
                onPlaybackStart={() => handleAudioStarted(groupKey)}
                onEnded={() => handleAudioEnded(groupKey)}
                onError={() =>
                  setFailedAudioGroups((groups) => new Set(groups).add(groupKey))
                }
              />
            </div>
          ) : audioUrl && audioAlreadyPlayed ? (
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-600">
              🔇 此段音檔已播放過，模擬考不可重播
            </div>
          ) : isListening && mediaSupport.audio ? (
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
                onPlaybackStart={() => handleQuestionAudioStarted(question.id)}
                onEnded={() => beginQuestionCountdown(question.id)}
                onError={() => handleQuestionAudioError(question.id)}
              />
            </div>
          )}

          {enableP3MockPacing && questionAudioFailed && countdownActive && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
              ⚠ 題目朗讀載入失敗，倒數仍進行
            </div>
          )}

          {enableP3MockPacing && countdownActive && (
            <div
              role="timer"
              aria-live="polite"
              aria-label={`此題剩餘 ${countdownSec} 秒`}
              className={`mb-4 rounded-xl border p-4 text-center ${
                countdownSec <= 3
                  ? "animate-pulse border-rose-200 bg-rose-50 text-rose-700"
                  : "border-indigo-200 bg-indigo-50 text-indigo-700"
              }`}
            >
              <p className="text-xs font-semibold">作答倒數</p>
              <p className="mt-1 text-4xl font-bold">⏱ {countdownSec}</p>
            </div>
          )}

          {question.passage && (
            <div className="mb-4 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
              {question.passage}
            </div>
          )}

          {hideText ? (
            <p className="text-sm font-medium text-slate-900">
              {currentIndex + 1}. 請依音檔內容選擇答案
            </p>
          ) : (
            <p className="text-sm font-medium text-slate-900">
              {currentIndex + 1}. {questionText}
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
              const selected = answers[question.id] === choice;
              const choiceAudio = question.audioChoices?.[choice];
              return (
                <div key={choice} className="space-y-2">
                  {choiceAudio && !isListening && (
                    <AudioPlayer key={choiceAudio} src={choiceAudio} allowReplay />
                  )}
                  <button
                    onClick={() => pick(question.id, choice)}
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
        </div>

        <div className="sticky bottom-0 border-t border-slate-200 bg-white px-3 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => goToQuestion(Math.max(sectionStart, currentIndex - 1))}
              disabled={currentIndex === sectionStart}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-30"
            >
              ← 上一題
            </button>
            <span className="text-xs text-slate-400">
              {currentIndex + 1} / 200
            </span>
            {currentIndex < sectionStart + SECTION_QUESTIONS - 1 ? (
              <button
                onClick={() => goToQuestion(currentIndex + 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                下一題 →
              </button>
            ) : isListening ? (
              <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-500">
                等待 Reading 開始
              </span>
            ) : (
              <button
                onClick={confirmSubmit}
                className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-bold text-white"
              >
                交卷
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <div className="space-y-4">
        <section className="rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 p-5 text-white shadow-md">
          <p className="text-xs uppercase tracking-widest text-emerald-200">Full Mock Test Result</p>
          <h1 className="mt-2 text-2xl font-bold">完整模擬考成績</h1>
          <p className="mt-2 text-3xl font-bold">
            {result.totalRange.min}-{result.totalRange.max}
            <span className="text-lg font-normal text-emerald-200"> / 990</span>
          </p>
          <p className="mt-1 text-xs text-emerald-300">※ {PREDICTION_DISCLAIMER}</p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
            <p className="text-xs font-semibold text-indigo-700">Listening</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {result.listeningRange.min}-{result.listeningRange.max}
            </p>
            <p className="text-xs text-slate-500">
              {result.listeningRaw}/100 · {cefrLabel(result.listeningCEFR)}
            </p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
            <p className="text-xs font-semibold text-emerald-700">Reading</p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {result.readingRange.min}-{result.readingRange.max}
            </p>
            <p className="text-xs text-slate-500">
              {result.readingRaw}/100 · {cefrLabel(result.readingCEFR)}
            </p>
          </div>
        </section>

        {result.leftAppDuringTest && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            此次測驗期間曾離開頁面，分數預測僅供參考。
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">Part 1-7 表現</h2>
          <div className="space-y-2">
            {ALL_PARTS.map((part) => {
              const breakdown = result.partBreakdown[part];
              if (!breakdown || breakdown.total === 0) return null;
              const percentage = Math.round((breakdown.correct / breakdown.total) * 100);
              return (
                <div key={part} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-medium text-slate-600">{part}</span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-full ${
                          breakdown.correct / breakdown.total >= 0.7
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-24 text-right text-xs text-slate-500">
                    {breakdown.correct}/{breakdown.total}（{percentage}%）
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">總用時</p>
            <p className="mt-1 text-lg font-bold text-slate-800">
              {formatTime(result.timeUsedMs)}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">未作答</p>
            <p
              className={`mt-1 text-lg font-bold ${
                result.unansweredIds.length > 0 ? "text-rose-600" : "text-slate-800"
              }`}
            >
              {result.unansweredIds.length} 題
            </p>
          </div>
        </section>

        <Link
          href="/"
          className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm"
        >
          返回首頁
        </Link>
      </div>
    );
  }

  return <p className="py-10 text-center text-slate-500">載入中…</p>;
}
