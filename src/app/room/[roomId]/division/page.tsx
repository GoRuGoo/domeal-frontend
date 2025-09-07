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
import { useState } from "react";
import { selectedDivisionType, WorkDivisionType } from "../../type";
import { RoomType } from "@/app/type";
import { MdKeyboardArrowRight } from "react-icons/md";

const testRoomData: RoomType = {
  id: "3",
  roomName: "焼きそば",
  roomPhoto: "https://www.takarashuzo.co.jp/cooking/pic/recipe/850.jpg",
  currentParticipants: 6,
};

const testDivisionData = (): WorkDivisionType => {
  return {
    room: testRoomData,
    division: {
      shopping: testRoomData.currentParticipants,
      cooking: 0,
      cleaning: 0,
    },
  };
};

const DIVISION: selectedDivisionType[] = ["shopping", "cooking", "cleaning"];

export default function DivisionWork() {
  const [divisionWork, setDivisionWork] =
    useState<WorkDivisionType>(testDivisionData);
  const [selectedDivision, setSelectedDivision] =
    useState<selectedDivisionType>("shopping");

  const handleCardClick = (tappedDivision: selectedDivisionType) => {
    if (selectedDivision === tappedDivision) return;
    const updatedDivision = {
      ...divisionWork.division,
      [selectedDivision]: divisionWork.division[selectedDivision] - 1,
      [tappedDivision]: divisionWork.division[tappedDivision] + 1,
    };

    setDivisionWork({
      ...divisionWork,
      division: updatedDivision,
    });
    setSelectedDivision(tappedDivision);
  };

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
