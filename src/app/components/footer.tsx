"use client";

import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";

export function Footer() {
  return (
    <Box
      as="footer"
      width="100%"
      height="70px"
      py={4}
      px={6}
      mb={2}
      position="fixed"
      bottom="0"
      zIndex="10"
    >
      <Flex
        justifyContent="space-around"
        alignItems="center"
        maxWidth="container.md"
        mx="auto"
      >
        {/* Room メニュー */}
        <Flex direction="column" alignItems="center" cursor="pointer">
          <Icon as={BiHome} w={5} h={5} color="#EFB034FF" />
          <Text fontSize="sm" mt={1} color="#EFB034FF">
            Home
          </Text>
        </Flex>

        {/* 請求選択 メニュー */}
        <Flex direction="column" alignItems="center" cursor="pointer">
          <Icon as={PiForkKnifeFill} w={5} h={5} color="#EFB034FF" />
          <Text fontSize="sm" mt={1} color="#EFB034FF">
            Room
          </Text>
        </Flex>

        {/* Profile メニュー */}
        <Flex direction="column" alignItems="center" cursor="pointer">
          <Icon as={IoPersonOutline} w={5} h={5} color="#EFB034FF" />
          <Text fontSize="sm" mt={1} color="#EFB034FF">
            Profile
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
