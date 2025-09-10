"use client";

import { Footer } from "@/app/components/footer";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RoleAssignType } from "../../type";
import { MdKeyboardArrowRight } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRoleWebSocket } from "./useWs/useRoleWebSocket";
import { useUserStore } from "@/app/type";

type FlowMessage = string;

const roles = ["shopping", "cooking", "cleaning"];

export default function DivisionWork() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const groupId = segments[1];
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);

  const [messages, setMessages] = useState<FlowMessage>();
  const [selectedRole, setSelectedRole] = useState<RoleAssignType>("");
  const { roleState, connected, assignRole, completeRoles } = useRoleWebSocket(
    Number(groupId),
    Number(userId),
  );

  const handleSelect = (role: RoleAssignType) => {
    setSelectedRole(role);
    assignRole(role);
  };

  const handleComplete = () => {
    completeRoles();
  };

  useEffect(() => {
    const url = `/api/subscribe-flow?group_id=${groupId}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      console.log("SSE:", event.data);
      setMessages(event.data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error: ", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [groupId]);

  useEffect(() => {
    if (messages === "move_to_waiting_or_upload_receipt") {
      router.push(
        `/room/${groupId}/receipt?user_id=${userId}&role=${selectedRole}`,
      );
    }
  }, [groupId, router, messages, userId, selectedRole]);

  if (!user) return;

  return (
    <Box height="100vh" overflowY="hidden">
      <Flex padding={4} marginTop="10px" paddingLeft="8%" alignItems="center">
        <Text fontSize="20px" fontWeight="bold">
          役割分担
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
        <Box>
          <Flex
            justifyContent="space-evenly"
            direction="column"
            alignItems="center"
            height="70vh"
            paddingX="8%"
            paddingY={2}
            gap={4}
          >
            {roles.map((role) => (
              <Button
                key={role}
                variant="ghost"
                width="100%"
                height="30%"
                display="flex"
                flexDirection="column"
                alignSelf="stretch"
                padding={0}
                mx="auto"
                onClick={() => handleSelect(role as RoleAssignType)}
              >
                <Card.Root
                  width="100%"
                  height="100%"
                  position="relative"
                  borderRadius="6px"
                  backgroundColor={
                    selectedRole === role ? "#ECA517FF" : "#F3F4F6FF"
                  }
                  borderColor={
                    selectedRole === role ? "#ECA517FF" : "#F3F4F6FF"
                  }
                >
                  <CardHeader position="absolute">
                    <Heading fontSize="20px" fontWeight="bold">
                      {role === "shopping"
                        ? "買い出し"
                        : role === "cooking"
                          ? "料理"
                          : "片付け"}
                    </Heading>
                  </CardHeader>

                  <CardBody
                    position="absolute"
                    top="8px"
                    right="12px"
                    display="grid"
                    gridTemplateColumns="repeat(3, 24px)" // 横3列固定
                    gap="4px"
                  >
                    {Array.from({
                      length:
                        role === "shopping"
                          ? (roleState?.roles["shopping"]?.length ?? 0)
                          : role === "cooking"
                            ? (roleState?.roles["cooking"]?.length ?? 0)
                            : (roleState?.roles["cleaning"]?.length ?? 0),
                    }).map((_, index) => (
                      <Image
                        key={index}
                        src={
                          role === "shopping"
                            ? roleState?.roles["shopping"][index].icon_url
                            : role === "cooking"
                              ? roleState?.roles["cooking"][index].icon_url
                              : roleState?.roles["cleaning"][index].icon_url
                        }
                        alt=""
                        width="24px"
                        height="24px"
                        borderRadius="full"
                        bg="red.500"
                      />
                    ))}
                  </CardBody>
                </Card.Root>
              </Button>
            ))}
          </Flex>

          <Button
            position="fixed"
            bottom="100px"
            right="8%"
            colorScheme="green"
            borderRadius="full"
            backgroundColor="#EFB034FF"
            color="black"
            width="60px"
            height="60px"
            _hover={{ bg: "#ECA517FF" }}
            onClick={handleComplete}
          >
            <Icon as={MdKeyboardArrowRight} />
          </Button>
        </Box>
      )}

      <Footer user={user} setUser={setUser} />
    </Box>
  );
}
