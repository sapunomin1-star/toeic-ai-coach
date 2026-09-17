import { getWeakestSkills } from "@/lib/analysis";
import { SKILL_LABELS, type AnswerRecord } from "@/types/question";
import type { DailyPlan, QuizPlanSource } from "@/lib/storage";

export type TodayCoachState = {
  /** True when the vocabulary bank chunk failed to load — the vocabulary
   * steps must then read as unavailable, never as completed. */
  vocabularyUnavailable: boolean;
  resumeAction: (CoachAction & { source: QuizPlanSource }) | null;
  vocabularyTotal: number;
  reviewedCount: number;
  /** Words tested today; `validatedCorrectCount` says how many actually passed. */
  validatedCount: number;
  validatedCorrectCount: number;
  validatedWrongCount: number;
  reinforcementCount: number;
  canReinforce: boolean;
  /** Formal due reviews the core session could not fit (see getDueBacklog). */
  dueBacklogCount: number;
  practiceCursor: number;
  practiceTotal: number;
  practiceHasPendingFeedback: boolean;
  reviewDueCount: number;
  weeklyAnswered: number;
  weeklyAccuracy: number | null;
  focusLabel: string;
  /** The evidence behind focusLabel: sample size and error rate, or why there is none. */
  focusDetail: string;
};

/** focusLabel value when there is no weakness evidence yet (first attempts only). */
export const BASELINE_FOCUS_LABEL = "建立學習基準";

export type CoachAction = {
  href: string;
  label: string;
  detail: string;
  meta: string;
};

export function buildLearningPulse(records: AnswerRecord[], now = new Date()): Pick<
  TodayCoachState,
  "weeklyAnswered" | "weeklyAccuracy" | "focusLabel" | "focusDetail"
> {
  const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6).getTime();
  const recent = records.filter(
    (record) =>
      record.source !== "mock" &&
      Date.parse(record.answeredAt) >= sevenDaysAgo &&
      Date.parse(record.answeredAt) <= now.getTime(),
  );
  const correct = recent.filter((record) => record.isCorrect).length;
  const weakest = getWeakestSkills(records, 1)[0];

  return {
    weeklyAnswered: recent.length,
    weeklyAccuracy:
      recent.length === 0 ? null : Math.round((correct / recent.length) * 100),
    focusLabel: weakest ? SKILL_LABELS[weakest.skill] : BASELINE_FOCUS_LABEL,
    // Fresh attempts only (repeats excluded); a thin sample is a flag to
    // re-check, never a verdict (review F06).
    focusDetail: weakest
      ? weakest.confidence === "ok"
        ? `近 ${weakest.attempts} 題新題錯 ${weakest.mistakes}（${Math.round(weakest.errorRate * 100)}%）`
        : `只有 ${weakest.attempts} 題新題樣本，先標記為值得再確認`
      : "先完成第一回合，用新題建立基準",
  };
}

export function getCoachAction(
  today: TodayCoachState,
  vocabularyReviewed: boolean,
  vocabularyValidated: boolean,
  practiceComplete: boolean,
): CoachAction {
  if (today.resumeAction) return today.resumeAction;
  if (today.vocabularyUnavailable) {
    return {
      href: "/vocabulary",
      label: "重新載入單字",
      detail: "單字庫暫時無法使用；今日進度仍安全保留。",
      meta: "立即重試",
    };
  }
  if (!vocabularyReviewed) {
    return {
      href: "/vocabulary",
      label: today.reviewedCount > 0 ? "繼續建立單字記憶" : "從今日單字開始",
      detail: `還有 ${Math.max(0, today.vocabularyTotal - today.reviewedCount)} 字，先用情境與例句建立記憶線索。`,
      meta: "約 8 分鐘",
    };
  }
  if (!vocabularyValidated) {
    return {
      href: "/vocabulary-quiz",
      label: today.validatedCount > 0 ? "繼續單字驗收" : "確認哪些字真的記住了",
      detail:
        today.validatedCount > 0
          ? `已測 ${today.validatedCount} 字（答對 ${today.validatedCorrectCount}）；還有 ${Math.max(0, today.vocabularyTotal - today.validatedCount)} 字待測。`
          : `還有 ${Math.max(0, today.vocabularyTotal - today.validatedCount)} 字，透過主動回想完成正式驗收。`,
      meta: "約 5 分鐘",
    };
  }
  if (today.canReinforce) {
    return {
      href: "/vocabulary-quiz?mode=reinforcement",
      label: "加強剛才不熟的單字",
      detail: `${today.reinforcementCount} 字短時回想，不會改變正式間隔複習日。`,
      meta: "約 4 分鐘",
    };
  }
  if (today.practiceHasPendingFeedback) {
    return {
      href: "/quiz",
      label: "先看完上一題解析",
      detail: "答案已安全儲存；確認錯因與解法後，再進入下一題。",
      meta: "接續進度",
    };
  }
  if (!practiceComplete) {
    const inProgress = today.practiceTotal > 0 && today.practiceCursor > 0;
    return {
      href: "/practice",
      label: inProgress ? "繼續今日自適應訓練" : "開始今日自適應訓練",
      detail: inProgress
        ? `已完成 ${today.practiceCursor} / ${today.practiceTotal} 題，從上次位置繼續。`
        : today.reviewDueCount > 0
          ? `先處理 ${Math.min(3, today.reviewDueCount)} 題到期錯題，再進入弱點與完整題組。`
          : today.focusLabel === BASELINE_FOCUS_LABEL
            ? "今天先用預設考點建立基準（不算弱點補強），再完成文章題組與聽力。"
            : `今天優先確認「${today.focusLabel}」，再完成文章題組與聽力。`,
      meta: "15–30 分鐘",
    };
  }
  if (today.dueBacklogCount > 0) {
    return {
      href: "/vocabulary-quiz?mode=backlog",
      label: `補做 ${today.dueBacklogCount} 個延後的到期複習`,
      detail: "核心課表每天只排 5 個到期字，其餘會延後；到期字不補做，記憶間隔就不會延長。可分段完成。",
      meta: "可分段",
    };
  }
  return {
    href: "/dashboard",
    label: "今日核心任務完成",
    detail: "查看這回合留下的訊號，以及下一次最值得加強的能力。",
    meta: "查看成果",
  };
}

export function getResumeAction(quizPlan: { plan: DailyPlan; source: QuizPlanSource } | null): (CoachAction & { source: QuizPlanSource }) | null {
  if (!quizPlan) return null;
  const { plan, source } = quizPlan;
  if (plan.questionIds.length === 0) return null;
  if (plan.pendingFeedback) {
    return { source, href: "/quiz", label: "先看完上一題解析", detail: "答案已儲存，從上次的解析繼續，不必重答。", meta: "接續進度" };
  }
  if (plan.cursor >= plan.questionIds.length) return null;
  return {
    source,
    href: "/quiz",
    label: source === "wrongbook" ? "繼續錯題複習" : "繼續今日自適應訓練",
    detail: `已完成 ${plan.cursor} / ${plan.questionIds.length} 題，從第 ${plan.cursor + 1} 題接著練。`,
    meta: "已保留你的進度",
  };
}
