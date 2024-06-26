import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthRepository } from "../repository/auth.repository";
import { RequestSchemas } from "../schema/request.schema";
import { TValidAuthRegisterSchema } from "../validation/auth.validation";
import { UserSchema } from "../schema/user.schema";

export const useQueryAuthLogin = () =>
  useMutation<
    {
      data: {
        token: string;
      };
    },
    {
      message: string;
    },
    RequestSchemas.LoginSchema
  >({
    mutationFn: AuthRepository.login,
  });

export const useRegisterAuthQuery = () =>
  useMutation<
    {
      data: UserSchema;
    },
    {
      message: string;
    },
    TValidAuthRegisterSchema
  >({
    mutationFn: AuthRepository.register,
  });
