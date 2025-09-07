import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsBell } from "react-icons/bs";
import { PiForkKnifeFill } from "react-icons/pi";

interface HeaderProps {
  icon: string;
}

export function Header({ icon }: HeaderProps) {
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
          width="40px"
          height="40px"
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
          <BsBell size="40px" />
          {/* 丸い形のインジケータ */}
          <Image
            width="40px"
            height="40px"
            borderRadius="10px"
            src={icon}
            alt={icon}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
