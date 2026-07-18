"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import PartBreakdownBars from "@/components/PartBreakdownBars";
import MockQuestionCanvas, {
  makePacingView,
} from "@/components/mock/MockQuestionCanvas";
import MockQuestionGrid from "@/components/mock/MockQuestionGrid";
import ResultStatCards from "@/components/mock/ResultStatCards";
import ResumeFailedScreen from "@/components/mock/ResumeFailedScreen";
import SubmitErrorScreen from "@/components/mock/SubmitErrorScreen";
import {
  ensureQuestionBankLoaded,
  loadQuestionBank,
  questionBank,
} from "@/lib/questionBank";
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
  saveFullMockCurrentIndex,
  saveFullMockResult,
  saveFullMockResponseTime,
  startFullMockSession,
} from "@/lib/fullMockStorage";
import {
  getMockSeenQuestionIds,
  markMockQuestionsSeen,
  saveMockWrongAnswers,
} from "@/lib/storage";
import {
  getCEFRForSection,
  getTotalRange,
  PREDICTION_DISCLAIMER,
  rawToScaledRange,
} from "@/lib/toeicScoreEstimate";
import {
  audioGroupKey,
  formatTime,
  getGroupPosition,
  tallyMockAnswers,
} from "@/lib/mockShared";
import {
  buildMockReviewSnapshot,
  saveMockReviewSnapshot,
} from "@/lib/mockReviewStorage";
import { useMockAudioPacing } from "@/lib/useMockAudioPacing";
import type {
  FullMockResult,
  FullMockSection,
  MockPartKey,
} from "@/types/mock";
import type { Choice, Question } from "@/types/question";

type Phase = "preview" | "testing" | "submit-error" | "result";

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
function cefrLabel(result: FullMockResult["listeningCEFR"]): string {
  return result.spans ? `約 ${result.spans.join("-")}` : result.primary;
}

export default function FullMockRunner() {
  const [phase, setPhase] = useState<Phase>("preview");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [section, setSection] = useState<FullMockSection>("listening");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Choice>>>({});
  const [responseTimes, setResponseTimes] = useState<Partial<Record<string, number>>>({});
  const [listeningEndsAt, setListeningEndsAt] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [sectionRemainingMs, setSectionRemainingMs] = useState(
    FULL_LISTENING_DURATION_MS,
  );
  const [totalRemainingMs, setTotalRemainingMs] = useState(FULL_MOCK_DURATION_MS);
  const [leftAppDuringTest, setLeftAppDuringTest] = useState(false);
  const [result, setResult] = useState<FullMockResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  // "checking" until the mount effect resolves whether an unfinished session
  // exists; the preview (with its session-overwriting start button) must not
  // render during that window or after a failed restore.
  const [resumeState, setResumeState] = useState<"checking" | "idle" | "failed">(
    "checking",
  );
  const submittedRef = useRef(false);
  const submittedTimeRef = useRef<number | null>(null);
  const questionStartTime = useRef(0);

  async function start() {
    if (starting) return;
    setStarting(true);
    try {
      // Safety net for any path that reaches the preview with a live session
      // (races, future code changes): never silently overwrite exam progress.
      if (
        getFullMockSession() &&
        !window.confirm(
          "偵測到未完成的完整模擬考。開始新測驗會清除原有進度，確定要重新開始嗎？",
        )
      ) {
        return;
      }
      if (!(await ensureQuestionBankLoaded())) return;
      const { buildListeningMockPlan, buildMockTestPlan } = questionBank();
      const seenIds = getMockSeenQuestionIds();
      const plan = [...buildListeningMockPlan(seenIds), ...buildMockTestPlan(seenIds)];
      const session = startFullMockSession(plan.map((question) => question.id));
      submittedRef.current = false;
      submittedTimeRef.current = null;
      setQuestions(plan);
      setSection("listening");
      setCurrentIndex(0);
      setAnswers({});
      setResponseTimes({});
      setListeningEndsAt(new Date(session.listeningEndsAt).getTime());
      setEndTime(new Date(session.endTime).getTime());
      setSectionRemainingMs(FULL_LISTENING_DURATION_MS);
      setTotalRemainingMs(FULL_MOCK_DURATION_MS);
      setLeftAppDuringTest(false);
      setSubmitError(null);
      questionStartTime.current = new Date().getTime();
      resetForStart();
      setPhase("testing");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setStarting(false);
    }
  }

  function goToQuestion(index: number) {
    const sectionStart = section === "listening" ? 0 : LISTENING_QUESTIONS;
    const sectionEnd = sectionStart + SECTION_QUESTIONS;
    if (index < sectionStart || index >= sectionEnd || !questions[index]) return;
    if (index !== currentIndex) {
      resetQuestionPacing();
      questionStartTime.current = new Date().getTime();
    }
    syncActiveGroupOnNavigate(audioGroupKey(questions[index]));
    saveFullMockCurrentIndex(index);
    setCurrentIndex(index);
  }

  function pick(questionId: string, choice: Choice) {
    const next = { ...answers, [questionId]: choice };
    const nowMs = new Date().getTime();
    const responseTimeMs = Math.max(
      0,
      nowMs - (questionStartTime.current || nowMs),
    );
    setAnswers(next);
    setResponseTimes((previous) => ({
      ...previous,
      [questionId]: responseTimeMs,
    }));
    saveFullMockAnswer(questionId, choice);
    saveFullMockResponseTime(questionId, responseTimeMs);
  }

  const submit = useCallback(() => {
    if (submittedRef.current || questions.length !== 200) return;
    submittedRef.current = true;

    const {
      breakdown: partBreakdown,
      unansweredIds,
      correctIds,
    } = tallyMockAnswers(questions, answers, ALL_PARTS);
    const listeningRaw = questions
      .slice(0, LISTENING_QUESTIONS)
      .filter((question) => correctIds.has(question.id)).length;
    const readingRaw = correctIds.size - listeningRaw;

    const listeningRange = rawToScaledRange(listeningRaw, "listening");
    const readingRange = rawToScaledRange(readingRaw, "reading");
    const startedTime = endTime - FULL_MOCK_DURATION_MS;
    const submittedTime = submittedTimeRef.current ?? Date.now();
    submittedTimeRef.current = submittedTime;
    const now = new Date(submittedTime).toISOString();
    const resultId = `mock-full-${submittedTime}`;
    const startedAt = new Date(startedTime).toISOString();
    const fullResult: FullMockResult = {
      id: resultId,
      questionIds: questions.map((question) => question.id),
      answers,
      unansweredIds,
      startedAt,
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

    // Make the compact score durable before writing any derived records. If
    // this fails, the active session stays intact and the user can retry.
    if (!saveFullMockResult(fullResult)) {
      setSubmitError(
        "瀏覽器無法寫入成績。本次作答仍保留，請確認網站儲存空間可用後再重試。",
      );
      setPhase("submit-error");
      return;
    }
    clearFullMockSession();

    markMockQuestionsSeen(questions.map((question) => question.id));
    saveMockWrongAnswers(questions, answers, now);

    const reviewSnapshot = buildMockReviewSnapshot({
      resultId,
      mode: "full",
      questions,
      answers,
      responseTimes,
      startedAt,
      submittedAt: now,
    });
    if (saveMockReviewSnapshot(reviewSnapshot)) {
      fullResult.reviewSnapshotId = reviewSnapshot.id;
      // Id-based upsert enriches the already-safe result without duplicating it.
      saveFullMockResult(fullResult);
    }

    setSubmitError(null);
    setResult(fullResult);
    setPhase("result");
  }, [answers, endTime, leftAppDuringTest, listeningEndsAt, questions, responseTimes]);

  const onCountdownAdvance = useCallback(() => {
    if (currentIndex < LISTENING_QUESTIONS - 1) {
      setCurrentIndex((previous) => {
        const next = Math.min(LISTENING_QUESTIONS - 1, previous + 1);
        saveFullMockCurrentIndex(next);
        questionStartTime.current = new Date().getTime();
        return next;
      });
    }
  }, [currentIndex]);

  const pacing = useMockAudioPacing({
    isTesting: phase === "testing",
    isListeningActive: section === "listening",
    questions,
    currentIndex,
    persistAudioGroup: markFullMockAudioGroupPlayed,
    persistQuestionAudio: markFullMockQuestionAudioPlayed,
    onCountdownAdvance,
  });
  const {
    handleAudioStarted,
    handleAudioEnded,
    markAudioGroupFailed,
    handleQuestionAudioStarted,
    beginQuestionCountdown,
    handleQuestionAudioError,
    resetQuestionPacing,
    syncActiveGroupOnNavigate,
    clearListeningPacing,
    resetForStart,
    hydrateFromSession,
  } = pacing;

  const beginReadingSection = useCallback(() => {
    advanceFullMockToReading();
    setSection("reading");
    saveFullMockCurrentIndex(LISTENING_QUESTIONS);
    questionStartTime.current = new Date().getTime();
    setCurrentIndex(LISTENING_QUESTIONS);
    clearListeningPacing();
  }, [clearListeningPacing]);

  useEffect(() => {
    let cancelled = false;
    // Warm the bank chunk during the preview screen so the start tap does not
    // stall on a multi-MB download; failures surface on the actual start.
    void loadQuestionBank().catch(() => {});
    void (async () => {
      const session = getFullMockSession();
      if (session) {
        try {
          await loadQuestionBank();
        } catch (error) {
          // Keep the session on a transient chunk-load failure — full-mock
          // progress must survive a network hiccup. Swap the preview for a
          // retry notice so the destructive start button is not shown.
          console.error("[full-mock] failed to load question bank:", error);
          if (!cancelled) setResumeState("failed");
          return;
        }
        if (cancelled) return;
        const restoredQuestions = session.questionIds
          .map((questionId) => questionBank().getQuestionById(questionId))
          .filter((question): question is Question => Boolean(question));
        if (restoredQuestions.length === session.questionIds.length) {
          const listeningDeadline = new Date(session.listeningEndsAt).getTime();
          const restoredSection =
            session.currentSection === "reading" || Date.now() >= listeningDeadline
              ? "reading"
              : "listening";
          setQuestions(restoredQuestions);
          setAnswers(session.answers ?? {});
          setResponseTimes(session.responseTimes ?? {});
          setListeningEndsAt(listeningDeadline);
          setEndTime(new Date(session.endTime).getTime());
          setLeftAppDuringTest(Boolean(session.leftAppDuringTest));
          hydrateFromSession({
            playedAudioGroups: session.playedAudioGroups,
            playedQuestionAudioIds: session.playedQuestionAudioIds,
          });
          setSection(restoredSection);
          const sectionStart =
            restoredSection === "reading" ? LISTENING_QUESTIONS : 0;
          const sectionEnd = sectionStart + SECTION_QUESTIONS - 1;
          const fallbackIndex =
            restoredSection === "reading" ? LISTENING_QUESTIONS : 0;
          const storedIndex =
            typeof session.currentIndex === "number"
              ? session.currentIndex
              : fallbackIndex;
          const restoredIndex = Math.min(
            sectionEnd,
            Math.max(sectionStart, storedIndex),
          );
          setCurrentIndex(restoredIndex);
          questionStartTime.current = new Date().getTime();
          setResumeState("idle");
          setPhase("testing");
          if (restoredSection === "reading" && session.currentSection !== "reading") {
            advanceFullMockToReading();
          }
          return;
        }
      }
      clearFullMockSession();
      if (!cancelled) setResumeState("idle");
    })();
    return () => {
      cancelled = true;
    };
  }, [hydrateFromSession]);

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

  function confirmSubmit() {
    if (!window.confirm("確定要交卷嗎？未作答的題目將視為空白。")) return;
    submit();
  }

  function confirmBeginReadingEarly() {
    const listeningQuestions = questions.slice(0, LISTENING_QUESTIONS);
    const unanswered = listeningQuestions.filter((item) => !answers[item.id]).length;
    const message =
      unanswered > 0
        ? `Listening 還有 ${unanswered} 題未作答。確定要直接開始 Reading 嗎？未作答會保留空白。`
        : "Listening 已全部作答。要直接開始 Reading，不等待剩餘聽力時間嗎？";
    if (!window.confirm(message)) return;
    beginReadingSection();
  }

  function retrySubmit() {
    submittedRef.current = false;
    setSubmitError(null);
    submit();
  }

  if (phase === "preview") {
    if (resumeState === "checking") {
      return <p className="py-10 text-center text-slate-500">載入中…</p>;
    }
    if (resumeState === "failed") {
      return <ResumeFailedScreen examLabel="完整模擬考" />;
    }
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
            <li>• 若 Listening 已完成，可手動提早開始 Reading</li>
            <li>• 進入 Reading 後不可返回 Listening 修改答案</li>
            <li>• 聽力音檔不可重播，作答時不顯示 transcript</li>
            <li>• 聽力音檔播畢自動倒數進下一題（P1/P2 各 5 秒、P3/P4 各 8 秒）</li>
            <li>• 離開頁面仍持續計時，結果會註記離頁紀錄</li>
            <li>• 答錯的題目會加入錯題本，未作答不進</li>
          </ul>
        </section>

        <button
          onClick={start}
          disabled={starting}
          className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white active:scale-[0.99] disabled:opacity-60"
        >
          {starting ? "正在準備題目…" : "開始完整模擬考 →"}
        </button>
        <Link
          href="/"
          className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600"
        >
          返回桌面
        </Link>
      </div>
    );
  }

  if (phase === "submit-error") {
    return <SubmitErrorScreen submitError={submitError} onRetry={retrySubmit} />;
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

    const groupKey = audioGroupKey(question);
    const groupPosition = getGroupPosition(currentQuestions, question);
    const sectionAnsweredCount = currentQuestions.filter((candidate) =>
      Boolean(answers[candidate.id]),
    ).length;
    const listeningAllAnswered =
      isListening && sectionAnsweredCount === SECTION_QUESTIONS;

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
          {listeningAllAnswered && (
            <button
              type="button"
              onClick={confirmBeginReadingEarly}
              className="mt-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white"
            >
              Listening 已完成，開始 Reading →
            </button>
          )}
        </div>

        <div className="border-b border-slate-100 bg-white px-2 pt-2">
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
          <details className="group -mx-2">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 border-t border-slate-100 px-3 py-2 text-sm [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 font-semibold text-slate-700">
                題目總覽 · {question.part}
                {groupPosition ? ` · 題組 ${groupPosition.index}/${groupPosition.total}` : ""}
              </span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                本區已答 {sectionAnsweredCount} / {SECTION_QUESTIONS}
                <span
                  aria-hidden="true"
                  className="text-sm transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </span>
            </summary>
            <MockQuestionGrid
              questions={currentQuestions}
              startIndex={sectionStart}
              currentIndex={currentIndex}
              answers={answers}
              onSelect={goToQuestion}
              ariaLabel={`完整模擬考${isListening ? " Listening" : " Reading"}題目總覽`}
            />
          </details>
        </div>

        <div className="flex-1 overflow-auto px-4 py-4">
          <MockQuestionCanvas
            question={question}
            displayNumber={currentIndex + 1}
            isListeningActive={isListening}
            groupPosition={groupPosition}
            selectedChoice={answers[question.id]}
            pacing={makePacingView(pacing, groupKey, question.id)}
            onAudioStarted={() => handleAudioStarted(groupKey)}
            onAudioEnded={() => handleAudioEnded(groupKey)}
            onAudioError={() => markAudioGroupFailed(groupKey)}
            onQuestionAudioStarted={() => handleQuestionAudioStarted(question.id)}
            onQuestionAudioEnded={() => beginQuestionCountdown(question.id)}
            onQuestionAudioError={() => handleQuestionAudioError(question.id)}
            onPick={(choice) => pick(question.id, choice)}
          />
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
              <button
                onClick={confirmBeginReadingEarly}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white"
              >
                開始 Reading →
              </button>
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
          <PartBreakdownBars parts={ALL_PARTS} breakdown={result.partBreakdown} />
        </section>

        <ResultStatCards
          timeUsedMs={result.timeUsedMs}
          unansweredCount={result.unansweredIds.length}
          timeLabel="總用時"
        />

        {result.reviewSnapshotId && (
          <Link
            href={`/mock-review/${result.reviewSnapshotId}`}
            className="block w-full rounded-2xl bg-indigo-600 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm"
          >
            查看完整檢討
          </Link>
        )}

        <Link
          href="/"
          className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm"
        >
          返回桌面
        </Link>
      </div>
    );
  }

  return <p className="py-10 text-center text-slate-500">載入中…</p>;
}
