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
