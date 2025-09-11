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
import { Group, User } from "../type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SelectPhoto } from "./selectPhoto";

interface RecipeListProps {
  groups: Group[];
  userId: number;
  user: User;
  setUser: (u: User) => void;
}

export function RecipeList({ groups, userId, user, setUser }: RecipeListProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [menu, setMenu] = useState("");
  const [isPhotoOpen, setIsPhotoOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string>("");

  const [receivedGroups, setReceivedGroups] = useState<Group[]>(groups);

  const handleIntoRoom = (id: number) => {
    const joinGroup = async () => {
      try {
        const res = await fetch("/api/join-group", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ group_id: id }),
        });

        const data = await res.json();

        // if (!res.ok) {
        //   throw new Error(data.error || "Failed to join group");
        // }
        setUser(user);
        router.push(`/room/${id}/division?user_id=${userId}`);
      } catch (error) {
        console.error("Failed to join a group:", error);
      }
    };

    joinGroup();
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
          body: JSON.stringify({ name, menu, photo, userId }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error);
        }

        const newGroup: Group = await res.json();  
        setReceivedGroups([...(groups || []), newGroup]);
      } catch (error) {
        console.error("failed to create", error);
        return null;
      }
    };

    createGroup();
    setIsOpen(false);
  };

  const handleClose = () => {
    setName("");
    setMenu("");
    setIsOpen(false);
  };

  const handlePhotoSearch = () => {
    setIsPhotoOpen(true);
  };
  
  useEffect(() => {
    setReceivedGroups(groups);
  }, [groups]);

  return (
    <Box left="20px" marginTop="20px">
      <Box padding={4}>
        <Text fontSize="20px" fontWeight="bold">
          作成中の自炊部屋
        </Text>
      </Box>
      <SimpleGrid columns={2} gap={8} padding={4}>
        {receivedGroups &&
          receivedGroups.map((group) => (
            <Button
              key={group.id}
              variant="ghost"
              p={0}
              height="auto"
              flexDirection="column"
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
                <Text fontWeight="bold" textAlign="left">
                  {group.name} : {group.menu}
                </Text>
                <Flex justifyContent="left" mt={2} minHeight="40px">
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
        width="50px"
        height="50px"
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
              <Button onClick={handlePhotoSearch}>画像を検索</Button>
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

      {isPhotoOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="blackAlpha.700"
          zIndex={1100} // isOpen より上
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <SelectPhoto
            query={menu}
            onClose={setIsPhotoOpen}
            onSelect={setPhoto}
          />
        </Box>
      )}
    </Box>
  );
}
