import { NextResponse, type NextRequest } from "next/server";
import { checkSameOrigin, isAuthorized } from "@/lib/server/auth";
import { pushChanges, readAll } from "@/lib/server/redis";
import {
  MAX_FIELD_BYTES,
  SYNC_KEYS,
  isValidSyncChange,
  type SyncChange,
} from "@/lib/syncShared";

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const items = await readAll();
    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error("[sync] read failed:", e);
    return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!checkSameOrigin(req)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const changes = (body as { changes?: unknown })?.changes;
  if (!Array.isArray(changes) || changes.length > SYNC_KEYS.length) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const valid: SyncChange[] = [];
  for (const change of changes) {
    if (!isValidSyncChange(change)) {
      return NextResponse.json({ error: "bad_change" }, { status: 400 });
    }
    if (change.v !== undefined && change.v.length > MAX_FIELD_BYTES) {
      return NextResponse.json(
        { error: "payload_too_large", key: change.key },
        { status: 413 },
      );
    }
    valid.push(change);
  }

  try {
    const rejected = await pushChanges(valid);
    return NextResponse.json(
      { rejected },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error("[sync] write failed:", e);
    return NextResponse.json({ error: "storage_unavailable" }, { status: 503 });
  }
}
