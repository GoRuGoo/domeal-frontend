"use client";

import {
  Button,
  Flex,
  Image,
  Input,
  Link,
  Table,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Footer } from "../components/footer";
import { User } from "../type";

type Bill = {
  id: number;
  total_amount: number;
  paypal_me_link: string;
  paypal_username: string;
};

export default function Profile() {
  const [paypalName, setPaypalName] = useState<string>("");
  const [bills, setBills] = useState<Bill[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaypalName(e.target.value);
  };

  const fetchBills = async () => {
    try {
      const res = await fetch("/api/get-user-bill");
      if (!res.ok) {
        throw new Error("Failed to fetch bills");
      }
      const data: Bill[] = await res.json();
      setBills(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (billId: number) => {
    try {
      const res = await fetch(`/api/complete-bill?bill_id=${billId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("支払いに失敗しました");
      }

      await fetchBills();
    } catch (error) {
      console.error(error);
    }
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  useEffect(() => {
    const userId = getCookie("user_id");
    const userName = getCookie("user_name");
    const userPicture = getCookie("user_picture");

    if (userId && userName && userPicture) {
      setUser({
        id: Number(userId),
        name: userName,
        picture: userPicture,
      });
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, []);

  if (!user) return;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      px={4}
    >
      {/* プロフィール */}
      <Flex direction="column" align="center" mb={10}>
        <Image
          boxSize="100px"
          borderRadius="full"
          src={user.picture}
          alt={user.name}
          mb={6}
        />
        <Text fontSize="lg" fontWeight="bold">
          {user.name}
        </Text>
      </Flex>

      {/* PayPal 登録 */}
      <Flex direction="column" align="center" w="80%" maxW="400px" mb={8}>
        <Text mr={3} whiteSpace="nowrap" fontWeight="bold">
          PayPal登録
        </Text>
        <Input
          w="100%"
          border="1px solid"
          value={paypalName}
          onChange={handleInputChange}
          placeholder="PayPalアカウント名"
        />
      </Flex>

      <Table.Root size="sm" style={{ width: "70%", margin: "0 auto" }}>
        <Table.Caption>Paypal請求一覧表</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign="center">リンク</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">金額</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">完了</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bills &&
            bills.map((bill) => (
              <Table.Row key={bill.id}>
                <Table.Cell textAlign="center">
                  <Link href={bill.paypal_me_link} color="blue.500">
                    {bill.paypal_username || "PayPalリンク"}
                  </Link>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {bill.total_amount}円
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    variant="ghost"
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleComplete(bill.id)}
                  >
                    完了
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>

      {/* フッター */}
      <Footer user={user} setUser={setUser} />
    </Flex>
  );
}
