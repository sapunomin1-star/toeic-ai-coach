# TOEIC AI Coach

個人多益自學工具，每天 15-30 分鐘練習，local-first Next.js App。

## 專案目標

- 每日 Part 5/6/7 + 聽力練習，搭配錯題本與弱點分析
- 100 題模擬考（Part 5/6/7 閱讀測驗）
- 單字閃卡（4 階段 SRS：new → seen → familiar → mastered）
- 單字測驗（英翻中、中翻英、填空）
- Dashboard 分析報告（正確率、速度、弱點、建議）

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
| `/mock-test` | 100 題模擬考（75 分鐘） |
| `/dashboard` | 個人教練報告、分析 |
| `/wrongbook` | 錯題本、分組複習 |
| `/vocabulary` | 每日單字閃卡 |
| `/vocabulary-quiz` | 單字測驗（10 題） |

## localStorage Keys

| Key | 用途 |
|-----|------|
| `toeic_answer_records_v1` | 作答紀錄 |
| `toeic_daily_plan_v1` | 每日練習計畫 |
| `toeic_wrong_status_v1` | 錯題本狀態 |
| `toeic_wrong_practice_plan_v1` | 錯題練習計畫 |
| `toeic_vocabulary_progress_v1` | 單字進度 |
| `toeic_mock_session_v1` | 模擬考 session |
| `toeic_mock_results_v1` | 模擬考結果（最多 20 筆） |

## 題庫與 Pipeline

- `data/questions.ts`: 主題庫 + 輔助函式（getQuestionsByPart, buildDailyPlan, buildMockTestPlan）
- `data/questions-generated.ts`: AI 生成題庫（import 到 QUESTIONS array）
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
```

## Vercel 部署注意事項

- 全部使用者資料存在 browser localStorage，部署不需要資料庫。
- `pipeline/` 是離線產題工具，不應依賴 Vercel runtime。
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

- 部署後至少 smoke test：`/`, `/practice`, `/quiz`, `/mock-test`, `/dashboard`, `/wrongbook`, `/vocabulary`, `/vocabulary-quiz`。
