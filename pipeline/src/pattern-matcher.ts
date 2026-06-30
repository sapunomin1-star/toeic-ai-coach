import type { Pattern, PatternLibrary } from "./types";
import type { Part } from "../../types/question";

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
