import type { MistakeReason } from "@/types/question";
import { MISTAKE_REASON_LABELS } from "@/types/question";

export default function ReasonBreakdownSection({
  reasonBreakdown,
  reasonInsight,
}: {
  reasonBreakdown: Record<MistakeReason, number>;
  reasonInsight: string | null;
}) {
  const entries = (Object.entries(reasonBreakdown) as [MistakeReason, number][])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  const maxCount = Math.max(1, ...entries.map(([, count]) => count));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold">錯誤原因分析</h2>

      {total === 0 ? (
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
          再多練幾題，就能幫你分析錯誤原因。
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {reasonInsight && (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Headline Insight
              </p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-indigo-900">
                {reasonInsight}
              </p>
            </div>
          )}

          <div className="space-y-2">
            {entries.map(([reason, count]) => {
              const percent = Math.round((count / total) * 100);
              return (
                <div key={reason} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">
                      {MISTAKE_REASON_LABELS[reason]}
                    </span>
                    <span className="text-slate-500">{percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
