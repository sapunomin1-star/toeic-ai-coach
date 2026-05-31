# AGENTS.md

## Project Overview

TOEIC AI Coach is a personal study app for steadily improving TOEIC performance
with daily 15-30 minute practice. It is a local-first Next.js app, not a
commercial SaaS product. Do not hard-code a final target score; the user may
raise the target over time.

The app currently focuses on:

- Daily task overview and practice planning.
- TOEIC Part 5 grammar and vocabulary questions.
- TOEIC Part 6 text completion (passage with blanks).
- TOEIC Part 3 and Part 4 transcript-based listening practice.
- TOEIC Part 7 short reading practice.
- Wrong-book review with simple spaced repetition status.
- Daily vocabulary flashcards with quiz-authoritative SRS scheduling.
- Vocabulary quiz with English-to-Chinese, Chinese-to-English, and fill-in-the-blank questions.
- Dashboard reporting for accuracy, weak skills, response speed, vocabulary progress, and reading/listening breakdowns.

## Next.js Version Warning

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses a modern Next.js release with breaking changes. APIs,
conventions, and generated type files may differ from older training data.
Before changing framework behavior, read the relevant guide in
`node_modules/next/dist/docs/` and follow deprecation notices.
<!-- END:nextjs-agent-rules -->

## Product Priorities

Optimize for daily self-study usefulness, not platform features.

Prefer:

- Small, reliable improvements to the study flow.
- Clear question explanations in Chinese.
- Local persistence through `localStorage`.
- Fast mobile-first screens.
- Simple data structures that are easy to inspect and QA.
- Focused bug fixes and targeted refactors.

Do not add unless explicitly requested:

- Login or accounts.
- Database or backend service.
- Cloud sync.
- Payment or subscription logic.
- Multi-user roles.
- Notion API integration.
- Voice audio, TTS, or generated listening audio.
- Large architecture rewrites.

## Technical Stack

- Framework: Next.js App Router.
- Language: TypeScript with `strict` enabled.
- UI: React client components plus Tailwind CSS.
- Persistence: browser `localStorage`.
- Package manager: npm.

Important scripts:

- `npm run lint`: run ESLint.
- `./node_modules/.bin/tsc --noEmit`: run TypeScript validation.
- `npm run build`: run production build.
- `npm run dev`: start local development server.
- `npm run start`: start production server after build.

## Architecture Map

- `app/page.tsx`: home page and daily entry points.
- `app/practice/page.tsx`: today's practice plan and quiz launch.
- `app/quiz/page.tsx`: quiz runner, answer feedback, response-time recording, passage/transcript display, and plan cursor updates.
- `app/wrongbook/page.tsx`: wrong-book grouping, removal, and wrong-question practice launch.
- `app/dashboard/page.tsx`: study analytics, recommendations, vocabulary progress, and Part 5/6/listening/reading breakdowns.
- `app/mock-review/[snapshotId]/page.tsx`: localStorage-backed mock review snapshot viewer for completed mock exams.
- `app/vocabulary/page.tsx`: daily vocabulary flashcard flow.
- `app/vocabulary-quiz/page.tsx`: vocabulary quiz UI and result persistence.
- `data/questions.ts`: TOEIC question bank plus question selection helpers.
- `data/vocabulary.ts`: TOEIC vocabulary bank.
- `lib/storage.ts`: answer records, wrong-book status, daily plans, wrong-practice plans.
- `lib/storageCore.ts`: single source for localStorage keys (`STORAGE_KEYS`) and JSON primitives (`isBrowser`, `readJSON`, `writeJSON` with QuotaExceededError handling, `isChoice`, `isValidDate`). All storage modules build on this.
- `lib/sessionStore.ts`: `createSessionStore` factory — one implementation backing the reading, listening, and full mock session+result stores.
- `lib/mockStorage.ts` / `lib/fullMockStorage.ts`: reading+listening / full mock stores, built on `createSessionStore`.
- `lib/mockReviewStorage.ts`: post-submit mock review snapshots (`toeic_mock_review_snapshots_v1`), compact per-question snapshots for exam review.
- `lib/storage.ts`: also owns the manual review queue (`toeic_manual_review_items_v1`) for "加入複習" items selected from mock review.
- `lib/mockShared.ts`: pure mock helpers shared by both runners (`audioGroupKey`, `formatTime`, `makeBreakdown`, `getGroupPosition`).
- `lib/useMockAudioPacing.ts`: shared hook for the listening "no replay" + Part 3 countdown state machine used by both mock runners.
- `lib/analysis.ts`: accuracy, mistake, timing, recommendation, Part 5/6/listening/reading analytics.
- `lib/dashboardMetrics.ts`: `useDashboardMetrics` — all dashboard derived metrics, each memoized.
- `pipeline/`: RAG question generation pipeline (excluded from Next.js build).
- `lib/vocabularyStorage.ts`: vocabulary progress, daily vocabulary selection, quiz generation, quiz result stats.
- `components/MockTestRunner.tsx` / `components/FullMockRunner.tsx`: reading+listening / full mock runners; both consume `useMockAudioPacing` and `mockShared`.
- `components/PartBreakdownBars.tsx`: shared per-part correct/total result bars.
- `components/dashboard/`: dashboard section components (`cards`, `PerformanceSections`, `VocabQuizSection`, `MockSections`, `BackupSection`).
- `types/question.ts`: question/answer/wrong-book types plus the `SKILLS` and `PARTS` registries (single source of truth for `SkillTag` / `Part`).
- `types/vocabulary.ts`: vocabulary item, progress, status, and quiz types.
- `DEVELOPMENT_LOG.md`: project history, QA notes, data counts, and latest scan records.

## Pipeline Rules

- `pipeline/` is a local RAG-style question generation tool, not part of the Next.js app runtime.
- Keep `pipeline/node_modules/`, `pipeline/output/`, `pipeline/dist/`, and `.env` files out of Git.
- `pipeline/.env.example` may document variable names only; never commit real API keys.
- Use `npm run check` inside `pipeline/` for data integrity after generated questions are inserted.
- Generated questions go in `data/questions-generated.ts`, exported as `GENERATED_QUESTIONS` and spread into the `QUESTIONS` array in `data/questions.ts` before `getQuestionsByPart`.
- Do not embed generated questions inside `buildDailyPlan`, helper functions, or after the helper function section.
- The `questions-writer.ts` pipeline tool must insert into `data/questions-generated.ts`, not `data/questions.ts`.
- `generator-part1.ts` and `generator-part2.ts` write draft listening output to `pipeline/output/part1-batch-{timestamp}.json` or `pipeline/output/part2-batch-{timestamp}.json`; humans must QA before manually inserting into `data/questions-listening.ts` or `data/questions-generated.ts`.
- Prompt examples should be abstract patterns, not copied TOEIC/public sample passages.
- If using public samples, store only source notes, patterns, distractor strategies, and fingerprints; do not store reusable source text as few-shot content.

## Data Model Rules

Question data must satisfy:

- Every question has a unique `id`.
- `part` is one of `Part 1`, `Part 2`, `Part 3`, `Part 4`, `Part 5`, `Part 6`, or `Part 7`.
- `choices` must include non-empty `A`, `B`, and `C`; `D` is required except for Part 2.
- `answer` must be one of `A`, `B`, `C`, or `D`.
- `skill_tag` must be a key of the `SKILLS` registry in `types/question.ts` (the `SkillTag` union derives from it).
- `explanation_zh` must be present and useful.
- `vocabulary` should be a non-empty array for every question.
- Part 3 and Part 4 questions must include `transcript`.
- Part 6 and Part 7 questions must include `passage`.
- Part 6 questions must have 4 blanks labeled `____(A)____` through `____(D)____` in the passage.

## Listening Audio/Image Rules

- Audio and image binary files must never be committed to Git.
- `imageUrl` and `audioUrl` must use a root-relative path such as `/audio/...` or a full `https://` URL.
- Part 1 questions require `imageAlt`.
- Part 2 questions must not include `choices.D`.

Vocabulary data must satisfy:

- Every word has a unique `id`.
- Required fields: `word`, `partOfSpeech`, `meaning_zh`, `example`, `example_zh`, `difficulty`, and `category`.
- `collocations` is optional, but should be useful when present.

## Learning Logic Rules

- Correct TOEIC answers do not automatically mark related vocabulary as mastered.
- Vocabulary flashcard self-rating is capped at `familiar`; it never produces `mastered`.
- Vocabulary quiz answers are authoritative for SRS advancement and lapse handling.
- Vocabulary `mastered` requires repeated quiz recall at sufficiently long review intervals.
- Wrong questions remain reviewable until dismissed or improved through repeated correct answers.
- Part 6 and Part 7 use `passage`; Part 3 and Part 4 use `transcript`.
- Part 6 questions are identified by question ID prefix `p6-` in analytics (they use `reading_detail` skill_tag).
- Part 7 dashboard analytics must filter by `p7-` question IDs, not only by `reading_*` skill tags, because Part 6 may also use `reading_detail`.
- Quiz timing is per question: `app/quiz/page.tsx` starts a timer when a question is shown and stores `responseTimeMs` on submit.

## QA Checklist

Run these checks after meaningful changes:

1. `npm run lint`
2. `./node_modules/.bin/tsc --noEmit`
3. `npm run build`
4. `cd pipeline && npm run check`
5. Data integrity check for:
   - duplicate question IDs.
   - invalid answers.
   - missing choices.
   - missing `explanation_zh`.
   - missing vocabulary arrays.
   - missing Part 3/4 transcripts.
   - missing Part 6/7 passages.
   - duplicate vocabulary IDs.
6. Vocabulary quiz generation check:
   - today's quiz contains the fixed daily-session items.
   - random challenge contains 10 questions when vocabulary exists.
   - 4 choices per question.
   - no duplicate choices.
   - valid `correctIndex`.
   - all three question types remain possible.
7. Manual route smoke test when UI changes are made:
   - `/`
   - `/practice`
   - `/quiz`
   - `/wrongbook`
   - `/dashboard`
   - `/vocabulary`
   - `/vocabulary-quiz`
   - `/mock-test`
   - `/listening-mock`
   - `/full-mock`
   - `/mock-review/[snapshotId]` after completing a new mock

## Known Environment Notes

- `.next` is generated output. If TypeScript reports duplicate files such as
  `.next/types/cache-life.d 2.ts`, rebuild with `npm run build` or clear stale
  generated output. Do not treat that as source data corruption.
- Root-level validation commands may hang if generated artifacts or nested
  dependencies are accidentally tracked. Confirm `pipeline/node_modules/` and
  `pipeline/output/` are ignored before running broad scans.
- Rotate local pipeline API keys if they are ever printed in process listings,
  terminal logs, or committed files.
- A stale dev server on port 3000 may show outdated behavior. Restart the dev
  server after framework or route changes.
- Production build is the most reliable end-to-end framework validation.
- **macOS iCloud dataless placeholders**: Files synced via iCloud may show `compressed,dataless` flag in `ls -lO`. Before running any command, verify critical files (`package.json`, `tsconfig.json`, etc.) are fully downloaded with `find . -flags +dataless`; `cat` or `head` can hang while FileProvider tries to materialize placeholders.
- **buildMockTestPlan expects strict part distribution**: The function asserts Part 5=30, Part 6=16 (4 groups × 4), Part 7=54 (single=29, double=10, triple=15). If the question pool doesn't satisfy these constraints, the function throws. Run `cd pipeline && npx tsx src/mark-groups.ts --write` after adding Part 6/7 questions to ensure `passage_group_id` is populated.

## Change Guidelines

- Keep edits scoped to the requested feature or bug.
- Preserve existing localStorage keys unless a migration is implemented.
- Avoid changing question IDs or vocabulary IDs without a migration reason.
- Avoid changing answer history shape unless dashboard and wrong-book readers are updated together.
- Prefer typed helper functions over ad hoc string parsing.
- Update `DEVELOPMENT_LOG.md` when changing user-facing behavior, data counts, QA status, or architecture assumptions.
- When adding question data, run both data integrity checks and a quick answer distribution review.

## Agent Role Guidance

- Codex: best for QA scans, bug fixes, targeted refactors, route checks, and medium-sized implementation tasks.
- Claude Code: best for larger implementation work and project integration.
- DeepSeek v4 Pro: primary model for TOEIC question generation (Part 5/6/7).
- Kimi 2.6: Chinese explanation (explanation_zh) optimization and review.
- Hy3 Preview (via OpenRouter): QA review of generated questions (answer correctness, distractor quality).

## Audit Rules (2026-05-23 Comprehensive Audit)

These rules were identified during a full-stack audit. Future agents MUST follow these.

### Resolved (2026-05-23 third-pass)

Items fixed in this pass:

- Dynamic weak-skill selection (was hardcoded `WEAK_SKILL_TAGS`) ✅
- `excludeMock` rollout in `lib/analysis.ts` — all 15+ entry points filter mock data ✅
- ARIA on home emoji-links / quiz radiogroup / mock-test grid / progress bar / timer ✅
- Dashboard `useMemo` refactor — inline IIFE replaced, all derived values memoized ✅
- `passage_group_id` globally unique across files via module-level `groupIndexes` in `mark-groups.ts` ✅
- `vocabularyStorage.ts` regex escape (`escapeRegExp` in `makeFillBlank`) ✅
- `clearAllProgress` now also clears mock data ✅
- localStorage `QuotaExceededError` protection with user-facing alert ✅
- Data export/import (backup/restore) via Dashboard ✅
- Wrong-book dismissed entries pruned (90-day age limit, 500-entry cap) ✅
- `getTomorrowRecommendation` Part 6 stats now exclude mock data ✅

### Data Integrity Rules

- **Never change question IDs without migration.** Existing records in localStorage reference IDs. Changing an ID orphans user progress.
- **Populate `passage_group_id` on all Part 6/7 questions.** `buildMockTestPlan` prefers `passage_group_id` and falls back to the full passage text only when the ID is missing. Never group by a truncated passage prefix. **`passage_group_id` must be globally unique across all files.** `pipeline/src/mark-groups.ts` uses a module-level `groupIndexes` counter that persists across all target files — do not move it back inside `processFile()`.
- **Escape regex special characters in user data before constructing `RegExp`.** `lib/vocabularyStorage.ts` `makeFillBlank` uses `escapeRegExp(item.word)` to prevent `.`, `+`, and other metacharacters from causing incorrect matches.
- **Mock test plans must be exact.** `buildMockTestPlan()` must assert total=100, Part 5=30, Part 6=16, and Part 7=54. If valid Part 6/7 groups are insufficient, throw a clear error instead of returning a partial plan.
- **Part 6 questions must have exactly 4 blanks per passage** labeled `____(A)____` through `____(D)____`.
- **Do NOT embed generated questions inside `buildDailyPlan()` or helper functions.** Generated questions go in `data/questions-generated.ts`, imported and spread into the `QUESTIONS` array before `getQuestionsByPart`.
- **Maintain answer distribution.** Target A/B/C/D each 20-30% across any new question batch.

### Performance Rules

- **Use `useMemo` for derived computations in dashboard.** `countMistakesBySkill`, `summarize`, and similar functions iterate all records. Memoize to avoid re-computation on every render.
- **No dynamic imports in hot paths.** Example: `import("@/lib/mockStorage")` inside a click handler should be a top-level static import.
- **No inline IIFEs that iterate all records in JSX.** Extract to a memoized value or helper function.
- **Use `endTime - Date.now()` for countdown timers, not `setInterval` accumulation.** This prevents drift on tab background/pause.
- **`data/questions.ts` is already 6500+ lines.** At 1000+ questions, split into per-part files (`data/questions-part5.ts`, etc.) and import them into the main array.

### Type System Rules

- **Parts and skills derive from registries — add in ONE place.** `types/question.ts` holds `PARTS` (Part 1–7, each with `section` + `label`) and `SKILLS` (each with `label` + `category`). The `Part` / `SkillTag` unions, `PART_LIST` / `SKILL_TAG_LIST`, `SKILL_LABELS`, the section/category lookups, and the pipeline validator (which imports `PART_LIST` / `SKILL_TAG_LIST`) all derive from these. To add a part or skill, add one registry entry — do NOT hand-maintain parallel lists. Still fix any `switch`/`match` exhaustiveness checks the compiler flags.
- **`passage_group_id`, `passage_order`, `question_order` are optional but should be set on all Part 6/7 questions.** They exist in the type — use them.
- **Do not add fields to Question type that overlap with existing fields.** Example: `"description"` was generated by DeepSeek but is not a valid field; it should map to `explanation_en` or be removed.

### localStorage Rules

- **All localStorage keys live in `STORAGE_KEYS` (`lib/storageCore.ts`); never change a key string without migration.** Current keys: `toeic_answer_records_v1`, `toeic_daily_plan_v1`, `toeic_wrong_status_v1`, `toeic_wrong_practice_plan_v1`, `toeic_vocabulary_progress_v1`, `toeic_vocabulary_daily_session_v1`, `toeic_mock_session_v1`, `toeic_mock_results_v1`, `toeic_listening_mock_session_v1`, `toeic_listening_mock_results_v1`, `toeic_full_mock_session_v1`, `toeic_full_mock_results_v1`, `toeic_mock_review_snapshots_v1`, `toeic_manual_review_items_v1`. Read/write through `readJSON`/`writeJSON` so QuotaExceededError handling is automatic — do not inline `localStorage` JSON parsing.
- **Always catch QuotaExceededError.** localStorage is limited to 5-10MB. Silent failure = data loss.
- **Mock test answers do NOT go to `toeic_answer_records_v1`** unless the user actually answered AND got it wrong. Null answers stay in mock session only.
- **Wrong-book dismissed entries are pruned.** Entries with `dismissed: true` are removed after 90 days. Status map is capped at 500 entries, with dismissed entries evicted first.

### Vocabulary SRS design intent

- The daily session uses four ordered buckets: `retry` > `due` > `masteredReview` > `new`.
- The daily item IDs are persisted for the date so flashcard study and today's quiz validate the same words.
- Daily progress distinguishes flashcard `reviewedIds` from quiz `validatedIds`; only validation completes the formal task.
- Quiz is the authority for status transitions; flashcard self-rating is capped at `familiar`.
- `mastered` requires `consecutiveCorrect >= 3` and `intervalDays >= 14`.
- Correct quiz practice before `nextReviewDate` records the result but does not advance SRS; a wrong answer applies a lapse immediately.
- A wrong daily validation adds the word to today's reinforcement queue. Reinforcement is limited to two rounds and never advances SRS on a same-day correct answer.
- A wrong quiz answer lowers `mastered` to `familiar` with `intervalDays = 0`, and lowers `familiar` to `seen`; daily validation lapses are added to immediate reinforcement.
- Quiz statistics are recorded by source: `daily`, `random`, and `reinforcement`; dashboard metrics must not mix them as formal daily performance.
- Scheduling follows retry today, then 1, 3, 7, 14, and 30 day intervals.
- To control workload, `retry + due >= 15` suppresses new words and daily total above 25 defers excess retries.
- Migration backfills SRS fields based on legacy vocabulary status without changing `toeic_vocabulary_progress_v1`.

## Architecture Conventions (2026-05-30 Refactor)

A staged, behavior-preserving refactor centralized cross-cutting logic. Follow
these patterns so new features touch one place, not many. All localStorage keys
and existing behavior were preserved (no migration).

### Taxonomy — single source of truth
- `types/question.ts` `SKILLS` and `PARTS` registries define every skill/part once. The `Part`/`SkillTag` unions, `PART_LIST`/`SKILL_TAG_LIST`, `SKILL_LABELS`, section/category lookups, and the pipeline validator derive from them. Add an entry there; everything else updates automatically. (See Type System Rules.)

### Storage layer
- `lib/storageCore.ts` owns `STORAGE_KEYS` and the `readJSON`/`writeJSON`/`isBrowser`/`isChoice`/`isValidDate` primitives. Every storage module imports from it; none re-declares these or hardcodes a key string.
- `lib/sessionStore.ts` `createSessionStore<TSession, TResult>(config)` backs all three mock stores (reading, listening, full): get/save/clear session, the answer toggle, the audio "no replay" consumption markers, and result get/save/trim. `mockStorage.ts` and `fullMockStorage.ts` keep only their own validators + session construction and delegate the rest.

### Mock runners
- `lib/useMockAudioPacing.ts` is the shared listening pacing state machine (consumed-audio sets, active group, Part 3 question-stem countdown). Both `MockTestRunner` and `FullMockRunner` use it; differences are passed as callbacks (`persistAudioGroup`, `persistQuestionAudio`, `onCountdownAdvance`) plus the `isListeningActive` gate. The no-replay rule still fires on `onPlaybackStart` (see Audio consumption rule).
- `lib/mockShared.ts` holds the pure helpers; `components/PartBreakdownBars.tsx` renders the shared per-part result bars.

### Mock review snapshots
- Completed mock exams may create a compact review snapshot in `toeic_mock_review_snapshots_v1` via `lib/mockReviewStorage.ts`. Snapshot storage is separate from mock result history so score summaries stay small and backward-compatible.
- `MockTestResult` and `FullMockResult` may contain optional `reviewSnapshotId`; legacy results without it remain valid and simply do not show a review link.
- Store `questionId` plus the needed question fields (`question`, `choices`, `answer`, explanation, passage/transcript/media URLs) in the snapshot. Do not rely only on `getQuestionById` for historical review, because later question-bank edits would change what the student sees.
- Do not store audio/image binary data in localStorage; store metadata/URLs only. Media can 404 later, but the textual review must remain useful.
- Keep snapshot retention bounded (currently 10 newest snapshots). Full mock snapshots are large; do not append unbounded data to localStorage.
- Existing mock timing still has no per-question response time. `responseTimeMs` in review items is optional; do not change the exam flow just to populate it unless a future task explicitly asks.
- Mock review can add a question to the manual review queue. This must not create a fake wrong `AnswerRecord` or change mock scores; it only stores enough metadata to surface the question in the wrongbook/review flow.

### Question queries
- `data/questions.ts` `queryQuestions({ parts, skills, categories, difficulties, excludeIds })` is the unified filter; `getQuestionsByPart`/`getQuestionsBySkill`/`getQuestionsByCategory` are thin wrappers. Prefer it over ad hoc `.filter()`. `buildDailyPlan`/`buildMockTestPlan`/`buildListeningMockPlan` are unchanged.

### Large pages
- Split big client pages into a metrics hook + presentational section components. `app/dashboard/page.tsx` (was 1052 lines) is now a thin container: state + load effect + handlers + `useDashboardMetrics` + a list of `components/dashboard/*` sections. Preserve `useMemo` rules (Performance Rules) and ARIA when extracting.

## Mistake Reason System (Phase 1, 2026-05-31)

Diagnoses *why* an answer was wrong (not just which skill), so practice can move
from "re-feed the skill you miss" toward cause-specific remediation. Phase 1 is
**capture + display only** — later phases route causes into treatment tracks.

### Data model
- `MistakeReason = "vocab" | "grammar" | "comprehension" | "speed" | "careless" | "guess"` and `ReasonSource = "user" | "inferred"` in `types/question.ts`, with `MISTAKE_REASONS` + `MISTAKE_REASON_LABELS` (registry style — add a reason in one place). `"trap"` is intentionally deferred to a later phase (needs distractor metadata).
- `AnswerRecord` gained **optional** `mistakeReason?` / `reasonSource?`. Only meaningful when `isCorrect === false`. Additive + backward-compatible: legacy records without them are valid (= unlabeled). `isAnswerRecord` validates them as "undefined passes, bad values rejected".
- Reason is a property of **each attempt** (the AnswerRecord), not of the question — the same question re-done can fail for a different reason.

### Inference (pre-select, never auto-commit silently)
- `inferMistakeReason(question, record, isWeakWord?)` in `lib/analysis.ts` returns a suggested reason to pre-select in the chip UI, or `null` when there is no clear signal.
- **speed: reading parts only (Part 5/6/7).** In `/quiz` the listening `responseTimeMs` includes audio playback, so it is NOT a usable speed signal — never infer speed for Part 1–4. Thresholds: `SLOW_THRESHOLD_MS`, `FAST_FLOOR_MS`, `PART_TIME_BUDGET_MS` (reading parts only).
- **vocab is injected, not coupled.** `inferMistakeReason` takes an `isWeakWord?` predicate so `analysis.ts` stays pure (no `vocabularyStorage` import). The quiz page builds the predicate: weak word = in the bank AND SRS status `new`/`seen`/none (familiar/mastered are NOT weak).
- Priority when several apply: **speed > vocab > careless.**

### Capture UX (do NOT make it block or nag)
- Chips appear **only in `/quiz`, only on wrong answers**, after the explanation card. `/quiz` is never a mock, so no mock gating is needed — and the mock runners must never show inline reason chips (protects timing).
- Never blocks navigation: not choosing a chip still advances. The inferred reason is persisted as `"inferred"` on submit (so collection doesn't depend on a tap); tapping a chip upgrades it to `"user"`.
- `MistakeReasonChips` uses progressive disclosure (≤3 primary + "其他原因" details), `role="radiogroup"`, and a Part-aware `comprehension` label ("聽不懂" for listening, "看不懂" for reading).
- `responseTimeMs` for inference must come from the existing `handleSubmit` value — do not call `Date.now()` a second time.

### Writeback + vocab routing
- `updateLatestReason(questionId, reason, source)` in `lib/storage.ts` updates the **latest wrong attempt** for that question (scans from the end for `isCorrect === false`). No-op if none; **no side effects** on wrong-status/SRS — it only writes metadata.
- vocab reason routes weak words into review via `bumpWordsToDueByWords(words)` in `lib/vocabularyStorage.ts`. **Safety red line:** it only pulls `seen`/`familiar` words' `nextReviewDate` *earlier* to today; it never touches `new`/`mastered`, never changes `status`/`intervalDays`/`consecutiveCorrect`, and is a no-op when nothing matches. Use the local `todayStr()` (not UTC `toISOString`).

### Display
- `countMistakesByReason` (mock-excluded, labeled wrongs only) and `getReasonInsight` (headline + careless over-use guard; returns `null` under `MIN_LABELED_FOR_INSIGHT`) live in `lib/analysis.ts`; surfaced via `useDashboardMetrics` (`reasonBreakdown`, `reasonInsight`) and `components/dashboard/ReasonBreakdownSection.tsx`. The headline insight is the highest-value output — it is what turns the "measuring instrument" into a "coach".

## Grammar Variant Remediation (Phase 2, 2026-05-31)

First cause-specific treatment track after Mistake Reason Phase 1. When grammar
errors cluster around a skill, the dashboard can launch a short practice set of
same-skill **new variant questions** instead of asking the student to memorize
the original wrong item.

- `getGrammarWeakSkills(records)` in `lib/analysis.ts` looks only at wrong
  records where `mistakeReason === "grammar"` and the skill category is
  grammar. It sorts by severity.
- `buildGrammarVariantPlan(records, { maxQuestions = 5 })` in
  `lib/grammarRemediation.ts` uses `queryQuestions` to select same-skill
  questions while excluding every question ID the learner has already attempted.
  It round-robins across weak grammar skills so one dominant skill does not
  consume the whole plan.
- `startGrammarVariantPractice(questionIds)` in `lib/storage.ts` writes the
  existing wrong-practice plan key. It returns `false` for an empty plan and does
  not create a broken quiz session.
- Dashboard wiring lives in `components/dashboard/ReasonBreakdownSection.tsx`
  and `app/dashboard/page.tsx`: show the CTA only when grammar weak skills exist;
  if all same-skill variants have already been attempted, alert the user instead
  of navigating to an empty quiz.
- This phase does not generate new questions and does not change SRS, dashboard
  totals, mock behavior, or the `AnswerRecord` schema.

## Media Storage Rules

Audio (Part 1/2/3/4) and images (Part 1) are stored in Vercel Blob, never in git.

### Storage convention

- Audio: `audio/<questionId>.mp3` — combined Q + choices, single playback (matches TOEIC test conditions)
- Images: `images/<questionId>.jpg` — Part 1 photographs

### Environment variables

- `NEXT_PUBLIC_BLOB_BASE_URL` — client + server, public Blob URL prefix
- `BLOB_READ_WRITE_TOKEN` — server only, for upload scripts in `pipeline/`
- `OPENAI_API_KEY` — server only, for TTS + DALL-E generation in `pipeline/`

### URL access

Always use `lib/media.ts` helpers (`getAudioUrl(q)` / `getImageUrl(q)`) — never construct Blob URLs inline. Helpers handle null fallback when env is missing.

### Graceful degradation

If a question lacks audio in Blob (404 or env unset), the UI must:
- In `/quiz`: show the `audioScript` text as fallback (study mode)
- In `/mock-test`: show "⚠ 音檔未載入" without leaking the script (test integrity)

### Listening mock integrity

- In `/listening-mock`, Part 1/2 testing screens show only answer letters, never the spoken `question` or `choices` text. The text fields ARE the spoken audio — exposing them turns the listening mock into an open-book reading test.
- A mock audio group is consumed when playback actually starts, not when it finishes. Navigation away or refresh must not permit replay of partial audio.
- Part 3/4 use one continuous audio player per shared transcript group. Moving among the three questions in that group must not remount or restart the recording.
- In Part 3 listening mock only, each consumed conversation is followed by narrated question-stem audio and an 8-second answering countdown. Countdown expiry advances automatically whether or not the question was answered; selecting an answer and using Next may advance sooner.
- Part 3 narrated question audio is consumed on audible playback start, independently for each question, and is persisted in `playedQuestionAudioIds`. A failed load is also persisted while its 8-second fallback countdown runs.
- Daily `/quiz` is deliberately not timed. Its Part 3 learning flow does play the separate narrated question stem, but the student controls answer and navigation timing.

#### Audio consumption rule — design intent (do NOT change)

The mock listening "no replay" rule fires on `AudioPlayer.onPlaying` (the HTML5 `playing` event), i.e. **audible playback start**, NOT on `loadstart` or `canplay`. Implementation: `AudioPlayer.onPlaybackStart` → `MockTestRunner.handleAudioStarted` → `markAudioGroupPlayed`.

**Do not be tempted to mark on `loadstart`/`canplay` "to close the race window."** A previous review iteration flagged the gap between `loadstart` and `onPlaying` as a Medium race condition and proposed moving the mark earlier. That fix would actively harm test-takers:

- Slow network: audio downloaded but never played → wrongly marked consumed.
- Mobile / iOS autoplay blocked: the `<audio autoPlay>` attempt fails silently; only a user gesture starts playback. Marking on `canplay` would consume the audio before the student ever heard it, with no way to recover.
- Background tab: audio buffered but not playing → wrongly consumed.

If a student navigates away **before** audio starts playing, they have heard nothing, so `markAudioGroupPlayed` is correctly NOT called and returning to the question is allowed to play. This is the intended behavior. `mockStorage.ts` docstring (`markAudioGroupPlayed`) explicitly says "audible playback starts" — preserve that semantic.

`handleAudioStarted` and `markAudioGroupPlayed` are both idempotent (Set check + localStorage write), so the HTML5 `playing` event re-firing after a buffering stall is safe.

### `/quiz` listening study versus mock

- `/quiz` is study mode: Part 3/4 auto-play each conversation or talk once per current daily/wrongbook plan, then keep manual replay available on later questions in the same transcript group.
- `/quiz` persists a group's automatic playback after audible start, completion, or load failure in `autoPlayedListeningGroups` on the existing plan payload; new plans start empty and existing localStorage keys do not change.
- `/quiz` Part 3 automatically plays `audio/<questionId>-q.mp3` after the conversation has ended, failed, or was already played earlier in the plan. There is no countdown or automatic advance.
- `/quiz` Part 4 currently has no separately narrated question-stem asset; it only applies one-time group auto-play plus optional replay.
- `/listening-mock` remains strict test mode: its no-replay consumption and timed Part 3 progression are separate behavior and must not be relaxed by study-mode changes.

### What goes where

- `lib/media.ts` — URL helpers, runs in browser + Node
- `pipeline/src/generate-audio.ts` — TTS + Blob upload, runs in Node only
- `pipeline/src/generate-images.ts` — gpt-image-1 + Blob upload, runs in Node only

### Audio generation pipeline (C2)

- Script: `pipeline/src/generate-audio.ts`
- Model: OpenAI `tts-1`
- Part 1 and Part 4 keep the deterministic single-voice rotation among `alloy`, `echo`, `nova`, and `shimmer` by question id hash.
- Part 2 uses two voices: the question stem uses the deterministic rotation, and all three answer choices use an opposite-gender default (`onyx` for `alloy`/`nova`/`shimmer`, `nova` for `echo`/`onyx`).
- Part 3 uses transcript speaker labels: `W`/`Woman`/`W1` → `nova`, `W2` → `shimmer`, `M`/`Man`/`M1` → `onyx`, `M2` → `echo`, unrecognized speaker labels → `alloy`.
- Part 3 falls back to single-voice output if a transcript cannot be parsed into at least two labelled speaker segments.
- Multi-voice output concatenates MP3 segment buffers into one playable file. v1 intentionally has no silence padding between segments.
- With `--question-audio --part 3`, Part 3 question stems are narrated by `fable` and uploaded separately at `audio/<questionId>-q.mp3` for listening mock pacing.
- Idempotent: skips already-uploaded unless `--force`
- Rate limit: 30 TTS segment requests per minute; multi-voice questions consume multiple requests
- Cost: tts-1 = $15 / 1M chars; full listening bank ≈ $1
- `put()` MUST set `addRandomSuffix: false` to keep URL convention `audio/<id>.mp3`
- Always run `--dry-run` first, then `--limit 3`, then full batch

### Image generation pipeline (C3)

- Script: `pipeline/src/generate-images.ts`
- Model: OpenAI `gpt-image-1` (replaces deprecated `dall-e-3`)
- Quality / size defaults: `medium` / `1024x1024` (~$0.042/image)
- Style prefix: "Photorealistic professional photograph of a business workplace setting..."
- Idempotent: skips already-uploaded unless `--force`
- Rate limit: 5 RPM (tier 1 image-gen cap)
- Cost: 30 Part 1 images ≈ $1.20 at medium
- `put()` MUST set `addRandomSuffix: false` to keep URL convention `images/<id>.jpg`
- Returns `b64_json` by default; legacy `response_format` parameter no longer supported
- Always run `--dry-run` first, then `--limit 2`, then full batch

### Testing Rules

- **After any data change, run:**
  1. `npm run lint`
  2. Vercel production build (`vercel --prod --yes`)
  3. Data integrity: duplicate IDs, invalid answers, missing fields, missing transcript/passage
- **After any UI change, smoke test all routes:** `/`, `/practice`, `/quiz`, `/wrongbook`, `/dashboard`, `/vocabulary`, `/vocabulary-quiz`, `/mock-test`, `/listening-mock`.

### Accessibility Rules (New)

- **Emoji-only link labels must have `aria-label`.** Example: `<Link aria-label="每日單字">📚</Link>`.
- **Quiz choice groups should use `role="radiogroup"` with `role="radio"` on each choice.**
- **Progress bars should have `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.**
- **Do not remove `-webkit-tap-highlight-color` without providing alternative focus indicators.**
- **All pages should have a way to navigate home.** Some pages (quiz, mock-test during testing) lack home links — this is acceptable for focused flows but should be documented.

`AGENTS.md` is the source of truth for future coding-agent instructions in this repository.
