"use client";

import { useState } from "react";
import { RoomType, User } from "../type";
import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { Header } from "./header";
import { SearchInput } from "./searchInput";
import { RecipeList } from "./recipeList";
import { Footer } from "./footer";

const testRoomData = (): RoomType[] => {
  return [
    {
      id: "1",
      roomName: "唐揚げ",
      roomPhoto:
        "https://housefoods.jp/_sys/catimages/recipe/hfrecipe/items/00016989/0.jpeg",
      currentParticipants: 3,
    },
    {
      id: "2",
      roomName: "オムライス",
      roomPhoto:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVHkPrpGGAokvHTcAk7Jd1vRPwJ7GZaI9ZA&s",
      currentParticipants: 2,
    },
    {
      id: "3",
      roomName: "焼きそば",
      roomPhoto: "https://www.takarashuzo.co.jp/cooking/pic/recipe/850.jpg",
      currentParticipants: 6,
    },
    {
      id: "4",
      roomName: "カレー",
      roomPhoto:
        "https://housefoods.jp/_sys/catimages/recipe/hfrecipe/items/00025463/0.jpeg",
      currentParticipants: 4,
    },
  ];
};

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomType[]>(testRoomData);

  const handleIntoRoom = (roomId: string) => {
    router.push(`/room/${roomId}/division`);
  };

  return (
    <Box>
      <Box pb="100px">
        <Header icon={user.picture} />
        <SearchInput />
        <RecipeList rooms={rooms} onRoomClick={handleIntoRoom} />
        <Footer />
      </Box>
    </Box>
  );
}
