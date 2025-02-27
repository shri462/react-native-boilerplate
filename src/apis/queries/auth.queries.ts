import { useMutation, useQuery } from "@tanstack/react-query";
import { ILoginRequest } from "../../utils/types/entities";
import { getUser } from "../requests/auth.requests";
import { loginWithEmail } from "../requests/auth.requests";
import onApiError from "../../utils/error";

export const useLoginWithEmail = () =>
  useMutation({
    mutationFn: async (payload: ILoginRequest) => {
      const res = await loginWithEmail(payload);
      return res.data;
    },
    onError: onApiError,
  });

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await getUser();
      return res.data.user;
    },
    retry: false,
  });
