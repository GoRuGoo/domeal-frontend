"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Text fontSize="2xl" fontWeight="bold">
        ログイン処理中です...
      </Text>
    </Flex>
  );
}
