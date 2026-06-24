"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import MistakeReasonChips from "@/components/quiz/MistakeReasonChips";
import { buildDailyPlan, getQuestionById } from "@/data/questions";
import { getAudioOwnerQuestion, getListeningGroupKey } from "@/lib/audioOwner";
import {
  clearDailyPlan,
  clearWrongPracticePlan,
  getAnswerRecords,
  getQuizPlan,
  getReviewableIds,
  markQuizPlanListeningGroupAutoPlayed,
  saveAnswer,
  saveDailyPlan,
  saveQuizPlan,
  updateLatestReason,
} from "@/lib/storage";
import {
  getNextDayListeningMix,
  getWeakestSkills,
  inferMistakeReason,
} from "@/lib/analysis";
import { getAudioUrl, getImageUrl, getQuestionAudioUrl, hasMediaSupport } from "@/lib/media";
import { getGroupPosition } from "@/lib/mockShared";
import {
  bumpWordsToDueByWords,
  findVocabularyByWord,
  getVocabularyProgress,
} from "@/lib/vocabularyStorage";
import type { Choice, MistakeReason, Question } from "@/types/question";
import { SKILL_LABELS } from "@/types/question";
import type { QuizPlanSource } from "@/lib/storage";

type Status = "loading" | "answering" | "answered" | "finished" | "no-plan";

const CHOICES: Choice[] = ["A", "B", "C", "D"];

export default function QuizPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [planIds, setPlanIds] = useState<string[]>([]);
  const [planCreatedAt, setPlanCreatedAt] = useState<string | null>(null);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [submittedChoice, setSubmittedChoice] = useState<Choice | null>(null);
  const [inferredReason, setInferredReason] = useState<MistakeReason | null>(null);
  const [selectedReason, setSelectedReason] = useState<MistakeReason | null>(null);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });
  const [failedAudioIds, setFailedAudioIds] = useState<Set<string>>(new Set());
  const [failedQuestionAudioIds, setFailedQuestionAudioIds] = useState<Set<string>>(new Set());
  const [autoPlayedListeningGroups, setAutoPlayedListeningGroups] = useState<Set<string>>(
    new Set(),
  );
  const [activeAutoConversationId, setActiveAutoConversationId] = useState<string | null>(
    null,
  );
  const submittedQuestionIds = useRef(new Set<string>());
  const questionStartTime = useRef<number>(0);
  const planSource = useRef<QuizPlanSource>("daily");

  function buildIsWeakWord(): (word: string) => boolean {
    const statusByWordId = new Map(
      getVocabularyProgress().map((progress) => [progress.wordId, progress.status]),
    );
    return (word) => {
      const item = findVocabularyByWord(word);
      if (!item) return false;
      const status = statusByWordId.get(item.id);
      return status === undefined || status === "new" || status === "seen";
    };
  }

  useEffect(() => {
    const id = window.setTimeout(() => {
      const quizPlan = getQuizPlan();
      if (!quizPlan || quizPlan.plan.questionIds.length === 0) {
        setStatus("no-plan");
        return;
      }
      const { plan, source } = quizPlan;
      planSource.current = source;
      setPlanIds(plan.questionIds);
      setPlanCreatedAt(plan.createdAt);
      setCursor(plan.cursor);
      setAutoPlayedListeningGroups(new Set(plan.autoPlayedListeningGroups ?? []));
      if (plan.cursor >= plan.questionIds.length) {
        setStatus("finished");
      } else {
        questionStartTime.current = Date.now();
        setStatus("answering");
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  // Start timer whenever a new question is presented
  useEffect(() => {
    if (status === "answering" && questionStartTime.current === 0) {
      questionStartTime.current = Date.now();
    }
  }, [status, cursor]);

  const currentQuestion: Question | undefined = useMemo(() => {
    if (planIds.length === 0) return undefined;
    const id = planIds[cursor];
    return id ? getQuestionById(id) : undefined;
  }, [planIds, cursor]);

  const planQuestions = useMemo(
    () =>
      planIds
        .map((id) => getQuestionById(id))
        .filter((question): question is Question => Boolean(question)),
    [planIds],
  );

  function markListeningGroupAutoPlayed(groupKey: string) {
    setAutoPlayedListeningGroups((groups) => {
      if (groups.has(groupKey)) return groups;
      const next = new Set(groups);
      next.add(groupKey);
      return next;
    });
    markQuizPlanListeningGroupAutoPlayed(groupKey, planSource.current);
  }

  function handleGroupedAudioStarted(questionId: string, groupKey: string) {
    setFailedAudioIds((ids) => {
      if (!ids.has(questionId)) return ids;
      const next = new Set(ids);
      next.delete(questionId);
      return next;
    });
    setActiveAutoConversationId(questionId);
    markListeningGroupAutoPlayed(groupKey);
  }

  function handleGroupedAudioSettled(questionId: string, groupKey: string) {
    markListeningGroupAutoPlayed(groupKey);
    setActiveAutoConversationId((activeId) =>
      activeId === questionId ? null : activeId,
    );
  }

  function handleGroupedAudioError(questionId: string, groupKey: string) {
    setFailedAudioIds((ids) => new Set(ids).add(questionId));
    handleGroupedAudioSettled(questionId, groupKey);
  }

  function handleSubmit() {
    if (
      status !== "answering" ||
      !selected ||
      !currentQuestion ||
      submittedQuestionIds.current.has(currentQuestion.id)
    ) {
      return;
    }
    submittedQuestionIds.current.add(currentQuestion.id);
    const startedAt = questionStartTime.current || Date.now();
    const responseTimeMs = Math.max(0, Date.now() - startedAt);
    const isCorrect = selected === currentQuestion.answer;
    saveAnswer({
      questionId: currentQuestion.id,
      userAnswer: selected,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      skill_tag: currentQuestion.skill_tag,
      answeredAt: new Date().toISOString(),
      responseTimeMs,
      source: "daily",
    });
    if (!isCorrect) {
      const isWeakWord = buildIsWeakWord();
      const inferred = inferMistakeReason(
        { part: currentQuestion.part, vocabulary: currentQuestion.vocabulary },
        { isCorrect: false, responseTimeMs },
        isWeakWord,
      );
      setInferredReason(inferred);
      setSelectedReason(null);
      if (inferred) {
        updateLatestReason(currentQuestion.id, inferred, "inferred");
        if (inferred === "vocab") {
          bumpWordsToDueByWords(currentQuestion.vocabulary ?? []);
        }
      }
    } else {
      setInferredReason(null);
      setSelectedReason(null);
    }
    setSubmittedChoice(selected);
    setSessionStats((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
    setStatus("answered");
  }

  function handleNext() {
    const nextCursor = cursor + 1;
    const quizPlan = getQuizPlan();
    if (quizPlan) {
      saveQuizPlan(
        { ...quizPlan.plan, cursor: nextCursor },
        quizPlan.source
      );
    }
    setCursor(nextCursor);
    setSelected(null);
    setSubmittedChoice(null);
    setInferredReason(null);
    setSelectedReason(null);
    setActiveAutoConversationId(null);
    questionStartTime.current = 0;

    if (nextCursor >= planIds.length) {
      if (planSource.current === "wrongbook") {
        clearWrongPracticePlan();
      }
      setStatus("finished");
    } else {
      questionStartTime.current = Date.now();
      setStatus("answering");
    }
  }

  function getRecordedSessionStats(): { correct: number; total: number } {
    if (!planCreatedAt || planIds.length === 0) return sessionStats;

    const createdAtMs = new Date(planCreatedAt).getTime();
    const planIdSet = new Set(planIds);
    const latestByQuestion = new Map<string, { isCorrect: boolean; answeredAt: string }>();

    for (const record of getAnswerRecords()) {
      if (!planIdSet.has(record.questionId)) continue;
      if (new Date(record.answeredAt).getTime() < createdAtMs) continue;
      const existing = latestByQuestion.get(record.questionId);
      if (!existing || record.answeredAt > existing.answeredAt) {
        latestByQuestion.set(record.questionId, {
          isCorrect: record.isCorrect,
          answeredAt: record.answeredAt,
        });
      }
    }

    if (latestByQuestion.size === 0) return sessionStats;

    return {
      correct: [...latestByQuestion.values()].filter((record) => record.isCorrect).length,
      total: latestByQuestion.size,
    };
  }

  function startFreshPlan() {
    const reviewIds = getReviewableIds().slice(0, 5);
    const records = getAnswerRecords();
    const weakSkillTags = getWeakestSkills(records, 2, 5).map((w) => w.skill);
    const mix = getNextDayListeningMix(records);
    const plan = buildDailyPlan({
      reviewIds,
      weakSkillTags,
      part1Count: mix.part1Count,
      part2Count: mix.part2Count,
      part3GroupCount: mix.part3GroupCount,
      part4GroupCount: mix.part4GroupCount,
    });
    saveDailyPlan({
      questionIds: plan.questions.map((q) => q.id),
      createdAt: new Date().toISOString(),
      cursor: 0,
    });
    router.push("/practice");
  }

  function handleReasonSelect(reason: MistakeReason) {
    if (!currentQuestion) return;
    setSelectedReason(reason);
    updateLatestReason(currentQuestion.id, reason, "user");
    if (reason === "vocab") {
      bumpWordsToDueByWords(currentQuestion.vocabulary ?? []);
    }
  }

  if (status === "loading") {
    return <p className="py-10 text-center text-slate-500">載入中…</p>;
  }

  if (status === "no-plan") {
    return (
      <div className="space-y-4 py-6 text-center">
        <p className="text-slate-600">目前沒有訓練計畫。</p>
        <Link
          href="/practice"
          className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          前往今日訓練
        </Link>
      </div>
    );
  }

  if (status === "finished") {
    const recordedStats = getRecordedSessionStats();
    const accuracy =
      recordedStats.total === 0
        ? 0
        : Math.round((recordedStats.correct / recordedStats.total) * 100);
    return (
      <div className="space-y-5 py-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-md">
          <p className="text-sm">今日訓練完成 🎉</p>
          <p className="mt-2 text-3xl font-bold">{accuracy}%</p>
          <p className="mt-1 text-sm text-emerald-50">
            答對 {recordedStats.correct} / {recordedStats.total} 題
          </p>
        </div>
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white"
          >
            查看今日報告
          </Link>
          <Link
            href="/wrongbook"
            className="block w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center text-base font-semibold text-slate-700"
          >
            檢視錯題本
          </Link>
          <button
            onClick={() => {
              clearDailyPlan();
              startFreshPlan();
            }}
            className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm text-slate-600"
          >
            再做一輪
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="space-y-4 py-6 text-center">
        <p className="text-slate-600">找不到題目資料。</p>
        <Link
          href="/practice"
          className="inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          重新開始
        </Link>
      </div>
    );
  }

  const total = planIds.length;
  const progress = ((cursor + (status === "answered" ? 1 : 0)) / total) * 100;
  const isAnswered = status === "answered";
  const isCorrect = submittedChoice === currentQuestion.answer;
  const visibleChoices: Choice[] =
    currentQuestion.choices.D === undefined ? ["A", "B", "C"] : CHOICES;
  const questionText =
    currentQuestion.question.trim() || "請聽音檔後選擇答案";
  const imageUrl = getImageUrl(currentQuestion);
  // P3/P4 group: audio lives on canonical (smallest-id) member only.
  const audioUrl = getAudioUrl(getAudioOwnerQuestion(currentQuestion));
  const questionAudioUrl = getQuestionAudioUrl(currentQuestion);
  const mediaSupport = hasMediaSupport(currentQuestion);
  const audioFailed = failedAudioIds.has(currentQuestion.id);
  const questionAudioFailed = failedQuestionAudioIds.has(currentQuestion.id);
  const audioFallbackText = currentQuestion.audioScript ?? null;
  const listeningGroupKey = getListeningGroupKey(currentQuestion);
  const isGroupedListeningQuestion = listeningGroupKey !== null;
  const groupPosition = getGroupPosition(planQuestions, currentQuestion);
  const groupAutoPlayed =
    listeningGroupKey !== null && autoPlayedListeningGroups.has(listeningGroupKey);
  const groupedAudioIsPlaying = activeAutoConversationId === currentQuestion.id;
  const groupReplayLabel =
    currentQuestion.part === "Part 3" ? "重播本組對話" : "重播本組獨白";
  const showP3QuestionAudio =
    currentQuestion.part === "Part 3" &&
    questionAudioUrl !== null &&
    groupAutoPlayed &&
    !groupedAudioIsPlaying;

  // For Part 1/2, the on-screen `question` text and `choices` text ARE the
  // spoken audio (P1 = the four photo statements, P2 = the question + three
  // responses). Showing them during answering lets the student read instead
  // of listen, which defeats the whole point. Hide while answering, reveal
  // once the answer is submitted (the post-answer panel already does that).
  const isListeningP1or2 =
    currentQuestion.part === "Part 1" || currentQuestion.part === "Part 2";
  const hideListeningText = isListeningP1or2 && !isAnswered;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span aria-label={`第 ${cursor + 1} 題，共 ${total} 題`}>
            {cursor + 1} / {total}
          </span>
          <span aria-label={`已答對 ${sessionStats.correct} 題，共 ${sessionStats.total} 題`}>
            正確 {sessionStats.correct} / {sessionStats.total}
          </span>
        </div>
        <div
          className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`答題進度 ${Math.round(progress)}%`}
        >
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {currentQuestion.part}
            {groupPosition ? ` · 題組 ${groupPosition.index}/${groupPosition.total}` : ""}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {SKILL_LABELS[currentQuestion.skill_tag]}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {currentQuestion.difficulty}
          </span>
        </div>
      </div>

      {imageUrl && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={imageUrl}
            alt={currentQuestion.imageAlt ?? "TOEIC listening question image"}
            width={1024}
            height={1024}
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {isGroupedListeningQuestion && listeningGroupKey && audioUrl ? (
        <div className="space-y-2">
          {groupAutoPlayed && !groupedAudioIsPlaying && (
            <p className="text-sm font-medium text-slate-700">🔁 {groupReplayLabel}</p>
          )}
          <AudioPlayer
            key={audioUrl}
            src={audioUrl}
            autoPlay={!groupAutoPlayed}
            allowReplay={groupAutoPlayed || audioFailed}
            onPlaybackStart={() =>
              handleGroupedAudioStarted(currentQuestion.id, listeningGroupKey)
            }
            onEnded={() =>
              handleGroupedAudioSettled(currentQuestion.id, listeningGroupKey)
            }
            onError={() =>
              handleGroupedAudioError(currentQuestion.id, listeningGroupKey)
            }
          />
          {audioFailed && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              音檔載入失敗，可按重試播放；你仍可繼續作答。
            </p>
          )}
        </div>
      ) : audioUrl && !audioFailed ? (
        <AudioPlayer
          key={audioUrl}
          src={audioUrl}
          autoPlay
          onError={() =>
            setFailedAudioIds((ids) => new Set(ids).add(currentQuestion.id))
          }
        />
      ) : mediaSupport.audio ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 shadow-sm">
          <p className="text-sm font-semibold text-sky-800">音檔尚未就緒</p>
          {/* Only show fallback transcript when not hiding for listening,
              so the script doesn't leak before the student has answered. */}
          {audioFallbackText && !hideListeningText && (
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {audioFallbackText}
            </p>
          )}
        </div>
      ) : null}

      {showP3QuestionAudio && (
        <div className="space-y-2 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Part 3 · 題目朗讀
          </p>
          <AudioPlayer
            key={questionAudioUrl}
            src={questionAudioUrl}
            autoPlay
            allowReplay
            onPlaybackStart={() =>
              setFailedQuestionAudioIds((ids) => {
                if (!ids.has(currentQuestion.id)) return ids;
                const next = new Set(ids);
                next.delete(currentQuestion.id);
                return next;
              })
            }
            onError={() =>
              setFailedQuestionAudioIds((ids) => new Set(ids).add(currentQuestion.id))
            }
          />
          {questionAudioFailed && (
            <p className="text-xs text-rose-700">
              題目朗讀音檔載入失敗；不影響作答，可按重試再次播放。
            </p>
          )}
        </div>
      )}

      {currentQuestion.passage && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
            {currentQuestion.part} · {currentQuestion.part === "Part 6" ? "段落填空" : "Reading Passage"}
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {currentQuestion.passage}
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-base leading-relaxed text-slate-900">
          {hideListeningText ? "請依音檔內容選擇答案" : questionText}
        </p>
      </div>

      {hideListeningText ? (
        // Letter-only buttons in a grid so the student must rely on listening,
        // not reading. Per-choice audio (P2's three responses) is also hidden
        // because the main audio already plays them in sequence — playing each
        // choice on demand would let students re-hear individual responses.
        <div
          className={`grid ${visibleChoices.length === 3 ? "grid-cols-3" : "grid-cols-4"} gap-3`}
        >
          {visibleChoices.map((c) => {
            const isSelected = selected === c;
            return (
              <button
                key={c}
                onClick={() => setSelected(c)}
                aria-label={`選擇答案 ${c}`}
                aria-pressed={isSelected}
                className={`min-h-14 rounded-2xl border px-4 py-3 text-center text-base font-bold transition active:scale-[0.99] focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 text-indigo-900"
                    : "border-slate-200 bg-white text-slate-800"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : (
        <ul className="space-y-2">
          {visibleChoices.map((c) => {
            const isSelected = selected === c;
            const isCorrectChoice = c === currentQuestion.answer;
            const isUserChoice = submittedChoice === c;
            const choiceAudio = currentQuestion.audioChoices?.[c];

            let classes =
              "w-full rounded-2xl border px-4 py-3 text-left text-sm transition active:scale-[0.99]";
            if (isAnswered) {
              if (isCorrectChoice) {
                classes += " border-emerald-400 bg-emerald-50 text-emerald-900";
              } else if (isUserChoice) {
                classes += " border-rose-400 bg-rose-50 text-rose-900";
              } else {
                classes += " border-slate-200 bg-white text-slate-500";
              }
            } else if (isSelected) {
              classes += " border-indigo-500 bg-indigo-50 text-indigo-900";
            } else {
              classes += " border-slate-200 bg-white text-slate-800";
            }

            return (
              <li key={c} className="space-y-2">
                {choiceAudio && (
                  <AudioPlayer key={choiceAudio} src={choiceAudio} allowReplay />
                )}
                <button
                  disabled={isAnswered}
                  onClick={() => setSelected(c)}
                  className={classes}
                  aria-pressed={isAnswered ? undefined : isSelected}
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                    {c}
                  </span>
                  {currentQuestion.choices[c]}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {isAnswered && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-2xl border p-4 shadow-sm ${
            isCorrect
              ? "border-emerald-200 bg-emerald-50"
              : "border-rose-200 bg-rose-50"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              isCorrect ? "text-emerald-800" : "text-rose-800"
            }`}
          >
            {isCorrect ? "✅ 答對了" : "❌ 答錯了"}
            <span className="ml-2 text-xs font-normal text-slate-600">
              正確答案：{currentQuestion.answer}
            </span>
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
            {currentQuestion.explanation_zh}
          </p>
          {currentQuestion.vocabulary && currentQuestion.vocabulary.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              關鍵字：{currentQuestion.vocabulary.join(" · ")}
            </p>
          )}
        </div>
      )}

      {isAnswered && !isCorrect && currentQuestion && (
        <MistakeReasonChips
          part={currentQuestion.part}
          inferredReason={inferredReason}
          selectedReason={selectedReason}
          onSelect={handleReasonSelect}
        />
      )}

      {/* Post-answer audio script reveal + replay (listening only).
          Prefer `transcript` (P3/P4 conversations / talks).
          Fall back to `audioScript` (P1 photo descriptions, P2 Q+A). */}
      {isAnswered &&
        (currentQuestion.transcript || currentQuestion.audioScript) && (
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                {currentQuestion.part} · {currentQuestion.transcript ? "Transcript" : "Audio Script"}
              </p>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                答完才顯示
              </span>
            </div>
            {audioUrl && (
              <div className="mb-3">
                <AudioPlayer key={`${audioUrl}-replay`} src={audioUrl} allowReplay />
              </div>
            )}
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {currentQuestion.transcript ?? currentQuestion.audioScript}
            </p>
          </div>
        )}

      <div className="sticky bottom-3 z-10">
        {isAnswered ? (
          <button
            onClick={handleNext}
            className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white shadow-md active:scale-[0.99]"
          >
            {cursor + 1 >= total ? "完成今日訓練" : "下一題 →"}
          </button>
        ) : (
          <button
            disabled={!selected}
            onClick={handleSubmit}
            className={`block w-full rounded-2xl px-5 py-4 text-center text-base font-semibold shadow-md transition active:scale-[0.99] ${
              selected
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 text-slate-400"
            }`}
          >
            送出答案
          </button>
        )}
      </div>
    </div>
  );
}
