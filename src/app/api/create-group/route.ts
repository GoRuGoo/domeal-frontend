import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();
    const ENDPOINT_URL = process.env.ENDPOINT_URL;
    const res = await fetch(`${ENDPOINT_URL}/rest/create-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie, // 認証用
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.error },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
