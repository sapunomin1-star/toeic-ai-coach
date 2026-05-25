import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      {/* Goal banner */}
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-md">
        <p className="text-xs uppercase tracking-widest text-indigo-200">
          TOEIC Personal Coach
        </p>
        <h1 className="mt-1.5 text-2xl font-bold leading-snug">
          目標：持續衝高 TOEIC 分數
        </h1>
        <p className="mt-1.5 text-sm text-indigo-100">
          每天 15–30 分鐘。單字 → 文法 → 聽力 → 複習。
        </p>
      </section>

      {/* Primary CTA */}
      <Link
        href="/practice"
        className="block rounded-2xl bg-slate-900 px-5 py-5 text-center text-lg font-semibold text-white shadow-sm active:scale-[0.99]"
      >
        今日訓練 →
      </Link>

      {/* Today's plan at a glance */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          今天要做什麼
        </h2>
        <ol className="space-y-2">
          <PlanStep
            num="1"
            label="每日單字"
            desc="10 個 TOEIC 高頻字（flashcard）"
            href="/vocabulary"
            color="indigo"
          />
          <PlanStep
            num="2"
            label="單字小測驗"
            desc="10 題選擇題，確認是否真的認得"
            href="/vocabulary-quiz"
            color="indigo"
          />
          <PlanStep
            num="3"
            label="今日訓練"
            desc="Part 5 × 15 + Part 6 × 2 + 聽力 P1-4 × 11 + Part 7 × 3 + 錯題複習"
            href="/practice"
            color="slate"
          />
          <PlanStep
            num="4"
            label="個人報告"
            desc="弱點分析 · 速度 · 明日建議"
            href="/dashboard"
            color="violet"
          />
        </ol>
      </section>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-3">
        <Link
          href="/vocabulary"
          aria-label="每日單字"
          className="rounded-2xl border border-indigo-100 bg-white px-3 py-4 text-center shadow-sm active:scale-[0.99]"
        >
          <p className="text-2xl">📚</p>
          <p className="mt-1 text-xs font-semibold">每日單字</p>
        </Link>
        <Link
          href="/vocabulary-quiz"
          aria-label="單字測驗"
          className="rounded-2xl border border-violet-100 bg-white px-3 py-4 text-center shadow-sm active:scale-[0.99]"
        >
          <p className="text-2xl">✏️</p>
          <p className="mt-1 text-xs font-semibold">單字測驗</p>
        </Link>
        <Link
          href="/wrongbook"
          aria-label="錯題本"
          className="rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm active:scale-[0.99]"
        >
          <p className="text-2xl">📖</p>
          <p className="mt-1 text-xs font-semibold">錯題本</p>
        </Link>
      </div>

      <Link
        href="/dashboard"
        className="block rounded-2xl border border-violet-100 bg-white px-4 py-3 text-center text-sm font-medium text-violet-700 shadow-sm active:scale-[0.99]"
      >
        查看個人教練報告 →
      </Link>

      {/* Mock test entries: full exam primary, section mocks secondary */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          模擬考
        </p>
        <Link
          href="/full-mock"
          aria-label="開始完整 TOEIC 模擬考"
          className="block rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 p-5 text-white shadow-md active:scale-[0.99]"
        >
          <p className="text-2xl">🎯</p>
          <p className="mt-2 text-xl font-bold">完整 TOEIC 模擬考</p>
          <p className="mt-1 text-sm font-medium text-indigo-100">
            200 題 / 120 分鐘 / Listening + Reading
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-200">
            最貼近真實考試的完整體驗，含 IIBC 公開換算表預測分數
          </p>
          <p className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs text-indigo-100">
            ⚠️ 建議備好水跟不被打擾的時間再開始
          </p>
          <span className="mt-4 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-indigo-950">
            開始完整模擬考 →
          </span>
        </Link>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/mock-test"
            aria-label="進入閱讀模擬考"
            className="mt-3 block rounded-2xl border border-slate-200 bg-white p-3 shadow-sm active:scale-[0.99]"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400">Reading</p>
            <p className="mt-1 text-sm font-bold text-slate-900">閱讀模考</p>
            <p className="mt-1 text-[11px] text-slate-500">半套 · 100 題 · 75 分鐘</p>
            <p className="mt-2 text-[10px] text-slate-400">Part 5/6/7</p>
          </Link>
          <Link
            href="/listening-mock"
            aria-label="進入聽力模擬考"
            className="mt-3 block rounded-2xl border border-indigo-100 bg-white p-3 shadow-sm active:scale-[0.99]"
          >
            <p className="text-xs uppercase tracking-widest text-indigo-400">Listening</p>
            <p className="mt-1 text-sm font-bold text-slate-900">聽力模考</p>
            <p className="mt-1 text-[11px] text-slate-500">半套 · 100 題 · 45 分鐘</p>
            <p className="mt-2 text-[10px] text-indigo-400">Part 1/2/3/4</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

function PlanStep({
  num,
  label,
  desc,
  href,
  color,
}: {
  num: string;
  label: string;
  desc: string;
  href: string;
  color: "indigo" | "slate" | "violet";
}) {
  const numClass = {
    indigo: "bg-indigo-100 text-indigo-700",
    slate: "bg-slate-100 text-slate-700",
    violet: "bg-violet-100 text-violet-700",
  }[color];

  return (
    <li>
      <Link href={href} className="flex items-start gap-3 active:opacity-70">
        <span
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${numClass}`}
        >
          {num}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
      </Link>
    </li>
  );
}
