# TOEIC AI Coach

個人多益自學工具 — 每天 15–30 分鐘，把練習、錯題、單字、模擬考、考後檢討與分數預測整合在一個 **local-first** 的 Next.js App 裡。所有學習資料存在瀏覽器，**不需要登入、不需要後端、不需要資料庫**。

> 題庫 1,899 題（Part 1–7）＋ 單字庫 1,500 字，全部通過資料完整性與媒體存在性自動檢查。

---

## ✨ 功能總覽

| 領域 | 功能 |
|------|------|
| **每日練習** | 依弱點自動組卷（Part 5/6 文法、Part 1–4 聽力、Part 7 閱讀、錯題複習），聽力配比會隨近期表現自適應調整 |
| **錯題本** | 間隔複習（SRS：1 / 3 / 7 / 14 天），連續兩次「跨日」答對才算精熟；可手動分組複習 |
| **單字系統** | 4 階段 SRS 閃卡（new → seen → familiar → mastered）＋ 固定 0.8x 的單字/例句語音（可不限次重播）＋ 單字測驗（英翻中 / 中翻英 / 例句填空），每日 20 個新字、答錯當日加強 |
| **模擬考** | Reading 半套（100 題 / 75 分）、Listening 半套（100 題 / 45 分）、完整 TOEIC（200 題 / 120 分） |
| **仿真節奏** | 聽力音檔不可重播；播畢後自動倒數推進（P1/P2 5 秒、P3/P4 8 秒）；作答時不顯示 transcript |
| **考後檢討** | 每次模考留存 snapshot（題目 / 作答 / 正解 / 詳解 / passage / transcript / 媒體 URL），可逐題回顧 |
| **分數預測** | 依 IIBC 公開換算表估算 Listening / Reading / Total 分數範圍，並對照 ETS CEFR 等級 |
| **教練報告** | 正確率、各 Part 表現、作答速度、**錯誤原因分析**、文法弱點補救、明日建議 |
| **資料備份** | 一鍵匯出 / 匯入 JSON，可在不同裝置間搬移學習進度 |

---

## 🚀 快速開始

### 環境需求

- Node.js **20+**（Next.js 16 需求）
- npm

### 安裝與啟動

```bash
git clone https://github.com/sapunomin1-star/toeic-ai-coach.git
cd toeic-ai-coach
npm install
cp .env.example .env.local   # 填入媒體相關變數（見下）
npm run dev                  # http://localhost:3000
```

### 環境變數（`.env.local`）

| 變數 | 用途 | 必要性 |
|------|------|--------|
| `NEXT_PUBLIC_BLOB_BASE_URL` | 聽力音檔 / Part 1 圖片的 Vercel Blob 基底網址 | 聽力與看圖題需要 |
| `BLOB_READ_WRITE_TOKEN` | Pipeline 上傳媒體用（client 不會打包） | 只有產媒體時需要 |
| `OPENAI_API_KEY` | Pipeline 產生圖片 / 語音用 | 只有產媒體時需要 |

> 未設定 `NEXT_PUBLIC_BLOB_BASE_URL` 時 UI 會 **graceful degrade**：沒有音檔時改顯示文字稿、沒有圖片時不顯示，作答流程仍可運作。

---

## 🧱 技術棧

- **Framework**：Next.js 16（App Router）
- **Language**：TypeScript（`strict` 啟用，零 `any`）
- **UI**：React 19 Client Components + Tailwind CSS v4
- **媒體**：Vercel Blob（音檔 / 圖片，不進 git）
- **儲存**：瀏覽器 localStorage（無後端）
- **題目生成**：獨立的 `pipeline/` 套件（TypeScript + tsx，離線執行）

---

## 📁 專案結構

```
toeic-ai-coach/
├─ app/                      # Next.js App Router 頁面
│  ├─ page.tsx               # 首頁 / 每日任務
│  ├─ practice/              # 今日練習計畫
│  ├─ quiz/                  # 作答流程（計時、詳解、錯因標記）
│  ├─ mock-test/             # Reading 半套模考
│  ├─ listening-mock/        # Listening 半套模考
│  ├─ full-mock/             # 完整 200 題模考
│  ├─ mock-review/[snapshotId]/  # 考後逐題檢討
│  ├─ dashboard/             # 個人教練報告
│  ├─ wrongbook/             # 錯題本
│  ├─ vocabulary/            # 每日單字閃卡
│  └─ vocabulary-quiz/       # 單字測驗
├─ components/               # MockTestRunner / FullMockRunner / AudioPlayer / dashboard/*
├─ lib/                      # 邏輯層（storage / analysis / scoring / media / vocab / hooks）
│  ├─ storageCore.ts         # localStorage 基礎（讀寫防護、key 註冊）
│  ├─ storage.ts             # 作答紀錄、錯題 SRS、備份匯入匯出、模考 seen 題
│  ├─ analysis.ts            # 弱點 / 速度 / 錯誤原因 / 自適應聽力配比
│  ├─ toeicScoreEstimate.ts  # IIBC 換算表 + CEFR
│  ├─ sessionStore.ts        # 模考 session 共用工廠
│  ├─ audioOwner.ts          # P3/P4 題組音檔 canonical 解析
│  └─ vocabularyStorage.ts   # 單字 SRS / 每日 session / 測驗出題
├─ data/                     # 題庫與單字庫（純資料）
├─ types/                    # 型別與技能/Part 分類（single source of truth）
├─ scripts/                  # repro-c1.ts（備份匯入回歸測試）
├─ pipeline/                 # 離線題目 / 媒體生成（獨立 package）
└─ public/                   # 靜態資源
```

---

## 🗺️ 主要 Routes

| Route | 功能 |
|-------|------|
| `/` | 首頁、每日任務總覽 |
| `/practice` | 今日練習計畫（預估時間、任務組成） |
| `/quiz` | 作答流程、計時、Passage / 音檔 / 詳解、錯因標記 |
| `/mock-test` | Reading 半套模擬考（100 題 / 75 分鐘） |
| `/listening-mock` | Listening 半套模擬考（100 題 / 45 分鐘） |
| `/full-mock` | 完整 TOEIC 模擬考（200 題 / 120 分鐘） |
| `/mock-review/[snapshotId]` | 模考考後完整檢討 |
| `/dashboard` | 個人教練報告、分析 |
| `/wrongbook` | 錯題本、手動加入複習、分組複習 |
| `/vocabulary` | 每日單字閃卡 |
| `/vocabulary-quiz` | 單字測驗 |

> `/quiz` 與 `/mock-review` 由流程導向進入（無導覽列入口），其餘皆可從首頁或導覽列到達。

---

## 🧠 核心系統說明

### 每日練習（自適應組卷）

`/practice` 依弱點自動建立當日計畫，預設組成：

- 弱點補強 8 題（Part 5，依錯題分析挑最弱文法）＋ 新題 7 題（Part 5）
- Part 6 段落填空 2 題、Part 7 閱讀 3 題
- 聽力 P1–4（預設 2 P1 + 3 P2 + 1 組 P3 + 1 組 P4）
- 錯題複習最多 5 題（僅到期者）

聽力配比會依「最近 10 題」表現自適應加強（某 Part 正確率 < 60% 且樣本足夠時自動加題）。

### 錯題本與 SRS

- 答錯進入錯題本，採間隔複習：**1 / 3 / 7 / 14 天**；答對往上爬一階，答錯歸零。
- 「精熟」需連續兩次且**跨日**答對（避免同場短期記憶造成假精熟）。
- 可在 `/wrongbook` 依文法類型分組、手動挑題練習。
- 模考檢討頁可把猜對 / 想重看的題「加入複習」，寫入手動清單但**不**產生假的作答紀錄、不影響正確率。

### 單字系統

- 6 階間隔：**0 / 1 / 3 / 7 / 14 / 30 天**；4 階狀態 new → seen → familiar → mastered。
- 每日 session 分桶：今日加強（retry）/ 到期複習（due）/ 穩定複查（masteredReview）/ 新字（new）；每日上限 35、新字 20，到期負載過高時自動延後新字。
- 單字測驗三型：英翻中 / 中翻英 / 例句填空；**誘答選項優先取同詞性同情境**，避免一眼可刪。
- 當日驗收後仍不熟的字可進入「今日加強」最多 2 輪。

### 模擬考與檢討

- `/mock-test` 與 `/listening-mock` 共用 `components/MockTestRunner.tsx`，以 `mode` 切換。
- `/full-mock` 使用 `components/FullMockRunner.tsx`，流程固定 Listening → Reading，進入 Reading 後不可返回；離開頁面會被記錄並於成績註記。
- 模考優先抽「沒考過的題」（已出現題 ID 存於 `toeic_mock_seen_ids_v1`，含答對題）。
- 交卷後建立 review snapshot，再把 `reviewSnapshotId` 掛到結果；snapshot 只存精簡題目資料與媒體 URL，不存 audio/image binary。最多保留 20 筆。

### 錯誤原因分析（教練報告）

每題答錯可標記 6 種原因之一：**不會單字 / 文法不懂 / 看不懂（聽不懂）/ 來不及 / 其實會選錯 / 用猜的**。系統會：

- 依作答時間與弱字自動推測原因（可由使用者覆寫）。
- 在 Dashboard 產生單句 headline（例如「你最近 X% 的錯其實是來不及」），並對「文法」類錯誤提供同類型新題補救。

### 分數預測

- `lib/toeicScoreEstimate.ts` 依 **IIBC 公開參考換算表**把每段 raw（0–100）轉成 scaled 分數範圍；半套模考即等同一個完整 section（100 題）。
- `getTotalRange()` 合併 Listening + Reading（完整模考顯示 10–990 範圍）。
- `getCEFRForSection()` 套用 ETS TOEIC → CEFR section threshold。
- 為非官方方向性預測；真實 TOEIC 會因 ETS equating 有場次差異（UI 已標註免責聲明）。

---

## 📚 題庫與技能分類

- **題庫**：1,899 題。分布 — P1 78、P2 208、P3 306、P4 237、P5 488、P6 164、P7 418。
- **單字庫**：1,500 字，涵蓋 30+ 商務情境分類（business / office / finance / hr / logistics …）。
- **技能分類（19 項，single source of truth 於 `types/question.ts`）**：
  - 文法：被動語態、詞性判斷、時態、介系詞、連接詞、代名詞、關係子句
  - 單字：商務單字
  - 聽力：照片題、應答題、主旨、推論、下一步、細節
  - 閱讀：主旨、細節、推論、字彙語境、句子插入
- 全題庫答案位置平衡（四選一每選項約 25%），由 pipeline integrity 強制檢查。

---

## 💾 資料儲存（localStorage）

| Key | 用途 |
|-----|------|
| `toeic_answer_records_v1` | 作答紀錄 |
| `toeic_daily_plan_v1` | 每日練習計畫 |
| `toeic_wrong_status_v1` | 錯題本狀態 |
| `toeic_wrong_practice_plan_v1` | 錯題練習計畫 |
| `toeic_manual_review_items_v1` | 從模考檢討手動加入的複習題 |
| `toeic_vocabulary_progress_v1` | 單字進度 |
| `toeic_vocabulary_daily_session_v1` | 每日單字 session |
| `toeic_mock_session_v1` / `toeic_mock_results_v1` | Reading 模考 session / 結果 |
| `toeic_listening_mock_session_v1` / `toeic_listening_mock_results_v1` | Listening 模考 session / 結果 |
| `toeic_full_mock_session_v1` / `toeic_full_mock_results_v1` | 完整模考 session / 結果 |
| `toeic_mock_review_snapshots_v1` | 模考考後檢討 snapshot（最多 20 筆） |
| `toeic_mock_seen_ids_v1` | 模考已出現題目 ID（避免反覆抽同題） |

- 每個 reader 都對壞資料做型別守衛，單一 key 損毀不會讓整頁崩潰。
- **備份 / 匯入**：Dashboard 可匯出全部資料為 JSON、再於另一裝置匯入；匯入會逐 key 驗證、略過格式不符者（不會把缺失 key 寫成 `null`）。回歸測試見 `scripts/repro-c1.ts`。

---

## ⚙️ 題目生成 Pipeline

`pipeline/` 是獨立於 Next.js build 的離線工具（自有 `package.json`，用 tsx 執行）。

- `data/questions.ts`：題庫聚合 + 輔助函式（`getQuestionsByPart`、`buildDailyPlan`、`buildMockTestPlan`、`buildListeningMockPlan`）
- `data/questions-part5/6/7.ts`、`questions-listening.ts`、`questions-generated.ts`：拆檔題庫（避免 TS union 複雜度上限）
- `data/vocabulary.ts`（手寫核心）+ `vocabulary-generated.ts`（AI 生成）

```bash
cd pipeline
npm run check                        # 資料完整性檢查
npm run check-media                  # 媒體存在性檢查（HEAD 驗證 Blob）
npx tsx src/mark-groups.ts --write   # 標記 Part 6/7 passage group
```

---

## ✅ 開發與驗證指令

```bash
# 開發
npm run dev            # 開發伺服器
npm run build          # production build
npm run lint           # ESLint
npx tsc --noEmit       # TypeScript 型別檢查

# 完整 QA（建議 push 前全跑一次）
npm run lint
npx tsc --noEmit
npm run build
cd pipeline && npm run check
cd pipeline && npm run check-media

# 回歸測試（備份匯入 null 崩潰）
npx tsx scripts/repro-c1.ts
```

`pipeline check` 除了重複 ID / 缺欄位外，還強制：

- 各 Part 答案位置分布（四選一 18–32%；Part 2 25–42%）
- 題組完整性（P3/P4 transcript 群組必為 3 題、P6 passage 群組必為 4 題）
- 解析宣告的正解字母與 `answer` 一致（AI 生成題的典型失效模式）

`pipeline check-media` 依媒體路徑慣例推導每題應存在的 Blob 檔案並逐一 HEAD 驗證：

- P1：`images/<id>.jpg` 與 `audio/<id>.mp3`；P2：`audio/<id>.mp3`
- P3/P4：群組音檔掛在同 transcript 群組中 id 最小的題目 `audio/<id>.mp3`
- P3 每題另有題目朗讀 `audio/<id>-q.mp3`

---

## ☁️ Vercel 部署

- 全部使用者資料存 browser localStorage，部署不需資料庫。
- `pipeline/` 是離線產題工具，不應依賴 Vercel runtime。
- 部署前在 Vercel project Environment Variables 設定 `NEXT_PUBLIC_BLOB_BASE_URL` 與 `BLOB_READ_WRITE_TOKEN`。
- 媒體存於 Vercel Blob，不進 git；`next/image` 會對 Part 1 圖片自動轉 WebP/AVIF。

### macOS / iCloud 注意

iCloud 可能把檔案變成 `compressed,dataless` placeholder；若 `npm install` / `lint` / `build` 無輸出卡住，先確認 source 完整落地：

```bash
find . -flags +dataless -not -path './node_modules/*' -print
```

部署後至少 smoke test：`/`、`/practice`、`/quiz`、`/mock-test`、`/listening-mock`、`/full-mock`、`/dashboard`、`/wrongbook`、`/vocabulary`、`/vocabulary-quiz`。

---

## 🔒 隱私

所有學習資料只存在你的瀏覽器 localStorage，不會上傳任何伺服器；唯一的外部請求是從 Vercel Blob 載入聽力音檔與圖片。清除瀏覽器資料或在 Dashboard 按「清除所有學習紀錄」即可完全移除。

---

## 📄 授權

個人專案，未附授權條款；如需重用請先聯絡作者。
