import { v4 as uuid } from "uuid";
import { storage } from "@/services/storage.service";
import { authService } from "@/services/auth.service";
import type {
  ReadingNote,
  CreateReadingNotePayload,
} from "@/types/reading-note";

function getReadingNotesKey(): string {
  const user = authService.getStoredUser();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  return `reading-notes:${user.id}`;
}

export const readingNotesService = {
  getAll(): ReadingNote[] {
    return storage.get<ReadingNote[]>(getReadingNotesKey()) ?? [];
  },

  getById(id: string): ReadingNote | null {
    const notes = this.getAll();
    return notes.find((note) => note.id === id) ?? null;
  },

  getByBookId(bookId: string): ReadingNote[] {
    const notes = this.getAll();
    return notes.filter((note) => note.bookId === bookId);
  },

  create(data: CreateReadingNotePayload): ReadingNote {
    const notes = this.getAll();
    const now = new Date().toISOString();

    const newNote: ReadingNote = {
      id: uuid(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    storage.set(getReadingNotesKey(), [...notes, newNote]);
    return newNote;
  },

  update(id: string, data: CreateReadingNotePayload): ReadingNote {
    const notes = this.getAll();
    const existingNote = notes.find((note) => note.id === id);

    if (!existingNote) {
      throw new Error("Nota não encontrada.");
    }

    const updatedNote: ReadingNote = {
      ...existingNote,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = notes.map((note) =>
      note.id === id ? updatedNote : note
    );

    storage.set(getReadingNotesKey(), updatedNotes);
    return updatedNote;
  },

  delete(id: string): void {
    const notes = this.getAll();
    const exists = notes.some((note) => note.id === id);

    if (!exists) {
      throw new Error("Nota não encontrada.");
    }

    const filteredNotes = notes.filter((note) => note.id !== id);
    storage.set(getReadingNotesKey(), filteredNotes);
  },
};