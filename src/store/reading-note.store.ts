import { create } from "zustand";
import { readingNotesService } from "@/services/reading-note.service";
import type {
  CreateReadingNotePayload,
  ReadingNote,
} from "@/types/reading-note";

type ReadingNotesState = {
  notes: ReadingNote[];
  loadNotes: () => void;
  loadNotesByBookId: (bookId: string) => void;
  createNote: (data: CreateReadingNotePayload) => ReadingNote;
  updateNote: (id: string, data: CreateReadingNotePayload) => ReadingNote;
  deleteNote: (id: string) => void;
};

export const useReadingNotesStore = create<ReadingNotesState>((set) => ({
  notes: [],

  loadNotes: () => {
    const notes = readingNotesService.getAll();
    set({ notes });
  },

  loadNotesByBookId: (bookId) => {
    const notes = readingNotesService.getByBookId(bookId);
    set({ notes });
  },

  createNote: (data) => {
    const newNote = readingNotesService.create(data);
    set({ notes: readingNotesService.getByBookId(data.bookId) });
    return newNote;
  },

  updateNote: (id, data) => {
    const updatedNote = readingNotesService.update(id, data);
    set({ notes: readingNotesService.getByBookId(data.bookId) });
    return updatedNote;
  },

  deleteNote: (id) => {
    const note = readingNotesService.getById(id);

    if (!note) {
      throw new Error("Nota não encontrada.");
    }

    readingNotesService.delete(id);
    set({ notes: readingNotesService.getByBookId(note.bookId) });
  },
}));