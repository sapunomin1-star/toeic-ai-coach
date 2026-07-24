import { NextResponse, type NextRequest } from "next/server";
import { isAuthorized } from "@/lib/server/auth";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json(
    { authenticated: await isAuthorized(req) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
