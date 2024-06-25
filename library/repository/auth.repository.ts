import { RequestSchemas } from "../schema/request.schema";
import { apiClient } from "./api-client/api-client";

const validateAuth = () => {};

const login = (data: RequestSchemas.LoginSchema) =>
  apiClient({
    method: "post",
    url:"/auth/login",
    data: data,
  });

export const AuthRepository = {
  login,
};
