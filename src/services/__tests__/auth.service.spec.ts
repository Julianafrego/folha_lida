import { describe, it, expect, beforeEach } from "vitest";
import { authService } from "@/services/auth.service";

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve registrar um novo usuário", () => {
    const user = authService.register({
      name: "Juliana",
      email: "ju@email.com",
      password: "123456",
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe("Juliana");
    expect(user.email).toBe("ju@email.com");
  });

  it("deve impedir cadastro com email duplicado", () => {
    authService.register({
      name: "Juliana",
      email: "ju@email.com",
      password: "123456",
    });

    expect(() =>
      authService.register({
        name: "Outra",
        email: "ju@email.com",
        password: "abcdef",
      })
    ).toThrow("Email já cadastrado.");
  });

  it("deve fazer login com credenciais válidas e salvar token e usuário", () => {
    authService.register({
      name: "Juliana",
      email: "ju@email.com",
      password: "123456",
    });

    const result = authService.login({
      email: "ju@email.com",
      password: "123456",
    });

    expect(result.token).toBeTruthy();
    expect(result.user.email).toBe("ju@email.com");
    expect(authService.getStoredToken()).toBe(result.token);
    expect(authService.getStoredUser()).toEqual(result.user);
  });

  it("deve falhar no login com senha inválida", () => {
    authService.register({
      name: "Juliana",
      email: "ju@email.com",
      password: "123456",
    });

    expect(() =>
      authService.login({
        email: "ju@email.com",
        password: "errada",
      })
    ).toThrow("Email ou senha inválidos.");
  });

  it("deve retornar false quando não houver token", () => {
    expect(authService.getStoredToken()).toBeNull();
    expect(authService.isAuthenticated()).toBe(false);
  });

  it("deve remover token e usuário no logout", () => {
    authService.register({
      name: "Juliana",
      email: "ju@email.com",
      password: "123456",
    });

    authService.login({
      email: "ju@email.com",
      password: "123456",
    });

    authService.logout();

    expect(authService.getStoredToken()).toBeNull();
    expect(authService.getStoredUser()).toBeNull();
    expect(authService.isAuthenticated()).toBe(false);
  });
});