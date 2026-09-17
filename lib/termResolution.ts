import type { VocabularyItem } from "@/types/vocabulary";

/**
 * Resolving a question's `vocabulary` terms to teaching content.
 *
 * Pure: no storage, no lazy loaders — `createTermResolver` takes the data it
 * needs, so the browser (via the vocabulary bank loader) and the pipeline
 * integrity gate (via direct imports) run the SAME algorithm. Five tiers, in
 * order, each labelled so the UI never presents weaker evidence as a card:
 *
 *  1. sense       — a per-question sense override (`data/question-senses.ts`):
 *                   "issue" in p3-ext-007 means 問題, not the card's 發布.
 *  2. card        — a vocabulary card, matched exactly or through a
 *                   conservative inflection (scheduled → schedule). Only
 *                   same-lexeme inflections; derivations (quick → quickly)
 *                   are NOT merged because they change part of speech.
 *  3. gloss       — a general gloss (`data/term-glosses.ts`) for a term the
 *                   bank does not hold. Not context-verified, and shown as such.
 *  4. components  — a multi-word term whose content words resolve individually
 *                   ("conference room" → conference + room). Partial support.
 *  5. missing     — nothing known; the UI must say so instead of pretending.
 */

export type TermGlossPartOfSpeech =
  | VocabularyItem["partOfSpeech"]
  | "preposition"
  | "conjunction"
  | "pronoun"
  | "other";

export type TermGloss = {
  term: string;
  partOfSpeech: TermGlossPartOfSpeech;
  meaning_zh: string;
};

export type QuestionSense = {
  questionId: string;
  term: string;
  partOfSpeech: TermGlossPartOfSpeech;
  meaning_zh: string;
  /** Optional teaching note, e.g. why the card's other sense does not apply. */
  note?: string;
};

export type TermResolution =
  | { kind: "sense"; term: string; sense: QuestionSense; card: VocabularyItem | null }
  | { kind: "card"; term: string; card: VocabularyItem; match: "exact" | "inflection" }
  | { kind: "gloss"; term: string; gloss: TermGloss; match: "exact" | "inflection" }
  | {
      kind: "components";
      term: string;
      parts: Array<{ token: string; resolution: TermResolution | null }>;
    }
  | { kind: "missing"; term: string };

export type TermResolver = {
  resolve(term: string, questionId?: string): TermResolution;
};

export function normalizeTerm(term: string): string {
  return term.trim().toLowerCase().replace(/\s+/g, " ");
}

const DOUBLED_CONSONANT = /([bdfglmnprstz])\1$/;

/**
 * Candidate dictionary forms for an inflected token, most likely first.
 * Deliberately narrow — plural/3sg (-s, -es, -ies), past (-ed, -ied, doubled
 * consonant) and -ing — because anything wider starts merging different
 * lexemes. Callers verify each candidate against real headwords.
 */
export function inflectionCandidates(token: string): string[] {
  const out: string[] = [];
  const push = (candidate: string) => {
    if (candidate.length >= 2 && candidate !== token && !out.includes(candidate)) out.push(candidate);
  };
  if (token.endsWith("ies") && token.length > 4) push(`${token.slice(0, -3)}y`);
  if (token.endsWith("es") && token.length > 3) {
    push(token.slice(0, -1));
    push(token.slice(0, -2));
  } else if (token.endsWith("s") && !token.endsWith("ss") && token.length > 2) {
    push(token.slice(0, -1));
  }
  if (token.endsWith("ied") && token.length > 4) push(`${token.slice(0, -3)}y`);
  if (token.endsWith("ed") && token.length > 3) {
    const stem = token.slice(0, -2);
    push(token.slice(0, -1));
    push(stem);
    if (DOUBLED_CONSONANT.test(stem)) push(stem.slice(0, -1));
  }
  if (token.endsWith("ing") && token.length > 4) {
    const stem = token.slice(0, -3);
    push(stem);
    push(`${stem}e`);
    if (DOUBLED_CONSONANT.test(stem)) push(stem.slice(0, -1));
  }
  return out;
}

/** Function words never carry the meaning of a phrase on their own. */
const COMPONENT_STOPWORDS = new Set([
  "a", "an", "the", "of", "to", "for", "in", "on", "at", "by", "with", "and",
  "or", "be", "is", "are", "per", "from", "as", "up", "out", "off",
]);

/** Every way to spell a phrase with each token in surface or dictionary form. */
function phraseVariants(tokens: string[]): string[] {
  let variants = [""];
  for (const token of tokens) {
    const forms = [token, ...inflectionCandidates(token)];
    const next: string[] = [];
    for (const prefix of variants) {
      for (const form of forms) next.push(prefix ? `${prefix} ${form}` : form);
    }
    variants = next;
    if (variants.length > 64) variants = variants.slice(0, 64);
  }
  return variants;
}

function senseKey(questionId: string, key: string): string {
  return `${questionId}|${key}`;
}

export function createTermResolver(input: {
  items: readonly VocabularyItem[];
  glosses: readonly TermGloss[];
  senses: readonly QuestionSense[];
}): TermResolver {
  const cards = new Map<string, VocabularyItem>();
  for (const item of input.items) {
    const key = normalizeTerm(item.word);
    if (!cards.has(key)) cards.set(key, item);
  }
  const glosses = new Map<string, TermGloss>();
  for (const gloss of input.glosses) {
    const key = normalizeTerm(gloss.term);
    if (!glosses.has(key)) glosses.set(key, gloss);
  }
  const senses = new Map<string, QuestionSense>();
  for (const sense of input.senses) {
    senses.set(senseKey(sense.questionId, normalizeTerm(sense.term)), sense);
  }

  function lookupExact(key: string, term: string): TermResolution | null {
    const card = cards.get(key);
    if (card) return { kind: "card", term, card, match: "exact" };
    const gloss = glosses.get(key);
    if (gloss) return { kind: "gloss", term, gloss, match: "exact" };
    return null;
  }

  function lookupInflected(key: string, term: string): TermResolution | null {
    const forms = key.includes(" ")
      ? phraseVariants(key.split(" ")).slice(1)
      : inflectionCandidates(key);
    for (const form of forms) {
      const card = cards.get(form);
      if (card) return { kind: "card", term, card, match: "inflection" };
    }
    for (const form of forms) {
      const gloss = glosses.get(form);
      if (gloss) return { kind: "gloss", term, gloss, match: "inflection" };
    }
    return null;
  }

  function lookup(key: string, term: string): TermResolution | null {
    return lookupExact(key, term) ?? lookupInflected(key, term);
  }

  function resolve(term: string, questionId?: string): TermResolution {
    const key = normalizeTerm(term);
    if (!key) return { kind: "missing", term };
    if (questionId) {
      const sense = senses.get(senseKey(questionId, key));
      if (sense) {
        const direct = lookup(key, term);
        return { kind: "sense", term, sense, card: direct?.kind === "card" ? direct.card : null };
      }
    }
    const direct = lookup(key, term);
    if (direct) return direct;
    if (key.includes(" ")) {
      const tokens = key.split(" ").filter((token) => !COMPONENT_STOPWORDS.has(token));
      if (tokens.length > 0 && tokens.length <= 4) {
        const parts = tokens.map((token) => ({ token, resolution: lookup(token, token) }));
        if (parts.some((part) => part.resolution !== null)) {
          return { kind: "components", term, parts };
        }
      }
    }
    return { kind: "missing", term };
  }

  return { resolve };
}

/** Strong support: a per-question sense, a card, or a general gloss. */
export function isFullyResolved(resolution: TermResolution): boolean {
  return resolution.kind === "sense" || resolution.kind === "card" || resolution.kind === "gloss";
}

/** The card behind a resolution, when there is one (exact or inflected). */
export function resolutionCard(resolution: TermResolution): VocabularyItem | null {
  if (resolution.kind === "card") return resolution.card;
  if (resolution.kind === "sense") {
    const { sense, card } = resolution;
    // An unrelated card may be shown as another meaning, but its SRS cannot
    // measure this sense. Unverified equivalence stays a contextual study note.
    return card && card.partOfSpeech === sense.partOfSpeech &&
      normalizeTerm(card.meaning_zh) === normalizeTerm(sense.meaning_zh) ? card : null;
  }
  return null;
}
