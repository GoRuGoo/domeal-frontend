import { Box, Flex, Text } from "@chakra-ui/react";
import { BsBell } from "react-icons/bs";
import { PiForkKnifeFill } from "react-icons/pi";

export function Header() {
  return (
    <Box width="100%" padding={6} height="100px" position="relative">
      <Flex
        position="absolute"
        top="30px"
        left="20px"
        alignItems="center"
        width="calc(100% - 40px)"
        justifyContent="space-between"
      >
        {/* 既存のフォークとナイフのアイコンと背景Box */}
        <Box
          width="50px"
          height="50px"
          padding="0px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#5D4108FF"
          background="#EFB034FF"
          opacity={1}
          border="none"
          borderRadius="8px"
          gap="0px"
        >
          <PiForkKnifeFill size="32px" />
        </Box>

        {/* do!meal テキスト */}
        <Text fontSize="2xl" fontWeight="bold" ml={4}>
          {" "}
          {/* 左にマージンを追加 */}
          do!meal
        </Text>

        {/* ベルアイコンと丸い形のグループ */}
        <Flex alignItems="center" gap={4}>
          <BsBell size="24px" />
          {/* 丸い形のインジケータ */}
          <Box width="24px" height="24px" borderRadius="full" bg="#F06A6AFF" />
        </Flex>
      </Flex>
    </Box>
  );
}
