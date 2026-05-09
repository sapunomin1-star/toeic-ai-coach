import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-md">
        <p className="text-xs uppercase tracking-widest text-indigo-100">
          TOEIC Personal Coach
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-snug">
          目前目標：500&nbsp;→&nbsp;700
        </h1>
        <p className="mt-2 text-sm text-indigo-50">
          每天 15–20 分鐘，針對弱點自動安排：詞性判斷、被動語態、時態、聽力理解。
        </p>
      </section>

      <Link
        href="/practice"
        className="block rounded-2xl bg-slate-900 px-5 py-5 text-center text-lg font-semibold text-white shadow-sm active:scale-[0.99]"
      >
        開始今日訓練 →
      </Link>

      <section className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">
          今日單字：10 個 TOEIC 高頻單字
        </p>
        <Link
          href="/vocabulary"
          className="mt-3 block rounded-2xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white active:scale-[0.99]"
        >
          開始背單字
        </Link>
      </section>

      <Link
        href="/wrongbook"
        className="block rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm active:scale-[0.99]"
      >
        <p className="text-2xl">📖</p>
        <p className="mt-1 text-sm font-semibold">查看錯題本</p>
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">今日任務</h2>
        <ul className="mt-2 space-y-1 text-sm text-slate-600">
          <li>💪 弱點補強 10 題（詞性 + 被動）</li>
          <li>📝 新題練習 10 題（其他 Part 5）</li>
          <li>🎧 Part 3/4 聽力 3 題</li>
          <li>🔁 錯題複習最多 5 題</li>
          <li className="mt-1 text-xs text-slate-400">預估 15–20 分鐘完成</li>
        </ul>
      </section>
    </div>
  );
}
