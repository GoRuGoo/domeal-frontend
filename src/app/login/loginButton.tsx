"use client";

import { Button, Image, Text } from "@chakra-ui/react";

export default function LoginButton() {
  const handleLineLogin = async () => {
    try {
      const res = await fetch("/rest/line-auth");
      const data = await res.json();

      if (data.authorizeUrl) {
        window.location.href = data.authorizeUrl;
      } else {
        console.error("認証URLが返ってきませんでした:", data);
      }
    } catch (error) {
      console.error("LINE認証URL取得に失敗しました:", error);
    }
  };

  return (
    <Button
      onClick={handleLineLogin}
      justifyContent="center"
      bg="#06C755" // 基本色
      color="white" // 文字色・ロゴ色（有効時）
      _hover={{
        bg: "rgba(6, 199, 85, 0.9)", // hover: base + #000000 10%不透明度を rgba で再現
      }}
      _active={{
        bg: "rgba(6, 199, 85, 0.7)", // press: base + #000000 30%不透明度を rgba で再現
      }}
      _disabled={{
        bg: "white", // 無効時背景
        color: "rgba(30, 30, 30, 0.2)", // 文字色/ロゴ（無効）
        borderColor: "rgba(229, 229, 229, 0.6)", // 枠線（無効）
      }}
      border={"1px solid rgba(0,0,0,0.08)"} // 縦線/枠線
      borderRadius="md"
      size="lg"
      py={6}
      px={10}
    >
      <Image src="/line_44.png" alt="/line_44.png" boxSize="24px" />
      <Text fontWeight="bold">LINEでログイン</Text>
    </Button>
  );
}
