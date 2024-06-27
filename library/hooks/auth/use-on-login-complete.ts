import { useAuthStore } from "@/library/store/auth.store";
import { useUserStore } from "@/library/store/user.store";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";
import { AppRouterPath } from "@/library/constants/app-router-path";

export const useOnLoginComplete = () => {
  const onComplete = useCallback(() => {
    if (router.canDismiss()) router.dismissAll();
    router.replace(AppRouterPath.initial);
  }, []);

  return {
    onComplete,
  };
};
