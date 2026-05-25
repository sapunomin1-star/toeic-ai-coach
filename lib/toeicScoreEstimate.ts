export type Section = "listening" | "reading";

export type ScoreRange = {
  min: number;
  max: number;
};

export type CEFRBand = "below A1" | "A1" | "A2" | "B1" | "B2" | "C1";

export type CEFRResult = {
  primary: CEFRBand;
  spans?: CEFRBand[];
};

type RawScoreBucket = {
  rawMin: number;
  rawMax: number;
  scaled: ScoreRange;
};

/**
 * Source: IIBC, #TOEIC公式みんなで模擬受験, 参考スコア範囲換算表, p. 3.
 * https://www.iibc-global.org/hubfs/library/default/toeic/special/job/u-trial202303/pdf/utrial_score.pdf
 * Retrieved: 2026-05-25.
 *
 * IIBC states that these are reference score ranges because an unofficial
 * mock cannot undergo the ETS equating process used for an official score.
 */
const LISTENING_SCORE_TABLE: RawScoreBucket[] = [
  { rawMin: 96, rawMax: 100, scaled: { min: 475, max: 495 } },
  { rawMin: 91, rawMax: 95, scaled: { min: 435, max: 495 } },
  { rawMin: 86, rawMax: 90, scaled: { min: 405, max: 470 } },
  { rawMin: 81, rawMax: 85, scaled: { min: 370, max: 450 } },
  { rawMin: 76, rawMax: 80, scaled: { min: 345, max: 420 } },
  { rawMin: 71, rawMax: 75, scaled: { min: 320, max: 390 } },
  { rawMin: 66, rawMax: 70, scaled: { min: 290, max: 360 } },
  { rawMin: 61, rawMax: 65, scaled: { min: 265, max: 335 } },
  { rawMin: 56, rawMax: 60, scaled: { min: 240, max: 310 } },
  { rawMin: 51, rawMax: 55, scaled: { min: 215, max: 280 } },
  { rawMin: 46, rawMax: 50, scaled: { min: 190, max: 255 } },
  { rawMin: 41, rawMax: 45, scaled: { min: 160, max: 230 } },
  { rawMin: 36, rawMax: 40, scaled: { min: 130, max: 205 } },
  { rawMin: 31, rawMax: 35, scaled: { min: 105, max: 175 } },
  { rawMin: 26, rawMax: 30, scaled: { min: 85, max: 145 } },
  { rawMin: 21, rawMax: 25, scaled: { min: 60, max: 115 } },
  { rawMin: 16, rawMax: 20, scaled: { min: 30, max: 90 } },
  { rawMin: 11, rawMax: 15, scaled: { min: 5, max: 70 } },
  { rawMin: 6, rawMax: 10, scaled: { min: 5, max: 60 } },
  { rawMin: 1, rawMax: 5, scaled: { min: 5, max: 50 } },
  { rawMin: 0, rawMax: 0, scaled: { min: 5, max: 35 } },
];

const READING_SCORE_TABLE: RawScoreBucket[] = [
  { rawMin: 96, rawMax: 100, scaled: { min: 460, max: 495 } },
  { rawMin: 91, rawMax: 95, scaled: { min: 425, max: 490 } },
  { rawMin: 86, rawMax: 90, scaled: { min: 400, max: 465 } },
  { rawMin: 81, rawMax: 85, scaled: { min: 375, max: 440 } },
  { rawMin: 76, rawMax: 80, scaled: { min: 340, max: 415 } },
  { rawMin: 71, rawMax: 75, scaled: { min: 310, max: 390 } },
  { rawMin: 66, rawMax: 70, scaled: { min: 285, max: 370 } },
  { rawMin: 61, rawMax: 65, scaled: { min: 255, max: 340 } },
  { rawMin: 56, rawMax: 60, scaled: { min: 230, max: 310 } },
  { rawMin: 51, rawMax: 55, scaled: { min: 200, max: 275 } },
  { rawMin: 46, rawMax: 50, scaled: { min: 170, max: 245 } },
  { rawMin: 41, rawMax: 45, scaled: { min: 140, max: 215 } },
  { rawMin: 36, rawMax: 40, scaled: { min: 115, max: 180 } },
  { rawMin: 31, rawMax: 35, scaled: { min: 95, max: 150 } },
  { rawMin: 26, rawMax: 30, scaled: { min: 75, max: 120 } },
  { rawMin: 21, rawMax: 25, scaled: { min: 60, max: 95 } },
  { rawMin: 16, rawMax: 20, scaled: { min: 45, max: 75 } },
  { rawMin: 11, rawMax: 15, scaled: { min: 30, max: 55 } },
  { rawMin: 6, rawMax: 10, scaled: { min: 10, max: 40 } },
  { rawMin: 1, rawMax: 5, scaled: { min: 5, max: 30 } },
  { rawMin: 0, rawMax: 0, scaled: { min: 5, max: 15 } },
];

/**
 * Source: ETS, Mapping the TOEIC Tests on the CEFR, p. 2.
 * https://www.de.ets.org/content/dam/ets-org/pdfs/toeic/toeic-mapping-cefr-reference.pdf
 * Retrieved: 2026-05-25.
 */
const CEFR_THRESHOLDS: Record<Section, Record<Exclude<CEFRBand, "below A1">, number>> = {
  listening: { A1: 60, A2: 110, B1: 275, B2: 400, C1: 490 },
  reading: { A1: 60, A2: 115, B1: 275, B2: 385, C1: 455 },
};

const CEFR_BANDS: CEFRBand[] = ["below A1", "A1", "A2", "B1", "B2", "C1"];

export const PREDICTION_DISCLAIMER =
  "本預測為非官方參考範圍，依 IIBC 公開換算表計算。實際 TOEIC 分數會經 ETS Equating 統計處理而有差異，僅供方向性參考。";

export function rawToScaledRange(raw: number, section: Section): ScoreRange {
  const normalizedRaw = Number.isFinite(raw)
    ? Math.min(100, Math.max(0, Math.round(raw)))
    : 0;
  const table = section === "listening" ? LISTENING_SCORE_TABLE : READING_SCORE_TABLE;
  const bucket = table.find(
    ({ rawMin, rawMax }) => normalizedRaw >= rawMin && normalizedRaw <= rawMax,
  );

  if (!bucket) {
    throw new Error(`No TOEIC score range for ${section} raw score ${normalizedRaw}.`);
  }

  return { ...bucket.scaled };
}

export function getTotalRange(listening: ScoreRange, reading: ScoreRange): ScoreRange {
  return {
    min: listening.min + reading.min,
    max: listening.max + reading.max,
  };
}

function scaledToCEFRBand(score: number, section: Section): CEFRBand {
  const thresholds = CEFR_THRESHOLDS[section];
  if (score >= thresholds.C1) return "C1";
  if (score >= thresholds.B2) return "B2";
  if (score >= thresholds.B1) return "B1";
  if (score >= thresholds.A2) return "A2";
  if (score >= thresholds.A1) return "A1";
  return "below A1";
}

export function getCEFRForSection(range: ScoreRange, section: Section): CEFRResult {
  const lowBand = scaledToCEFRBand(Math.min(range.min, range.max), section);
  const highBand = scaledToCEFRBand(Math.max(range.min, range.max), section);
  const lowIndex = CEFR_BANDS.indexOf(lowBand);
  const highIndex = CEFR_BANDS.indexOf(highBand);

  if (lowIndex === highIndex) {
    return { primary: highBand };
  }

  return {
    primary: highBand,
    spans: CEFR_BANDS.slice(lowIndex, highIndex + 1),
  };
}
