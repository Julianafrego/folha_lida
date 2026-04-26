import { create } from "zustand";
import { shelvesService } from "@/services/shelf.service";
import type { CreateShelfPayload, Shelf } from "@/types/shelf";

type ShelvesState = {
  shelves: Shelf[];
  loadShelves: () => void;
  createShelf: (data: CreateShelfPayload) => Shelf;
  updateShelf: (id: string, data: CreateShelfPayload) => Shelf;
  deleteShelf: (id: string) => void;
};

export const useShelvesStore = create<ShelvesState>((set) => ({
  shelves: [],

  loadShelves: () => {
    const shelves = shelvesService.getAll();
    set({ shelves });
  },

  createShelf: (data) => {
    const newShelf = shelvesService.create(data);
    set({ shelves: shelvesService.getAll() });
    return newShelf;
  },

  updateShelf: (id, data) => {
    const updatedShelf = shelvesService.update(id, data);
    set({ shelves: shelvesService.getAll() });
    return updatedShelf;
  },

  deleteShelf: (id) => {
    shelvesService.delete(id);
    set({ shelves: shelvesService.getAll() });
  },
}));
