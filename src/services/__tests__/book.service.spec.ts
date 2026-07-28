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
    status: "não_iniciado",
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "auth_user",
      JSON.stringify({ id: "user-1", name: "Usuário", email: "user@email.com" })
    );
  });

  it("deve criar livro usando o status definido pelo usuário", () => {
    const created = booksService.create(baseBook);

    expect(created.id).toBeDefined();
    expect(created.status).toBe("não_iniciado");
    expect(created.createdAt).toBeDefined();
    expect(created.updatedAt).toBeDefined();
    expect(booksService.getAll()).toHaveLength(1);
  });

  it("deve permitir livro finalizado sem data final quando o usuário não lembra a data", () => {
    const created = booksService.create({
      ...baseBook,
      status: "finalizado",
      startedAt: "",
      finishedAt: "",
    });

    expect(created.status).toBe("finalizado");
    expect(created.finishedAt).toBe("");
  });

  it("deve permitir livro dropado com ou sem datas", () => {
    const created = booksService.create({
      ...baseBook,
      status: "dropado",
      startedAt: "2026-04-01",
      finishedAt: "",
    });

    expect(created.status).toBe("dropado");
    expect(created.startedAt).toBe("2026-04-01");
  });

  it("deve atualizar um livro mantendo o status escolhido no formulário", () => {
    const created = booksService.create({
      ...baseBook,
      title: "Livro A",
      genres: ["Fantasia"],
      totalPages: 200,
      startedAt: "2026-04-01",
      status: "lendo",
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
      status: "dropado",
    });

    expect(updated.title).toBe("Livro A atualizado");
    expect(updated.finishedAt).toBe("2026-04-10");
    expect(updated.status).toBe("dropado");
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
