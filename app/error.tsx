"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Route error boundary:", error);
  }, [error]);

  return (
    <div className="space-y-4 py-10 text-center">
      <p className="text-4xl" aria-hidden="true">
        😵
      </p>
      <h1 className="text-lg font-bold text-slate-900">頁面發生錯誤</h1>
      <p className="text-sm text-slate-500">
        學習紀錄仍安全保存在瀏覽器中，重試通常就能恢復。
      </p>
      <div className="mx-auto flex max-w-xs flex-col gap-3 pt-2">
        <button
          onClick={reset}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white active:scale-[0.99]"
        >
          重試
        </button>
        <Link
          href="/"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600"
        >
          回首頁
        </Link>
      </div>
    </div>
  );
}
