"use client";

import Home from "./components/home";
import { User } from "./type";

interface Props {
  user: User;
}

export default function HomeClient({ user }: Props) {
  return <Home user={user} />;
}
