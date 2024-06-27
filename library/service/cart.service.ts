import { useGetCartByUserQuery } from "../query/cart.query";

export const useGetCartByUserIdService = (userId: number) => {
  const { query, invalidate } = useGetCartByUserQuery({ userId });

  
  return {
    invalidate,
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};
