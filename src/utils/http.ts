import { API_URL } from "@env";
import { ITokens } from "./types/common";
import { ApiResponse as ApiResponseType } from "./types/common";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { getToken, storeToken } from "./storage";

interface RequestOptions {
  headers?: Record<string, string>;
  hasFiles?: boolean;
  signal?: AbortSignal;
  prefix?: string;
  url?: string;
}

export type ITokenDetails = {
  email: string;
  exp: number;
  iat: number;
  sub: string;
  tokenType: "access" | "refresh";
};

interface ApiResponse {
  message?: string;
  code?: number;
  key?: string;
}

export class ApiResponseError extends Error {
  key?: string;
  code: number;

  constructor(
    message?: string,
    code?: number,
    key: string | undefined = undefined,
  ) {
    super(message || "Oops! Something went wrong");
    this.key = key;
    this.name = "ApiResponseError";
    this.code = code || 400;
  }
}

export const refreshTokens = async () => {
  try {
    const token = await getToken();

    if (!token?.refreshToken)
      throw new ApiResponseError("No refresh token found", 401);

    const headers = new Headers();

    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token.refreshToken}`);

    const response = await fetch(generateURL("/staff/auth/refresh"), {
      method: "GET",
      headers,
    });

    if (response.status === 401 || response.status === 500) {
      return null;
    }

    const res: ApiResponseType<{ tokens: ITokens }> = await response.json();

    if (!response.ok) throw new Error(res.message);

    const { accessToken, refreshToken } = res.data.tokens;

    storeToken({
      accessToken,
      refreshToken,
      idToken: token.idToken,
    });

    return accessToken;
  } catch (_error) {
    throw new ApiResponseError("Login session expired.", 401);
  }
};

/**
 * Checks token's validity
 */
export const getAccessToken = async () => {
  let accessToken: string | null | true;

  try {
    const token = await getToken();
    accessToken = token?.accessToken || null;

    if (typeof accessToken === "boolean") return null;

    if (accessToken === null) return null;
  } catch (_error) {
    return null;
  }

  const decodedToken = jwtDecode<ITokenDetails>(accessToken);

  const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs(), "seconds") < 0;

  if (isExpired) {
    return refreshTokens();
  }

  return accessToken;
};

/**
 * Generate HTTP headers
 * @param {Record<string, string>} headers
 * @param {boolean} hasFiles
 * @returns {Promise<Record<string, string>>}
 */
const getHeader = async (
  headers: Record<string, string> = {},
  hasFiles = false,
): Promise<Record<string, string>> => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = await getAccessToken();

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const newHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  if (hasFiles) {
    delete newHeaders["Content-Type"];
  }

  return newHeaders;
};

/**
 * Generate HTTP body
 * @param {Record<string, any>} body
 * @param {boolean} hasFiles
 * @returns {string | FormData}
 */
const getBody = (body: any, hasFiles = false) => {
  if (hasFiles) {
    return body;
  }

  return JSON.stringify(body);
};

/**
 * Handle HTTP error
 * @param {number} httpStatusCode
 * @param {ApiResponse | Error} response
 */
const handleError = (
  httpStatusCode: number,
  response: ApiResponse | Error,
): void => {
  if (!/^(2|3)[0-9][0-9]$/.test(String(httpStatusCode))) {
    if ((response as ApiResponse).code) {
      throw new ApiResponseError(
        (response as ApiResponse).message,
        (response as ApiResponse).code,
        (response as ApiResponse).key,
      );
    } else {
      throw new ApiResponseError(response.message);
    }
  }
};

/**
 * Handle 429 Too Many Requests error
 * @param {number} httpStatusCode
 */
const checkFor429 = (httpStatusCode: number): void => {
  if (httpStatusCode === 429) {
    throw new ApiResponseError(
      "Too may requests. Please try again in sometime.",
      429,
      "too_many_request",
    );
  }
};

type ErrorResponse = {
  message?: string;
  code?: number;
};

/**
 * Generate Request URL
 * @param {string} url
 * @param {RequestOptions} options
 * @returns {string}
 */
const generateURL = (url: string, options: RequestOptions = {}): string => {
  if (options.url) {
    return options.url;
  }

  let prefix = "";
  if (options.prefix) {
    prefix = options.prefix;
  }

  return API_URL + prefix + url;
};

/**
 * HTTP GET Request
 * @method GET
 * @param {string} url
 * @param {RequestOptions} option
 * @returns {Promise<any>}
 */
const fetchGet = async <T extends ErrorResponse>(
  url: string,
  option: RequestOptions = { headers: {} },
): Promise<T> => {
  const result = await fetch(generateURL(url, option), {
    method: "GET",
    headers: await getHeader(option.headers),
    signal: option?.signal,
  });

  checkFor429(result.status);

  const response: T = await result.json();

  handleError(result.status, response);
  return response;
};

/**
 * HTTP POST Request
 * @method POST
 * @param {string} url
 * @param {Record<string, any>} body
 * @param {RequestOptions} option
 * @returns {Promise<any>}
 */
const fetchPost = async <T extends ErrorResponse>(
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false },
): Promise<T> => {
  const result = await fetch(generateURL(url), {
    method: "POST",
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

/**
 * HTTP PATCH Request
 * @method PATCH
 * @param {string} url
 * @param {Record<string, any>} body
 * @param {RequestOptions} option
 * @returns {Promise<any>}
 */
const fetchPatch = async <T extends ErrorResponse>(
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false },
): Promise<T> => {
  const result = await fetch(generateURL(url), {
    method: "PATCH",
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

/**
 * HTTP PUT Request
 * @method PUT
 * @param {string} url
 * @param {Record<string, any>} body
 * @param {RequestOptions} option
 * @returns {Promise<any>}
 */
const fetchPut = async <T extends ErrorResponse>(
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false },
): Promise<T> => {
  const result = await fetch(generateURL(url), {
    method: "PUT",
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

/**
 * HTTP DELETE Request
 * @method DELETE
 * @param {string} url
 * @param {Record<string, any>} body
 * @param {RequestOptions} option
 * @returns {Promise<any>}
 */
const fetchDelete = async <T extends ErrorResponse>(
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false },
): Promise<T> => {
  const result = await fetch(generateURL(url), {
    method: "DELETE",
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response: T = await result.json();
  handleError(result.status, response);
  return response;
};

const http = {
  get: fetchGet,
  post: fetchPost,
  put: fetchPut,
  patch: fetchPatch,
  delete: fetchDelete,
};

export default http;
