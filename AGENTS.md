# AGENTS.md

## Project Overview

TOEIC AI Coach is a personal study app for steadily improving TOEIC performance
with daily 15-30 minute practice. It is a local-first Next.js app, not a
commercial SaaS product. Do not hard-code a final target score; the user may
raise the target over time.

The app currently focuses on:

- Daily task overview and practice planning.
- TOEIC Part 5 grammar and vocabulary questions.
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
- Full mock exam mode.
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
- `app/dashboard/page.tsx`: study analytics, recommendations, vocabulary progress, and reading/listening/Part 5 breakdowns.
- `app/vocabulary/page.tsx`: daily vocabulary flashcard flow.
- `app/vocabulary-quiz/page.tsx`: vocabulary quiz UI and result persistence.
- `data/questions.ts`: TOEIC question bank plus question selection helpers.
- `data/vocabulary.ts`: TOEIC vocabulary bank.
- `lib/storage.ts`: answer records, wrong-book status, daily plans, wrong-practice plans.
- `lib/analysis.ts`: accuracy, mistake, timing, recommendation, Part 5/listening/reading analytics.
- `lib/vocabularyStorage.ts`: vocabulary progress, daily vocabulary selection, quiz generation, quiz result stats.
- `types/question.ts`: question, answer, skill, part, and wrong-book types.
- `types/vocabulary.ts`: vocabulary item, progress, status, and quiz types.
- `DEVELOPMENT_LOG.md`: project history, QA notes, data counts, and latest scan records.

## Data Model Rules

Question data must satisfy:

- Every question has a unique `id`.
- `part` is one of `Part 5`, `Part 3`, `Part 4`, or `Part 7`.
- `choices` must include non-empty `A`, `B`, `C`, and `D`.
- `answer` must be one of `A`, `B`, `C`, or `D`.
- `skill_tag` must match `SkillTag` in `types/question.ts`.
- `explanation_zh` must be present and useful.
- `vocabulary` should be a non-empty array for every question.
- Part 3 and Part 4 questions must include `transcript`.
- Part 7 questions must include `passage`.

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
- Part 7 uses `passage`; Part 3 and Part 4 use `transcript`.

## QA Checklist

Run these checks after meaningful changes:

1. `npm run lint`
2. `./node_modules/.bin/tsc --noEmit`
3. `npm run build`
4. Data integrity check for:
   - duplicate question IDs.
   - invalid answers.
   - missing choices.
   - missing `explanation_zh`.
   - missing vocabulary arrays.
   - missing Part 3/4 transcripts.
   - missing Part 7 passages.
   - duplicate vocabulary IDs.
5. Vocabulary quiz generation check:
   - 10 questions when vocabulary exists.
   - 4 choices per question.
   - no duplicate choices.
   - valid `correctIndex`.
   - all three question types remain possible.
6. Manual route smoke test when UI changes are made:
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
- A stale dev server on port 3000 may show outdated behavior. Restart the dev
  server after framework or route changes.
- Production build is the most reliable end-to-end framework validation.

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
- Claude Code: historically referenced for larger implementation work, but this repository now uses `AGENTS.md` as the canonical agent guide.
- DeepSeek or content-generation tools: best for drafting new TOEIC questions, vocabulary entries, explanations, and first-pass content reviews.

`AGENTS.md` is the source of truth for future coding-agent instructions in this repository.
