import { LISTENING_SKILLS, READING_SKILLS } from "@/lib/analysis";
import type { DashboardMetrics } from "@/lib/dashboardMetrics";
import { SKILL_LABELS } from "@/types/question";
import { fmtMs, SpeedCell, StatCard } from "./cards";

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

export function PartPerformanceSection({ metrics }: { metrics: DashboardMetrics }) {
  const {
    stats,
    skillMistakes,
    part5Accuracy,
    part5Total,
    part6Accuracy,
    part6Total,
    part6AvgTime,
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
  );
}

export function ReadingPerformanceSection({ metrics }: { metrics: DashboardMetrics }) {
  const { readingAccuracy, readingTotal, part7SkillMistakes } = metrics;

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

export function SpeedSection({ metrics }: { metrics: DashboardMetrics }) {
  const {
    avgTime,
    part5AvgTime,
    part6AvgTime,
    listeningAvgTime,
    readingAvgTime,
    slowCount,
    slowestSkill,
  } = metrics;

  return (
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
  );
}

export function WeaknessSection({ metrics }: { metrics: DashboardMetrics }) {
  const { weakestSkill, slowestSkill, skillMistakes } = metrics;

  if (!weakestSkill && !slowestSkill) return null;

  return (
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
  );
}

export function SkillErrorChart({ metrics }: { metrics: DashboardMetrics }) {
  const { stats, orderedSkills, maxMistakes } = metrics;

  return (
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
  );
}
