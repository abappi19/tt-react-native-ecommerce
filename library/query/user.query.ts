import { useMutation, useQuery } from "@tanstack/react-query";
import { UserSchema } from "../schema/user.schema";
import { QueryKey } from "../constants/query-key";
import { UserRepository } from "../repository/user.repository";
import { Axios, AxiosResponse } from "axios";
import { TValidUserSchema } from "../validation/user.validation";

export const useGetSingleUserQuery = ({ userId }: { userId: number }) =>
  useQuery<UserSchema>({
    queryKey: [QueryKey.QUERY_GET_SINGLE_USER, userId],
    queryFn: () =>
      UserRepository.getSingleUser(userId).then(
        (res: AxiosResponse<UserSchema>) => res.data
      ),
  });

export const useUpdateUserQuery = () =>
  useMutation<{ data: UserSchema }, unknown, UserSchema>({
    mutationFn: UserRepository.updateUser,
  });
