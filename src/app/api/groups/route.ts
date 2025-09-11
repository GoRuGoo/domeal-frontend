import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";
  const ENDPOINT_URL = process.env.ENDPOINT_URL;
  const res = await fetch(`${ENDPOINT_URL}/api/groups`, {
    headers: {
      Cookie: cookie,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
