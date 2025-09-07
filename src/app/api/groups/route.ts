import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";
  const res = await fetch("http://192.168.1.20/api/groups", {
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
