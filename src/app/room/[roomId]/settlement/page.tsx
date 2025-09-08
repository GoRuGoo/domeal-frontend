"use client";

import { useEffect, useState } from "react";
import { ShoppingListType } from "../../type";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Footer } from "@/app/components/footer";
import { usePathname, useRouter } from "next/navigation";
import { Group } from "@/app/type";

export default function Settlment() {
  const router = useRouter();
  const pathname = usePathname();

  const [group, setGroup] = useState<Group>();
  const [items, setItems] = useState<ShoppingListType[]>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCardClick = (product: string) => {
    const copiedItem = [...selectedItems];
    const indexOfItem = copiedItem.indexOf(product);
    if (indexOfItem > -1) copiedItem.splice(indexOfItem, 1);
    else copiedItem.push(product);
    setSelectedItems(copiedItem);
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch("/api/groups");
        const fetched = await res.json();
        const data: Group[] = fetched.groups;

        const segments = pathname.split("/").filter(Boolean);
        const groupId = segments[1];

        const matched = data.find((g) => g.id === Number(groupId));
        setGroup(matched);
      } catch (err) {
        console.error("グループ取得失敗:", err);
      }
    };

    fetchGroup();
  }, [pathname]);

  return (
    <Box left="20px" marginTop="20px" pb="100px">
      <Flex padding={4} marginTop="10px" left="30px" alignItems="center">
        <Text fontSize="20px" fontWeight="bold">
          請求登録
        </Text>
      </Flex>

      <SimpleGrid padding={4} gap={4} minChildWidth="300px">
        {items &&
          items.map((item, index) => (
            <Card.Root
              key={index}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              borderColor="#EFB034FF"
              backgroundColor={
                selectedItems.includes(item.itemName) ? "#EFB034FF" : ""
              }
              boxShadow="md"
              onClick={() => handleCardClick(item.itemName)}
            >
              <CardBody>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    {item.itemName}
                  </Text>
                  <Heading size="md">{item.price}円</Heading>
                </Box>
              </CardBody>
            </Card.Root>
          ))}
      </SimpleGrid>

      <Button
        position="fixed"
        bottom="100px"
        right="30px"
        colorScheme="green"
        borderRadius="full"
        backgroundColor="#EFB034FF"
        color="black"
        width="80px"
        height="80px"
        onClick={() => router.push(`/room/${group?.id}/receipt`)}
      >
        <Text fontSize="12px" fontWeight="bold">
          レシート
          <br />
          登録
        </Text>
      </Button>

      <Footer />
    </Box>
  );
}
