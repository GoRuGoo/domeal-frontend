"use client";

import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { ImEarth } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";

export function Footer() {
  return (
    <Box
      as="footer"
      width="100%"
      height="70px"
      py={4}
      px={6}
      bg="gray.100"
      borderTop="1px solid"
      borderColor="gray.200"
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
          <Icon as={BiHome} w={6} h={6} color="#EFB034FF" />
          <Text fontSize="sm" mt={1} color="#EFB034FF">
            Room
          </Text>
        </Flex>

        {/* 請求選択 メニュー */}
        <Flex direction="column" alignItems="center" cursor="pointer">
          <Icon as={ImEarth} w={6} h={6} color="#EFB034FF" />
          <Text fontSize="sm" mt={1} color="#EFB034FF">
            請求選択
          </Text>
        </Flex>

        {/* Profile メニュー */}
        <Flex direction="column" alignItems="center" cursor="pointer">
          <Icon as={IoPersonOutline} w={6} h={6} color="#EFB034FF" />
          <Text fontSize="sm" mt={1} color="#EFB034FF">
            Profile
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
