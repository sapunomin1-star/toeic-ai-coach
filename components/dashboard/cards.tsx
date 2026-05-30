import type { VocabularyQuizStats } from "@/lib/vocabularyStorage";

/** Format a millisecond duration as a coarse "N 秒" label ("—" for zero). */
export function fmtMs(ms: number): string {
  if (ms === 0) return "—";
  const s = Math.round(ms / 1000);
  return `${s} 秒`;
}

export function StatCard({
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

export function SpeedCell({
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

export function VocabularyQuizSummary({
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
