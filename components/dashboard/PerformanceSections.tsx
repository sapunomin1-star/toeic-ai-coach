import { LISTENING_SKILLS, MIN_SKILL_ATTEMPTS_FOR_RATE, READING_SKILLS } from "@/lib/analysis";
import type { DashboardMetrics } from "@/lib/dashboardMetrics";
import type { PacingRow } from "@/lib/pacing";
import { SKILL_LABELS } from "@/types/question";
import { fmtMs, StatCard } from "./cards";

export function OverviewStats({ stats }: { stats: DashboardMetrics["stats"] }) {
  return (
    <>
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
            value={stats.todayTotal === 0 ? "—" : `${stats.todayAccuracy}%`}
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
    </>
  );
}

/** Compact one-row accuracy strip (Part 5 / 6 / 7 / 聽力) for the slim view. */
export function PartAccuracySummary({ metrics }: { metrics: DashboardMetrics }) {
  const {
    stats,
    part5Accuracy,
    part5Total,
    part6Accuracy,
    part6Total,
    readingAccuracy,
    readingTotal,
    listeningAccuracy,
    listeningTotal,
  } = metrics;

  if (stats.total === 0) return null;

  const cells = [
    { label: "Part 5", acc: part5Accuracy, total: part5Total },
    { label: "Part 6", acc: part6Accuracy, total: part6Total },
    { label: "Part 7", acc: readingAccuracy, total: readingTotal },
    { label: "聽力", acc: listeningAccuracy, total: listeningTotal },
  ];

  return (
    <section className="grid grid-cols-4 gap-2">
      {cells.map(({ label, acc, total }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm"
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p
            className={`mt-1 text-lg font-bold ${
              total === 0
                ? "text-slate-400"
                : acc >= 70
                  ? "text-emerald-600"
                  : "text-rose-600"
            }`}
          >
            {total > 0 ? `${acc}%` : "—"}
          </p>
          <p className="mt-0.5 text-[10px] text-slate-400">{total} 題</p>
        </div>
      ))}
    </section>
  );
}

export function PartPerformanceSection({ metrics }: { metrics: DashboardMetrics }) {
  const {
    stats,
    skillMistakes,
    part5Accuracy,
    part5Total,
    part6Accuracy,
    part6Total,
    part6WrongCount,
    listeningAccuracy,
    listeningTotal,
    part1Accuracy,
    part1Total,
    part2Accuracy,
    part2Total,
    part3Accuracy,
    part3Total,
    part4Accuracy,
    part4Total,
    nextListeningMix,
  } = metrics;

  if (stats.total === 0) return null;

  return (
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
            Part 6 段落填空 · {part6Total} 題
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
  );
}

export function ReadingPerformanceSection({ metrics }: { metrics: DashboardMetrics }) {
  const { readingAccuracy, readingTotal, part7SkillMistakes } = metrics;
  const readingMistakeTotal = READING_SKILLS.reduce(
    (total, skill) => total + part7SkillMistakes[skill],
    0,
  );

  if (readingTotal === 0) return null;

  return (
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
              readingMistakeTotal > 0
                ? "text-rose-600"
                : "text-emerald-600"
            }`}
          >
            {readingMistakeTotal}題
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
  );
}

export function VocabProgressSection({ metrics }: { metrics: DashboardMetrics }) {
  const { vocabNew, vocabSeen, vocabFamiliar, vocabMastered, vocabularyAdvice } =
    metrics;

  return (
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
  );
}

const PACING_STATUS_LABEL: Record<PacingRow["status"], string> = {
  insufficient: "資料不足",
  within: "在建議配速內",
  over: "超過建議配速",
  listening: "音檔後作答",
};

const PACING_STATUS_CLASS: Record<PacingRow["status"], string> = {
  insufficient: "bg-slate-100 text-slate-500",
  within: "bg-emerald-100 text-emerald-700",
  over: "bg-amber-100 text-amber-800",
  listening: "bg-sky-100 text-sky-700",
};

/**
 * Learning time and pacing observations (review F05). Only records carrying
 * the timing split count; a part without enough of them says 資料不足 rather
 * than borrowing wall-clock times that include audio, passage reading and
 * hidden-tab time. Listening is never flagged — the recording sets its pace.
 */
export function PacingSection({ metrics }: { metrics: DashboardMetrics }) {
  const { pacing } = metrics;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold">學習用時與配速觀察</h2>
      <p className="mb-3 text-[11px] leading-relaxed text-slate-500">
        只計算新版分段計時的作答：離開分頁的時間已扣除、聽力只算音檔結束後的作答時間、文章題組的閱讀時間平均分攤到整組。每個 Part 至少 {pacing.minSample} 筆才顯示中位數。
      </p>
      <ul className="divide-y divide-slate-100">
        {pacing.rows.map((row) => (
          <li key={row.part} className="flex items-center justify-between gap-3 py-2 text-xs">
            <span className="w-14 shrink-0 font-medium text-slate-700">{row.part}</span>
            <span className="min-w-0 flex-1 text-slate-600">
              {row.medianMs === null
                ? `資料不足（${row.sample} / ${pacing.minSample} 筆）`
                : row.status === "listening"
                  ? `音檔結束後作答中位數 ${fmtMs(row.medianMs)} · ${row.sample} 筆`
                  : `中位數 ${fmtMs(row.medianMs)} · 建議 ${fmtMs(row.budgetMs ?? 0)} 內 · ${row.sample} 筆`}
            </span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${PACING_STATUS_CLASS[row.status]}`}
            >
              {PACING_STATUS_LABEL[row.status]}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
        {pacing.legacyRecords > 0
          ? `${pacing.legacyRecords} 筆舊紀錄沒有分段計時，不列入配速。`
          : ""}
        閱讀門檻為{pacing.budgetSource}；超過只是一項觀察，不代表考場來不及。
      </p>
    </section>
  );
}

/**
 * Skills worth re-checking (review F06): fresh attempts only, recent window,
 * sample size shown, and a low-sample badge instead of a verdict.
 */
export function WeaknessSection({ metrics }: { metrics: DashboardMetrics }) {
  const { weakSkills } = metrics;

  if (weakSkills.length === 0) return null;

  return (
    <section className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
      <p className="text-[10px] uppercase tracking-wider text-rose-500">待確認考點</p>
      <ul className="mt-2 space-y-2">
        {weakSkills.map((skill) => (
          <li key={skill.skill} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-rose-800">{SKILL_LABELS[skill.skill]}</p>
              <p className="mt-0.5 text-xs text-rose-700">
                近 {skill.attempts} 題新題錯 {skill.mistakes}（{Math.round(skill.errorRate * 100)}%）
              </p>
            </div>
            {skill.confidence === "insufficient" && (
              <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-rose-600">
                樣本不足
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-rose-600">
        只算首次作答的新題（重做不計）；未滿 {MIN_SKILL_ATTEMPTS_FOR_RATE} 題只標記為值得再確認，不下結論。
      </p>
    </section>
  );
}

export function SkillErrorChart({
  metrics,
  limit,
  title = "累積錯題分佈（含重做，非能力排序）",
}: {
  metrics: DashboardMetrics;
  /** When set, show only the top N skills with at least one mistake. */
  limit?: number;
  title?: string;
}) {
  const { stats, orderedSkills, maxMistakes } = metrics;
  const rows =
    limit != null
      ? orderedSkills.filter(([, count]) => count > 0).slice(0, limit)
      : orderedSkills;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      {stats.total === 0 ? (
        <p className="text-sm text-slate-500">
          還沒有作答紀錄，先去做今日訓練吧。
        </p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-500">目前沒有錯題，繼續保持！</p>
      ) : (
        <ul className="space-y-2">
          {rows.map(([skill, count]) => (
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
  );
}
