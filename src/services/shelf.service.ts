import { v4 as uuid } from "uuid";
import { storage } from "@/services/storage.service";
import { authService } from "@/services/auth.service";
import type { CreateShelfPayload, Shelf } from "@/types/shelf";

function getShelvesKey(): string {
  const user = authService.getStoredUser();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  return `shelves:${user.id}`;
}

function normalizeShelf(data: CreateShelfPayload): CreateShelfPayload {
  return {
    name: data.name.trim(),
    mode: data.mode,
    matchMode: data.matchMode,
    bookIds: data.bookIds ?? [],
    rules: data.rules
      .map((rule) => {
        if (rule.field === "genre") {
          return {
            field: "genre" as const,
            value: rule.value.trim(),
          };
        }

        return {
          field: "status" as const,
          value: rule.value, 
        };
      })
      .filter((rule) =>
        rule.field === "genre"
          ? rule.value.length > 0
          : true
      ),
  };
}
export const shelvesService = {
  getAll(): Shelf[] {
    return storage.get<Shelf[]>(getShelvesKey()) ?? [];
  },

  getById(id: string): Shelf | null {
    const shelves = this.getAll();
    return shelves.find((shelf) => shelf.id === id) ?? null;
  },

  create(data: CreateShelfPayload): Shelf {
    const shelves = this.getAll();
    const normalizedData = normalizeShelf(data);

    if (!normalizedData.name) {
      throw new Error("Informe o nome da estante.");
    }

    if (normalizedData.mode === 'rule') {
      if (normalizedData.rules.length === 0) {
        throw new Error("Informe pelo menos uma regra para a estante.");
      }
    }

    if (normalizedData.mode === 'manual') {
      if (!normalizedData.bookIds || normalizedData.bookIds.length === 0) {
        throw new Error("Selecione pelo menos um livro.");
      }
    }
    const now = new Date().toISOString();

    const newShelf: Shelf = {
      id: uuid(),
      ...normalizedData,
      createdAt: now,
      updatedAt: now,
    };

    storage.set(getShelvesKey(), [...shelves, newShelf]);
    return newShelf;
  },

  update(id: string, data: CreateShelfPayload): Shelf {
    const shelves = this.getAll();
    const existingShelf = shelves.find((shelf) => shelf.id === id);

    if (!existingShelf) {
      throw new Error("Estante não encontrada.");
    }

    const normalizedData = normalizeShelf(data);

    if (!normalizedData.name) {
      throw new Error("Informe o nome da estante.");
    }

    if (normalizedData.mode === 'rule') {
      if (normalizedData.rules.length === 0) {
        throw new Error("Informe pelo menos uma regra para a estante.");
      }
    }

    if (normalizedData.mode === 'manual') {
      if (!normalizedData.bookIds || normalizedData.bookIds.length === 0) {
        throw new Error("Selecione pelo menos um livro.");
      }
    }

    const updatedShelf: Shelf = {
      ...existingShelf,
      ...normalizedData,
      updatedAt: new Date().toISOString(),
    };

    const updatedShelves = shelves.map((shelf) =>
      shelf.id === id ? updatedShelf : shelf
    );

    storage.set(getShelvesKey(), updatedShelves);
    return updatedShelf;
  },

  delete(id: string): void {
    const shelves = this.getAll();
    const exists = shelves.some((shelf) => shelf.id === id);

    if (!exists) {
      throw new Error("Estante não encontrada.");
    }

    storage.set(
      getShelvesKey(),
      shelves.filter((shelf) => shelf.id !== id)
    );
  },
};
