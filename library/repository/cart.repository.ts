import { apiClient } from "./api-client/api-client";

const getCartByUser = (userId: number) =>
  apiClient({
    method: "get",
    url: `/carts/user/${userId}`,
  });

export const CartRepository = {
  getCartByUser,
};
