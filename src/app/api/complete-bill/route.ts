import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const billId = req.url.split("bill_id=")[1];
  if (!billId) {
    return NextResponse.json({ error: "Missing bill_id" }, { status: 400 });
  }

  const ENDPOINT_URL = process.env.ENDPOINT_URL;
  try {
    const backendRes = await fetch(
      `${ENDPOINT_URL}/rest/complete-bill?bill_id=${billId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: req.headers.get("cookie") || "", // 認証Cookieを転送
        },
      }
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
