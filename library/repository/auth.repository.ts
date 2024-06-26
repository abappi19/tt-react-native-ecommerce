import { RequestSchemas } from "../schema/request.schema";
import { TValidAuthRegisterSchema } from "../validation/auth.validation";
import { apiClient } from "./api-client/api-client";

const validateAuth = () => {};

const login = (data: RequestSchemas.LoginSchema) =>
  apiClient({
    method: "post",
    url: "/auth/login",
    data,
  });
const register = (data: TValidAuthRegisterSchema) =>
  apiClient({
    method: "post",
    url: "/users",
    data,
  });

export const AuthRepository = {
  login,
  register,
};
