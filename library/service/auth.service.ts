import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useHandleError } from "../hooks/use-handle-error";
import { useQueryAuthLogin } from "../query/auth.query";
import { useAuthStore } from "../store/auth.store";
import {
  TValidAuthLoginSchema,
  ValidAuthLoginSchema,
} from "../validation/auth.validation";
import { useErrorStore } from "../store/error.store";

export function useAuthValidateService() {
  const { token } = useAuthStore();
  const validateAuth = () => {
    return token != null;
  };

  return {
    validateAuth,
  };
}

export function useAuthLoginService({
  onComplete,
}: {
  onComplete: (isSuccess: boolean) => void;
}) {
  const { addError } = useErrorStore();
  const { token, updateToken } = useAuthStore();
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
        if (response.data.token) {
          updateToken(response.data.token);
          onComplete(true);
        }
      },
      onError(error, variables, context) {
        // console.log("error: ", );
        addError(error as string);
      },
    });
  });

  return {
    isLoading,
    hookForm,
    login,
  };
}
export function useAuthLogoutService({ onLogout }: { onLogout: () => void }) {
  const { token, removeToken } = useAuthStore();

  const logout = () => {
    removeToken();
    onLogout();
  };

  return {
    logout,
  };
}
