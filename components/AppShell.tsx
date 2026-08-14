"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SyncProvider from "@/components/SyncProvider";
import SyncStatusChip from "@/components/SyncStatusChip";
import { isFocusRoute, isWithinRoute } from "@/lib/focusRoutes";

const MOCK_ROUTES = ["/mock-test", "/listening-mock", "/full-mock"] as const;

const PRIMARY_NAV = [
  { href: "/", label: "首頁", icon: "01" },
  { href: "/practice", label: "今日", icon: "02" },
  { href: "/vocabulary", label: "單字", icon: "Aa" },
  { href: "/wrongbook", label: "錯題", icon: "↺" },
  { href: "/dashboard", label: "報告", icon: "↗" },
] as const;

const NAV_ROUTE_ALIASES: Record<string, readonly string[]> = {
  "/vocabulary": ["/vocabulary", "/vocabulary-quiz"],
  "/dashboard": ["/dashboard", "/mock-review"],
};

function isCurrentRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href;
  return (NAV_ROUTE_ALIASES[href] ?? [href]).some((route) =>
    isWithinRoute(pathname, route),
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFocusFlow = isFocusRoute(pathname);
  const isMockFlow = MOCK_ROUTES.some((route) => isWithinRoute(pathname, route));
  const isWidePage = pathname === "/" || pathname === "/dashboard";

  const mainClassName = isMockFlow
    ? "app-main app-main--mock mx-auto min-h-dvh w-full max-w-5xl"
    : isFocusFlow
      ? "app-main app-main--focus mx-auto min-h-dvh w-full max-w-2xl px-4 sm:px-6"
      : `app-main app-main--standard mx-auto w-full px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8 ${
          isWidePage ? "max-w-6xl" : "max-w-3xl"
        }`;

  return (
    <>
      <a href="#main-content" className="skip-link">
        跳到主要內容
      </a>

      {!isFocusFlow && (
        <header className="app-header sticky top-0 z-20 border-b border-black/5 bg-[color:var(--canvas-translucent)] backdrop-blur-xl">
          <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              aria-label="TOEIC AI Coach 首頁"
              className="group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl"
            >
              <span
                aria-hidden="true"
                className="relative grid h-9 w-9 place-items-center rounded-xl bg-[var(--ink)] text-xs font-black tracking-tight text-white shadow-[0_8px_24px_rgba(24,33,27,0.18)] transition-transform group-hover:-rotate-3"
              >
                T<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
              </span>
              <span className="leading-none">
                <span className="block text-sm font-black tracking-[-0.02em] text-[var(--ink)]">
                  TOEIC AI
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Personal coach
                </span>
              </span>
            </Link>
            <nav
              aria-label="主要導覽"
              className="hidden items-center gap-1 rounded-2xl border border-black/5 bg-white/70 p-1 shadow-sm md:flex"
            >
              {PRIMARY_NAV.map((item) => {
                const isCurrent = isCurrentRoute(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center rounded-xl px-3 text-xs font-bold transition-colors ${
                      isCurrent
                        ? "bg-[var(--ink)] text-white shadow-sm"
                        : "text-[var(--muted)] hover:bg-white hover:text-[var(--ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex min-w-0 items-center justify-end">
              <SyncStatusChip />
            </div>
          </div>
        </header>
      )}

      <main id="main-content" tabIndex={-1} className={mainClassName}>
        <SyncProvider>{children}</SyncProvider>
      </main>

      {!isFocusFlow && (
        <nav
          aria-label="主要導覽"
          className="app-bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 shadow-[0_-10px_40px_rgba(24,33,27,0.08)] backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto grid max-w-lg grid-cols-5 px-2 pt-1">
            {PRIMARY_NAV.map((item) => {
              const isCurrent = isCurrentRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`relative flex min-h-14 min-w-11 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition-colors ${
                    isCurrent
                      ? "text-[var(--ink)]"
                      : "text-[var(--muted)] hover:bg-[var(--canvas)] hover:text-[var(--ink)]"
                  }`}
                >
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="absolute top-0 h-0.5 w-6 rounded-full bg-[var(--brand)]"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`flex h-5 items-center justify-center leading-none ${
                      item.icon.length > 1 ? "text-[10px] tracking-[-0.04em]" : "text-base"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
