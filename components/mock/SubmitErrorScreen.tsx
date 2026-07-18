"use client";

import Link from "next/link";

/**
 * Shared submit-failure screen for every mock runner. Shown when the compact
 * exam result could not be written to localStorage; the active session is
 * intentionally preserved so the student can retry without losing answers.
 */
export default function SubmitErrorScreen({
  submitError,
  onRetry,
}: {
  submitError: string | null;
  onRetry: () => void;
}) {
  return (
    <div className="space-y-4 py-6">
      <section role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <h1 className="text-lg font-bold text-rose-900">成績尚未儲存</h1>
        <p className="mt-2 text-sm leading-relaxed text-rose-800">
          {submitError ?? "成績寫入失敗，但本次作答仍保留。"}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-rose-700">
          請勿清除所有學習紀錄或重新開始模考，否則這次保留的進度也會被刪除。
        </p>
      </section>
      <button
        type="button"
        onClick={onRetry}
        className="block w-full rounded-2xl bg-slate-900 px-5 py-4 text-center text-base font-semibold text-white"
      >
        重試儲存成績
      </button>
      <Link
        href="/"
        className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-600"
      >
        稍後再處理（保留本次進度）
      </Link>
    </div>
  );
}
