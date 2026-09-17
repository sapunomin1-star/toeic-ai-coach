"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  DEFAULT_STUDY_MINUTES, getStudyProfile, isStudyProfile, saveStudyProfile,
  STUDY_MINUTES, type StudyMinutes, type StudyProfile,
} from "@/lib/studyProfile";
import StudyGoalCard from "@/components/StudyGoalCard";

export default function StudyPlanPage() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<StudyProfile | null>(null);
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [examDate, setExamDate] = useState("");
  const [minutes, setMinutes] = useState<StudyMinutes>(DEFAULT_STUDY_MINUTES);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = getStudyProfile();
      if (stored) {
        setProfile(stored);
        setTarget(String(stored.targetScore));
        setCurrent(stored.currentScore === null ? "" : String(stored.currentScore));
        setExamDate(stored.examDate ?? "");
        setMinutes(stored.dailyMinutes);
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = {
      targetScore: Number(target),
      currentScore: current.trim() ? Number(current) : null,
      examDate: examDate || null,
      dailyMinutes: minutes,
    };
    if (!isStudyProfile(next)) {
      setError("請填寫 10–990 之間、以 5 分為單位的成績，以及有效的考試日期。");
      return;
    }
    if (!saveStudyProfile(next)) {
      setError("目標尚未儲存。請確認瀏覽器允許儲存資料後再試一次。");
      return;
    }
    setProfile(next);
    setError(null);
    setSaved(true);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-[2rem] bg-[var(--ink)] p-6 text-white sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--signal)]">A plan that fits your life</p>
        <h1 className="text-balance mt-3 text-3xl font-black leading-tight tracking-[-0.04em]">把目標，變成每天做得到的計畫。</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">分數可以調高，步調也可以調整。先設定你現在想達成的下一站。</p>
      </section>

      <form onSubmit={handleSubmit} onChange={() => { setSaved(false); setError(null); }} className="product-surface space-y-6 rounded-[1.75rem] p-5 sm:p-7">
        <fieldset disabled={!ready} className="space-y-6 disabled:opacity-50">
          <legend className="text-lg font-black text-[var(--ink)]">我的備考設定</legend>
          <div className="grid gap-5 pt-4 sm:grid-cols-2">
            <label className="block text-sm font-bold text-[var(--ink)]">
              目標分數 <span className="text-[var(--muted)]">（必填）</span>
              <input type="number" inputMode="numeric" min={10} max={990} step={5} required value={target} onChange={(e) => setTarget(e.target.value)} placeholder="輸入你想挑戰的分數" aria-describedby="score-help" className="mt-2 min-h-12 w-full rounded-xl border border-[var(--line)] bg-white px-4 text-base" />
            </label>
            <label className="block text-sm font-bold text-[var(--ink)]">
              最近成績 <span className="text-[var(--muted)]">（選填）</span>
              <input type="number" inputMode="numeric" min={10} max={990} step={5} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="還沒考過可留空" aria-describedby="score-help" className="mt-2 min-h-12 w-full rounded-xl border border-[var(--line)] bg-white px-4 text-base" />
            </label>
          </div>
          <p id="score-help" className="text-xs leading-5 text-[var(--muted)]">Listening + Reading 總分，10–990 分、以 5 分為單位。最近成績由你填寫，不會當成模考預測。</p>
          <label className="block text-sm font-bold text-[var(--ink)]">
            考試日期 <span className="text-[var(--muted)]">（選填）</span>
            <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} aria-describedby="date-help" className="mt-2 block min-h-12 w-full min-w-0 max-w-full rounded-xl border border-[var(--line)] bg-white px-4 text-base" />
          </label>
          <p id="date-help" className="text-xs leading-5 text-[var(--muted)]">還沒報名也能開始。設定後會顯示倒數，考前兩週提醒你鞏固與檢討。</p>
          <fieldset>
            <legend className="text-sm font-bold text-[var(--ink)]">每次可投入的題目訓練時間</legend>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {STUDY_MINUTES.map((value) => (
                <label key={value} className="relative cursor-pointer">
                  <input type="radio" name="study-minutes" value={value} checked={minutes === value} onChange={() => setMinutes(value)} className="peer sr-only" />
                  <span className="flex min-h-14 items-center justify-center rounded-xl border border-[var(--line)] bg-white text-sm font-bold text-[var(--muted)] peer-checked:border-[var(--ink)] peer-checked:bg-[var(--ink)] peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[var(--brand)]">{value} 分鐘</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs leading-6 text-[var(--muted)]">課表會在完整文章或聽力題組之間安排休息點。時間為估計；較長題組會完整保留。每日 20 個新字與單字驗收另外安排。</p>
          </fieldset>
          {error && <p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}
          <button type="submit" className="min-h-12 w-full rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-black text-white disabled:opacity-50">{ready ? "儲存學習目標" : "正在載入設定…"}</button>
        </fieldset>
        {saved && (
          <div role="status" className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-bold">學習目標已儲存</p>
            <p className="mt-1 text-xs leading-6">下次進入訓練會套用新的分段時間，已完成的答案會保留。</p>
            <Link href="/practice" className="mt-2 inline-flex min-h-11 items-center font-bold underline underline-offset-4">開始今日訓練 →</Link>
          </div>
        )}
      </form>
      {ready && profile && <StudyGoalCard profile={profile} />}
      <p className="px-2 text-center text-xs leading-6 text-[var(--muted)]">設定自動保存在這個裝置，並包含在資料備份中；登入同步後也會同步到其他裝置。</p>
      <Link href="/" className="flex min-h-11 items-center justify-center text-sm font-bold text-[var(--muted)]">← 回到今日總覽</Link>
    </div>
  );
}
