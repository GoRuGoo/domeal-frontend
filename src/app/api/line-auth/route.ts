import { NextResponse } from "next/server";

export async function GET() {
  // 環境変数はサーバーサイドでのみ利用可能
  const clientId = process.env.LINE_CLIENT_ID;
  const redirectUri = process.env.LINE_REDIRECT_URI;
  const state = Math.random().toString(36).substring(2);

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: "環境変数が設定されていません" },
      { status: 500 },
    );
  }

  const authorizeUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=profile%20openid`;

  // JSONレスポンスとして認証URLを返す
  return NextResponse.json({ authorizeUrl });
}
