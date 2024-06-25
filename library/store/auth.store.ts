import { create } from "zustand";

type AuthStore = {
  token: string | null;
  updateToken: (token: string) => void;
  removeToken: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  updateToken(token) {
    set((state) => ({
      ...state,
      token,
    }));
  },
  removeToken() {
    set((state) => ({
      ...state,
      token: null,
    }));
  },
}));

export const useStoreAuth = () => {
  const token = useAuthStore((state) => state.token);
  const updateToken = useAuthStore((state) => state.updateToken);
  const removeToken = useAuthStore((state) => state.removeToken);

  return {
    token,
    updateToken,
    removeToken,
  };
};
