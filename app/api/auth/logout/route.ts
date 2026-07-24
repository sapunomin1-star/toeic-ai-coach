import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  checkSameOrigin,
  sessionCookieOptions,
} from "@/lib/server/auth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!checkSameOrigin(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return res;
}
