import { ApiResponse, ITokens } from "../../utils/types/common";
import http from "../../utils/http";
import { ILoginRequest, IUser } from "../../utils/types/entities";

export const loginWithEmail = async (payload: ILoginRequest) =>
  http.post<ApiResponse<ITokens>>("/auth/login", payload);

export const getUser = async () =>
  http.get<ApiResponse<{ user: IUser }>>("/auth/me");
