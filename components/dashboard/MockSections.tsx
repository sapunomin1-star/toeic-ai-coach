import Link from "next/link";
import type { DashboardMetrics } from "@/lib/dashboardMetrics";
import { MOCK_REVIEW_MODE_LABELS } from "@/lib/mockShared";
import type { FullMockResult, MockReviewSnapshot, MockTestResult } from "@/types/mock";

export function TomorrowRecommendation({
  recommendation,
}: {
  recommendation: DashboardMetrics["recommendation"];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold">明日建議</h2>
      <p className="text-sm leading-relaxed text-slate-700">
        {recommendation.message}
      </p>
      {recommendation.secondary && (
        <p className="mt-1.5 text-xs text-slate-500">
          第二優先：{recommendation.secondary.label}
        </p>
      )}
    </section>
  );
}

export function FullMockEntry({ result }: { result: FullMockResult | null }) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 p-4 text-white shadow-md">
      <p className="text-xs uppercase tracking-widest text-indigo-200">Full TOEIC Mock Test</p>
      <h2 className="mt-1 text-lg font-bold">完整 TOEIC 模擬考</h2>
      <p className="mt-1 text-xs text-slate-200">
        200 題 · 120 分鐘 · Listening + Reading · IIBC 預測分數
      </p>
      {result ? (
        <div className="mt-3 rounded-xl bg-white/10 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-indigo-100">最近一次總分預測</p>
              <p className="mt-0.5 text-2xl font-bold">
                {result.totalRange.min}-{result.totalRange.max}
              </p>
              <p className="text-[11px] text-indigo-100">/ 990 · 非官方參考範圍</p>
            </div>
            <div className="text-right text-[11px] text-slate-200">
              <p>
                L {result.listeningRaw}/100 · {result.listeningRange.min}-
                {result.listeningRange.max}
              </p>
              <p className="mt-1">
                R {result.readingRaw}/100 · {result.readingRange.min}-
                {result.readingRange.max}
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center">
            {(["Part 1", "Part 2", "Part 3", "Part 4", "Part 5", "Part 6", "Part 7"] as const).map((part) => {
              const item = result.partBreakdown[part];
              const pct =
                !item || item.total === 0
                  ? 0
                  : Math.round((item.correct / item.total) * 100);
              return (
                <div key={part} className="rounded bg-white/10 p-1">
                  <p className="text-[9px] text-indigo-100">{part.replace("Part ", "P")}</p>
                  <p className="text-[10px] font-bold">{pct}%</p>
                </div>
              );
            })}
          </div>
          {result.leftAppDuringTest && (
            <p className="mt-2 rounded-lg bg-amber-100 px-2 py-1 text-[11px] text-amber-800">
              此次測驗期間曾離開頁面
            </p>
          )}
          <p className="mt-2 text-[11px] text-indigo-200">
            交卷：
            {new Date(result.submittedAt).toLocaleString("zh-TW", {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {result.reviewSnapshotId && (
            <Link
              href={`/mock-review/${result.reviewSnapshotId}`}
              className="mt-2 block rounded-lg bg-white/15 px-3 py-2 text-center text-xs font-semibold text-white active:scale-[0.99]"
            >
              查看這次的完整詳解 →
            </Link>
          )}
        </div>
      ) : (
        <p className="mt-3 rounded-xl bg-white/10 p-3 text-xs text-slate-200">
          完成一次全真模考後，這裡會顯示 Listening、Reading 與總分預測。
        </p>
      )}
      <Link
        href="/full-mock"
        className="mt-3 block w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-indigo-950 active:scale-[0.99]"
      >
        開始完整模擬考 →
      </Link>
    </section>
  );
}

export function ReadingMockEntry({ result }: { result: MockTestResult | null }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold">閱讀模擬考</h2>
      <p className="text-xs text-slate-500">
        100 題 · 75 分鐘 · Part 5/6/7 完整閱讀測驗
      </p>
      {result && (
        <div className="mt-3 rounded-xl bg-slate-50 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">最近一次</p>
              <p className="mt-0.5 text-xl font-bold text-slate-900">
                {result.rawScore}/100
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">非官方估分</p>
              <p className="mt-0.5 text-sm font-semibold text-emerald-700">
                {result.scoreRange.min}-{result.scoreRange.max}
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {(["Part 5", "Part 6", "Part 7"] as const).map((part) => {
              const item = result.partBreakdown[part];
              const pct =
                !item || item.total === 0
                  ? 0
                  : Math.round((item.correct / item.total) * 100);
              return (
                <div key={part} className="rounded-lg bg-white p-2">
                  <p className="text-[10px] text-slate-500">{part}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-800">
                    {pct}%
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            交卷：
            {new Date(result.submittedAt).toLocaleString("zh-TW", {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {result.reviewSnapshotId && (
            <Link
              href={`/mock-review/${result.reviewSnapshotId}`}
              className="mt-2 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-xs font-semibold text-slate-700 active:scale-[0.99]"
            >
              查看這次的詳解 →
            </Link>
          )}
        </div>
      )}
      <Link
        href="/mock-test"
        className="mt-3 block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white active:scale-[0.99]"
      >
        開始閱讀模擬考 →
      </Link>
    </section>
  );
}

export function ListeningMockEntry({ result }: { result: MockTestResult | null }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold">聽力模擬考</h2>
      <p className="text-xs text-slate-500">
        100 題 · 45 分鐘 · Part 1/2/3/4 完整聽力測驗
      </p>
      {result && (
        <div className="mt-3 rounded-xl bg-violet-50 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">最近一次</p>
              <p className="mt-0.5 text-xl font-bold text-slate-900">
                {result.rawScore}/100
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">非官方估分</p>
              <p className="mt-0.5 text-sm font-semibold text-violet-700">
                {result.scoreRange.min}-{result.scoreRange.max}
              </p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 text-center">
            {(["Part 1", "Part 2", "Part 3", "Part 4"] as const).map((part) => {
              const item = result.partBreakdown[part];
              const pct =
                !item || item.total === 0
                  ? 0
                  : Math.round((item.correct / item.total) * 100);
              return (
                <div key={part} className="rounded-lg bg-white p-2">
                  <p className="text-[10px] text-slate-500">{part.replace("Part ", "P")}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-800">
                    {pct}%
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            交卷：
            {new Date(result.submittedAt).toLocaleString(
              "zh-TW",
              {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            )}
          </p>
          {result.reviewSnapshotId && (
            <Link
              href={`/mock-review/${result.reviewSnapshotId}`}
              className="mt-2 block rounded-lg border border-violet-200 bg-white px-3 py-2 text-center text-xs font-semibold text-violet-700 active:scale-[0.99]"
            >
              查看這次的詳解 →
            </Link>
          )}
        </div>
      )}
      <Link
        href="/listening-mock"
        className="mt-3 block w-full rounded-xl bg-violet-700 px-4 py-3 text-center text-sm font-semibold text-white active:scale-[0.99]"
      >
        開始聽力模擬考 →
      </Link>
    </section>
  );
}

/**
 * Every retained review snapshot, newest first. Without this list a snapshot
 * is only reachable from the result screen right after submitting — leave
 * that screen once and the stored詳解 becomes unreachable.
 */
export function MockReviewHistory({ snapshots }: { snapshots: MockReviewSnapshot[] }) {
  if (snapshots.length === 0) return null;

  const newestFirst = [...snapshots].sort((a, b) =>
    b.submittedAt.localeCompare(a.submittedAt),
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold">模考詳解紀錄</h2>
      <p className="text-xs text-slate-500">保留最近 20 次，隨時可回頭檢討。</p>
      <ul className="mt-2 divide-y divide-slate-100">
        {newestFirst.map((snapshot) => {
          const correct = snapshot.items.filter((item) => item.isCorrect).length;
          return (
            <li key={snapshot.id}>
              <Link
                href={`/mock-review/${snapshot.id}`}
                className="flex items-center justify-between gap-3 py-2.5 active:opacity-70"
              >
                <span className="text-sm font-medium text-slate-800">
                  {MOCK_REVIEW_MODE_LABELS[snapshot.mode]}
                </span>
                <span className="flex items-center gap-3 text-xs text-slate-500">
                  <span>
                    {new Date(snapshot.submittedAt).toLocaleDateString("zh-TW", {
                      month: "numeric",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-semibold text-slate-700">
                    {correct}/{snapshot.items.length}
                  </span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
