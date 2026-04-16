import { describe, it, expect, beforeEach } from "vitest";
import { readingNotesService } from "@/services/reading-note.service";
import type { CreateReadingNotePayload } from "@/types/reading-note";

describe("readingNotesService", () => {
  const baseNote: CreateReadingNotePayload = {
    bookId: "book-1",
    page: 12,
    quote: "Algum trecho",
    comment: "Algum comentário",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("deve criar uma nota de leitura", () => {
    const created = readingNotesService.create(baseNote);

    expect(created.id).toBeDefined();
    expect(created.bookId).toBe("book-1");
    expect(readingNotesService.getAll()).toHaveLength(1);
  });

  it("deve buscar notas por bookId", () => {
    readingNotesService.create(baseNote);
    readingNotesService.create({
      ...baseNote,
      bookId: "book-2",
      page: 20,
    });

    const notes = readingNotesService.getByBookId("book-1");

    expect(notes).toHaveLength(1);
    expect(notes[0].bookId).toBe("book-1");
  });

  it("deve atualizar uma nota", () => {
    const created = readingNotesService.create(baseNote);

    const updated = readingNotesService.update(created.id, {
      ...baseNote,
      page: 99,
      quote: "Citação atualizada",
      comment: "Comentário atualizado",
    });

    expect(updated.page).toBe(99);
    expect(updated.quote).toBe("Citação atualizada");
  });

  it("deve deletar uma nota", () => {
    const created = readingNotesService.create(baseNote);

    readingNotesService.delete(created.id);

    expect(readingNotesService.getAll()).toHaveLength(0);
  });

  it("deve lançar erro ao atualizar nota inexistente", () => {
    expect(() =>
      readingNotesService.update("id-inexistente", baseNote)
    ).toThrow("Nota não encontrada.");
  });

  it("deve lançar erro ao deletar nota inexistente", () => {
    expect(() => readingNotesService.delete("id-inexistente")).toThrow(
      "Nota não encontrada."
    );
  });
});