import { useQuery } from "@tanstack/react-query";
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

export const useGetProductsByCategoryQuery = (category: string) =>
  useQuery<ProductSchema[]>({
    queryKey: [QueryKey.QUERY_GET_PRODUCTS_BY_CATEGORY, category],
    queryFn: () =>
      ProductRepository.getProductsByCategory(category).then(
        (res: AxiosResponse<ProductSchema[]>) => res.data
      ),
  });
