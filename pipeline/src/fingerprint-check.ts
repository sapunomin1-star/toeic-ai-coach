import type { Fingerprint, FingerprintLibrary } from "./types";
import * as fs from "fs";

/** Simple overlap-based duplicate check.
 *  Returns IDs of questions that may be too similar to existing fingerprints. */
export function checkDuplicates(
  newTopicSummary: string,
  newNamedEntities: string[],
  fingerprints: Fingerprint[]
): { matched: boolean; matchedFingerprints: string[]; score: number } {
  const matchedFingerprints: string[] = [];
  let maxScore = 0;

  for (const fp of fingerprints) {
    let score = 0;

    // Named entity overlap
    const entityOverlap = newNamedEntities.filter((e) =>
      fp.named_entities.some(
        (fe) => fe.toLowerCase() === e.toLowerCase()
      )
    ).length;
    if (entityOverlap >= 2) score += entityOverlap * 3;

    // Topic word overlap (simple bag-of-words comparison)
    const newWords = new Set(
      newTopicSummary.toLowerCase().split(/\s+/)
    );
    const fpWords = new Set(
      fp.topic_summary.toLowerCase().split(/\s+/)
    );
    const wordOverlap = [...newWords].filter((w) =>
      fpWords.has(w)
    ).length;
    score += wordOverlap;
    maxScore = Math.max(maxScore, score);

    // Threshold: score > 8 is suspicious
    if (score > 8) {
      matchedFingerprints.push(fp.fingerprint_id);
    }
  }

  return {
    matched: matchedFingerprints.length > 0,
    matchedFingerprints,
    score: maxScore,
  };
}

export function loadFingerprints(
  filePath: string
): FingerprintLibrary {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as FingerprintLibrary;
}
