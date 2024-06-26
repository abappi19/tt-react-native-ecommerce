import { useGetCartByUserQuery } from "../query/cart.query";
import { useGetSingleProductQuery } from "../query/product.query";
import { useGetSingleUserQuery } from "../query/user.query";

export const useGetSingleProductService = (productId: number) => {
  const query = useGetSingleProductQuery({ productId });

  return {
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};
