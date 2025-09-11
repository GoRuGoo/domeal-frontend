import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsBell } from "react-icons/bs";
import { PiForkKnifeFill } from "react-icons/pi";

interface HeaderProps {
  icon: string;
}

export function Header({ icon }: HeaderProps) {
  return (
    <Box width="100%" padding={6} height="100px" position="relative">
      {/* 中央テキスト */}
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="2xl"
        fontWeight="bold"
      >
        do!meal
      </Text>

      {/* 左右アイコン */}
      <Flex
        position="absolute"
        top="30px"
        left="20px"
        width="calc(100% - 40px)"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          width="40px"
          height="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#5D4108FF"
          background="#EFB034FF"
          borderRadius="8px"
        >
          <PiForkKnifeFill size="32px" />
        </Box>

        <Flex alignItems="center" gap={4}>
          <BsBell size="40px" />
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
