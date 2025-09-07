import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginStatusResponse } from "./type";
import HomeClient from "./home-client";

export default async function HomePage() {
  const checkLoginStatusApi = process.env.LINE_CHECK_LOGIN_STATUS_URI as
    | string
    | "";
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session_id");

  try {
    const response = await fetch(checkLoginStatusApi, {
      headers: {
        Cookie: sessionCookie
          ? `${sessionCookie.name}=${sessionCookie.value}`
          : "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("APIから無効なレスポンスが返されました");
    }

    const data: LoginStatusResponse = await response.json();
    if (!data.is_logged_in) {
      redirect("/login");
    }

    const user = data.user!;
    return <HomeClient user={user} />;
  } catch (error) {
    console.error("ログイン状態の確認中にエラーが発生しました:", error);
    redirect("/login");
  }
}
