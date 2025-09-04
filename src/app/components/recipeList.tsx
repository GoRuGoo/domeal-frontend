import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { RecipeListProps } from "../type";

export function RecipeList({ rooms, onRoomClick }: RecipeListProps) {
  return (
    <Box left="20px" marginTop="20px">
      <Box padding={4}>
        <Text fontSize="20px" fontWeight="bold">
          作成中の自炊部屋
        </Text>
      </Box>
      <SimpleGrid columns={2} gap={8} padding={4}>
        {rooms.map((room) => (
          <Button
            key={room.id}
            variant="ghost"
            p={0}
            height="auto"
            flexDirection="column"
            boxShadow="md"
            borderRadius="md"
            overflow="hidden"
            onClick={() => onRoomClick(room.id)}
          >
            <Box width="100%" pb="100%" position="relative">
              <Image
                src={room.roomPhoto}
                alt={room.roomName}
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
                {room.roomName}
              </Text>
              <Flex justifyContent="center" mt={2}>
                {Array.from({ length: room.currentParticipants }).map(
                  (_, index) => (
                    <Box
                      key={index}
                      width="16px"
                      height="16px"
                      borderRadius="full"
                      bg="red.500"
                      mx="2px"
                    />
                  ),
                )}
              </Flex>
            </Box>
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
}
