"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BackupSection } from "@/components/dashboard/BackupSection";
import {
  FullMockEntry,
  ListeningMockEntry,
  ReadingMockEntry,
  TomorrowRecommendation,
} from "@/components/dashboard/MockSections";
import {
  OverviewStats,
  PartPerformanceSection,
  ReadingPerformanceSection,
  SkillErrorChart,
  SpeedSection,
  VocabProgressSection,
  WeaknessSection,
} from "@/components/dashboard/PerformanceSections";
import ReasonBreakdownSection from "@/components/dashboard/ReasonBreakdownSection";
import { VocabQuizSection } from "@/components/dashboard/VocabQuizSection";
import { useDashboardMetrics } from "@/lib/dashboardMetrics";
import { buildGrammarVariantPlan } from "@/lib/grammarRemediation";
import { getFullMockResults } from "@/lib/fullMockStorage";
import { getMockResults } from "@/lib/mockStorage";
import {
  clearAllProgress,
  exportAllData,
  getAnswerRecords,
  importAllData,
  startGrammarVariantPractice,
} from "@/lib/storage";
import {
  getTodayVocabulary,
  getVocabularyProgress,
  getVocabularyQuizStats,
} from "@/lib/vocabularyStorage";
import type { VocabularyQuizStats } from "@/lib/vocabularyStorage";
import type { FullMockResult, MockTestResult } from "@/types/mock";
import type { AnswerRecord } from "@/types/question";
import type { VocabularyItem, VocabularyProgress } from "@/types/vocabulary";

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
  const [recentMockResult, setRecentMockResult] = useState<MockTestResult | null>(null);
  const [recentListeningMockResult, setRecentListeningMockResult] =
    useState<MockTestResult | null>(null);
  const [recentFullMockResult, setRecentFullMockResult] =
    useState<FullMockResult | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setRecords(getAnswerRecords());
      setTodayVocabulary(getTodayVocabulary());
      setVocabularyProgress(getVocabularyProgress());
      setQuizStats(getVocabularyQuizStats());
      setDailyQuizStats(getVocabularyQuizStats("daily"));
      setRandomQuizStats(getVocabularyQuizStats("random"));
      setReinforcementQuizStats(getVocabularyQuizStats("reinforcement"));
      setRecentMockResult(getMockResults("reading").at(-1) ?? null);
      setRecentListeningMockResult(getMockResults("listening").at(-1) ?? null);
      setRecentFullMockResult(getFullMockResults().at(-1) ?? null);
    }, 0);
    return () => window.clearTimeout(id);
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
    setRecentMockResult(null);
    setRecentListeningMockResult(null);
    setRecentFullMockResult(null);
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

  function handleStartGrammarVariantPractice() {
    if (!records) return;
    const ids = buildGrammarVariantPlan(records);
    if (startGrammarVariantPractice(ids)) {
      router.push("/quiz");
    }
  }

  if (records === null) {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-xl font-bold">個人教練報告</h1>
        <p className="mt-1 text-xs text-slate-500">
          依照目前弱點持續衝高分 · 每天 15–20 分鐘
        </p>
      </header>

      <OverviewStats stats={metrics.stats} />
      <PartPerformanceSection metrics={metrics} />
      <ReadingPerformanceSection metrics={metrics} />
      <VocabProgressSection metrics={metrics} />
      <SpeedSection metrics={metrics} />
      <WeaknessSection metrics={metrics} />
      <VocabQuizSection
        quizStats={quizStats}
        dailyQuizStats={dailyQuizStats}
        randomQuizStats={randomQuizStats}
        reinforcementQuizStats={reinforcementQuizStats}
      />
      <ReasonBreakdownSection
        reasonBreakdown={metrics.reasonBreakdown}
        reasonInsight={metrics.reasonInsight}
        grammarWeakSkills={metrics.grammarWeakSkills}
        onStartGrammarVariantPractice={handleStartGrammarVariantPractice}
      />
      <TomorrowRecommendation recommendation={metrics.recommendation} />
      <SkillErrorChart metrics={metrics} />
      <FullMockEntry result={recentFullMockResult} />
      <ReadingMockEntry result={recentMockResult} />
      <ListeningMockEntry result={recentListeningMockResult} />

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/practice"
          className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          開始今日訓練
        </Link>
        <Link
          href="/wrongbook"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700"
        >
          查看錯題本
        </Link>
      </div>

      <BackupSection onExport={handleExport} onImport={handleImport} />

      {(records.length > 0 ||
        recentFullMockResult ||
        recentMockResult ||
        recentListeningMockResult) && (
        <button
          onClick={handleReset}
          className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-xs font-medium text-slate-500"
        >
          清除所有學習紀錄
        </button>
      )}
    </div>
  );
}
