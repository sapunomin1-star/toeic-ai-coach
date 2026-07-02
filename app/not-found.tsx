import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-10 text-center">
      <p className="text-4xl" aria-hidden="true">
        🔍
      </p>
      <h1 className="text-lg font-bold text-slate-900">找不到這個頁面</h1>
      <p className="text-sm text-slate-500">
        網址可能已變更或輸入錯誤。
      </p>
      <div className="mx-auto max-w-xs pt-2">
        <Link
          href="/"
          className="block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white active:scale-[0.99]"
        >
          回首頁
        </Link>
      </div>
    </div>
  );
}
