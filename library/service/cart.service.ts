import { useGetCartByUserQuery } from "../query/cart.query";

export const useGetCartByUserIdService = (userId: number) => {
  const query = useGetCartByUserQuery({ userId });

  return {
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};
