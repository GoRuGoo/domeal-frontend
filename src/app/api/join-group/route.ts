import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();

    const ENDPOINT_URL = process.env.ENDPOINT_URL;
    const res = await fetch(`${ENDPOINT_URL}/api/join-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
