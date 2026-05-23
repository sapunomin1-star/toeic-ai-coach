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
- Daily vocabulary flashcards with cross-day confirmation for `mastered`.
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
- `app/vocabulary/page.tsx`: daily vocabulary flashcard flow.
- `app/vocabulary-quiz/page.tsx`: vocabulary quiz UI and result persistence.
- `data/questions.ts`: TOEIC question bank plus question selection helpers.
- `data/vocabulary.ts`: TOEIC vocabulary bank.
- `lib/storage.ts`: answer records, wrong-book status, daily plans, wrong-practice plans.
- `lib/analysis.ts`: accuracy, mistake, timing, recommendation, Part 5/6/listening/reading analytics.
- `pipeline/`: RAG question generation pipeline (excluded from Next.js build).
- `lib/vocabularyStorage.ts`: vocabulary progress, daily vocabulary selection, quiz generation, quiz result stats.
- `types/question.ts`: question, answer, skill, part, and wrong-book types.
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
- Prompt examples should be abstract patterns, not copied TOEIC/public sample passages.
- If using public samples, store only source notes, patterns, distractor strategies, and fingerprints; do not store reusable source text as few-shot content.

## Data Model Rules

Question data must satisfy:

- Every question has a unique `id`.
- `part` is one of `Part 5`, `Part 3`, `Part 4`, `Part 6`, or `Part 7`.
- `choices` must include non-empty `A`, `B`, `C`, and `D`.
- `answer` must be one of `A`, `B`, `C`, or `D`.
- `skill_tag` must match `SkillTag` in `types/question.ts`.
- `explanation_zh` must be present and useful.
- `vocabulary` should be a non-empty array for every question.
- Part 3 and Part 4 questions must include `transcript`.
- Part 6 and Part 7 questions must include `passage`.
- Part 6 questions must have 4 blanks labeled `____(A)____` through `____(D)____` in the passage.

Vocabulary data must satisfy:

- Every word has a unique `id`.
- Required fields: `word`, `partOfSpeech`, `meaning_zh`, `example`, `example_zh`, `difficulty`, and `category`.
- `collocations` is optional, but should be useful when present.

## Learning Logic Rules

- Correct TOEIC answers do not automatically mark related vocabulary as mastered.
- Correct vocabulary quiz answers do not directly mark words as mastered.
- Vocabulary `mastered` requires cross-day active confirmation through the flashcard flow.
- Vocabulary quiz results may promote `new` or `seen` words to `familiar`, but not to `mastered`.
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
   - 10 questions when vocabulary exists.
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

- **Part union must stay in sync.** If adding Part 1 or Part 2, update: `Part` type, `SKILL_LABELS`, `VALID_PARTS` in pipeline/validator.ts, and all switch/match exhaustiveness checks.
- **`passage_group_id`, `passage_order`, `question_order` are optional but should be set on all Part 6/7 questions.** They exist in the type — use them.
- **Do not add fields to Question type that overlap with existing fields.** Example: `"description"` was generated by DeepSeek but is not a valid field; it should map to `explanation_en` or be removed.

### localStorage Rules

- **Never change localStorage key names without migration.** Current keys: `toeic_answer_records_v1`, `toeic_daily_plan_v1`, `toeic_wrong_status_v1`, `toeic_wrong_practice_plan_v1`, `toeic_vocabulary_progress_v1`, `toeic_mock_session_v1`, `toeic_mock_results_v1`.
- **Always catch QuotaExceededError.** localStorage is limited to 5-10MB. Silent failure = data loss.
- **Mock test answers do NOT go to `toeic_answer_records_v1`** unless the user actually answered AND got it wrong. Null answers stay in mock session only.
- **Wrong-book dismissed entries accumulate forever.** Consider pruning entries older than N days with `dismissed: true`.

### Testing Rules

- **After any data change, run:**
  1. `npm run lint`
  2. Vercel production build (`vercel --prod --yes`)
  3. Data integrity: duplicate IDs, invalid answers, missing fields, missing transcript/passage
- **After any UI change, smoke test all routes:** `/`, `/practice`, `/quiz`, `/wrongbook`, `/dashboard`, `/vocabulary`, `/vocabulary-quiz`, `/mock-test`.

### Accessibility Rules (New)

- **Emoji-only link labels must have `aria-label`.** Example: `<Link aria-label="每日單字">📚</Link>`.
- **Quiz choice groups should use `role="radiogroup"` with `role="radio"` on each choice.**
- **Progress bars should have `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.**
- **Do not remove `-webkit-tap-highlight-color` without providing alternative focus indicators.**
- **All pages should have a way to navigate home.** Some pages (quiz, mock-test during testing) lack home links — this is acceptable for focused flows but should be documented.

`AGENTS.md` is the source of truth for future coding-agent instructions in this repository.
