import { create } from "zustand";

type TError = {
  id: number;
  text: string;
};

type ErrorStoreSchema = {
  errors: TError[];
  addError: (text: string) => void;
  removeError: (id: number) => void;
};

const ErrorStore = create<ErrorStoreSchema>((set) => ({
  errors: [],
  removeError(id: number) {
    set((state) => ({
      ...state,
      errors: state.errors.filter((error) => error.id !== id),
    }));
  },
  addError(text: string) {
    const error = { id: Date.now(), text };
    set((state) => ({
      ...state,
      errors: [...state.errors, error],
    }));

    setTimeout(() => {
      set((state) => ({
        ...state,
        errors: state.errors.filter((e) => e.id !== error.id),
      }));
    }, 2500);
  },
}));

export const useErrorStore = () => {
  const errors = ErrorStore((state) => state.errors);
  const removeError = ErrorStore((state) => state.removeError);
  const addError = ErrorStore((state) => state.addError);

  return {
    errors,
    addError,
    removeError,
  };
};
