import { useForm } from "react-hook-form";
import { useStoreAuth } from "../store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TValidAuthLoginSchema,
  ValidAuthLoginSchema,
} from "../validation/auth.validation";

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
  

  const hookForm = useForm<TValidAuthLoginSchema>({
    resolver: zodResolver(ValidAuthLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = hookForm.handleSubmit((data)=>{
    
  });



}
export function useServiceAuthLogout() {
  const { removeToken, token, updateToken } = useStoreAuth();

  const logout = () => removeToken();

  return {
    logout,
  };
}
