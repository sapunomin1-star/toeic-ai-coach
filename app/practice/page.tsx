"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buildDailyPlan, getQuestionsByPart } from "@/data/questions";
import {
  clearWrongPracticePlan,
  getDailyPlan,
  getReviewableIds,
  saveDailyPlan,
} from "@/lib/storage";

const WEAK_COUNT = 8;
const NEW_COUNT = 7;
const PART6_COUNT = 2;
const LISTENING_COUNT = 6;
const READING_COUNT = 3;
const REVIEW_MAX = 5;
const ESTIMATED_SECONDS_PER_Q = 38;

export default function PracticePage() {
  const router = useRouter();
  const [reviewCount, setReviewCount] = useState(0);
  const [hasInProgress, setHasInProgress] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [progressTotal, setProgressTotal] = useState(0);
  const hasPart6Questions = getQuestionsByPart("Part 6").length > 0;
  const part6Count = hasPart6Questions ? PART6_COUNT : 0;

  useEffect(() => {
    const id = window.setTimeout(() => {
      const reviewIds = getReviewableIds();
      setReviewCount(Math.min(reviewIds.length, REVIEW_MAX));

      const existing = getDailyPlan();
      if (existing && existing.cursor < existing.questionIds.length) {
        setHasInProgress(true);
        setProgressIndex(existing.cursor);
        setProgressTotal(existing.questionIds.length);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const totalQs = WEAK_COUNT + NEW_COUNT + part6Count + LISTENING_COUNT + READING_COUNT + reviewCount;
  const minMin = Math.max(
    15,
    Math.round((totalQs * ESTIMATED_SECONDS_PER_Q) / 60)
  );
  const maxMin = minMin + 5;

  function startNewPlan() {
    clearWrongPracticePlan();
    const reviewIds = getReviewableIds().slice(0, REVIEW_MAX);
    const plan = buildDailyPlan({
      weakCount: WEAK_COUNT,
      newCount: NEW_COUNT,
      part6Count,
      listeningCount: LISTENING_COUNT,
      readingCount: READING_COUNT,
      reviewIds,
    });
    saveDailyPlan({
      questionIds: plan.map((q) => q.id),
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
          desc={`${WEAK_COUNT} 題 · 依錯題分析自動挑選最弱文法`}
          tag="Part 5"
          tagColor="rose"
        />
        <TaskRow
          emoji="📝"
          title="新題練習"
          desc={`${NEW_COUNT} 題 · 被動 / 詞性 / 時態 / 介系詞 / 連接詞 / 代名詞 / 關係子句 / 商務單字`}
          tag="Part 5"
          tagColor="indigo"
        />
        {part6Count > 0 && (
          <TaskRow
            emoji="📋"
            title="短文填空"
            desc={`${part6Count} 題 · 段落填空 · 詞性 / 連接 / 介系詞`}
            tag="Part 6"
            tagColor="teal"
          />
        )}
        <TaskRow
          emoji="🎧"
          title="Part 3 / 4 聽力"
          desc={`${LISTENING_COUNT} 題 · 主旨 / 推論 / 下一步行動`}
          tag="聽力"
          tagColor="violet"
        />
        <TaskRow
          emoji="📄"
          title="Part 7 閱讀測驗"
          desc={`${READING_COUNT} 題 · 主旨 / 細節定位 / 推論（含短文 passage）`}
          tag="閱讀"
          tagColor="amber"
        />
        <TaskRow
          emoji="🔁"
          title="錯題複習"
          desc={
            reviewCount === 0
              ? "目前沒有待複習的錯題"
              : `${reviewCount} 題（復習中 / 待加強）`
          }
          tag={reviewCount > 0 ? `${reviewCount} 題` : "無"}
          tagColor="amber"
          dim={reviewCount === 0}
        />
      </ul>

      {hasInProgress && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
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
