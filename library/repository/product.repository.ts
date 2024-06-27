import { apiClient } from "./api-client/api-client";

const getSingleProduct = (productId: number) =>
  apiClient({
    method: "get",
    url: `/products/${productId}`,
  });

const getAllCategories = () =>
  apiClient({
    method: "get",
    url: `/products/categories`,
  });

const getProductsByCategory = (category: string) =>
  apiClient({
    method: "get",
    url: `/products/category/${encodeURI(category)}`,
  });

const getLimitedProducts = (limit: number) =>
  apiClient({
    method: "get",
    url: `/products?limit=${limit}`,
  });

const getAllProducts = () =>
  apiClient({
    method: "get",
    url: `/products`,
  });

export const ProductRepository = {
  getSingleProduct,
  getAllCategories,
  getProductsByCategory,
  getLimitedProducts,
  getAllProducts,
};
