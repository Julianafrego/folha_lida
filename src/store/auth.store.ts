//"use client";

import { create } from "zustand";
import { authService } from "@/services/auth.service";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginPayload) => void;
  register: (data: RegisterPayload) => void;
  logout: () => void;
  loadAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (data) => {
    const { token, user } = authService.login(data);

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  register: (data) => {
    authService.register(data);
  },

  logout: () => {
    authService.logout();

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  loadAuth: () => {
    const token = authService.getStoredToken();
    const user = authService.getStoredUser();
    const isAuthenticated = authService.isAuthenticated();

    set({
      token: isAuthenticated ? token : null,
      user: isAuthenticated ? user : null,
      isAuthenticated,
    });
  },
}));