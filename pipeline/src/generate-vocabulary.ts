/**
 * Vocabulary bank generator. Tops the bank up to a target size using DeepSeek,
 * deliberately over-weighting the under-represented parts of speech (adverb,
 * phrase) and thin categories. Hard-validates every item against the
 * VocabularyItem schema, dedupes against the existing bank (and within the
 * run), assigns sequential vocab-NNN ids, and appends to data/vocabulary.ts in
 * the file's existing TS style. A JSON backup is written to pipeline/output/.
 *
 *   npx tsx src/generate-vocabulary.ts            # generate up to TARGET
 *   npx tsx src/generate-vocabulary.ts --dry-run  # generate but don't write
 *   npx tsx src/generate-vocabulary.ts --target 1500
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { deepseek, parseGeneratedJson } from "./llm-client";
import { VOCABULARY } from "../../data/vocabulary";
import type { VocabularyItem } from "../../types/vocabulary";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// New items are appended to the generated file (kept separate from the
// hand-curated bank, mirroring data/questions-generated.ts). Splitting the
// array also keeps each literal under TypeScript's union-complexity limit.
const GEN_PATH = path.resolve(__dirname, "../../data/vocabulary-generated.ts");
const GEN_HEADER =
  'import type { VocabularyItem } from "@/types/vocabulary";\n\n' +
  "export const VOCABULARY_GENERATED: VocabularyItem[] = [\n];\n";

const POS = ["noun", "verb", "adjective", "adverb", "phrase"] as const;
const DIFF = ["A1", "A2", "B1", "B2", "C1"] as const;
const CATEGORIES = [
  "business", "office", "travel", "shopping", "meeting", "email", "finance",
  "daily", "hr", "retail", "restaurant", "contract", "report", "schedule",
  "customer-service", "marketing", "production", "logistics", "technology",
  "legal", "healthcare", "insurance", "real-estate", "education", "training",
  "hospitality", "security", "presentation",
] as const;

type Pos = (typeof POS)[number];
type Cat = (typeof CATEGORIES)[number];

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const TARGET = (() => {
  const i = args.indexOf("--target");
  return i >= 0 ? Number(args[i + 1]) : 1500;
})();

const norm = (w: string) => w.trim().toLowerCase();
const existingWords = new Set(VOCABULARY.map((v) => norm(v.word)));
const seenThisRun = new Set<string>();
const maxIdNum = Math.max(
  ...VOCABULARY.map((v) => Number(v.id.replace(/\D/g, "")) || 0),
);

const need = TARGET - VOCABULARY.length;
if (need <= 0) {
  console.log(`Bank already at ${VOCABULARY.length} >= target ${TARGET}. Nothing to do.`);
  process.exit(0);
}

// ── Generation plan ─────────────────────────────────────────────────────────
// Over-generate (~18%) to absorb dedup/validation drops, then trim to `need`.
type Batch = { tag: string; pos: Pos | "mix"; count: number; categories: readonly Cat[]; diff: readonly string[] };
const ALL = CATEGORIES;
const plan: Batch[] = [
  // Fix the adverb deficit (currently ~1%).
  { tag: "adverbs-1", pos: "adverb", count: 25, categories: ALL, diff: ["A2", "B1", "B2"] },
  { tag: "adverbs-2", pos: "adverb", count: 25, categories: ALL, diff: ["B1", "B2", "C1"] },
  { tag: "adverbs-3", pos: "adverb", count: 25, categories: ALL, diff: ["A2", "B1", "B2", "C1"] },
  // Fix the phrase/phrasal-verb deficit (currently ~3%).
  { tag: "phrases-1", pos: "phrase", count: 25, categories: ALL, diff: ["A2", "B1", "B2"] },
  { tag: "phrases-2", pos: "phrase", count: 25, categories: ALL, diff: ["B1", "B2"] },
  { tag: "phrases-3", pos: "phrase", count: 25, categories: ALL, diff: ["B1", "B2", "C1"] },
  { tag: "phrases-4", pos: "phrase", count: 25, categories: ALL, diff: ["A2", "B1", "B2", "C1"] },
];
// Category fill (verbs / adjectives / nouns), thin categories weighted higher.
const fillWeights: Partial<Record<Cat, number>> = {
  shopping: 28, hospitality: 28, business: 24, training: 24, insurance: 22,
  daily: 18, marketing: 18, production: 18, security: 18, legal: 16,
  presentation: 16, "customer-service": 16, education: 16, "real-estate": 16,
  logistics: 14, healthcare: 14, contract: 14, retail: 14, hr: 12, report: 12,
  schedule: 12, travel: 12, restaurant: 12, technology: 12, meeting: 10,
  office: 10, email: 10, finance: 10,
};
for (const [cat, count] of Object.entries(fillWeights)) {
  plan.push({ tag: `fill-${cat}`, pos: "mix", count: count as number, categories: [cat as Cat], diff: ["A2", "B1", "B2", "C1"] });
}

// ── Prompt + LLM ────────────────────────────────────────────────────────────
const SYSTEM = `You are a TOEIC vocabulary author for an exam-prep app. Output ONLY a raw JSON array (no markdown, no prose). Each element MUST be:
{
  "word": string,                 // a real, distinct TOEIC business/workplace word or phrase
  "partOfSpeech": one of ${JSON.stringify(POS)},
  "meaning_zh": string,           // Traditional Chinese meaning (繁體中文)
  "example": string,              // natural business English sentence that USES the word
  "example_zh": string,           // Traditional Chinese translation of "example"
  "collocations": string[],       // 2-3 common collocations using the word
  "difficulty": one of ${JSON.stringify(DIFF)},
  "category": one of ${JSON.stringify(CATEGORIES)}
}
Rules: words must be genuine TOEIC vocabulary, not proper nouns, not duplicates. The example sentence must actually contain the word (or its inflected form). meaning_zh and example_zh must be Traditional Chinese. Never include any word from the EXCLUDE list.`;

function posPhrase(pos: Pos | "mix"): string {
  if (pos === "phrase") return "phrasal verbs and common business collocational phrases (partOfSpeech: \"phrase\")";
  if (pos === "mix") return "a mix of verbs, adjectives and nouns (favor verbs and adjectives over nouns; partOfSpeech accordingly)";
  return `${pos}s (partOfSpeech: "${pos}")`;
}

// Pass the full existing word list as EXCLUDE (input only). Compact to save tokens.
const excludeList = [...existingWords].sort().join(", ");

async function generateBatch(b: Batch): Promise<VocabularyItem[]> {
  const catText = b.categories.length === 1 ? `the "${b.categories[0]}" theme` : `any of these categories: ${b.categories.join(", ")}`;
  const user = `Generate ${b.count} ${posPhrase(b.pos)} for TOEIC, themed around ${catText}, at difficulty levels ${b.diff.join("/")} (spread across them). Each item's "category" must be one of the allowed categories${b.categories.length === 1 ? ` and should be "${b.categories[0]}"` : ""}.
EXCLUDE (do not output any of these words): ${excludeList}`;
  const res = await deepseek(SYSTEM, user, 0.9);
  let arr: unknown[];
  try {
    arr = parseGeneratedJson(res.content);
  } catch (e) {
    console.warn(`  [${b.tag}] JSON parse failed: ${(e as Error).message}`);
    return [];
  }
  const out: VocabularyItem[] = [];
  for (const raw of arr) {
    const item = validate(raw);
    if (!item) continue;
    const key = norm(item.word);
    if (existingWords.has(key) || seenThisRun.has(key)) continue;
    seenThisRun.add(key);
    out.push(item);
  }
  return out;
}

// ── Validation ──────────────────────────────────────────────────────────────
function validate(raw: unknown): VocabularyItem | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const word = typeof r.word === "string" ? r.word.trim() : "";
  const pos = r.partOfSpeech;
  const meaning = typeof r.meaning_zh === "string" ? r.meaning_zh.trim() : "";
  const example = typeof r.example === "string" ? r.example.trim() : "";
  const exampleZh = typeof r.example_zh === "string" ? r.example_zh.trim() : "";
  const diff = r.difficulty;
  const cat = r.category;
  let coll = Array.isArray(r.collocations) ? r.collocations.filter((c): c is string => typeof c === "string" && c.trim().length > 0).map((c) => c.trim()) : [];
  coll = [...new Set(coll)].slice(0, 4);

  if (!word || word.length > 40 || /[\n\t]/.test(word)) return null;
  if (!POS.includes(pos as Pos)) return null;
  if (!DIFF.includes(diff as string as (typeof DIFF)[number])) return null;
  if (!CATEGORIES.includes(cat as Cat)) return null;
  if (meaning.length < 1 || !/[一-鿿]/.test(meaning)) return null;       // must contain Chinese
  if (example.length < 8) return null;
  if (exampleZh.length < 2 || !/[一-鿿]/.test(exampleZh)) return null;
  if (coll.length < 1) return null;
  // example should contain the head word (loose: first token, ≥4 chars, prefix match)
  const head = word.toLowerCase().split(/\s+/)[0].replace(/[^a-z]/g, "");
  if (head.length >= 4 && !example.toLowerCase().includes(head.slice(0, Math.max(4, head.length - 2)))) return null;

  return {
    id: "", // assigned later
    word,
    partOfSpeech: pos as Pos,
    meaning_zh: meaning,
    example,
    example_zh: exampleZh,
    collocations: coll,
    difficulty: diff as (typeof DIFF)[number],
    category: cat as Cat,
  };
}

// ── Serialize to the existing TS style (unquoted keys, 2/4-space indent) ─────
function serialize(item: VocabularyItem): string {
  const q = (s: string) => JSON.stringify(s);
  const coll = `[${(item.collocations ?? []).map(q).join(",")}]`;
  return [
    "  {",
    `    id: ${q(item.id)},`,
    `    word: ${q(item.word)},`,
    `    partOfSpeech: ${q(item.partOfSpeech)},`,
    `    meaning_zh: ${q(item.meaning_zh)},`,
    `    example: ${q(item.example)},`,
    `    example_zh: ${q(item.example_zh)},`,
    `    collocations: ${coll},`,
    `    difficulty: ${q(item.difficulty)},`,
    `    category: ${q(item.category)},`,
    "  },",
  ].join("\n");
}

function appendToFile(items: VocabularyItem[]): void {
  if (!fs.existsSync(GEN_PATH)) fs.writeFileSync(GEN_PATH, GEN_HEADER, "utf-8");
  const raw = fs.readFileSync(GEN_PATH, "utf-8");
  const closeIdx = raw.lastIndexOf("\n];");
  if (closeIdx === -1) throw new Error("Could not find VOCABULARY_GENERATED array close (\\n];)");
  const body = items.map(serialize).join("\n");
  const updated = raw.slice(0, closeIdx) + "\n" + body + raw.slice(closeIdx);
  fs.writeFileSync(GEN_PATH, updated, "utf-8");
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Existing bank: ${VOCABULARY.length} | target: ${TARGET} | need: ${need} | dryRun=${DRY_RUN}`);
  const collected: VocabularyItem[] = [];

  for (const b of plan) {
    if (collected.length >= need) break;
    process.stdout.write(`  ${b.tag} (req ${b.count})… `);
    try {
      const items = await generateBatch(b);
      collected.push(...items);
      console.log(`+${items.length} kept (total ${collected.length}/${need})`);
    } catch (e) {
      console.log(`FAILED: ${(e as Error).message}`);
    }
  }

  // Top-up passes if short.
  let topup = 0;
  while (collected.length < need && topup < 8) {
    topup++;
    const b: Batch = { tag: `topup-${topup}`, pos: topup % 2 ? "phrase" : "mix", count: 25, categories: ALL, diff: ["A2", "B1", "B2", "C1"] };
    process.stdout.write(`  ${b.tag}… `);
    try {
      const items = await generateBatch(b);
      collected.push(...items);
      console.log(`+${items.length} (total ${collected.length}/${need})`);
    } catch (e) { console.log(`FAILED: ${(e as Error).message}`); }
  }

  const final = collected.slice(0, need).map((item, i) => ({ ...item, id: `vocab-${maxIdNum + i + 1}` }));

  // Backup
  const outDir = path.resolve(__dirname, "../output");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  fs.writeFileSync(path.join(outDir, `vocabulary-batch-${stamp}.json`), JSON.stringify(final, null, 2), "utf-8");

  // Summary
  const by = (f: (v: VocabularyItem) => string) => {
    const m = new Map<string, number>();
    for (const v of final) m.set(f(v), (m.get(f(v)) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}:${n}`).join("  ");
  };
  console.log(`\n=== Generated ${final.length} new items (bank → ${VOCABULARY.length + final.length}) ===`);
  console.log(`POS:  ${by((v) => v.partOfSpeech)}`);
  console.log(`Diff: ${by((v) => v.difficulty)}`);
  console.log(`Cat:  ${by((v) => v.category)}`);

  if (DRY_RUN) { console.log("\n[DRY RUN] not writing to data/vocabulary.ts"); return; }
  if (final.length === 0) { console.log("\nNothing valid generated; not writing."); process.exit(1); }
  appendToFile(final);
  console.log(`\nAppended ${final.length} items to data/vocabulary.ts (ids vocab-${maxIdNum + 1}..vocab-${maxIdNum + final.length}).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
