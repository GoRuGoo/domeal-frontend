import { Group } from "../type";

export type WorkDivisionType = {
  room: Group;
  division: {
    shopping: number;
    cooking: number;
    cleaning: number;
  };
};

export type RoleAssignType = "shopping" | "cooking" | "cleaning" | "";

export type ShoppingListType = {
  itemName: string;
  itemPhoto: string;
  price: number;
  buyer: string[];
};
