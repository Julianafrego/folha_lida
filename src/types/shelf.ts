import type { ReadingStatus } from "@/types/book";

export type ShelfRuleField = "genre" | "status";

export type ShelfRule = {
  field: ShelfRuleField;
  value: string;
};

export type ShelfMatchMode = "all" | "any";

export type Shelf = {
  id: string;
  name: string;
  rules: ShelfRule[];
  matchMode: ShelfMatchMode;
  createdAt: string;
  updatedAt: string;
};

export type CreateShelfPayload = Omit<Shelf, "id" | "createdAt" | "updatedAt">;

export type ShelfFormStatus = ReadingStatus | "";
