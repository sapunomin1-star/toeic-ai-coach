import { createLazyLoader } from "@/lib/lazyLoader";

/**
 * Lazy façade over `data/questions`. The question bank is ~2 MB of minified
 * JS; a static import from any client module would put it in that route's
 * first-load bundle. App code must import this module instead and await
 * `loadQuestionBank()` (in an init effect or event handler) before calling
 * `questionBank()` for synchronous access to the bank helpers.
 *
 * Node-side code (pipeline/, scripts/) may keep importing `data/questions`
 * directly — bundle size is a browser concern only.
 */

export type QuestionBankModule = typeof import("@/data/questions");
export type { PlanCounts, QuestionFilter } from "@/data/questions";

const questionBankLoader = createLazyLoader<QuestionBankModule>(
  () => import("@/data/questions"),
  "[questionBank] question bank not loaded — await loadQuestionBank() first",
);

export function loadQuestionBank(): Promise<QuestionBankModule> {
  return questionBankLoader.load();
}

/** Synchronous access to the bank. Only valid after loadQuestionBank resolved. */
export function questionBank(): QuestionBankModule {
  return questionBankLoader.get();
}

/**
 * Load the bank for a user-triggered action; on failure show the canonical
 * message and return false so callers can bail without their own try/catch.
 */
export async function ensureQuestionBankLoaded(): Promise<boolean> {
  try {
    await questionBankLoader.load();
    return true;
  } catch (error) {
    console.error("[questionBank] failed to load question bank:", error);
    if (typeof window !== "undefined") {
      window.alert("題庫載入失敗，請確認網路後再試一次。");
    }
    return false;
  }
}
