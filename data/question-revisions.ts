/**
 * Content revisions and disputed items (2026-09-16 review, F04).
 *
 * Two different problems, two different mechanisms:
 *
 * - A REVISED question changed in a way that makes older answers meaningless
 *   as evidence about the current item (p5-ext-032 gained a time marker that
 *   removes a second defensible answer). Records answered before `revisedAt`
 *   are dropped from every coaching computation (`getEvidenceRecords`), but
 *   never deleted — the learner's history stays intact.
 *
 * - A DISPUTED question still has two defensible answers and its audio is
 *   already recorded, so the text cannot be rewritten until the audio is
 *   regenerated (see pipeline/patches/p2-answer-uniqueness.json). Until then
 *   it is kept out of NEW daily plans and mocks; wrongbook review and
 *   `getQuestionById` still work so existing records render.
 *
 * Tiny by design: this module is imported statically by client code, so it
 * must never grow into a data dump (bundle red line in CLAUDE.md).
 */
export type QuestionRevision = {
  id: string;
  /** ISO timestamp; attempts recorded before it are not evidence about the current item. */
  revisedAt: string;
  note: string;
};

export const QUESTION_REVISIONS: readonly QuestionRevision[] = [
  {
    id: "p5-ext-032",
    revisedAt: "2026-09-16T00:00:00.000Z",
    note: "加入 currently 排除 specialized 作一般過去式的讀法；解析改為逐項排除。",
  },
];

/** id → revisedAt, for the evidence filter. */
export const QUESTION_REVISED_AT: Readonly<Record<string, string>> = Object.fromEntries(
  QUESTION_REVISIONS.map((revision) => [revision.id, revision.revisedAt]),
);

export const DISPUTED_QUESTIONS: readonly { id: string; note: string }[] = [
  { id: "p2-gen-179", note: "(B) 我幫你查儲藏室 與 (C) 直接位置 皆可辯護；音檔已存在，待重生。" },
  { id: "p2-gen-116", note: "(C) 應該月底才到 是合理的間接否定；與 (A) 衝突。" },
  { id: "p2-gen-136", note: "(B) 訂單上週已處理 可讀為間接肯定；與 (C) 重疊。" },
  { id: "p2-gen-186", note: "(C) 我還沒查 是典型可接受回應；與 (A) 並存。" },
];

const DISPUTED_IDS: ReadonlySet<string> = new Set(DISPUTED_QUESTIONS.map((item) => item.id));

export function isDisputedQuestion(id: string): boolean {
  return DISPUTED_IDS.has(id);
}
