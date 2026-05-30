import Link from "next/link";
import type { VocabularyQuizStats } from "@/lib/vocabularyStorage";
import { StatCard, VocabularyQuizSummary } from "./cards";

export function VocabQuizSection({
  quizStats,
  dailyQuizStats,
  randomQuizStats,
  reinforcementQuizStats,
}: {
  quizStats: VocabularyQuizStats | null;
  dailyQuizStats: VocabularyQuizStats | null;
  randomQuizStats: VocabularyQuizStats | null;
  reinforcementQuizStats: VocabularyQuizStats | null;
}) {
  if (!quizStats) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold">每日單字驗收</h2>
      {dailyQuizStats &&
      dailyQuizStats.totalCorrect + dailyQuizStats.totalWrong > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-3 text-center">
            <StatCard
              label="答對"
              value={dailyQuizStats.totalCorrect.toString()}
              accent="text-emerald-600"
            />
            <StatCard
              label="答錯"
              value={dailyQuizStats.totalWrong.toString()}
              accent="text-rose-600"
            />
            <StatCard
              label="正確率"
              value={`${dailyQuizStats.accuracy}%`}
              accent={
                dailyQuizStats.accuracy >= 70
                  ? "text-emerald-600"
                  : "text-rose-600"
              }
            />
          </div>
          {dailyQuizStats.lastQuizAt && (
            <p className="mt-2 text-xs text-slate-400">
              最近驗收：
              {new Date(dailyQuizStats.lastQuizAt).toLocaleDateString("zh-TW", {
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
          <p className="mt-2 text-sm text-slate-600">
            {dailyQuizStats.accuracy < 70
              ? "正確率偏低，先完成今日加強與到期複習。"
              : dailyQuizStats.accuracy <= 85
                ? "持續完成每日驗收，穩定拉長複習間隔。"
                : "正確率很高，可以挑戰全庫隨機題目。"}
          </p>
        </>
      ) : (
        <p className="text-sm text-slate-500">
          完成新的每日單字驗收後，這裡會顯示你的正式記憶表現。
        </p>
      )}
      <div className="mt-4 divide-y divide-slate-100 border-y border-slate-100 text-sm">
        <VocabularyQuizSummary label="隨機挑戰" stats={randomQuizStats} />
        <VocabularyQuizSummary label="今日加強" stats={reinforcementQuizStats} />
      </div>
      {quizStats.totalCorrect + quizStats.totalWrong > 0 && (
        <p className="mt-3 text-xs text-slate-400">
          累積全部測驗（含改版前紀錄）：答對 {quizStats.totalCorrect}、答錯{" "}
          {quizStats.totalWrong}、正確率 {quizStats.accuracy}%
        </p>
      )}
      <Link
        href="/vocabulary-quiz?mode=random"
        className="mt-4 block rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-center text-sm font-semibold text-indigo-700 active:scale-[0.99]"
      >
        隨機挑戰 →（從全庫抽 10 題）
      </Link>
    </section>
  );
}
