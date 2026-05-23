"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildMockTestPlan, getQuestionById } from "@/data/questions";
import { saveAnswer as saveDailyAnswer } from "@/lib/storage";
import {
  clearMockSession,
  getMockSession,
  saveAnswer as saveMockAnswer,
  saveMockResult,
  startMockSession,
} from "@/lib/mockStorage";
import type { MockPartKey, MockTestResult } from "@/types/mock";
import type { Choice, Question } from "@/types/question";

type Phase = "preview" | "testing" | "result";

const DURATION_MS = 75 * 60 * 1000;

function estimateScore(raw: number) {
  const pct = raw / 100;
  const mid = Math.round(5 + pct * 490);
  return { min: Math.max(5, mid - 30), max: Math.min(495, mid + 30) };
}

function partLabel(q: Question): MockPartKey {
  if (q.part === "Part 5") return "Part 5";
  if (q.part === "Part 6") return "Part 6";
  return "Part 7";
}

export default function MockTestPage() {
  const [phase, setPhase] = useState<Phase>("preview");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Choice>>>({});
  const [endTime, setEndTime] = useState(0);
  const [remainingMs, setRemainingMs] = useState(DURATION_MS);
  const [result, setResult] = useState<MockTestResult | null>(null);
  const submittedRef = useRef(false);

  // Resume session
  useEffect(() => {
    const id = window.setTimeout(() => {
      const session = getMockSession();
      if (session && !session.submittedAt) {
        const qs = session.questionIds
          .map((questionId) => getQuestionById(questionId))
          .filter((q): q is Question => Boolean(q));
        if (qs.length === session.questionIds.length) {
          setQuestions(qs);
          setAnswers(session.answers ?? {});
          setEndTime(new Date(session.endTime).getTime());
          setPhase("testing");
          return;
        }
      }
      clearMockSession();
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function start() {
    try {
      const plan = buildMockTestPlan();
      setQuestions(plan);
      const session = startMockSession(plan.map((q) => q.id));
      setEndTime(new Date(session.endTime).getTime());
      setPhase("testing");
    } catch (e) {
      alert((e as Error).message);
    }
  }

  function pick(questionId: string, choice: Choice) {
    const next = { ...answers, [questionId]: choice };
    setAnswers(next);
    saveMockAnswer(questionId, choice);
  }

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    let correct = 0;
    const breakdown: MockTestResult["partBreakdown"] = {
      "Part 5": { correct: 0, total: 0 },
      "Part 6": { correct: 0, total: 0 },
      "Part 7": { correct: 0, total: 0 },
    };
    const unansweredIds = questions.map((q) => q.id).filter((id) => !answers[id]);

    for (const q of questions) {
      const p = partLabel(q);
      breakdown[p].total++;
      if (answers[q.id] === q.answer) {
        correct++;
        breakdown[p].correct++;
      }
    }

    // Save wrong answers to wrong book
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
      id: `mock-${Date.now()}`,
      questionIds: questions.map((q) => q.id),
      answers,
      unansweredIds,
      startedAt: new Date(endTime - DURATION_MS).toISOString(),
      endTime: new Date(endTime).toISOString(),
      submittedAt: now,
      rawScore: correct,
      scoreRange: estimateScore(correct),
      partBreakdown: breakdown,
      timeUsedMs: DURATION_MS - remainingAtSubmit,
    };

    saveMockResult(mockResult);
    clearMockSession();
    setResult(mockResult);
    setPhase("result");
  }, [answers, endTime, questions]);

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
          <p className="text-xs uppercase tracking-widest text-slate-400">TOEIC Reading Mock Test</p>
          <h1 className="mt-2 text-2xl font-bold">模擬考試</h1>
          <p className="mt-2 text-sm text-slate-300">100 題 · 75 分鐘 · 完整 Reading 體驗</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold">考試說明</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>📝 <b>Part 5</b> — 句子填空 30 題</li>
            <li>📋 <b>Part 6</b> — 段落填空 16 題（4 篇）</li>
            <li>📄 <b>Part 7</b> — 閱讀理解 54 題（單篇 + 雙篇 + 三篇）</li>
          </ul>
          <ul className="mt-3 space-y-1 text-xs text-slate-500">
            <li>• 75 分鐘限時，時間到自動交卷</li>
            <li>• 可點擊題號跳題作答</li>
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
            <span>{partLabel(q)}</span>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 overflow-auto px-4 py-4">
          {q.passage && (
            <div className="mb-4 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
              {q.passage}
            </div>
          )}

          <p className="text-sm font-medium text-slate-900">{currentIndex + 1}. {q.question}</p>

          <div className="mt-3 space-y-2">
            {(["A", "B", "C", "D"] as Choice[]).map((c) => {
              const sel = answers[q.id] === c;
              return (
                <button key={c} onClick={() => pick(q.id, c)}
                  aria-pressed={sel}
                  className={`block w-full rounded-xl border px-4 py-3 text-left text-sm ${sel ? "border-indigo-300 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-700"}`}>
                  <span className="font-bold">{c}.</span> {q.choices[c]}
                </button>
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
          <h1 className="mt-2 text-2xl font-bold">模擬考成績</h1>
          <p className="mt-2 text-3xl font-bold">{rawScore}<span className="text-lg font-normal text-emerald-200">/100</span></p>
          <p className="mt-1 text-sm text-emerald-200">估算 TOEIC Reading 分數：{scoreRange.min}–{scoreRange.max}</p>
          <p className="mt-0.5 text-xs text-emerald-300">※ 非官方估算，僅供參考</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">各部分表現</h2>
          <div className="space-y-2">
            {Object.entries(partBreakdown).map(([part, d]) => (
              <div key={part} className="flex items-center gap-3">
                <span className="w-16 text-xs font-medium text-slate-600">{part}</span>
                <div className="flex-1"><div className="h-2 rounded-full bg-slate-100">
                  <div className={`h-full ${d.correct / d.total >= 0.7 ? "bg-emerald-500" : "bg-rose-500"}`}
                    style={{ width: `${(d.correct / d.total) * 100}%` }} />
                </div></div>
                <span className="w-24 text-right text-xs text-slate-500">{d.correct}/{d.total}（{Math.round(d.correct / d.total * 100)}%）</span>
              </div>
            ))}
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
