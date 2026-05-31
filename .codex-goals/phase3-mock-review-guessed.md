# Codex Goal — Phase 3「考後檢討頁 + 猜對的題」

> 一次坐久一點的長任務。**依序、自我驗證、自我停止**。每階段做完跑 gate；gate
> 沒綠就停在原地修，不要硬往下。全部做完(或遇到必須由人決策的點)才回報。

---

## 0. 運作規則(務必遵守)

1. 逐階段做，每階段結尾 gate：
   - `./node_modules/.bin/tsc --noEmit`
   - `npm run lint`
   - `npm run build`(只有碰 UI/元件的階段才需要；純 lib/型別階段跑 tsc+lint 即可)
   gate 全綠才進下一階段。
2. 保守、加法為主。除非該階段明講，只新增、不刪改既有函式/型別/行為。
3. 遇到「需要產品決策」就**停下來問**，不要自己亂猜。檔尾〈拍板點〉已先決議三項；
   若實作冒出新的結構決策(例如檔案怎麼切)，你可在不違反紅線下自行合理決定，並在回報說明。
4. 每階段結束回報：改了哪些檔、做了什麼、gate 結果、`git diff --stat`。
5. **不要 commit、不要 push**(人來做 commit / review)。

---

## 1. 背景：要解決什麼

模考分數會被「猜對的題」灌水——它計分上等於「會」，能力上卻是相反。答錯的題已經
在交卷時被路由進錯題本，但**猜對的題不會進任何地方，是一個靜默的漏洞**。

這個 goal 做兩件事：
1. **考後檢討頁**：交卷後可逐題回顧(我選什麼、正解、對錯)，並逐題勾「這題我是猜的」。
2. **把『猜對的題』路由進錯題本**：勾為猜對的題，視同需要複習，浮現到錯題本。

> 注意守住一條紅線：**絕不碰模考「考試中」的計時流程**。所有標記都在**交卷後**做。

---

## 2. 現有可用 API(已存在，不要重做)

`types/mock.ts`
- `MockTestResult`(reading/listening 共用，有 `mode?`)、`FullMockResult`；兩者都有
  `id: string`、`questionIds: string[]`、`answers: Partial<Record<string, Choice>>`、
  `unansweredIds: string[]`。正解在題庫。
- `MockMode = "reading" | "listening"`。

`lib/mockStorage.ts`
- `getMockResults(mode): MockTestResult[]`、`saveMockResult(result, mode)`(push 新的)、
  `clearAllMockData()`。內部用 `createSessionStore`。
- 驗證器 `validateResult`(在本檔內，private)。

`lib/fullMockStorage.ts`
- `getFullMockResults(): FullMockResult[]`、`saveFullMockResult(result)`。
- 驗證器 `validateFullResult`(private)。

`lib/sessionStore.ts`
- `createSessionStore<TSession, TResult>(config)` 回傳 `{ getResults, saveResult, ... }`。
  目前**沒有**「就地更新某一筆 result」的能力——本 goal 階段 B 要補。

`lib/storage.ts`
- `updateWrongStatus(questionId: string, isCorrect: boolean): void` — 錯題本狀態機。
  傳 `isCorrect=false` 會讓該題浮現/重新浮現在錯題本(status→reviewing/new、dismissed=false)。
- `getQuestionById` 在 `@/data/questions`。

`components/MockTestRunner.tsx`(reading+listening)/ `components/FullMockRunner.tsx`(full)
- 兩者都有 `phase === "result"` 區塊，底部有「返回桌面」連結(href="/")。
- result 畫面已用 `PartBreakdownBars` 顯示各 part 表現。

---

## 3. 階段拆解(依序做)

### 階段 A — 型別 + 驗證(改 types/mock.ts, lib/mockStorage.ts, lib/fullMockStorage.ts)
- `MockTestResult` 與 `FullMockResult` 各加一個 **optional** 欄位：
  `guessedIds?: string[];`  // 學生事後標記為「猜的」的 questionId
- 兩個驗證器(`validateResult` / `validateFullResult`)補上：
  `guessedIds` 未定義 → 通過；若定義，必須是 string[]，否則該筆 result 不通過。
- 純加法、向後相容：舊 result 沒這欄位仍合法(= 沒標記任何猜題)。不改 key。

Gate：tsc + lint。

### 階段 B — 就地更新 result 的能力(改 lib/sessionStore.ts + lib/mockStorage.ts + lib/fullMockStorage.ts)
- 在 `createSessionStore` 回傳值新增一個方法(名稱自定，建議 `updateResult`)：
  `updateResult(id: string, updater: (r: TResult) => TResult): boolean`
  行為：讀現有 results 陣列，找 `r.id === id` 的那筆，用 updater 產生新值取代，整批寫回
  (用既有的同一個 resultsKey / writeJSON 路徑)；找不到 → 回 false、不寫檔。
- 在 `mockStorage.ts` / `fullMockStorage.ts` 各加一個薄 wrapper：
  - `updateMockResult(mode, id, updater): boolean`
  - `updateFullMockResult(id, updater): boolean`
- 不改既有函式、不新增 localStorage key。

Gate：tsc + lint。

### 階段 C — 檢討資料 + 協調邏輯(新增 lib/mockReview.ts)
> 純邏輯 + 協調，集中在一個新檔，保持 storage 模組精簡。

定義：
```
export type MockKind = "reading" | "listening" | "full";
export type MockReviewItem = {
  question: Question;          // getQuestionById 拿到的；找不到的題跳過
  userAnswer: Choice | null;   // result.answers[id] ?? null(未作答)
  correctAnswer: Choice;
  isCorrect: boolean;          // userAnswer === correctAnswer
  guessed: boolean;            // id 是否在 result.guessedIds
};
```
函式：
- `getLatestResult(kind)`：reading/listening → `getMockResults(mode).at(-1) ?? null`；
  full → `getFullMockResults().at(-1) ?? null`。回傳 `{ id, questionIds, answers, guessedIds }`
  足夠的最小形狀即可(可直接回完整 result)。
- `buildMockReview(result): MockReviewItem[]`：依 `result.questionIds` 順序組出每題的
  review item;`getQuestionById` 找不到的題跳過(防呆)。
- `toggleGuessed(kind, resultId, questionId): void` — 協調器：
  1. 用階段 B 的 updater，把 questionId 在該 result 的 `guessedIds` 切換(有則移除、無則加入)。
  2. **路由規則(已拍板 #2)**：切換成「猜的」之後，若該題在此 result 是**答對的**
     (`answers[questionId] === 該題正解`)→ 呼叫 `updateWrongStatus(questionId, false)`，
     讓猜對的題浮現進錯題本。
     - 答錯的猜題：交卷時已進錯題本，這裡**不需要**重複處理。
     - 取消勾選(從猜改回不猜)：**不要**把它從錯題本移除(避免誤刪使用者複習狀態);
       只更新 guessedIds 即可。這點若你覺得有更好語意，停下來問，不要自作主張。
- 純函式部分(buildMockReview)無副作用;toggleGuessed 才寫 storage。

Gate：tsc + lint。

### 階段 D — UI(新增 app/mock-review/page.tsx + 共用檢討元件；各 result 畫面加入口)
- 新頁 `app/mock-review/page.tsx`：
  - 讀 query param `?type=reading|listening|full`(用 next/navigation useSearchParams)。
    type 不合法或沒有最新 result → 顯示空狀態 +「返回桌面」。
  - 載入 `getLatestResult(type)` → `buildMockReview(result)`。
  - **預設只顯示「答錯 + 猜的」題(已拍板 #3)**;提供一個切換「顯示全部題」。
  - 每題顯示：題號、題目(或聽力題的精簡標示)、我的答案、正解、對錯標記、
    一個「這題我是猜的 🎲」toggle → 呼叫 `toggleGuessed(type, resultId, questionId)` 並更新本地狀態。
  - listening 題的 transcript/正解此時**可以顯示**(已交卷，非考試中)。
  - ARIA：toggle 用 `aria-pressed`;清單語意合理。
- 進入點(每個 result 畫面加**一個**連結，最小侵入)：
  - `MockTestRunner` result 區塊:在「返回桌面」附近加
    `<Link href={`/mock-review?type=${mode}`}>檢討這次測驗 →</Link>`
  - `FullMockRunner` result 區塊:加 `<Link href="/mock-review?type=full">檢討這次測驗 →</Link>`
  - 不改 result 畫面其他既有內容。
- 風格對齊既有頁面(卡片 rounded-2xl border bg-white …);自行決定細節。

Gate：tsc + lint + **build**。

### 階段 E — 自我驗收 + 回報(不改碼)
- 重跑三 gate 全綠。
- `git diff --stat`。
- 寫「如何手動測試」:做一次(或用既有)模考交卷 → 點「檢討這次測驗」→ 預設只看到答錯+猜的
  → 把某題勾成「猜的」→ 去錯題本確認猜對的題有浮現。

---

## 4. 硬限制(全程)

- **絕不碰模考考試中(testing phase)的計時 / 作答 / no-replay / Part 3 倒數流程**。
  所有標記都在交卷後(result / 檢討頁)。
- 不改任何 localStorage key;result 新欄位是 optional、向後相容。
- 不改既有函式簽章 / 既有型別必填欄位 / 既有行為。
- 不碰 vocabularyStorage / SRS / daily plan / Mistake Reason 既有邏輯。
- 取消勾選猜題時，**不可**把題目從錯題本刪除。
- 不 throw 給使用者;資料不足一律安全降級(空狀態 / no-op)。
- 不 commit、不 push。pipeline/ 不要動。

---

## 5. 拍板點 — 已決議(RESOLVED 2026-05-31)

1. **訊號收集方式** ✅ → 考後**檢討頁**逐題標記「猜的」(不做考試中旗標;不碰計時)。
2. **猜對的題路由** ✅ → 勾為猜的 + 該題答對 → `updateWrongStatus(id, false)` 浮現進錯題本。
3. **檢討頁預設範圍** ✅ → 預設只顯示「答錯 + 猜的」題;提供「顯示全部」切換。

> 三點已定。實作中若冒出新的產品決策(例如取消勾選的語意、聽力題在檢討頁顯示多少),
> 停下來問，不要自己決定。
