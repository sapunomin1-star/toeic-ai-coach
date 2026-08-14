import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import AppShell from "@/components/AppShell";
import "./globals.css";

const SITE_TITLE = "TOEIC AI Coach｜把有限時間換成看得見的進步";
const SITE_DESCRIPTION =
  "依到期複習、近期弱點與完成進度，安排每天 15–30 分鐘的可解釋 TOEIC 學習處方。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  const protocol = forwardedProtocol === "https" ? "https" : "http";
  const forwardedHost = requestHeaders
    .get("x-forwarded-host")
    ?.split(",")[0]
    .trim();
  const requestHost = forwardedHost ?? requestHeaders.get("host") ?? "localhost:3000";
  const safeHost = /^[a-z0-9.-]+(?::\d+)?$/i.test(requestHost)
    ? requestHost
    : "localhost:3000";
  const metadataBase = new URL(`${protocol}://${safeHost}`);
  const socialImage = new URL("/og.png", metadataBase);

  return {
    metadataBase,
    applicationName: "TOEIC AI Coach",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: "TOEIC AI Coach",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: socialImage,
          width: 1731,
          height: 909,
          alt: "TOEIC AI Coach：把今天有限的時間，換成看得見的進步。",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#18211b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
