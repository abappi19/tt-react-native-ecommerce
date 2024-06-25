import { useStoreAuth } from "../store/auth.store";

export function useServiceAuthValidate() {
  const { removeToken, token, updateToken } = useStoreAuth();

  const validateAuth = () => {
    return token != null;
  };

  return {
    validateAuth,
  };
}

export function useServiceAuthLogin() {
  const { removeToken, token, updateToken } = useStoreAuth();
}
export function useServiceAuthLogout() {
  const { removeToken, token, updateToken } = useStoreAuth();

  const logout = () => removeToken();

  return {
    logout,
  };
}
