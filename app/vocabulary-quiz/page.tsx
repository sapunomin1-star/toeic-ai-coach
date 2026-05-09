"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  buildVocabularyQuiz,
  saveVocabularyQuizResult,
} from "@/lib/vocabularyStorage";
import type { VocabularyQuizQuestion } from "@/types/vocabulary";

type QuizState = "loading" | "answering" | "feedback" | "finished";

const TYPE_LABEL: Record<VocabularyQuizQuestion["type"], string> = {
  "en-to-zh": "英文選中文",
  "zh-to-en": "中文選英文",
  "fill-blank": "例句填空",
};

const CHOICE_LABELS = ["A", "B", "C", "D"] as const;

export default function VocabularyQuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("loading");
  const [questions, setQuestions] = useState<VocabularyQuizQuestion[]>([]);
  const [cursor, setCursor] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const id = window.setTimeout(() => {
      const qs = buildVocabularyQuiz();
      setQuestions(qs);
      setQuizState(qs.length === 0 ? "finished" : "answering");
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const current = questions[cursor];
  const isFeedback = quizState === "feedback";

  function handleSelect(index: number) {
    if (quizState !== "answering" || !current) return;
    const isCorrect = index === current.correctIndex;
    setSelectedIndex(index);
    saveVocabularyQuizResult(current.wordId, isCorrect);
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setQuizState("feedback");
  }

  function handleNext() {
    const next = cursor + 1;
    if (next >= questions.length) {
      setQuizState("finished");
    } else {
      setCursor(next);
      setSelectedIndex(null);
      setQuizState("answering");
    }
  }

  if (quizState === "loading") {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  if (quizState === "finished") {
    const pct =
      score.total === 0
        ? 0
        : Math.round((score.correct / score.total) * 100);
    const grade =
      pct >= 90
        ? "非常好！繼續保持。"
        : pct >= 70
          ? "不錯，繼續複習 familiar 單字。"
          : "多複習 seen 和 familiar 單字再來一次。";

    return (
      <div className="space-y-5 py-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-6 text-white shadow-md">
          <p className="text-sm">單字小測驗完成</p>
          <p className="mt-2 text-4xl font-bold">
            {score.correct} / {score.total}
          </p>
          <p className="mt-1 text-sm text-indigo-100">正確率 {pct}%</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-700">{grade}</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/vocabulary"
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white"
          >
            回每日單字
          </Link>
          <Link
            href="/dashboard"
            className="block w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center text-base font-semibold text-slate-700"
          >
            查看個人教練報告
          </Link>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const isCorrect = selectedIndex === current.correctIndex;
  const progress =
    ((cursor + (isFeedback ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-bold">單字小測驗</h1>
        <Link href="/vocabulary" className="text-xs text-slate-500 underline underline-offset-2">
          離開
        </Link>
      </header>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {cursor + 1} / {questions.length}
          </span>
          <span>正確 {score.correct}</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question type badge */}
      <div>
        <span className="inline-block rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
          {TYPE_LABEL[current.type]}
        </span>
      </div>

      {/* Prompt */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-base font-semibold leading-relaxed text-slate-900">
          {current.prompt}
        </p>
      </div>

      {/* Choices */}
      <ul className="space-y-2">
        {current.choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrectChoice = idx === current.correctIndex;

          let cls =
            "w-full rounded-2xl border px-4 py-3 text-left text-sm transition active:scale-[0.99]";
          if (isFeedback) {
            if (isCorrectChoice)
              cls += " border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (isSelected)
              cls += " border-rose-400 bg-rose-50 text-rose-900";
            else cls += " border-slate-200 bg-white text-slate-400";
          } else {
            cls += " border-slate-200 bg-white text-slate-800";
          }

          return (
            <li key={idx}>
              <button
                disabled={isFeedback}
                onClick={() => handleSelect(idx)}
                className={cls}
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                  {CHOICE_LABELS[idx]}
                </span>
                {choice}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Feedback */}
      {isFeedback && (
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
              正確：{current.choices[current.correctIndex]}
            </span>
          </p>
          <p className="mt-1.5 text-sm text-slate-700">
            <span className="font-semibold">{current.explanation.word}</span>
            {" ＝ "}
            {current.explanation.meaning_zh}
          </p>
          <p className="mt-1 text-xs italic text-slate-500">
            {current.explanation.example}
          </p>
        </div>
      )}

      {/* Next button (sticky) */}
      <div className="sticky bottom-3 z-10">
        {isFeedback && (
          <button
            onClick={handleNext}
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white shadow-md active:scale-[0.99]"
          >
            {cursor + 1 >= questions.length ? "完成測驗" : "下一題 →"}
          </button>
        )}
      </div>
    </div>
  );
}
