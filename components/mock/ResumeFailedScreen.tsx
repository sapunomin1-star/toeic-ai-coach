"use client";

import Link from "next/link";

/**
 * Shown when an unfinished mock session exists but the question-bank chunk
 * failed to load, so the session cannot be restored yet. The session stays
 * untouched in localStorage; this screen deliberately replaces the preview so
 * the (destructive) start button is not the only affordance.
 */
export default function ResumeFailedScreen({ examLabel }: { examLabel: string }) {
  return (
    <div className="space-y-4 py-6">
      <section
        role="alert"
        className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
      >
        <h1 className="text-lg font-bold text-amber-900">
          偵測到未完成的{examLabel}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-amber-800">
          題庫載入失敗，暫時無法恢復進度。你的作答仍安全保留，請確認網路後重試。
        </p>
      </section>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white"
      >
        重試載入
      </button>
      <Link
        href="/"
        className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600"
      >
        返回首頁（保留進度）
      </Link>
    </div>
  );
}
