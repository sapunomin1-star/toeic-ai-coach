import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOEIC AI Coach",
  description: "每天 15–30 分鐘，持續衝高 TOEIC 分數。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
            <Link href="/" className="text-base font-semibold tracking-tight">
              TOEIC <span className="text-indigo-600">AI Coach</span>
            </Link>
            <nav className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <Link href="/vocabulary" className="hover:text-slate-900">
                每日單字
              </Link>
              <Link href="/dashboard" className="hover:text-slate-900">
                個人教練報告
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-md px-4 pb-24 pt-4">{children}</main>
      </body>
    </html>
  );
}
