# TOEIC AI Coach

個人多益自學工具 — 每日 20 個新字，加上約 15–30 分鐘核心題目訓練；把練習、錯題、單字、模擬考、考後檢討與分數預測整合在一個 **local-first** 的 Next.js App 裡。所有學習資料存在瀏覽器；**可選擇登入單人帳號啟用跨裝置同步**（Upstash Redis），未登入時完全單機、零網路請求。

> 題庫 3,303 題（Part 1–7）＋ 單字庫 1,500 字；題目結構、答案、解析與題組完整性由 pipeline 自動檢查，媒體檔另有獨立的遠端存在性檢查。

產品問題、設計策略、核心學習循環與教授展示腳本整理在 [`docs/PRODUCT_CASE_STUDY.md`](docs/PRODUCT_CASE_STUDY.md)。

---

## ✨ 功能總覽

| 領域 | 功能 |
|------|------|
| **個人目標** | 可編輯目標分數、自填最近成績、考試日期與每段 10 / 15 / 20 / 30 分鐘；顯示倒數、考前提醒，設定包含於備份與跨裝置同步 |
| **分段練習** | 完整日課依可用時間安排休息點，不拆散文章或聽力題組；首頁優先接續未完成練習與待確認解析 |
| **每日練習** | 15–30 分鐘的動態今日教練：先排到期複習，再依弱點組卷；Part 6/7 使用完整文章題組，聽力配比會隨近期表現自適應調整 |
| **錯題本** | 間隔複習（SRS：1 / 3 / 7 / 14 天），連續兩次「跨日」答對才算精熟；可手動分組複習 |
| **單字系統** | 4 階段 SRS 閃卡（new → seen → familiar → mastered）＋ 固定 0.8x 的單字/例句語音（可不限次重播）＋ 單字測驗（英翻中 / 中翻英 / 例句填空），每日目標 20 個新字、答錯當日加強 |
| **模擬考** | Reading 半套（100 題 / 75 分）、Listening 半套（100 題 / 45 分）、完整 TOEIC（200 題 / 120 分） |
| **仿真節奏** | 聽力音檔不可重播；播畢後自動倒數推進（P1/P2 5 秒、P3/P4 8 秒）；作答時不顯示 transcript |
| **考後檢討** | 每次模考留存 snapshot（題目 / 作答 / 正解 / 詳解 / passage / transcript / 媒體 URL），可逐題回顧 |
| **分數預測** | 依 IIBC 公開換算表估算 Listening / Reading / Total 分數範圍，並對照 ETS CEFR 等級 |
| **教練報告** | 正確率、各 Part 表現、作答速度、**錯誤原因分析**、文法弱點補救、明日建議 |
| **跨裝置同步** | 通行密語登入（180 天免重登）後，練習紀錄／錯題 SRS／單字進度／模考結果在所有裝置間自動合併同步；離線照常練、上線自動補推 |
| **資料備份** | 一鍵匯出 / 匯入 JSON，可在不同裝置間搬移學習進度 |

---

## 🚀 快速開始

### 環境需求

- Node.js **20.9+**（Next.js 16 需求）
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
- **儲存**：localStorage 為主；登入後可選擇用 Upstash Redis 做單人跨裝置同步
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
| `/study-plan` | 個人目標、考試倒數與每段訓練時間 |
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

首頁先接回未完成的題目訓練或錯題複習（含待確認解析），沒有進行中的練習時，再依「單字自評 → 單字驗收 → 今日訓練」的完成狀態顯示下一步。`/practice` 再依弱點建立當日計畫，預設組成：

- 到期錯題複習最多 3 題，排在最前面
- 弱點補強 3 題（Part 5，依錯題分析挑最弱文法）＋ 新題 3 題（Part 5）
- Part 6 完整段落 1 組（4 題）、Part 7 完整單篇 1 組（2–4 題）
- 聽力 P1–4（預設 1 P1 + 2 P2 + 1 組 P3 + 1 組 P4）

聽力配比會依「最近 10 題」表現自適應加強（某 Part 正確率 < 60% 且樣本足夠時自動加題），但每日聽力上限維持 12 題，避免弱點多時讓任務失控。

### 學習目標與分段練習

在 `/study-plan` 設定自己的目標分數、選填最近成績與考試日期，並選擇每段可用的題目訓練時間。分段只增加休息點，保留原本全部題目、順序與完整文章／聽力題組；超過時間預算的單一題組仍會完整保留。

作答頁會顯示目前段落、題量與估計時間。看完段末解析可按「看完了，先休息」，首頁會從下一題接續；也可隨時暫停，已送出答案與待確認解析會保留。時間只是估計，不是強制倒數。每日 20 個新字與單字驗收仍須另外安排。

目標分數不會被當成目前能力或保證達標預測。最近成績明確標示為自填；日期用裝置當地日曆計算，考前 14 天、考試日與日期已過會呈現不同提示。

### 錯題本與 SRS

- 答錯進入錯題本，採間隔複習：**1 / 3 / 7 / 14 天**；答對往上爬一階，答錯歸零。
- 「精熟」需連續兩次且**跨日**答對（避免同場短期記憶造成假精熟）。
- 可在 `/wrongbook` 依文法類型分組、手動挑題練習。
- 模考檢討頁可把猜對 / 想重看的題「加入複習」，寫入手動清單但**不**產生假的作答紀錄、不影響正確率。

### 單字系統

- 6 階間隔：**0 / 1 / 3 / 7 / 14 / 30 天**；4 階狀態 new → seen → familiar → mastered。
- 每日 session 分桶：今日加強（retry）/ 到期複習（due）/ 穩定複查（masteredReview）/ 新字（new）；新字固定目標 20，舊字重試最多 10、到期複習最多 5、穩定複查最多 2，避免積欠舊字擠掉新字。
- 單字測驗三型：英翻中 / 中翻英 / 例句填空；**誘答選項優先取同詞性同情境**，避免一眼可刪。例句填空只在例句含字頭原形時出題（填回正解必須還原原句），填空誘答另排除近義字。
- 當日驗收後仍不熟的字可進入「今日加強」最多 2 輪。首頁與單字頁分開顯示「已測／答對／待加強」，完成測驗不等於通過。
- 「已掌握」＝連續答對 ≥3 次且**通過**排程 14 天的那次複習（不是排到 14 天就算）；三種題型都是四選一、填空沿用字卡例句，尚未測量換情境理解與不看選項的回想。
- 到期複習每日核心課表最多 5 字（保留 20 新字偏好），超出的到期字會顯示延後數與最久延後天數，可在 `/vocabulary-quiz?mode=backlog` 分段補做。
- 題後單字可標「這個詞我不熟，加入待學」：有字卡的字提前到今天複習（不改掌握程度），沒有字卡的字保留本題釋義列在單字頁待學清單；待學字優先排入當日 20 新字內。
- 題後單字釋義分五層標示：本題義項（逐題覆寫）／字卡（含詞形還原）／一般釋義／組成詞／待補；未收錄的詞明確標為待補，不假裝有教學。

### 模擬考與檢討

- `/mock-test` 與 `/listening-mock` 共用 `components/MockTestRunner.tsx`，以 `mode` 切換。
- `/full-mock` 使用 `components/FullMockRunner.tsx`，流程固定 Listening → Reading，進入 Reading 後不可返回；離開頁面會被記錄並於成績註記。
- 模考優先抽「沒考過的題」（已出現題 ID 存於 `toeic_mock_seen_ids_v1`，含答對題）。
- 交卷後建立 review snapshot，再把 `reviewSnapshotId` 掛到結果；snapshot 只存精簡題目資料與媒體 URL，不存 audio/image binary。最多保留 20 筆。

### 錯誤原因分析（教練報告）

每題答錯可標記 6 種原因之一：**不會單字 / 文法不懂 / 看不懂（聽不懂）/ 來不及 / 其實會選錯 / 用猜的**。系統會：

- 依新版分段計時（扣除離開分頁、聽力扣音檔）與已學過但不穩的字提出「系統猜測」，未經使用者點選不列入任何統計；沒有紀錄的字不算不會。
- Dashboard 的「自述錯因」只統計最近 30 天使用者自己確認的錯題，滿 8 題才顯示描述句（「最近 30 天你標註的 N 題錯題中，M 題（P%）標為「X」」），並對「文法」類錯誤提供同考點新題補救；補救卡與弱點卡共用同一份證據（只算首次作答的新題）。
- 配速卡只用新版計時，各 Part 未滿 8 筆顯示資料不足；閱讀門檻為常見備考建議（非 ETS 官方），聽力只報音檔結束後的作答時間、不警示。

### 分數預測

- `lib/toeicScoreEstimate.ts` 依 **IIBC 公開參考換算表**把每段 raw（0–100）轉成 scaled 分數範圍；半套模考即等同一個完整 section（100 題）。
- `getTotalRange()` 合併 Listening + Reading（完整模考顯示 10–990 範圍）。
- `getCEFRForSection()` 套用 ETS TOEIC → CEFR section threshold。
- 為非官方方向性預測；真實 TOEIC 會因 ETS equating 有場次差異（UI 已標註免責聲明）。

---

## 📚 題庫與技能分類

- **題庫**：3,303 題，涵蓋 Part 1–7；實際分布與品質門檻以 `pipeline/npm run check` 的最新輸出為準，避免文件數字隨題庫擴充失真。
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
| `toeic_study_profile_v1` | 目標分數、自填成績、考試日期、每段訓練時間 |
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

- `data/questions.ts`：延遲載入的相容組裝入口；查詢、日課、模考與分組位於 `lib/questions/`
- `data/question-bank-manifest.json`：題庫登錄表；新題庫用 `npm run questions -- import <draft.json>` 預覽，加 `--write` 才寫入
- 新增題目、各 Part 草稿、釋義／音檔規則與架構說明：[題庫擴充指南](docs/QUESTION_BANKS.md)
- `data/questions-part5/6/7.ts`、`questions-listening.ts`、`questions-generated.ts`：拆檔題庫（避免 TS union 複雜度上限）
- `data/vocabulary.ts`（手寫核心）+ `vocabulary-generated.ts`（AI 生成）

```bash
cd pipeline
npm run check                        # 資料完整性檢查
npm run check-media                  # 媒體存在性檢查（HEAD 驗證 Blob）
## 新 JSON 題庫使用 questions new 的題組骨架；legacy mark-groups 僅供舊資料維護
```

---

## ✅ 開發與驗證指令

```bash
# 開發
npm run dev            # 開發伺服器
npm run build          # production build
npm run lint           # ESLint
npx tsc --noEmit       # TypeScript 型別檢查

# 完整 QA（根目錄；需先 npm ci 及 npm --prefix pipeline ci）
npm run verify         # 雙套件型別、lint、11 組回歸測試、題庫品質、build
npm --prefix pipeline run check-media  # 媒體變更時另跑

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

- 使用者資料存 browser localStorage；登入同步後另存一份於 Upstash Redis（見下）。
- `pipeline/` 是離線產題工具，不應依賴 Vercel runtime。
- 部署前在 Vercel project Environment Variables 設定 `NEXT_PUBLIC_BLOB_BASE_URL` 與 `BLOB_READ_WRITE_TOKEN`。
- 媒體存於 Vercel Blob，不進 git；`next/image` 會對 Part 1 圖片自動轉 WebP/AVIF。

### 跨裝置同步啟用步驟（一次性）

1. Vercel dashboard → 專案 → Storage/Marketplace 安裝 **Upstash for Redis**（免費 plan）並連到本專案（會自動注入 `KV_REST_API_URL`/`KV_REST_API_TOKEN` 或 `UPSTASH_REDIS_REST_*`，程式兩種名稱都認）。
2. 本機跑 `npx tsx scripts/sync-setup.ts --push-env`：產生通行密語（只顯示一次，存進密碼管理器）、寫入 `.env.local` 並推上 Vercel production env。
3. Redeploy（`vercel --prod` 或 dashboard Redeploy）。
4. 每台裝置開 app → 右上「同步登入」→ 輸入通行密語一次即可（180 天）。
5. 本機開發不裝 Upstash 也能測：dev 模式自動改用 `.sync-dev-store.json` 檔案後備（gitignored）。

同步細節（合併規則、已知限制）見 `AGENTS.md` 的 Cross-Device Sync 段。

### macOS / iCloud 注意

iCloud 可能把檔案變成 `compressed,dataless` placeholder；若 `npm install` / `lint` / `build` 無輸出卡住，先確認 source 完整落地：

```bash
find . -flags +dataless -not -path './node_modules/*' -print
```

部署後至少 smoke test：`/`、`/practice`、`/quiz`、`/mock-test`、`/listening-mock`、`/full-mock`、`/dashboard`、`/wrongbook`、`/vocabulary`、`/vocabulary-quiz`。

---

## 🔒 隱私

未登入時，所有學習資料只存在你的瀏覽器 localStorage，僅有的外部請求是從 Vercel Blob 載入聽力音檔與圖片。登入同步後，學習資料會另存一份到你自己的 Upstash Redis（通行密語保護、僅你可寫）；「清除所有學習紀錄」會連同雲端一起清除（離線時於下次連線清除）。

---

## 📄 授權

個人專案，未附授權條款；如需重用請先聯絡作者。
