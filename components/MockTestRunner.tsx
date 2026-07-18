"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import PartBreakdownBars from "@/components/PartBreakdownBars";
import MockQuestionCanvas, {
  makePacingView,
} from "@/components/mock/MockQuestionCanvas";
import MockQuestionGrid from "@/components/mock/MockQuestionGrid";
import ResultStatCards from "@/components/mock/ResultStatCards";
import SubmitErrorScreen from "@/components/mock/SubmitErrorScreen";
import {
  ensureQuestionBankLoaded,
  loadQuestionBank,
  questionBank,
} from "@/lib/questionBank";
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
import {
  getMockSeenQuestionIds,
  markMockQuestionsSeen,
  saveMockWrongAnswers,
} from "@/lib/storage";
import {
  clearMockSession,
  getMockDurationMs,
  getMockSession,
  markAudioGroupPlayed,
  markQuestionAudioPlayed,
  saveCurrentIndex as saveMockCurrentIndex,
  saveAnswer as saveMockAnswer,
  saveMockResult,
  saveResponseTime as saveMockResponseTime,
  startMockSession,
} from "@/lib/mockStorage";
import {
  getCEFRForSection,
  PREDICTION_DISCLAIMER,
  rawToScaledRange,
} from "@/lib/toeicScoreEstimate";
import { useMockAudioPacing } from "@/lib/useMockAudioPacing";
import type { MockMode, MockPartKey, MockTestResult } from "@/types/mock";
import type { Choice, Question } from "@/types/question";

type Phase = "preview" | "testing" | "submit-error" | "result";

const READING_PARTS: MockPartKey[] = ["Part 5", "Part 6", "Part 7"];
const LISTENING_PARTS: MockPartKey[] = ["Part 1", "Part 2", "Part 3", "Part 4"];

type Config = {
  parts: MockPartKey[];
  durationMs: number;
  headerLabel: string;
  headerTitle: string;
  subtitle: string;
  examFlavor: string; // shown in result ("Reading" / "Listening")
  description: { emoji: string; text: string }[];
  buildPlan: (seenIds?: ReadonlySet<string>) => Question[];
};

function getConfig(mode: MockMode): Config {
  if (mode === "listening") {
    return {
      parts: LISTENING_PARTS,
      durationMs: getMockDurationMs("listening"),
      headerLabel: "TOEIC Listening Mock Test",
      headerTitle: "聽力模擬考",
      subtitle: "100 題 · 45 分鐘 · 完整 Listening 體驗",
      examFlavor: "Listening",
      description: [
        { emoji: "📷", text: "Part 1 — 照片描述 6 題" },
        { emoji: "🗣️", text: "Part 2 — 應答問題 25 題" },
        { emoji: "💬", text: "Part 3 — 對話聽力 39 題（13 段對話 × 3）" },
        { emoji: "🎙️", text: "Part 4 — 簡短獨白 30 題（10 段獨白 × 3）" },
      ],
      buildPlan: (seenIds) => questionBank().buildListeningMockPlan(seenIds),
    };
  }
  return {
    parts: READING_PARTS,
    durationMs: getMockDurationMs("reading"),
    headerLabel: "TOEIC Reading Mock Test",
    headerTitle: "閱讀模擬考",
    subtitle: "100 題 · 75 分鐘 · 完整 Reading 體驗",
    examFlavor: "Reading",
    description: [
      { emoji: "📝", text: "Part 5 — 句子填空 30 題" },
      { emoji: "📋", text: "Part 6 — 段落填空 16 題（4 篇）" },
      { emoji: "📄", text: "Part 7 — 閱讀理解 54 題（單篇 + 雙篇 + 三篇）" },
    ],
    buildPlan: (seenIds) => questionBank().buildMockTestPlan(seenIds),
  };
}

export default function MockTestRunner({ mode }: { mode: MockMode }) {
  const config = getConfig(mode);
  const [phase, setPhase] = useState<Phase>("preview");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Choice>>>({});
  const [responseTimes, setResponseTimes] = useState<Partial<Record<string, number>>>({});
  const [endTime, setEndTime] = useState(0);
  const [remainingMs, setRemainingMs] = useState(config.durationMs);
  const [result, setResult] = useState<MockTestResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const submittedRef = useRef(false);
  const submittedTimeRef = useRef<number | null>(null);
  const questionStartTime = useRef(0);

  async function start() {
    if (starting) return;
    setStarting(true);
    try {
      if (!(await ensureQuestionBankLoaded())) return;
      const plan = config.buildPlan(getMockSeenQuestionIds());
      setQuestions(plan);
      const session = startMockSession(plan.map((q) => q.id), mode);
      setEndTime(new Date(session.endTime).getTime());
      setCurrentIndex(0);
      setAnswers({});
      setResponseTimes({});
      setSubmitError(null);
      submittedRef.current = false;
      submittedTimeRef.current = null;
      questionStartTime.current = new Date().getTime();
      resetForStart();
      setPhase("testing");
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setStarting(false);
    }
  }

  function goToQuestion(index: number) {
    const nextQuestion = questions[index];
    if (!nextQuestion) return;
    if (index !== currentIndex) {
      resetQuestionPacing();
      questionStartTime.current = new Date().getTime();
    }
    syncActiveGroupOnNavigate(audioGroupKey(nextQuestion));
    saveMockCurrentIndex(index, mode);
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
    saveMockAnswer(questionId, choice, mode);
    saveMockResponseTime(questionId, responseTimeMs, mode);
  }

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const { breakdown, unansweredIds, correctIds } = tallyMockAnswers(
      questions,
      answers,
      config.parts,
    );
    const correct = correctIds.size;

    const submittedTime = submittedTimeRef.current ?? Date.now();
    submittedTimeRef.current = submittedTime;
    const now = new Date(submittedTime).toISOString();
    const remainingAtSubmit = Math.max(0, endTime - submittedTime);
    const resultId = `mock-${mode}-${submittedTime}`;
    const startedAt = new Date(endTime - config.durationMs).toISOString();
    const mockResult: MockTestResult = {
      id: resultId,
      mode,
      questionIds: questions.map((q) => q.id),
      answers,
      unansweredIds,
      startedAt,
      endTime: new Date(endTime).toISOString(),
      submittedAt: now,
      rawScore: correct,
      scoreRange: rawToScaledRange(
        correct,
        mode === "listening" ? "listening" : "reading",
      ),
      partBreakdown: breakdown,
      timeUsedMs: config.durationMs - remainingAtSubmit,
    };

    // Persist the compact score record first. Review snapshots and wrong-book
    // updates are derived data; none of them may consume the last available
    // storage and then cause the only durable exam result to be lost.
    if (!saveMockResult(mockResult, mode)) {
      setSubmitError(
        "瀏覽器無法寫入成績。本次作答仍保留，請確認網站儲存空間可用後再重試。",
      );
      setPhase("submit-error");
      return;
    }
    clearMockSession(mode);

    // Save wrong answers to wrong book with mock source only after the primary
    // result is durable, so a failed retry cannot duplicate these records.
    markMockQuestionsSeen(questions.map((q) => q.id));
    saveMockWrongAnswers(questions, answers, now);

    const reviewSnapshot = buildMockReviewSnapshot({
      resultId,
      mode,
      questions,
      answers,
      responseTimes,
      startedAt,
      submittedAt: now,
    });
    if (saveMockReviewSnapshot(reviewSnapshot)) {
      mockResult.reviewSnapshotId = reviewSnapshot.id;
      // saveResult is an id-based upsert. If this optional enrichment cannot
      // be written, the compact result saved above is still safely retained.
      saveMockResult(mockResult, mode);
    }

    setSubmitError(null);
    setResult(mockResult);
    setPhase("result");
  }, [answers, config.durationMs, config.parts, endTime, mode, questions, responseTimes]);

  const onCountdownAdvance = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => {
        const next = Math.min(questions.length - 1, previous + 1);
        saveMockCurrentIndex(next, mode);
        questionStartTime.current = new Date().getTime();
        return next;
      });
    } else {
      submit();
    }
  }, [currentIndex, mode, questions.length, submit]);

  const pacing = useMockAudioPacing({
    isTesting: phase === "testing",
    isListeningActive: mode === "listening",
    questions,
    currentIndex,
    persistAudioGroup: (groupKey) => markAudioGroupPlayed(groupKey, mode),
    persistQuestionAudio: (questionId) => markQuestionAudioPlayed(questionId, mode),
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
    resetForStart,
    hydrateFromSession,
  } = pacing;

  // Resume session
  useEffect(() => {
    let cancelled = false;
    // Warm the bank chunk during the preview screen so the start tap does not
    // stall on a multi-MB download; failures surface on the actual start.
    void loadQuestionBank().catch(() => {});
    void (async () => {
      const session = getMockSession(mode);
      if (session && !session.submittedAt) {
        try {
          await loadQuestionBank();
        } catch (error) {
          // Do NOT clear the session on a transient chunk-load failure —
          // the exam progress must survive a network hiccup.
          console.error("[mock] failed to load question bank:", error);
          return;
        }
        if (cancelled) return;
        const qs = session.questionIds
          .map((questionId) => questionBank().getQuestionById(questionId))
          .filter((q): q is Question => Boolean(q));
        if (qs.length === session.questionIds.length) {
          setQuestions(qs);
          setAnswers(session.answers ?? {});
          setResponseTimes(session.responseTimes ?? {});
          setEndTime(new Date(session.endTime).getTime());
          const restoredIndex =
            typeof session.currentIndex === "number"
              ? Math.min(Math.max(0, session.currentIndex), qs.length - 1)
              : 0;
          setCurrentIndex(restoredIndex);
          questionStartTime.current = new Date().getTime();
          hydrateFromSession({
            playedAudioGroups: session.playedAudioGroups,
            playedQuestionAudioIds: session.playedQuestionAudioIds,
          });
          setPhase("testing");
          return;
        }
      }
      clearMockSession(mode);
    })();
    return () => {
      cancelled = true;
    };
  }, [hydrateFromSession, mode]);

  // Countdown
  useEffect(() => {
    if (phase !== "testing" || endTime === 0) return;
    const tick = () => {
      const r = Math.max(0, endTime - Date.now());
      setRemainingMs(r);
      if (r <= 0) submit();
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [phase, endTime, submit]);

  function confirmSubmit() {
    if (!window.confirm("確定要交卷嗎？未作答的題目將視為空白。")) return;
    submit();
  }

  function retrySubmit() {
    submittedRef.current = false;
    setSubmitError(null);
    submit();
  }

  // ─── PREVIEW ──────────────────────────────────────────────────
  if (phase === "preview") {
    return (
      <div className="space-y-5">
        <section className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-md">
          <p className="text-xs uppercase tracking-widest text-slate-400">{config.headerLabel}</p>
          <h1 className="mt-2 text-2xl font-bold">{config.headerTitle}</h1>
          <p className="mt-2 text-sm text-slate-300">{config.subtitle}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">考試說明</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {config.description.map((d) => (
              <li key={d.text}>
                {d.emoji} {d.text}
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            <li>• {Math.round(config.durationMs / 60_000)} 分鐘限時，時間到自動交卷</li>
            <li>• 可點擊題號跳題作答</li>
            {mode === "listening" && (
              <li>• 聽力 transcript 在作答時不會顯示（模擬真實考試）</li>
            )}
            {mode === "listening" && (
              <li>• 音檔播畢後自動倒數進下一題（P1/P2 各 5 秒、P3/P4 各 8 秒），仿真考節奏</li>
            )}
            <li>• 答錯的題目會加入錯題本，未作答不進</li>
          </ul>
        </section>

        <button
          onClick={start}
          disabled={starting}
          className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white active:scale-[0.99] disabled:opacity-60"
        >
          {starting ? "正在準備題目…" : "開始模擬考 →"}
        </button>

        <Link href="/" className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600">
          返回桌面
        </Link>
      </div>
    );
  }

  if (phase === "submit-error") {
    return <SubmitErrorScreen submitError={submitError} onRetry={retrySubmit} />;
  }

  // ─── TESTING ──────────────────────────────────────────────────
  if (phase === "testing") {
    const q = questions[currentIndex];
    const low = remainingMs < 5 * 60 * 1000;

    if (!q) {
      return <p className="py-10 text-center text-slate-500">找不到題目資料。</p>;
    }

    const groupKey = audioGroupKey(q);
    const groupPosition = getGroupPosition(questions, q);
    const answeredCount = questions.filter((question) => Boolean(answers[question.id])).length;

    return (
      <div className="flex min-h-screen flex-col">
        {/* Timer */}
        <div role="timer" aria-live="off" className={`sticky top-0 z-10 border-b px-3 py-2 text-center font-mono text-lg font-bold ${low ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-800"}`}>
          {low && "⚠ "}{formatTime(remainingMs)}
        </div>

        {/* Collapsible question overview keeps the 100-item grid off the main canvas. */}
        <details className="group border-b border-slate-100 bg-white">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-sm [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 font-semibold text-slate-700">
              題目總覽 · {q.part}
              {groupPosition ? ` · 題組 ${groupPosition.index}/${groupPosition.total}` : ""}
            </span>
            <span className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
              已答 {answeredCount} / {questions.length}
              <span
                aria-hidden="true"
                className="text-sm transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </span>
          </summary>
          <MockQuestionGrid
            questions={questions}
            startIndex={0}
            currentIndex={currentIndex}
            answers={answers}
            onSelect={goToQuestion}
            ariaLabel={`${config.examFlavor} 模擬考題目總覽`}
          />
        </details>

        {/* Question */}
        <div className="flex-1 overflow-auto px-4 py-4">
          <MockQuestionCanvas
            question={q}
            displayNumber={currentIndex + 1}
            isListeningActive={mode === "listening"}
            groupPosition={groupPosition}
            selectedChoice={answers[q.id]}
            pacing={makePacingView(pacing, groupKey, q.id)}
            onAudioStarted={() => handleAudioStarted(groupKey)}
            onAudioEnded={() => handleAudioEnded(groupKey)}
            onAudioError={() => markAudioGroupFailed(groupKey)}
            onQuestionAudioStarted={() => handleQuestionAudioStarted(q.id)}
            onQuestionAudioEnded={() => beginQuestionCountdown(q.id)}
            onQuestionAudioError={() => handleQuestionAudioError(q.id)}
            onPick={(choice) => pick(q.id, choice)}
          />
        </div>

        {/* Bottom nav */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-white px-3 py-2">
          <div className="flex items-center justify-between">
            <button onClick={() => goToQuestion(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-30">
              ← 上一題
            </button>
            <span className="text-xs text-slate-400">{currentIndex + 1} / {questions.length}</span>
            {currentIndex < questions.length - 1 ? (
              <button onClick={() => goToQuestion(Math.min(questions.length - 1, currentIndex + 1))}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                下一題 →
              </button>
            ) : (
              <button onClick={confirmSubmit} className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-bold text-white">
                交卷
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULT ───────────────────────────────────────────────────
  if (phase === "result" && result) {
    const {
      rawScore,
      scoreRange,
      partBreakdown,
      unansweredIds,
      timeUsedMs,
      reviewSnapshotId,
    } = result;
    const cefr = getCEFRForSection(
      scoreRange,
      mode === "listening" ? "listening" : "reading",
    );
    const cefrLabel = cefr.spans ? `約 ${cefr.spans.join("-")}` : cefr.primary;

    return (
      <div className="space-y-4">
        <section className="rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 p-5 text-white shadow-md">
          <p className="text-xs uppercase tracking-widest text-emerald-200">Mock Test Result</p>
          <h1 className="mt-2 text-2xl font-bold">{config.headerTitle}成績</h1>
          <p className="mt-2 text-3xl font-bold">{rawScore}<span className="text-lg font-normal text-emerald-200">/100</span></p>
          <p className="mt-1 text-sm text-emerald-200">{config.examFlavor} 預測：{scoreRange.min}–{scoreRange.max} 分</p>
          <p className="mt-0.5 text-sm text-emerald-200">CEFR 等級：{cefrLabel}</p>
          <p className="mt-1 text-xs text-emerald-300">※ {PREDICTION_DISCLAIMER}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">各部分表現</h2>
          <PartBreakdownBars parts={config.parts} breakdown={partBreakdown} />
        </section>

        <ResultStatCards timeUsedMs={timeUsedMs} unansweredCount={unansweredIds.length} />

        {reviewSnapshotId && (
          <Link
            href={`/mock-review/${reviewSnapshotId}`}
            className="block w-full rounded-2xl bg-indigo-600 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm"
          >
            查看本次詳解
          </Link>
        )}

        <Link href="/" className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm">
          返回桌面
        </Link>
      </div>
    );
  }

  return <p className="py-10 text-center text-slate-500">載入中…</p>;
}
