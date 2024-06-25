import { useForm } from "react-hook-form";
import { useStoreAuth } from "../store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TValidAuthLoginSchema,
  ValidAuthLoginSchema,
} from "../validation/auth.validation";
import { useQueryAuthLogin } from "../query/auth.query";
import { UserSchema } from "../schema/user.schema";

export function useServiceAuthValidate() {
  const { removeToken, token, updateToken } = useStoreAuth();

  const validateAuth = () => {
    return token != null;
  };

  return {
    validateAuth,
  };
}

export function useServiceAuthLogin({
  onComplete,
}: {
  onComplete: (isSuccess: boolean) => void;
}) {
  const { removeToken, token, updateToken } = useStoreAuth();

  const { mutate, isLoading } = useQueryAuthLogin();

  const hookForm = useForm<TValidAuthLoginSchema>({
    resolver: zodResolver(ValidAuthLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = hookForm.handleSubmit((data) => {
    mutate(data, {
      onSuccess(response) {
        
        

      },
      onError(error, variables, context) {
        onComplete(false);
      },
    });
  });

  return {
    isLoading,
    hookForm,
    login,
  };
}
export function useServiceAuthLogout() {
  const { removeToken, token, updateToken } = useStoreAuth();

  const logout = () => removeToken();

  return {
    logout,
  };
}
