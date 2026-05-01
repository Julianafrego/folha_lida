import type { ReadingStatus } from "@/types/book";

export type ShelfRuleField = "genre" | "status";

export type ShelfRule = 
  | { field: "genre"; value: string }
  | { field: "status"; value: ReadingStatus };

export type ShelfMatchMode = "all" | "any";
export type ShelfMode = "rule" | "manual";

export type Shelf = {
  id: string;
  name: string;
  rules: ShelfRule[];
  matchMode: ShelfMatchMode;
  createdAt: string;
  updatedAt: string;

  mode: ShelfMode;
  bookIds: string[];

};

export type CreateShelfPayload = Omit<Shelf, "id" | "createdAt" | "updatedAt">;

export type ShelfFormStatus = ReadingStatus | "";