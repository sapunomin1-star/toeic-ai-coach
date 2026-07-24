"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getServerSyncStatus,
  getSyncStatus,
  subscribeSyncStatus,
  type SyncStatus,
} from "@/lib/syncEngine";

const CHIP_STYLES: Record<Exclude<SyncStatus, "disabled">, string> = {
  syncing: "border-slate-200 bg-slate-50 text-slate-500",
  synced: "border-emerald-200 bg-emerald-50 text-emerald-700",
  offline: "border-amber-200 bg-amber-50 text-amber-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
};

const CHIP_LABELS: Record<Exclude<SyncStatus, "disabled">, string> = {
  syncing: "同步中…",
  synced: "已同步",
  offline: "離線",
  error: "同步異常",
};

export default function SyncStatusChip() {
  const status = useSyncExternalStore(
    subscribeSyncStatus,
    getSyncStatus,
    getServerSyncStatus,
  );

  if (status === "disabled") {
    return (
      <Link
        href="/login"
        className="inline-flex min-h-11 items-center rounded-lg px-1.5 hover:text-slate-900"
      >
        同步登入
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      aria-label={`同步狀態：${CHIP_LABELS[status]}`}
      className="inline-flex min-h-11 items-center px-0.5"
    >
      <span
        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] leading-4 ${CHIP_STYLES[status]}`}
      >
        {CHIP_LABELS[status]}
      </span>
    </Link>
  );
}
