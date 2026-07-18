"use client";

import type { Choice, Question } from "@/types/question";

/**
 * The collapsible question-overview grid body shared by the mock runners.
 * `startIndex` is the absolute index of `questions[0]` within the exam, so
 * the full-mock reading section can number its buttons 101–200.
 */
export default function MockQuestionGrid({
  questions,
  startIndex,
  currentIndex,
  answers,
  onSelect,
  ariaLabel,
}: {
  questions: Question[];
  startIndex: number;
  currentIndex: number;
  answers: Partial<Record<string, Choice>>;
  onSelect: (index: number) => void;
  ariaLabel: string;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className="grid grid-cols-6 gap-1.5 border-t border-slate-100 px-2 py-3 sm:grid-cols-10"
    >
      {questions.map((question, offset) => {
        const index = startIndex + offset;
        const done = Boolean(answers[question.id]);
        const current = index === currentIndex;
        return (
          <button
            key={question.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`第 ${index + 1} 題${done ? "（已答）" : ""}`}
            aria-current={current ? "true" : undefined}
            className={`flex min-h-11 w-full items-center justify-center rounded-lg text-xs font-semibold ${
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
    </nav>
  );
}
