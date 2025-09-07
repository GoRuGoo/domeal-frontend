"use client";

import { Button } from "@chakra-ui/react";

export default function LoginButton() {
    const handleLineLogin = async () => {
      try {
        const res = await fetch("/api/line-auth");
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
      bg="#06C755"
      color="white" 
      _hover={{ bg: '#05B84B' }}
      size="lg"
      py={6}
      px={10}
      borderRadius="md"
    >
      LINEでログイン
    </Button>
  );
}