# 新增題目與題庫

題庫擴充走同一個入口，不需要修改頁面、日課或模考演算法。既有 11 個 TypeScript 題庫保留；新題庫使用有版本的 JSON 檔案。`data/question-bank-manifest.json` 是唯一登錄表，`data/question-banks.generated.ts` 是工具產生的靜態匯入，請勿手改。

## 第一次準備

在專案根目錄執行：

```bash
npm ci
npm --prefix pipeline ci
npm run questions -- list
```

這些題庫管理指令在本機執行，不呼叫 AI、不產生費用，也不會自行部署。

## 新增一份題庫

以下以 `office-2026` 為題庫 ID。草稿放在 `/tmp` 或未登錄的工作目錄，完成審稿後才匯入。

```bash
npm run questions -- new office-2026 /tmp/office-2026.json --part 5
# 編輯草稿，填完題目、選項、正解、中文解析、考點與單字
npm run questions -- import /tmp/office-2026.json
# 預覽通過、內容審查完成後，再明確寫入
npm run questions -- import /tmp/office-2026.json --write
npm run verify
```

`--part` 支援 1–7，預設 5。Part 3/4 自動建立三題骨架，Part 6 建四個空格，Part 7 建雙題單篇骨架。空白答案、選項、解析與單字會讓驗證失敗，草稿不會混入正式課表。一個 JSON 可包含多個 Part、多個完整題組。

`import` 預設只檢查與預覽。加上 `--write` 才會新增 `data/question-packs/office-2026.json`，更新登錄表並產生靜態匯入。既有題庫、題目 ID 或題組 ID 衝突時會拒絕，不覆蓋、不自動重新編號。

預覽會檢查：

- 欄位型別、Part / skill / difficulty、選項與答案。
- 全題庫 ID 衝突、題組完整性、題組順序與來源歸屬。
- 合併後的答案分布、重複題與相近問句、答案長度洩漏、解析字母衝突、考點標籤。
- 題後每個單字是否有可教學的釋義；缺漏時列出題目 ID 與單字。

機械檢查無法保證題意、唯一正解或教學品質。每批仍須人工審題；聽力與照片需要額外驗證媒體。

## JSON 格式

```json
{
  "schemaVersion": 1,
  "id": "office-2026",
  "title": "辦公室情境練習",
  "questions": [
    {
      "id": "p5-office-2026-001",
      "part": "Part 5",
      "question": "The quarterly safety briefing begins _______ 9 a.m. on Tuesday.",
      "choices": { "A": "at", "B": "in", "C": "of", "D": "with" },
      "answer": "A",
      "explanation_zh": "具體時刻 9 a.m. 前使用介系詞 at，表示說明會於上午九點開始。",
      "skill_tag": "preposition",
      "difficulty": "B1",
      "vocabulary": ["briefing"]
    }
  ]
}
```

這是格式範例，請依整批題量平衡 A/B/C/D。Part 2 只用 A/B/C。題目 ID 必須以對應的 `p1-` 至 `p7-` 開頭，後面用小寫英文、數字與連字號；既有分析會由此前綴判斷 Part。建議使用 `p5-題庫ID-001`，發布後永久保留。

| Part | 必填的額外內容 | 題組規則 |
| --- | --- | --- |
| 1 | `imageAlt`、帶 `(A)`–`(D)` 的 `audioScript` | 單題，需照片與音檔 |
| 2 | 帶 `Q:`、`(A)`–`(C)` 的 `audioScript` | 單題，需音檔；不能有 D |
| 3、4 | `transcript`、`question_order` | 完整三題共享同一份逐字稿，順序 1–3 |
| 5 | 基本欄位即可 | 單題 |
| 6 | `passage`、`passage_group_id`、`question_order` | 四題，文章含 `____(A)____` 至 `____(D)____` 各一次，題幹標籤與順序 1–4 對應 |
| 7 | `passage`、`passage_group_id`、`passage_group_type`、`question_order` | `single` 2–4 題；`double` / `triple` 各 5 題，順序連續 |

技能名稱與標籤集中在 `types/question.ts` 的 `SKILLS`，難度為 `A2 / B1 / B2 / C1`。新增考點時從這裡延伸，再補對應推薦或教學策略。單篇／多篇閱讀的差異是文章數，不是單看題數。

同一題組不得跨題庫拆開。Part 6/7 的 `passage_group_id` 全域唯一，建議 `office-2026-p6-001`。Part 3/4 以 Part 加上**完整逐字稿**辨識題組，不能把另一題庫的逐字稿再登錄一組新 ID。

## 單字與媒體

新增單字若尚無釋義，先在 `data/term-glosses.ts` 加一般釋義；特定題意需要不同義項時放 `data/question-senses.ts`；需要正式字卡與 SRS 才新增字卡。不要為了讓 gate 通過而擴大 `pipeline/baselines/vocabulary-link-debt.json`，也不要改動已審查的 completed 釋義檔來繞過內容版本驗證。

聽力／看圖題按既有路徑產出媒體，或填入可用的 `audioUrl` / `imageUrl`。P3/P4 主音檔以相同逐字稿群組中字典序最小的 ID 命名；P3 另有每題 `<id>-q.mp3`。上傳與 AI 生成使用既有 pipeline，匯入指令只負責內容。

```bash
npm --prefix pipeline run check-media
```

這一步會連線驗證所有應存在的媒體。`npm run verify` 不包含網路媒體檢查；新增或改動音檔、圖片時必須另外執行。

## 修改與移轉

- 在已登錄 JSON 題庫追加新題或修改資料：直接編輯該檔案，保留題庫 metadata 和舊題 ID，再跑 `npm run verify`。匯入指令刻意只支援新增題庫。
- 修改答案或題意：依 `data/question-revisions.ts` 的內容版本流程處理，避免舊作答污染弱點與推薦；更新音檔使用新的版本路徑。
- 改題庫顯示名稱：同時更新 JSON 的 `title` 和 manifest 的 `title`，執行 `npm run questions -- sync`。
- 手動新增／移轉來源：更新 manifest 再執行 `sync`；dev、build 和 pipeline gate 都會檢查登錄表與生成檔一致。移轉需確保題目值、ID、順序不變，不要同時登錄新舊兩份。
- 避免刪除曾發布的題目。歷史作答、錯題本與同步資料都依賴既有 ID；退役或有爭議的題目使用修訂／隔離機制。
- 若匯入程序遭強制中止，先確認程序已結束，檢查 git diff 與 manifest，處理未完成檔案後再移除 `data/.question-bank.lock` 並執行 `sync`、`verify`。一般 I/O 失敗會還原 metadata，異常中止不宣稱跨檔案交易保證。

## 開發者的依賴方向

```text
頁面 / 元件
    ↓ lib/questionBank.ts（維持延遲載入）
data/questions.ts（相容組裝入口）
    ├─ data/question-banks.generated.ts ← manifest + 各資料檔
    └─ lib/questions/createBank.ts
         ├─ catalog.ts      查詢、ID / Part 索引、來源篩選
         ├─ dailyPlan.ts    每日課表與焦點選題
         ├─ mockPlans.ts    精確模考配比
         ├─ groups.ts       完整文章／逐字稿分組
         └─ selection.ts    未見優先、亂數、整組選取

JSON / LLM → lib/questions/validation.ts → pack.ts → 匯入與品質 gate
```

頁面只用 `lib/questionBank.ts`，不可靜態匯入大型 data。程式碼模組不依賴實際題庫，測試可用 `createQuestionBank([{ id, title, questions }])` 注入小型題庫。需要特定來源時可用 `queryQuestions({ bankIds: ["office-2026"], parts: ["Part 5"] })`，其他篩選仍以 AND 組合。新增來源不必修改選題函式。

舊 generator 的 `validator.ts` 保留相容轉接，原本 expansion 與 listening promotion 改用共用 `questions-writer.ts`，不再各自拼接 generated 檔案。PDF 擷取與歷史修補腳本仍保留原用途；新匯入流程優先將審核後資料整理成上述 JSON，再使用統一入口。
