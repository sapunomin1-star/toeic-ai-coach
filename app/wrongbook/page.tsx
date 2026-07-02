"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getQuestionById } from "@/data/questions";
import {
  clearWrongAnswers,
  getWrongBookEntries,
  removeSingleWrong,
  saveWrongPracticePlan,
} from "@/lib/storage";
import type { SkillTag, WrongBookStatus } from "@/types/question";
import { SKILL_LABELS } from "@/types/question";
import type { WrongBookEntry } from "@/lib/storage";
import Link from "next/link";

const STATUS_LABEL: Record<WrongBookStatus, string> = {
  new: "待複習",
  reviewing: "複習中",
  improving: "進步中",
  mastered: "已掌握",
};

const STATUS_CLASSES: Record<WrongBookStatus, string> = {
  new: "bg-rose-100 text-rose-700",
  reviewing: "bg-orange-100 text-orange-700",
  improving: "bg-amber-100 text-amber-700",
  mastered: "bg-emerald-100 text-emerald-700",
};

export default function WrongBookPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<WrongBookEntry[] | null>(null);

  useEffect(() => {
    const id = window.setTimeout(
      () => setEntries(getWrongBookEntries()),
      0
    );
    return () => window.clearTimeout(id);
  }, []);

  function handleClear() {
    const ok = window.confirm(
      "確定要清除所有錯題/複習紀錄嗎？AnswerRecord 歷史仍保留，僅清除錯題狀態與手動複習清單。"
    );
    if (!ok) return;
    clearWrongAnswers();
    setEntries([]);
  }

  function handleRemove(questionId: string) {
    removeSingleWrong(questionId);
    setEntries((prev) =>
      prev ? prev.filter((e) => e.questionId !== questionId) : prev
    );
  }

  function handlePracticeWrongQuestions() {
    if (!entries || entries.length === 0) return;
    const reviewIds = entries
      .filter((e) => e.status !== "mastered")
      .map((e) => e.questionId)
      .slice(0, 25);
    const questions = reviewIds
      .map((id) => getQuestionById(id))
      .filter(Boolean);
    if (questions.length === 0) return;
    saveWrongPracticePlan({
      questionIds: questions.map((q) => q!.id),
      createdAt: new Date().toISOString(),
      cursor: 0,
    });
    router.push("/quiz");
  }

  if (entries === null) {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  // Group by skill_tag
  const grouped = new Map<SkillTag, WrongBookEntry[]>();
  for (const entry of entries) {
    const list = grouped.get(entry.skill_tag) ?? [];
    list.push(entry);
    grouped.set(entry.skill_tag, list);
  }

  // Sort groups by count desc
  const sortedGroups = [...grouped.entries()].sort(
    (a, b) => b[1].length - a[1].length
  );

  const reviewableCount = entries.filter(
    (e) => e.status !== "mastered"
  ).length;

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">錯題本</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            {entries.length} 題 · 待複習 {reviewableCount} 題
          </p>
        </div>
        <Link
          href="/"
          className="text-xs text-slate-500 underline underline-offset-2"
        >
          回首頁
        </Link>
      </header>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          目前沒有錯題或手動複習題，繼續加油 💪
        </div>
      ) : (
        <>
          {reviewableCount > 0 && (
            <div className="space-y-1.5">
              <button
                onClick={handlePracticeWrongQuestions}
                className="block w-full rounded-2xl bg-indigo-600 px-5 py-4 text-center text-base font-semibold text-white shadow-sm active:scale-[0.99]"
              >
                練習目前複習題（{reviewableCount} 題）
              </button>
              <p className="text-center text-xs text-slate-400">
                提前練習不影響複習排程；需在到期日後答對才會升級狀態。
              </p>
            </div>
          )}

          {sortedGroups.map(([skill, skillEntries]) => (
            <section key={skill}>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  {SKILL_LABELS[skill]}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  {skillEntries.length} 題
                </span>
              </div>
              <ul className="space-y-3">
                {skillEntries
                  .sort(
                    (a, b) =>
                      new Date(b.lastAnsweredAt).getTime() -
                      new Date(a.lastAnsweredAt).getTime()
                  )
                  .map((entry) => {
                    const q = getQuestionById(entry.questionId);
                    const date = new Date(entry.lastAnsweredAt);
                    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                    return (
                      <li
                        key={entry.questionId}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span
                            className={`rounded-full px-2 py-0.5 font-medium ${STATUS_CLASSES[entry.status]}`}
                          >
                            {STATUS_LABEL[entry.status]}
                          </span>
                          {q && (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                              {q.part}
                            </span>
                          )}
                          {entry.source === "manual" && (
                            <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
                              手動加入複習
                            </span>
                          )}
                          <span className="ml-auto text-slate-400">
                            {dateStr}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-slate-900">
                          {q ? q.question : "(題目資料已遺失)"}
                        </p>

                        {q && (
                          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="rounded-lg bg-rose-50 px-3 py-2 text-rose-800">
                              <p className="font-semibold">你的答案</p>
                              <p className="mt-0.5">
                                {entry.userAnswer
                                  ? `${entry.userAnswer}. ${q.choices[entry.userAnswer]}`
                                  : "未作答 / 自行加入"}
                              </p>
                            </div>
                            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-800">
                              <p className="font-semibold">正確答案</p>
                              <p className="mt-0.5">
                                {entry.correctAnswer}.{" "}
                                {q.choices[entry.correctAnswer]}
                              </p>
                            </div>
                          </div>
                        )}

                        {q && (
                          <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-slate-600">
                            {q.explanation_zh}
                          </p>
                        )}

                        <button
                          onClick={() => handleRemove(entry.questionId)}
                          className="mt-3 text-xs text-slate-400 underline underline-offset-2"
                        >
                          移除此題
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </>
      )}

      <div className="pt-2">
        <button
          onClick={handleClear}
          disabled={entries.length === 0}
          className={`w-full rounded-2xl px-4 py-3 text-center text-sm font-medium ${
            entries.length === 0
              ? "border border-slate-200 bg-white text-slate-400"
              : "border border-rose-200 bg-white text-rose-600"
          }`}
        >
          清除所有錯題/複習紀錄
        </button>
      </div>
    </div>
  );
}
