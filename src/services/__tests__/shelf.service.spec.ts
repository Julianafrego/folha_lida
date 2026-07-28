import { describe, it, expect, beforeEach } from "vitest";
import { shelvesService } from "@/services/shelf.service";
import type { CreateShelfPayload } from "@/types/shelf";

describe("shelvesService", () => {
  const baseShelf: CreateShelfPayload = {
    name: "Drama",
    matchMode: "all",
    rules: [{ field: "genre", value: "Drama" }],
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "auth_user",
      JSON.stringify({ id: "user-1", name: "Usuário", email: "user@email.com" })
    );
  });

  it("deve criar uma estante automática", () => {
    const created = shelvesService.create(baseShelf);

    expect(created.id).toBeDefined();
    expect(created.name).toBe("Drama");
    expect(created.rules).toEqual([{ field: "genre", value: "Drama" }]);
    expect(shelvesService.getAll()).toHaveLength(1);
  });

  it("deve criar uma estante por gênero e status", () => {
    const created = shelvesService.create({
      name: "Dramas finalizados",
      matchMode: "all",
      rules: [
        { field: "genre", value: "Drama" },
        { field: "status", value: "finalizado" },
      ],
    });

    expect(created.rules).toHaveLength(2);
    expect(created.matchMode).toBe("all");
  });

  it("deve atualizar uma estante", () => {
    const created = shelvesService.create(baseShelf);

    const updated = shelvesService.update(created.id, {
      name: "Livros dropados",
      matchMode: "all",
      rules: [{ field: "status", value: "dropado" }],
    });

    expect(updated.name).toBe("Livros dropados");
    expect(updated.rules).toEqual([{ field: "status", value: "dropado" }]);
  });

  it("deve deletar uma estante", () => {
    const created = shelvesService.create(baseShelf);

    shelvesService.delete(created.id);

    expect(shelvesService.getAll()).toHaveLength(0);
  });

  it("deve impedir estante sem regra", () => {
    expect(() =>
      shelvesService.create({ name: "Sem regra", matchMode: "all", rules: [] })
    ).toThrow("Informe pelo menos uma regra para a estante.");
  });
});
