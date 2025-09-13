"use client";

import { useEffect, useState } from "react";
import { Group, User, useUserStore } from "../type";
import { Box } from "@chakra-ui/react";
import { Header } from "./header";
import { SearchInput } from "./searchInput";
import { RecipeList } from "./recipeList";
import { Footer } from "./footer";

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  const setUser = useUserStore((s) => s.setUser);
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (user) {
      document.cookie = `user_id=${user.id}; path=/`;
      document.cookie = `user_name=${user.name}; path=/`;
      document.cookie = `user_picture=${user.picture}; path=/`;
    }
  }, [user]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("/rest/groups"); // これだけでOK
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setGroups(data.groups); // data 内の groups 配列をセット
        setFilteredGroups(data.groups);
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
        <SearchInput groups={groups} onUpdate={setFilteredGroups} />
        <RecipeList
          groups={filteredGroups}
          userId={user.id}
          user={user}
          setUser={setUser}
        />
        <Footer user={user} setUser={setUser} />
      </Box>
    </Box>
  );
}
