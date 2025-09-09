import { create } from "zustand";

interface Member {
  user_id: number;
  display_name: string;
  picture_url: string;
  is_owner: boolean;
}

export interface Group {
  id: number;
  name: string;
  menu: string;
  menu_image_url: string;
  created_by: number;
  members: Member[] | null;
}

// ユーザ情報の型
export interface User {
  id: number;
  name: string;
  picture: string;
}

type UserStore = {
  user: User | null;
  setUser: (u: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));

// getServerSidePropsから返されるpropsの型
export interface LoginStatusResponse {
  is_logged_in: boolean;
  user?: User;
  message: string;
}
