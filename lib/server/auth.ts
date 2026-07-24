import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { getAccessCodeHash, getSessionSecret } from "@/lib/server/syncEnv";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: { N: number; r: number; p: number },
) => Promise<Buffer>;

export const SESSION_COOKIE = "toeic_sync_session";
const SESSION_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;

export async function verifyAccessCode(code: string): Promise<boolean> {
  const { N, r, p, salt, hash } = getAccessCodeHash();
  const derived = await scryptAsync(code, salt, hash.length, { N, r, p });
  return derived.length === hash.length && timingSafeEqual(derived, hash);
}

export async function issueSessionJwt(): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("owner")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      algorithms: ["HS256"],
    });
    return payload.sub === "owner";
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

/**
 * CSRF belt-and-braces on top of SameSite=Lax: when a browser sends an
 * Origin header it must match the request host. Header-less clients (curl,
 * same-origin GET) pass — the cookie is the real gate.
 */
export function checkSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
