import type { MockPartBreakdown, MockPartKey } from "@/types/mock";

/**
 * Per-part correct/total progress bars shared by the reading/listening and
 * full mock result screens. Parts with no questions in scope are skipped.
 */
export default function PartBreakdownBars({
  parts,
  breakdown,
}: {
  parts: MockPartKey[];
  breakdown: MockPartBreakdown;
}) {
  return (
    <div className="space-y-2">
      {parts.map((part) => {
        const entry = breakdown[part];
        if (!entry || entry.total === 0) return null;
        const pct = Math.round((entry.correct / entry.total) * 100);
        return (
          <div key={part} className="flex items-center gap-3">
            <span className="w-16 text-xs font-medium text-slate-600">{part}</span>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-slate-100">
                <div
                  className={`h-full ${entry.correct / entry.total >= 0.7 ? "bg-emerald-500" : "bg-rose-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <span className="w-24 text-right text-xs text-slate-500">
              {entry.correct}/{entry.total}（{pct}%）
            </span>
          </div>
        );
      })}
    </div>
  );
}
