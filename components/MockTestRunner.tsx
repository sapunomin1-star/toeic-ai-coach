"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import {
  buildListeningMockPlan,
  buildMockTestPlan,
  getQuestionById,
} from "@/data/questions";
import { getAudioUrl, getImageUrl, hasMediaSupport } from "@/lib/media";
import { saveAnswer as saveDailyAnswer } from "@/lib/storage";
import {
  clearMockSession,
  getMockDurationMs,
  getMockSession,
  markAudioGroupPlayed,
  saveAnswer as saveMockAnswer,
  saveMockResult,
  startMockSession,
} from "@/lib/mockStorage";
import type {
  MockMode,
  MockPartBreakdown,
  MockPartKey,
  MockTestResult,
} from "@/types/mock";
import type { Choice, Question } from "@/types/question";

type Phase = "preview" | "testing" | "result";

const READING_PARTS: MockPartKey[] = ["Part 5", "Part 6", "Part 7"];
const LISTENING_PARTS: MockPartKey[] = ["Part 1", "Part 2", "Part 3", "Part 4"];

function estimateScore(raw: number) {
  const pct = raw / 100;
  const mid = Math.round(5 + pct * 490);
  return { min: Math.max(5, mid - 30), max: Math.min(495, mid + 30) };
}

function defaultBreakdown(parts: MockPartKey[]): MockPartBreakdown {
  const init: MockPartBreakdown = {};
  for (const p of parts) init[p] = { correct: 0, total: 0 };
  return init;
}

/**
 * Audio-group identity for the "no replay" mock rule:
 * - Part 3/4: 3 questions share the same transcript → group by transcript string
 * - Part 1/2: each question has its own audio → group by question id
 *
 * Once a group plays through (onEnded), it is persisted into the mock session
 * so navigating back or refreshing the page does NOT re-trigger playback.
 */
function audioGroupKey(q: Question): string {
  if ((q.part === "Part 3" || q.part === "Part 4") && q.transcript) {
    return `${q.part}:${q.transcript}`;
  }
  return q.id;
}

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
  buildPlan: () => Question[];
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
  const [failedAudioIds, setFailedAudioIds] = useState<Set<string>>(new Set());
  const [playedGroups, setPlayedGroups] = useState<Set<string>>(new Set());
  const submittedRef = useRef(false);
  const choiceKeys: Choice[] = ["A", "B", "C", "D"];

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
          setPlayedGroups(new Set(session.playedAudioGroups ?? []));
          setPhase("testing");
          return;
        }
      }
      clearMockSession(mode);
    }, 0);
    return () => window.clearTimeout(id);
  }, [mode]);

  function start() {
    try {
      const plan = config.buildPlan();
      setQuestions(plan);
      const session = startMockSession(plan.map((q) => q.id), mode);
      setEndTime(new Date(session.endTime).getTime());
      setPlayedGroups(new Set());
      setPhase("testing");
    } catch (e) {
      alert((e as Error).message);
    }
  }

  function handleAudioEnded(groupKey: string) {
    if (playedGroups.has(groupKey)) return;
    setPlayedGroups((prev) => {
      const next = new Set(prev);
      next.add(groupKey);
      return next;
    });
    markAudioGroupPlayed(groupKey, mode);
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
    const breakdown = defaultBreakdown(config.parts);
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

    const remainingAtSubmit = Math.max(0, endTime - Date.now());
    const mockResult: MockTestResult = {
      id: `mock-${mode}-${Date.now()}`,
      mode,
      questionIds: questions.map((q) => q.id),
      answers,
      unansweredIds,
      startedAt: new Date(endTime - config.durationMs).toISOString(),
      endTime: new Date(endTime).toISOString(),
      submittedAt: now,
      rawScore: correct,
      scoreRange: estimateScore(correct),
      partBreakdown: breakdown,
      timeUsedMs: config.durationMs - remainingAtSubmit,
    };

    saveMockResult(mockResult, mode);
    clearMockSession(mode);
    setResult(mockResult);
    setPhase("result");
  }, [answers, config.durationMs, config.parts, endTime, mode, questions]);

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

  function fmt(ms: number) {
    const t = Math.ceil(ms / 1000);
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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

        <Link href="/dashboard" className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600">
          返回 Dashboard
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
    const audioUrl = getAudioUrl(q);
    const mediaSupport = hasMediaSupport(q);
    const audioFailed = failedAudioIds.has(q.id);
    const groupKey = audioGroupKey(q);
    const audioAlreadyPlayed = playedGroups.has(groupKey);
    const hideText = shouldHideTextForListening(mode, q);

    return (
      <div className="flex min-h-screen flex-col">
        {/* Timer */}
        <div role="timer" aria-live="off" className={`sticky top-0 z-10 border-b px-3 py-2 text-center font-mono text-lg font-bold ${low ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-800"}`}>
          {low && "⚠ "}{fmt(remainingMs)}
        </div>

        {/* Nav */}
        <div className="border-b border-slate-100 bg-white px-2 py-2">
          <div className="flex flex-wrap gap-1">
            {questions.map((qq, i) => {
              const done = !!answers[qq.id];
              const cur = i === currentIndex;
              return (
                <button key={qq.id} onClick={() => setCurrentIndex(i)}
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
            <span>{q.part}</span>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 overflow-auto px-4 py-4">
          {imageUrl && (
            <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={q.imageAlt ?? "TOEIC listening question image"}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {audioUrl && !audioFailed && !audioAlreadyPlayed ? (
            <div className="mb-4">
              <AudioPlayer
                key={`${audioUrl}-${groupKey}`}
                src={audioUrl}
                autoPlay
                onEnded={() => handleAudioEnded(groupKey)}
                onError={() =>
                  setFailedAudioIds((ids) => new Set(ids).add(q.id))
                }
              />
            </div>
          ) : audioUrl && audioAlreadyPlayed ? (
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-600">
              🔇 此段音檔已播放完畢，模擬考不可重播
            </div>
          ) : mediaSupport.audio ? (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
              ⚠ 音檔未載入
            </div>
          ) : null}

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

          <div className="mt-3 space-y-2">
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
                    aria-pressed={sel}
                    className={`block w-full rounded-xl border px-4 py-3 text-left text-sm ${sel ? "border-indigo-300 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-700"}`}>
                    <span className="font-bold">{c}.</span>
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
            <button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-30">
              ← 上一題
            </button>
            <span className="text-xs text-slate-400">{currentIndex + 1} / {questions.length}</span>
            {currentIndex < questions.length - 1 ? (
              <button onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
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
    const { rawScore, scoreRange, partBreakdown, unansweredIds, timeUsedMs } = result;

    return (
      <div className="space-y-4">
        <section className="rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 p-5 text-white shadow-md">
          <p className="text-xs uppercase tracking-widest text-emerald-200">Mock Test Result</p>
          <h1 className="mt-2 text-2xl font-bold">{config.headerTitle}成績</h1>
          <p className="mt-2 text-3xl font-bold">{rawScore}<span className="text-lg font-normal text-emerald-200">/100</span></p>
          <p className="mt-1 text-sm text-emerald-200">估算 TOEIC {config.examFlavor} 分數：{scoreRange.min}–{scoreRange.max}</p>
          <p className="mt-0.5 text-xs text-emerald-300">※ 非官方估算，僅供參考</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">各部分表現</h2>
          <div className="space-y-2">
            {config.parts.map((part) => {
              const d = partBreakdown[part];
              if (!d || d.total === 0) return null;
              const pct = Math.round((d.correct / d.total) * 100);
              return (
                <div key={part} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-medium text-slate-600">{part}</span>
                  <div className="flex-1"><div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-full ${d.correct / d.total >= 0.7 ? "bg-emerald-500" : "bg-rose-500"}`}
                      style={{ width: `${pct}%` }} />
                  </div></div>
                  <span className="w-24 text-right text-xs text-slate-500">{d.correct}/{d.total}（{pct}%）</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">用時</p>
            <p className="mt-1 text-lg font-bold text-slate-800">{fmt(timeUsedMs)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">未作答</p>
            <p className={`mt-1 text-lg font-bold ${unansweredIds.length > 0 ? "text-rose-600" : "text-slate-800"}`}>{unansweredIds.length} 題</p>
          </div>
        </section>

        <Link href="/dashboard" className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm">
          返回 Dashboard
        </Link>
      </div>
    );
  }

  return <p className="py-10 text-center text-slate-500">載入中…</p>;
}
