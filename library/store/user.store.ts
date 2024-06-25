import { create } from "zustand";
import { UserSchema } from "../schema/user.schema";

type UserStore = {
  user: UserSchema | null;
  setUser: (user: UserSchema) => void;
  removeUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  removeUser() {
    set((state) => ({ ...state, user: null }));
  },
  setUser(user) {
    set((state) => ({ ...state, user }));
  },
}));

const useStoreUser = () => {
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const setUser = useUserStore((state) => state.setUser);

  return {
    user,
    setUser,
    removeUser,
  };
};
