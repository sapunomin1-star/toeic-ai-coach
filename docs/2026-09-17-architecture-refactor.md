# 題庫擴充架構重構

本輪依「程式碼更簡潔、未來加題或加整份題庫更好下手」的要求，整理資料登錄、查詢、每日與模考選題、匯入與驗證的依賴。使用方式見 [題庫擴充指南](QUESTION_BANKS.md)。

## 已完成

- `data/questions.ts` 從 675 行改為 23 行的組裝入口。純演算法移至 `lib/questions/`，由 `createQuestionBank` 注入資料來源，測試可以使用小型題庫。
- 11 個既有來源改由 manifest 統一登錄，保留既有順序。ID 與 Part 以 Map 建索引，新增來源查詢 `bankIds`；前端的延遲載入 API 不變。
- 新增 `questions new/list/import/check/sync` 指令。Part 1–7 都有草稿，完整題組自動建立骨架。匯入預設預覽，明確 `--write` 才新增 JSON、登錄表、靜態匯入檔，不覆蓋既有題庫。
- JSON／LLM 共用 runtime schema，pipeline 題目型別直接沿用主程式 `Question`。保留既有 generator API，閱讀與聽力擴充的寫檔統一使用同一個 writer。
- 匯入前檢查格式、題組、全域 ID／來源歸屬、答案品質與單字連結。格式錯誤或題庫衝突會在落盤前被拒絕。
- `npm run verify` 串起雙套件型別、lint、11 組隔離回歸測試、pipeline 與 build；測試使用 lockfile 中的 tsx。增加靜態依賴檢查，防止大型題庫誤入首屏 bundle。

既有 3,303 題、題目 ID、題目順序與學習紀錄格式保持一致。單字 SRS、同步、錯因、內容修訂與音檔不可重播規則沒有更換。沒有生成或新增正式題目；新增的草稿和測試資料只用於驗證，不登錄進正式題庫。

## 驗證證據

基準版本為 `e8c5283`。在更動前與完成後，以相同的 25 個亂數 seed 各執行預設日課、含焦點／複習／已見題的日課、閱讀模考與聽力模考，共 100 個計畫。序列化結果與題庫內容 SHA-256 都完全一致；查詢結果亦一致。指紋程式為 `scripts/question-bank-parity.ts`，結果保存於 [refactor evidence](2026-09-17-refactor-evidence.json)。這是本次重構的歷史證據，不是阻擋將來增加題目的固定測試基線。

| 檢查 | 結果 |
| --- | --- |
| root + pipeline TypeScript | 通過 |
| ESLint | 通過 |
| 回歸測試 | 11 組通過，包含新匯入與延遲載入邊界 |
| pipeline 完整性 | 3,303 題，零違規 |
| 單字連結 | 11,625 個連結完整支援，零債務 |
| 媒體 HEAD | 1,090 / 1,090 |
| production build | Next.js 16.3.5；19 / 19 |
| CLI 流程 | Part 6 草稿、拒絕未完成草稿、Part 5 預覽、臨時目錄實際寫入並載入 generated registry 通過 |
| 本機瀏覽器 | 13 個頁面／模式、P6/P7 完整作答、P3 計時、待學加入／移除、390px 無溢出、零 console error |
| 閱讀模考 | 實際建立 100 題、作答、交卷、100 題詳解與未作答標示通過 |
| npm audit | 主程式與 pipeline 均為零已知漏洞 |

套件安裝時查出既有 Next.js／sharp 安全公告，故更新至 Next.js 16.3.5、sharp 0.35.4，並更新受影響的相容範圍內間接依賴。參考 [Next.js 官方安全公告](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4) 與 [sharp 官方安全公告](https://github.com/lovell/sharp/security/advisories/GHSA-rgj7-g3m4-5g8c)。升級後重新完成全部 gate 和瀏覽器檢查。

## 範圍與取捨

這次聚焦於阻礙題庫擴充的實際依賴，沒有為了縮短檔案任意拆開已驗證的 SRS 或同步狀態機。歷史 PDF 擷取與一次性資料修補工具保留；往後的新題庫可直接走統一 JSON 入口。CLI 檢查不取代人工審題或媒體驗證，也沒有呼叫付費 AI 服務。

## 已部署

2026-09-17 已推送程式 commit `4845c2d`，Vercel deployment `dpl_2hAAsfPrUGtxMWYhKLZbvmjRJFNg` 為 Ready，正式網址 [toeic-ai-coach-ten.vercel.app](https://toeic-ai-coach-ten.vercel.app)。雲端同樣通過題庫預檢、TypeScript 與正式建置。

上線後以全新測試瀏覽器走過 13 個頁面／模式、P6/P7 完整作答、P3 計時、待學加入／移除、新釋義與 Part 2 內容版本標記，console errors 為零；390px 手機無橫向溢出。測試未登入同步，不影響使用者資料。
