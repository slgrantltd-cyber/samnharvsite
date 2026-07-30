import { NextRequest, NextResponse } from "next/server";

/**
 * Deal Book sync — GET returns the shared book, PUT replaces it.
 * Storage: Upstash Redis via REST (provisioned as Vercel KV / Upstash in
 * the dashboard; KV_REST_API_URL and KV_REST_API_TOKEN env vars).
 * Auth: the shared passphrase in the x-book-key header must match the
 * BOOK_PASSPHRASE env var. Two users, one book — simple by design.
 */

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const PASS = process.env.BOOK_PASSPHRASE;
const KEY = "samnharv:deal-book";

const authed = (req: NextRequest) =>
  Boolean(PASS) && req.headers.get("x-book-key") === PASS;

const kvReady = () => Boolean(KV_URL && KV_TOKEN);

export async function GET(req: NextRequest) {
  if (!kvReady()) return NextResponse.json({ error: "sync-not-configured" }, { status: 503 });
  if (!authed(req)) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const res = await fetch(`${KV_URL}/get/${KEY}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    cache: "no-store",
  });
  const data = (await res.json()) as { result: string | null };
  return NextResponse.json(data.result ? JSON.parse(data.result) : { contacts: [], deals: [] });
}

export async function PUT(req: NextRequest) {
  if (!kvReady()) return NextResponse.json({ error: "sync-not-configured" }, { status: 503 });
  if (!authed(req)) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const body = await req.json();
  if (!Array.isArray(body?.contacts) || !Array.isArray(body?.deals)) {
    return NextResponse.json({ error: "bad-book" }, { status: 400 });
  }
  await fetch(`${KV_URL}/set/${KEY}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json({ ok: true });
}
