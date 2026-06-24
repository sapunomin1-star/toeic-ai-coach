"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import VocabularySpeechButton from "@/components/VocabularySpeechButton";
import {
  buildDailySession,
  getDailySessionActivity,
  getVocabularyProgress,
  markWordAgain,
  markWordFamiliar,
  markWordKnown,
} from "@/lib/vocabularyStorage";
import type {
  DailySession,
  DailySessionActivity,
  DailySessionBucket,
  VocabularyItem,
  VocabularyProgress,
  VocabularyStatus,
} from "@/types/vocabulary";

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

const BUCKET_LABEL: Record<DailySessionBucket, string> = {
  retry: "今日加強",
  due: "到期複習",
  masteredReview: "穩定複查",
  new: "新字",
};

const BUCKET_ICON: Record<DailySessionBucket, string> = {
  retry: "🔁",
  due: "🔄",
  masteredReview: "🎯",
  new: "📘",
};

export default function VocabularyPage() {
  const [session, setSession] = useState<DailySession | null>(null);
  const [progress, setProgress] = useState<VocabularyProgress[]>([]);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [activity, setActivity] = useState<DailySessionActivity>({
    reviewedCount: 0,
    validatedCount: 0,
    reinforcementCount: 0,
    reinforcementRound: 0,
    canReinforce: false,
    validatedIds: [],
    reinforcementIds: [],
  });

  useEffect(() => {
    const id = window.setTimeout(() => {
      setSession(buildDailySession());
      setProgress(getVocabularyProgress());
      setActivity(getDailySessionActivity());
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const progressMap = useMemo(
    () => new Map(progress.map((p) => [p.wordId, p])),
    [progress]
  );

  function refreshProgress(): void {
    setProgress(getVocabularyProgress());
    setSession(buildDailySession());
    setActivity(getDailySessionActivity());
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

  if (session === null) {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  const totalItems = session.items.length;
  const reviewedCount = Math.min(activity.reviewedCount, totalItems);
  const validatedCount = Math.min(activity.validatedCount, totalItems);
  const dailyValidationDone = totalItems > 0 && validatedCount === totalItems;

  function scheduleLabel(itemId: string, entry?: VocabularyProgress): string {
    if (!entry) return "📅 完成驗收後安排下次複習";
    if (entry.intervalDays !== 0) {
      return `📅 下次複習 ${entry.intervalDays} 天後${
        entry.consecutiveCorrect > 0 ? ` · 連對 ${entry.consecutiveCorrect} 次` : ""
      }`;
    }
    if (
      activity.reinforcementIds.includes(itemId) &&
      activity.canReinforce
    ) {
      return "📅 今日需加強";
    }
    if (activity.validatedIds.includes(itemId)) {
      return "📅 下次正式驗收優先出現";
    }
    return "📅 今日需驗收";
  }

  return (
    <div className="space-y-4">
      <header>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold">每日單字</h1>
            <p className="mt-0.5 text-xs text-slate-500">今日學習任務 · {totalItems} 字</p>
          </div>
          <Link href="/" className="text-xs text-slate-500 underline underline-offset-2">
            回首頁
          </Link>
        </div>
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {(["retry", "due", "masteredReview", "new"] as DailySessionBucket[]).map(
              (bucket) => (
                <div key={bucket} className="rounded-md bg-slate-50 px-3 py-2 text-slate-700">
                  <span className="mr-1.5 font-semibold text-indigo-600">
                    {BUCKET_ICON[bucket]}
                  </span>
                  {BUCKET_LABEL[bucket]}
                  <span className="ml-1.5 font-bold text-slate-900">
                    {session.counts[bucket]}
                  </span>
                </div>
              )
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-center">
            <div>
              <p className="text-[11px] text-slate-500">已閱讀</p>
              <p className="mt-0.5 text-base font-bold text-slate-900">
                {reviewedCount} / {totalItems}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">已驗收</p>
              <p className="mt-0.5 text-base font-bold text-indigo-700">
                {validatedCount} / {totalItems}
              </p>
            </div>
          </div>
          {session.warnings.newSuppressed && (
            <p className="mt-3 text-xs font-medium text-amber-700">
              ⚠️ 因到期與重試項目較多，今日不加入新字。
            </p>
          )}
          {session.warnings.retryDeferred > 0 && (
            <p className="mt-2 text-xs font-medium text-amber-700">
              ⚠️ {session.warnings.retryDeferred} 個加強項目排入明日複習。
            </p>
          )}
          {totalItems > 0 && !dailyValidationDone && (
            <Link
              href="/vocabulary-quiz"
              className="mt-3 block w-full rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm active:scale-[0.99]"
            >
              {validatedCount > 0 ? "繼續今日驗收 →" : "開始今日驗收 →"}
            </Link>
          )}
          {dailyValidationDone && activity.canReinforce && (
            <Link
              href="/vocabulary-quiz?mode=reinforcement"
              className="mt-3 block w-full rounded-lg bg-amber-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm active:scale-[0.99]"
            >
              開始今日加強（{activity.reinforcementCount} 字）→
            </Link>
          )}
          {dailyValidationDone &&
            activity.reinforcementCount > 0 &&
            !activity.canReinforce && (
              <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                今日加強已完成 2 輪；仍不熟的字會在下次複習優先出現。
              </p>
            )}
          {dailyValidationDone && activity.reinforcementCount === 0 && (
            <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
              今日驗收完成，沒有待加強單字。
            </p>
          )}
        </div>
      </header>

      {totalItems === 0 && (
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
        {session.items.map(({ item, bucket }) => {
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
              {/* Card front — pronunciation stays available before revealing meaning. */}
              <div className="flex items-stretch">
                <button
                  onClick={() => toggleReveal(item.id)}
                  aria-expanded={isRevealed}
                  className="min-w-0 flex-1 p-4 text-left"
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
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                      {BUCKET_LABEL[bucket]}
                    </span>
                    <span className="ml-auto text-xs text-slate-400">
                      {isRevealed ? "▲ 收起" : "▼ 查看解釋"}
                    </span>
                  </div>
                </button>
                <div className="flex shrink-0 items-center border-l border-slate-100 px-3">
                  <VocabularySpeechButton
                    text={item.word}
                    label={`${item.word} 單字發音`}
                  />
                </div>
              </div>

              {/* Card back — revealed on click */}
              {isRevealed && (
                <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.meaning_zh}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {item.example}
                  </p>
                  <div className="mt-2">
                    <VocabularySpeechButton
                      text={item.example}
                      label="朗讀例句"
                      variant="text"
                    />
                  </div>
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
                  <p className="mt-2 text-xs font-medium text-slate-500">
                    {scheduleLabel(item.id, entry)}
                  </p>

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
                      已有印象；完成跨日驗收後才會升為已掌握
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

      {totalItems > 0 && (
        <div className="space-y-3">
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
