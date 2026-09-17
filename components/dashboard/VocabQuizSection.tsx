import Link from "next/link";
import type { VocabularyQuizStats } from "@/lib/vocabularyStorage";
import type { QuizQuestionType } from "@/types/vocabulary";
import { StatCard, VocabularyQuizSummary } from "./cards";

function typeSummary(stats: VocabularyQuizStats | undefined): string {
  const attempts = (stats?.totalCorrect ?? 0) + (stats?.totalWrong ?? 0);
  return attempts > 0 ? `${attempts} 題 · ${stats?.accuracy ?? 0}%` : "尚無";
}

export function VocabQuizSection({
  quizStats,
  dailyQuizStats,
  randomQuizStats,
  reinforcementQuizStats,
  backlogQuizStats,
  typeStats,
}: {
  quizStats: VocabularyQuizStats | null;
  dailyQuizStats: VocabularyQuizStats | null;
  randomQuizStats: VocabularyQuizStats | null;
  reinforcementQuizStats: VocabularyQuizStats | null;
  backlogQuizStats: VocabularyQuizStats | null;
  typeStats: Record<QuizQuestionType, VocabularyQuizStats> | null;
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
        <VocabularyQuizSummary label="到期補做" stats={backlogQuizStats} />
      </div>
      {typeStats && (
        <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
          <p className="font-semibold text-slate-700">目前測到的是什麼（依題型）</p>
          <p className="mt-1">
            英→中辨識 {typeSummary(typeStats["en-to-zh"])} · 中→英回想{" "}
            {typeSummary(typeStats["zh-to-en"])} · 例句填空 {typeSummary(typeStats["fill-blank"])}
          </p>
          <p className="mt-1 text-slate-500">
            三種都是四選一；填空沿用字卡例句。換情境理解與不看選項的回想尚未測量，「已掌握」只代表通過了這些測驗的長間隔複習。
          </p>
        </div>
      )}
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
