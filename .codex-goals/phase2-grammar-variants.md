# Codex Goal — Phase 2「Grammar 變體題複習」療程

> 這是一份「一次坐久一點」的長任務。請**依序、自我驗證、自我停止**地完成下面所有
> 階段。每個階段做完都要跑驗證 gate;**gate 沒綠就停在那個階段修，不要硬往下做**。
> 全部做完(或遇到必須由人決策的點)才回報。

---

## 0. 你現在的角色與運作規則(務必遵守)

1. **逐階段做、每階段自我驗證**。每階段結尾的 gate：
   - `./node_modules/.bin/tsc --noEmit`
   - `npm run lint`
   - `npm run build`(只有「碰到 UI/元件」的階段才需要 build；純 lib 階段跑 tsc+lint 即可)
   gate 全綠才能進下一階段。沒綠 → 留在原階段修到綠，不要累積錯誤往下。
2. **保守、加法為主**。除非該階段明講，否則只新增、不刪改既有函式/型別/行為。
3. **遇到「需要產品決策」就停下來問**，不要自己亂猜。下面〈需要你拍板的點〉已先列出；
   若實作中冒出新的決策點，停下、寫清楚選項再問。
4. **每階段結束**回報：改了哪些檔、做了什麼、gate 結果、`git diff --stat`。
5. **不要 commit、不要 push**(由人來做 commit / review)。

---

## 1. 背景：這個療程要解決什麼

Mistake Reason System Phase 1 已完成：答錯題會記錄 `mistakeReason`(vocab/grammar/
comprehension/speed/careless/guess)。但 Phase 1 只是「看見」原因，還沒「治療」。

**這個 goal 做第一條治療迴圈：grammar 變體題複習。**
> 當學生某題答錯且原因是 `grammar`，不要只是把「原題」丟回錯題本(重做原題會養成
> 「我記得這題選 B」的題目記憶)。而是隔一段時間後，用**同一個 skill_tag 的「別的題」**
> (變體題)再測一次。連續答對 N 題變體才算這個觀念「修復」。

這是 deliberate practice + testing effect 的落地：**遷移到新題，而不是背原題答案。**

---

## 2. 現有可直接使用的 API(已存在，不要重做)

`types/question.ts`
- `type MistakeReason`、`type SkillTag`、`type Part`
- `MISTAKE_REASON_LABELS`

`data/questions.ts`
- `queryQuestions({ parts?, skills?, categories?, difficulties?, excludeIds? }): Question[]`
  ← 用這個撈「同 skill 的別題」，`excludeIds` 排除原題/已做過的題。
- `getQuestionById(id): Question | undefined`

`lib/storage.ts`
- `getAnswerRecords(): AnswerRecord[]` — 每筆含 `questionId, isCorrect, skill_tag,
  answeredAt, mistakeReason?, source?`
- `getWrongBookEntries(): WrongBookEntry[]`、`getUniqueWrongQuestionIds(): string[]`
- `getWrongStatusMap(): WrongStatusMap`(每筆 `{ status, consecutiveCorrect, dismissed? }`)
- `type DailyPlan = { questionIds: string[]; createdAt: string; cursor: number; autoPlayedListeningGroups?: string[] }`
- `type QuizPlanSource = "daily" | "wrongbook"`
- `saveWrongPracticePlan(plan: DailyPlan)`、`clearWrongPracticePlan()`、
  `getQuizPlan()`、`saveQuizPlan(plan, source)`
- **localStorage 一律走 `STORAGE_KEYS`(`lib/storageCore.ts`) + `readJSON`/`writeJSON`**。

`lib/analysis.ts`
- `excludeMock`(內部用)、`countMistakesByReason`、`getReasonInsight` 等。

---

## 3. 階段拆解(依序做)

### 階段 A — 純資料層：找出「需要 grammar 變體複習」的 skill(只改 lib/analysis.ts)
新增純函式(無 storage/UI 副作用)：
```
// 回傳目前「grammar 原因錯題」聚集的 skill，依嚴重度排序
export function getGrammarWeakSkills(records: AnswerRecord[]): { skill: SkillTag; wrongCount: number }[]
```
規則：
- `excludeMock`。
- 只看 `isCorrect === false && mistakeReason === "grammar"` 的紀錄。
- 依 skill_tag 分組計數，`wrongCount` 由多到少排序，只回傳 `wrongCount > 0`。
- 只算「文法類」skill(grammar 類別)。若不確定哪些 skill 屬 grammar，用
  `getSkillCategory(skill) === "grammar"`(types/question.ts 有 `getSkillCategory`)過濾。

Gate：tsc + lint。

### 階段 B — 純資料層：產生變體題複習清單(只改 lib/analysis.ts 或新增 lib/grammarRemediation.ts)
> 自行判斷放哪：若邏輯只依賴 analysis/queryQuestions，建議**新增 lib/grammarRemediation.ts**
> 保持 analysis.ts 精簡。檔案位置這點你可自決，不需問。

新增純函式：
```
export function buildGrammarVariantPlan(
  records: AnswerRecord[],
  options?: { maxQuestions?: number },
): string[]   // 回傳變體題的 questionId 清單(順序 = 練習順序)
```
規則：
- 用階段 A 的 `getGrammarWeakSkills` 取出弱 grammar skills(由重到輕)。
- 對每個弱 skill，用 `queryQuestions({ skills: [skill], excludeIds })` 撈同 skill 的題；
  **excludeIds = 學生「所有」曾答過的題 id**(從 records 收集全部 questionId、去重)，
  確保只出「從沒做過的新題」當變體，而非原題或做過的題。〔已拍板 #1〕
- 預設 `maxQuestions = 5`(可由 options 覆蓋)。各弱 skill 間盡量輪流取(round-robin)，
  讓清單涵蓋多個弱點而非集中一個。〔已拍板 #3〕
- 若可用變體題不足，回傳能湊到的數量(可少於 maxQuestions)，不要 throw。
- 純函式：不寫 storage、不碰 plan。只回傳 id 清單。

Gate：tsc + lint。

### 階段 C — 儲存層接線(只改 lib/storage.ts)
新增一個「把變體題清單存成可練習的 plan」的薄函式，**復用既有 wrong-practice plan 機制**：
```
export function startGrammarVariantPractice(questionIds: string[]): boolean
```
規則：
- 若 `questionIds.length === 0` → 回傳 false(no-op，不寫檔)。
- 否則組一個 `DailyPlan`(`{ questionIds, createdAt: new Date().toISOString(), cursor: 0 }`)，
  呼叫既有 `saveWrongPracticePlan(plan)`，回傳 true。
- **不要新增 localStorage key**(復用 wrongPracticePlan)。不要改既有函式。
- 不碰 SRS、不碰 daily plan。

Gate：tsc + lint。

### 階段 D — UI 入口(改 dashboard，最小侵入)
在 dashboard 的「錯誤原因分析」區塊(components/dashboard/ReasonBreakdownSection.tsx)
或其附近，新增一個 CTA：當有 grammar 弱點時顯示
「文法弱點複習 →(用同類型新題練 5 題)」按鈕〔已拍板 #3：5 題〕，點了就：
1. `const ids = buildGrammarVariantPlan(records)`  // 預設 maxQuestions = 5
2. `if (startGrammarVariantPractice(ids)) router.push("/quiz")`
實作細節：
- 需要 records → 從 `useDashboardMetrics` 或 page 既有的 records 傳入；**沿用既有 props 流**，
  不要在元件內直接讀 storage(維持 Phase 5 的「section 是純展示」慣例)。所以：
  在 `lib/dashboardMetrics.ts` 加一個 memo `grammarWeakSkills`(用 `getGrammarWeakSkills(safeRecords)`)
  與/或直接把 records 傳給 page 的 handler。**按鈕的 onClick 邏輯放在 `app/dashboard/page.tsx`**
  (page 可以讀 storage / 用 router)，傳成 prop 給 section。
- 只有 `grammarWeakSkills.length > 0` 才顯示 CTA。
- ARIA / 樣式對齊既有 dashboard 按鈕。

Gate：tsc + lint + **build**。

### 階段 E — 自我驗收 + 回報(不改碼)
- 重跑三個 gate 確認全綠。
- `git diff --stat` 列出所有更動。
- 寫一段「如何手動測試」：什麼情況會看到 CTA、點了會發生什麼。

---

## 4. 硬限制(全程適用)

- 不改任何 localStorage key；新資料一律走 `STORAGE_KEYS` + `readJSON`/`writeJSON`。
- 不改既有函式簽章 / 既有型別的必填欄位 / 既有行為。
- 不碰 mock test 計時、不碰 SRS 演算法、不碰 vocabularyStorage。
- 不 throw 給使用者；資料不足一律安全降級(no-op / 空清單 / 不顯示 CTA)。
- 不 commit、不 push。
- pipeline/ 不要動。

---

## 5. 拍板點 — 已決議(RESOLVED 2026-05-31)

1. **excludeIds 範圍** ✅ → 排除**所有**已做過的 questionId(去重整批)，只出全新題當變體。
2. **畢業邏輯** ✅ → 這個 goal **不做**畢業判定(連對幾題才算修復)；留到下一個 goal。
   本 goal 範圍 = 產生變體題清單 + dashboard 入口而已。
3. **CTA** ✅ → 練 **5 題**同類變體題；文案「文法弱點複習」。

> 三點已定，可直接從階段 A 開始；實作中若冒出新的產品決策點，停下來問，不要自己決定。
```
