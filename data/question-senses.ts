import type { QuestionSense, TermGlossPartOfSpeech } from "@/lib/termResolution";

/**
 * Per-question sense overrides (2026-09-16 review, F03). The vocabulary bank
 * holds ONE sense per headword, so a card can teach the wrong meaning for the
 * question in front of the learner: `issue` = 發布 while the dialogue says
 * "a flickering issue". Each entry says what the term means IN THAT QUESTION;
 * the UI shows it first and the card's other sense second.
 *
 * Source: a part-of-speech scan of every exact-match term against its
 * question text (165 candidates), then read one by one; false positives were
 * dropped. Review candidates for new questions surface through
 * `cd pipeline && npm run check`.
 */
type Pos = "n" | "v" | "adj";
const POS: Record<Pos, TermGlossPartOfSpeech> = { n: "noun", v: "verb", adj: "adjective" };

type SenseGroup = {
  term: string;
  pos: Pos;
  meaning_zh: string;
  note?: string;
  questionIds: string[];
};

const GROUPS: SenseGroup[] = [
  {
    term: "board",
    pos: "n",
    meaning_zh: "董事會",
    note: "字卡的 board 是動詞「登機」；the board / board meeting 指董事會。",
    questionIds: [
      "p5-cj-004", "p5-bv-010", "p5-ext-019", "p2-gen-025", "p5-gen-041",
      "p5-gen-045", "p5-gen-065", "p5-gen-078", "p5-gen-141",
    ],
  },
  {
    term: "schedule",
    pos: "v",
    meaning_zh: "安排；排定（時間）",
    note: "本題為動詞用法（scheduled for…＝排定在…）；字卡教的是名詞「時間表」。",
    questionIds: [
      "p5-ext-026", "p2-gen-070", "p2-gen-077", "p2-gen-085", "p3-gen-108",
      "p3-gen-212", "p7-gen-248", "p7-gen-249", "p7-gen-285", "p7-xd-0139",
      "p7-xd-0210", "p2-ed-0004",
    ],
  },
  {
    term: "position",
    pos: "n",
    meaning_zh: "職位；職缺",
    note: "字卡的 position 是動詞「定位」；apply for / accept a position 指職位。",
    questionIds: [
      "p5-ext-043", "p5-ext-083", "p5-ext-131", "p5-ext-149", "p5-pr-014",
      "p5-xd-0015", "p5-xd-0342", "p5-xd-0343", "p7-xd-0199",
    ],
  },
  {
    term: "position",
    pos: "n",
    meaning_zh: "地位；排名",
    note: "our position as the top team＝我們身為第一名球隊的地位。",
    questionIds: ["p5-xd-0069"],
  },
  { term: "bridge", pos: "n", meaning_zh: "橋", questionIds: ["p5-ext-090"] },
  {
    term: "delay",
    pos: "v",
    meaning_zh: "延誤；使延遲（be delayed＝被延誤）",
    questionIds: [
      "p5-rc-008", "p7-ext-032", "p7-ch-102", "p2-gen-012", "p3-gen-092",
      "p4-gen-097", "p4-gen-127", "p4-gen-179",
    ],
  },
  {
    term: "resume",
    pos: "v",
    meaning_zh: "恢復；重新開始",
    note: "與名詞 résumé（履歷）不同；operations will resume＝營運將恢復。",
    questionIds: ["p7-ext-004", "p7-vc-002", "p4-gen-037", "p7-gen-302"],
  },
  {
    term: "station",
    pos: "v",
    meaning_zh: "派駐；安置（be stationed＝被派駐在）",
    questionIds: ["p7-sp-201"],
  },
  { term: "upgrade", pos: "n", meaning_zh: "升級（工程）", questionIds: ["p7-sp-201"] },
  {
    term: "update",
    pos: "n",
    meaning_zh: "更新版本；最新消息、最新進度",
    note: "字卡教動詞「更新」；本題是名詞（a software update / an update on…）。",
    questionIds: ["p5-gen-038", "p4-ext-011", "p3-gen-216"],
  },
  {
    term: "update",
    pos: "adj",
    meaning_zh: "更新後的（updated＝已更新的）",
    questionIds: ["p7-ch-203", "p3-gen-198"],
  },
  {
    term: "order",
    pos: "v",
    meaning_zh: "訂購；點（餐）",
    note: "字卡教名詞「訂單」；本題是動詞 order lunch / order more paper。",
    questionIds: [
      "p3-ext-015", "p2-gen-011", "p2-gen-060", "p2-gen-100", "p2-gen-115",
      "p2-gen-129", "p2-gen-144", "p2-gen-146", "p2-gen-147", "p3-gen-133",
      "p2-gen-165", "p2-gen-174", "p2-gen-195", "p2-gen-217", "p5-ed-0075",
      "p2-ed-0017",
    ],
  },
  {
    term: "purchase",
    pos: "n",
    meaning_zh: "購買；購買的物品",
    note: "available for purchase / make a purchase 為名詞用法。",
    questionIds: ["p4-ext-021", "p4-gen-141", "p7-xd-0314", "p5-ed-0054"],
  },
  {
    term: "screen",
    pos: "n",
    meaning_zh: "螢幕；銀幕",
    note: "字卡的 screen 是動詞「篩選」；照片題裡指螢幕。",
    questionIds: ["p1-gen-011", "p1-gen-030", "p1-gen-031", "p1-gen-064"],
  },
  {
    term: "monitor",
    pos: "n",
    meaning_zh: "螢幕；顯示器",
    note: "字卡的 monitor 是動詞「監控」；照片題裡指電腦螢幕。",
    questionIds: ["p1-gen-062", "p1-gen-067", "p1-gen-077"],
  },
  {
    term: "lobby",
    pos: "n",
    meaning_zh: "大廳",
    note: "字卡的 lobby 是動詞「遊說」；本題指建築物的大廳。",
    questionIds: ["p1-gen-036", "p2-gen-188"],
  },
  { term: "download", pos: "n", meaning_zh: "下載（的檔案）；available for download＝可供下載", questionIds: ["p2-gen-029"] },
  { term: "target", pos: "n", meaning_zh: "目標（數字）", questionIds: ["p2-gen-031"] },
  {
    term: "access",
    pos: "n",
    meaning_zh: "進入權；存取權限；通道",
    note: "access request / access badge / access control 皆為名詞用法。",
    questionIds: [
      "p3-gen-008", "p4-gen-032", "p4-gen-061", "p4-gen-121", "p4-gen-153",
      "p4-gen-167", "p4-gen-168",
    ],
  },
  {
    term: "issue",
    pos: "n",
    meaning_zh: "問題；狀況；故障",
    note: "字卡教動詞「發布」；本題的 issue 是名詞「問題」（a flickering issue、report an issue）。",
    questionIds: ["p3-ext-007", "p7-gen-108", "p3-gen-161", "p3-gen-163"],
  },
  {
    term: "exchange",
    pos: "n",
    meaning_zh: "換貨",
    note: "offer an exchange or store credit＝提供換貨或商店抵用金。",
    questionIds: ["p3-gen-025", "p3-gen-027", "p7-xd-0317"],
  },
  { term: "review", pos: "n", meaning_zh: "審查報告；評論", questionIds: ["p5-gen-012"] },
  { term: "interview", pos: "v", meaning_zh: "面試（某人）", questionIds: ["p5-gen-028"] },
  {
    term: "clearance",
    pos: "n",
    meaning_zh: "清倉（clearance items＝清倉商品）",
    questionIds: ["p4-gen-035", "p4-gen-124"],
  },
  {
    term: "discount",
    pos: "adj",
    meaning_zh: "已打折的（discounted items＝折扣商品）",
    questionIds: ["p4-gen-064", "p4-gen-184"],
  },
  { term: "register", pos: "n", meaning_zh: "收銀機（count the register＝清點收銀機）", questionIds: ["p2-gen-137"] },
  {
    term: "platform",
    pos: "n",
    meaning_zh: "月台",
    note: "字卡的 platform 指服務平臺；車站廣播裡 platform 5 是第 5 月台。",
    questionIds: ["p4-gen-112", "p4-gen-113", "p4-gen-114"],
  },
  { term: "refund", pos: "v", meaning_zh: "退款（be refunded＝被退款）", questionIds: ["p7-gen-385"] },
  {
    term: "request",
    pos: "v",
    meaning_zh: "要求；請求",
    note: "be requested to＝被要求去做。",
    questionIds: ["p7-gen-386", "p5-xd-0122"],
  },
  {
    term: "stock",
    pos: "n",
    meaning_zh: "庫存（in stock＝有現貨）",
    questionIds: ["p7-gen-281", "p7-gen-327"],
  },
  { term: "stock", pos: "n", meaning_zh: "股票", note: "investment portfolio 裡的 stocks 指股票。", questionIds: ["p5-xd-0171"] },
  { term: "guarantee", pos: "v", meaning_zh: "保證", questionIds: ["p5-xd-0119"] },
  {
    term: "field",
    pos: "n",
    meaning_zh: "領域；專業範圍",
    note: "字卡的 field 是動詞「即時回答」；in the field＝在該領域。",
    questionIds: ["p5-xd-0182", "p4x-13a", "p4x-13b", "p4x-13c"],
  },
  { term: "filter", pos: "n", meaning_zh: "濾網；濾紙", questionIds: ["p5-xd-0244"] },
  { term: "follow-up", pos: "v", meaning_zh: "跟進；後續聯繫", questionIds: ["p7-xd-0079", "p7-xd-0342"] },
  { term: "supply", pos: "v", meaning_zh: "供應；提供", questionIds: ["p7-xd-0186"] },
  { term: "check-out", pos: "v", meaning_zh: "結帳", questionIds: ["p7-xd-0188"] },
  { term: "list", pos: "n", meaning_zh: "名單；清單", questionIds: ["p7-xd-0211"] },
  { term: "commute", pos: "v", meaning_zh: "通勤", questionIds: ["p7-xd-0270"] },
  {
    term: "address",
    pos: "v",
    meaning_zh: "對…發言；向…致詞（address the media＝對媒體發言）",
    note: "字卡的「處理；寫地址」不適用於本題。",
    questionIds: ["p5-xd-0191"],
  },
  { term: "address", pos: "n", meaning_zh: "演說；致詞", questionIds: ["p7-xd-0290"] },
  { term: "address", pos: "n", meaning_zh: "地址", questionIds: ["p3-ed-0027"] },
  { term: "hire", pos: "n", meaning_zh: "僱用（candidate for hire＝待聘人選）", questionIds: ["p7-xd-0358"] },
  { term: "draft", pos: "v", meaning_zh: "起草；擬定", questionIds: ["p7-xd-0401"] },
  { term: "return", pos: "n", meaning_zh: "退貨（returns＝退回的商品）", questionIds: ["p5-ed-0023"] },
  { term: "launch", pos: "n", meaning_zh: "推出；上市", questionIds: ["p5-ed-0105"] },
  { term: "display", pos: "v", meaning_zh: "展示；陳列", questionIds: ["p3-ed-0008"] },
  { term: "cover", pos: "n", meaning_zh: "封面", questionIds: ["p2-ind-002"] },
  { term: "dispatch", pos: "n", meaning_zh: "發貨；出貨（批次）", questionIds: ["p3x-15a", "p3x-15b", "p3x-15c"] },
];

export const QUESTION_SENSES: QuestionSense[] = GROUPS.flatMap((group) =>
  group.questionIds.map((questionId) => ({
    questionId,
    term: group.term,
    partOfSpeech: POS[group.pos],
    meaning_zh: group.meaning_zh,
    ...(group.note ? { note: group.note } : {}),
  })),
);
