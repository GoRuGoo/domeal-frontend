import { NextResponse } from "next/server";

export async function GET() {
  // 環境変数はサーバーサイドでのみ利用可能
  const state = Math.random().toString(36).substring(2);

  const authorizeUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2008051780&redirect_uri=https://d1in1s8jr6qwmk.cloudfront.net/rest/line-callback&state=${state}&scope=profile%20openid`;

  // JSONレスポンスとして認証URLを返す
  return NextResponse.json({ authorizeUrl });
}
