import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryAuthLogin, useRegisterAuthQuery } from "../query/auth.query";
import { useAuthStore } from "../store/auth.store";
import { useErrorStore } from "../store/error.store";
import {
  TValidAuthLoginSchema,
  TValidAuthRegisterSchema,
  ValidAuthLoginSchema,
  ValidAuthRegisterSchema,
} from "../validation/auth.validation";

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
          updateToken(response.data.token).then(() => {
            onComplete(true);
          });
          // addError('Login success ');
        }
      },
      onError(error, variables, context) {
        // console.log("error: ", );
        addError((error as any).message);
      },
    });
  });

  return {
    isLoading,
    hookForm,
    login,
  };
}

export function useAuthRegisterService({
  onComplete,
}: {
  onComplete: (isSuccess: boolean) => void;
}) {
  const { addError } = useErrorStore();
  const { mutate, isLoading } = useRegisterAuthQuery();

  const hookForm = useForm<TValidAuthRegisterSchema>({
    resolver: zodResolver(ValidAuthRegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      address: {
        city: "",
        number: 0,
        street: "",
        zipcode: "",
        geolocation: {
          lat: "",
          long: "",
        },
      },
      email: "",
      name: {
        firstname: "",
        lastname: "",
      },
      phone: "",
    },
  });

  const register = hookForm.handleSubmit((data) => {
    mutate(data, {
      onSuccess(response) {
        if (response.data) {
          onComplete(true);
        }
      },
      onError(error, variables, context) {
        addError(error.message);
      },
    });
  });

  return {
    isLoading,
    hookForm,
    register,
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
