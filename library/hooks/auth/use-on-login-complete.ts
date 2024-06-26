import { useAuthStore } from "@/library/store/auth.store";
import { useUserStore } from "@/library/store/user.store";
import { useCallback } from "react";

export const useOnLoginComplete = () => {
  const { token } = useAuthStore();
  const { user, removeUser, setUser } = useUserStore();

  const onComplete = useCallback(() => {}, []);

  return {
    onComplete,
  };
};
