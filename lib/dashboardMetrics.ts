import { useMemo } from "react";
import {
  calculateListeningAccuracy,
  calculatePart1Accuracy,
  calculatePart2Accuracy,
  calculatePart3Accuracy,
  calculatePart4Accuracy,
  calculatePart5Accuracy,
  calculatePart6Accuracy,
  calculateReadingAccuracy,
  countPart7MistakesBySkill,
  countListeningAttempts,
  countMistakesBySkill,
  countPart1Attempts,
  countPart2Attempts,
  countPart3Attempts,
  countPart4Attempts,
  countPart5Attempts,
  countPart6Attempts,
  countPart6Mistakes,
  countReadingAttempts,
  countMistakesByReason,
  getNextDayListeningMix,
  getGrammarWeakSkills,
  getReasonInsight,
  getSkillEvidence,
  getTomorrowRecommendation,
  getWeakestSkills,
  summarize,
} from "@/lib/analysis";
import { buildPacingReport } from "@/lib/pacing";
import type { AnswerRecord, SkillTag } from "@/types/question";
import type { VocabularyItem, VocabularyProgress } from "@/types/vocabulary";

/** Every derived value the dashboard renders; produced by `useDashboardMetrics`. */
export type DashboardMetrics = ReturnType<typeof useDashboardMetrics>;

/**
 * Computes every derived metric the dashboard renders. `records` should be
 * the evidence set (`getEvidenceRecords`), not the raw history.
 *
 * Skill cards read ONE evidence table (`getSkillEvidence`): first attempts
 * only, recent window, with a confidence flag. Pacing reads only records that
 * carry the timing split. Reason cards read the learner's own confirmations
 * inside a fixed window. (Review F05/F06/F08.)
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
  const skillEvidence = useMemo(() => getSkillEvidence(safeRecords), [safeRecords]);
  const weakSkills = useMemo(() => getWeakestSkills(safeRecords, 3), [safeRecords]);
  const pacing = useMemo(() => buildPacingReport(safeRecords), [safeRecords]);

  const part5Accuracy = useMemo(() => calculatePart5Accuracy(safeRecords), [safeRecords]);
  const part5Total = useMemo(() => countPart5Attempts(safeRecords), [safeRecords]);
  const part6Accuracy = useMemo(() => calculatePart6Accuracy(safeRecords), [safeRecords]);
  const part6Total = useMemo(() => countPart6Attempts(safeRecords), [safeRecords]);
  const listeningAccuracy = useMemo(() => calculateListeningAccuracy(safeRecords), [safeRecords]);
  const listeningTotal = useMemo(() => countListeningAttempts(safeRecords), [safeRecords]);
  const readingAccuracy = useMemo(() => calculateReadingAccuracy(safeRecords), [safeRecords]);
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

  const part6WrongCount = useMemo(() => countPart6Mistakes(safeRecords), [safeRecords]);

  // Lifetime counts (repeats included) — only for the distribution chart,
  // which is labelled as such. Never used to rank ability.
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
  const weakestSkill = weakSkills[0] ?? null;
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
      return `這 ${vocabFamiliar} 個字有印象但還不穩；會在各自的到期日再確認，連續通過較長間隔（最後是 14 天）才會標為已掌握。`;
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
    skillEvidence,
    weakSkills,
    pacing,
    part5Accuracy,
    part5Total,
    part6Accuracy,
    part6Total,
    listeningAccuracy,
    listeningTotal,
    readingAccuracy,
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
