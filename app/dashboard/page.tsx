"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  LISTENING_SKILLS,
  READING_SKILLS,
  calculateAvgResponseTime,
  calculateListeningAccuracy,
  calculateListeningAvgTime,
  calculatePart5Accuracy,
  calculatePart5AvgTime,
  calculatePart6Accuracy,
  calculatePart6AvgTime,
  calculateReadingAccuracy,
  calculateReadingAvgTime,
  countPart7MistakesBySkill,
  countListeningAttempts,
  countMistakesBySkill,
  countPart5Attempts,
  countPart6Attempts,
  countReadingAttempts,
  countSlowQuestions,
  getSlowestSkill,
  getTomorrowRecommendation,
  summarize,
} from "@/lib/analysis";
import { clearAllProgress, getAnswerRecords } from "@/lib/storage";
import { getMockResults } from "@/lib/mockStorage";
import type { MockTestResult } from "@/types/mock";
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
  const [recentMockResult, setRecentMockResult] = useState<MockTestResult | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setRecords(getAnswerRecords());
      setTodayVocabulary(getTodayVocabulary());
      setVocabularyProgress(getVocabularyProgress());
      setQuizStats(getVocabularyQuizStats());
      const mockResults = getMockResults();
      setRecentMockResult(mockResults.at(-1) ?? null);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function handleReset() {
    const ok = window.confirm(
      "確定要清除所有作答紀錄嗎？包含歷史統計、錯題狀態。這個動作無法復原。"
    );
    if (!ok) return;
    clearAllProgress();
    setRecords([]);
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
      {quizStats && (quizStats.totalCorrect + quizStats.totalWrong > 0) && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold">單字測驗表現</h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <StatCard
              label="答對"
              value={quizStats.totalCorrect.toString()}
              accent="text-emerald-600"
            />
            <StatCard
              label="答錯"
              value={quizStats.totalWrong.toString()}
              accent="text-rose-600"
            />
            <StatCard
              label="正確率"
              value={`${quizStats.accuracy}%`}
              accent={
                quizStats.accuracy >= 70
                  ? "text-emerald-600"
                  : "text-rose-600"
              }
            />
          </div>
          {quizStats.lastQuizAt && (
            <p className="mt-2 text-xs text-slate-400">
              最近測驗：
              {new Date(quizStats.lastQuizAt).toLocaleDateString("zh-TW", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
          <p className="mt-2 text-sm text-slate-600">
            {quizStats.accuracy < 70
              ? "正確率偏低，先複習 seen / familiar 單字再測驗。"
              : quizStats.accuracy <= 85
                ? "持續每日測驗，鞏固熟悉度。"
                : "正確率很高！可以增加新單字量。"}
          </p>
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

      {/* Mock test entry */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">模擬考</h2>
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
                  item.total === 0
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
          開始模擬考 →
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

      {records.length > 0 && (
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
