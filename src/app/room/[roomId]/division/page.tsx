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
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { selectedDivisionType, WorkDivisionType } from "../../type";
import { MdKeyboardArrowRight } from "react-icons/md";
import { usePathname } from "next/navigation";
import { Group } from "@/app/type";
import { useRouter } from "next/navigation";

const DIVISION: selectedDivisionType[] = ["shopping", "cooking", "cleaning"];

export default function DivisionWork() {
  const router = useRouter();
  const pathname = usePathname();

  const [group, setGroup] = useState<Group>();
  const [divisionWork, setDivisionWork] = useState<
    WorkDivisionType | undefined
  >();
  const [selectedDivision, setSelectedDivision] =
    useState<selectedDivisionType>("shopping");

  const handleCardClick = (tappedDivision: selectedDivisionType) => {
    if (selectedDivision === tappedDivision) return;
    if (!divisionWork) return;
    const updatedDivision = {
      ...divisionWork.division,
      [selectedDivision]: divisionWork.division[selectedDivision] - 1,
      [tappedDivision]: divisionWork.division[tappedDivision] + 1,
    };

    setDivisionWork({
      ...divisionWork!,
      division: updatedDivision,
    });
    setSelectedDivision(tappedDivision);
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

        const division: WorkDivisionType = {
          room: matched!,
          division: {
            shopping: matched!.members!.length,
            cooking: 0,
            cleaning: 0,
          },
        };
        setDivisionWork(division);
      } catch (err) {
        console.error("グループ取得失敗:", err);
      }
    };

    fetchGroup();
  }, [pathname]);

  if (!divisionWork) return;

  return (
    <Box height="100vh" overflowY="hidden">
      <Flex
        padding={4}
        marginTop="10px"
        left="30px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="20px" fontWeight="bold">
          役割分担
        </Text>

        <Button
          width="50px"
          height="30px"
          right="10px"
          borderRadius="10px"
          background="#EFB034FF"
          color="#5D4108FF"
          boxShadow="md"
          _hover={{ bg: "#ECA517FF" }}
          onClick={() => router.push(`/room/${group?.id}/settlement`)}
        >
          <Icon as={MdKeyboardArrowRight} />
        </Button>
      </Flex>

      <Flex
        justifyContent="space-evenly"
        direction="column"
        height="calc(100vh - 100px)"
        padding={2}
        gap={4}
      >
        {DIVISION.map((divisionName) => (
          <Button
            key={divisionName}
            variant="ghost"
            width="100%"
            height="150px"
            display="flex"
            flexDirection="column"
            alignSelf="stretch"
            onClick={() => handleCardClick(divisionName)}
          >
            <Card.Root
              width="100%"
              height="100%"
              backgroundColor={
                selectedDivision === divisionName ? "#ECA517FF" : "#F3F4F6FF"
              }
            >
              <CardHeader>
                <Heading fontSize="16px" textAlign="center">
                  {divisionName === "shopping"
                    ? "買い出し"
                    : divisionName === "cooking"
                      ? "買い出し"
                      : "片付け"}
                </Heading>
              </CardHeader>
              <CardBody textAlign="center">
                <Flex justifyContent="center" mt={2} minHeight="24px">
                  {Array.from({
                    length:
                      divisionName === "shopping"
                        ? divisionWork.division.shopping
                        : divisionName === "cooking"
                          ? divisionWork.division.cooking
                          : divisionWork.division.cleaning,
                  }).map((_, index) => (
                    <Box
                      key={index}
                      width="24px"
                      height="24px"
                      borderRadius="full"
                      bg="red.500"
                      mx="2px"
                    />
                  ))}
                </Flex>
              </CardBody>
            </Card.Root>
          </Button>
        ))}
      </Flex>

      <Footer />
    </Box>
  );
}
