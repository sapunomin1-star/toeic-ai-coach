# 接手現場：學習品質審查 F01–F12 修正（2026-09-17 完成）

工作已完成並交付，見 `REMEDIATION.md`（做了什麼／證據／限制／下一步）。這份檔案保留給接手者的兩件事：

## 尚未拍板的下一步（需使用者決定）

- 部署到 Vercel production（`vercel deploy --prod --yes`）；本輪未部署、未 push。
- 套用 `pipeline/patches/p2-answer-uniqueness.json`（`cd pipeline && npx tsx src/apply-p2-uniqueness-patch.ts`），重生 p2-gen-179／116／136／186 的音檔（`generate-audio --question <id> --force`，OpenAI TTS＋覆蓋 Blob），再從 `data/question-revisions.ts` 的 `DISPUTED_QUESTIONS` 移除。
- 是否用 pipeline LLM 批次生成剩餘 3,532 筆連結債務的釋義（有費用，需人工審核）。

## 已試過但失敗（別重蹈）

- Bash heredoc 內含 NUL 字元的跳脫寫法會被核准對話框判為控制字元 → 分隔符改用 `|`。
- root 端 script 以 CJS 執行：不能 top-level `await import`，`pipeline/src` 模組頂層不能用 `import.meta.url` → 靜態 import；baseline 路徑由 `pipeline/run-integrity.ts` 解析後傳入。
- `ConstructorParameters<typeof Date>` 會讓 `args.length === 0` 被 TS2367 擋 → `...args: unknown[]` 再 cast。
- 30KB 以上的檔案用 `cat -n` 會被存成檔案 → 直接用 Read。
- `preview_start` 只認 session 原始工作目錄下的 `.claude/launch.json`（本 session 為 Desktop）→ 改用背景 `npm run dev`＋`navigate`。
