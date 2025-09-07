import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();
    console.log(body);
    const res = await fetch("http://192.168.1.20/api/create-group", {
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
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
