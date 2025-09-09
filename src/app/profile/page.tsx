"use client";

import { Flex, Image, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Footer } from "../components/footer";
import { useUserStore } from "../type";

export default function Profile() {
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);

  const [paypalName, setPaypalName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaypalName(e.target.value);
  };

  if (!user) return;

  return (
    <Flex direction="column" align="center" minH="100vh" pt="40%">
      {/* プロフィール画像と名前 */}
      <Flex direction="column" align="center" mb={10}>
        <Image
          boxSize="100px"
          borderRadius="full"
          src={user.picture}
          alt={user.name}
          mb={6}
        />
        <Text fontSize="lg" fontWeight="bold">
          {user.name}
        </Text>
      </Flex>

      {/* PayPal 登録 */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="80%"
        maxW="400px"
        mb={8}
      >
        <Text mr={3} whiteSpace="nowrap" fontWeight="bold">
          PayPal登録
        </Text>
        <Input
          border="1px solid"
          value={paypalName}
          onChange={handleInputChange}
          placeholder="PayPalアカウント名"
        />
      </Flex>

      {/* フッター */}
      <Footer user={user} setUser={setUser} />
    </Flex>
  );
}
