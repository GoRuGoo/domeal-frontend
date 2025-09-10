"use client";

import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BiHome } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { PiForkKnifeFill } from "react-icons/pi";
import { User } from "../type";

interface FooterProps {
  user: User;
  setUser: (u: User) => void;
}

export function Footer({ user, setUser }: FooterProps) {
  const router = useRouter();

  return (
    <Box
      as="footer"
      width="100%"
      height="70px"
      backgroundColor="white"
      py={4}
      px={6}
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
        {/* Home メニュー */}
        <Button
          variant="ghost"
          bg="white"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => router.push("/")}
        >
          <Flex direction="column" alignItems="center" cursor="pointer">
            <Icon as={BiHome} w={5} h={5} color="#EFB034FF" />
            <Text fontSize="sm" mt={1} color="#EFB034FF">
              Home
            </Text>
          </Flex>
        </Button>

        {/* Profile メニュー */}
        <Button
          variant="ghost"
          bg="white"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => console.log("Home clicked")}
        >
          <Flex direction="column" alignItems="center" cursor="pointer">
            <Icon as={PiForkKnifeFill} w={5} h={5} color="#EFB034FF" />
            <Text fontSize="sm" mt={1} color="#EFB034FF">
              Room
            </Text>
          </Flex>
        </Button>

        {/* Profile メニュー */}
        <Button
          variant="ghost"
          bg="white"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => {
            setUser(user);
            router.push("/profile");
          }}
        >
          <Flex direction="column" alignItems="center" cursor="pointer">
            <Icon as={IoPersonOutline} w={5} h={5} color="#EFB034FF" />
            <Text fontSize="sm" mt={1} color="#EFB034FF">
              Profile
            </Text>
          </Flex>
        </Button>
      </Flex>
    </Box>
  );
}
