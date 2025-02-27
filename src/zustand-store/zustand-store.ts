import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsAuthenticated: (authState: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: authState => set(() => ({ isAuthenticated: authState })),
}));
