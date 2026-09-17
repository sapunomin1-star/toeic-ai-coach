"use client";

import { useMemo } from "react";
import type { AnswerRecord } from "@/types/question";

type TrendDay = {
  key: string;
  label: string;
  total: number;
  correct: number;
};

type TrendSummary = {
  days: TrendDay[];
  total: number;
  accuracy: number | null;
  activeDays: number;
  accuracyChange: number | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export default function WeeklyTrendSection({ records }: { records: AnswerRecord[] }) {
  const trend = useMemo(() => buildTrend(records), [records]);
  const maxTotal = Math.max(1, ...trend.days.map((day) => day.total));

  return (
    <section className="product-surface rounded-[1.75rem] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
            Progress evidence
          </p>
          <h2 className="mt-1.5 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
            最近 7 日進步證據
          </h2>
        </div>
        {trend.accuracyChange !== null && (
          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-black ${
              trend.accuracyChange >= 0
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            }`}
          >
            較前 7 日 {trend.accuracyChange >= 0 ? "+" : ""}
            {trend.accuracyChange} 個百分點
          </span>
        )}
      </div>

      {trend.total === 0 ? (
        <div className="mt-5 rounded-2xl bg-[var(--canvas)] p-5">
          <p className="text-sm font-black text-[var(--ink)]">先完成第一回合，建立可比較的基準</p>
          <p className="text-pretty mt-1 text-xs leading-5 text-[var(--muted)]">
            這裡只顯示真實練習紀錄；資料不足時不會用假趨勢填滿畫面。
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <Metric label="有效作答" value={`${trend.total}`} unit="題" />
            <Metric
              label="正確率"
              value={trend.accuracy === null ? "–" : `${trend.accuracy}`}
              unit={trend.accuracy === null ? "" : "%"}
            />
            <Metric label="練習日" value={`${trend.activeDays}`} unit="天" />
          </div>

          <div
            className="mt-6 grid h-40 grid-cols-7 items-end gap-1.5 sm:gap-2"
            role="img"
            aria-label={`最近七日每日作答量；共 ${trend.total} 題，正確率 ${trend.accuracy ?? 0}%`}
          >
            {trend.days.map((day) => {
              const accuracy = day.total === 0 ? null : Math.round((day.correct / day.total) * 100);
              const height = day.total === 0 ? 4 : Math.max(14, Math.round((day.total / maxTotal) * 100));
              return (
                <div key={day.key} className="flex h-full min-w-0 flex-col justify-end text-center">
                  <span className="mb-1 block text-[10px] font-bold text-[var(--muted)]">
                    {accuracy === null ? "" : `${accuracy}%`}
                  </span>
                  <span
                    className={`mx-auto w-full max-w-10 rounded-t-lg transition-[height] ${
                      day.total === 0 ? "bg-[var(--line)]" : "bg-[var(--brand)]"
                    }`}
                    style={{ height: `${height}%` }}
                    title={`${day.label}：${day.total} 題${accuracy === null ? "" : `，正確率 ${accuracy}%`}`}
                  />
                  <span className="mt-2 block text-[10px] font-bold text-[var(--muted)]">
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-[var(--line)] pt-3 text-[10px] text-[var(--muted)]">
            <span aria-hidden="true" className="h-2 w-2 rounded-sm bg-[var(--brand)]" />
            柱高代表每日有效作答量；上方數字為當日正確率
          </div>
        </>
      )}
    </section>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-2xl bg-[var(--canvas)] p-3 text-center">
      <p className="text-[10px] font-bold text-[var(--muted)]">{label}</p>
      <p className="number-tabular mt-1 text-2xl font-black tracking-[-0.05em] text-[var(--ink)]">
        {value}
        {unit && <span className="ml-1 text-[10px] font-bold text-[var(--muted)]">{unit}</span>}
      </p>
    </div>
  );
}

function buildTrend(records: AnswerRecord[]): TrendSummary {
  const dailyRecords = records.filter((record) => record.source !== "mock");
  const today = startOfLocalDay(new Date());
  const recentStart = new Date(today.getTime() - 6 * DAY_MS);
  const previousStart = new Date(today.getTime() - 13 * DAY_MS);

  const days: TrendDay[] = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(recentStart.getTime() + index * DAY_MS);
    return {
      key: localDayKey(date),
      label: date.toLocaleDateString("zh-TW", { weekday: "short" }).replace("週", ""),
      total: 0,
      correct: 0,
    };
  });
  const dayMap = new Map(days.map((day) => [day.key, day]));

  for (const record of dailyRecords) {
    const answered = new Date(record.answeredAt);
    if (Number.isNaN(answered.getTime()) || answered < recentStart) continue;
    const day = dayMap.get(localDayKey(answered));
    if (!day) continue;
    day.total += 1;
    if (record.isCorrect) day.correct += 1;
  }

  const total = days.reduce((sum, day) => sum + day.total, 0);
  const correct = days.reduce((sum, day) => sum + day.correct, 0);
  const previous = dailyRecords.filter((record) => {
    const answered = new Date(record.answeredAt);
    return answered >= previousStart && answered < recentStart;
  });
  const previousCorrect = previous.filter((record) => record.isCorrect).length;
  const accuracy = total === 0 ? null : Math.round((correct / total) * 100);
  const previousAccuracy =
    previous.length === 0 ? null : Math.round((previousCorrect / previous.length) * 100);

  return {
    days,
    total,
    accuracy,
    activeDays: days.filter((day) => day.total > 0).length,
    accuracyChange:
      accuracy === null || previousAccuracy === null ? null : accuracy - previousAccuracy,
  };
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function localDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
