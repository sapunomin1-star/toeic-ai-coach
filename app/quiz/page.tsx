"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { buildDailyPlan, getQuestionById } from "@/data/questions";
import {
  clearDailyPlan,
  clearWrongPracticePlan,
  getQuizPlan,
  getReviewableIds,
  saveAnswer,
  saveDailyPlan,
  saveQuizPlan,
} from "@/lib/storage";
import type { Choice, Question } from "@/types/question";
import { SKILL_LABELS } from "@/types/question";
import type { QuizPlanSource } from "@/lib/storage";

type Status = "loading" | "answering" | "answered" | "finished" | "no-plan";

const CHOICES: Choice[] = ["A", "B", "C", "D"];

export default function QuizPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [planIds, setPlanIds] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [submittedChoice, setSubmittedChoice] = useState<Choice | null>(null);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const submittedQuestionIds = useRef(new Set<string>());
  const questionStartTime = useRef<number>(0);
  const planSource = useRef<QuizPlanSource>("daily");

  useEffect(() => {
    const id = window.setTimeout(() => {
      const quizPlan = getQuizPlan();
      if (!quizPlan || quizPlan.plan.questionIds.length === 0) {
        setStatus("no-plan");
        return;
      }
      const { plan, source } = quizPlan;
      planSource.current = source;
      setPlanIds(plan.questionIds);
      setCursor(plan.cursor);
      if (plan.cursor >= plan.questionIds.length) {
        setStatus("finished");
      } else {
        questionStartTime.current = Date.now();
        setStatus("answering");
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // Start timer whenever a new question is presented
  useEffect(() => {
    if (status === "answering" && questionStartTime.current === 0) {
      questionStartTime.current = Date.now();
    }
  }, [status, cursor]);

  const currentQuestion: Question | undefined = useMemo(() => {
    if (planIds.length === 0) return undefined;
    const id = planIds[cursor];
    return id ? getQuestionById(id) : undefined;
  }, [planIds, cursor]);

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
    const startedAt = questionStartTime.current || Date.now();
    const responseTimeMs = Math.max(0, Date.now() - startedAt);
    const isCorrect = selected === currentQuestion.answer;
    saveAnswer({
      questionId: currentQuestion.id,
      userAnswer: selected,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      skill_tag: currentQuestion.skill_tag,
      answeredAt: new Date().toISOString(),
      responseTimeMs,
    });
    setSubmittedChoice(selected);
    setSessionStats((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setStatus("answered");
  }

  function handleNext() {
    const nextCursor = cursor + 1;
    const quizPlan = getQuizPlan();
    if (quizPlan) {
      saveQuizPlan(
        { ...quizPlan.plan, cursor: nextCursor },
        quizPlan.source
      );
    }
    setCursor(nextCursor);
    setSelected(null);
    setSubmittedChoice(null);
    questionStartTime.current = 0;

    if (nextCursor >= planIds.length) {
      if (planSource.current === "wrongbook") {
        clearWrongPracticePlan();
      }
      setStatus("finished");
    } else {
      questionStartTime.current = Date.now();
      setStatus("answering");
    }
  }

  function startFreshPlan() {
    const reviewIds = getReviewableIds().slice(0, 5);
    const plan = buildDailyPlan({ reviewIds });
    saveDailyPlan({
      questionIds: plan.map((q) => q.id),
      createdAt: new Date().toISOString(),
      cursor: 0,
    });
    router.push("/practice");
  }

  if (status === "loading") {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  if (status === "no-plan") {
    return (
      <div className="space-y-4 py-6 text-center">
        <p className="text-slate-600">目前沒有訓練計畫。</p>
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
    const accuracy =
      sessionStats.total === 0
        ? 0
        : Math.round((sessionStats.correct / sessionStats.total) * 100);
    return (
      <div className="space-y-5 py-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-md">
          <p className="text-sm">今日訓練完成 🎉</p>
          <p className="mt-2 text-3xl font-bold">{accuracy}%</p>
          <p className="mt-1 text-sm text-emerald-50">
            答對 {sessionStats.correct} / {sessionStats.total} 題
          </p>
        </div>
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
              clearDailyPlan();
              startFreshPlan();
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
        <p className="text-slate-600">找不到題目資料。</p>
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

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {cursor + 1} / {total}
          </span>
          <span>
            正確 {sessionStats.correct} / {sessionStats.total}
          </span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {currentQuestion.part}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {SKILL_LABELS[currentQuestion.skill_tag]}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {currentQuestion.difficulty}
          </span>
        </div>
      </div>

      {currentQuestion.passage && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            Part 7 · Reading Passage
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {currentQuestion.passage}
          </p>
        </div>
      )}

      {currentQuestion.transcript && (
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-600">
            {currentQuestion.part} · Transcript
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {currentQuestion.transcript}
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-base leading-relaxed text-slate-900">
          {currentQuestion.question}
        </p>
      </div>

      <ul className="space-y-2">
        {CHOICES.map((c) => {
          const isSelected = selected === c;
          const isCorrectChoice = c === currentQuestion.answer;
          const isUserChoice = submittedChoice === c;

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
            <li key={c}>
              <button
                disabled={isAnswered}
                onClick={() => setSelected(c)}
                className={classes}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                  {c}
                </span>
                {currentQuestion.choices[c]}
              </button>
            </li>
          );
        })}
      </ul>

      {isAnswered && (
        <div
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
          {currentQuestion.vocabulary && currentQuestion.vocabulary.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              關鍵字：{currentQuestion.vocabulary.join(" · ")}
            </p>
          )}
        </div>
      )}

      <div className="sticky bottom-3 z-10">
        {isAnswered ? (
          <button
            onClick={handleNext}
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white shadow-md active:scale-[0.99]"
          >
            {cursor + 1 >= total ? "完成今日訓練" : "下一題 →"}
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
