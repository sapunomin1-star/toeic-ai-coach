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

- `questions.ts` total questions: 426.
- Part 5 questions: 300.
- Part 3 questions: 33.
- Part 4 questions: 33.
- Part 7 questions: 60.
- `vocabulary.ts` words: 100.
- Question vocabulary metadata: 426 / 426 questions have `vocabulary`.
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
  - A stale dev server on port 3000 may return 500 if its `.next/dev` cache is stale. Production build/start has been the reliable verification path.
