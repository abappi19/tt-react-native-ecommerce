import { useGetCartByUserQuery } from "../query/cart.query";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetLimitedProductsQuery,
  useGetProductsByCategoryQuery,
  useGetSingleProductQuery,
} from "../query/product.query";
import { useGetSingleUserQuery } from "../query/user.query";

export const useGetSingleProductService = (productId: number) => {
  const query = useGetSingleProductQuery({ productId });

  return {
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};

export const useGetAllCategoriesService = () => {
  const query = useGetAllCategoriesQuery();

  return {
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};


export const useGetProductsByCategoryService = (category: string) => {
  const { query, invalidate } = useGetProductsByCategoryQuery(category);

  return {
    query,
    invalidate,
    data: query.data,
    isLoading: query.isLoading,
  };
};

export const useGetAllProductsService = () => {
  const { query, invalidate } = useGetAllProductsQuery();

  return {
    query,
    invalidate,
    data: query.data,
    isLoading: query.isLoading,
  };
};

export const useGetLimitedProductsService = (limit:number) => {
  const { query, invalidate } = useGetLimitedProductsQuery(limit);

  return {
    query,
    invalidate,
    data: query.data,
    isLoading: query.isLoading,
  };
};
