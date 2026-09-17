import Link from "next/link";
import { daysUntilExam, getGoalGuidance, type StudyProfile } from "@/lib/studyProfile";

export default function StudyGoalCard({ profile }: { profile: StudyProfile | null }) {
  const days = profile ? daysUntilExam(profile.examDate) : null;
  const guidance = profile ? getGoalGuidance(profile) : null;
  return (
    <section aria-label="我的學習目標" className="product-surface rounded-[1.75rem] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--brand)]">My next milestone</p>
          <h2 className="mt-1 text-lg font-black text-[var(--ink)]">
            {profile ? <>朝 <span className="number-tabular text-[var(--brand)]">{profile.targetScore}</span> 分前進</> : "你的目標，值得一份自己的計畫"}
          </h2>
        </div>
        <Link href="/study-plan" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--canvas)] px-4 text-xs font-bold text-[var(--ink)]">
          {profile ? "調整學習目標" : "設定我的目標"} <span aria-hidden="true">↗</span>
        </Link>
      </div>
      {profile && (
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[var(--ink)]">
          <span className="rounded-lg bg-blue-50 px-3 py-2">每段 {profile.dailyMinutes} 分鐘</span>
          <span className="rounded-lg bg-[var(--canvas)] px-3 py-2">
            {days === null ? "尚未設定考試日" : days < 0 ? "考試日期待更新" : days === 0 ? "今天考試" : `距考試 ${days} 天`}
          </span>
          {profile.currentScore !== null && <span className="rounded-lg bg-[var(--canvas)] px-3 py-2">自填最近成績 {profile.currentScore} 分</span>}
        </div>
      )}
      <p className="text-pretty mt-3 text-xs leading-6 text-[var(--muted)]">
        {guidance ? <><span className="font-bold text-[var(--ink)]">{guidance.label} · </span>{guidance.detail}</> : "告訴教練目標分數、考試日期與可用時間。忙碌時分段練習，進度隨時接續。"}
      </p>
    </section>
  );
}
