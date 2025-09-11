"use client";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginStatusResponse } from "./type";
import HomeClient from "./home-client";

export default function HomePage() {
  const router = useRouter();
  const [data, setData] = useState<LoginStatusResponse | null>(null);

  useEffect(() => {
    const login = async () => {
      try {
        const res = await fetch("/api/check-login-status", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
        }

        const data: LoginStatusResponse = await res.json();

        if (!data.is_logged_in || !data.user) {
          router.push("/login");
        }

        setData(data);
      } catch (error) {
        console.error("ログイン状態の確認中にエラーが発生しました:", error);
        redirect("/login");
      }
    };

    login();
  }, [router]);

  return data?.is_logged_in && <HomeClient user={data.user!} />;
}
