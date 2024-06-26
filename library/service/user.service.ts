import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";
import { QueryKey } from "../constants/query-key";
import { useGetSingleUserQuery } from "../query/user.query";
import { useState } from "react";

export const useGetSingleUserService = (userId: number) => {
  const query = useGetSingleUserQuery({ userId });

  return {
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};
