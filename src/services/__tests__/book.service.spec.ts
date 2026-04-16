import { describe, it, expect, beforeEach } from "vitest";
import { booksService } from "@/services/book.service";
import type { CreateBookPayload } from "@/types/book";

describe("booksService", () => {
  const baseBook: CreateBookPayload = {
    title: "Dom Casmurro",
    genres: ["Romance"],
    totalPages: 256,
    startedAt: "",
    finishedAt: "",
    rating: 5,
    description: "Clássico brasileiro",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("deve criar livro com status não_iniciado quando não há datas", () => {
    const created = booksService.create(baseBook);

    expect(created.id).toBeDefined();
    expect(created.status).toBe("não_iniciado");
    expect(created.createdAt).toBeDefined();
    expect(created.updatedAt).toBeDefined();
    expect(booksService.getAll()).toHaveLength(1);
  });

  it("deve criar livro com status lendo quando possui startedAt e não possui finishedAt", () => {
    const created = booksService.create({
      ...baseBook,
      startedAt: "2026-04-01",
    });

    expect(created.status).toBe("lendo");
  });

  it("deve criar livro com status finalizado quando possui startedAt e finishedAt", () => {
    const created = booksService.create({
      ...baseBook,
      startedAt: "2026-04-01",
      finishedAt: "2026-04-10",
    });

    expect(created.status).toBe("finalizado");
  });

it("deve atualizar um livro e recalcular o status", () => {
  const created = booksService.create({
    title: "Livro A",
    genres: ["Fantasia"],
    totalPages: 200,
    startedAt: "2026-04-01",
    finishedAt: "",
    rating: 4,
    description: "Descrição",
  });

  const updated = booksService.update(created.id, {
    title: "Livro A atualizado",
    genres: ["Fantasia", "Drama"],
    totalPages: 250,
    startedAt: "2026-04-01",
    finishedAt: "2026-04-10",
    rating: 5,
    description: "Nova descrição",
  });

  expect(updated.title).toBe("Livro A atualizado");
  expect(updated.finishedAt).toBe("2026-04-10");
  expect(updated.status).toBe("finalizado");
});

  it("deve deletar um livro existente", () => {
    const created = booksService.create(baseBook);

    booksService.delete(created.id);

    expect(booksService.getAll()).toHaveLength(0);
  });

  it("deve lançar erro ao atualizar livro inexistente", () => {
    expect(() =>
      booksService.update("id-inexistente", baseBook)
    ).toThrow("Livro não encontrado.");
  });

  it("deve lançar erro ao deletar livro inexistente", () => {
    expect(() => booksService.delete("id-inexistente")).toThrow(
      "Livro não encontrado."
    );
  });
});