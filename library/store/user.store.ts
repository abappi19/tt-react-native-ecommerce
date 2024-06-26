import { create } from "zustand";
import { UserSchema } from "../schema/user.schema";

type UserStoreSchema = {
  user: UserSchema | null;
  setUser: (user: UserSchema) => void;
  removeUser: () => void;
};

const UserStore = create<UserStoreSchema>((set) => ({
  user: null,
  removeUser() {
    set((state) => ({ ...state, user: null }));
  },
  setUser(user) {
    set((state) => ({ ...state, user }));
  },
}));

export const useUserStore = () => {
  const user = UserStore((state) => state.user);
  const removeUser = UserStore((state) => state.removeUser);
  const setUser = UserStore((state) => state.setUser);

  return {
    user,
    setUser,
    removeUser,
  };
};
