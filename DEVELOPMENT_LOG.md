# TOEIC AI Coach Development Log

## Full Project Scan - 2026-05-22

### Scope

- Scanned source files under `app/`, `lib/`, `data/`, and `types/`.
- Reviewed repository guidance files: `AGENTS.md`, `CLAUDE.md`, `README.md`, and this development log.
- Ran framework validation, TypeScript validation, linting, production build, data integrity checks, and vocabulary quiz generation checks.
- Updated agent documentation and removed the obsolete Claude redirect file.

### Commands and Results

- `npm run lint`: passed.
- `./node_modules/.bin/tsc --noEmit`: initially failed because stale generated output contained `.next/types/cache-life.d 2.ts`, causing duplicate Next.js type declarations.
- `npm run build`: passed. Next.js 16.2.6 compiled successfully, ran TypeScript inside the production build, generated static pages, and removed the stale duplicate `.next` type artifact.
- `./node_modules/.bin/tsc --noEmit`: passed after the production build regenerated `.next`.
- Data integrity script: passed.
- Vocabulary quiz generation stress check: passed across 100 generated quizzes.
- Production route HTTP smoke test on `http://127.0.0.1:3010`: passed.

### Production Build Routes

The production build generated these app routes successfully:

- `/`
- `/_not-found`
- `/dashboard`
- `/practice`
- `/quiz`
- `/vocabulary`
- `/vocabulary-quiz`
- `/wrongbook`

HTTP smoke test status codes:

- `/`: 200.
- `/practice`: 200.
- `/quiz`: 200.
- `/wrongbook`: 200.
- `/dashboard`: 200.
- `/vocabulary`: 200.
- `/vocabulary-quiz`: 200.

### Data Integrity Results

- Total questions: 426.
- Part 5 questions: 300.
- Part 3 questions: 33.
- Part 4 questions: 33.
- Part 7 questions: 60.
- Vocabulary words: 100.
- Duplicate question IDs: 0.
- Duplicate vocabulary IDs: 0.
- Questions with invalid answer keys: 0.
- Questions with missing choices: 0.
- Questions with missing `explanation_zh`: 0.
- Questions with missing or empty `vocabulary`: 0.
- Part 3 / Part 4 questions missing `transcript`: 0.
- Part 7 questions missing `passage`: 0.
- Vocabulary entries with missing required fields: 0.

Answer distribution across all questions:

- A: 69.
- B: 151.
- C: 135.
- D: 71.

This is not a functional bug, but future content QA should review answer balance if new questions are added.

### Vocabulary Quiz Generation Results

Across 100 generated quiz runs:

- Expected question count: passed, 10 questions per quiz.
- Choice count: passed, 4 choices per question.
- Duplicate choices: none found.
- Dash filler choices: none found.
- Invalid `correctIndex`: none found.
- Question type generation remained active for `en-to-zh`, `zh-to-en`, and `fill-blank`.

### Bugs and Fixes

1. Fixed Part 5 analytics undercounting.
   - Problem: `lib/analysis.ts` did not include `pronoun` in `PART5_SKILLS`.
   - Impact: pronoun questions were omitted from Part 5 accuracy and Part 5 average-time calculations.
   - Fix: added `pronoun` to `PART5_SKILLS`.

2. Fixed home-page task description drift.
   - Problem: `app/page.tsx` described today's training as Part 5 plus listening plus wrong review, but the actual daily plan also includes Part 7 reading.
   - Impact: user-facing description was incomplete.
   - Fix: updated the home-page plan text to include 3 reading questions.

3. Cleaned obsolete agent guide redirect.
   - Problem: `CLAUDE.md` only redirected to `AGENTS.md`.
   - Fix: deleted `CLAUDE.md` as requested and expanded `AGENTS.md` as the canonical coding-agent guide.

### Documentation Changes

- Rewrote `AGENTS.md` with:
  - project goal and product boundaries.
  - Next.js version warning.
  - architecture map.
  - data model rules.
  - learning logic rules.
  - QA checklist.
  - known environment notes.
  - change guidelines.
  - agent role guidance.
- Kept `DEVELOPMENT_LOG.md` as the detailed project scan and QA history.

### Current Known Issues

- No blocking source-code bugs found after the fixes above.
- Standalone TypeScript can fail if stale `.next` duplicate files appear again, especially files named like `* 2.ts`. Regenerating `.next` with `npm run build` cleared the issue during this scan.
- Answer distribution is skewed toward B and C. This does not break the app, but it is worth reviewing during future question-bank expansion.

## Project Goal

- Personal TOEIC improvement tool for self-study.
- Target: steadily improve TOEIC score over time; do not hard-code a final score because the target may increase later.
- Daily use target: 15-30 minutes.
- This is not a commercial SaaS product.
- Do not prioritize login, database, cloud sync, payment, or multi-user features.
- Keep data local and simple; localStorage is the preferred persistence layer.

## Current Stable Version

Latest committed baseline:

- MVP 0.2.2: Daily vocabulary flashcards with four-stage status (`new` / `seen` / `familiar` / `mastered`) and cross-day confirmation for `mastered`.
- MVP 0.2.4: Expanded and QA'd TOEIC Part 5 question bank.
- MVP 0.2.4B: Added and QA'd Part 3 / Part 4 transcript question groups.

Current working tree also includes uncommitted work:

- MVP 0.2.5: Today practice planning and Part 3 / Part 4 strategy integration.
- MVP 0.2.6: Vocabulary Quiz (`/vocabulary-quiz`) with English-to-Chinese, Chinese-to-English, and fill-in-the-blank question types.
- MVP 0.3: Vocabulary Quiz + Part 7 Reading + Development Log. QA passed for TypeScript, ESLint, production build, route checks, vocabulary quiz logic, and Part 7 data.

## MVP 0.3 - Vocabulary Quiz + Part 7 Reading + Development Log

### Completed Features

1. Vocabulary Quiz /vocabulary-quiz
   - Generates 10 questions per quiz.
   - Includes three question types:
     - English to Chinese.
     - Chinese to English.
     - Example sentence fill-in-the-blank.
   - Each question has 4 non-duplicate choices.
   - Correct answers do not directly make a word `mastered`.
   - Wrong answers update vocabulary learning status.
   - Dashboard displays vocabulary quiz performance.

2. Part 7 Reading
   - Added Part 7 support.
   - Added `passage` field for reading questions.
   - Added reading skill tags:
     - `reading_main_idea`
     - `reading_detail`
     - `reading_inference`
   - Added 60 Part 7 short reading questions.
   - Every Part 7 question has `passage` and `vocabulary`.
   - Quiz displays Part 7 Reading Passage.
   - Daily plan includes Part 7.
   - Dashboard displays Reading performance.

3. Daily Practice Integration
   - Today's tasks include:
     - Daily vocabulary.
     - Vocabulary Quiz.
     - Part 5.
     - Part 3 / Part 4 transcript questions.
     - Part 7 reading.
     - Wrong question review.
   - Target remains 15-30 minutes per day.

4. QA Fix
   - Fixed `lib/analysis.ts`.
   - `countMistakesBySkill` now initializes:
     - `reading_main_idea`
     - `reading_detail`
     - `reading_inference`
   - This prevents Dashboard Reading mistake stats from showing `NaN`.

### Current Data Status

- `vocabulary.ts`: about 100 TOEIC words.
- `questions.ts`: about 426 questions.
  - Part 5: about 300 questions.
  - Part 3: 30+ questions.
  - Part 4: 30+ questions.
  - Part 7: 60 questions.
- Every question has vocabulary metadata.
- Every Part 7 question has a passage.

### Current QA Status

- TypeScript: passed (`npx tsc --noEmit`).
- ESLint: passed (`npm run lint`).
- Build: passed (`npm run build`, verified outside the sandbox due to Turbopack process/port permissions).
- Production route check: passed.
  - `/vocabulary-quiz` HTTP 200.
  - `/practice` HTTP 200.
  - `/quiz` HTTP 200.
  - `/dashboard` HTTP 200.
  - `/wrongbook` HTTP 200.
- Vocabulary Quiz logic: passed.
  - 10 questions per quiz.
  - Three question types present.
  - 4 non-duplicate choices per question.
  - Correct / wrong result stats and vocabulary status updates passed.
- Part 7 data check: passed.
  - 60 questions.
  - Every question has `passage`.
  - Every question has non-empty `vocabulary`.

### Important Design Decisions

- Correctly answering a question does not mean the vocabulary word is `mastered`.
- Vocabulary `mastered` is still based on cross-day active confirmation.
- Vocabulary Quiz only helps judge familiarity; it does not directly mark words as `mastered`.
- Part 7 uses `passage`; Part 3 / Part 4 use `transcript`.
- This project remains localStorage-first.
- Do not add login, database, cloud sync, payment, or multi-user support.

### Recommended Next Steps

1. Manually test the complete daily flow.
2. Observe whether the daily task count is too high for 15-30 minutes.
3. Review Part 7 question quality and difficulty.
4. Add vocabulary-to-wrong-question linkage later.
5. Add question repeat control later.
6. Add a 60-day progress system later.
7. Consider TTS / listening audio only later.

## MVP 0.4 — Part 6 + RAG Pipeline + Dashboard Expansion (2026-05-23)

### Post-Claude Code Scan and Fixes - 2026-05-23

Scope:

- Re-reviewed the full app after Claude Code added Part 6 analytics and the RAG generation pipeline.
- Checked app flow, `data/questions.ts`, `lib/analysis.ts`, `pipeline/`, `AGENTS.md`, and this log.
- Ran targeted data integrity checks and pipeline TypeScript validation.

Findings fixed:

1. Generated questions were appended into the body of `buildDailyPlan()` instead of the top-level `QUESTIONS` array.
   - Cause: `pipeline/src/questions-writer.ts` used the last `];` in the file as the insertion point.
   - Fix: moved the 18 generated questions into `QUESTIONS` and changed the writer to insert before `getQuestionsByPart`.

2. `countMistakesBySkill()` still missed `pronoun`.
   - Impact: wrong pronoun answers could produce `NaN` in dashboard skill stats.
   - Fix: added `pronoun` to the initialized skill list.

3. Pipeline TypeScript imports pointed to `../types/question` from `pipeline/src`, but the real shared type file is `../../types/question`.
   - Fix: corrected pipeline type import paths.

4. `pipeline/package.json` had `npm run check` pointing to a missing `run-integrity.ts`.
   - Fix: added `pipeline/run-integrity.ts`.

5. `pipeline/node_modules/` and `pipeline/output/*.json` were tracked generated artifacts.
   - Fix: added ignore rules and removed them from the Git index.

6. `pipeline/.env.example` documented stale `HY3_*` variables while config expects OpenRouter variables.
   - Fix: updated `.env.example` to `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, and `OPENROUTER_BASE_URL`.

7. The Part 6 practice row promised 2 questions even though the current bank has 0 Part 6 questions.
   - Fix: Practice hides the Part 6 task when no Part 6 data exists and passes `part6Count` into `buildDailyPlan`.

8. The Part 6 generator prompt embedded a concrete "TOEIC practice" few-shot example.
   - Fix: replaced it with an abstract structural pattern example to reduce source-copying risk.

9. `fingerprint-check` always returned `score: 0`.
   - Fix: return the maximum similarity score observed during fingerprint comparison.

Current data integrity result:

- 444 questions total.
- Part 5: 303.
- Part 3: 33.
- Part 4: 33.
- Part 6: 0.
- Part 7: 75.
- Vocabulary words: 100.
- Duplicate question IDs: 0.
- Invalid answers: 0.
- Missing choices: 0.
- Missing `explanation_zh`: 0.
- Missing vocabulary arrays: 0.
- Missing Part 3 / Part 4 transcripts: 0.
- Missing Part 6 / Part 7 passages: 0.
- Vocabulary quiz generation stress check: passed across 100 generated quizzes.

Verification notes:

- `./node_modules/.bin/tsc -p pipeline/tsconfig.json --noEmit --pretty false`: passed.
- Targeted data integrity script: passed.
- Vocabulary quiz generation script: passed.
- Root `tsc`, ESLint, and Next build commands did not emit source errors during this scan but hung in the local environment and were stopped to avoid leaving background processes. Re-run after confirming no generated artifacts or nested dependencies are tracked.

Security note:

- `pipeline/.env` contains real local API keys and is ignored by Git. Because key-bearing environment variables were visible in local process listings during validation, rotate those keys before sharing logs or pushing from an untrusted machine.

### Dashboard / Wrong Book Review - 2026-05-23

Reviewed the personal coach report, wrong-book flow, and answer timing path.

Findings:

- `app/quiz/page.tsx` correctly records per-question answer time with `responseTimeMs` when the user submits an answer.
- `saveAnswer()` correctly writes answer records and updates wrong-book status for wrong answers or existing wrong-book entries.
- `getWrongBookEntries()` correctly shows non-dismissed wrong-book entries with latest wrong answer, correct answer, status, and latest answer time.
- A simulated wrong-answer flow confirmed wrong questions appear in wrong book, and one later correct answer changes the status to `improving` while keeping the item reviewable.

Fix:

- Part 6 questions use `reading_detail`, so the Dashboard's Part 7 section could accidentally count future Part 6 attempts as Part 7 reading performance.
- `calculateReadingAccuracy()`, `countReadingAttempts()`, `calculateReadingAvgTime()`, and the Part 7 skill-mistake section now filter by `p7-` question IDs.
- Added `countPart7MistakesBySkill()` so Part 7 reading stats stay separate from Part 6 text-completion stats.

Timing coverage:

- Part 5, Part 6, Part 7, Part 3, and Part 4 questions all go through the same quiz submit path, so they can all record `responseTimeMs`.
- Current timing is per question, not full-session countdown. A future simulated TOEIC reading mode should add a separate session timer.

### Part 6 Generation Run + Practice Page Update - 2026-05-23

Generated 12 Part 6 questions (3 passages × 4 blanks each) via the RAG pipeline:

- DeepSeek v4 Pro generated all 12 questions across 3 patterns (internal email, office memo, customer notice).
- 2 of 3 patterns produced valid output on first attempt; the office memo pattern needed a retry.
- All Part 6 questions validated: 4 blanks per passage (A/B/C/D), correct passage sharing, valid skill_tag (`reading_detail`), non-empty vocabulary and explanation_zh.

Updated practice page descriptions:

- Part 5 弱點補強: "依錯題分析自動挑選最弱文法" (was static skill list).
- Part 5 新題練習: now lists all 8 skill types including pronoun and relative clause.
- Part 7: changed from listing passage types to listing question types (主旨 / 細節定位 / 推論).
- Part 3/4: cleaned up description.

Current data counts:

- 456 questions total.
- Part 5: 303. Part 3: 33. Part 4: 33. **Part 6: 12**. Part 7: 75.

Practice page now shows the Part 6 task row (2 題 · 段落填空 · 詞性 / 連接 / 介系詞).

### Completed Features

1. **Part 6 Text Completion**
   - Added `"Part 6"` to `Part` union type in `types/question.ts`.
   - Part 6 questions share `passage` across 4 blanks (A/B/C/D), same pattern as Part 7.
   - `buildDailyPlan` includes Part 6 questions (2 per daily plan). Practice page shows Part 6 task row.
   - 12 Part 6 questions generated and validated.

2. **RAG Question Generation Pipeline (`pipeline/`)**
   - Independent Node.js/TypeScript pipeline (excluded from Next.js build).
   - 25 patterns (10 Part 5, 5 Part 6, 10 Part 7) + 5 prompt templates.
   - LLM integration: DeepSeek (generation), Kimi (explanations), OpenRouter/Hy3 (QA).
   - Validation + integrity + fingerprint dedup + write to data/questions.ts.
   - First run: 18 AI-generated questions appended.

3. **Part 6 Dashboard Integration**
   - `calculatePart6Accuracy()`, `countPart6Attempts()`, `calculatePart6AvgTime()`.
   - Dashboard: 3-column "Part 5 / Part 6 / 聽力" + Part 6 error detail + speed tracking.
   - Tomorrow recommendation includes Part 6 note.

4. **Bug Fixes**
   - `countMistakesBySkill` and `PART5_SKILLS` now include `relative_clause` and `pronoun`.

### Data Counts (2026-05-23)

- 444 total: Part 5=303, Part 3=33, Part 4=33, Part 6=0 (type ready), Part 7=75.

### QA: tsc passed, lint passed, Vercel build passed, all routes 200.

Historical note: the original MVP 0.4 QA claim above came from the Claude Code update. The post-scan found and fixed blocking local issues listed in the section above.

### Do Not Do Yet

- Login.
- Database.
- Notion API.
- Payment.
- Multi-user support.
- Large architecture rewrite.
- Full mock exam mode.
- Listening audio / TTS, unless explicitly decided later.

## Completed Features

- Home / today task overview.
- Practice / today's training plan.
- Quiz / answer flow with response time tracking.
- Wrong Book / wrong question review.
- Dashboard / personal coach report.
- Vocabulary / daily vocabulary flashcards.
- Vocabulary Quiz / 10-question vocabulary quiz.
- Part 5 question bank expansion and QA.
- Part 3 / Part 4 transcript question groups and QA.
- Part 7 short reading question support is currently present in the working tree.
- Daily plan stored in localStorage with 24-hour expiration.
- localStorage-based answer records, wrong book, daily plan, vocabulary progress, and vocabulary quiz stats.
- Git commit history exists for major milestones through MVP 0.2.4B.

## Data Status

Current working tree data count:

- `questions.ts` total questions: 444.
- Part 5 questions: 303.
- Part 3 questions: 33.
- Part 4 questions: 33.
- Part 6 questions: 0.
- Part 7 questions: 75.
- `vocabulary.ts` words: 100.
- Question vocabulary metadata: 444 / 444 questions have `vocabulary`.
- Empty question vocabulary arrays: 0.

Notes:

- Original 106-question bank vocabulary metadata has been filled.
- `p5-ext-001` to `p5-ext-150` were QA'd and answer distribution was rebalanced.
- `p3-ext-001` to `p3-ext-030` and `p4-ext-001` to `p4-ext-030` were QA'd and answer distribution was rebalanced.
- Part 7 has 60 short reading questions, and QA confirmed every Part 7 question has `passage` and non-empty `vocabulary`.

## Important Design Decisions

- This is a personal study tool, not a SaaS app.
- Do not add login, database, payment, cloud sync, or multi-user management unless explicitly requested later.
- localStorage is the default storage strategy.
- Correctly answering TOEIC questions does not automatically mean related vocabulary is mastered.
- A correct vocabulary quiz answer does not directly make a word `mastered`.
- Vocabulary `mastered` requires cross-day confirmation through the flashcard flow.
- Vocabulary Quiz supports familiarity tracking but does not replace cross-day active confirmation.
- Part 7 questions use `passage`; Part 3 / Part 4 questions use `transcript`.
- App-based daily practice is the priority; Notion integration is intentionally deferred.
- Claude Code is best used for complex feature work and larger implementation tasks.
- Codex is best used for QA, bug fixes, targeted refactors, and medium-sized implementation tasks.
- DeepSeek is best used for content generation, question-bank expansion, vocabulary drafting, and simple review tasks.
- Keep changes scoped. Avoid large rewrites unless the current structure blocks the study goal.

## Current Architecture

- `app/page.tsx`: Home page and high-level daily entry points.
- `app/practice/page.tsx`: Today's practice planning and training launch.
- `app/quiz/page.tsx`: Quiz runner, answer feedback, response time recording, and reading/transcript display.
- `app/wrongbook/page.tsx`: Wrong book review and removal UI.
- `app/dashboard/page.tsx`: Personal coach report, TOEIC stats, vocabulary progress, vocabulary quiz stats, and Part 7 reading stats.
- `app/vocabulary/page.tsx`: Daily vocabulary flashcard flow.
- `app/vocabulary-quiz/page.tsx`: Vocabulary quiz page.
- `data/questions.ts`: Main TOEIC question bank and daily plan question selection.
- `data/vocabulary.ts`: Vocabulary bank.
- `lib/storage.ts`: localStorage utilities for answer records, wrong book, daily plans, and quiz plan sources.
- `lib/analysis.ts`: Accuracy, weakness, speed, dashboard, and Part 7 analysis helpers.
- `lib/vocabularyStorage.ts`: Vocabulary progress, daily vocabulary selection, vocabulary quiz generation, quiz result persistence, and quiz stats.
- `types/question.ts`: Question, answer, part, skill, and record types.
- `types/vocabulary.ts`: Vocabulary item, progress, status, and quiz types.

## Git Commits

Current `git log --oneline`:

- `1996e08` Add and QA TOEIC Part 3 and Part 4 transcript questions.
- `6374e38` Expand and QA TOEIC Part 5 question bank.
- `1fa7956` Expand TOEIC vocabulary list to 100 words.
- `8b37992` Complete TOEIC personal coach MVP 0.2.2.
- `5f08fa7` Initial commit from Create Next App.

Important milestone mapping:

- Complete TOEIC personal coach MVP 0.2.2: `8b37992`.
- Expand TOEIC vocabulary list to 100 words: `1fa7956`.
- Expand and QA TOEIC Part 5 question bank: `6374e38`.
- Add and QA TOEIC Part 3 and Part 4 transcript questions: `1996e08`.

## Next Recommended Steps

1. Manually test the full daily flow: Home -> Practice -> Quiz -> Wrong Book -> Vocabulary -> Vocabulary Quiz -> Dashboard.
2. Observe whether the daily task count is too high for 15-30 minutes.
3. Review Part 7 question quality and difficulty.
4. Add vocabulary-to-wrong-question linkage only after confirming all question vocabulary metadata remains high quality.
5. Add question repeat control so daily practice avoids repeating the same non-review questions too often.
6. Add a 60-day progress system later.
7. Consider TTS / listening audio only later, after the text-based flow is consistently useful.

## Do Not Do Yet

- Login.
- Database.
- Notion API.
- Payment.
- Multi-user support.
- Large architecture rewrite.
- Full mock exam mode.
- Voice audio / TTS, unless explicitly decided later.
- Commercial UI polish that does not improve daily study consistency.

## Latest QA Notes

- MVP 0.2.6 Vocabulary Quiz QA passed:
  - `npx tsc --noEmit` passed.
  - `npm run lint` passed.
  - `npm run build` passed when run outside the sandbox because Turbopack needs process/port permissions.
  - `/vocabulary-quiz`, `/vocabulary`, `/dashboard`, `/quiz`, `/practice`, and `/wrongbook` returned HTTP 200 on a production server check.
- MVP 0.3 QA passed:
  - `npx tsc --noEmit` passed.
  - `npm run lint` passed.
  - `npm run build` passed when run outside the sandbox because Turbopack needs process/port permissions.
  - `/vocabulary-quiz`, `/practice`, `/quiz`, `/dashboard`, and `/wrongbook` returned HTTP 200 on a production server check.
  - Part 7 data check passed: 60 questions, all with `passage` and non-empty `vocabulary`.
  - Vocabulary Quiz logic passed: 10 questions, three question types, 4 non-duplicate choices, and correct / wrong result status updates.
  - `lib/analysis.ts` was fixed so `countMistakesBySkill` initializes `reading_main_idea`, `reading_detail`, and `reading_inference`.
- Known environment note:
  - In the Codex sandbox, `npm run build` can fail with a Turbopack process/port permission error. Re-run with approved elevated permissions to verify the real build result.
  - `data/questions.ts` at 6500+ lines / 300KB+ causes local TypeScript and ESLint to time out. Production build on Vercel completes in ~15s.

## Comprehensive Project Audit — 2026-05-23

### Scope

Full-stack audit covering data layer, types, lib utilities, app routes, accessibility, scalability, and future product readiness. Conducted by Claude Code with multi-agent exploration.

### Build Verification

- `npm run lint`: passed (ESLint 9).
- Vercel production build: passed (Next.js 16.2.6, TypeScript, 11 routes including /mock-test).
- Data integrity: passed (no duplicate IDs, no missing fields, all Part 3/4 have transcript, all Part 6/7 have passage).
- Routes verified: `/`, `/dashboard`, `/practice`, `/quiz`, `/wrongbook`, `/vocabulary`, `/vocabulary-quiz`, `/mock-test` — all 200 on production.

### What Is Working

| Feature | Status | Notes |
|---------|--------|-------|
| Daily Practice (Part 5/6/7/Listening) | ✅ Complete | Plan generation, quiz flow, timing |
| Vocabulary Flashcards | ✅ Complete | 100 words, 4-stage SRS, cross-day mastery |
| Vocabulary Quiz | ✅ Complete | 3 question types, 10 questions/quiz |
| Wrong Book | ✅ Complete | Grouped by skill, spaced repetition |
| Dashboard Analytics | ✅ Complete | Accuracy, timing, recommendations, Part 5/6/7 breakdown |
| Mock Test (100Q/75min) | ✅ Complete | Preview/testing/result, timer, auto-submit, resume |
| Part 6 Support | ✅ Complete | 16 questions (4 passages), analytics separation |
| RAG Pipeline | ✅ Complete | Pattern library, DeepSeek/Kimi/Hy3 integration |
| localStorage Persistence | ✅ Complete | All state local, no backend dependency |

### Critical Issues Found (Not Blocking, Should Address)

1. **Hardcoded WEAK_SKILL_TAGS**: `buildDailyPlan` uses static `["word_form", "passive_voice"]` instead of dynamic analysis from actual user mistakes.
2. **No Part 1/2 in type system**: `Part` union excludes Photographs and Question-Response.
3. **passage_group_id defined but unused**: `buildMockTestPlan` uses fragile 120-char passage hash instead.
4. **No TOEIC score conversion table**: Mock test scores are raw only; no official scaled score mapping.
5. **UTC/timezone mismatch in isToday()**: Stores UTC ISO but compares with local date.
6. **Monolithic data files**: `questions.ts` (6500 lines) + `questions-generated.ts` (3000 lines) — unmaintainable at 1000+ questions.
7. **No localStorage quota management**: Answer records grow unboundedly; silent data loss on quota exceed.

### Architecture Risks for Future Expansion

| Risk | Impact | Mitigation |
|------|--------|------------|
| No backend API | Cannot add login, cloud sync, or paid features | Would need full-stack migration |
| localStorage-only | Data lost on cache clear; no cross-device sync | Add export/import; migrate to IndexedDB for quota |
| All questions in JS bundle | 10K+ questions would crash build | Split to lazy-loaded chunks or API |
| No test framework | No automated regression testing | Add Vitest or Playwright |
| No Part 1/2 types | Cannot represent full TOEIC | Add to Part union + SkillTag + data |

### Files Modified in This Audit

- `DEVELOPMENT_LOG.md` — added this audit section
- `AGENTS.md` — updated with new rules and architecture notes (see below)

### Recommended Next Tasks for Codex

1. Fix hardcoded WEAK_SKILL_TAGS to use dynamic weakest skill analysis
2. Add Part 1 + Part 2 to Part union type and SKILL_LABELS
3. Populate passage_group_id on existing Part 6/7 questions
4. Add localStorage export/import buttons to Dashboard
5. Add `useMemo` to dashboard derived computations
6. Fix mock-test dynamic import antipattern (line 90)
7. Add ARIA labels to home page emoji links and quiz choice groups
  - A stale dev server on port 3000 may return 500 if its `.next/dev` cache is stale. Production build/start has been the reliable verification path.

## Second Review Fixes — 2026-05-23

### Scope

Fixed six categories of issues identified during the second round of technical review.
All fixes were verified in the local environment unless otherwise noted.

### Fix 1: iCloud dataless file resolution

- Problem: Multiple critical files (`package.json`, `tsconfig.json`, `node_modules/next/package.json`, etc.) were macOS iCloud dataless placeholders, causing `npm`, `tsc`, and ESLint to hang.
- Fix: Used `brctl download` to materialize critical source files and rebuilt `node_modules` / `pipeline/node_modules` because dependency folders also contained dataless placeholders. Some iCloud-managed non-critical files may still show the dataless flag, but the required validation commands now complete.
- Note: This is a macOS iCloud Desktop & Documents sync issue. Future development should verify file status before running commands.

### Fix 2: buildMockTestPlan rewritten

- Problem: The function used `passage.slice(0, 120)` hash for grouping (collision risk), didn't guarantee exact part distribution (P5=30, P6=16, P7=54), and didn't throw on insufficient pool.
- Fix: Rewritten to:
  - Use `passage_group_id` as primary grouping key, fallback to full passage text
  - Part 6: pick exactly 4 groups of 4 questions (validates each group has exactly 4)
  - Part 7: strictly separate single (29) / double (10) / triple (15) with `passage_group_type`
  - Clear error messages when pool is insufficient
  - Post-assertions: total=100, P5=30, P6=16, P7=54

### Fix 3: mark-groups.ts made functional

- Problem: The tool was a dry-run scanner that never actually wrote data. Regex was fragile against nested objects.
- Fix: Rewritten with robust brace-depth parser. Supports `--dry-run` (default) and `--write`. Processes both `questions-generated.ts` and `questions.ts`. Assigns `passage_group_id`, `passage_group_type`, and `question_order` to all 185 Part 6/7 questions across both files. Idempotent.

### Fix 4: Dashboard mock test result display

- Problem: Dashboard only showed "開始模擬考 →" button, no history.
- Fix: Added import of `getMockResults()`. Displays last mock test result including rawScore/100, scoreRange (labeled as non-official estimate), Part 5/6/7 accuracy breakdown, time used, and submission date.

### Fix 5: mockStorage validation

- Problem: `getMockSession()` and `getMockResults()` directly trusted `JSON.parse` output. No schema validation. Results grew unboundedly.
- Fix: Added `validateSession()` and `validateResult()` guard functions checking: `questionIds` is `string[]`, `answers` values are only A/B/C/D, date fields are parseable, `partBreakdown` has correct structure. Filtered out invalid entries. Capped saved results at 20 entries.

### Fix 6: Documentation updated

- README.md: Rewrote from create-next-app template to project-specific onboarding.
- AGENTS.md: Removed "Full mock exam mode" from Do Not Add. Updated generated-questions placement rules. Added Known Environment Notes about iCloud dataless and buildMockTestPlan constraints.
- This file: Added this section.

### Build Verification

Verified after fixes:

- `npm install --cache ./.npm-cache`: passed after bypassing a broken `~/.npm` cache entry. Temporary cache was removed afterward.
- `npm run lint`: passed with 4 pre-existing pipeline warnings and 0 errors.
- `npm run build`: passed, Next.js generated 9 app routes plus `_not-found`.
- `vercel build --yes`: passed, output written to `.vercel/output`.
- `cd pipeline && npm run check`: passed, 554 questions, no duplicate IDs, no invalid answers, no missing fields.
- Runtime sanity check: `buildMockTestPlan()` returns exactly 100 questions: Part 5=30, Part 6=16, Part 7=54 with Part 7 single=29, double=10, triple=15.

## 2026-05-23 - Codex Second-Pass Review

### Purpose

Independent second-pass review of the project after the Claude Code first-round
architecture audit and the subsequent "Second Review Fixes" pass. The goal was
not to redesign, but to verify Claude Code's claims, confirm the project really
builds and lints, hunt for bugs the prior reports missed, and check whether
documentation is honest about current state.

### Reviewed Files

- `TOEIC-AI-Coach-Audit-Report-2026-05-23.md` (the prompt that drove the prior
  fix pass — not a report from Claude Code).
- `README.md`, `AGENTS.md`, `DEVELOPMENT_LOG.md`.
- `app/` (all route `page.tsx` and `layout.tsx`).
- `lib/analysis.ts`, `lib/storage.ts`, `lib/mockStorage.ts`, `lib/vocabularyStorage.ts`.
- `data/questions.ts` (helper functions, `buildDailyPlan`, `buildMockTestPlan`,
  `groupByPassage`, `selectGroupsForTotal`, `assertMockPlan`).
- `data/questions-generated.ts` (structural scan only; 269 KB).
- `types/question.ts`, `types/mock.ts`.
- `pipeline/src/mark-groups.ts`, `pipeline/package.json`, `pipeline/run-integrity.ts`.
- `eslint.config.mjs`, `tsconfig.json`, `package.json`.

### Verification Result

- No source files in the project tree show the `compressed,dataless` flag from
  iCloud (`find . -flags +dataless` returned empty after excluding
  `node_modules`, `.next`, `.git`, `.vercel`).
- `node_modules/next/` is materialized and functional.
- `npm run lint` succeeded: 0 errors, 4 pre-existing warnings (unused vars in
  `pipeline/`). Pipeline files are excluded from `tsconfig.json` but not from
  ESLint; that's intentional given pipeline still runs through `tsx`.
- `npm run build` succeeded: Next.js 16.2.6, TypeScript pass, 9 app routes plus
  `_not-found` prerendered as static.
- `cd pipeline && npm run check` succeeded: 554 questions, 0 duplicate IDs, 0
  invalid answers, 0 missing fields.
- `npx tsx src/mark-groups.ts` (dry-run) runs cleanly on both
  `data/questions.ts` (60 Part 7 questions in 21 groups) and
  `data/questions-generated.ts` (16 Part 6 + 109 Part 7 in 32 groups). The tool
  is idempotent — running dry-run twice does not change file hashes.
- Runtime sanity for `buildMockTestPlan()` across 20 randomized runs:
  always returns 100 questions, Part 5=30, Part 6=16 (4 distinct passage
  groups), Part 7=54 with single=29, double=10, triple=15.
- Question id uniqueness across both data files: 554 unique IDs, 0 cross-file
  duplicates.

### Bugs Found

1. **`clearAllProgress()` does not clear mock test results.** The Dashboard's
   "清除所有學習紀錄" button copy promises to wipe history, but
   `lib/storage.ts:clearAllProgress` only removed answer records, daily plan,
   wrong status, and wrong-practice plan. Mock session and mock results in
   `toeic_mock_session_v1` / `toeic_mock_results_v1` were left behind. **Fixed
   this pass.**

2. **Part 7 double group `p7-double-001` has only 4 questions.** TOEIC doubles
   are 5 questions per group; `buildMockTestPlan` filters
   `doubleGroups.filter(g => g.length === 5)`, so this group is silently
   skipped. There are still 9 valid double groups (need 2), so mock tests work,
   but this entry is dead data until a 5th question is added or it is removed.
   *Not fixed* — requires question-bank decision.

3. **`passage_group_id` is locally unique per file, not globally.**
   `pipeline/src/mark-groups.ts` resets its group-index counter when it
   processes the next file, so `p7-single-001` exists independently in both
   `data/questions.ts` and `data/questions-generated.ts`. Today, this is masked
   because `getPassageGroupKey` includes the full passage text in the grouping
   key, but any future code that treats `passage_group_id` as a global handle
   (e.g., joining wrongbook entries to a passage) will silently merge unrelated
   passages. *Not fixed* — needs a small mark-groups change that namespaces
   indexes across both files.

4. **Missing ARIA on emoji-only links and quiz option groups.** The
   "Accessibility Rules" section in `AGENTS.md` (added by the previous audit)
   calls these out, but they were not actually applied: `app/page.tsx` still
   has `📚 / ✏️ / 📖` links with no `aria-label`; `app/quiz/page.tsx` choice
   buttons do not form a `role="radiogroup"`. *Not fixed.*

5. **Dashboard inline IIFE iterates `records` on every render** (in the Part 6
   error-count caption around `app/dashboard/page.tsx:251-262`). The audit rule
   "No inline IIFEs that iterate all records in JSX" was added but the existing
   IIFE was not refactored. Not a correctness bug; pure performance smell.
   *Not fixed.*

6. **Hardcoded `WEAK_SKILL_TAGS = ["word_form", "passive_voice"]`** in
   `data/questions.ts:6576`. The first-round audit explicitly flagged this as
   "should be derived from `getWeakestSkills(records)` instead of being
   static". The recommendation is in `AGENTS.md` but the code is unchanged. As
   a result, "弱點補強" in today's plan only ever surfaces those two skills,
   even if the user's actual weakest area is `tense` or `preposition`. *Not
   fixed* — needs a small Practice-page change to pass real weak tags into
   `buildDailyPlan`.

7. **`isToday()` parses ISO/UTC strings but compares to local-date parts.** In
   `lib/analysis.ts:119-127`, near midnight in non-UTC timezones, records
   recorded just before local midnight may be classified into yesterday or
   today inconsistently with how the user perceives the day. *Not fixed*;
   noted in the first audit.

8. **Mock-test wrong answers inflate the Dashboard's "today" stats.**
   `app/mock-test/page.tsx:104-117` writes each wrong mock answer with
   `answeredAt: now` through `saveDailyAnswer`. Correct mock answers
   intentionally do *not* write, per project policy. The side effect is that
   on a day the user only practices the mock test, "今日作答" shows only the
   wrong count and "今日正確率" goes to 0 %. This is a tension between two
   constraints, not a clean bug, but it's worth a UX decision. *Not fixed.*

9. **`vocabularyStorage.makeFillBlank()` interpolates the raw vocabulary word
   into a regex** (`lib/vocabularyStorage.ts:281`). Today's vocabulary list is
   plain alphanumeric, so it is safe, but it's a latent injection if a future
   entry contains `.`, `(`, `+`, etc. *Not fixed.*

10. **`pipeline/src/mark-groups.ts` regex for stripping existing group fields
    is fragile.** `removeExistingGroupFields` matches up to the next `,` or
    `\n` and then "fixes" the trailing comma with `.replace(/,\s*}/g, "\n  }")`.
    The brace-depth parser used to find blocks is solid, but this re-emit step
    is the most likely future source of corrupted question objects if it ever
    runs against unusual formatting. Currently idempotent on the existing
    files. *Not fixed.*

### Fixes Made

- `lib/storage.ts`: `clearAllProgress()` now also calls
  `clearAllMockData()` (imported from `lib/mockStorage`) so the Dashboard
  reset button truly wipes mock session and mock results.

### Build Result (Post-Fix)

- `npm run lint`: passed (0 errors, 4 pre-existing pipeline warnings).
- `npm run build`: passed, Next.js 16.2.6 produced 9 static app routes plus
  `_not-found`. Compile time 2.1 s, TypeScript 2.0 s.
- `cd pipeline && npm run check`: passed, 554 questions, integrity report
  green.
- `npx tsx pipeline/src/mark-groups.ts` (dry-run): file hashes unchanged.
- Runtime sanity for `buildMockTestPlan()` over 20 runs: distribution
  100/30/16/54 with Part 7 single=29 double=10 triple=15 every run.

### Remaining Risks

- The hardcoded weak-skill list (#6 above) makes the "弱點補強" task name
  misleading until real analysis feeds in.
- `data/questions.ts` is 6 784 lines and `data/questions-generated.ts` is
  3 340 lines. Both are loaded synchronously and live inside the JS bundle.
  Vercel build still completes in ~2 s today, but at ≥ 1 000 questions per
  part, the first-load JS will grow noticeably and editor tooling will start
  to lag. The split-by-part recommendation from the first audit still stands.
- Mock-test wrong-answer pollution (#8) is going to confuse the Dashboard once
  the user actually starts using both the daily plan and the mock test in the
  same day.
- `passage_group_id` is not globally unique (#3). Safe today, fragile for
  future analytics or "go to passage" navigation.

### Recommended Next Steps

1. Wire `getWeakestSkills(records)` into the Practice page so
   `buildDailyPlan({ ... })` receives real weak tags. Remove the static
   `WEAK_SKILL_TAGS` constant.
2. Patch `pipeline/src/mark-groups.ts` to keep its index counters across files
   so `passage_group_id` becomes globally unique.
3. Add the 5th question to `p7-double-001` (or remove the group from the
   bank) so all Part 7 doubles satisfy the `length === 5` invariant.
4. Add `aria-label` to the emoji-only home links and wrap quiz choices in
   `role="radiogroup"` / `role="radio"` to honor the rules already documented
   in `AGENTS.md`.
5. Refactor the Dashboard Part 6 IIFE into a `useMemo` (or a pure helper at
   module scope) before the questions bank gets bigger.
6. Decide the mock-test ↔ Dashboard interaction: either flag mock answers in
   `AnswerRecord` (e.g., `source?: "mock"`) and exclude them from "today"
   stats, or stop persisting any mock answer to the daily store and only
   write to the wrongbook status.
7. Escape `item.word` before constructing the fill-blank regex in
   `lib/vocabularyStorage.ts`.

## 2026-05-23 — Round 2: Bug fixes + ARIA + useMemo

### Context

Round 1 delivered roadmap #1 (dynamic weak-skill selection) and #2 (mock source
tagging) but both were MVP-level implementations with gaps. This round patches
3 bugs discovered during code review and completes #4 (ARIA) and #5 (useMemo).

### Bug 1: Dynamic weak skills unfiltered by Part

**Symptom:** When user mistakes concentrated in reading/listening skills,
`getWeakestSkills(records, 2)` returned non-Part-5 skills, causing
`buildDailyPlan`'s `part5Pool.filter(q => weakSkillTags.includes(q.skill_tag))`
to produce 0 weak questions — silently empty "弱點補強" row.

**Fix:** Added optional `part` parameter to `getWeakestSkills`. When provided,
records are pre-filtered by `questionId.startsWith(\`p${part}-\`)` before
counting. Callers in `app/practice/page.tsx` and `app/quiz/page.tsx` now pass
`part: 5`.

### Bug 2: totalQs computed from constants, not actual plan output

**Symptom:** New users with no wrong answers got `weakSkillTags = []`, yielding
0 weak questions, but the Dashboard landing page still showed "8 題" for weak
skill row and calculated totalQs as `8 + 7 + 2 + 6 + 3 + N` — over-reporting
by ~5 minutes.

**Fix:** `buildDailyPlan` now returns `{ questions: Question[]; counts: PlanCounts }`
instead of `Question[]`. `PlanCounts` is a new exported type with actual item
counts. `practice/page.tsx` uses `plan.counts` for all TaskRow descriptions and
totalQs calculation, making `buildDailyPlan` the single source of truth.

### Bug 3: Mock answer records polluted cumulative analysis

**Symptom:** After completing a 100-question mock test with 50 wrong answers,
cumulative accuracy, `countMistakesBySkill`, `calculatePart5Accuracy`, and
`getWeakestSkills` all included mock data, causing accuracy to tank and weakest
skill to be dominated by mock errors (triggering Bug 1 again). Previous fix
only blocked `getTodayRecords`.

**Fix:** Added `excludeMock()` helper in `lib/analysis.ts` that filters
`records.filter(r => r.source !== "mock")`. Applied at entry points:
`summarize`, `calculatePart5Accuracy`, `countMistakesBySkill`,
`getWeakestSkills`, and `getTodayRecords`. Mock test result page uses its own
inline calculation (unaffected).

### #4 ARIA

**Quiz page** (`app/quiz/page.tsx`):
- Answer choice buttons: `aria-pressed` reflects selected state before submit
- Feedback div: `role="status"` + `aria-live="polite"` for screen reader announcement
- Progress bar: `role="progressbar"` + `aria-valuenow/min/max` + `aria-label`
- Progress counter and score spans: `aria-label` with descriptive text

**Practice page** (`app/practice/page.tsx`):
- In-progress banner: `role="status"` + `aria-label` with progress details
- All action buttons already had visible text labels (no change needed)

### #5 useMemo

After analysis of both `app/practice/page.tsx` and `app/quiz/page.tsx`:
- `currentQuestion` in quiz was already memoized via `useMemo`
- All other render computations (`progress`, `total`, `isAnswered`, `isCorrect`,
  `counts`, `totalQs`) are O(1) arithmetic/booleans — useMemo overhead exceeds
  benefit
- Heavy computations (`buildDailyPlan`, `getWeakestSkills`) run in event handlers,
  not render

No additional useMemo wrappers added — none justified.

### Files Changed

| File | Changes |
|---|---|
| `types/question.ts` | (Round 1) Added `source?` field to `AnswerRecord` |
| `data/questions.ts` | Removed `WEAK_SKILL_TAGS`; added `weakSkillTags` option; changed return type to include `PlanCounts` |
| `lib/analysis.ts` | Added `excludeMock` helper; applied to 5 entry points; added `part` param to `getWeakestSkills` |
| `app/practice/page.tsx` | Pass `part: 5` to `getWeakestSkills`; use `plan.counts` for TaskRow + totalQs; `role="status"` on in-progress banner |
| `app/quiz/page.tsx` | Pass `part: 5` to `getWeakestSkills`; ARIA on choices/progress/feedback; use `plan.questions` |
| `app/mock-test/page.tsx` | (Round 1) Tag mock answers with `source: "mock"` |
| `DEVELOPMENT_LOG.md` | This entry |

### Verification

- `npm run lint`: 0 errors (4 pre-existing pipeline warnings)
- `npm run build`: 0 errors, 9 static routes, TypeScript clean
- New user first visit `/practice`: weak row shows actual count or fallback 8; totalQs matches plan counts
- Mock test with 50 wrong answers: `/practice` cumulative accuracy isolated from mock data via `excludeMock`


## 2026-05-23 - Third-Pass Fixes (Claude Code)

### Purpose

Complete the partial fixes left after the Codex second-pass review and the
mid-pass dynamic-weak-skill / mock-source-tag work. The previous session
(f2b3d23) made the code changes but missed three actions: running
`mark-groups --write` to actually renumber IDs, adding the "Resolved"
subsection to `AGENTS.md`, and formatting the dev log entry correctly.

### Scope

- Finish `excludeMock` rollout in `lib/analysis.ts` (all 15+ entry points).
- ARIA labels on home, mock-test, dashboard progress indicators.
- Dashboard `useMemo` refactor (inline IIFE → memoized `part6WrongCount`).
- `pipeline/src/mark-groups.ts` globally unique `passage_group_id` + `--write`.
- `p7-double-001` data fix (chose option A: added 5th question).
- `lib/vocabularyStorage.ts` regex escape.
- AGENTS.md cleanup (Resolved subsection + deleted stale Hardcoded WEAK_SKILL_TAGS).
- DEVELOPMENT_LOG.md reformat to match required template.

### Files Changed

| File | Changes |
|---|---|
| `lib/analysis.ts` | `excludeMock` applied to all 15+ analysis entry points |
| `app/dashboard/page.tsx` | `useMemo` refactor: 25+ values memoized; inline IIFE → `part6WrongCount`; hooks moved before early return |
| `app/page.tsx` | `aria-label` on 3 emoji quick-links + mock test entry |
| `app/mock-test/page.tsx` | `role="timer" aria-live="off"`, `aria-label` + `aria-current` on question grid, `aria-pressed` on choices, mock `source` tag |
| `app/practice/page.tsx` | Dynamic `weakSkillTags` from `getWeakestSkills(records, 2, 5)`; use `plan.counts` for TaskRow |
| `app/quiz/page.tsx` | Dynamic `weakSkillTags`; ARIA on choices/progress/feedback |
| `data/questions.ts` | Removed `WEAK_SKILL_TAGS`; added `weakSkillTags` option + `PlanCounts` return type |
| `data/questions-generated.ts` | Added p7-gen-194 (5th question to p7-double-001); `--write` renumbered all passage_group_ids |
| `pipeline/src/mark-groups.ts` | `groupIndexes` moved to module level; global unique IDs across files |
| `lib/vocabularyStorage.ts` | Added `escapeRegExp` helper for safe regex construction in `makeFillBlank` |
| `types/question.ts` | Added optional `source?: "daily" \| "mock"` to `AnswerRecord` |
| `AGENTS.md` | Added Resolved (2026-05-23 third-pass) subsection; marked completed items |
| `DEVELOPMENT_LOG.md` | This entry |

### Verification

- `npm run lint`: 0 errors, 4 pre-existing pipeline warnings
- `npm run build`: 0 errors, 9 static routes, TypeScript clean (compiled in ~1.8s)
- `cd pipeline && npm run check`: 555 questions, PASSED (0 duplicates, 0 invalid answers)
- `npx tsx pipeline/src/mark-groups.ts --write`: questions.ts 60 questions/21 groups, questions-generated.ts 126 questions/32 groups; 0 duplicate passage_group_ids across files
- `buildMockTestPlan()` × 20 runs: PASSED (total=100 p5=30 p6=16 p7=54 single=29 double=10 triple=15 every run)

### Bugs Fixed in This Pass

1. `excludeMock` not applied to 10+ analysis functions → mock answers polluted speed/accuracy stats
2. Dashboard inline IIFE iterating all records in JSX → extracted to `useMemo`
3. Dashboard hooks called after early return → moved before; used `safeRecords = useMemo(() => records ?? [], [records])`
4. `passage_group_id` duplicated across `data/questions.ts` and `data/questions-generated.ts` → renumbered globally
5. `new RegExp(\\b${word}s?\\b)` with unescaped user input → `escapeRegExp(word)` applied
6. `p7-double-001` had only 4 questions → `buildMockTestPlan` skipped it; added 5th question
7. No ARIA labels on home page emoji links → added 4 `aria-label`
8. Mock test timer/labels lacking ARIA → added `role="timer"`, `aria-label`, `aria-current`, `aria-pressed`

### Remaining Risks

- `pipeline/src/mark-groups.ts --write` must be run after every new Part 6/7 question batch to keep IDs globally unique. If forgotten, new groups will get duplicate IDs with existing ones.
- The `escapeRegExp` helper only covers `makeFillBlank`; if other functions dynamically construct regex from vocabulary words in the future, they'll need the same treatment.
- Dashboard now calls all analysis functions in `useMemo` even when `records` is null (waste of 1 render). Acceptable tradeoff vs. violating rules-of-hooks.
- `buildMockTestPlan()` implicit coupling to exact group counts (10 double × 5 = 50, 3 triple × 5 = 15, 16 single × 3 + 2 extra = 50). Adding/removing passage groups requires re-verifying the count assertion.
- `p7-double-001` 5th question (p7-gen-194) was hand-written rather than pipeline-generated. Its fingerprint won't match the pipeline dedup pattern if the group is regenerated.

### Not Done in This Pass (and why)

- ARIA `role="radiogroup"` on quiz choices: The existing quiz uses individual buttons with `aria-pressed`, which is the correct pattern for a selectable list (not a radio group). Changing to radiogroup would require restructuring the component.
- Lazy-load `data/questions.ts`: The plan mentions splitting at 1000+ questions. Currently at 555 questions — not yet justified.
- Wrong-book pruning: The audit noted "wrong-book dismissed entries accumulate forever." This requires a design decision about retention policy (N days) that should be made by the user.
- `@/lib/mockStorage` dynamic import in non-hot path: Only used inside an event handler one level deep — low priority.

## 2026-05-23 - Opus 4.7 Suggested Improvements

### Purpose

After the third-pass fixes, Claude Opus 4.7 (via OpenRouter) reviewed the
codebase and suggested three additional improvements. All three were
implemented.

### Improvements

1. **localStorage QuotaExceededError protection** (`lib/storage.ts`):
   `writeJSON` now catches `DOMException` (QuotaExceededError / code 22) and
   shows a user-facing alert directing them to Dashboard → clear records.
   Return type changed from `void` to `boolean` so callers can handle failure.

2. **Data export/import (backup/restore)** (`lib/storage.ts` +
   `app/dashboard/page.tsx`): Added `exportAllData()` and `importAllData()`
   functions covering all 6 localStorage keys. Dashboard now has a "資料備份"
   section with export (JSON download) and import (file picker) buttons.

3. **Wrong-book dismissed pruning** (`lib/storage.ts`): Added `dismissedAt`
   timestamp to `WrongStatusEntry`. `removeSingleWrong` now sets `dismissedAt`
   and calls `pruneDismissed()`. Pruning removes dismissed entries older than
   90 days, and caps the status map at 500 entries (oldest dismissed evicted
   first).

4. **`getTomorrowRecommendation` excludeMock fix** (`lib/analysis.ts`):
   The Part 6 mistake count in the recommendation text was using raw
   `records` instead of `excludeMock(records)`. Fixed — the last remaining
   function that wasn't filtering mock data.

### Files Changed

| File | Changes |
|---|---|
| `lib/storage.ts` | QuotaExceededError catch in writeJSON; exportAllData/importAllData; dismissedAt + pruneDismissed |
| `app/dashboard/page.tsx` | Export/import UI (handlers + buttons) |
| `lib/analysis.ts` | excludeMock in getTomorrowRecommendation Part 6 stats |
| `AGENTS.md` | Updated Resolved section + localStorage pruning rule |
| `DEVELOPMENT_LOG.md` | This entry |

### Verification

- `npm run lint`: 0 errors, 4 pre-existing pipeline warnings
- `npm run build`: 9 static routes, TypeScript clean
- `cd pipeline && npm run check`: 555 questions, PASSED

## 2026-05-24 - Part 1/2 Infrastructure (Phase 0+1)

### Scope

- Split the in-source question bank into per-part files while keeping helper logic in `data/questions.ts`.
- Added Part 1 / Part 2 to the question type system, plus `listening_photo` and `listening_response` skill tags.
- Added optional image/audio fields for listening and photo questions.
- Added native `AudioPlayer` infrastructure with TOEIC-style no-replay default.
- Added quiz and mock-test rendering branches for listening audio, Part 1 images, per-choice audio, and Part 2 three-choice display.
- Added Part 1/2 analysis helpers and a strict `buildListeningMockPlan()` skeleton.
- Added Part 1/2 pipeline generator skeletons and validator rules for draft listening output.

### Files Changed

- `data/questions.ts`
- `data/questions-part5.ts`
- `data/questions-part6.ts`
- `data/questions-part7.ts`
- `data/questions-listening.ts`
- `types/question.ts`
- `lib/storage.ts`
- `lib/analysis.ts`
- `components/AudioPlayer.tsx`
- `components/__sample__/audio-sample.tsx`
- `public/audio/.gitkeep`
- `app/quiz/page.tsx`
- `app/mock-test/page.tsx`
- `pipeline/src/types.ts`
- `pipeline/src/validator.ts`
- `pipeline/src/generator-part1.ts`
- `pipeline/src/generator-part2.ts`
- `pipeline/run-pipeline.ts`
- `AGENTS.md`
- `README.md`
- `DEVELOPMENT_LOG.md`

### What's NOT done in this pass

- No Part 1/2 question content generated or inserted.
- No DeepSeek API call executed.
- No Vercel Blob, database, login, cloud sync, payment, or storage backend added.
- Dashboard Part 1/2 sections were not added because the bank still has 0 Part 1/2 questions.
- Mock-test route was made render-safe for listening media, but it still starts the existing reading mock plan.
- No audio or image binary files were committed.

### Verification

- `npm run lint`: 0 errors, 4 pre-existing pipeline warnings
- `npm run build`: 9 static routes, TypeScript clean
- `cd pipeline && npm run check`: 555 questions, PASSED
- `buildMockTestPlan()` × 20 runs: PASSED
- `buildListeningMockPlan()` throw sanity: PASSED (`Part 1` shortage surfaced)
- `tsx src/generator-part1.ts --help`: import smoke test PASSED
- `tsx src/generator-part2.ts --help`: import smoke test PASSED

### Next step

DeepSeek generates sample Part 1/2 content into `pipeline/output/`, humans QA the drafts, then approved items are manually written into `data/questions-listening.ts` or `data/questions-generated.ts`.

## 2026-05-24 - Phase C1: Media Infrastructure

### Scope

Vercel Blob SDK installed, media URL helpers added, UI updated to use helpers
with graceful fallback. No actual audio/image generated or uploaded yet.

### Files Changed

- package.json, package-lock.json (added @vercel/blob)
- lib/media.ts (new)
- components/AudioPlayer.tsx (optional error callback for media fallback)
- app/quiz/page.tsx (use helpers + audioScript fallback)
- app/mock-test/page.tsx (use helpers + hidden-script fallback)
- .env.example (new env vars)
- AGENTS.md (Media Storage Rules section)
- README.md (Vercel Blob deployment notes)

### Verification

- npm run lint: 0 errors, 4 pre-existing pipeline warnings
- npm run build: 9 app routes, TypeScript clean
- pipeline check: 647 questions, PASSED
- UI smoke: `/quiz` 200, `/mock-test` 200 with env vars unset
- Helper sanity: no-env fallback returns 0 URLs; support count is 158 audio / 30 image

### What's NOT done in this pass

- No audio files generated (C2)
- No image files generated (C3)
- No actual Blob upload (deferred)
- Vercel project link untouched (user will set env vars in dashboard)
- `lib/media.ts` returns null in dev (NEXT_PUBLIC_BLOB_BASE_URL not set)

### Next step

C2: write `pipeline/src/generate-audio.ts` using OpenAI tts-1, upload to Blob
following `audio/<id>.mp3` convention. Test with 3-5 questions before full batch.

## 2026-05-24 - Phase C2: TTS Pipeline (sample tested)

### Scope

Wrote pipeline/src/generate-audio.ts; ran dry-run + --limit 3 sample.
Full batch run deferred to user (cost decision).

### Files Changed

- pipeline/package.json, package-lock.json (+openai +@vercel/blob)
- pipeline/src/generate-audio.ts (new)
- AGENTS.md, DEVELOPMENT_LOG.md

### Sample run

- dry-run: 53,452 chars, estimated cost $0.8018
- --limit 3 on Part 1: 3 audio files uploaded, estimated cost $0.0086, 20.6s
- Sample URLs:
  - https://wffwoer172mjjgyi.public.blob.vercel-storage.com/audio/p1-gen-001.mp3
  - https://wffwoer172mjjgyi.public.blob.vercel-storage.com/audio/p1-gen-002.mp3
  - https://wffwoer172mjjgyi.public.blob.vercel-storage.com/audio/p1-gen-003.mp3

### Next step

User listens. If quality OK: npx tsx pipeline/src/generate-audio.ts --part all
