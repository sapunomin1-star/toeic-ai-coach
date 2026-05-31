"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getMockReviewSnapshot } from "@/lib/mockReviewStorage";
import { formatTime } from "@/lib/mockShared";
import type {
  MockReviewQuestionSnapshot,
  MockReviewSnapshot,
} from "@/types/mock";
import type { Choice } from "@/types/question";

const MODE_LABELS: Record<MockReviewSnapshot["mode"], string> = {
  reading: "閱讀模擬考",
  listening: "聽力模擬考",
  full: "完整模擬考",
};

const CHOICE_KEYS: Choice[] = ["A", "B", "C", "D"];

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function choiceClass(item: MockReviewQuestionSnapshot, key: Choice): string {
  const base = "rounded-xl border px-3 py-2 text-sm";
  if (key === item.correctAnswer) {
    return `${base} border-emerald-200 bg-emerald-50 text-emerald-900`;
  }
  if (key === item.userAnswer && key !== item.correctAnswer) {
    return `${base} border-rose-200 bg-rose-50 text-rose-900`;
  }
  return `${base} border-slate-200 bg-white text-slate-700`;
}

function answerLabel(value?: Choice): string {
  return value ?? "未作答";
}

function ReviewItem({
  item,
  index,
}: {
  item: MockReviewQuestionSnapshot;
  index: number;
}) {
  const choices = CHOICE_KEYS.filter((key) => item.choices[key]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500">
            Q{index + 1} · {item.part}
          </p>
          <h2 className="mt-1 text-base font-semibold text-slate-900">
            {item.question || "請依照音檔內容作答"}
          </h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            item.isCorrect
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {item.isCorrect ? "答對" : "答錯"}
        </span>
      </div>

      {item.imageUrl && (
        <div className="relative mt-4 h-56 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt ?? item.question}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-contain"
          />
        </div>
      )}

      {(item.audioUrl || item.questionAudioUrl || item.audioScript) && (
        <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-3">
          <p className="text-xs font-semibold text-indigo-800">Audio metadata</p>
          {item.audioUrl && (
            <audio controls preload="none" src={item.audioUrl} className="mt-2 w-full" />
          )}
          {item.questionAudioUrl && (
            <div className="mt-2">
              <p className="text-[11px] font-semibold text-indigo-700">
                Part 3 question audio
              </p>
              <audio
                controls
                preload="none"
                src={item.questionAudioUrl}
                className="mt-1 w-full"
              />
            </div>
          )}
          {item.audioScript && (
            <p className="mt-2 whitespace-pre-wrap text-xs text-indigo-900">
              {item.audioScript}
            </p>
          )}
        </div>
      )}

      {item.transcript && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-600">Transcript</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
            {item.transcript}
          </p>
        </div>
      )}

      {item.passage && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-600">Passage</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
            {item.passage}
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-2">
        {choices.map((key) => (
          <div key={key} className={choiceClass(item, key)}>
            <span className="font-semibold">{key}.</span> {item.choices[key]}
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-slate-500">你的答案</p>
          <p className="mt-1 font-bold text-slate-900">{answerLabel(item.userAnswer)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-slate-500">正確答案</p>
          <p className="mt-1 font-bold text-emerald-700">{item.correctAnswer}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-slate-500">作答時間</p>
          <p className="mt-1 font-bold text-slate-900">
            {item.responseTimeMs !== undefined
              ? formatTime(item.responseTimeMs)
              : "尚未記錄"}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3">
        <p className="text-xs font-semibold text-amber-800">Explanation</p>
        <p className="mt-1 whitespace-pre-wrap text-sm text-amber-950">
          {item.explanation_zh}
        </p>
        {item.explanation_en && (
          <p className="mt-2 whitespace-pre-wrap text-xs text-amber-900">
            {item.explanation_en}
          </p>
        )}
      </div>
    </section>
  );
}

export default function MockReviewPage() {
  const params = useParams<{ snapshotId: string }>();
  const [snapshot, setSnapshot] = useState<MockReviewSnapshot | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setSnapshot(getMockReviewSnapshot(params.snapshotId));
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, [params.snapshotId]);

  const summary = useMemo(() => {
    if (!snapshot) return null;
    const correct = snapshot.items.filter((item) => item.isCorrect).length;
    return {
      correct,
      total: snapshot.items.length,
      unanswered: snapshot.items.filter((item) => !item.userAnswer).length,
    };
  }, [snapshot]);

  if (!loaded) {
    return <p className="py-10 text-center text-slate-500">載入檢討資料中…</p>;
  }

  if (!snapshot || !summary) {
    return (
      <main className="space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">找不到這次模考檢討資料</h1>
          <p className="mt-2 text-sm text-slate-500">
            可能是舊版模考紀錄、localStorage 已清除，或 snapshot 已被較新的紀錄取代。
          </p>
        </section>
        <Link
          href="/"
          className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm"
        >
          返回桌面
        </Link>
      </main>
    );
  }

  return (
    <main className="space-y-4 pb-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-900 p-5 text-white shadow-md">
        <p className="text-xs uppercase tracking-widest text-indigo-200">
          Mock Review Snapshot
        </p>
        <h1 className="mt-2 text-2xl font-bold">{MODE_LABELS[snapshot.mode]}檢討</h1>
        <p className="mt-1 text-sm text-indigo-100">
          交卷時間：{formatDateTime(snapshot.submittedAt)}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] uppercase tracking-wider text-indigo-200">Correct</p>
            <p className="mt-1 text-xl font-bold">{summary.correct}/{summary.total}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] uppercase tracking-wider text-indigo-200">Unanswered</p>
            <p className="mt-1 text-xl font-bold">{summary.unanswered}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] uppercase tracking-wider text-indigo-200">Mode</p>
            <p className="mt-1 text-sm font-bold">{MODE_LABELS[snapshot.mode]}</p>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {snapshot.items.map((item, index) => (
          <ReviewItem key={item.questionId} item={item} index={index} />
        ))}
      </div>

      <Link
        href="/"
        className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm"
      >
        返回桌面
      </Link>
    </main>
  );
}
