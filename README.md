# TOEIC AI Coach

個人多益自學工具，每天 15-30 分鐘練習，local-first Next.js App。
目前支援每日練習、錯題複習、單字 SRS、閱讀/聽力/完整模擬考、考後完整檢討與分數預測。

## 專案目標

- 每日 Part 5/6/7 + 聽力練習，搭配錯題本、手動複習清單與弱點分析
- 錯題採間隔複習（SRS：1/3/7/14 天），連續兩次「跨日」答對才算精熟；錯題本仍可隨時手動分組複習
- 題庫涵蓋完整真考題型：P6 句子插入、P7 字義語境（closest in meaning）/ NOT / 句子定位 / 簡訊對話（含意圖題），難度 A2–C1
- 全題庫答案位置平衡（每選項約 25%，由 pipeline integrity 強制檢查）
- 模擬考優先抽「沒考過的題」；聽力模考音檔播畢後自動倒數推進（P1/P2 5 秒、P3/P4 8 秒），仿真考節奏
- 半套模擬考：
  - Reading：100 題 / 75 分鐘 / Part 5-7
  - Listening：100 題 / 45 分鐘 / Part 1-4
- 完整 TOEIC 模擬考：200 題 / 120 分鐘 / Listening + Reading
- 模考結果使用 IIBC 公開換算表估算 Listening / Reading / Total 分數範圍，並顯示 ETS CEFR 對照
- 模考考後檢討 snapshot：保留本次題目、作答、正解、詳解、passage/transcript/media metadata
- 檢討頁可把猜對或想重看的題目「加入複習」，不污染正確率與模考分數
- 單字閃卡（4 階段 SRS：new → seen → familiar → mastered）
- 單字測驗（英翻中、中翻英、填空）
- Dashboard 分析報告（正確率、速度、錯誤原因、文法補救、弱點、建議）

## 技術棧

- **Framework**: Next.js App Router (Next.js 16)
- **Language**: TypeScript (strict 啟用)
- **UI**: React Client Components + Tailwind CSS
- **Persistence**: browser localStorage（無後端）
- **Package manager**: npm

## 主要 Routes

| Route | 功能 |
|-------|------|
| `/` | 首頁、每日任務總覽 |
| `/practice` | 今日練習計畫 |
| `/quiz` | 作答流程、計時、Passage 顯示 |
| `/mock-test` | Reading 半套模擬考（100 題 / 75 分鐘） |
| `/listening-mock` | Listening 半套模擬考（100 題 / 45 分鐘） |
| `/full-mock` | 完整 TOEIC 模擬考（200 題 / 120 分鐘） |
| `/mock-review/[snapshotId]` | 模考考後完整檢討 |
| `/dashboard` | 個人教練報告、分析 |
| `/wrongbook` | 錯題本、手動加入複習、分組複習 |
| `/vocabulary` | 每日單字閃卡 |
| `/vocabulary-quiz` | 單字測驗（10 題） |

## localStorage Keys

| Key | 用途 |
|-----|------|
| `toeic_answer_records_v1` | 作答紀錄 |
| `toeic_daily_plan_v1` | 每日練習計畫 |
| `toeic_wrong_status_v1` | 錯題本狀態 |
| `toeic_wrong_practice_plan_v1` | 錯題練習計畫 |
| `toeic_manual_review_items_v1` | 從模考檢討手動加入的複習題 |
| `toeic_vocabulary_progress_v1` | 單字進度 |
| `toeic_vocabulary_daily_session_v1` | 每日單字 session |
| `toeic_mock_session_v1` | Reading 模擬考 session |
| `toeic_mock_results_v1` | Reading 模擬考結果 |
| `toeic_listening_mock_session_v1` | Listening 模擬考 session |
| `toeic_listening_mock_results_v1` | Listening 模擬考結果 |
| `toeic_full_mock_session_v1` | 完整模擬考 session |
| `toeic_full_mock_results_v1` | 完整模擬考結果 |
| `toeic_mock_review_snapshots_v1` | 模考考後檢討 snapshot（最多保留 10 筆） |

## 模擬考與檢討

- `/mock-test` 與 `/listening-mock` 共用 `components/MockTestRunner.tsx`，以 `mode` 切換 Reading / Listening。
- `/full-mock` 使用 `components/FullMockRunner.tsx`，流程固定 Listening → Reading。
- 模考交卷後會建立 review snapshot，再把 `reviewSnapshotId` 掛到結果紀錄；舊結果沒有 snapshot 仍可正常顯示。
- Review snapshot 存 compact 題目資料與 media URL，不存 audio/image binary。
- 檢討頁的「加入複習」寫入 `toeic_manual_review_items_v1`，讓猜對題也能進錯題本練習；它不新增假的 `AnswerRecord`，不影響 Dashboard 正確率。
- 手動複習題在 `/wrongbook` 顯示為「手動加入複習」。練習答對會自動移出手動清單；答錯會轉成真正錯題。

## 分數預測

- `lib/toeicScoreEstimate.ts` 依 IIBC 公開參考換算表，把 raw score 轉成 Listening / Reading scaled score range。
- `getTotalRange()` 合併 Listening + Reading，完整模考顯示 Total 10-990 範圍。
- `getCEFRForSection()` 使用 ETS TOEIC → CEFR section threshold。
- 分數為非官方方向性預測；真實 TOEIC 仍會因 IRT calibration / equating 有場次差異。

## 題庫與 Pipeline

- `data/questions.ts`: 題庫聚合 + 輔助函式（getQuestionsByPart, buildDailyPlan, buildMockTestPlan, buildListeningMockPlan）
- `data/questions-part5.ts` / `data/questions-part6.ts` / `data/questions-part7.ts` / `data/questions-listening.ts`: 拆檔後的題庫
- `data/questions-generated.ts`: AI 生成題庫（import 到 QUESTIONS array）
- `data/vocabulary.ts`: 單字題庫
- `pipeline/`: RAG 題目生成 Pipeline（TypeScript, 獨立於 Next.js build）
- `pipeline/src/mark-groups.ts`: Part 6/7 passage group 標記工具

### Pipeline 指令

```bash
cd pipeline
npm run check         # 資料完整性檢查
npx tsx src/mark-groups.ts --write   # 標記 passage group
```

## 開發指令

```bash
npm run dev            # 啟動開發伺服器
npm run build          # production build
npm run lint           # ESLint
npx tsc --noEmit       # TypeScript 檢查
```

## QA 指令

```bash
npm run lint
npx tsc --noEmit
npm run build
cd pipeline && npm run check
cd pipeline && npm run check-media
cd pipeline && npx tsc --noEmit
```

`pipeline check` 除了重複 ID / 缺欄位檢查外，還會強制：

- 各 Part 答案位置分布（四選一題每選項 18–32%；Part 2 每選項 25–42%）
- 題組完整性（P3/P4 transcript 群組必為 3 題、P6 passage 群組必為 4 題）

`pipeline check-media` 依 app 的媒體路徑慣例推導每題應存在的 Blob 檔案，並對
`NEXT_PUBLIC_BLOB_BASE_URL` 逐一 HEAD 驗證（missing > 0 時 exit 1）：

- P1：`images/<id>.jpg` 與 `audio/<id>.mp3`；P2：`audio/<id>.mp3`
- P3/P4：群組音檔掛在同 transcript 群組中 id 最小的題目 `audio/<id>.mp3`
- P3 每題另有題目朗讀 `audio/<id>-q.mp3`（`--verbose` 可列出全部路徑與結果）

## Vercel 部署注意事項

- 全部使用者資料存在 browser localStorage，部署不需要資料庫。
- `pipeline/` 是離線產題工具，不應依賴 Vercel runtime。

### 媒體檔案（C1 以後）

- Audio / image 存在 **Vercel Blob**，不進 git
- 部署前必須在 Vercel project 的 Environment Variables 設定：
  - `NEXT_PUBLIC_BLOB_BASE_URL`
  - `BLOB_READ_WRITE_TOKEN`
- 本地開發如未設定上述變數，UI 會 graceful degrade（無音檔顯示 script，無圖片不顯示）

- macOS/iCloud 可能把檔案變成 `compressed,dataless` placeholder；若 `npm install`、`npm run lint` 或 `npm run build` 無輸出卡住，先執行：

```bash
find . -flags +dataless -not -path './node_modules/*' -print
```

- 確認 source 檔完整落地後再跑：

```bash
npm install
npm run lint
npm run build
cd pipeline && npm run check
```

- 部署後至少 smoke test：`/`, `/practice`, `/quiz`, `/mock-test`, `/listening-mock`, `/full-mock`, `/dashboard`, `/wrongbook`, `/vocabulary`, `/vocabulary-quiz`。
