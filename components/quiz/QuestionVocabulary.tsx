"use client";

import { useState } from "react";
import VocabularySpeechButton from "@/components/VocabularySpeechButton";
import { type TermGlossPartOfSpeech, type TermResolution } from "@/lib/termResolution";
import { dismissVocabularyQueueTerm, getVocabularyQueue } from "@/lib/vocabularyQueue";
import { enqueueQuestionTerm, resolveQuestionTerm, questionTermQueueKey } from "@/lib/vocabularyStorage";
import type { Question } from "@/types/question";

const PART_LABELS: Record<TermGlossPartOfSpeech, string> = {
  noun: "名詞",
  verb: "動詞",
  adjective: "形容詞",
  adverb: "副詞",
  phrase: "片語",
  preposition: "介系詞",
  conjunction: "連接詞",
  pronoun: "代名詞",
  other: "其他",
};

type QuestionForVocabulary = Pick<
  Question,
  "id" | "question" | "choices" | "answer" | "vocabulary"
>;

type RankedTerm = { term: string; key: boolean; resolution: TermResolution };

function containsTerm(text: string, term: string): boolean {
  return text.toLowerCase().includes(term.toLowerCase());
}

/**
 * Terms that appear in the key option or the stem are what the item actually
 * tested, so they come first and carry a 本題關鍵 badge; the rest (words from
 * the passage or transcript) are supporting vocabulary. (REVIEW F10)
 */
export function rankQuestionTerms(question: QuestionForVocabulary): RankedTerm[] {
  const unique = [
    ...new Map(
      (question.vocabulary ?? [])
        .map((term) => term.trim())
        .filter(Boolean)
        .map((term) => [term.toLocaleLowerCase(), term]),
    ).values(),
  ];
  const keyText = question.choices[question.answer] ?? "";
  return unique
    .map((term, index) => {
      const score = containsTerm(keyText, term) ? 2 : containsTerm(question.question, term) ? 1 : 0;
      return { term, score, index, resolution: resolveQuestionTerm(term, question.id) };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ term, score, resolution }) => ({ term, key: score > 0, resolution }));
}

function Badge({ tone, children }: { tone: "sky" | "indigo" | "amber" | "slate" | "rose"; children: string }) {
  const classes = {
    sky: "bg-sky-100 text-sky-700",
    indigo: "bg-indigo-100 text-indigo-700",
    amber: "bg-amber-100 text-amber-800",
    slate: "bg-slate-100 text-slate-600",
    rose: "bg-rose-100 text-rose-700",
  }[tone];
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${classes}`}>{children}</span>;
}

function partMeaning(resolution: TermResolution | null): string | null {
  if (!resolution) return null;
  if (resolution.kind === "card") return resolution.card.meaning_zh;
  if (resolution.kind === "gloss") return resolution.gloss.meaning_zh;
  if (resolution.kind === "sense") return resolution.sense.meaning_zh;
  return null;
}

function TermBody({ resolution }: { resolution: TermResolution }) {
  switch (resolution.kind) {
    case "sense": {
      const { sense, card } = resolution;
      const otherSense = card && card.meaning_zh !== sense.meaning_zh;
      return (
        <>
          <p className="mt-1 text-sm text-slate-800">
            <span className="font-semibold text-indigo-800">本題義項：</span>
            {sense.meaning_zh}
          </p>
          {sense.note && <p className="mt-1 text-xs leading-relaxed text-slate-600">{sense.note}</p>}
          {otherSense && (
            <p className="mt-1.5 text-xs text-slate-500">
              其他常見義：{card.meaning_zh}（{PART_LABELS[card.partOfSpeech]}）
            </p>
          )}
        </>
      );
    }
    case "card": {
      const { card, match, term } = resolution;
      return (
        <>
          {match === "inflection" && (
            <p className="mt-1 text-xs text-slate-500">
              本題詞形 <span className="font-semibold">{term}</span> → 字卡 {card.word}
            </p>
          )}
          <p className="mt-1 text-sm text-slate-700">{card.meaning_zh}</p>
          {card.collocations && card.collocations.length > 0 && (
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              常見搭配：{card.collocations.slice(0, 2).join(" · ")}
            </p>
          )}
        </>
      );
    }
    case "gloss": {
      const { gloss, match, term } = resolution;
      return (
        <>
          {match === "inflection" && (
            <p className="mt-1 text-xs text-slate-500">
              本題詞形 <span className="font-semibold">{term}</span> → 原形 {gloss.term}
            </p>
          )}
          <p className="mt-1 text-sm text-slate-700">{gloss.meaning_zh}</p>
          <p className="mt-1 text-[11px] text-slate-400">一般釋義；尚無完整字卡與例句。</p>
        </>
      );
    }
    case "components":
      return (
        <>
          <ul className="mt-1 space-y-0.5 text-sm text-slate-700">
            {resolution.parts.map((part) => (
              <li key={part.token}>
                <span className="font-semibold">{part.token}</span>
                {" ＝ "}
                {partMeaning(part.resolution) ?? <span className="text-slate-400">待補</span>}
              </li>
            ))}
          </ul>
          <p className="mt-1 text-[11px] text-slate-400">片語本身尚無字卡，先看組成詞；整句意思以本題解析為準。</p>
        </>
      );
    case "missing":
      return (
        <p className="mt-1 text-xs text-slate-500">
          尚未收錄，待補內容。這個詞目前沒有可靠的釋義，請以本題解析為準。
        </p>
      );
  }
}

function tierBadge(resolution: TermResolution) {
  switch (resolution.kind) {
    case "sense":
      return <Badge tone="indigo">本題義項</Badge>;
    case "card":
      return <Badge tone="sky">字卡</Badge>;
    case "gloss":
      return <Badge tone="slate">一般釋義</Badge>;
    case "components":
      return <Badge tone="amber">組成詞</Badge>;
    case "missing":
      return <Badge tone="rose">待補</Badge>;
  }
}

function partOfSpeech(resolution: TermResolution): TermGlossPartOfSpeech | null {
  if (resolution.kind === "sense") return resolution.sense.partOfSpeech;
  if (resolution.kind === "card") return resolution.card.partOfSpeech;
  if (resolution.kind === "gloss") return resolution.gloss.partOfSpeech;
  return null;
}

function displayWord(resolution: TermResolution): string {
  if (resolution.kind === "card" && resolution.match === "exact") return resolution.card.word;
  return resolution.term;
}

export default function QuestionVocabulary({
  question,
  defaultOpen = false,
}: {
  question: QuestionForVocabulary;
  defaultOpen?: boolean;
}) {
  const entries = rankQuestionTerms(question);
  // Membership is per spelling + part of speech + meaning, across questions.
  const [queued, setQueued] = useState<Set<string>>(
    () => new Set(getVocabularyQueue().map((entry) => entry.key)),
  );
  const [queueError, setQueueError] = useState<string | null>(null);

  function toggleQueued(term: string) {
    const key = questionTermQueueKey(term, question.id);
    const removing = queued.has(key);
    const persisted = removing
      ? dismissVocabularyQueueTerm(key)
      : enqueueQuestionTerm(term, question.id);
    if (!persisted) {
      const saved = new Set(getVocabularyQueue().map((entry) => entry.key));
      setQueued(saved);
      setQueueError(removing
        ? "移除尚未儲存，這個義項仍保留在待學清單，請稍後再試。"
        : saved.has(key)
          ? "待學內容已儲存，但複習日期尚未更新，請確認瀏覽器儲存空間。"
          : "待學清單暫時無法儲存，請確認瀏覽器儲存空間後再試。");
      return;
    }
    setQueueError(null);
    setQueued((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  if (entries.length === 0) return null;
  const supported = entries.filter(
    (entry) =>
      entry.resolution.kind === "sense" ||
      entry.resolution.kind === "card" ||
      entry.resolution.kind === "gloss",
  ).length;

  return (
    <details
      key={defaultOpen ? "open" : "closed"}
      open={defaultOpen}
      className="group rounded-2xl border border-sky-200 bg-sky-50/70 shadow-sm"
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-sky-900">
        <span>本題關鍵字與搭配</span>
        <span className="flex items-center gap-2 text-xs font-medium text-sky-700">
          {entries.length} 個 · {supported} 個有釋義
          <span aria-hidden="true" className="transition-transform group-open:rotate-180">
            ▾
          </span>
        </span>
      </summary>
      <ul className="space-y-2 border-t border-sky-100 p-3">
        {entries.map(({ term, key, resolution }) => {
          const pos = partOfSpeech(resolution);
          const word = displayWord(resolution);
          const isQueued = queued.has(questionTermQueueKey(term, question.id));
          return (
            <li key={term} className="rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900">{word}</span>
                    {pos && <Badge tone="sky">{PART_LABELS[pos]}</Badge>}
                    {tierBadge(resolution)}
                    {key && <Badge tone="indigo">本題關鍵</Badge>}
                  </div>
                  <TermBody resolution={resolution} />
                  <button
                    type="button"
                    onClick={() => toggleQueued(term)}
                    aria-pressed={isQueued}
                    className={`mt-2 min-h-9 rounded-lg border px-3 text-xs font-semibold transition ${
                      isQueued
                        ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                        : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-800"
                    }`}
                  >
                    {isQueued ? "已加入待學 · 點一下移除" : "這個詞我不熟，加入待學"}
                  </button>
                </div>
                <VocabularySpeechButton text={word} label={`${word} 發音`} />
              </div>
            </li>
          );
        })}
      </ul>
      {queueError && (
        <p role="alert" className="border-t border-sky-100 px-4 py-2 text-xs text-rose-700">
          {queueError}
        </p>
      )}
      <p className="border-t border-sky-100 px-4 py-2 text-[11px] leading-relaxed text-slate-500">
        加入待學會保留本題義項。義項相符的字卡可安排練習；尚無對應字卡的義項保留在待學清單，不套用其他意思的掌握程度。新字使用每日 20 字名額，已建立的課表會在下一次安排時優先考慮。
      </p>
    </details>
  );
}
