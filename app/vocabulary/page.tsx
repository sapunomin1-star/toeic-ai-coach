"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getTodayVocabulary,
  getVocabularyProgress,
  markWordAgain,
  markWordFamiliar,
  markWordKnown,
} from "@/lib/vocabularyStorage";
import type { VocabularyItem, VocabularyProgress, VocabularyStatus } from "@/types/vocabulary";

const PART_LABELS: Record<VocabularyItem["partOfSpeech"], string> = {
  noun: "名詞",
  verb: "動詞",
  adjective: "形容詞",
  adverb: "副詞",
  phrase: "片語",
};

const STATUS_LABEL: Record<VocabularyStatus, string> = {
  new: "未學",
  seen: "見過",
  familiar: "有印象",
  mastered: "已掌握",
};

const STATUS_CLASS: Record<VocabularyStatus, string> = {
  new: "bg-slate-100 text-slate-600",
  seen: "bg-amber-100 text-amber-700",
  familiar: "bg-indigo-100 text-indigo-700",
  mastered: "bg-emerald-100 text-emerald-700",
};

export default function VocabularyPage() {
  const [words, setWords] = useState<VocabularyItem[] | null>(null);
  const [progress, setProgress] = useState<VocabularyProgress[]>([]);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = window.setTimeout(() => {
      setWords(getTodayVocabulary());
      setProgress(getVocabularyProgress());
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const progressMap = useMemo(
    () => new Map(progress.map((p) => [p.wordId, p])),
    [progress]
  );

  function refreshProgress(): void {
    setProgress(getVocabularyProgress());
    setWords(getTodayVocabulary());
  }

  function toggleReveal(wordId: string): void {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(wordId)) {
        next.delete(wordId);
      } else {
        next.add(wordId);
      }
      return next;
    });
  }

  function handleAgain(wordId: string): void {
    markWordAgain(wordId);
    refreshProgress();
  }

  function handleFamiliar(wordId: string): void {
    markWordFamiliar(wordId);
    refreshProgress();
  }

  function handleKnown(wordId: string): void {
    markWordKnown(wordId);
    refreshProgress();
  }

  if (words === null) {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  const masteredCount = words.filter(
    (w) => progressMap.get(w.id)?.status === "mastered"
  ).length;

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">每日單字</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            今日 {words.length} 個 · 已掌握 {masteredCount} 個
          </p>
        </div>
        <Link href="/" className="text-xs text-slate-500 underline underline-offset-2">
          回首頁
        </Link>
      </header>

      {words.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            今日單字已全部完成，繼續加油 💪
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/practice"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              開始今日訓練
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600"
            >
              查看個人報告
            </Link>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {words.map((item) => {
          const entry = progressMap.get(item.id);
          const status: VocabularyStatus = entry?.status ?? "new";
          const isRevealed = revealedIds.has(item.id);
          const isMastered = status === "mastered";

          return (
            <li
              key={item.id}
              className={`rounded-2xl border bg-white shadow-sm transition-all ${
                isMastered ? "border-emerald-200 opacity-70" : "border-slate-200"
              }`}
            >
              {/* Card front — always visible */}
              <button
                onClick={() => toggleReveal(item.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    {item.word}
                  </span>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                    {PART_LABELS[item.partOfSpeech]}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLASS[status]}`}
                  >
                    {STATUS_LABEL[status]}
                  </span>
                  <span className="ml-auto text-xs text-slate-400">
                    {isRevealed ? "▲ 收起" : "▼ 查看解釋"}
                  </span>
                </div>
              </button>

              {/* Card back — revealed on click */}
              {isRevealed && (
                <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.meaning_zh}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {item.example}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {item.example_zh}
                  </p>

                  {item.collocations && item.collocations.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.collocations.map((col) => (
                        <span
                          key={col}
                          className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5">
                      {item.difficulty}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5">
                      {item.category}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleAgain(item.id)}
                      className={`rounded-2xl border px-2 py-2.5 text-xs font-semibold ${
                        status === "seen"
                          ? "border-amber-300 bg-amber-50 text-amber-700"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      再複習
                    </button>
                    <button
                      onClick={() => handleFamiliar(item.id)}
                      className={`rounded-2xl border px-2 py-2.5 text-xs font-semibold ${
                        status === "familiar"
                          ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      有印象
                    </button>
                    <button
                      onClick={() => handleKnown(item.id)}
                      className={`rounded-2xl px-2 py-2.5 text-xs font-semibold ${
                        status === "mastered"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      認識了
                    </button>
                  </div>

                  {status === "familiar" && entry?.lastSelfCheckDate && (
                    <p className="mt-2 text-center text-xs text-indigo-500">
                      再次點「認識了」可升為已掌握（需隔天確認）
                    </p>
                  )}
                  {status === "mastered" && (
                    <p className="mt-2 text-center text-xs text-emerald-600">
                      已掌握
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {words.length > 0 && (
        <div className="space-y-3">
          <Link
            href="/vocabulary-quiz"
            className="block w-full rounded-2xl bg-indigo-600 px-5 py-4 text-center text-base font-semibold text-white shadow-sm active:scale-[0.99]"
          >
            開始單字小測驗 →
          </Link>
          <Link
            href="/dashboard"
            className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-600"
          >
            查看今日報告
          </Link>
        </div>
      )}
    </div>
  );
}
