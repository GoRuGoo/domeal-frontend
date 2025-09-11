import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();

    const ENDPOINT_URL = process.env.ENDPOINT_URL;
    const res = await fetch(`${ENDPOINT_URL}/api/issue-signed-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to get signed URL" },
        { status: 500 },
      );
    }

    const {
      upload_url: UploadURL,
      file_key: FileKey,
      receipt_id: ReceiptID,
    } = await res.json();
    return NextResponse.json({ UploadURL, FileKey, ReceiptID });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
