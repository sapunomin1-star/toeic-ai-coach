"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  LISTENING_SKILLS,
  READING_SKILLS,
  calculateAvgResponseTime,
  calculateListeningAccuracy,
  calculateListeningAvgTime,
  calculatePart1Accuracy,
  calculatePart2Accuracy,
  calculatePart3Accuracy,
  calculatePart4Accuracy,
  calculatePart5Accuracy,
  calculatePart5AvgTime,
  calculatePart6Accuracy,
  calculatePart6AvgTime,
  calculateReadingAccuracy,
  calculateReadingAvgTime,
  countPart7MistakesBySkill,
  countListeningAttempts,
  countMistakesBySkill,
  countPart1Attempts,
  countPart2Attempts,
  countPart3Attempts,
  countPart4Attempts,
  countPart5Attempts,
  countPart6Attempts,
  countReadingAttempts,
  countSlowQuestions,
  getNextDayListeningMix,
  getSlowestSkill,
  getTomorrowRecommendation,
  summarize,
} from "@/lib/analysis";
import { getFullMockResults } from "@/lib/fullMockStorage";
import { clearAllProgress, exportAllData, importAllData, getAnswerRecords } from "@/lib/storage";
import { getMockResults } from "@/lib/mockStorage";
import type { FullMockResult, MockTestResult } from "@/types/mock";
import {
  getTodayVocabulary,
  getVocabularyProgress,
  getVocabularyQuizStats,
} from "@/lib/vocabularyStorage";
import type { VocabularyQuizStats } from "@/lib/vocabularyStorage";
import type { AnswerRecord, SkillTag } from "@/types/question";
import { SKILL_LABELS } from "@/types/question";
import type { VocabularyItem, VocabularyProgress } from "@/types/vocabulary";

function fmtMs(ms: number): string {
  if (ms === 0) return "—";
  const s = Math.round(ms / 1000);
  return `${s} 秒`;
}

export default function DashboardPage() {
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

  const safeRecords = useMemo(() => records ?? [], [records]);

  const stats = useMemo(() => summarize(safeRecords), [safeRecords]);
  const skillMistakes = useMemo(() => countMistakesBySkill(safeRecords), [safeRecords]);
  const part7SkillMistakes = useMemo(() => countPart7MistakesBySkill(safeRecords), [safeRecords]);
  const recommendation = useMemo(() => getTomorrowRecommendation(safeRecords), [safeRecords]);
  const avgTime = useMemo(() => calculateAvgResponseTime(safeRecords), [safeRecords]);
  const part5AvgTime = useMemo(() => calculatePart5AvgTime(safeRecords), [safeRecords]);
  const slowCount = useMemo(() => countSlowQuestions(safeRecords), [safeRecords]);
  const slowestSkill = useMemo(() => getSlowestSkill(safeRecords), [safeRecords]);

  const part5Accuracy = useMemo(() => calculatePart5Accuracy(safeRecords), [safeRecords]);
  const part5Total = useMemo(() => countPart5Attempts(safeRecords), [safeRecords]);
  const part6Accuracy = useMemo(() => calculatePart6Accuracy(safeRecords), [safeRecords]);
  const part6Total = useMemo(() => countPart6Attempts(safeRecords), [safeRecords]);
  const part6AvgTime = useMemo(() => calculatePart6AvgTime(safeRecords), [safeRecords]);
  const listeningAvgTime = useMemo(() => calculateListeningAvgTime(safeRecords), [safeRecords]);
  const listeningAccuracy = useMemo(() => calculateListeningAccuracy(safeRecords), [safeRecords]);
  const listeningTotal = useMemo(() => countListeningAttempts(safeRecords), [safeRecords]);
  const readingAccuracy = useMemo(() => calculateReadingAccuracy(safeRecords), [safeRecords]);
  const readingAvgTime = useMemo(() => calculateReadingAvgTime(safeRecords), [safeRecords]);
  const readingTotal = useMemo(() => countReadingAttempts(safeRecords), [safeRecords]);

  // Per-part listening breakdown
  const part1Accuracy = useMemo(() => calculatePart1Accuracy(safeRecords), [safeRecords]);
  const part1Total = useMemo(() => countPart1Attempts(safeRecords), [safeRecords]);
  const part2Accuracy = useMemo(() => calculatePart2Accuracy(safeRecords), [safeRecords]);
  const part2Total = useMemo(() => countPart2Attempts(safeRecords), [safeRecords]);
  const part3Accuracy = useMemo(() => calculatePart3Accuracy(safeRecords), [safeRecords]);
  const part3Total = useMemo(() => countPart3Attempts(safeRecords), [safeRecords]);
  const part4Accuracy = useMemo(() => calculatePart4Accuracy(safeRecords), [safeRecords]);
  const part4Total = useMemo(() => countPart4Attempts(safeRecords), [safeRecords]);
  const nextListeningMix = useMemo(
    () => getNextDayListeningMix(safeRecords),
    [safeRecords],
  );

  const part6WrongCount = useMemo(() => {
    let w = 0;
    for (const r of safeRecords) {
      if (!r.isCorrect && r.questionId.startsWith("p6-")) w++;
    }
    return w;
  }, [safeRecords]);

  const orderedSkills = useMemo(
    () =>
      (Object.entries(skillMistakes) as [SkillTag, number][]).sort(
        (a, b) => b[1] - a[1]
      ),
    [skillMistakes]
  );

  const maxMistakes = useMemo(
    () => Math.max(1, ...orderedSkills.map(([, n]) => n)),
    [orderedSkills]
  );
  const weakestSkill = useMemo(
    () => orderedSkills.find(([, n]) => n > 0)?.[0] ?? null,
    [orderedSkills]
  );
  const vocabularyProgressMap = useMemo(
    () => new Map(vocabularyProgress.map((item) => [item.wordId, item.status])),
    [vocabularyProgress]
  );
  const vocabNew = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => (vocabularyProgressMap.get(item.id) ?? "new") === "new"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabSeen = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => vocabularyProgressMap.get(item.id) === "seen"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabFamiliar = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => vocabularyProgressMap.get(item.id) === "familiar"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabMastered = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => vocabularyProgressMap.get(item.id) === "mastered"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabularyAdvice = useMemo(() => {
    if (vocabFamiliar > 0)
      return `這 ${vocabFamiliar} 個字有印象但還不穩，明天再確認一次就能掌握。`;
    if (vocabMastered === todayVocabulary.length && todayVocabulary.length > 0)
      return "今日單字已完成，可以進入題目訓練。";
    if (vocabSeen + vocabNew > 0)
      return "今天先不要追求速度，把每個單字的例句看懂。";
    return "開始今日單字練習。";
  }, [vocabFamiliar, vocabMastered, vocabSeen, vocabNew, todayVocabulary.length]);

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

      {/* Today stats */}
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          今日
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="今日作答"
            value={`${stats.todayTotal} 題`}
            accent="text-indigo-600"
          />
          <StatCard
            label="今日正確率"
            value={
              stats.todayTotal === 0
                ? "—"
                : `${stats.todayAccuracy}%`
            }
            accent={
              stats.todayAccuracy >= 70 ? "text-emerald-600" : "text-rose-600"
            }
          />
        </div>
      </section>

      {/* Cumulative stats */}
      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          累積
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="總作答" value={stats.total.toString()} />
          <StatCard
            label="正確率"
            value={`${stats.accuracy}%`}
            accent="text-indigo-600"
          />
          <StatCard
            label="錯題數"
            value={stats.wrong.toString()}
            accent="text-rose-600"
          />
        </div>
      </section>

      {/* Part 5 / Part 6 / Listening breakdown */}
      {stats.total > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">Part 5 / Part 6 / 聽力表現</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Part 5
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  part5Total === 0
                    ? "text-slate-400"
                    : part5Accuracy >= 70
                      ? "text-emerald-600"
                      : "text-rose-600"
                }`}
              >
                {part5Total > 0 ? `${part5Accuracy}%` : "—"}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{part5Total} 題</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Part 6
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  part6Total === 0
                    ? "text-slate-400"
                    : part6Accuracy >= 70
                      ? "text-emerald-600"
                      : "text-rose-600"
                }`}
              >
                {part6Total > 0 ? `${part6Accuracy}%` : "—"}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{part6Total} 題</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                聽力
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  listeningTotal === 0
                    ? "text-slate-400"
                    : listeningAccuracy >= 70
                      ? "text-emerald-600"
                      : "text-rose-600"
                }`}
              >
                {listeningTotal > 0 ? `${listeningAccuracy}%` : "—"}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                {listeningTotal} 題
              </p>
            </div>
          </div>
          {/* Part 6 error detail */}
          {part6Total > 0 && (
            <div className="mt-3 rounded-xl bg-teal-50 p-3">
              <p className="text-xs font-medium text-teal-700">
                Part 6 段落填空 · 均速 {fmtMs(part6AvgTime)} · {part6Total} 題
                {part6WrongCount > 0
                  ? ` · 錯 ${part6WrongCount} 題`
                  : " · 全對！"}
              </p>
            </div>
          )}
          {listeningTotal > 0 && (
            <>
              {/* P1/P2/P3/P4 breakdown */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                {(
                  [
                    { label: "P1", accuracy: part1Accuracy, total: part1Total },
                    { label: "P2", accuracy: part2Accuracy, total: part2Total },
                    { label: "P3", accuracy: part3Accuracy, total: part3Total },
                    { label: "P4", accuracy: part4Accuracy, total: part4Total },
                  ] as const
                ).map(({ label, accuracy, total }) => (
                  <div key={label} className="rounded-lg bg-violet-50 p-2 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-violet-600">
                      {label}
                    </p>
                    <p
                      className={`mt-0.5 text-base font-bold ${
                        total === 0
                          ? "text-slate-400"
                          : accuracy >= 70
                            ? "text-emerald-600"
                            : "text-rose-600"
                      }`}
                    >
                      {total > 0 ? `${accuracy}%` : "—"}
                    </p>
                    <p className="text-[10px] text-slate-400">{total} 題</p>
                  </div>
                ))}
              </div>

              <ul className="mt-3 space-y-1">
                {LISTENING_SKILLS.map((skill) => {
                  const mistakes = skillMistakes[skill];
                  return (
                    <li
                      key={skill}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-600">
                        {SKILL_LABELS[skill]}
                      </span>
                      <span
                        className={
                          mistakes > 0
                            ? "font-medium text-rose-600"
                            : "text-slate-400"
                        }
                      >
                        {mistakes > 0 ? `${mistakes} 題錯` : "✓ 無錯誤"}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Adaptive next-day mix hint */}
              <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                <p className="text-[10px] uppercase tracking-wider text-indigo-600">
                  明日聽力配比
                </p>
                <p className="mt-1 text-xs text-indigo-800">
                  {nextListeningMix.part1Count} P1 · {nextListeningMix.part2Count} P2 ·{" "}
                  {nextListeningMix.part3GroupCount} 組 P3 ·{" "}
                  {nextListeningMix.part4GroupCount} 組 P4
                </p>
                {nextListeningMix.boosted.length > 0 ? (
                  <p className="mt-1 text-[11px] text-amber-700">
                    ⚡ {nextListeningMix.reason}
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-slate-500">
                    {nextListeningMix.reason}
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      )}

      {/* Part 7 Reading stats */}
      {readingTotal > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">Part 7 閱讀表現</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Part 7 正確率
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  readingAccuracy >= 70 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {readingAccuracy}%
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{readingTotal} 題</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                閱讀錯題數
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  part7SkillMistakes["reading_main_idea"] +
                    part7SkillMistakes["reading_detail"] +
                    part7SkillMistakes["reading_inference"] >
                  0
                    ? "text-rose-600"
                    : "text-emerald-600"
                }`}
              >
                {part7SkillMistakes["reading_main_idea"] +
                  part7SkillMistakes["reading_detail"] +
                  part7SkillMistakes["reading_inference"]}
                題
              </p>
              <p className="mt-0.5 text-xs text-slate-400">累積錯誤</p>
            </div>
          </div>
          <ul className="mt-3 space-y-1">
            {READING_SKILLS.map((skill) => {
              const mistakes = part7SkillMistakes[skill];
              return (
                <li
                  key={skill}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-slate-600">{SKILL_LABELS[skill]}</span>
                  <span
                    className={
                      mistakes > 0
                        ? "font-medium text-rose-600"
                        : "text-slate-400"
                    }
                  >
                    {mistakes > 0 ? `${mistakes} 題錯` : "✓ 無錯誤"}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">今日單字進度</h2>
        <div className="grid grid-cols-4 gap-2 text-center">
          <StatCard label="未學" value={vocabNew.toString()} />
          <StatCard
            label="見過"
            value={vocabSeen.toString()}
            accent="text-amber-600"
          />
          <StatCard
            label="有印象"
            value={vocabFamiliar.toString()}
            accent="text-indigo-600"
          />
          <StatCard
            label="已掌握"
            value={vocabMastered.toString()}
            accent="text-emerald-600"
          />
        </div>
        <p className="mt-3 text-sm text-slate-600">{vocabularyAdvice}</p>
      </section>

      {/* Time stats */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">作答速度</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <SpeedCell label="平均每題" value={fmtMs(avgTime)} />
            <SpeedCell
              label="Part 5"
              value={fmtMs(part5AvgTime)}
              warn={part5AvgTime > 40_000}
            />
            <SpeedCell
              label="Part 6"
              value={fmtMs(part6AvgTime)}
              warn={part6AvgTime > 50_000}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <SpeedCell
              label="聽力"
              value={fmtMs(listeningAvgTime)}
              warn={listeningAvgTime > 50_000}
            />
            <SpeedCell
              label="Part 7"
              value={fmtMs(readingAvgTime)}
              warn={readingAvgTime > 60_000}
            />
            <SpeedCell
              label="超 40 秒"
              value={`${slowCount} 題`}
              warn={slowCount > 0}
            />
          </div>
        </div>
        {slowestSkill && (
          <p className="mt-3 text-xs text-slate-500">
            最慢 skill：
            <span className="font-semibold text-slate-700">
              {SKILL_LABELS[slowestSkill]}
            </span>
          </p>
        )}
      </section>

      {/* Weakness summary */}
      {(weakestSkill || slowestSkill) && (
        <section className="grid grid-cols-2 gap-3">
          {weakestSkill && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-3">
              <p className="text-[10px] uppercase tracking-wider text-rose-500">
                最弱 Skill
              </p>
              <p className="mt-1 text-sm font-bold text-rose-800">
                {SKILL_LABELS[weakestSkill]}
              </p>
              <p className="mt-0.5 text-xs text-rose-600">
                {skillMistakes[weakestSkill]} 題錯
              </p>
            </div>
          )}
          {slowestSkill && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-3">
              <p className="text-[10px] uppercase tracking-wider text-amber-500">
                最慢 Skill
              </p>
              <p className="mt-1 text-sm font-bold text-amber-800">
                {SKILL_LABELS[slowestSkill]}
              </p>
              <p className="mt-0.5 text-xs text-amber-600">反應較慢</p>
            </div>
          )}
        </section>
      )}

      {/* Vocabulary quiz stats */}
      {quizStats && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">每日單字驗收</h2>
          {dailyQuizStats &&
          dailyQuizStats.totalCorrect + dailyQuizStats.totalWrong > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-3 text-center">
                <StatCard
                  label="答對"
                  value={dailyQuizStats.totalCorrect.toString()}
                  accent="text-emerald-600"
                />
                <StatCard
                  label="答錯"
                  value={dailyQuizStats.totalWrong.toString()}
                  accent="text-rose-600"
                />
                <StatCard
                  label="正確率"
                  value={`${dailyQuizStats.accuracy}%`}
                  accent={
                    dailyQuizStats.accuracy >= 70
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }
                />
              </div>
              {dailyQuizStats.lastQuizAt && (
                <p className="mt-2 text-xs text-slate-400">
                  最近驗收：
                  {new Date(dailyQuizStats.lastQuizAt).toLocaleDateString("zh-TW", {
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
              <p className="mt-2 text-sm text-slate-600">
                {dailyQuizStats.accuracy < 70
                  ? "正確率偏低，先完成今日加強與到期複習。"
                  : dailyQuizStats.accuracy <= 85
                    ? "持續完成每日驗收，穩定拉長複習間隔。"
                    : "正確率很高，可以挑戰全庫隨機題目。"}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              完成新的每日單字驗收後，這裡會顯示你的正式記憶表現。
            </p>
          )}
          <div className="mt-4 divide-y divide-slate-100 border-y border-slate-100 text-sm">
            <VocabularyQuizSummary label="隨機挑戰" stats={randomQuizStats} />
            <VocabularyQuizSummary label="今日加強" stats={reinforcementQuizStats} />
          </div>
          {quizStats.totalCorrect + quizStats.totalWrong > 0 && (
            <p className="mt-3 text-xs text-slate-400">
              累積全部測驗（含改版前紀錄）：答對 {quizStats.totalCorrect}、答錯{" "}
              {quizStats.totalWrong}、正確率 {quizStats.accuracy}%
            </p>
          )}
          <Link
            href="/vocabulary-quiz?mode=random"
            className="mt-4 block rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-center text-sm font-semibold text-indigo-700 active:scale-[0.99]"
          >
            隨機挑戰 →（從全庫抽 10 題）
          </Link>
        </section>
      )}

      {/* Tomorrow recommendation */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">明日建議</h2>
        <p className="text-sm leading-relaxed text-slate-700">
          {recommendation.message}
        </p>
        {recommendation.secondary && (
          <p className="mt-1.5 text-xs text-slate-500">
            第二優先：{recommendation.secondary.label}
          </p>
        )}
      </section>

      {/* Skill error chart */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">各 Skill 錯題分布</h2>
        {stats.total === 0 ? (
          <p className="text-sm text-slate-500">
            還沒有作答紀錄，先去做今日訓練吧。
          </p>
        ) : (
          <ul className="space-y-2">
            {orderedSkills.map(([skill, count]) => (
              <li key={skill}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">
                    {SKILL_LABELS[skill]}
                  </span>
                  <span className="text-slate-500">{count} 題錯</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full ${
                      count === 0
                        ? "bg-slate-200"
                        : count >= maxMistakes
                          ? "bg-rose-500"
                          : "bg-amber-400"
                    }`}
                    style={{ width: `${(count / maxMistakes) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Mock test entry: Full exam */}
      <section className="rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 p-4 text-white shadow-md">
        <p className="text-xs uppercase tracking-widest text-indigo-200">Full TOEIC Mock Test</p>
        <h2 className="mt-1 text-lg font-bold">完整 TOEIC 模擬考</h2>
        <p className="mt-1 text-xs text-slate-200">
          200 題 · 120 分鐘 · Listening + Reading · IIBC 預測分數
        </p>
        {recentFullMockResult ? (
          <div className="mt-3 rounded-xl bg-white/10 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-indigo-100">最近一次總分預測</p>
                <p className="mt-0.5 text-2xl font-bold">
                  {recentFullMockResult.totalRange.min}-{recentFullMockResult.totalRange.max}
                </p>
                <p className="text-[11px] text-indigo-100">/ 990 · 非官方參考範圍</p>
              </div>
              <div className="text-right text-[11px] text-slate-200">
                <p>
                  L {recentFullMockResult.listeningRaw}/100 · {recentFullMockResult.listeningRange.min}-
                  {recentFullMockResult.listeningRange.max}
                </p>
                <p className="mt-1">
                  R {recentFullMockResult.readingRaw}/100 · {recentFullMockResult.readingRange.min}-
                  {recentFullMockResult.readingRange.max}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center">
              {(["Part 1", "Part 2", "Part 3", "Part 4", "Part 5", "Part 6", "Part 7"] as const).map((part) => {
                const item = recentFullMockResult.partBreakdown[part];
                const pct =
                  !item || item.total === 0
                    ? 0
                    : Math.round((item.correct / item.total) * 100);
                return (
                  <div key={part} className="rounded bg-white/10 p-1">
                    <p className="text-[9px] text-indigo-100">{part.replace("Part ", "P")}</p>
                    <p className="text-[10px] font-bold">{pct}%</p>
                  </div>
                );
              })}
            </div>
            {recentFullMockResult.leftAppDuringTest && (
              <p className="mt-2 rounded-lg bg-amber-100 px-2 py-1 text-[11px] text-amber-800">
                此次測驗期間曾離開頁面
              </p>
            )}
            <p className="mt-2 text-[11px] text-indigo-200">
              交卷：
              {new Date(recentFullMockResult.submittedAt).toLocaleString("zh-TW", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ) : (
          <p className="mt-3 rounded-xl bg-white/10 p-3 text-xs text-slate-200">
            完成一次全真模考後，這裡會顯示 Listening、Reading 與總分預測。
          </p>
        )}
        <Link
          href="/full-mock"
          className="mt-3 block w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-indigo-950 active:scale-[0.99]"
        >
          開始完整模擬考 →
        </Link>
      </section>

      {/* Mock test entry: Reading */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">閱讀模擬考</h2>
        <p className="text-xs text-slate-500">
          100 題 · 75 分鐘 · Part 5/6/7 完整閱讀測驗
        </p>
        {recentMockResult && (
          <div className="mt-3 rounded-xl bg-slate-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">最近一次</p>
                <p className="mt-0.5 text-xl font-bold text-slate-900">
                  {recentMockResult.rawScore}/100
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">非官方估分</p>
                <p className="mt-0.5 text-sm font-semibold text-emerald-700">
                  {recentMockResult.scoreRange.min}-{recentMockResult.scoreRange.max}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {(["Part 5", "Part 6", "Part 7"] as const).map((part) => {
                const item = recentMockResult.partBreakdown[part];
                const pct =
                  !item || item.total === 0
                    ? 0
                    : Math.round((item.correct / item.total) * 100);
                return (
                  <div key={part} className="rounded-lg bg-white p-2">
                    <p className="text-[10px] text-slate-500">{part}</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">
                      {pct}%
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              交卷：
              {new Date(recentMockResult.submittedAt).toLocaleString("zh-TW", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
        <Link
          href="/mock-test"
          className="mt-3 block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white active:scale-[0.99]"
        >
          開始閱讀模擬考 →
        </Link>
      </section>

      {/* Mock test entry: Listening */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">聽力模擬考</h2>
        <p className="text-xs text-slate-500">
          100 題 · 45 分鐘 · Part 1/2/3/4 完整聽力測驗
        </p>
        {recentListeningMockResult && (
          <div className="mt-3 rounded-xl bg-violet-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">最近一次</p>
                <p className="mt-0.5 text-xl font-bold text-slate-900">
                  {recentListeningMockResult.rawScore}/100
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">非官方估分</p>
                <p className="mt-0.5 text-sm font-semibold text-violet-700">
                  {recentListeningMockResult.scoreRange.min}-{recentListeningMockResult.scoreRange.max}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              {(["Part 1", "Part 2", "Part 3", "Part 4"] as const).map((part) => {
                const item = recentListeningMockResult.partBreakdown[part];
                const pct =
                  !item || item.total === 0
                    ? 0
                    : Math.round((item.correct / item.total) * 100);
                return (
                  <div key={part} className="rounded-lg bg-white p-2">
                    <p className="text-[10px] text-slate-500">{part.replace("Part ", "P")}</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">
                      {pct}%
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              交卷：
              {new Date(recentListeningMockResult.submittedAt).toLocaleString(
                "zh-TW",
                {
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </p>
          </div>
        )}
        <Link
          href="/listening-mock"
          className="mt-3 block w-full rounded-xl bg-violet-700 px-4 py-3 text-center text-sm font-semibold text-white active:scale-[0.99]"
        >
          開始聽力模擬考 →
        </Link>
      </section>

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

      {/* Backup */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">資料備份</h2>
        <p className="text-xs text-slate-500">匯出學習紀錄為 JSON 檔案，可匯入到其他裝置。</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={handleExport}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 active:bg-slate-50"
          >
            匯出備份
          </button>
          <button
            onClick={handleImport}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 active:bg-slate-50"
          >
            匯入備份
          </button>
        </div>
      </section>

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

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className={`mt-1 text-xl font-bold ${accent ?? "text-slate-900"}`}>
        {value}
      </p>
    </div>
  );
}

function VocabularyQuizSummary({
  label,
  stats,
}: {
  label: string;
  stats: VocabularyQuizStats | null;
}) {
  const attempts = (stats?.totalCorrect ?? 0) + (stats?.totalWrong ?? 0);
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="text-xs text-slate-500">
        {attempts > 0
          ? `${attempts} 題 · 正確率 ${stats?.accuracy ?? 0}%`
          : "尚無紀錄"}
      </span>
    </div>
  );
}

function SpeedCell({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-2">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={`mt-0.5 text-base font-bold ${
          warn ? "text-rose-600" : "text-slate-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
