import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserSchema } from "../schema/user.schema";
import { QueryKey } from "../constants/query-key";
import { UserRepository } from "../repository/user.repository";
import { Axios, AxiosResponse } from "axios";
import { CartRepository } from "../repository/cart.repository";
import { CartSchema } from "../schema/cart.schema";

export const useGetCartByUserQuery = ({ userId }: { userId: number }) => {
  const queryKey = [QueryKey.QUERY_GET_CART_BY_USER_ID, userId];

  const queryClient = useQueryClient();
  const query = useQuery<CartSchema[]>({
    queryKey,
    queryFn: () =>
      CartRepository.getCartByUser(userId).then(
        (res: AxiosResponse<CartSchema[]>) => res.data
      ),
  });
  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey,
    });

  return {
    query,
    invalidate,
  };
};

export const useUpdateCartQuery = () =>
  useMutation<
    {
      data: UserSchema;
    },
    {
      message: string;
    },
    CartSchema
  >({
    mutationFn: CartRepository.updateCart,
  });
