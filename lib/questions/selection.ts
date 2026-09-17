import type { Question } from "@/types/question";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Order a flat question pool so questions the user has NOT seen in a previous
 * mock come first (each tier shuffled). Falls back to seen questions only
 * when the unseen pool runs out — so repeat mocks stay possible on a finite
 * bank but repetition is minimized.
 */
export function shuffleUnseenFirst(
  pool: Question[],
  seenIds: ReadonlySet<string>,
): Question[] {
  if (seenIds.size === 0) return shuffle(pool);
  const unseen = pool.filter((q) => !seenIds.has(q.id));
  const seen = pool.filter((q) => seenIds.has(q.id));
  return [...shuffle(unseen), ...shuffle(seen)];
}

/** Same idea for question groups: a group counts as seen if ANY member was. */
export function shuffleUnseenGroupsFirst(
  groups: Question[][],
  seenIds: ReadonlySet<string>,
): Question[][] {
  if (seenIds.size === 0) return shuffle(groups);
  const unseen = groups.filter((group) =>
    group.every((q) => !seenIds.has(q.id)),
  );
  const seen = groups.filter((group) => group.some((q) => seenIds.has(q.id)));
  return [...shuffle(unseen), ...shuffle(seen)];
}

export function selectGroupsForTotal(
  groups: Question[][],
  target: number,
): Question[][] | null {
  // Caller controls ordering (unseen-first); iteration order biases which
  // groups end up in the subset-sum solution.
  const sums = new Map<number, Question[][]>();
  sums.set(0, []);

  for (const group of groups) {
    const snapshots = [...sums.entries()];
    for (const [sum, selected] of snapshots) {
      const nextSum = sum + group.length;
      if (nextSum > target || sums.has(nextSum)) continue;
      const nextSelected = [...selected, group];
      if (nextSum === target) return nextSelected;
      sums.set(nextSum, nextSelected);
    }
  }

  return sums.get(target) ?? null;
}
