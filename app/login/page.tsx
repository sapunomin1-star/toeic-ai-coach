"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import {
  disableSync,
  enableSync,
  getServerSyncStatus,
  getSyncStatus,
  initialPull,
  subscribeSyncStatus,
} from "@/lib/syncEngine";

export default function LoginPage() {
  const router = useRouter();
  const status = useSyncExternalStore(
    subscribeSyncStatus,
    getSyncStatus,
    getServerSyncStatus,
  );
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      if (res.ok) {
        enableSync();
        await initialPull();
        router.replace("/");
        return; // stay busy through the navigation
      }
      if (res.status === 401) setError("通行密語不正確。");
      else if (res.status === 429) setError("嘗試次數過多，請 10 分鐘後再試。");
      else if (res.status === 500) setError("伺服器尚未設定同步（缺少環境變數）。");
      else setError("登入失敗，請稍後再試。");
    } catch {
      setError("無法連線，請確認網路後再試。");
    }
    setBusy(false);
  }

  async function handleLogout(): Promise<void> {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Cookie clearing failed (offline) — still stop syncing locally.
    }
    disableSync();
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-6 pb-24 pt-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">跨裝置同步</h1>
        <p className="text-sm text-slate-500">
          登入後，練習紀錄、錯題本與單字進度會在你的所有裝置之間同步。
          未登入時 app 照常單機使用。
        </p>
      </header>

      {status === "disabled" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="sync-code" className="text-sm font-medium text-slate-700">
            通行密語
          </label>
          <input
            id="sync-code"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="min-h-12 rounded-xl border border-slate-300 px-3 text-base tracking-wider focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
          {error && (
            <p role="alert" className="text-sm text-rose-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || code.trim().length === 0}
            className="min-h-12 rounded-xl bg-indigo-600 text-base font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {busy ? "登入中…" : "登入並開始同步"}
          </button>
          <p className="text-xs text-slate-400">
            通行密語由 scripts/sync-setup.ts 產生；每台裝置輸入一次，180 天內免重登。
          </p>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            這台裝置已啟用同步。練習後會自動上傳，開啟 app 時會自動取回最新進度。
          </p>
          <button
            type="button"
            onClick={handleLogout}
            disabled={busy}
            className="min-h-12 rounded-xl border border-slate-300 text-base font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed"
          >
            {busy ? "登出中…" : "登出（此裝置停止同步）"}
          </button>
          <p className="text-xs text-slate-400">
            登出只停止這台裝置的同步，雲端與其他裝置的資料不受影響。
          </p>
        </div>
      )}
    </div>
  );
}
