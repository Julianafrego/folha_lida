import { v4 as uuid } from "uuid";
import { storage } from "@/services/storage.service";
import type {
  ReadingNote,
  CreateReadingNotePayload,
} from "@/types/reading-note";

const READING_NOTES_KEY = "reading-notes";

export const readingNotesService = {
  getAll(): ReadingNote[] {
    return storage.get<ReadingNote[]>(READING_NOTES_KEY) ?? [];
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

    storage.set(READING_NOTES_KEY, [...notes, newNote]);
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

    storage.set(READING_NOTES_KEY, updatedNotes);
    return updatedNote;
  },

  delete(id: string): void {
    const notes = this.getAll();
    const exists = notes.some((note) => note.id === id);

    if (!exists) {
      throw new Error("Nota não encontrada.");
    }

    const filteredNotes = notes.filter((note) => note.id !== id);
    storage.set(READING_NOTES_KEY, filteredNotes);
  },
};