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
  SimpleGrid,
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

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} padding={2}>
        <Button
          variant="ghost"
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignSelf="stretch"
          onClick={() => handleCardClick("shopping")}
        >
          <Card.Root
            width="100%"
            height="100%"
            backgroundColor={
              selectedDivision === "shopping" ? "#ECA517FF" : "#F3F4F6FF"
            }
          >
            <CardHeader>
              <Heading fontSize="16px" textAlign="center">
                買い出し
              </Heading>
            </CardHeader>
            <CardBody textAlign="center">
              <Flex justifyContent="center" mt={2} minHeight="24px">
                {Array.from({ length: divisionWork.division.shopping }).map(
                  (_, index) => (
                    <Box
                      key={index}
                      width="24px"
                      height="24px"
                      borderRadius="full"
                      bg="red.500"
                      mx="2px"
                    />
                  ),
                )}
              </Flex>
            </CardBody>
          </Card.Root>
        </Button>

        <Button
          variant="ghost"
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignSelf="stretch"
          onClick={() => handleCardClick("cooking")}
        >
          <Card.Root
            width="100%"
            height="100%"
            backgroundColor={
              selectedDivision === "cooking" ? "#ECA517FF" : "#F3F4F6FF"
            }
          >
            <CardHeader>
              <Heading size="md" textAlign="center">
                調理
              </Heading>
            </CardHeader>
            <CardBody textAlign="center">
              <Flex justifyContent="center" mt={2} minHeight="24px">
                {Array.from({ length: divisionWork.division.cooking }).map(
                  (_, index) => (
                    <Box
                      key={index}
                      width="24px"
                      height="24px"
                      borderRadius="full"
                      bg="red.500"
                      mx="2px"
                    />
                  ),
                )}
              </Flex>
            </CardBody>
          </Card.Root>
        </Button>

        <Button
          variant="ghost"
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignSelf="stretch"
          onClick={() => handleCardClick("cleaning")}
        >
          <Card.Root
            width="100%"
            height="100%"
            backgroundColor={
              selectedDivision === "cleaning" ? "#ECA517FF" : "#F3F4F6FF"
            }
          >
            <CardHeader>
              <Heading size="md" textAlign="center">
                片付け
              </Heading>
            </CardHeader>
            <CardBody textAlign="center">
              <Flex justifyContent="center" mt={2} minHeight="24px">
                {Array.from({ length: divisionWork.division.cleaning }).map(
                  (_, index) => (
                    <Box
                      key={index}
                      width="24px"
                      height="24px"
                      borderRadius="full"
                      bg="red.500"
                      mx="2px"
                    />
                  ),
                )}
              </Flex>
            </CardBody>
          </Card.Root>
        </Button>
      </SimpleGrid>

      <Footer />
    </Box>
  );
}
