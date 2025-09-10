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
