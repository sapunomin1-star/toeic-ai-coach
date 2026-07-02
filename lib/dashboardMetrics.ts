import { useMemo } from "react";
import {
  calculateAvgResponseTime,
  calculateListeningAccuracy,
  calculateListeningAvgTime,
  calculatePart1Accuracy,
  calculatePart2Accuracy,
  calculatePart3Accuracy,
  calculatePart4Accuracy,
  calculatePart5Accuracy,
  calculatePart5AvgTime,
  calculatePart6Accuracy,
  calculatePart6AvgTime,
  calculateReadingAccuracy,
  calculateReadingAvgTime,
  countPart7MistakesBySkill,
  countListeningAttempts,
  countMistakesBySkill,
  countPart1Attempts,
  countPart2Attempts,
  countPart3Attempts,
  countPart4Attempts,
  countPart5Attempts,
  countPart6Attempts,
  countReadingAttempts,
  countSlowQuestions,
  countMistakesByReason,
  getNextDayListeningMix,
  getGrammarWeakSkills,
  getReasonInsight,
  getSlowestSkill,
  getTomorrowRecommendation,
  getWeakestSkills,
  summarize,
} from "@/lib/analysis";
import type { AnswerRecord, SkillTag } from "@/types/question";
import type { VocabularyItem, VocabularyProgress } from "@/types/vocabulary";

/** Every derived value the dashboard renders; produced by `useDashboardMetrics`. */
export type DashboardMetrics = ReturnType<typeof useDashboardMetrics>;

/**
 * Computes every derived metric the dashboard renders. Each value keeps its
 * own `useMemo` keyed on the same inputs as before, so memoization behavior is
 * identical to the original inline component — only the location changed.
 */
export function useDashboardMetrics(
  records: AnswerRecord[] | null,
  todayVocabulary: VocabularyItem[],
  vocabularyProgress: VocabularyProgress[],
) {
  const safeRecords = useMemo(() => records ?? [], [records]);

  const stats = useMemo(() => summarize(safeRecords), [safeRecords]);
  const skillMistakes = useMemo(() => countMistakesBySkill(safeRecords), [safeRecords]);
  const part7SkillMistakes = useMemo(() => countPart7MistakesBySkill(safeRecords), [safeRecords]);
  const recommendation = useMemo(() => getTomorrowRecommendation(safeRecords), [safeRecords]);
  const reasonBreakdown = useMemo(() => countMistakesByReason(safeRecords), [safeRecords]);
  const reasonInsight = useMemo(() => getReasonInsight(safeRecords), [safeRecords]);
  const grammarWeakSkills = useMemo(() => getGrammarWeakSkills(safeRecords), [safeRecords]);
  const avgTime = useMemo(() => calculateAvgResponseTime(safeRecords), [safeRecords]);
  const part5AvgTime = useMemo(() => calculatePart5AvgTime(safeRecords), [safeRecords]);
  const slowCount = useMemo(() => countSlowQuestions(safeRecords), [safeRecords]);
  const slowestSkill = useMemo(() => getSlowestSkill(safeRecords), [safeRecords]);

  const part5Accuracy = useMemo(() => calculatePart5Accuracy(safeRecords), [safeRecords]);
  const part5Total = useMemo(() => countPart5Attempts(safeRecords), [safeRecords]);
  const part6Accuracy = useMemo(() => calculatePart6Accuracy(safeRecords), [safeRecords]);
  const part6Total = useMemo(() => countPart6Attempts(safeRecords), [safeRecords]);
  const part6AvgTime = useMemo(() => calculatePart6AvgTime(safeRecords), [safeRecords]);
  const listeningAvgTime = useMemo(() => calculateListeningAvgTime(safeRecords), [safeRecords]);
  const listeningAccuracy = useMemo(() => calculateListeningAccuracy(safeRecords), [safeRecords]);
  const listeningTotal = useMemo(() => countListeningAttempts(safeRecords), [safeRecords]);
  const readingAccuracy = useMemo(() => calculateReadingAccuracy(safeRecords), [safeRecords]);
  const readingAvgTime = useMemo(() => calculateReadingAvgTime(safeRecords), [safeRecords]);
  const readingTotal = useMemo(() => countReadingAttempts(safeRecords), [safeRecords]);

  // Per-part listening breakdown
  const part1Accuracy = useMemo(() => calculatePart1Accuracy(safeRecords), [safeRecords]);
  const part1Total = useMemo(() => countPart1Attempts(safeRecords), [safeRecords]);
  const part2Accuracy = useMemo(() => calculatePart2Accuracy(safeRecords), [safeRecords]);
  const part2Total = useMemo(() => countPart2Attempts(safeRecords), [safeRecords]);
  const part3Accuracy = useMemo(() => calculatePart3Accuracy(safeRecords), [safeRecords]);
  const part3Total = useMemo(() => countPart3Attempts(safeRecords), [safeRecords]);
  const part4Accuracy = useMemo(() => calculatePart4Accuracy(safeRecords), [safeRecords]);
  const part4Total = useMemo(() => countPart4Attempts(safeRecords), [safeRecords]);
  const nextListeningMix = useMemo(
    () => getNextDayListeningMix(safeRecords),
    [safeRecords],
  );

  const part6WrongCount = useMemo(() => {
    let w = 0;
    for (const r of safeRecords) {
      if (!r.isCorrect && r.questionId.startsWith("p6-")) w++;
    }
    return w;
  }, [safeRecords]);

  const orderedSkills = useMemo(
    () =>
      (Object.entries(skillMistakes) as [SkillTag, number][]).sort(
        (a, b) => b[1] - a[1]
      ),
    [skillMistakes]
  );

  const maxMistakes = useMemo(
    () => Math.max(1, ...orderedSkills.map(([, n]) => n)),
    [orderedSkills]
  );
  // Rate-based (recent window) so the card agrees with the recommendation
  // engine; orderedSkills stays count-based for the "錯題分佈" chart.
  const weakestSkill = useMemo(
    () => getWeakestSkills(safeRecords, 1)[0]?.skill ?? null,
    [safeRecords]
  );
  const vocabularyProgressMap = useMemo(
    () => new Map(vocabularyProgress.map((item) => [item.wordId, item.status])),
    [vocabularyProgress]
  );
  const vocabNew = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => (vocabularyProgressMap.get(item.id) ?? "new") === "new"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabSeen = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => vocabularyProgressMap.get(item.id) === "seen"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabFamiliar = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => vocabularyProgressMap.get(item.id) === "familiar"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabMastered = useMemo(
    () =>
      todayVocabulary.filter(
        (item) => vocabularyProgressMap.get(item.id) === "mastered"
      ).length,
    [todayVocabulary, vocabularyProgressMap]
  );
  const vocabularyAdvice = useMemo(() => {
    if (vocabFamiliar > 0)
      return `這 ${vocabFamiliar} 個字有印象但還不穩，明天再確認一次就能掌握。`;
    if (vocabMastered === todayVocabulary.length && todayVocabulary.length > 0)
      return "今日單字已完成，可以進入題目訓練。";
    if (vocabSeen + vocabNew > 0)
      return "今天先不要追求速度，把每個單字的例句看懂。";
    return "開始今日單字練習。";
  }, [vocabFamiliar, vocabMastered, vocabSeen, vocabNew, todayVocabulary.length]);

  return {
    stats,
    skillMistakes,
    part7SkillMistakes,
    recommendation,
    reasonBreakdown,
    reasonInsight,
    grammarWeakSkills,
    avgTime,
    part5AvgTime,
    slowCount,
    slowestSkill,
    part5Accuracy,
    part5Total,
    part6Accuracy,
    part6Total,
    part6AvgTime,
    listeningAvgTime,
    listeningAccuracy,
    listeningTotal,
    readingAccuracy,
    readingAvgTime,
    readingTotal,
    part1Accuracy,
    part1Total,
    part2Accuracy,
    part2Total,
    part3Accuracy,
    part3Total,
    part4Accuracy,
    part4Total,
    nextListeningMix,
    part6WrongCount,
    orderedSkills,
    maxMistakes,
    weakestSkill,
    vocabNew,
    vocabSeen,
    vocabFamiliar,
    vocabMastered,
    vocabularyAdvice,
  };
}
