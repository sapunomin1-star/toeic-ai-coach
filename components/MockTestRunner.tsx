"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import PartBreakdownBars from "@/components/PartBreakdownBars";
import {
  buildListeningMockPlan,
  buildMockTestPlan,
  getQuestionById,
} from "@/data/questions";
import { getAudioUrl, getImageUrl, getQuestionAudioUrl, hasMediaSupport } from "@/lib/media";
import { audioGroupKey, formatTime, getGroupPosition, makeBreakdown } from "@/lib/mockShared";
import {
  buildMockReviewSnapshot,
  saveMockReviewSnapshot,
} from "@/lib/mockReviewStorage";
import { getMockSeenQuestionIds, saveAnswer as saveDailyAnswer } from "@/lib/storage";
import {
  clearMockSession,
  getMockDurationMs,
  getMockSession,
  markAudioGroupPlayed,
  markQuestionAudioPlayed,
  saveAnswer as saveMockAnswer,
  saveMockResult,
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

type Phase = "preview" | "testing" | "result";

const READING_PARTS: MockPartKey[] = ["Part 5", "Part 6", "Part 7"];
const LISTENING_PARTS: MockPartKey[] = ["Part 1", "Part 2", "Part 3", "Part 4"];

/**
 * For Part 1/2 in *listening* mock only: the on-screen `question` text and
 * `choices` text ARE the spoken audio (e.g. Part 2's question stem +
 * three responses). Showing them lets the student read instead of listen,
 * which destroys the validity of the mock. Daily quiz mode is unaffected.
 */
function shouldHideTextForListening(mode: MockMode, q: Question): boolean {
  return mode === "listening" && (q.part === "Part 1" || q.part === "Part 2");
}

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
      buildPlan: buildListeningMockPlan,
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
    buildPlan: buildMockTestPlan,
  };
}

export default function MockTestRunner({ mode }: { mode: MockMode }) {
  const config = getConfig(mode);
  const [phase, setPhase] = useState<Phase>("preview");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Choice>>>({});
  const [endTime, setEndTime] = useState(0);
  const [remainingMs, setRemainingMs] = useState(config.durationMs);
  const [result, setResult] = useState<MockTestResult | null>(null);
  const submittedRef = useRef(false);
  const choiceKeys: Choice[] = ["A", "B", "C", "D"];

  function start() {
    try {
      const plan = config.buildPlan(getMockSeenQuestionIds());
      setQuestions(plan);
      const session = startMockSession(plan.map((q) => q.id), mode);
      setEndTime(new Date(session.endTime).getTime());
      resetForStart();
      setPhase("testing");
    } catch (e) {
      alert((e as Error).message);
    }
  }

  function goToQuestion(index: number) {
    const nextQuestion = questions[index];
    if (!nextQuestion) return;
    if (index !== currentIndex) {
      resetQuestionPacing();
    }
    syncActiveGroupOnNavigate(audioGroupKey(nextQuestion));
    setCurrentIndex(index);
  }

  function pick(questionId: string, choice: Choice) {
    const next = { ...answers, [questionId]: choice };
    setAnswers(next);
    saveMockAnswer(questionId, choice, mode);
  }

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    let correct = 0;
    const breakdown = makeBreakdown(config.parts);
    const unansweredIds = questions.map((q) => q.id).filter((id) => !answers[id]);

    for (const q of questions) {
      const p = q.part as MockPartKey;
      if (!breakdown[p]) breakdown[p] = { correct: 0, total: 0 };
      breakdown[p]!.total++;
      if (answers[q.id] === q.answer) {
        correct++;
        breakdown[p]!.correct++;
      }
    }

    // Save wrong answers to wrong book with mock source
    const now = new Date().toISOString();
    for (const q of questions) {
      const ua = answers[q.id];
      if (ua && ua !== q.answer) {
        saveDailyAnswer({
          questionId: q.id,
          userAnswer: ua,
          correctAnswer: q.answer,
          isCorrect: false,
          skill_tag: q.skill_tag,
          answeredAt: now,
          source: "mock",
        });
      }
    }

    const submittedTime = Date.now();
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
    const reviewSnapshot = buildMockReviewSnapshot({
      resultId,
      mode,
      questions,
      answers,
      startedAt,
      submittedAt: now,
    });
    if (saveMockReviewSnapshot(reviewSnapshot)) {
      mockResult.reviewSnapshotId = reviewSnapshot.id;
    }

    saveMockResult(mockResult, mode);
    clearMockSession(mode);
    setResult(mockResult);
    setPhase("result");
  }, [answers, config.durationMs, config.parts, endTime, mode, questions]);

  const onCountdownAdvance = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => Math.min(questions.length - 1, previous + 1));
    } else {
      submit();
    }
  }, [currentIndex, questions.length, submit]);

  const {
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
    resetForStart,
    hydrateFromSession,
  } = useMockAudioPacing({
    isTesting: phase === "testing",
    isListeningActive: mode === "listening",
    questions,
    currentIndex,
    persistAudioGroup: (groupKey) => markAudioGroupPlayed(groupKey, mode),
    persistQuestionAudio: (questionId) => markQuestionAudioPlayed(questionId, mode),
    onCountdownAdvance,
  });

  // Resume session
  useEffect(() => {
    const id = window.setTimeout(() => {
      const session = getMockSession(mode);
      if (session && !session.submittedAt) {
        const qs = session.questionIds
          .map((questionId) => getQuestionById(questionId))
          .filter((q): q is Question => Boolean(q));
        if (qs.length === session.questionIds.length) {
          setQuestions(qs);
          setAnswers(session.answers ?? {});
          setEndTime(new Date(session.endTime).getTime());
          hydrateFromSession({
            playedAudioGroups: session.playedAudioGroups,
            playedQuestionAudioIds: session.playedQuestionAudioIds,
          });
          setPhase("testing");
          return;
        }
      }
      clearMockSession(mode);
    }, 0);
    return () => window.clearTimeout(id);
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
            <li>• 答錯的題目會加入錯題本，未作答不進</li>
          </ul>
        </section>

        <button onClick={start} className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white active:scale-[0.99]">
          開始模擬考 →
        </button>

        <Link href="/" className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600">
          返回桌面
        </Link>
      </div>
    );
  }

  // ─── TESTING ──────────────────────────────────────────────────
  if (phase === "testing") {
    const q = questions[currentIndex];
    const low = remainingMs < 5 * 60 * 1000;

    if (!q) {
      return <p className="py-10 text-center text-slate-500">找不到題目資料。</p>;
    }

    const visibleChoices: Choice[] =
      q.choices.D === undefined ? ["A", "B", "C"] : choiceKeys;
    const questionText = q.question.trim() || "請聽音檔後選擇答案";
    const imageUrl = getImageUrl(q);
    const mediaSupport = hasMediaSupport(q);
    const groupKey = audioGroupKey(q);
    const groupPosition = getGroupPosition(questions, q);
    // Audio resolution: the pipeline uploads P3/P4 group audio only to the
    // canonical (smallest-id) member of each transcript group via the
    // `--group-primary` flag in pipeline/src/generate-audio.ts. The find()
    // below relies on plan-internal group ordering equalling full-bank ID
    // order, which holds today because:
    //   1. buildListeningMockPlan / buildMockTestPlan extract groups via
    //      groupByTranscript / groupByPassage (stable sort by question_order).
    //   2. New P3/P4 generated in commit 1d2768f lack question_order, so the
    //      sort tie-breaks by push order (= ID order in questions-generated.ts).
    // If a future plan builder shuffles group members, or new questions add a
    // non-trivial question_order that diverges from ID order, replace this
    // find() with getAudioOwnerQuestion() from app/quiz/page.tsx (full-bank
    // canonical lookup independent of plan order).
    const audioQuestion =
      q.part === "Part 3" || q.part === "Part 4"
        ? questions.find((candidate) => audioGroupKey(candidate) === groupKey) ?? q
        : q;
    const audioUrl = getAudioUrl(audioQuestion);
    const audioFailed = failedAudioGroups.has(groupKey);
    const audioAlreadyPlayed = playedGroups.has(groupKey);
    const audioIsActive = activeAudioGroup === groupKey;
    const hideText = shouldHideTextForListening(mode, q);
    const questionAudioUrl =
      mode === "listening" && q.part === "Part 3" ? getQuestionAudioUrl(q) : null;
    const enableP3MockPacing = questionAudioUrl !== null;
    const questionAudioPlayed = playedQuestionAudioIds.has(q.id);
    const questionAudioIsActive = activeQuestionAudioId === q.id;
    const questionAudioFailed = failedQuestionAudioIds.has(q.id);
    const countdownActive = countdownQuestionId === q.id;
    const conversationFinishedOrSkipped = audioAlreadyPlayed && !audioIsActive;
    const showQuestionAudio =
      enableP3MockPacing &&
      conversationFinishedOrSkipped &&
      !countdownActive &&
      !questionAudioFailed &&
      (!questionAudioPlayed || questionAudioIsActive);

    return (
      <div className="flex min-h-screen flex-col">
        {/* Timer */}
        <div role="timer" aria-live="off" className={`sticky top-0 z-10 border-b px-3 py-2 text-center font-mono text-lg font-bold ${low ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-800"}`}>
          {low && "⚠ "}{formatTime(remainingMs)}
        </div>

        {/* Nav */}
        <div className="border-b border-slate-100 bg-white px-2 py-2">
          <div className="flex flex-wrap gap-1">
            {questions.map((qq, i) => {
              const done = !!answers[qq.id];
              const cur = i === currentIndex;
              return (
                <button key={qq.id} onClick={() => goToQuestion(i)}
                  aria-label={`第 ${i + 1} 題${done ? "（已答）" : ""}`}
                  aria-current={cur ? "true" : undefined}
                  className={`flex h-7 w-7 items-center justify-center rounded text-[10px] font-medium ${cur ? "bg-slate-900 text-white" : done ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-slate-400">
            <span>已答 {Object.keys(answers).length} / {questions.length}</span>
            <span>
              {q.part}
              {groupPosition ? ` · 題組 ${groupPosition.index}/${groupPosition.total}` : ""}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 overflow-auto px-4 py-4">
          {imageUrl && (
            <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image
                src={imageUrl}
                alt={q.imageAlt ?? "TOEIC listening question image"}
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
                onError={() => markAudioGroupFailed(groupKey)}
              />
            </div>
          ) : audioUrl && audioAlreadyPlayed ? (
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-600">
              🔇 此段音檔已播放過，模擬考不可重播
            </div>
          ) : mediaSupport.audio ? (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
              ⚠ 音檔未載入
            </div>
          ) : null}

          {showQuestionAudio && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold text-slate-500">題目朗讀</p>
              <AudioPlayer
                key={`${q.id}-question-audio`}
                src={questionAudioUrl}
                autoPlay
                onPlaybackStart={() => handleQuestionAudioStarted(q.id)}
                onEnded={() => beginQuestionCountdown(q.id)}
                onError={() => handleQuestionAudioError(q.id)}
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

          {q.passage && (
            <div className="mb-4 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
              {q.passage}
            </div>
          )}

          {/* Note: transcript is intentionally NOT shown during mock testing.
              For listening mock, the goal is real-exam simulation — students
              must rely on the audio alone, not read transcripts mid-test. */}

          {hideText ? (
            <p className="text-sm font-medium text-slate-900">
              {currentIndex + 1}. 請依音檔內容選擇答案
            </p>
          ) : (
            <p className="text-sm font-medium text-slate-900">{currentIndex + 1}. {questionText}</p>
          )}

          {groupPosition && (
            <p className="mt-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {q.part} 題組題 {groupPosition.index}/{groupPosition.total}
            </p>
          )}

          <div className={hideText ? `mt-4 grid ${visibleChoices.length === 3 ? "grid-cols-3" : "grid-cols-4"} gap-3` : "mt-3 space-y-2"}>
            {visibleChoices.map((c) => {
              const sel = answers[q.id] === c;
              const choiceAudio = q.audioChoices?.[c];
              return (
                <div key={c} className="space-y-2">
                  {/* In listening mock, never expose per-choice audio replay
                      either — would let students re-hear individual responses. */}
                  {choiceAudio && mode !== "listening" && (
                    <AudioPlayer key={choiceAudio} src={choiceAudio} allowReplay />
                  )}
                  <button onClick={() => pick(q.id, c)}
                    aria-label={hideText ? `選擇答案 ${c}` : undefined}
                    aria-pressed={sel}
                    className={`block w-full rounded-xl border px-4 py-3 text-sm ${hideText ? "min-h-14 text-center text-base" : "text-left"} ${sel ? "border-indigo-300 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-700"}`}>
                    <span className="font-bold">{hideText ? c : `${c}.`}</span>
                    {hideText ? null : <> {q.choices[c]}</>}
                  </button>
                </div>
              );
            })}
          </div>
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

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">用時</p>
            <p className="mt-1 text-lg font-bold text-slate-800">{formatTime(timeUsedMs)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">未作答</p>
            <p className={`mt-1 text-lg font-bold ${unansweredIds.length > 0 ? "text-rose-600" : "text-slate-800"}`}>{unansweredIds.length} 題</p>
          </div>
        </section>

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
