import { useQuery } from "@tanstack/react-query";
import { UserSchema } from "../schema/user.schema";
import { QueryKey } from "../constants/query-key";
import { UserRepository } from "../repository/user.repository";
import { Axios, AxiosResponse } from "axios";
import { CartRepository } from "../repository/cart.repository";
import { CartSchema } from "../schema/cart.schema";

export const useGetCartByUserQuery = ({ userId }: { userId: number }) =>
  useQuery<CartSchema[]>({
    queryKey: [QueryKey.QUERY_GET_CART_BY_USER_ID, userId],
    queryFn: () =>
      CartRepository.getCartByUser(userId).then(
        (res: AxiosResponse<CartSchema[]>) => res.data
      ),
  });
