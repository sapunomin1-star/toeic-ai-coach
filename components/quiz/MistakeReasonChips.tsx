import type { MistakeReason, Part } from "@/types/question";
import {
  MISTAKE_REASON_LABELS,
  getPartSection,
} from "@/types/question";

const PRIMARY_REASON_ORDER: MistakeReason[] = [
  "speed",
  "vocab",
  "careless",
  "grammar",
  "comprehension",
  "guess",
];

function reasonLabel(reason: MistakeReason, part: Part): string {
  if (reason === "comprehension" && getPartSection(part) === "listening") {
    return "聽不懂";
  }
  return MISTAKE_REASON_LABELS[reason];
}

function primaryReasons(inferredReason: MistakeReason | null): MistakeReason[] {
  const reasons: MistakeReason[] = [];
  if (inferredReason) reasons.push(inferredReason);
  for (const reason of PRIMARY_REASON_ORDER) {
    if (reasons.length >= 3) break;
    if (!reasons.includes(reason)) reasons.push(reason);
  }
  return reasons;
}

function ReasonChip({
  reason,
  part,
  active,
  onSelect,
}: {
  reason: MistakeReason;
  part: Part;
  active: boolean;
  onSelect: (reason: MistakeReason) => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => onSelect(reason)}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 ${
        active
          ? "border-indigo-500 bg-indigo-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800"
      }`}
    >
      {reasonLabel(reason, part)}
    </button>
  );
}

export default function MistakeReasonChips({
  part,
  inferredReason,
  selectedReason,
  onSelect,
}: {
  part: Part;
  inferredReason: MistakeReason | null;
  selectedReason: MistakeReason | null;
  onSelect: (reason: MistakeReason) => void;
}) {
  const activeReason = selectedReason ?? inferredReason;
  const primary = primaryReasons(inferredReason);
  const secondary = PRIMARY_REASON_ORDER.filter((reason) => !primary.includes(reason));

  return (
    <section
      role="radiogroup"
      aria-label="這題為什麼錯"
      className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 shadow-sm"
    >
      <p className="text-sm font-semibold text-slate-900">
        這題為什麼錯?(幫你安排複習)
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {primary.map((reason) => (
          <ReasonChip
            key={reason}
            reason={reason}
            part={part}
            active={activeReason === reason}
            onSelect={onSelect}
          />
        ))}
      </div>

      {secondary.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-medium text-indigo-700">
            其他原因 ⌄
          </summary>
          <div className="mt-2 flex flex-wrap gap-2">
            {secondary.map((reason) => (
              <ReasonChip
                key={reason}
                reason={reason}
                part={part}
                active={activeReason === reason}
                onSelect={onSelect}
              />
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
