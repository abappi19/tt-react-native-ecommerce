import { useGetCartByUserQuery, useUpdateCartQuery } from "../query/cart.query";
import { CartSchema } from "../schema/cart.schema";
import { useErrorStore } from "../store/error.store";

export const useGetCartByUserIdService = (userId: number) => {
  const { query, invalidate } = useGetCartByUserQuery({ userId });

  return {
    invalidate,
    query,
    data: query.data,
    isLoading: query.isLoading,
  };
};

export function useUpdateCartService({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { addError } = useErrorStore();
  const { mutate, isLoading } = useUpdateCartQuery();

  const updateCart = (data: CartSchema) => {
    mutate(data, {
      onSuccess(response) {
        onComplete();
      },
      onError(error, variables, context) {
        // console.log("error: ", );
        addError((error as any).message);
      },
    });
  };

  return {
    isLoading,
    updateCart,
  };
}
