# 歷史暫停點（2026-09-17，已恢復）

> 使用者後續明確要求「繼續完成全部」。以下僅保留暫停時快照，不是當前阻擋；現況見 [COMPLETION-2026-09-17.md](./COMPLETION-2026-09-17.md)。

使用者已要求「幫我完成全部」，範圍為剩餘單字連結、四題 Part 2 與音檔、驗證、commit／push／部署；隨後明確要求暫停。**目前停止，等待使用者要求繼續，沒有排程或背景生成工作。**

## 已保留

- 前一輪複查修正仍在工作樹，見 `FOLLOWUP-2026-09-17.md`；其六道 gate 與瀏覽器檢查已通過。本次新內容尚未重新驗證。
- 3,532 筆連結債務對應 3,150 個不同詞語。
- 新增 `pipeline/src/complete-term-glosses.ts`：以題目語境產生釋義、獨立模型審稿、逐批 checkpoint，完成審查前不寫入正式詞庫。
- 第 1 批 30 個詞的 draft 已保存在忽略目錄 `pipeline/output/term-completion/000-ddddf8f2f3a8dc2407c8.draft.json`；完整輸入是同目錄 `inputs.json`，共 105 批。
- DeepSeek 生成成功；Kimi 審稿回 HTTP 401，程序已結束。只記錄狀態，未印出密鑰。恢復後先處理審稿 provider／驗證配置，不能跳過審核直接套用。
- 四題 Part 2 patch 已修正後套用到本機 `data/questions-generated.ts`。額外修正 p2-gen-136 的「用品已到」間接肯定，以及 p2-gen-186 的「下週的貨」間接否定風險。**四題仍在 DISPUTED_QUESTIONS，音檔尚未生成；不得現在解除隔離。**

## 恢復後順序

1. 檢查以上 checkpoint 和工作樹，恢復釋義生成／審稿；審閱內容後才 `--apply` 並接入 lazy vocabulary support。保留來源與審稿證據，補品質檢查，將 debt baseline 收斂為零。
2. 四題音檔使用新版本路徑，避免在正式部署前覆蓋現有音檔造成文音不一致；新增安全的版本化輸出選項，生成前 dry-run。核對逐字稿與可播放性，再補 audioUrl、revisedAt、解除隔離及相關測試。
3. 完整 gate、瀏覽器測試、文件；commit／push 當前分支，再部署既有 Vercel 專案並驗證正式網址。不要建立新平台／專案。

## 環境

- 分支：`agent/product-design-upgrade`；origin：`https://github.com/sapunomin1-star/toeic-ai-coach.git`。
- Vercel CLI 已登入，專案 `toeic-ai-coach`；正式別名既有 `https://toeic-ai-coach-ten.vercel.app`。
- pipeline 所需 API／Blob 變數已設定（值未列出）；「已設定」不保證 token 有效，Kimi 401 待處理。
- 使用 `npm_config_cache=/tmp/toeic-npm-cache` 避免全域 cache 權限問題。
- 本次沒有 commit、push、部署或上傳音檔。無 subagent；不要在使用者暫停期间自行恢復。
