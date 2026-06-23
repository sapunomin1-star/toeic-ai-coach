import { createRequire } from "module";

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OpenCC: any = require("opencc-js");

/**
 * Per-CHARACTER Simplified→Traditional (Taiwan) normalizer for LLM-generated
 * Chinese content. DeepSeek/Kimi emit Simplified characters; this converts them
 * before the data lands in data/*.ts.
 *
 * Why per-character and not a full OpenCC phrase pass: generated text is mixed
 * (mostly traditional already, with simplified islands). OpenCC's phrase tables
 * then mis-convert already-traditional runs at word boundaries (名表→名錶,
 * 明了→明瞭, 存盤→存檔) and over-localize terminology (連接詞→連線詞, 程序→程式).
 * Char-level conversion fixes genuine simplified chars and leaves shared chars
 * untouched.
 *
 * KEEP: shared chars whose char-level default is wrong for this business/grammar
 * corpus (each verified against every occurrence in the bank). WORD_FIX: the few
 * shared-char words that need the context-correct traditional form.
 */
const cc = OpenCC.Converter({ from: "cn", to: "tw" });
const KEEP = new Set(["干", "准", "里", "游", "台", "托"]);
const HAN = /[㐀-鿿]/;
const WORD_FIX: [RegExp, string][] = [
  [/託盤/g, "托盤"], // tray/pallet uses 托, not 託 (entrust)
  [/關系/g, "關係"], // relationship: 係, not 系
  [/聯系/g, "聯繫"], // contact: 繫, not 系
];

function convChar(ch: string): string {
  if (!HAN.test(ch) || KEEP.has(ch)) return ch;
  return cc(ch);
}

/** Convert a single string's Simplified characters to Traditional (Taiwan). */
export function traditionalize(text: string): string {
  if (!text) return text;
  let out = Array.from(text, convChar).join("");
  for (const [re, to] of WORD_FIX) out = out.replace(re, to);
  return out;
}

/**
 * Recursively traditionalize every string value in a parsed LLM payload.
 * Non-Han characters (English passages, choices, ids, codes) pass through
 * unchanged, so it is safe to apply to whole question/vocabulary objects.
 */
export function traditionalizeDeep<T>(value: T): T {
  if (typeof value === "string") return traditionalize(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => traditionalizeDeep(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = traditionalizeDeep(v);
    return out as T;
  }
  return value;
}
