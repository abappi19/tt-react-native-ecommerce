import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthRepository } from "../repository/auth.repository";
import { RequestSchemas } from "../schema/request.schema";

export const useQueryAuthLogin = () =>
  useMutation<
    {
      token: string;
    },
    unknown,
    RequestSchemas.LoginSchema
  >({
    mutationFn: AuthRepository.login,
  });
