import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";

    const ENDPOINT_URL = process.env.ENDPOINT_URL;
    const res = await fetch(`${ENDPOINT_URL}/rest/get-user-bill`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie, // 認証Cookieを渡す
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch bills" },
        { status: res.status }
      );
    }

    const bills = await res.json();
    return NextResponse.json(bills);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "INternal server error" },
      { status: 500 }
    );
  }
}
