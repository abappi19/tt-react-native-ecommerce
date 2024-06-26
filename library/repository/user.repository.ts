import { apiClient } from "./api-client/api-client";

const getSingleUser = (id: number | string) =>
  apiClient({
    method: "get",
    url: `users/${id}`,
  });

  

export const UserRepository = {
  getSingleUser,
};
