import { RoomType } from "../type";

export type WorkDivisionType = {
  room: RoomType;
  division: {
    shopping: number;
    cooking: number;
    cleaning: number;
  };
};

export type selectedDivisionType = "shopping" | "cooking" | "cleaning";

export type ShoppingListType = {
  itemName: string;
  itemPhoto: string;
  price: number;
  buyer: string[];
};
