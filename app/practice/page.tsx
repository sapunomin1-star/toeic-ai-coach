"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ensureQuestionBankLoaded,
  loadQuestionBank,
  questionBank,
} from "@/lib/questionBank";
import type { PlanCounts } from "@/lib/questionBank";
import {
  clearWrongPracticePlan,
  getAnswerRecords,
  getDailyPlan,
  getReviewableIds,
  saveDailyPlan,
} from "@/lib/storage";
import { getNextDayListeningMix, getWeakestSkills } from "@/lib/analysis";
import type { NextDayListeningMix } from "@/lib/analysis";

const WEAK_COUNT = 3;
const NEW_COUNT = 3;
const PART6_GROUP_COUNT = 1;
const PART6_QUESTIONS_PER_GROUP = 4;
const READING_GROUP_COUNT = 1;
const READING_ESTIMATED_COUNT = 3;
const REVIEW_MAX = 3;
const ESTIMATED_SECONDS = {
  part5: 38,
  part6: 50,
  listeningSingle: 30,
  listeningGroupQuestion: 50,
  reading: 65,
  review: 45,
} as const;

const DEFAULT_LISTENING_MIX: NextDayListeningMix = {
  part1Count: 1,
  part2Count: 2,
  part3GroupCount: 1,
  part4GroupCount: 1,
  reason: "依預設比例",
  boosted: [],
};

export default function PracticePage() {
  const router = useRouter();
  const [reviewCount, setReviewCount] = useState(0);
  const [hasInProgress, setHasInProgress] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [progressTotal, setProgressTotal] = useState(0);
  const [planCounts, setPlanCounts] = useState<PlanCounts | null>(null);
  const [listeningMix, setListeningMix] = useState<NextDayListeningMix>(
    DEFAULT_LISTENING_MIX,
  );
  // The current bank always has Part 6 groups; default to true so the task
  // list does not flash while the lazily loaded bank confirms it. This state
  // is display-only — startNewPlan re-derives availability from the loaded
  // bank at click time (the render closure could be stale).
  const [hasPart6Questions, setHasPart6Questions] = useState(true);
  const part6Count = hasPart6Questions ? PART6_QUESTIONS_PER_GROUP : 0;
  const startingPlan = useRef(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await loadQuestionBank();
      } catch (error) {
        console.error("[practice] failed to load question bank:", error);
      }
      if (cancelled) return;
      try {
        setHasPart6Questions(
          questionBank().getQuestionsByPart("Part 6").length >=
            PART6_QUESTIONS_PER_GROUP,
        );
      } catch {
        // Bank unavailable: keep the optimistic default; startNewPlan retries.
      }
      const reviewIds = getReviewableIds();
      setReviewCount(Math.min(reviewIds.length, REVIEW_MAX));

      setListeningMix(getNextDayListeningMix(getAnswerRecords()));

      const existing = getDailyPlan();
      if (
        existing &&
        (existing.cursor < existing.questionIds.length || existing.pendingFeedback)
      ) {
        setHasInProgress(true);
        setProgressIndex(existing.cursor);
        setProgressTotal(existing.questionIds.length);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const counts: PlanCounts =
    planCounts ?? {
      weak: WEAK_COUNT,
      new: NEW_COUNT,
      part6: part6Count,
      part1: listeningMix.part1Count,
      part2: listeningMix.part2Count,
      part3: listeningMix.part3GroupCount * 3,
      part4: listeningMix.part4GroupCount * 3,
      reading: READING_ESTIMATED_COUNT,
      review: reviewCount,
    };
  const estimatedSeconds =
    (counts.weak + counts.new) * ESTIMATED_SECONDS.part5 +
    counts.part6 * ESTIMATED_SECONDS.part6 +
    (counts.part1 + counts.part2) * ESTIMATED_SECONDS.listeningSingle +
    (counts.part3 + counts.part4) * ESTIMATED_SECONDS.listeningGroupQuestion +
    counts.reading * ESTIMATED_SECONDS.reading +
    counts.review * ESTIMATED_SECONDS.review;
  const minMin = Math.max(
    15,
    Math.round(estimatedSeconds / 60),
  );
  const maxMin = minMin + 5;
  const plannedTotal = Object.values(counts).reduce((sum, count) => sum + count, 0);

  async function startNewPlan() {
    if (startingPlan.current) return;
    startingPlan.current = true;
    try {
      if (!(await ensureQuestionBankLoaded())) return;
      const part6Ready =
        questionBank().getQuestionsByPart("Part 6").length >=
        PART6_QUESTIONS_PER_GROUP;
      setHasPart6Questions(part6Ready);
      clearWrongPracticePlan();
      const reviewIds = getReviewableIds().slice(0, REVIEW_MAX);
      const records = getAnswerRecords();
      const weakSkillTags = getWeakestSkills(records, 2, 5).map((w) => w.skill);
      const mix = getNextDayListeningMix(records);
      setListeningMix(mix);
      const plan = questionBank().buildDailyPlan({
        weakCount: WEAK_COUNT,
        newCount: NEW_COUNT,
        part6GroupCount: part6Ready ? PART6_GROUP_COUNT : 0,
        part1Count: mix.part1Count,
        part2Count: mix.part2Count,
        part3GroupCount: mix.part3GroupCount,
        part4GroupCount: mix.part4GroupCount,
        readingGroupCount: READING_GROUP_COUNT,
        reviewIds,
        reviewCount: REVIEW_MAX,
        weakSkillTags,
        answeredIds: new Set(records.map((r) => r.questionId)),
      });
      setPlanCounts(plan.counts);
      saveDailyPlan({
        questionIds: plan.questions.map((q) => q.id),
        createdAt: new Date().toISOString(),
        cursor: 0,
      });
      router.push("/quiz");
    } finally {
      startingPlan.current = false;
    }
  }

  function continueExisting() {
    clearWrongPracticePlan();
    router.push("/quiz");
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] bg-[var(--brand-deep)] p-6 text-white shadow-[0_22px_60px_rgba(30,44,88,0.18)] sm:p-8">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[var(--brand)] opacity-50 blur-3xl"
        />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--signal)]">
            Adaptive session · today
          </p>
          <h1 className="text-balance mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
            今天的練習，已替你排好優先順序。
          </h1>
          <p className="text-pretty mt-3 max-w-xl text-sm leading-6 text-white/65">
            先處理到期錯題，再針對近期弱點安排新題，最後用完整題組確認能否真正遷移。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <SummaryPill label="預估時間" value={`${minMin}–${maxMin} 分鐘`} />
            <SummaryPill label="今日題量" value={`約 ${plannedTotal} 題`} />
            <SummaryPill
              label="安排方式"
              value={listeningMix.boosted.length > 0 ? "已依表現調整" : "維持穩定負荷"}
              signal={listeningMix.boosted.length > 0}
            />
          </div>
        </div>
      </section>

      {hasInProgress && (
        <div
          role="status"
          aria-label={`未完成訓練進度：第 ${progressIndex} 題，共 ${progressTotal} 題`}
          className="product-surface flex items-center gap-4 rounded-2xl border-l-4 border-l-amber-400 p-4"
        >
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-sm font-black text-amber-800"
          >
            {progressIndex}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black text-[var(--ink)]">上次停在這裡</span>
            <span className="mt-0.5 block text-xs text-[var(--muted)]">
              已完成 {progressIndex} / {progressTotal} 題，答案與進度都已保留。
            </span>
          </span>
        </div>
      )}

      <section>
        <div className="mb-3 flex items-end justify-between gap-3 px-1">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand)]">
              Session map
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
              這份處方會練到什麼
            </h2>
          </div>
          <p className="hidden text-xs text-[var(--muted)] sm:block">四個能力模組</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <PracticeModule
            index="01"
            eyebrow="Precision"
            title="句子精準度"
            count={counts.weak + counts.new + counts.part6}
            unit="題"
            description="把最常失分的文法，放進新句型與完整短文重新判斷。"
            tone="blue"
            tasks={[
              { label: "弱點補強", detail: `${counts.weak} 題 · 依近期錯誤率挑選` },
              { label: "Part 5 新題", detail: `${counts.new} 題 · 避免只記住舊答案` },
              ...(counts.part6 > 0
                ? [{ label: "Part 6 短文填空", detail: `1 組 · ${counts.part6} 題 · 保留完整上下文` }]
                : []),
            ]}
          />
          <PracticeModule
            index="02"
            eyebrow="Listening"
            title="聽力理解"
            count={counts.part1 + counts.part2 + counts.part3 + counts.part4}
            unit="題"
            description="從單句反應到完整對話，訓練在一次播放中抓住真正有用的訊號。"
            tone="violet"
            tasks={[
              { label: "Part 1 / 2", detail: `${counts.part1} 題照片描述 · ${counts.part2} 題應答` },
              { label: "Part 3 / 4", detail: `${counts.part3 / 3} 組對話 · ${counts.part4 / 3} 組短講` },
              {
                label: listeningMix.boosted.length > 0 ? "已自動加強" : "今日配比",
                detail: listeningMix.reason,
              },
            ]}
          />
          <PracticeModule
            index="03"
            eyebrow="Reading"
            title="閱讀遷移"
            count={counts.reading}
            unit="題"
            description="保留整篇文章與題組，練習定位細節、主旨與推論，而不是拆成零碎單題。"
            tone="amber"
            tasks={[
              { label: "Part 7 單篇閱讀", detail: `1 組 · 約 ${counts.reading} 題` },
              { label: "完整文章", detail: "題目共享同一份語境，不切斷閱讀線索" },
            ]}
          />
          <PracticeModule
            index="04"
            eyebrow="Recovery"
            title="錯題回收"
            count={counts.review}
            unit="題"
            description="到期才重新出現；跨日連續答對後，才會離開需要複習的狀態。"
            tone="green"
            muted={counts.review === 0}
            tasks={[
              {
                label: counts.review > 0 ? "今日到期複習" : "目前沒有到期題目",
                detail:
                  counts.review > 0
                    ? `${counts.review} 題優先排在新題之前`
                    : "系統不會為了湊數重複塞題",
              },
              { label: "精熟門檻", detail: "需跨日穩定答對，不把短期記憶算成學會" },
            ]}
          />
        </div>
      </section>

      <details className="product-surface group rounded-2xl">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-black text-[var(--ink)] sm:px-5">
          為什麼教練這樣安排？
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-full bg-[var(--canvas)] text-xs transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="border-t border-[var(--line)] px-4 py-4 text-xs leading-6 text-[var(--muted)] sm:px-5">
          <p>
            教練先讀取到期複習，再用近期錯誤率判斷弱點；聽力某 Part 在最近樣本低於門檻時才加題，每日負荷仍有上限。
          </p>
          <p className="mt-2">
            Part 6 與 Part 7 固定保留完整文章題組，避免為了壓低題數而破壞上下文。
          </p>
        </div>
      </details>

      <section className="product-surface rounded-[1.75rem] p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand)]">
              Ready when you are
            </p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">
              {hasInProgress
                ? `接續第 ${progressIndex + 1} 題，不會重寫已完成紀錄。`
                : "開始後每題都會立即保存，離開也能從原位繼續。"}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:min-w-56">
            {hasInProgress ? (
              <>
                <button
                  onClick={continueExisting}
                  className="product-interactive min-h-12 w-full rounded-xl bg-[var(--ink)] px-5 py-3 text-sm font-black text-white shadow-sm active:scale-[0.99]"
                >
                  繼續未完成的訓練 →
                </button>
                <button
                  onClick={startNewPlan}
                  className="min-h-11 w-full rounded-xl border border-[var(--line)] bg-white px-5 py-2.5 text-xs font-bold text-[var(--muted)] active:scale-[0.99]"
                >
                  重新建立今日處方
                </button>
              </>
            ) : (
              <button
                onClick={startNewPlan}
                className="product-interactive min-h-12 w-full rounded-xl bg-[var(--ink)] px-5 py-3 text-sm font-black text-white shadow-sm active:scale-[0.99]"
              >
                開始今日訓練 →
              </button>
            )}
          </div>
        </div>
      </section>

      <Link
        href="/"
        className="block w-full py-2 text-center text-xs font-bold text-[var(--muted)]"
      >
        ← 回到今日總覽
      </Link>
    </div>
  );
}

function SummaryPill({
  label,
  value,
  signal = false,
}: {
  label: string;
  value: string;
  signal?: boolean;
}) {
  return (
    <span className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2">
      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
        {label}
      </span>
      <span className={`mt-0.5 block text-xs font-black ${signal ? "text-[var(--signal)]" : "text-white"}`}>
        {value}
      </span>
    </span>
  );
}

type ModuleTone = "blue" | "violet" | "amber" | "green";

const MODULE_TONES: Record<ModuleTone, { panel: string; badge: string; accent: string }> = {
  blue: {
    panel: "border-blue-100 bg-blue-50/55",
    badge: "bg-blue-600 text-white",
    accent: "text-blue-700",
  },
  violet: {
    panel: "border-violet-100 bg-violet-50/55",
    badge: "bg-violet-600 text-white",
    accent: "text-violet-700",
  },
  amber: {
    panel: "border-amber-100 bg-amber-50/60",
    badge: "bg-amber-400 text-amber-950",
    accent: "text-amber-800",
  },
  green: {
    panel: "border-emerald-100 bg-emerald-50/55",
    badge: "bg-emerald-600 text-white",
    accent: "text-emerald-700",
  },
};

function PracticeModule({
  index,
  eyebrow,
  title,
  count,
  unit,
  description,
  tone,
  tasks,
  muted = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  count: number;
  unit: string;
  description: string;
  tone: ModuleTone;
  tasks: Array<{ label: string; detail: string }>;
  muted?: boolean;
}) {
  const colors = MODULE_TONES[tone];
  return (
    <article className={`rounded-[1.5rem] border p-5 shadow-[0_12px_32px_rgba(24,33,27,0.035)] ${colors.panel} ${muted ? "opacity-65" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${colors.accent}`}>
            {index} · {eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-black tracking-[-0.025em] text-[var(--ink)]">
            {title}
          </h3>
        </div>
        <span className={`number-tabular grid min-h-14 min-w-14 place-items-center rounded-2xl px-2 ${colors.badge}`}>
          <span className="text-center leading-none">
            <span className="block text-2xl font-black tracking-[-0.05em]">{count}</span>
            <span className="mt-1 block text-[10px] font-black uppercase tracking-wider opacity-75">{unit}</span>
          </span>
        </span>
      </div>
      <p className="text-pretty mt-4 text-xs leading-5 text-[var(--muted)]">{description}</p>
      <ul className="mt-4 divide-y divide-black/[0.06] border-t border-black/[0.06]">
        {tasks.map((task) => (
          <li key={`${task.label}-${task.detail}`} className="grid gap-0.5 py-2.5 sm:grid-cols-[auto_1fr] sm:gap-3">
            <span className="text-xs font-black text-[var(--ink)]">{task.label}</span>
            <span className="text-xs leading-5 text-[var(--muted)] sm:text-right">{task.detail}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
