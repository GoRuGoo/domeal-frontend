"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { RecipeListProps } from "../type";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RecipeList({ groups, userId }: RecipeListProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [menu, setMenu] = useState("");
  const url = "https://"; // TODO: 写真選ぶ実装

  const handleIntoRoom = (id: number) => {
    router.push(`/room/${id}/division`);
  };

  const handleCreate = () => {
    const createGroup = async () => {
      try {
        const res = await fetch("/api/create-group", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, menu, url, userId }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error);
        }

        const newGroup = await res.json();
        console.log("successed", newGroup);
      } catch (error) {
        console.error("failed to create", error);
        return null;
      }
    };

    createGroup();
  };

  const handleClose = () => {
    setName("");
    setMenu("");
    setIsOpen(false);
  };

  return (
    <Box left="20px" marginTop="20px">
      <Box padding={4}>
        <Text fontSize="20px" fontWeight="bold">
          作成中の自炊部屋
        </Text>
      </Box>
      <SimpleGrid columns={2} gap={8} padding={4}>
        {groups &&
          groups.map((group) => (
            <Button
              key={group.id}
              variant="ghost"
              p={0}
              height="auto"
              flexDirection="column"
              boxShadow="md"
              borderRadius="md"
              overflow="hidden"
              onClick={() => handleIntoRoom(group.id)}
            >
              <Box width="100%" pb="100%" position="relative">
                <Image
                  src={group.menu_image_url}
                  alt={group.menu_image_url}
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Box>

              <Box p={2} width="100%">
                <Text fontWeight="bold" textAlign="center">
                  {group.name} : {group.menu}
                </Text>
                <Flex justifyContent="center" mt={2}>
                  {Array.from({ length: group.members?.length || 0 }).map(
                    (_, index) => (
                      <Image
                        key={index}
                        src={group.members![index].picture_url}
                        alt=""
                        width="30px"
                        height="30px"
                        borderRadius="full"
                        mx="2px"
                      />
                    ),
                  )}
                </Flex>
              </Box>
            </Button>
          ))}
      </SimpleGrid>

      <Button
        position="fixed"
        bottom="80px"
        right="40px"
        colorScheme="green"
        borderRadius="full"
        backgroundColor="#EFB034FF"
        width="40px"
        height="40px"
        onClick={() => setIsOpen(true)}
      >
        <IoIosAdd />
      </Button>

      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="white"
            borderRadius="md"
            p={6}
            width="400px"
            boxShadow="lg"
            position="relative"
          >
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              部屋を作成する
            </Text>

            <Stack gap={3}>
              <Input
                placeholder="部屋名"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="メニュー"
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
              />
            </Stack>

            <Flex justifyContent="flex-end" mt={4} gap={2}>
              <Button variant="outline" onClick={handleClose}>
                キャンセル
              </Button>
              <Button backgroundColor="#EFB034FF" onClick={handleCreate}>
                作成
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
}
