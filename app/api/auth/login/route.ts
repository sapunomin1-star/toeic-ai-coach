import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  checkSameOrigin,
  issueSessionJwt,
  sessionCookieOptions,
  verifyAccessCode,
} from "@/lib/server/auth";
import {
  clearLoginFailures,
  getLoginFailures,
  recordLoginFailure,
} from "@/lib/server/redis";

const MAX_LOGIN_FAILURES = 10;

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!checkSameOrigin(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let code: unknown;
  try {
    ({ code } = (await req.json()) as { code?: unknown });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (typeof code !== "string" || code.length === 0 || code.length > 200) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const failures = await getLoginFailures();
  if (failures !== null && failures >= MAX_LOGIN_FAILURES) {
    return NextResponse.json({ error: "locked" }, { status: 429 });
  }

  let valid = false;
  try {
    valid = await verifyAccessCode(code);
  } catch (e) {
    console.error("[sync] login misconfigured:", e);
    return NextResponse.json({ error: "server_config" }, { status: 500 });
  }

  if (!valid) {
    await recordLoginFailure();
    return NextResponse.json({ error: "invalid_code" }, { status: 401 });
  }

  await clearLoginFailures();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await issueSessionJwt(), sessionCookieOptions());
  return res;
}
