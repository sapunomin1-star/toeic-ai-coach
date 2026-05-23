import type { Pattern, PatternLibrary } from "./types";
import type { SkillTag, Difficulty, Part } from "../../types/question";

export type MatchCriteria = {
  part?: Part;
  skill_tag?: SkillTag;
  difficulty?: Difficulty;
  document_type?: string;
  tags?: string[];
};

/** Simple tag-overlap matcher. Returns patterns sorted by relevance. */
export function matchPatterns(
  library: PatternLibrary,
  criteria: MatchCriteria,
  count: number
): Pattern[] {
  let candidates = [...library.patterns];

  // Exact filters
  if (criteria.part) {
    candidates = candidates.filter((p) => p.part === criteria.part);
  }
  if (criteria.difficulty) {
    candidates = candidates.filter(
      (p) => p.difficulty === criteria.difficulty
    );
  }
  if (criteria.document_type) {
    candidates = candidates.filter(
      (p) =>
        p.document_type.toLowerCase() ===
        criteria.document_type!.toLowerCase()
    );
  }

  // Score by tag overlap
  if (criteria.tags && criteria.tags.length > 0) {
    candidates = candidates
      .map((p) => {
        const overlap = p.tags.filter((t) =>
          criteria.tags!.some(
            (ct) => ct.toLowerCase() === t.toLowerCase()
          )
        ).length;
        return { pattern: p, score: overlap };
      })
      .sort((a, b) => b.score - a.score)
      .map((x) => x.pattern);
  }

  if (candidates.length <= count) return candidates;

  // Random sample without replacement
  const result: Pattern[] = [];
  const pool = [...candidates];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return result;
}

/** Get diverse patterns covering multiple skill tags */
export function matchDiversePatterns(
  library: PatternLibrary,
  part: Part,
  count: number
): Pattern[] {
  const byPart = library.patterns.filter((p) => p.part === part);
  if (byPart.length <= count) return byPart;

  // Group by subtype, pick one from each group, then random fill
  const groups = new Map<string, Pattern[]>();
  for (const p of byPart) {
    const key = p.subtype;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  }

  const result: Pattern[] = [];
  const groupKeys = [...groups.keys()];

  // Shuffle group keys for diversity across runs
  for (let i = groupKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [groupKeys[i], groupKeys[j]] = [groupKeys[j], groupKeys[i]];
  }

  // Pick one from each group first
  for (const key of groupKeys) {
    if (result.length >= count) break;
    const group = groups.get(key)!;
    result.push(group[Math.floor(Math.random() * group.length)]);
  }

  // Fill remaining with random picks
  const remaining = byPart.filter((p) => !result.includes(p));
  while (result.length < count && remaining.length > 0) {
    const idx = Math.floor(Math.random() * remaining.length);
    result.push(remaining[idx]);
    remaining.splice(idx, 1);
  }

  return result.slice(0, count);
}
