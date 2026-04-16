import { v4 as uuid } from "uuid";
import { storage } from "@/services/storage.service";
import { generateMockToken, isTokenValid } from "@/utils/jwt";
import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth";

const USERS_KEY = "users";
const TOKEN_KEY = "token";
const AUTH_USER_KEY = "auth_user";

function getUsers(): User[] {
  return storage.get<User[]>(USERS_KEY) ?? [];
}

function saveUsers(users: User[]): void {
  storage.set(USERS_KEY, users);
}

export const authService = {
  register(data: RegisterPayload): User {
    const users = getUsers();

    const normalizedEmail = data.email.trim().toLowerCase();
    const emailExists = users.some(
      (user) => user.email.trim().toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      throw new Error("Email já cadastrado.");
    }

    const newUser: User = {
      id: uuid(),
      name: data.name.trim(),
      email: normalizedEmail,
      password: data.password,
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
  },

  login(data: LoginPayload): { token: string; user: AuthUser } {
    const users = getUsers();

    const normalizedEmail = data.email.trim().toLowerCase();

    const user = users.find(
      (item) =>
        item.email.trim().toLowerCase() === normalizedEmail &&
        item.password === data.password
    );

    if (!user) {
      throw new Error("Email ou senha inválidos.");
    }

    const authUser: AuthUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = generateMockToken({
      userId: user.id,
      email: user.email,
    });

    storage.set(TOKEN_KEY, token);
    storage.set(AUTH_USER_KEY, authUser);

    return { token, user: authUser };
  },

  logout(): void {
    storage.remove(TOKEN_KEY);
    storage.remove(AUTH_USER_KEY);
  },

  getStoredToken(): string | null {
    return storage.get<string>(TOKEN_KEY);
  },

  getStoredUser(): AuthUser | null {
    return storage.get<AuthUser>(AUTH_USER_KEY);
  },

  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    if (!token) return false;
    return isTokenValid(token);
  },
};