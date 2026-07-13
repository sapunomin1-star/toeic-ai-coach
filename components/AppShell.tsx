"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const FOCUS_ROUTES = [
  "/quiz",
  "/mock-test",
  "/listening-mock",
  "/full-mock",
] as const;

const MOCK_ROUTES = ["/mock-test", "/listening-mock", "/full-mock"] as const;

const PRIMARY_NAV = [
  { href: "/", label: "首頁", icon: "⌂" },
  { href: "/practice", label: "今日", icon: "▶" },
  { href: "/vocabulary", label: "單字", icon: "A" },
  { href: "/wrongbook", label: "錯題", icon: "↺" },
  { href: "/dashboard", label: "報告", icon: "▥" },
] as const;

const NAV_ROUTE_ALIASES: Record<string, readonly string[]> = {
  "/vocabulary": ["/vocabulary", "/vocabulary-quiz"],
  "/dashboard": ["/dashboard", "/mock-review"],
};

function isWithinRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function isCurrentRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === href;
  return (NAV_ROUTE_ALIASES[href] ?? [href]).some((route) =>
    isWithinRoute(pathname, route),
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFocusFlow = FOCUS_ROUTES.some((route) => isWithinRoute(pathname, route));
  const isMockFlow = MOCK_ROUTES.some((route) => isWithinRoute(pathname, route));

  const mainClassName = isMockFlow
    ? "app-main app-main--mock mx-auto min-h-dvh w-full max-w-5xl"
    : isFocusFlow
      ? "app-main app-main--focus mx-auto min-h-dvh w-full max-w-md px-4"
      : "app-main app-main--standard mx-auto w-full max-w-md px-4 pt-4";

  return (
    <>
      <a href="#main-content" className="skip-link">
        跳到主要內容
      </a>

      {!isFocusFlow && (
        <header className="app-header sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-md items-center justify-between gap-2 px-4 py-1.5">
            <Link
              href="/"
              aria-label="TOEIC AI Coach 首頁"
              className="inline-flex min-h-11 shrink-0 items-center rounded-lg text-base font-semibold tracking-tight"
            >
              TOEIC&nbsp;<span className="text-indigo-600">AI Coach</span>
            </Link>
            <nav
              aria-label="頁首快速連結"
              className="flex min-w-0 items-center gap-1 text-xs font-medium text-slate-500"
            >
              <Link
                href="/vocabulary"
                aria-current={
                  isCurrentRoute(pathname, "/vocabulary") ? "page" : undefined
                }
                className={`inline-flex min-h-11 items-center rounded-lg px-1.5 hover:text-slate-900 ${
                  isCurrentRoute(pathname, "/vocabulary") ? "text-indigo-700" : ""
                }`}
              >
                每日單字
              </Link>
              <Link
                href="/dashboard"
                aria-current={
                  isCurrentRoute(pathname, "/dashboard") ? "page" : undefined
                }
                className={`inline-flex min-h-11 items-center rounded-lg px-1.5 hover:text-slate-900 ${
                  isCurrentRoute(pathname, "/dashboard") ? "text-indigo-700" : ""
                }`}
              >
                個人報告
              </Link>
            </nav>
          </div>
        </header>
      )}

      <main id="main-content" tabIndex={-1} className={mainClassName}>
        {children}
      </main>

      {!isFocusFlow && (
        <nav
          aria-label="主要導覽"
          className="app-bottom-nav fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 shadow-[0_-4px_18px_rgba(15,23,42,0.06)] backdrop-blur"
        >
          <div className="mx-auto grid max-w-md grid-cols-5 px-2 pt-1">
            {PRIMARY_NAV.map((item) => {
              const isCurrent = isCurrentRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex min-h-14 min-w-11 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[11px] font-medium transition-colors ${
                    isCurrent
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-5 items-center justify-center text-base font-semibold leading-none"
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
