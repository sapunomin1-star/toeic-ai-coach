/**
 * Skill taxonomy — single source of truth.
 *
 * To add a skill, add ONE entry to `SKILLS`. The `SkillTag` union,
 * `SKILL_LABELS`, `SKILL_TAG_LIST`, and every category lookup derive from it,
 * so they stay in sync automatically.
 */
export type SkillCategory = "grammar" | "vocabulary" | "listening" | "reading";

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  grammar: "文法",
  vocabulary: "單字",
  listening: "聽力",
  reading: "閱讀",
};

export const SKILLS = {
  passive_voice: { label: "被動語態", category: "grammar" },
  word_form: { label: "詞性判斷", category: "grammar" },
  tense: { label: "時態", category: "grammar" },
  preposition: { label: "介系詞", category: "grammar" },
  conjunction: { label: "連接詞", category: "grammar" },
  pronoun: { label: "代名詞", category: "grammar" },
  relative_clause: { label: "關係子句", category: "grammar" },
  business_vocabulary: { label: "商務單字", category: "vocabulary" },
  listening_photo: { label: "聽力照片題", category: "listening" },
  listening_response: { label: "聽力應答題", category: "listening" },
  listening_main_idea: { label: "聽力主旨", category: "listening" },
  listening_inference: { label: "聽力推論", category: "listening" },
  listening_next_action: { label: "聽力下一步", category: "listening" },
  listening_detail: { label: "聽力細節", category: "listening" },
  reading_main_idea: { label: "閱讀主旨", category: "reading" },
  reading_detail: { label: "閱讀細節", category: "reading" },
  reading_inference: { label: "閱讀推論", category: "reading" },
  reading_vocab: { label: "字彙語境", category: "reading" },
  sentence_insertion: { label: "句子插入", category: "reading" },
} satisfies Record<string, { label: string; category: SkillCategory }>;

export type SkillTag = keyof typeof SKILLS;

export const SKILL_TAG_LIST = Object.keys(SKILLS) as SkillTag[];

export type Choice = "A" | "B" | "C" | "D";
export type Part2Choice = "A" | "B" | "C";

export type Difficulty = "A2" | "B1" | "B2" | "C1";

/**
 * TOEIC parts — single source of truth. Each part declares its section
 * (listening/reading). To add a part, add ONE entry to `PARTS`.
 */
export const PARTS = {
  "Part 1": { section: "listening", label: "Part 1 照片描述" },
  "Part 2": { section: "listening", label: "Part 2 應答問題" },
  "Part 3": { section: "listening", label: "Part 3 簡短對話" },
  "Part 4": { section: "listening", label: "Part 4 簡短獨白" },
  "Part 5": { section: "reading", label: "Part 5 句子填空" },
  "Part 6": { section: "reading", label: "Part 6 段落填空" },
  "Part 7": { section: "reading", label: "Part 7 單篇/多篇閱讀" },
} satisfies Record<string, { section: "listening" | "reading"; label: string }>;

export type Part = keyof typeof PARTS;

export const PART_LIST = Object.keys(PARTS) as Part[];

export type WrongBookStatus = "new" | "reviewing" | "improving" | "mastered";

export type Question = {
  id: string;
  part: Part;
  question: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D?: string;
  };
  answer: Choice;
  explanation_zh: string;
  explanation_en?: string;
  skill_tag: SkillTag;
  difficulty: Difficulty;
  vocabulary?: string[];
  transcript?: string;
  passage?: string;
  passage_group_id?: string;
  passage_group_type?: "single" | "double" | "triple";
  passage_order?: number;
  question_order?: number;
  imageUrl?: string;
  imageAlt?: string;
  audioUrl?: string;
  audioChoices?: {
    A: string;
    B: string;
    C: string;
    D?: string;
  };
  audioScript?: string;
};

/**
 * Mistake Reason System — why an answer was wrong, not just where.
 *
 * Each reason maps to a different remediation track (wired in later phases).
 * Cognitive pipeline order: vocab → grammar → comprehension (understanding),
 * then speed → careless → guess (execution / metacognition).
 *
 * Single source of truth: add a reason here and the union, list, and labels
 * stay in sync. `trap` is intentionally deferred to Phase 2 (needs distractor
 * metadata). `comprehension` is not split into listen/read — the UI picks the
 * label by Part and aggregation derives the section.
 */
export type MistakeReason =
  | "vocab" // didn't know the word(s)
  | "grammar" // grammar concept not understood
  | "comprehension" // understood words but not the meaning (listening or reading)
  | "speed" // ran out of time
  | "careless" // actually knew it, slipped / misread
  | "guess"; // pure guess

/** Whether a reason was confirmed by the learner or only inferred by the system. */
export type ReasonSource = "user" | "inferred";

export const MISTAKE_REASONS: MistakeReason[] = [
  "vocab",
  "grammar",
  "comprehension",
  "speed",
  "careless",
  "guess",
];

export const MISTAKE_REASON_LABELS: Record<MistakeReason, string> = {
  vocab: "不會單字",
  grammar: "文法不懂",
  comprehension: "看不懂", // UI overrides to「聽不懂」for listening parts
  speed: "來不及",
  careless: "其實會選錯",
  guess: "用猜的",
};

export type AnswerRecord = {
  questionId: string;
  userAnswer: Choice;
  correctAnswer: Choice;
  isCorrect: boolean;
  skill_tag: SkillTag;
  answeredAt: string;
  responseTimeMs?: number;
  source?: "daily" | "mock";
  /**
   * Mistake Reason System (Phase 1). Only meaningful when `isCorrect === false`.
   * Optional + additive: legacy records without these stay valid (= unlabeled).
   */
  mistakeReason?: MistakeReason;
  reasonSource?: ReasonSource;
};

export const SKILL_LABELS: Record<SkillTag, string> = Object.fromEntries(
  SKILL_TAG_LIST.map((tag) => [tag, SKILLS[tag].label])
) as Record<SkillTag, string>;

export function getSkillCategory(tag: SkillTag): SkillCategory {
  return SKILLS[tag].category;
}

export function getSkillsByCategory(category: SkillCategory): SkillTag[] {
  return SKILL_TAG_LIST.filter((tag) => SKILLS[tag].category === category);
}

export function getPartSection(part: Part): "listening" | "reading" {
  return PARTS[part].section;
}

export function getPartsBySection(section: "listening" | "reading"): Part[] {
  return PART_LIST.filter((part) => PARTS[part].section === section);
}
