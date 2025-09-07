export type RoomType = {
  id: string;
  roomName: string;
  roomPhoto: string;
  currentParticipants: number;
};

export type RecipeListProps = {
  rooms: RoomType[];
  onRoomClick: (roomId: string) => void;
};

// ユーザ情報の型
export interface User {
  id: number;
  name: string;
  picture: string;
}

// getServerSidePropsから返されるpropsの型
export interface LoginStatusResponse {
  is_logged_in: boolean;
  user?: User;
  message: string;
}
