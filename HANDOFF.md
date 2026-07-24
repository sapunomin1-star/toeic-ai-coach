# 接手現場：跨裝置同步（2026-07-24）

## 目前狀態

- 單人跨裝置同步**已完成實作並 push**（commit `4f7350e`，main，Vercel 自動部署）。
- 6 道 gate 全綠；dev E2E 全過（含「清空 localStorage＝第二裝置」還原測試）。
- 架構、合併矩陣、已知限制：見 `AGENTS.md`「Cross-Device Sync」＋ `DEVELOPMENT_LOG.md` 2026-07-24 條目。
- **唯一未完成：正式環境啟用**，需使用者做兩件事（見下）。做完前 production 的 /login 會回 500（server_config）——這是預期行為，未登入使用完全不受影響。

## 待使用者執行（一次性，約 3 分鐘）

1. Vercel dashboard → toeic-ai-coach → Storage/Marketplace → 安裝 **Upstash for Redis**（免費 plan）連到本專案。
2. 本機終端跑：
   ```bash
   npx tsx scripts/sync-setup.ts --push-env
   ```
   （產生通行密語只印在你終端；自動寫 .env.local ＋推 Vercel production env。）
3. Redeploy：`vercel --prod`（或 dashboard Redeploy）。
4. 手機／其他裝置開 app → 右上「同步登入」→ 輸入密語。

## 接手者注意（已試過／踩過的坑）

- 正式 Upstash 的 **Lua CAS 路徑尚未 live 打過**（本機用 `.sync-dev-store.json` 後備驗證，語意同構）。使用者裝好整合後，第一件事：`vercel env pull` 到暫存檔把 `KV_REST_API_*` 補進 `.env.local`（**不要整檔 pull 覆蓋**，會洗掉 OPENAI/BLOB 手動維護的值——sync-setup 用 patch 就是為了這個），然後重跑一次 curl round-trip（jar 登入 → POST/GET /api/sync → 驗 stale-reject）。
- 登入鎖定（10 次/10 分）在 dev 後備已測邏輯、真 Redis 版未 live 測。
- eslint 新 react-hooks 規則很嚴：不要在 render 寫 ref、不要在 effect body 同步 setState、server 函式不要以 `use` 開頭命名。
- hook `post-edit-verify.sh` 會在多檔編輯批次的中間態誤報 tsc 錯——先把整批編輯下完再看最終 tsc。

## 下一步第一個指令（使用者完成上面兩步後）

```bash
cd ~/Code/toeic-ai-coach && vercel env ls
```
確認 KV_REST_API_*／SYNC_* 都在 → 開 production URL 登入實測兩裝置互同步 → 全過後把本檔案刪除。
