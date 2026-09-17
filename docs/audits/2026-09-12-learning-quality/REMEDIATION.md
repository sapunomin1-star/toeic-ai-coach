# 交付：學習品質審查 F01–F12 完整修正（2026-09-17）

對應 `REVIEW.md`（2026-09-12）。計畫：`PLAN.md`；決策：`../../2026-09-16-學習品質修正決策.md`；修正後基準：`evidence-after.json`（與原 `evidence.json` 同一套量測工具）。

## 做了什麼

十二項發現全部落地為程式、資料與回歸測試；未做的三件事（部署、重生四個 Part 2 音檔、真實使用者成效研究）列在「沒做什麼」。

| 發現 | 修正 | 關鍵檔案 |
| --- | --- | --- |
| F01 填空教錯詞形 | 例句只在含字頭原形時出填空；正解填回必還原原句（1,343 個可出填空例句，0 個不符）；填空干擾項同詞性、排除近義 | `lib/vocabularyStorage.ts` `makeFillBlank`／`buildClozeDistractorPool` |
| F02 67.3% 連結無字卡 | 五層解析（逐題義項→字卡含詞形還原→一般釋義→組成詞→待補）；717 筆通用釋義；pipeline 連結債務 ratchet（基準 3,532 筆，新增即失敗） | `lib/termResolution.ts`、`data/term-glosses.ts`、`pipeline/src/vocabulary-links.ts`、`pipeline/baselines/vocabulary-link-debt.json` |
| F03 找到字卡卻教錯義 | 136 筆逐題義項覆寫（board 董事會、schedule 動詞、order 動詞、issue 問題、address 對…發言…）；UI 先顯示本題義項，再列其他義 | `data/question-senses.ts`、`components/quiz/QuestionVocabulary.tsx` |
| F04 答案唯一性 | p5-ext-032 加 currently 並逐項排除，標 revisedAt（修題前紀錄退出證據）；四題 Part 2 雙解題改為可辯護解析並隔離（不再進課表／模考）；干擾項改寫放在未套用的 patch | `data/questions-part5.ts`、`data/questions-generated.ts`、`data/question-revisions.ts`、`pipeline/patches/p2-answer-uniqueness.json` |
| F05 計時混雜 | 新增 `timing`（可見時間、隱藏分頁、音檔、題組位置）；配速卡只讀新版計時、聽力不警示、題組閱讀平均分攤、未滿 8 筆顯示資料不足；刪除「最慢 Skill」與所有 wall-clock 平均 | `types/question.ts`、`app/quiz/page.tsx`、`lib/pacing.ts`、`components/dashboard/PerformanceSections.tsx` |
| F06 重做抹弱點、兩卡矛盾 | `partitionAttempts` 只算首次作答；弱點、推薦、首頁焦點、文法補強共用 `getSkillEvidence`（樣本、期間、信心） | `lib/analysis.ts`、`lib/dashboardMetrics.ts`、`lib/todayCoach.ts` |
| F07 完成＝通過 | 已測／答對／待加強分開記錄與顯示 | `lib/vocabularyStorage.ts`、`app/page.tsx`、`app/vocabulary/page.tsx` |
| F08 錯因偏差與分母 | 無紀錄的字不算不會；六個原因依考點排序全顯示、系統猜測標示；統計只算 30 天內使用者確認、滿 8 題才描述、文案不承諾分數 | `components/quiz/MistakeReasonChips.tsx`、`lib/analysis.ts`、`components/dashboard/ReasonBreakdownSection.tsx` |
| F09 推薦沒連到訓練 | `buildDailyPlan({ focusSkills })` 題組優先含焦點考點的未見題並回傳 `focus.note`；無證據時標「建立基準」 | `data/questions.ts`、`app/practice/page.tsx`、`app/quiz/page.tsx` |
| F10 題後單字無補強流程 | 「這個詞我不熟，加入待學」→ 待學佇列（新同步 key，union＋tombstone 合併）；有字卡的字提前到今天複習、優先排入 20 新字內；無字卡的字保留本題釋義 | `lib/vocabularyQueue.ts`、`lib/syncMerge.ts`、`app/vocabulary/page.tsx` |
| F11 掌握證據不足 | 通過 14 天間隔那次複習才標 mastered；文案改為真實排程；依題型記錄測到什麼 | `lib/vocabularyStorage.ts` `advanceSchedule`、`components/dashboard/VocabQuizSection.tsx` |
| F12 複習負荷不可見 | 到期字最久逾期優先；顯示延後數與最久延後天數；`mode=backlog` 分段補做；教練在核心任務後提示 | `lib/vocabularyStorage.ts` `getDueBacklog`、`app/vocabulary-quiz/page.tsx`、`lib/todayCoach.ts` |

## 怎麼驗證的（貼證據）

六道 gate（2026-09-17）：

- `./node_modules/.bin/tsc --noEmit` → 無輸出（通過）。
- `npx eslint .` → exit 0。
- `npm run build` → `✓ Compiled successfully`、`✓ Generating static pages (19/19)`，18 個 route 全列出。
- `npm test` → 8 個 script 全過，末行 `Learning quality checks passed: F01 cloze forms, F02/F03 term resolution, F05 timing split, F06 first-attempt evidence, F07 tested≠passed, F08 confirmed-only reasons, F09 focus reaches the plan, F10 vocabulary queue, F11 mastery gap, F12 review backlog.`（輸出中的 QuotaExceededError 是既有測試刻意觸發的配額情境）。
- `cd pipeline && npm run check` → Data Integrity `PASSED`；Question-term Link Report：`Fully resolved 69.6%`、`Questions w/o support 308`、`Debt 3532 now / 3532 baseline · new 0 · retired 0`、`PASSED`。
- `cd pipeline && npx tsx src/check-media.ts` → `Expected 1090 / Found 1090 / Missing 0 / PASSED`。

審查基準前後（同一套量測，`evidence.json` → `evidence-after.json`）：

| 指標 | 審查時 | 修正後 |
| --- | ---: | ---: |
| 連結完整解析率 | 32.7%（3,803 / 11,625） | 69.6%（8,093 / 11,625） |
| 整題零支援 | 1,112 | 308 |
| 未解析連結（債務） | 7,822 | 3,532（其中組成詞部分支援 1,518、待補 2,014） |
| 填空正解填回不符原句 | 78 個候選 | 0 |
| 20 題不同錯＋同題答對 20 次 → 最弱技能 | 空清單 | 詞性判斷 20 / 20（ok），文法補強卡同為 20 |
| 單題答錯 | 列為最弱 Skill | `confidence: insufficient`，UI 標「樣本不足」 |
| 8 確認＋20 inferred 錯因 | 「原因分散」 | 分母 8、「100% 標為文法不懂」，inferred 不計 |
| 1 確認＋7 inferred | 顯示分析 | 未達 8 題，不顯示 |
| 冷啟動 20 秒答錯 → 建議不會單字 | 2,191 題 | 0 題 |
| 舊紀錄 120 秒答錯 → 建議來不及 | 全部閱讀題 | 0 題（舊計時不是配速證據） |
| 20 字全錯 | 首頁「20 / 20 字通過」 | 已測 20 · 答對 0 · 待加強 20 |
| 掌握時點 | 排到 14 天即 mastered | 通過 14 天那次複習才 mastered |
| 20 個到期字 | 選 5，其餘無聲延後 | 選 5，延後 15 顯示，backlog 可補做 15 |

瀏覽器 smoke（本機 dev server，全新 localStorage，2026-09-17）：首頁顯示「0 / 20 字已測」「待確認考點：建立學習基準」；/practice 顯示「建立基準 · 尚無弱點證據」；/quiz 顯示「選題理由：尚無弱點證據…」，答錯 Part 5 被動語態題後：六個錯因以「文法不懂」領頭、無「系統猜測」（冷啟動）；題後單字四個詞分別標「字卡（required → require）」「一般釋義（passengers → passenger）」「字卡」「字卡」與「本題關鍵」；兩個「加入待學」切換成功；/vocabulary 出現「待學清單 · 2 個」且 passengers 標「尚無字卡」；`?mode=backlog` 顯示「沒有延後的到期字」；/dashboard 出現「學習用時與配速觀察」「自述錯因（最近 30 天）」「待確認考點」「累積錯題 Top 5（含重做，非能力排序）」。所有頁面 console 無錯誤。

## 沒做什麼／已知限制

- **未部署**到 Vercel production；**未 push**。
- 四題 Part 2（p2-gen-179／116／136／186）的干擾項改寫在 `pipeline/patches/p2-answer-uniqueness.json`，**未套用**：套用後必須重生四個音檔（OpenAI TTS、覆蓋 Blob），需使用者拍板。在此之前四題不進新課表與模考，錯題本仍可複習（解析已改為誠實說明）。
- 單字連結仍有 3,532 筆債務（2,099 種片語為長尾）；通用釋義是本輪人工撰寫、非逐題審核，UI 標為「一般釋義」。
- 填空題的語意唯一性只靠啟發式降低風險，無法證明；填空仍沿用字卡例句，換情境理解與不看選項回想尚未測量（UI 已明示）。
- 配速門檻是常見備考建議，非 ETS 官方；需累積新版計時紀錄後才會有配速觀察（舊紀錄一律資料不足）。
- 19 個 skill tag 的分類體系未動；F09 只做到「推薦連到選題並誠實回報」。
- 學習成效（未見題表現、跨日保留）沒有真實使用者資料，本輪不能宣稱提分。
- 待學佇列沒有長度上限（決策 6 註明 >50 時再設計清理）。

## 如何使用

```bash
cd /Users/guichenxiang/Code/toeic-ai-coach && npm test
```

```bash
cd /Users/guichenxiang/Code/toeic-ai-coach/pipeline && npm run check
```

- 新題若帶未收錄的 vocabulary 詞，`npm run check` 會失敗並列出；補 `data/term-glosses.ts`、`data/question-senses.ts` 或字卡後再跑。只有債務減少時才用 `npm run check -- --update-baseline` 縮基準。
- 重跑審查基準：`npx tsx scripts/audit-learning-quality.ts`（寫 `evidence-after.json`，不斷言）。
- 套用 Part 2 改寫：`cd pipeline && npx tsx src/apply-p2-uniqueness-patch.ts`，再依輸出逐題 `generate-audio --question <id> --force`，最後從 `data/question-revisions.ts` 移除該 id。

## 下一步選項

- **部署**：`vercel deploy --prod --yes`（全部 gate 已綠；上線後新紀錄才開始帶 timing／attempt）。
- **重生四題 Part 2 音檔並解除隔離**：花費四次 TTS 與覆蓋四個 Blob 檔；完成後題池回復完整。
- **縮減連結債務**：用 pipeline LLM 生成 2,014 個待補詞與 2,099 種片語的釋義再人工審核（有費用），或持續手寫高頻項。
