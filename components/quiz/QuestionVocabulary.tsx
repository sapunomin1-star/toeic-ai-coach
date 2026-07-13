"use client";

import VocabularySpeechButton from "@/components/VocabularySpeechButton";
import { findVocabularyByWord } from "@/lib/vocabularyStorage";
import type { VocabularyItem } from "@/types/vocabulary";

const PART_LABELS: Record<VocabularyItem["partOfSpeech"], string> = {
  noun: "名詞",
  verb: "動詞",
  adjective: "形容詞",
  adverb: "副詞",
  phrase: "片語",
};

export default function QuestionVocabulary({
  terms,
  defaultOpen = false,
}: {
  terms: string[];
  defaultOpen?: boolean;
}) {
  const uniqueTerms = [
    ...new Map(
      terms
        .map((term) => term.trim())
        .filter(Boolean)
        .map((term) => [term.toLocaleLowerCase(), term]),
    ).values(),
  ];
  const entries = uniqueTerms.map((term) => ({
    term,
    item: findVocabularyByWord(term),
  }));

  if (entries.length === 0) return null;

  return (
    <details
      key={defaultOpen ? "open" : "closed"}
      open={defaultOpen}
      className="group rounded-2xl border border-sky-200 bg-sky-50/70 shadow-sm"
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-sky-900">
        <span>本題關鍵字與搭配</span>
        <span className="flex items-center gap-2 text-xs font-medium text-sky-700">
          {entries.length} 個
          <span
            aria-hidden="true"
            className="transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </span>
      </summary>
      <ul className="space-y-2 border-t border-sky-100 p-3">
        {entries.map(({ term, item }) => (
          <li key={term} className="rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-900">
                    {item?.word ?? term}
                  </span>
                  {item && (
                    <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                      {PART_LABELS[item.partOfSpeech]}
                    </span>
                  )}
                </div>
                {item ? (
                  <>
                    <p className="mt-1 text-sm text-slate-700">{item.meaning_zh}</p>
                    {item.collocations && item.collocations.length > 0 && (
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                        常見搭配：{item.collocations.slice(0, 2).join(" · ")}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-xs text-slate-500">
                    先依本題解析與上下文理解這個詞。
                  </p>
                )}
              </div>
              <VocabularySpeechButton
                text={item?.word ?? term}
                label={`${item?.word ?? term} 發音`}
              />
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
