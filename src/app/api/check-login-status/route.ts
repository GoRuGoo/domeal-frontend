import { LoginStatusResponse } from "@/app/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const checkLoginStatusApi = process.env.LINE_CHECK_LOGIN_STATUS_URI as
    | string
    | "";

  try {
    const res = await fetch(checkLoginStatusApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "", // 認証Cookieを転送
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { loggedIn: false, message: "ログインに失敗しました" },
        { status: 401 },
      );
    }

    const data: LoginStatusResponse = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Failed to login:", error);
    return NextResponse.json(
      { loggedIn: false, message: "サーバーエラー" },
      { status: 500 },
    );
  }
}
