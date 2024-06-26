import { apiClient } from "./api-client/api-client";

const getSingleProduct = (productId: number) =>
  apiClient({
    method: "get",
    url: `/products/${productId}`,
  });

export const ProductRepository = {
  getSingleProduct,
};
