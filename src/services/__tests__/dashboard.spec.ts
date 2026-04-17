import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getDashboardSummary,
  getTopGenres,
  getTopAnnotatedBooks,
  getFinishedBooksByMonth,
} from "@/utils/dashboard";
import type { Book } from "@/types/book";
import type { ReadingNote } from "@/types/reading-note";

describe("dashboard utils", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const books: Book[] = [
    {
      id: "1",
      title: "Livro A",
      genres: ["Romance", "Drama"],
      totalPages: 200,
      startedAt: "2026-01-01",
      finishedAt: "2026-01-10",
      rating: 5,
      description: "A",
      status: "finalizado",
      createdAt: "2026-01-01T10:00:00.000Z",
      updatedAt: "2026-01-01T10:00:00.000Z",
    },
    {
      id: "2",
      title: "Livro B",
      genres: ["Romance"],
      totalPages: 300,
      startedAt: "2026-02-01",
      finishedAt: "",
      rating: 4,
      description: "B",
      status: "lendo",
      createdAt: "2026-02-01T10:00:00.000Z",
      updatedAt: "2026-02-01T10:00:00.000Z",
    },
    {
      id: "3",
      title: "Livro C",
      genres: ["Fantasia"],
      totalPages: 150,
      startedAt: "2025-03-01",
      finishedAt: "2025-03-20",
      rating: 4,
      description: "C",
      status: "finalizado",
      createdAt: "2025-03-01T10:00:00.000Z",
      updatedAt: "2025-03-01T10:00:00.000Z",
    },
  ];

  const notes: ReadingNote[] = [
    {
      id: "n1",
      bookId: "1",
      page: 10,
      quote: "x",
      comment: "y",
      createdAt: "2026-01-02T10:00:00.000Z",
      updatedAt: "2026-01-02T10:00:00.000Z",
    },
    {
      id: "n2",
      bookId: "1",
      page: 20,
      quote: "x",
      comment: "y",
      createdAt: "2026-01-03T10:00:00.000Z",
      updatedAt: "2026-01-03T10:00:00.000Z",
    },
    {
      id: "n3",
      bookId: "2",
      page: 30,
      quote: "x",
      comment: "y",
      createdAt: "2026-02-03T10:00:00.000Z",
      updatedAt: "2026-02-03T10:00:00.000Z",
    },
  ];

  it("deve montar o resumo do dashboard corretamente", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00.000Z"));

    const summary = getDashboardSummary(books, notes);

    expect(summary).toEqual({
      totalBooks: 3,
      finishedBooks: 2,
      totalNotes: 3,
      pagesReadThisYear: 200,
    });
  });

  it("deve retornar top gêneros ordenados", () => {
    const result = getTopGenres(books);

    expect(result[0]).toEqual({ label: "Romance", value: 2 });
  });

  it("deve retornar livros com mais anotações", () => {
    const result = getTopAnnotatedBooks(books, notes);

    expect(result[0]).toEqual({ label: "Livro A", value: 2 });
    expect(result[1]).toEqual({ label: "Livro B", value: 1 });
  });

  it("deve contar livros finalizados por mês apenas do ano atual", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00.000Z"));

    const result = getFinishedBooksByMonth(books);

    expect(result[0]).toEqual({ month: "Jan", value: 1 });
    expect(result[1]).toEqual({ month: "Fev", value: 0 });
    expect(result[2]).toEqual({ month: "Mar", value: 0 });
  });
});