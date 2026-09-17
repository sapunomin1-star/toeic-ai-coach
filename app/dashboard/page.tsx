"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BackupSection } from "@/components/dashboard/BackupSection";
import {
  FullMockEntry,
  ListeningMockEntry,
  MockReviewHistory,
  ReadingMockEntry,
  TomorrowRecommendation,
} from "@/components/dashboard/MockSections";
import {
  OverviewStats,
  PacingSection,
  PartAccuracySummary,
  PartPerformanceSection,
  ReadingPerformanceSection,
  SkillErrorChart,
  VocabProgressSection,
  WeaknessSection,
} from "@/components/dashboard/PerformanceSections";
import ReasonBreakdownSection from "@/components/dashboard/ReasonBreakdownSection";
import { VocabQuizSection } from "@/components/dashboard/VocabQuizSection";
import WeeklyTrendSection from "@/components/dashboard/WeeklyTrendSection";
import { useDashboardMetrics } from "@/lib/dashboardMetrics";
import { buildGrammarVariantPlan } from "@/lib/grammarRemediation";
import { getFullMockResults } from "@/lib/fullMockStorage";
import { getMockReviewSnapshots } from "@/lib/mockReviewStorage";
import { getMockResults } from "@/lib/mockStorage";
import {
  clearAllProgress,
  exportAllData,
  getEvidenceRecords,
  importAllData,
  startGrammarVariantPractice,
} from "@/lib/storage";
import {
  getTodayVocabulary,
  getVocabularyProgress,
  getVocabularyQuizStats,
  getVocabularyQuizTypeStats,
  loadVocabularyBank,
} from "@/lib/vocabularyStorage";
import { ensureQuestionBankLoaded } from "@/lib/questionBank";
import type { VocabularyQuizStats } from "@/lib/vocabularyStorage";
import type { FullMockResult, MockReviewSnapshot, MockTestResult } from "@/types/mock";
import type { AnswerRecord } from "@/types/question";
import type { QuizQuestionType, VocabularyItem, VocabularyProgress } from "@/types/vocabulary";

export default function DashboardPage() {
  const router = useRouter();
  const [records, setRecords] = useState<AnswerRecord[] | null>(null);
  const [todayVocabulary, setTodayVocabulary] = useState<VocabularyItem[]>([]);
  const [vocabularyProgress, setVocabularyProgress] = useState<
    VocabularyProgress[]
  >([]);
  const [quizStats, setQuizStats] = useState<VocabularyQuizStats | null>(null);
  const [dailyQuizStats, setDailyQuizStats] = useState<VocabularyQuizStats | null>(null);
  const [randomQuizStats, setRandomQuizStats] = useState<VocabularyQuizStats | null>(null);
  const [reinforcementQuizStats, setReinforcementQuizStats] =
    useState<VocabularyQuizStats | null>(null);
  const [backlogQuizStats, setBacklogQuizStats] = useState<VocabularyQuizStats | null>(null);
  const [typeStats, setTypeStats] =
    useState<Record<QuizQuestionType, VocabularyQuizStats> | null>(null);
  const [recentMockResult, setRecentMockResult] = useState<MockTestResult | null>(null);
  const [recentListeningMockResult, setRecentListeningMockResult] =
    useState<MockTestResult | null>(null);
  const [recentFullMockResult, setRecentFullMockResult] =
    useState<FullMockResult | null>(null);
  const [reviewSnapshots, setReviewSnapshots] = useState<MockReviewSnapshot[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      // getTodayVocabulary needs the vocabulary bank; everything else here
      // reads localStorage only, so a failed bank load must not blank the
      // whole report — today's vocabulary section simply shows empty.
      let vocabularyBankReady = true;
      try {
        await loadVocabularyBank();
      } catch (error) {
        console.error("[dashboard] failed to load vocabulary bank:", error);
        vocabularyBankReady = false;
      }
      if (cancelled) return;
      setRecords(getEvidenceRecords());
      setTodayVocabulary(vocabularyBankReady ? getTodayVocabulary() : []);
      setVocabularyProgress(getVocabularyProgress());
      setQuizStats(getVocabularyQuizStats());
      setDailyQuizStats(getVocabularyQuizStats("daily"));
      setRandomQuizStats(getVocabularyQuizStats("random"));
      setReinforcementQuizStats(getVocabularyQuizStats("reinforcement"));
      setBacklogQuizStats(getVocabularyQuizStats("backlog"));
      setTypeStats(getVocabularyQuizTypeStats());
      setRecentMockResult(getMockResults("reading").at(-1) ?? null);
      setRecentListeningMockResult(getMockResults("listening").at(-1) ?? null);
      setRecentFullMockResult(getFullMockResults().at(-1) ?? null);
      setReviewSnapshots(getMockReviewSnapshots());
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleReset() {
    const ok = window.confirm(
      [
        "確定要清除所有學習資料嗎？以下全部會被清空：",
        "",
        "• 答題紀錄與歷史統計",
        "• 錯題本狀態與待複習清單",
        "• 每日訓練計畫",
        "• 單字練習進度（含 SRS 排程、quiz 紀錄）",
        "• 完整、閱讀與聽力模擬考歷史成績",
        "",
        "這個動作無法復原。",
      ].join("\n"),
    );
    if (!ok) return;
    clearAllProgress();
    // localStorage is cleared; reset all in-memory state so the dashboard
    // updates immediately without needing a page refresh.
    setRecords([]);
    setTodayVocabulary([]);
    setVocabularyProgress([]);
    setQuizStats(getVocabularyQuizStats());
    setDailyQuizStats(getVocabularyQuizStats("daily"));
    setRandomQuizStats(getVocabularyQuizStats("random"));
    setReinforcementQuizStats(getVocabularyQuizStats("reinforcement"));
    setBacklogQuizStats(getVocabularyQuizStats("backlog"));
    setTypeStats(getVocabularyQuizTypeStats());
    setRecentMockResult(null);
    setRecentListeningMockResult(null);
    setRecentFullMockResult(null);
    setReviewSnapshots([]);
  }

  function handleExport() {
    const json = exportAllData();
    if (!json) {
      alert("匯出失敗，請稍後再試。");
      return;
    }
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `toeic-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          importAllData(reader.result);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  const metrics = useDashboardMetrics(records, todayVocabulary, vocabularyProgress);

  // Ref (not state) so rapid taps during the multi-second first bank load
  // cannot queue duplicate plans and navigations.
  const grammarPracticeBusy = useRef(false);

  async function handleStartGrammarVariantPractice() {
    if (!records || grammarPracticeBusy.current) return;
    grammarPracticeBusy.current = true;
    try {
      if (!(await ensureQuestionBankLoaded())) return;
      const ids = buildGrammarVariantPlan(records);
      if (startGrammarVariantPractice(ids)) {
        router.push("/quiz");
      } else {
        alert("這些文法類型的題目你都練過了！換個弱點，或先去做今日訓練吧。");
      }
    } finally {
      grammarPracticeBusy.current = false;
    }
  }

  if (records === null) {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] p-6 text-white shadow-[0_22px_60px_rgba(24,33,27,0.16)] sm:p-8">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-20 h-60 w-60 rounded-full bg-[var(--brand)] opacity-35 blur-3xl"
        />
        <div className="relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--signal)]">
              Learning intelligence
            </p>
            <h1 className="text-balance mt-3 max-w-xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
              不只記錄你做了多少，
              <span className="text-white/55">也解釋下一步為什麼。</span>
            </h1>
            <p className="text-pretty mt-3 max-w-xl text-sm leading-6 text-white/60">
              趨勢、弱點與模考分開閱讀；資料不足時誠實顯示，不用假精準替你下結論。
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-center">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60">All attempts</span>
              <span className="number-tabular mt-1 block text-xl font-black">{metrics.stats.total}</span>
            </span>
            <span className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-center">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60">Accuracy</span>
              <span className="number-tabular mt-1 block text-xl font-black">
                {metrics.stats.total > 0 ? `${metrics.stats.accuracy}%` : "–"}
              </span>
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <WeeklyTrendSection records={records} />
        <div className="space-y-3">
          <TomorrowRecommendation recommendation={metrics.recommendation} />
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/practice"
              className="product-interactive flex min-h-14 items-center justify-center rounded-2xl bg-[var(--brand)] px-4 text-center text-xs font-black text-white shadow-[0_12px_26px_rgba(49,89,223,0.2)] active:scale-[0.99]"
            >
              開始今日訓練
            </Link>
            <Link
              href="/wrongbook"
              className="product-surface product-interactive flex min-h-14 items-center justify-center rounded-2xl px-4 text-center text-xs font-black text-[var(--ink)] active:scale-[0.99]"
            >
              查看錯題本
            </Link>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-3 px-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
            Diagnostic snapshot
          </p>
          <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
            現在的能力輪廓
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="space-y-5">
            <OverviewStats stats={metrics.stats} />
            <PartAccuracySummary metrics={metrics} />
          </div>
          <div className="space-y-5">
            <WeaknessSection metrics={metrics} />
            <SkillErrorChart metrics={metrics} limit={5} title="累積錯題 Top 5（含重做，非能力排序）" />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-col gap-1 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
              Benchmarks
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
              模考與分數證據
            </h2>
          </div>
          <p className="text-xs text-[var(--muted)]">模考紀錄不混入日常練習正確率</p>
        </div>
        <div className="grid items-start gap-4 lg:grid-cols-3">
          <FullMockEntry result={recentFullMockResult} />
          <ReadingMockEntry result={recentMockResult} />
          <ListeningMockEntry result={recentListeningMockResult} />
        </div>
      </section>

      <details className="product-surface group rounded-[1.75rem]">
        <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-black text-[var(--ink)]">
          深入看速度、錯因、單字與歷次檢討
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--canvas)] text-sm transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="grid gap-5 border-t border-[var(--line)] p-4 sm:p-5 lg:grid-cols-2">
          <PartPerformanceSection metrics={metrics} />
          <ReadingPerformanceSection metrics={metrics} />
          <PacingSection metrics={metrics} />
          <VocabProgressSection metrics={metrics} />
          <VocabQuizSection
            quizStats={quizStats}
            dailyQuizStats={dailyQuizStats}
            randomQuizStats={randomQuizStats}
            reinforcementQuizStats={reinforcementQuizStats}
            backlogQuizStats={backlogQuizStats}
            typeStats={typeStats}
          />
          <ReasonBreakdownSection
            reasonBreakdown={metrics.reasonBreakdown}
            reasonInsight={metrics.reasonInsight}
            grammarWeakSkills={metrics.grammarWeakSkills}
            onStartGrammarVariantPractice={handleStartGrammarVariantPractice}
          />
          <SkillErrorChart metrics={metrics} />
          <MockReviewHistory snapshots={reviewSnapshots} />
          <BackupSection onExport={handleExport} onImport={handleImport} />
          {(records.length > 0 ||
            recentFullMockResult ||
            recentMockResult ||
            recentListeningMockResult) && (
            <button
              onClick={handleReset}
              className="block w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-xs font-bold text-rose-700 lg:col-span-2"
            >
              清除所有學習紀錄
            </button>
          )}
        </div>
      </details>
    </div>
  );
}
