"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BankLoadError from "@/components/BankLoadError";
import VocabularySpeechButton from "@/components/VocabularySpeechButton";
import {
  buildDailySession,
  getDailySessionActivity,
  getDueBacklog,
  getVocabularyProgress,
  getVocabularyStudyQueue,
  loadVocabularyBank,
  markWordAgain,
  markWordFamiliar,
  markWordKnown,
} from "@/lib/vocabularyStorage";
import {
  dismissVocabularyQueueTerm,
  type VocabularyQueueEntry,
} from "@/lib/vocabularyQueue";
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

export default function VocabularyPage() {
  const [session, setSession] = useState<DailySession | null>(null);
  const [progress, setProgress] = useState<VocabularyProgress[]>([]);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backlogCount, setBacklogCount] = useState(0);
  const [queue, setQueue] = useState<VocabularyQueueEntry[]>([]);
  const [activity, setActivity] = useState<DailySessionActivity>({
    reviewedCount: 0,
    validatedCount: 0,
    validatedCorrectCount: 0,
    validatedWrongCount: 0,
    reinforcementCount: 0,
    reinforcementRound: 0,
    canReinforce: false,
    validatedIds: [],
    reinforcementIds: [],
  });

  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await loadVocabularyBank();
      } catch (error) {
        console.error("[vocabulary] failed to load vocabulary bank:", error);
        if (!cancelled) setLoadError(true);
        return;
      }
      if (cancelled) return;
      setSession(buildDailySession());
      setProgress(getVocabularyProgress());
      setActivity(getDailySessionActivity());
      setBacklogCount(getDueBacklog().length);
      setQueue(getVocabularyStudyQueue());
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const progressMap = useMemo(
    () => new Map(progress.map((p) => [p.wordId, p])),
    [progress]
  );

  function refreshProgress(): void {
    setProgress(getVocabularyProgress());
    setSession(buildDailySession());
    setActivity(getDailySessionActivity());
    setBacklogCount(getDueBacklog().length);
    setQueue(getVocabularyStudyQueue());
  }

  function handleDismissQueued(term: string): void {
    if (dismissVocabularyQueueTerm(term)) setQueue(getVocabularyStudyQueue());
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
    moveForward();
  }

  function handleFamiliar(wordId: string): void {
    markWordFamiliar(wordId);
    refreshProgress();
    moveForward();
  }

  function handleKnown(wordId: string): void {
    markWordKnown(wordId);
    refreshProgress();
    moveForward();
  }

  function moveForward(): void {
    setCurrentIndex((index) =>
      Math.min(index + 1, Math.max(0, (session?.items.length ?? 1) - 1)),
    );
  }

  if (loadError) {
    return <BankLoadError bankLabel="單字庫" />;
  }

  if (session === null) {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  const totalItems = session.items.length;
  const displayedIndex = Math.min(currentIndex, Math.max(0, totalItems - 1));
  const reviewedCount = Math.min(activity.reviewedCount, totalItems);
  const validatedCount = Math.min(activity.validatedCount, totalItems);
  const dailyValidationDone = totalItems > 0 && validatedCount === totalItems;

  function scheduleLabel(itemId: string, entry?: VocabularyProgress): string {
    if (!entry) return "完成驗收後安排下次複習";
    if (entry.intervalDays !== 0) {
      return `下次複習 ${entry.intervalDays} 天後${
        entry.consecutiveCorrect > 0 ? ` · 連對 ${entry.consecutiveCorrect} 次` : ""
      }`;
    }
    if (
      activity.reinforcementIds.includes(itemId) &&
      activity.canReinforce
    ) {
      return "今日需加強";
    }
    if (activity.validatedIds.includes(itemId)) {
      return "下次正式驗收優先出現";
    }
    return "今日需驗收";
  }

  const activeSessionItem = session.items[displayedIndex] ?? null;
  const activeItem = activeSessionItem?.item ?? null;
  const activeBucket = activeSessionItem?.bucket ?? null;
  const activeEntry = activeItem ? progressMap.get(activeItem.id) : undefined;
  const activeStatus: VocabularyStatus = activeEntry?.status ?? "new";
  const activeRevealed = activeItem ? revealedIds.has(activeItem.id) : false;

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] p-6 text-white shadow-[0_22px_60px_rgba(24,33,27,0.16)] sm:p-8">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[var(--brand)] opacity-35 blur-3xl"
        />
        <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--signal)]">
              Daily word deck
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              每次專注一個字。
            </h1>
            <p className="text-pretty mt-2 max-w-lg text-sm leading-6 text-white/60">
              先猜意思、再翻面確認；自評只建立記憶線索，正式驗收才決定間隔複習。
            </p>
          </div>
          <div className="flex gap-2">
            <HeaderMetric label="已閱讀" value={`${reviewedCount} / ${totalItems}`} />
            <HeaderMetric label="已驗收" value={`${validatedCount} / ${totalItems}`} signal />
          </div>
        </div>
        <div
          className="relative mt-6 h-1.5 overflow-hidden rounded-full bg-white/12"
          role="progressbar"
          aria-label="今日單字閱讀進度"
          aria-valuemin={0}
          aria-valuemax={Math.max(1, totalItems)}
          aria-valuenow={reviewedCount}
        >
          <div
            className="h-full rounded-full bg-[var(--signal)] transition-[width]"
            style={{ width: `${totalItems === 0 ? 0 : (reviewedCount / totalItems) * 100}%` }}
          />
        </div>
      </header>

      <section className="product-surface rounded-[1.75rem] p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(["retry", "due", "masteredReview", "new"] as DailySessionBucket[]).map(
            (bucket) => (
              <div key={bucket} className="rounded-2xl bg-[var(--canvas)] p-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
                  {BUCKET_LABEL[bucket]}
                </p>
                <p className="number-tabular mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--ink)]">
                  {session.counts[bucket]}
                </p>
              </div>
            ),
          )}
        </div>
        {(session.warnings.newSuppressed ||
          session.warnings.retryDeferred > 0 ||
          (session.warnings.dueDeferred ?? 0) > 0 ||
          (session.warnings.masteredReviewDeferred ?? 0) > 0) && (
          <div className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
            {session.warnings.newSuppressed && (
              <p>到期與重試項目較多，今天先不加入新字。</p>
            )}
            {session.warnings.retryDeferred > 0 && (
              <p>{session.warnings.retryDeferred} 個加強項目超過今日上限，未排入核心課表。</p>
            )}
            {(session.warnings.dueDeferred ?? 0) > 0 && (
              <p>
                到期複習共 {session.counts.due + (session.warnings.dueDeferred ?? 0)} 字：核心課表安排{" "}
                {session.counts.due} 字，延後 {session.warnings.dueDeferred} 字
                {(session.warnings.oldestDeferredDays ?? 0) > 0
                  ? `（最久已延後 ${session.warnings.oldestDeferredDays} 天）`
                  : ""}
                。
              </p>
            )}
            {(session.warnings.masteredReviewDeferred ?? 0) > 0 && (
              <p>{session.warnings.masteredReviewDeferred} 個已掌握字的到期複查延後。</p>
            )}
          </div>
        )}
        {(session.warnings.queuedPrioritized ?? 0) > 0 && (
          <p className="mt-3 rounded-2xl bg-indigo-50 px-4 py-3 text-xs leading-5 text-indigo-800">
            {session.warnings.queuedPrioritized} 個你在題目裡標記不熟的字，已優先排入今日新字。
          </p>
        )}
        {backlogCount > 0 && (
          <Link
            href="/vocabulary-quiz?mode=backlog"
            className="product-interactive mt-3 flex min-h-12 w-full items-center justify-between rounded-xl border border-amber-300 bg-amber-50 px-4 text-sm font-black text-amber-900 active:scale-[0.99]"
          >
            補做 {backlogCount} 個延後的到期複習（可分段）
            <span aria-hidden="true">→</span>
          </Link>
        )}
        {validatedCount > 0 && (
          <p className="mt-3 text-xs font-bold text-[var(--muted)]">
            今日已測 {validatedCount} 字：答對 {activity.validatedCorrectCount} · 待加強{" "}
            {activity.validatedWrongCount}
          </p>
        )}
        {totalItems > 0 && !dailyValidationDone && (
          <Link
            href="/vocabulary-quiz"
            className="product-interactive mt-3 flex min-h-12 w-full items-center justify-between rounded-xl bg-[var(--brand)] px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(49,89,223,0.18)] active:scale-[0.99]"
          >
            {validatedCount > 0 ? "繼續今日正式驗收" : "完成閃卡後進入正式驗收"}
            <span aria-hidden="true">→</span>
          </Link>
        )}
        {dailyValidationDone && activity.canReinforce && (
          <Link
            href="/vocabulary-quiz?mode=reinforcement"
            className="product-interactive mt-3 flex min-h-12 w-full items-center justify-between rounded-xl bg-amber-500 px-4 text-sm font-black text-amber-950 active:scale-[0.99]"
          >
            加強剛才不熟的 {activity.reinforcementCount} 字
            <span aria-hidden="true">→</span>
          </Link>
        )}
        {dailyValidationDone && activity.reinforcementCount > 0 && !activity.canReinforce && (
          <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800">
            今日加強已完成 2 輪；仍不熟的字會在下次複習優先出現。
          </p>
        )}
        {dailyValidationDone && activity.reinforcementCount === 0 && (
          <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            今日驗收完成，沒有待加強單字。
          </p>
        )}
      </section>

      {totalItems === 0 && (
        <div className="product-surface rounded-[1.75rem] p-8 text-center">
          <p className="text-lg font-black text-[var(--ink)]">今天的單字已完成</p>
          <p className="mt-1 text-sm text-[var(--muted)]">把剛建立的記憶帶進題目情境裡。</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Link
              href="/practice"
              className="rounded-xl bg-[var(--ink)] px-5 py-3 text-sm font-black text-white"
            >
              開始今日訓練
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-[var(--line)] bg-white px-5 py-3 text-sm font-black text-[var(--ink)]"
            >
              查看個人報告
            </Link>
          </div>
        </div>
      )}

      {activeItem && activeBucket && (
        <section className="product-surface overflow-hidden rounded-[2rem]">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand)]">
                {BUCKET_LABEL[activeBucket]}
              </p>
              <p className="number-tabular mt-0.5 text-xs font-bold text-[var(--muted)]">
                {displayedIndex + 1} / {totalItems}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1.5 text-[10px] font-black ${STATUS_CLASS[activeStatus]}`}>
              {STATUS_LABEL[activeStatus]}
            </span>
          </div>

          <div className="px-5 py-8 text-center sm:px-8 sm:py-10">
            <div className="flex items-center justify-center gap-3">
              <p className="break-words text-4xl font-black tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
                {activeItem.word}
              </p>
              <VocabularySpeechButton
                text={activeItem.word}
                label={`${activeItem.word} 單字發音`}
              />
            </div>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
              {PART_LABELS[activeItem.partOfSpeech]} · {activeItem.difficulty}
            </p>

            {!activeRevealed ? (
              <button
                onClick={() => toggleReveal(activeItem.id)}
                aria-expanded={false}
                className="product-interactive mx-auto mt-10 min-h-14 w-full max-w-sm rounded-2xl bg-[var(--ink)] px-5 text-sm font-black text-white shadow-[0_16px_34px_rgba(24,33,27,0.16)] active:scale-[0.99]"
              >
                想好意思了，翻面確認
              </button>
            ) : (
              <div className="mx-auto mt-8 max-w-xl text-left">
                <div className="rounded-2xl bg-[var(--canvas)] p-5">
                  <p className="text-xl font-black text-[var(--ink)]">{activeItem.meaning_zh}</p>
                  <div className="mt-5 border-l-2 border-[var(--brand)] pl-4">
                    <p className="text-pretty text-sm font-semibold leading-6 text-[var(--ink)]">
                      {activeItem.example}
                    </p>
                    <div className="mt-2">
                      <VocabularySpeechButton text={activeItem.example} label="朗讀例句" variant="text" />
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{activeItem.example_zh}</p>
                  </div>
                  {activeItem.collocations && activeItem.collocations.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {activeItem.collocations.map((collocation) => (
                        <span
                          key={collocation}
                          className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-amber-800"
                        >
                          {collocation}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="mt-4 text-center text-[11px] font-bold text-[var(--muted)]">
                  {scheduleLabel(activeItem.id, activeEntry)}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <RatingButton
                    label="再複習"
                    detail="還想不起來"
                    active={activeStatus === "seen"}
                    tone="amber"
                    onClick={() => handleAgain(activeItem.id)}
                  />
                  <RatingButton
                    label="有印象"
                    detail="需要提示"
                    active={activeStatus === "familiar"}
                    tone="blue"
                    onClick={() => handleFamiliar(activeItem.id)}
                  />
                  <RatingButton
                    label="認識了"
                    detail="能自己想起"
                    active={activeStatus === "mastered"}
                    tone="dark"
                    onClick={() => handleKnown(activeItem.id)}
                  />
                </div>
                {activeStatus === "familiar" && activeEntry?.lastSelfCheckDate && (
                  <p className="mt-3 text-center text-xs text-[var(--brand)]">
                    已有印象；完成跨日驗收後才會升為已掌握。
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center border-t border-[var(--line)] px-4 py-3">
            <button
              onClick={() => setCurrentIndex(Math.max(0, displayedIndex - 1))}
              disabled={displayedIndex === 0}
              className="min-h-10 justify-self-start px-2 text-xs font-black text-[var(--muted)] disabled:opacity-25"
            >
              ← 上一個
            </button>
            <span className="text-[10px] font-bold text-[var(--muted)]">評分後會自動前進</span>
            <button
              onClick={() => setCurrentIndex(Math.min(totalItems - 1, displayedIndex + 1))}
              disabled={displayedIndex >= totalItems - 1}
              className="min-h-10 justify-self-end px-2 text-xs font-black text-[var(--muted)] disabled:opacity-25"
            >
              下一個 →
            </button>
          </div>
        </section>
      )}

      {totalItems > 0 && (
        <details className="product-surface group rounded-[1.5rem]">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-black text-[var(--ink)] sm:px-5">
            查看今日完整單字清單
            <span className="text-xs text-[var(--muted)]">{totalItems} 字 ＋</span>
          </summary>
          <ol className="max-h-80 divide-y divide-[var(--line)] overflow-auto border-t border-[var(--line)] px-2 py-1">
            {session.items.map(({ item, bucket }, index) => {
              const status = progressMap.get(item.id)?.status ?? "new";
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentIndex(index)}
                    className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left ${
                      index === displayedIndex ? "bg-[var(--canvas)]" : "hover:bg-[var(--canvas)]"
                    }`}
                  >
                    <span className="number-tabular w-6 text-[10px] font-bold text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-black text-[var(--ink)]">{item.word}</span>
                    <span className="hidden text-[10px] font-bold text-[var(--muted)] sm:block">
                      {BUCKET_LABEL[bucket]}
                    </span>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-black ${STATUS_CLASS[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </details>
      )}

      {queue.length > 0 && (
        <section className="product-surface rounded-[1.5rem] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
                Flagged in questions
              </p>
              <h2 className="mt-1 text-lg font-black tracking-[-0.02em] text-[var(--ink)]">
                待學清單 · {queue.length} 個
              </h2>
            </div>
            <p className="text-[11px] leading-4 text-[var(--muted)] sm:max-w-[16rem] sm:text-right">
              有字卡的字會提前到今天複習；沒有字卡的字只保留本題釋義，記住了就移除。
            </p>
          </div>
          <ul className="mt-4 divide-y divide-[var(--line)]">
            {queue.map((entry) => {
              const status = entry.wordId ? (progressMap.get(entry.wordId)?.status ?? "new") : null;
              return (
                <li key={entry.key} className="flex items-start justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-black text-[var(--ink)]">{entry.term}</span>
                      {entry.partOfSpeech && (
                        <span className="rounded-full bg-[var(--canvas)] px-2 py-0.5 text-[10px] font-bold text-[var(--muted)]">
                          {PART_LABELS[entry.partOfSpeech as VocabularyItem["partOfSpeech"]] ?? entry.partOfSpeech}
                        </span>
                      )}
                      {status ? (
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${STATUS_CLASS[status]}`}>
                          {STATUS_LABEL[status]}
                        </span>
                      ) : (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-700">
                          此義項尚無字卡
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      {entry.meaning_zh ?? "本題未提供釋義，請回到題目解析確認。"}
                      <span className="ml-1 text-[10px]">（來源：{entry.questionId}）</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleDismissQueued(entry.key)}
                    className="min-h-9 shrink-0 rounded-lg border border-[var(--line)] bg-white px-3 text-xs font-bold text-[var(--muted)]"
                  >
                    記住了，移除
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="flex items-center justify-center gap-5 pb-1 text-xs font-bold text-[var(--muted)]">
        <Link href="/">← 今日總覽</Link>
        <Link href="/dashboard">查看教練報告 ↗</Link>
      </div>
    </div>
  );
}

function HeaderMetric({ label, value, signal = false }: { label: string; value: string; signal?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">{label}</p>
      <p className={`number-tabular mt-1 text-sm font-black ${signal ? "text-[var(--signal)]" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function RatingButton({
  label,
  detail,
  active,
  tone,
  onClick,
}: {
  label: string;
  detail: string;
  active: boolean;
  tone: "amber" | "blue" | "dark";
  onClick: () => void;
}) {
  const classes = {
    amber: active
      ? "border-amber-300 bg-amber-100 text-amber-900"
      : "border-amber-200 bg-amber-50 text-amber-800",
    blue: active
      ? "border-blue-300 bg-blue-100 text-blue-900"
      : "border-blue-200 bg-blue-50 text-blue-800",
    dark: active
      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
      : "border-[var(--ink)] bg-[var(--ink)] text-white",
  }[tone];

  return (
    <button
      onClick={onClick}
      className={`min-h-16 rounded-2xl border px-2 py-2 text-center active:scale-[0.98] ${classes}`}
    >
      <span className="block text-xs font-black">{label}</span>
      <span className="mt-1 block text-[10px] font-bold opacity-70">{detail}</span>
    </button>
  );
}
