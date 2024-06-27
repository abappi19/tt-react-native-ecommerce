import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserSchema } from "../schema/user.schema";
import { QueryKey } from "../constants/query-key";
import { UserRepository } from "../repository/user.repository";
import { Axios, AxiosResponse } from "axios";
import { CartRepository } from "../repository/cart.repository";
import { CartSchema } from "../schema/cart.schema";
import { ProductSchema } from "../schema/product.schema";
import { ProductRepository } from "../repository/product.repository";

export const useGetSingleProductQuery = ({
  productId,
}: {
  productId: number;
}) =>
  useQuery<ProductSchema>({
    queryKey: [QueryKey.QUERY_GET_SINGLE_PRODUCT, productId],
    queryFn: () =>
      ProductRepository.getSingleProduct(productId).then(
        (res: AxiosResponse<ProductSchema>) => res.data
      ),
  });

export const useGetAllCategoriesQuery = () =>
  useQuery<string[]>({
    queryKey: [QueryKey.QUERY_GET_ALL_CATEGORIES],
    queryFn: () =>
      ProductRepository.getAllCategories().then(
        (res: AxiosResponse<string[]>) => res.data
      ),
  });

export const useGetProductsByCategoryQuery = (category: string) => {
  const queryKey = [QueryKey.QUERY_GET_PRODUCTS_BY_CATEGORY, category];

  const queryClient = useQueryClient();
  const query = useQuery<ProductSchema[]>({
    queryKey,
    queryFn: () =>
      ProductRepository.getProductsByCategory(category).then(
        (res: AxiosResponse<ProductSchema[]>) => res.data
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

export const useGetAllProductsQuery = () => {
  const queryKey = [QueryKey.QUERY_GET_ALL_PRODUCTS];

  const queryClient = useQueryClient();
  const query = useQuery<ProductSchema[]>({
    queryKey,
    queryFn: () =>
      ProductRepository.getAllProducts().then(
        (res: AxiosResponse<ProductSchema[]>) => res.data
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

export const useGetLimitedProductsQuery = (limit: number) => {
  const queryKey = [QueryKey.QUERY_GET_ALL_PRODUCTS, limit];

  const queryClient = useQueryClient();
  const query = useQuery<ProductSchema[]>({
    queryKey,
    queryFn: () =>
      ProductRepository.getLimitedProducts(limit).then(
        (res: AxiosResponse<ProductSchema[]>) => res.data
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
