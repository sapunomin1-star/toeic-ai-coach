"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDailyPlan, getReviewableIds } from "@/lib/storage";
import {
  buildDailySession,
  getDailySessionActivity,
  loadVocabularyBank,
} from "@/lib/vocabularyStorage";

type TodayCoachState = {
  vocabularyTotal: number;
  reviewedCount: number;
  validatedCount: number;
  reinforcementCount: number;
  canReinforce: boolean;
  practiceCursor: number;
  practiceTotal: number;
  practiceHasPendingFeedback: boolean;
  reviewDueCount: number;
};

type CoachAction = {
  href: string;
  label: string;
  detail: string;
};

export default function Home() {
  const [today, setToday] = useState<TodayCoachState | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      // A failed vocabulary-chunk load degrades to a practice-plan-only coach
      // instead of an endless skeleton.
      let bankReady = true;
      try {
        await loadVocabularyBank();
      } catch (error) {
        console.error("[home] failed to load vocabulary bank:", error);
        bankReady = false;
      }
      if (cancelled) return;
      const plan = getDailyPlan();
      const practiceState = {
        practiceCursor: plan?.cursor ?? 0,
        practiceTotal: plan?.questionIds.length ?? 0,
        practiceHasPendingFeedback: Boolean(plan?.pendingFeedback),
        reviewDueCount: getReviewableIds().length,
      };
      if (!bankReady) {
        setToday({
          vocabularyTotal: 0,
          reviewedCount: 0,
          validatedCount: 0,
          reinforcementCount: 0,
          canReinforce: false,
          ...practiceState,
        });
        return;
      }
      const vocabulary = buildDailySession();
      const activity = getDailySessionActivity();
      setToday({
        vocabularyTotal: vocabulary.items.length,
        reviewedCount: activity.reviewedCount,
        validatedCount: activity.validatedCount,
        reinforcementCount: activity.reinforcementCount,
        canReinforce: activity.canReinforce,
        ...practiceState,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const vocabularyReviewed =
    today !== null &&
    (today.vocabularyTotal === 0 || today.reviewedCount >= today.vocabularyTotal);
  const vocabularyValidated =
    today !== null &&
    (today.vocabularyTotal === 0 || today.validatedCount >= today.vocabularyTotal);
  const practiceComplete =
    today !== null &&
    today.practiceTotal > 0 &&
    today.practiceCursor >= today.practiceTotal &&
    !today.practiceHasPendingFeedback;
  const completedSteps = [
    vocabularyReviewed,
    vocabularyValidated,
    practiceComplete,
  ].filter(Boolean).length;
  const coachAction = today
    ? getCoachAction(today, vocabularyReviewed, vocabularyValidated, practiceComplete)
    : null;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-200">
              TOEIC Personal Coach
            </p>
            <h1 className="mt-1.5 text-2xl font-bold leading-snug">
              今天，穩定進步一點
            </h1>
          </div>
          {today && (
            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
              {completedSteps} / 3 完成
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-indigo-100">
          每日 20 個新字＋15–30 分鐘核心訓練。
        </p>
        <div
          className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20"
          role="progressbar"
          aria-label="今日核心任務完成進度"
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={completedSteps}
        >
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${(completedSteps / 3) * 100}%` }}
          />
        </div>
      </section>

      {coachAction ? (
        <Link
          href={coachAction.href}
          className="block rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-sm active:scale-[0.99]"
        >
          <span className="flex items-center justify-between gap-3">
            <span>
              <span className="block text-xs font-medium text-slate-300">
                教練建議 · 下一步
              </span>
              <span className="mt-0.5 block text-lg font-semibold">
                {coachAction.label}
              </span>
              <span className="mt-0.5 block text-xs text-slate-300">
                {coachAction.detail}
              </span>
            </span>
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </span>
        </Link>
      ) : (
        <div className="h-24 animate-pulse rounded-2xl bg-slate-200" aria-label="正在載入今日建議" />
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900">今天的學習路線</h2>
          <span className="text-xs text-slate-400">依進度自動帶路</span>
        </div>
        <ol className="space-y-2">
          <PlanStep
            num="1"
            label="單字自評"
            desc={
              today
                ? `${Math.min(today.reviewedCount, today.vocabularyTotal)} / ${today.vocabularyTotal} 字完成`
                : "載入今日單字…"
            }
            href="/vocabulary"
            status={stepStatus(vocabularyReviewed, completedSteps === 0)}
          />
          <PlanStep
            num="2"
            label="單字驗收"
            desc={
              today
                ? `${Math.min(today.validatedCount, today.vocabularyTotal)} / ${today.vocabularyTotal} 字完成正式驗收`
                : "載入驗收進度…"
            }
            href="/vocabulary-quiz"
            status={stepStatus(vocabularyValidated, completedSteps === 1)}
          />
          <PlanStep
            num="3"
            label="今日訓練"
            desc={practiceDescription(today)}
            href="/practice"
            status={stepStatus(practiceComplete, completedSteps === 2)}
          />
        </ol>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <QuickLink href="/vocabulary" emoji="📚" label="每日單字" />
        <QuickLink href="/vocabulary-quiz?mode=random" emoji="✏️" label="隨機挑戰" />
        <QuickLink href="/wrongbook" emoji="📖" label="錯題本" />
      </div>

      <Link
        href="/dashboard"
        className="block rounded-2xl border border-violet-100 bg-white px-4 py-3 text-center text-sm font-medium text-violet-700 shadow-sm active:scale-[0.99]"
      >
        查看個人教練報告 →
      </Link>

      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          模擬考
        </p>
        <Link
          href="/full-mock"
          aria-label="開始完整 TOEIC 模擬考"
          className="block rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 p-5 text-white shadow-md active:scale-[0.99]"
        >
          <p className="text-2xl">🎯</p>
          <p className="mt-2 text-xl font-bold">完整 TOEIC 模擬考</p>
          <p className="mt-1 text-sm font-medium text-indigo-100">
            200 題 / 120 分鐘 / Listening + Reading
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-200">
            最貼近真實考試的完整體驗，含 IIBC 公開換算表預測分數
          </p>
          <p className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs text-indigo-100">
            ⚠️ 建議備好水跟不被打擾的時間再開始
          </p>
          <span className="mt-4 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-indigo-950">
            開始完整模擬考 →
          </span>
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <MockLink
            href="/mock-test"
            ariaLabel="進入閱讀模擬考"
            eyebrow="Reading"
            title="閱讀模考"
            detail="半套 · 100 題 · 75 分鐘"
            parts="Part 5/6/7"
          />
          <MockLink
            href="/listening-mock"
            ariaLabel="進入聽力模擬考"
            eyebrow="Listening"
            title="聽力模考"
            detail="半套 · 100 題 · 45 分鐘"
            parts="Part 1/2/3/4"
            indigo
          />
        </div>
      </section>
    </div>
  );
}

function getCoachAction(
  today: TodayCoachState,
  vocabularyReviewed: boolean,
  vocabularyValidated: boolean,
  practiceComplete: boolean,
): CoachAction {
  if (!vocabularyReviewed) {
    return {
      href: "/vocabulary",
      label: today.reviewedCount > 0 ? "繼續單字自評" : "開始今日單字",
      detail: `還有 ${Math.max(0, today.vocabularyTotal - today.reviewedCount)} 字，先建立記憶線索`,
    };
  }
  if (!vocabularyValidated) {
    return {
      href: "/vocabulary-quiz",
      label: today.validatedCount > 0 ? "繼續單字驗收" : "開始單字驗收",
      detail: `還有 ${Math.max(0, today.vocabularyTotal - today.validatedCount)} 字，確認是否真的記住`,
    };
  }
  if (today.canReinforce) {
    return {
      href: "/vocabulary-quiz?mode=reinforcement",
      label: "加強剛才不熟的單字",
      detail: `${today.reinforcementCount} 字短時回想，不延後正式複習日`,
    };
  }
  if (today.practiceHasPendingFeedback) {
    return {
      href: "/quiz",
      label: "看完上一題解析",
      detail: "答案已安全儲存，確認解析後再繼續",
    };
  }
  if (!practiceComplete) {
    const inProgress = today.practiceTotal > 0 && today.practiceCursor > 0;
    return {
      href: "/practice",
      label: inProgress ? "繼續今日訓練" : "開始今日訓練",
      detail: inProgress
        ? `已完成 ${today.practiceCursor} / ${today.practiceTotal} 題`
        : today.reviewDueCount > 0
          ? `先處理 ${today.reviewDueCount} 題到期錯題，再進入新題`
          : "依弱點安排文法、完整文章題組與聽力",
    };
  }
  return {
    href: "/dashboard",
    label: "今日核心任務完成",
    detail: "查看成果與明天最值得加強的能力",
  };
}

function practiceDescription(today: TodayCoachState | null): string {
  if (!today) return "載入訓練進度…";
  if (today.practiceTotal === 0) {
    return today.reviewDueCount > 0
      ? `${today.reviewDueCount} 題到期複習優先＋弱點與完整題組`
      : "弱點補強＋完整短文題組＋聽力練習";
  }
  if (today.practiceHasPendingFeedback) {
    return `${today.practiceCursor} / ${today.practiceTotal} 題已作答 · 解析待確認`;
  }
  return `${Math.min(today.practiceCursor, today.practiceTotal)} / ${today.practiceTotal} 題完成`;
}

type StepStatus = "done" | "current" | "pending";

function stepStatus(done: boolean, current: boolean): StepStatus {
  if (done) return "done";
  return current ? "current" : "pending";
}

function PlanStep({
  num,
  label,
  desc,
  href,
  status,
}: {
  num: string;
  label: string;
  desc: string;
  href: string;
  status: StepStatus;
}) {
  const statusClass = {
    done: "bg-emerald-100 text-emerald-700",
    current: "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-200",
    pending: "bg-slate-100 text-slate-500",
  }[status];

  return (
    <li>
      <Link
        href={href}
        aria-label={`${label}：${desc}`}
        aria-current={status === "current" ? "step" : undefined}
        className={`flex items-start gap-3 rounded-xl px-1 py-1.5 active:opacity-70 ${
          status === "pending" ? "opacity-65" : ""
        }`}
      >
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${statusClass}`}
        >
          {status === "done" ? "✓" : num}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">
            {label}
            {status === "current" && (
              <span className="ml-2 text-[10px] font-semibold text-indigo-600">現在</span>
            )}
          </p>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
      </Link>
    </li>
  );
}

function QuickLink({
  href,
  emoji,
  label,
}: {
  href: string;
  emoji: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm active:scale-[0.99]"
    >
      <p aria-hidden="true" className="text-2xl">{emoji}</p>
      <p className="mt-1 text-xs font-semibold">{label}</p>
    </Link>
  );
}

function MockLink({
  href,
  ariaLabel,
  eyebrow,
  title,
  detail,
  parts,
  indigo = false,
}: {
  href: string;
  ariaLabel: string;
  eyebrow: string;
  title: string;
  detail: string;
  parts: string;
  indigo?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`mt-3 block rounded-2xl border bg-white p-3 shadow-sm active:scale-[0.99] ${
        indigo ? "border-indigo-100" : "border-slate-200"
      }`}
    >
      <p className={`text-xs uppercase tracking-widest ${indigo ? "text-indigo-400" : "text-slate-400"}`}>
        {eyebrow}
      </p>
      <p className="mt-1 text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-[11px] text-slate-500">{detail}</p>
      <p className={`mt-2 text-[10px] ${indigo ? "text-indigo-400" : "text-slate-400"}`}>
        {parts}
      </p>
    </Link>
  );
}
