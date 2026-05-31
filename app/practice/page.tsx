"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buildDailyPlan, getQuestionsByPart } from "@/data/questions";
import type { PlanCounts } from "@/data/questions";
import {
  clearWrongPracticePlan,
  getAnswerRecords,
  getDailyPlan,
  getReviewableIds,
  saveDailyPlan,
} from "@/lib/storage";
import { getNextDayListeningMix, getWeakestSkills } from "@/lib/analysis";
import type { NextDayListeningMix } from "@/lib/analysis";

const WEAK_COUNT = 8;
const NEW_COUNT = 7;
const PART6_COUNT = 2;
const READING_COUNT = 3;
const REVIEW_MAX = 5;
const ESTIMATED_SECONDS_PER_Q = 38;

const DEFAULT_LISTENING_MIX: NextDayListeningMix = {
  part1Count: 2,
  part2Count: 3,
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
  const hasPart6Questions = getQuestionsByPart("Part 6").length > 0;
  const part6Count = hasPart6Questions ? PART6_COUNT : 0;

  useEffect(() => {
    const id = window.setTimeout(() => {
      const reviewIds = getReviewableIds();
      setReviewCount(Math.min(reviewIds.length, REVIEW_MAX));

      setListeningMix(getNextDayListeningMix(getAnswerRecords()));

      const existing = getDailyPlan();
      if (existing && existing.cursor < existing.questionIds.length) {
        setHasInProgress(true);
        setProgressIndex(existing.cursor);
        setProgressTotal(existing.questionIds.length);
      }
    }, 0);
    return () => window.clearTimeout(id);
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
      reading: READING_COUNT,
      review: reviewCount,
    };
  const listeningTotal =
    counts.part1 + counts.part2 + counts.part3 + counts.part4;
  const totalQs =
    counts.weak +
    counts.new +
    counts.part6 +
    listeningTotal +
    counts.reading +
    counts.review;
  const minMin = Math.max(
    15,
    Math.round((totalQs * ESTIMATED_SECONDS_PER_Q) / 60)
  );
  const maxMin = minMin + 5;

  function startNewPlan() {
    clearWrongPracticePlan();
    const reviewIds = getReviewableIds().slice(0, REVIEW_MAX);
    const records = getAnswerRecords();
    const weakSkillTags = getWeakestSkills(records, 2, 5).map((w) => w.skill);
    const mix = getNextDayListeningMix(records);
    setListeningMix(mix);
    const plan = buildDailyPlan({
      weakCount: WEAK_COUNT,
      newCount: NEW_COUNT,
      part6Count,
      part1Count: mix.part1Count,
      part2Count: mix.part2Count,
      part3GroupCount: mix.part3GroupCount,
      part4GroupCount: mix.part4GroupCount,
      readingCount: READING_COUNT,
      reviewIds,
      weakSkillTags,
    });
    setPlanCounts(plan.counts);
    saveDailyPlan({
      questionIds: plan.questions.map((q) => q.id),
      createdAt: new Date().toISOString(),
      cursor: 0,
    });
    router.push("/quiz");
  }

  function continueExisting() {
    clearWrongPracticePlan();
    router.push("/quiz");
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-indigo-600">
          Today&apos;s Practice
        </p>
        <h1 className="mt-2 text-xl font-bold">今日任務</h1>
        <p className="mt-1 text-sm text-slate-500">
          預估時間：約 {minMin}–{maxMin} 分鐘
        </p>
      </section>

      <ul className="space-y-3">
        <TaskRow
          emoji="💪"
          title="弱點補強"
          desc={`${counts.weak} 題 · 依錯題分析自動挑選最弱文法`}
          tag="Part 5"
          tagColor="rose"
        />
        <TaskRow
          emoji="📝"
          title="新題練習"
          desc={`${counts.new} 題 · 被動 / 詞性 / 時態 / 介系詞 / 連接詞 / 代名詞 / 關係子句 / 商務單字`}
          tag="Part 5"
          tagColor="indigo"
        />
        {counts.part6 > 0 && (
          <TaskRow
            emoji="📋"
            title="短文填空"
            desc={`${counts.part6} 題 · 段落填空 · 詞性 / 連接 / 介系詞`}
            tag="Part 6"
            tagColor="teal"
          />
        )}
        <TaskRow
          emoji="📷"
          title="Part 1 看圖選擇"
          desc={`${counts.part1} 題 · 照片描述`}
          tag="Part 1"
          tagColor="violet"
          dim={counts.part1 === 0}
        />
        <TaskRow
          emoji="🗣️"
          title="Part 2 應答問題"
          desc={`${counts.part2} 題 · Q+A 三選一`}
          tag="Part 2"
          tagColor="violet"
          dim={counts.part2 === 0}
        />
        <TaskRow
          emoji="🎧"
          title="Part 3 對話 / Part 4 短講"
          desc={`${counts.part3 + counts.part4} 題（${counts.part3 / 3} 組 P3 + ${counts.part4 / 3} 組 P4）· 主旨 / 推論 / 下一步行動`}
          tag="聽力"
          tagColor="violet"
          dim={counts.part3 + counts.part4 === 0}
        />
        <TaskRow
          emoji="📄"
          title="Part 7 閱讀測驗"
          desc={`${counts.reading} 題 · 主旨 / 細節定位 / 推論（含短文 passage）`}
          tag="閱讀"
          tagColor="amber"
        />
        <TaskRow
          emoji="🔁"
          title="錯題複習"
          desc={
            counts.review === 0
              ? "目前沒有待複習的錯題"
              : `${counts.review} 題（復習中 / 待加強）`
          }
          tag={counts.review > 0 ? `${counts.review} 題` : "無"}
          tagColor="amber"
          dim={counts.review === 0}
        />
      </ul>

      {listeningMix.boosted.length > 0 && (
        <div
          role="status"
          className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800"
        >
          ⚡ {listeningMix.reason}（聽力配比已自動調整）
        </div>
      )}

      {hasInProgress && (
        <div
          role="status"
          aria-label={`未完成訓練進度：第 ${progressIndex} 題，共 ${progressTotal} 題`}
          className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
        >
          你有未完成的訓練（進度 {progressIndex} / {progressTotal}）。
        </div>
      )}

      <div className="space-y-3">
        {hasInProgress ? (
          <>
            <button
              onClick={continueExisting}
              className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white shadow-sm active:scale-[0.99]"
            >
              繼續未完成的訓練
            </button>
            <button
              onClick={startNewPlan}
              className="block w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center text-base font-semibold text-slate-700 active:scale-[0.99]"
            >
              重新開始今日訓練
            </button>
          </>
        ) : (
          <button
            onClick={startNewPlan}
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white shadow-sm active:scale-[0.99]"
          >
            開始練習 →
          </button>
        )}
        <Link
          href="/"
          className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600"
        >
          回首頁
        </Link>
      </div>
    </div>
  );
}

type TagColor = "rose" | "indigo" | "violet" | "amber" | "teal";

const TAG_CLASSES: Record<TagColor, string> = {
  rose: "bg-rose-100 text-rose-700",
  indigo: "bg-indigo-100 text-indigo-700",
  violet: "bg-violet-100 text-violet-700",
  amber: "bg-amber-100 text-amber-700",
  teal: "bg-teal-100 text-teal-700",
};

function TaskRow({
  emoji,
  title,
  desc,
  tag,
  tagColor,
  dim,
}: {
  emoji: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: TagColor;
  dim?: boolean;
}) {
  return (
    <li
      className={`flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${
        dim ? "opacity-50" : ""
      }`}
    >
      <span className="text-2xl leading-none">{emoji}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">{title}</p>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${TAG_CLASSES[tagColor]}`}
          >
            {tag}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      </div>
    </li>
  );
}
