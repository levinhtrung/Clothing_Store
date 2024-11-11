import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (callBack) => {
  const mutation = useMutation({
    mutationFn: callBack,
  });
  return mutation;
};
