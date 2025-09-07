"use client";

import { useEffect, useState } from "react";
import { Group, User } from "../type";
import { useRouter } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { Header } from "./header";
import { SearchInput } from "./searchInput";
import { RecipeList } from "./recipeList";
import { Footer } from "./footer";

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    console.log("hello");

    const fetchGroups = async () => {
      try {
        const res = await fetch("/api/groups"); // これだけでOK
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setGroups(data.groups); // data 内の groups 配列をセット
      } catch (err) {
        console.error("グループ取得失敗:", err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Box>
      <Box pb="100px">
        <Header icon={user.picture} />
        <SearchInput />
        <RecipeList groups={groups} userId={user.id} />
        <Footer />
      </Box>
    </Box>
  );
}
