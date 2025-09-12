"use client";

import { useEffect, useState } from "react";
import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Footer } from "@/app/components/footer";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/app/type";
import { useItemWebSocket } from "./useWs/useItemWebSocket";

export default function Settlment() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const groupId = segments[1];
  const receiptId = 1;

  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const {
    items,
    itemImages,
    completed,
    connected,
    chooseItem,
    removeItem,
    completeSelection,
  } = useItemWebSocket(Number(groupId));

  const handleItemClick = (id: number, item: string) => {
    const tmpItems = [...selectedItems];
    const indexOfItem = tmpItems.indexOf(item);
    if (indexOfItem > -1) {
      removeItem(receiptId, id);
      tmpItems.splice(indexOfItem, 1);
    } else {
      chooseItem(receiptId, id);
      tmpItems.push(item);
    }
    setSelectedItems(tmpItems);
  };

  useEffect(() => {
    if (completed) {
      router.push("/");
    }
  }, [completed, router]);

  return (
    <Box left="20px" marginTop="20px" pb="100px">
      <Flex padding={4} marginTop="10px" left="30px" alignItems="center">
        <Text fontSize="20px" fontWeight="bold">
          請求登録
        </Text>
      </Flex>

      {!connected ? (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontWeight="bold">サーバーに接続中...</Text>
        </Box>
      ) : (
        <SimpleGrid columns={2} gap={8} padding={4}>
          {items &&
            items.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                p={0}
                height="auto"
                flexDirection="column"
                borderRadius="md"
                overflow="hidden"
                borderWidth={selectedItems.includes(item.name) ? "3px" : "0px"}
                borderColor={
                  selectedItems.includes(item.name)
                    ? "#ECA517FF"
                    : "transparent"
                }
                onClick={() => {
                  handleItemClick(item.id, item.name);
                }}
              >
                <Box
                  width="100%"
                  pb="100%"
                  position="relative"
                  borderColor={
                    selectedItems.includes(item.name)
                      ? "#ECA517FF"
                      : "transparent"
                  }
                >
                  <Image
                    key={item.id}
                    src={itemImages[item.name] || "/do!meal-icon.png"}
                    alt="写真を検索できませんでした"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
                <Box p={2} width="100%" minHeight="80px">
                  <Text fontWeight="bold" textAlign="left">
                    {item.name}
                  </Text>
                  <Flex justifyContent="left" mt={2}>
                    {Array.from({
                      length: item.selected_users?.length || 0,
                    }).map((_, index) => (
                      <Image
                        key={index}
                        src={item.selected_users[index].icon_url}
                        alt=""
                        width="30px"
                        height="30px"
                        borderRadius="full"
                        mx="2px"
                      />
                    ))}
                  </Flex>
                </Box>
              </Button>
            ))}
        </SimpleGrid>
      )}

      <Button
        position="fixed"
        bottom="100px"
        right="30px"
        colorScheme="green"
        borderRadius="full"
        backgroundColor={completed ? "#EFB034FF" : "gray.100"}
        color="black"
        width="80px"
        height="80px"
        onClick={completeSelection}
      >
        <Text fontSize="12px" fontWeight="bold">
          選択
          <br />
          完了
        </Text>
      </Button>

      <Footer user={user!} setUser={setUser} />
    </Box>
  );
}
