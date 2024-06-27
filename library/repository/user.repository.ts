import { UserSchema } from "../schema/user.schema";
import { TValidUserSchema } from "../validation/user.validation";
import { apiClient } from "./api-client/api-client";

const getSingleUser = (id: number | string) =>
  apiClient({
    method: "get",
    url: `users/${id}`,
  });

const updateUser = (data:  UserSchema) =>
  apiClient({
    method: "put",
    url: `/users/${data.id}`,
    data,
  });

export const UserRepository = {
  getSingleUser,
  updateUser,
};
