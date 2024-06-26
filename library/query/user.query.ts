import { useQuery } from "@tanstack/react-query";
import { UserSchema } from "../schema/user.schema";
import { QueryKey } from "../constants/query-key";
import { UserRepository } from "../repository/user.repository";
import { Axios, AxiosResponse } from "axios";

export const useGetSingleUserQuery = ({ userId }: { userId: number }) =>
  useQuery<UserSchema>({
    queryKey: [QueryKey.QUERY_GET_SINGLE_USER, userId],
    queryFn: () =>
      UserRepository.getSingleUser(userId).then(
        (res: AxiosResponse<UserSchema>) => res.data
      ),
  });
