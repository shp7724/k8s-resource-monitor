import create from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  username: string;
  token: string;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: "",
  token: "",
}));

interface AuthModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true });
  },
  closeModal: () => {
    set({ isOpen: false });
  },
}));
