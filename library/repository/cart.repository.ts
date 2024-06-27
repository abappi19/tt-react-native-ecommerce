import { CartSchema } from "../schema/cart.schema";
import { apiClient } from "./api-client/api-client";

const getCartByUser = (userId: number) =>
  apiClient({
    method: "get",
    url: `/carts/user/${userId}`,
  });

const updateCart = (data: CartSchema) =>
  apiClient({
    method: "put",
    url: `/carts/${data.id}`,
    data,
  });

export const CartRepository = {
  getCartByUser,
  updateCart,
};
