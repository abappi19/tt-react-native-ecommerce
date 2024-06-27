import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";
import { QueryKey } from "../constants/query-key";
import { useGetSingleUserQuery, useUpdateUserQuery } from "../query/user.query";
import { useState } from "react";
import { UserSchema } from "../schema/user.schema";
import { useForm } from "react-hook-form";
import {
  TValidUserSchema,
  ValidUserSchema,
} from "../validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";

export const useGetSingleUserService = (userId: number) => {
  const query = useGetSingleUserQuery({ userId });

  return {
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};

export const useUpdateUserService = ({
  onComplete,
  defaultValues,
}: {
  onComplete: (user: UserSchema) => void;
  defaultValues: UserSchema | undefined;
}) => {
  const { mutate, isLoading } = useUpdateUserQuery();

  const hookForm = useForm<UserSchema>({
    resolver: zodResolver(ValidUserSchema),
    defaultValues,

    // {
    //   username: "",
    //   password: "",
    //   address: {
    //     city: "",
    //     number: 0,
    //     street: "",
    //     zipcode: "",
    //     geolocation: {
    //       lat: "",
    //       long: "",
    //     },
    //   },
    //   email: "",
    //   name: {
    //     firstname: "",
    //     lastname: "",
    //   },
    //   phone: "",
    // },
  });

  const update = hookForm.handleSubmit((data) => {
    mutate(data, {
      onSuccess(response) {
        onComplete(response.data);
      },
    });
  });

  return { update, isLoading, hookForm };
};
