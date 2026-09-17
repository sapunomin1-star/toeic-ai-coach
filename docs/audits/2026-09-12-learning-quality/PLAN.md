# 計畫：學習品質審查 12 項發現之完整修正（2026-09-16）

## 目標與完成標準
把 REVIEW.md 的 F01–F12 全部落地為程式、資料與驗證，讓「答案品質 → 單字語境 → 計時與技能證據 → 補強流程」可信。
完成標準：
- 6 道 gate 全綠（tsc / eslint / build / npm test / pipeline check / check-media）。
- 新增 `scripts/learning-quality-check.ts` 納入 `npm test`，逐項斷言 REVIEW.md 的驗收條件（合成紀錄，不碰真實學習資料）。
- 審查程式改為「修正後基準」輸出 `evidence-after.json`，不再以缺陷為斷言。
- 文件落地：AGENTS.md 規則段、DEVELOPMENT_LOG.md、決策紀錄、REMEDIATION.md 交付報告。

## 非目標（這次明確不做）
- 第四批「真實使用者學習成效驗證」：需要真實資料與研究設計，程式碼做不到。
- 重寫 19 個 skill tag 的分類體系（REVIEW 明言不急著新增標籤）。
- 以付費 API 批次生成 7,822 筆單字釋義／重生成音檔：涉及費用與覆蓋既有媒體，列為下一步選項，等使用者拍板。
- 部署到 Vercel production：對外動作，等使用者拍板。

## 量測依據（2026-09-16 實測，scratchpad/measure.ts）
- 11,625 筆連結：精確 3,803；詞形還原可多解 647；仍缺 7,163（單字 4,255 筆／1,845 種；片語 2,908 筆／2,099 種）。整題零命中 1,112 → 903。
- 缺失單字覆蓋曲線：前 300 種涵蓋 2,180 筆（51%）、前 500 種 2,716 筆（64%）。
- 精確命中但詞性疑似衝突：165 筆（heuristic），人工複核後估約 110 筆為真（order／schedule／board／position／delay／access／resume／update／purchase／screen／issue…）。
- Part 5 三單現在式＋過去式干擾＋無時間線索：3 題，僅 p5-ext-032 真有歧義。
- Part 2 解析用「直接回答」當判準：21 題；逐題閱讀後真有雙解的 4 題（p2-gen-179／116／136／186），皆已有音檔。

## 階段
1. 計畫與決策骨架 → 產出本檔＋`docs/2026-09-16-學習品質修正決策.md` → 驗證：檔案存在。
2. 單字系統修正（F01／F07／F11／F12）→ `lib/vocabularyStorage.ts`、`types/vocabulary.ts`、`app/vocabulary*`、`lib/todayCoach.ts`、`app/page.tsx`、`lib/dashboardMetrics.ts` → 驗證：tsc＋新 check 的 F01/F07/F11/F12 斷言。
3. 單字連結與語境義（F02／F03）→ `lib/vocabularyResolver.ts`、`data/term-glosses.ts`、`data/question-senses.ts`、`components/quiz/QuestionVocabulary.tsx`、pipeline `checkVocabularyLinks`＋baseline → 驗證：pipeline check 綠、四個 F03 案例斷言、coverage 數字。
4. 題目品質（F04）→ 修 p5-ext-032；4 題 Part 2 解析重寫；`pipeline/patches/p2-answer-uniqueness.json`（未套用，需重生音檔）；`data/question-revisions.ts`（revisedAt／disputed）；plan／mock 排除 disputed；分析排除修題前紀錄 → 驗證：pipeline check、斷言。
5. 計時與證據（F05／F06／F08）→ `types/question.ts`（timing／attempt 欄位，皆 optional）、`app/quiz/page.tsx`、`lib/analysis.ts`、`lib/pacing.ts`、dashboard 元件、`MistakeReasonChips.tsx` → 驗證：斷言（背景停留不計、聽力不判慢、同題重做不抹弱點、分母一致、冷啟動不判不會）。
6. 推薦連到訓練（F09）→ `data/questions.ts` focus 選題、`app/practice/page.tsx`、`app/page.tsx` 文案 → 驗證：斷言（focus 題組可追溯或坦白無題）。
7. 候學佇列（F10）→ 新 key `toeic_vocabulary_queue_v1`（STORAGE_KEYS／BACKUP_KEYS／SYNC_KEYS／sanitize／merge／clear）、`lib/vocabularyQueue.ts`、QuestionVocabulary 勾選、vocabulary 頁佇列區 → 驗證：sync-merge-check、斷言。
8. 回歸與稽核基準 → `scripts/learning-quality-check.ts` 入 `npm test`；`scripts/audit-learning-quality.ts` 改為報告；瀏覽器 smoke（/quiz、/dashboard、/vocabulary、/practice）→ 驗證：6 gate 全綠。
9. 文件與 git → AGENTS.md、DEVELOPMENT_LOG.md、README、REMEDIATION.md、決策紀錄；先 commit 前一輪未提交的 study-plan 工作，再 commit 本輪 → 驗證：`git status` 乾淨。

## 風險與回退
- localStorage schema：所有新欄位 optional，validator 接受舊資料；回退＝還原檔案，舊資料不受影響。
- 新同步 key：照 studyProfile 前例逐處登記；sync-merge-check 會擋漏登記。
- 大量資料檔（glosses／senses）：分檔避免 TS2590；透過 lazy loader 載入，不進首屏 bundle。
- 題目文字更動只做無音檔影響的（Part 5 與解析）；Part 2 干擾項改寫放 patch 檔不套用。

## 使用者已拍板的決定（紅線）
- 每日 20 新字偏好不變（REVIEW／AGENTS 均記錄）。
- 不拆 login／sync；不動媒體路徑慣例。
- 本輪計畫未經使用者事前核可（autonomous 模式）；所有取捨寫入決策紀錄供事後翻案。

## 執行狀態（2026-09-17）

1–9 階段全部完成；六道 gate 全綠；瀏覽器 smoke 通過。證據與限制見 `REMEDIATION.md`。未做：部署、四題 Part 2 音檔重生（patch 未套用）、真實使用者成效研究。
