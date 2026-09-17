import type { GrammarWeakSkill, ReasonInsight } from "@/lib/analysis";
import type { MistakeReason } from "@/types/question";
import { MISTAKE_REASON_LABELS, SKILL_LABELS } from "@/types/question";

/**
 * Self-reported mistake reasons (review F08). Every number here is what the
 * learner tapped inside a fixed window; system suggestions are never counted,
 * and the headline reads the same denominator as the bars.
 */
export default function ReasonBreakdownSection({
  reasonBreakdown,
  reasonInsight,
  grammarWeakSkills,
  onStartGrammarVariantPractice,
}: {
  reasonBreakdown: Record<MistakeReason, number>;
  reasonInsight: ReasonInsight;
  grammarWeakSkills: GrammarWeakSkill[];
  onStartGrammarVariantPractice: () => void;
}) {
  const entries = (Object.entries(reasonBreakdown) as [MistakeReason, number][])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  const maxCount = Math.max(1, ...entries.map(([, count]) => count));
  const remaining = Math.max(0, reasonInsight.required - reasonInsight.labeled);
  const lead = grammarWeakSkills[0];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold">自述錯因（最近 {reasonInsight.windowDays} 天）</h2>
      <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
        只統計你自己點選的原因：{reasonInsight.windowDays} 天內 {reasonInsight.wrongInWindow} 題錯題，已標註{" "}
        {reasonInsight.labeled} 題。系統的猜測不計入。
      </p>

      {total === 0 ? (
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">
          答錯後點選原因；累積 {reasonInsight.required} 題就會顯示分布與觀察。
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {reasonInsight.message ? (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {reasonInsight.carelessGuard ? "值得注意" : "你的自述"}
              </p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-indigo-900">
                {reasonInsight.message}
              </p>
            </div>
          ) : (
            <p className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
              已標註 {reasonInsight.labeled} / {reasonInsight.required} 題；再標 {remaining} 題就會出現觀察。
            </p>
          )}

          {lead && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                文法補強
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {SKILL_LABELS[lead.skill]}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                近 {lead.attempts} 題新題中，{lead.wrongCount} 題你確認是文法問題（錯誤率{" "}
                {Math.round(lead.errorRate * 100)}%
                {lead.confidence === "insufficient" ? "，樣本不足" : ""}）。用同考點的新題練 5 題，不重做原題。
              </p>
              <button
                type="button"
                onClick={onStartGrammarVariantPractice}
                className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white active:scale-[0.99]"
              >
                文法弱點新題練習 →
              </button>
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
                    <span className="text-slate-500">
                      {count} 題 · {percent}%
                    </span>
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
