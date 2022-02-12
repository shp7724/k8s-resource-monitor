import create from "zustand";
import axiosClient, { authClient, registerToken } from "../common/axios";

export interface LoginDataProps {
  username: string;
  password: string;
}

interface TokenObtainProps {
  access: string;
  refresh?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  previouseRetrierId?: number;
  requestToken: (payload: LoginDataProps) => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  previouseRetrierId: undefined,
  requestToken: async (payload) => {
    const res = await authClient.post<TokenObtainProps>("token/", payload);

    registerToken(res.data.access);

    const retrierId = get().previouseRetrierId;
    retrierId && axiosClient.interceptors.response.eject(retrierId);

    const newRetrier = axiosClient.interceptors.response.use(
      undefined,
      (err) => {
        if (!err.response || !err.config || err.response.status !== 401) {
          return Promise.reject(err);
        }
        return authClient
          .post<TokenObtainProps>("token/refresh/", {
            refresh: get().refreshToken,
          })
          .then((res) => {
            err.config.headers["Authorization"] = `Bearer ${res.data.access}`;
            registerToken(res.data.access);
            set({ isAuthenticated: true, accessToken: res.data.access });
            return axiosClient.request(err.config);
          })
          .catch((err) => {
            axiosClient.interceptors.response.eject(newRetrier);
            registerToken(null);
            set({ isAuthenticated: false, accessToken: "", refreshToken: "" });
            return Promise.reject(err);
          });
      }
    );

    set({
      isAuthenticated: true,
      accessToken: res.data.access,
      refreshToken: res.data?.refresh ?? "",
      previouseRetrierId: newRetrier,
    });
  },
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
