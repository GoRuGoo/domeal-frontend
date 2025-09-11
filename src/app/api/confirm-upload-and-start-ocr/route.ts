import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();

    const ENDPOINT_URL = process.env.ENDPOINT_URL;
    const res = await fetch(
      `${ENDPOINT_URL}/api/confirm-upload-and-start-ocr`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to get signed URL" },
        { status: 500 },
      );
    }

    const { message, receipt_id, status } = await res.json();
    return NextResponse.json({ message, receipt_id, status });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
