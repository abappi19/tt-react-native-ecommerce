import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { SecureStoreKey } from "../constants/secure-store-key";

type AuthStoreSchema = {
  token: string | null;
  updateToken: (token: string) => Promise<void>;
  removeToken: () => void;
};

const AuthStore = create<AuthStoreSchema>((set) => ({
  token: SecureStore.getItem(SecureStoreKey.KEY_AUTH_TOKEN),
  async updateToken(token) {
    return await SecureStore.setItemAsync(
      SecureStoreKey.KEY_AUTH_TOKEN,
      token
    ).then(() =>
      set((state) => ({
        ...state,
        token,
      }))
    );
  },
  removeToken() {
    SecureStore.deleteItemAsync(SecureStoreKey.KEY_AUTH_TOKEN).then(() =>
      set((state) => ({
        ...state,
        token: null,
      }))
    );
  },
}));

export const useAuthStore = () => {
  const token = AuthStore((state) => state.token);
  const updateToken = AuthStore((state) => state.updateToken);
  const removeToken = AuthStore((state) => state.removeToken);

  return {
    token,
    updateToken,
    removeToken,
  };
};
