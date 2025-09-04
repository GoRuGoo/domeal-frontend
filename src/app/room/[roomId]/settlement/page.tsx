"use client";

import { useState } from "react";
import { ShoppingListType } from "../../type";
import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Footer } from "@/app/components/footer";

const shoppingListData: ShoppingListType[] = [
  {
    itemName: "オーガニックバナナ",
    itemPhoto: "https://example.com/images/banana.jpg",
    price: 300,
    buyer: [],
  },
  {
    itemName: "特選牛乳",
    itemPhoto: "https://example.com/images/milk.jpg",
    price: 250,
    buyer: [],
  },
  {
    itemName: "新鮮な卵",
    itemPhoto: "https://example.com/images/egg.jpg",
    price: 400,
    buyer: [],
  },
  {
    itemName: "食パン",
    itemPhoto: "https://example.com/images/bread.jpg",
    price: 150,
    buyer: [],
  },
  {
    itemName: "トマト",
    itemPhoto: "https://example.com/images/tomato.jpg",
    price: 350,
    buyer: [],
  },
  {
    itemName: "じゃがいも",
    itemPhoto: "https://example.com/images/potato.jpg",
    price: 200,
    buyer: [],
  },
  {
    itemName: "玉ねぎ",
    itemPhoto: "https://example.com/images/onion.jpg",
    price: 180,
    buyer: [],
  },
  {
    itemName: "キャベツ",
    itemPhoto: "https://example.com/images/cabbage.jpg",
    price: 280,
    buyer: [],
  },
  {
    itemName: "豚こま切れ肉",
    itemPhoto: "https://example.com/images/pork.jpg",
    price: 500,
    buyer: [],
  },
  {
    itemName: "豆腐",
    itemPhoto: "https://example.com/images/tofu.jpg",
    price: 100,
    buyer: [],
  },
];

export default function Settlment() {
  const [items, setItems] = useState<ShoppingListType[]>(shoppingListData);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCardClick = (product: string) => {
    const copiedItem = [...selectedItems];
    const indexOfItem = copiedItem.indexOf(product);
    if (indexOfItem > -1) copiedItem.splice(indexOfItem, 1);
    else copiedItem.push(product);
    setSelectedItems(copiedItem);
  };

  return (
    <Box left="20px" marginTop="20px" pb="100px">
      <Box padding={4}>
        <Text fontSize="20px" fontWeight="bold">
          請求登録
        </Text>
      </Box>

      <SimpleGrid padding={4} gap={4} minChildWidth="300px">
        {items.map((item, index) => (
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

      <Footer />
    </Box>
  );
}
