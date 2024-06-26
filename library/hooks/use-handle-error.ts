import { useState } from "react";
import { useErrorStore } from "../store/error.store";

export const useHandleError = () => {
  const { errors, addError, removeError } = useErrorStore();

  return { errors, addError, removeError };
};
