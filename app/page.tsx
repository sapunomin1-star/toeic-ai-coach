"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StudyGoalCard from "@/components/StudyGoalCard";
import { getStudyProfile, type StudyProfile } from "@/lib/studyProfile";
import {
  BASELINE_FOCUS_LABEL,
  buildLearningPulse,
  getCoachAction,
  getResumeAction,
  type TodayCoachState,
} from "@/lib/todayCoach";
import {
  getDailyPlan,
  getEvidenceRecords,
  getQuizPlan,
  getReviewableIds,
} from "@/lib/storage";
import {
  buildDailySession,
  getDailySessionActivity,
  getDueBacklog,
  loadVocabularyBank,
} from "@/lib/vocabularyStorage";

export default function Home() {
  const [profile, setProfile] = useState<StudyProfile | null>(null);
  const [today, setToday] = useState<TodayCoachState | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      let bankReady = true;
      try {
        await loadVocabularyBank();
      } catch (error) {
        console.error("[home] failed to load vocabulary bank:", error);
        bankReady = false;
      }
      if (cancelled) return;

      setProfile(getStudyProfile());
      const plan = getDailyPlan();
      const practiceState = {
        resumeAction: getResumeAction(getQuizPlan()),
        practiceCursor: plan?.cursor ?? 0,
        practiceTotal: plan?.questionIds.length ?? 0,
        practiceHasPendingFeedback: Boolean(plan?.pendingFeedback),
        reviewDueCount: getReviewableIds().length,
      };
      const pulse = buildLearningPulse(getEvidenceRecords());

      if (!bankReady) {
        const activity = getDailySessionActivity();
        setToday({
          vocabularyUnavailable: true,
          vocabularyTotal: 0,
          reviewedCount: activity.reviewedCount,
          validatedCount: activity.validatedCount,
          validatedCorrectCount: activity.validatedCorrectCount,
          validatedWrongCount: activity.validatedWrongCount,
          reinforcementCount: activity.reinforcementCount,
          canReinforce: false,
          dueBacklogCount: 0,
          ...practiceState,
          ...pulse,
        });
        return;
      }

      const vocabulary = buildDailySession();
      const activity = getDailySessionActivity();
      setToday({
        vocabularyUnavailable: false,
        vocabularyTotal: vocabulary.items.length,
        reviewedCount: activity.reviewedCount,
        validatedCount: activity.validatedCount,
        validatedCorrectCount: activity.validatedCorrectCount,
        validatedWrongCount: activity.validatedWrongCount,
        reinforcementCount: activity.reinforcementCount,
        canReinforce: activity.canReinforce,
        dueBacklogCount: getDueBacklog().length,
        ...practiceState,
        ...pulse,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const vocabularyReviewed =
    today !== null &&
    !today.vocabularyUnavailable &&
    (today.vocabularyTotal === 0 || today.reviewedCount >= today.vocabularyTotal);
  const vocabularyValidated =
    today !== null &&
    !today.vocabularyUnavailable &&
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
  const currentStep = today?.resumeAction
    ? today.resumeAction.source === "daily" ? 2 : null
    : !vocabularyReviewed
      ? 0
    : !vocabularyValidated
      ? 1
      : !practiceComplete
        ? 2
        : null;
  const coachAction = today
    ? getCoachAction(today, vocabularyReviewed, vocabularyValidated, practiceComplete)
    : null;

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] p-5 text-white shadow-[0_24px_70px_rgba(24,33,27,0.18)] sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[var(--brand)] opacity-35 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[var(--signal)] opacity-10 blur-3xl"
        />

        <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] shadow-[0_0_0_4px_rgba(217,245,91,0.12)]" />
              Adaptive daily coaching
            </p>
            <h1 className="text-balance mt-5 max-w-2xl text-3xl font-black leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              把今天有限的時間，
              <span className="text-[var(--signal)]">換成看得見的進步。</span>
            </h1>
            <p className="text-pretty mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
              不是再塞一套題庫，而是根據到期複習、近期弱點與完成進度，替你決定現在最值得做的事。
            </p>

            {coachAction ? (
              <Link
                href={coachAction.href}
                className="product-interactive mt-6 flex max-w-xl items-center justify-between gap-4 rounded-2xl bg-white p-4 text-[var(--ink)] shadow-[0_14px_34px_rgba(0,0,0,0.18)] active:scale-[0.99] sm:p-5"
              >
                <span className="min-w-0">
                  <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand)]">
                    教練處方 · {coachAction.meta}
                  </span>
                  <span className="mt-1 block text-lg font-black tracking-[-0.02em] sm:text-xl">
                    {coachAction.label}
                  </span>
                  <span className="text-pretty mt-1 block text-xs leading-5 text-[var(--muted)] sm:text-sm">
                    {coachAction.detail}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--signal)] text-xl font-bold"
                >
                  →
                </span>
              </Link>
            ) : (
              <div
                className="mt-6 h-28 max-w-xl animate-pulse rounded-2xl bg-white/10"
                aria-label="正在產生今日建議"
              />
            )}
          </div>

          <aside className="rounded-3xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                  Today&apos;s loop
                </p>
                <p className="mt-1 text-sm font-bold text-white/85">今日核心循環</p>
              </div>
              <p className="number-tabular text-3xl font-black tracking-[-0.05em]">
                {today ? completedSteps : "–"}
                <span className="ml-1 text-sm text-white/60">/ 3</span>
              </p>
            </div>
            <div
              className="mt-5 grid grid-cols-3 gap-1.5"
              role="progressbar"
              aria-label="今日核心任務完成進度"
              aria-valuemin={0}
              aria-valuemax={3}
              aria-valuenow={completedSteps}
            >
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-colors ${
                    index < completedSteps ? "bg-[var(--signal)]" : "bg-white/15"
                  }`}
                />
              ))}
            </div>
            <ol className="mt-5 space-y-3">
              <ProgressMark label="建立記憶線索" done={vocabularyReviewed} current={currentStep === 0} />
              <ProgressMark label="用測驗確認回想" done={vocabularyValidated} current={currentStep === 1} />
              <ProgressMark label="依弱點完成訓練" done={practiceComplete} current={currentStep === 2} />
            </ol>
          </aside>
        </div>
      </section>

      {today && <StudyGoalCard profile={profile} />}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <section className="product-surface rounded-[1.75rem] p-5 sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
                Learning route
              </p>
              <h2 className="mt-1.5 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
                今天的學習路線
              </h2>
            </div>
            <p className="hidden text-xs font-medium text-[var(--muted)] sm:block">
              依進度自動帶路
            </p>
          </div>
          <ol className="space-y-2.5">
            <PlanStep
              num="01"
              label="建立單字記憶"
              time="約 8 分鐘"
              desc={
                today
                  ? today.vocabularyUnavailable
                    ? "單字庫暫時無法載入，請確認網路後重試"
                    : `${Math.min(today.reviewedCount, today.vocabularyTotal)} / ${today.vocabularyTotal} 字完成自評`
                  : "載入今日單字…"
              }
              href="/vocabulary"
              status={stepStatus(vocabularyReviewed, currentStep === 0)}
            />
            <PlanStep
              num="02"
              label="正式驗收回想"
              time="約 5 分鐘"
              desc={
                today
                  ? today.vocabularyUnavailable
                    ? "單字庫暫時無法載入，請確認網路後重試"
                    : validationDescription(today)
                  : "載入驗收進度…"
              }
              href="/vocabulary-quiz"
              status={stepStatus(vocabularyValidated, currentStep === 1)}
            />
            <PlanStep
              num="03"
              label="完成自適應訓練"
              time="15–30 分鐘"
              desc={practiceDescription(today)}
              href="/practice"
              status={stepStatus(practiceComplete, currentStep === 2)}
            />
          </ol>
        </section>

        <aside className="product-surface flex flex-col rounded-[1.75rem] p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
              Learning pulse
            </p>
            <h2 className="mt-1.5 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
              近 7 日學習脈搏
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <PulseMetric
              label="有效作答"
              value={today ? `${today.weeklyAnswered}` : "–"}
              unit="題"
            />
            <PulseMetric
              label="近期正確率"
              value={today?.weeklyAccuracy == null ? "–" : `${today.weeklyAccuracy}`}
              unit={today?.weeklyAccuracy == null ? "" : "%"}
            />
          </div>

          <div className="mt-3 rounded-2xl bg-[var(--canvas)] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--muted)]">
              待確認考點
            </p>
            <p className="mt-1.5 text-base font-black text-[var(--ink)]">
              {today?.focusLabel ?? "分析學習紀錄中"}
            </p>
            <p className="text-pretty mt-1 text-xs leading-5 text-[var(--muted)]">
              {today ? today.focusDetail : "整理近期新題紀錄…"}
            </p>
            <p className="mt-1 text-[10px] leading-4 text-[var(--muted)]">
              只算首次作答的新題，不含重做；樣本不足時只標記值得再確認。
            </p>
          </div>

          <Link
            href="/dashboard"
            className="product-interactive mt-auto flex min-h-12 items-center justify-between border-b border-[var(--line)] pt-5 text-sm font-black text-[var(--ink)]"
          >
            查看完整教練報告
            <span aria-hidden="true" className="text-[var(--brand)]">↗</span>
          </Link>
        </aside>
      </div>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4 px-1">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
              Extra practice
            </p>
            <h2 className="mt-1 text-lg font-black tracking-[-0.02em] text-[var(--ink)]">
              想再多練一點
            </h2>
          </div>
          <p className="text-xs text-[var(--muted)]">不影響今日核心完成度</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <QuickLink
            href="/vocabulary"
            code="WORD LAB"
            label="複習今日單字"
            detail="用例句重新建立記憶線索"
          />
          <QuickLink
            href="/vocabulary-quiz?mode=random"
            code="QUICK 10"
            label="隨機單字挑戰"
            detail="10 題快速檢查長期記憶"
          />
          <QuickLink
            href="/wrongbook"
            code="RECALL"
            label="整理錯題本"
            detail={today?.reviewDueCount ? `${today.reviewDueCount} 題已到複習日` : "集中處理還沒穩定的題目"}
          />
        </div>
      </section>

      <section className="product-surface rounded-[1.75rem] p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
              Benchmark
            </p>
            <h2 className="mt-1.5 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
              用模考確認真正的進步
            </h2>
          </div>
          <p className="text-xs leading-5 text-[var(--muted)]">
            建議在安靜、不中斷的時段進行
          </p>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <MockLink
            href="/full-mock"
            eyebrow="Full simulation"
            title="完整 TOEIC 模擬考"
            detail="200 題 · 120 分鐘 · Listening + Reading"
            note="含非官方分數區間與逐題檢討"
            primary
          />
          <MockLink
            href="/mock-test"
            eyebrow="Reading"
            title="閱讀模考"
            detail="100 題 · 75 分鐘"
            note="Part 5 / 6 / 7"
          />
          <MockLink
            href="/listening-mock"
            eyebrow="Listening"
            title="聽力模考"
            detail="100 題 · 45 分鐘"
            note="Part 1 / 2 / 3 / 4"
          />
        </div>
      </section>

      <p className="px-2 pb-1 text-center text-[11px] leading-5 text-[var(--muted)]">
        學習紀錄預設只保存在你的裝置；登入後才會啟用單人跨裝置同步。
      </p>
    </div>
  );
}

/** Tested is not passed: the step reports both, never "N / N 通過" (REVIEW F07). */
function validationDescription(today: TodayCoachState): string {
  const tested = Math.min(today.validatedCount, today.vocabularyTotal);
  if (tested === 0) return `0 / ${today.vocabularyTotal} 字已測`;
  return `${tested} / ${today.vocabularyTotal} 字已測 · 答對 ${today.validatedCorrectCount} · 待加強 ${today.validatedWrongCount}`;
}

function practiceDescription(today: TodayCoachState | null): string {
  if (!today) return "載入訓練進度…";
  if (today.practiceTotal === 0) {
    return today.reviewDueCount > 0
      ? `${Math.min(3, today.reviewDueCount)} 題到期複習優先，再進入弱點與完整題組`
      : today.focusLabel === BASELINE_FOCUS_LABEL
        ? "先用預設考點建立基準，再進入閱讀題組與聽力"
        : `優先確認「${today.focusLabel}」，再進入閱讀題組與聽力`;
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

function ProgressMark({
  label,
  done,
  current,
}: {
  label: string;
  done: boolean;
  current: boolean;
}) {
  return (
    <li className={`flex items-center gap-3 text-xs ${done || current ? "text-white" : "text-white/38"}`}>
      <span
        aria-hidden="true"
        className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-black ${
          done
            ? "bg-[var(--signal)] text-[var(--ink)]"
            : current
              ? "border border-white/50 bg-white/10 text-white"
              : "border border-white/15"
        }`}
      >
        {done ? "✓" : current ? "•" : ""}
      </span>
      <span className="font-semibold">{label}</span>
      {current && (
        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/70">
          Now
        </span>
      )}
    </li>
  );
}

function PlanStep({
  num,
  label,
  time,
  desc,
  href,
  status,
}: {
  num: string;
  label: string;
  time: string;
  desc: string;
  href: string;
  status: StepStatus;
}) {
  const stateClass = {
    done: "border-emerald-200 bg-emerald-50/75",
    current: "border-[color:rgb(49_89_223_/_0.24)] bg-[color:rgb(49_89_223_/_0.06)] shadow-[0_12px_28px_rgba(49,89,223,0.08)]",
    pending: "border-transparent bg-[var(--canvas)]",
  }[status];

  return (
    <li>
      <Link
        href={href}
        aria-label={`${label}：${desc}`}
        aria-current={status === "current" ? "step" : undefined}
        className={`product-interactive grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border p-3.5 sm:p-4 ${stateClass}`}
      >
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 place-items-center rounded-xl text-[11px] font-black tracking-tight ${
            status === "done"
              ? "bg-emerald-600 text-white"
              : status === "current"
                ? "bg-[var(--brand)] text-white"
                : "bg-white text-[var(--muted)]"
          }`}
        >
          {status === "done" ? "✓" : num}
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm font-black text-[var(--ink)] sm:text-base">{label}</span>
            {status === "current" && (
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--brand)]">
                Current
              </span>
            )}
          </span>
          <span className="text-pretty mt-0.5 block text-xs leading-5 text-[var(--muted)]">
            {desc}
          </span>
        </span>
        <span className="hidden text-right text-[10px] font-black uppercase tracking-wider text-[var(--muted)] sm:block">
          {time}
        </span>
      </Link>
    </li>
  );
}

function PulseMetric({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-3.5">
      <p className="text-[10px] font-bold text-[var(--muted)]">{label}</p>
      <p className="number-tabular mt-1 text-3xl font-black tracking-[-0.05em] text-[var(--ink)]">
        {value}
        {unit && <span className="ml-1 text-xs font-bold text-[var(--muted)]">{unit}</span>}
      </p>
    </div>
  );
}

function QuickLink({
  href,
  code,
  label,
  detail,
}: {
  href: string;
  code: string;
  label: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="product-surface product-interactive group rounded-2xl p-4 active:scale-[0.99]"
    >
      <span className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand)]">
          {code}
        </span>
        <span aria-hidden="true" className="text-[var(--muted)] transition-transform group-hover:translate-x-0.5">→</span>
      </span>
      <span className="mt-5 block text-sm font-black text-[var(--ink)]">{label}</span>
      <span className="text-pretty mt-1 block text-xs leading-5 text-[var(--muted)]">{detail}</span>
    </Link>
  );
}

function MockLink({
  href,
  eyebrow,
  title,
  detail,
  note,
  primary = false,
}: {
  href: string;
  eyebrow: string;
  title: string;
  detail: string;
  note: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`product-interactive group flex min-h-48 flex-col rounded-2xl border p-4 active:scale-[0.99] sm:p-5 ${
        primary
          ? "border-transparent bg-[var(--brand-deep)] text-white shadow-[0_16px_38px_rgba(30,44,88,0.2)]"
          : "border-[var(--line)] bg-[var(--canvas)] text-[var(--ink)]"
      }`}
    >
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${primary ? "text-[var(--signal)]" : "text-[var(--brand)]"}`}>
        {eyebrow}
      </span>
      <span className="text-balance mt-4 block text-lg font-black tracking-[-0.025em]">{title}</span>
      <span className={`mt-1 block text-xs font-semibold ${primary ? "text-white/70" : "text-[var(--muted)]"}`}>
        {detail}
      </span>
      <span className={`mt-auto flex items-end justify-between gap-3 pt-6 text-[11px] ${primary ? "text-white/55" : "text-[var(--muted)]"}`}>
        {note}
        <span
          aria-hidden="true"
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform group-hover:translate-x-0.5 ${
            primary ? "bg-[var(--signal)] text-[var(--ink)]" : "bg-white text-[var(--ink)]"
          }`}
        >
          →
        </span>
      </span>
    </Link>
  );
}
