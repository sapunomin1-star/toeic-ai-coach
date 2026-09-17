import type { MistakeReason, Part, SkillTag } from "@/types/question";
import {
  MISTAKE_REASONS,
  MISTAKE_REASON_LABELS,
  getPartSection,
  getSkillCategory,
} from "@/types/question";

function reasonLabel(reason: MistakeReason, part: Part): string {
  if (reason === "comprehension" && getPartSection(part) === "listening") {
    return "聽不懂";
  }
  return MISTAKE_REASON_LABELS[reason];
}

/**
 * Order the six reasons by what the item actually tests, so the likely cause
 * is never hidden behind a fold: a grammar item leads with 文法不懂, a
 * listening item with 聽不懂 (review F08). All six are always visible.
 */
export function reasonOrderFor(skillTag: SkillTag): MistakeReason[] {
  switch (getSkillCategory(skillTag)) {
    case "grammar":
      return ["grammar", "vocab", "careless", "comprehension", "speed", "guess"];
    case "vocabulary":
      return ["vocab", "grammar", "careless", "comprehension", "speed", "guess"];
    case "listening":
      return ["comprehension", "vocab", "careless", "guess", "speed", "grammar"];
    case "reading":
      return ["comprehension", "vocab", "speed", "careless", "grammar", "guess"];
    default:
      return [...MISTAKE_REASONS];
  }
}

function ReasonChip({
  reason,
  part,
  active,
  suggested,
  onSelect,
}: {
  reason: MistakeReason;
  part: Part;
  active: boolean;
  suggested: boolean;
  onSelect: (reason: MistakeReason) => void;
}) {
  const label = reasonLabel(reason, part);
  return (
    <label
      className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-indigo-500 ${
        active
          ? "border-indigo-500 bg-indigo-600 text-white shadow-sm"
          : suggested
            ? "border-dashed border-indigo-400 bg-white text-indigo-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
      }`}
    >
      <input
        type="radio"
        name="mistake-reason"
        value={reason}
        checked={active}
        onChange={() => onSelect(reason)}
        aria-label={suggested && !active ? `${label}（系統猜測，尚未確認）` : label}
        className="sr-only"
      />
      {label}
      {suggested && !active && (
        <span className="ml-1 text-[10px] font-medium text-indigo-500">系統猜測</span>
      )}
    </label>
  );
}

export default function MistakeReasonChips({
  part,
  skillTag,
  inferredReason,
  selectedReason,
  onSelect,
}: {
  part: Part;
  skillTag: SkillTag;
  inferredReason: MistakeReason | null;
  selectedReason: MistakeReason | null;
  onSelect: (reason: MistakeReason) => void;
}) {
  const order = reasonOrderFor(skillTag);
  // The system's guess goes first so it is easy to confirm — or to reject.
  const reasons = inferredReason
    ? [inferredReason, ...order.filter((reason) => reason !== inferredReason)]
    : order;

  return (
    <section
      role="radiogroup"
      aria-label="這題為什麼錯"
      className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 shadow-sm"
    >
      <p className="text-sm font-semibold text-slate-900">
        這題為什麼錯？（你選的原因才會進入統計）
      </p>
      <p className="mt-1 text-xs text-indigo-700">
        {inferredReason && !selectedReason
          ? "系統依作答時間與單字紀錄猜了一個，未確認前不列入任何統計；請點選最符合的原因，不確定也可以不選。"
          : "不確定可以不選；選了會用來安排補強與統計自述原因。"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {reasons.map((reason) => (
          <ReasonChip
            key={reason}
            reason={reason}
            part={part}
            active={selectedReason === reason}
            suggested={selectedReason === null && inferredReason === reason}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
