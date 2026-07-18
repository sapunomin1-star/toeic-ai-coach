"use client";

import { formatTime } from "@/lib/mockShared";

/** The time-used / unanswered stat pair shown on every mock result screen. */
export default function ResultStatCards({
  timeUsedMs,
  unansweredCount,
  timeLabel = "用時",
}: {
  timeUsedMs: number;
  unansweredCount: number;
  timeLabel?: string;
}) {
  return (
    <section className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">{timeLabel}</p>
        <p className="mt-1 text-lg font-bold text-slate-800">{formatTime(timeUsedMs)}</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">未作答</p>
        <p
          className={`mt-1 text-lg font-bold ${
            unansweredCount > 0 ? "text-rose-600" : "text-slate-800"
          }`}
        >
          {unansweredCount} 題
        </p>
      </div>
    </section>
  );
}
