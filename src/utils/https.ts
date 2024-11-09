import { API_URL } from '@env';
import { getToken } from './storage';

interface RequestOptions {
  headers?: Record<string, string>;
  hasFiles?: boolean;
  signal?: AbortSignal;
  prefix?: string;
  url?: string;
}

interface ApiResponse {
  message?: string;
  code?: number;
  key?: string;
}

/**
 * Generate HTTP headers
 * @param {Record<string, string>} headers
 * @param {boolean} hasFiles
 * @returns {Promise<Record<string, string>>}
 */
const getHeader = async (
  headers: Record<string, string> = {},
  hasFiles = false
): Promise<Record<string, string>> => {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = await getToken();
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const newHeaders = {
    ...defaultHeaders,
    ...headers,
  };

  if (hasFiles) {
    delete newHeaders['Content-Type'];
  }

  return newHeaders;
};

/**
 * Generate HTTP body
 * @param {Record<string, any>} body
 * @param {boolean} hasFiles
 * @returns {string | FormData}
 */
const getBody = (
  body: Record<string, any>,
  hasFiles = false
): string | FormData => {
  if (hasFiles) {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    return formData;
  }

  return JSON.stringify(body);
};

export class ApiResponseError extends Error {
  key?: string;
  code: number;

  constructor(
    message?: string,
    code?: number,
    key: string | undefined = undefined
  ) {
    super(message || 'Oops! Something went wrong');
    this.key = key;
    this.name = 'ApiResponseError';
    this.code = code || 400;
  }
}

/**
 * Handle HTTP error
 * @param {number} httpStatusCode
 * @param {ApiResponse | Error} response
 */
const handleError = (
  httpStatusCode: number,
  response: ApiResponse | Error
): void => {
  if (!/^(2|3)[0-9][0-9]$/.test(String(httpStatusCode))) {
    if ((response as ApiResponse).code) {
      throw new ApiResponseError(
        (response as ApiResponse).message,
        (response as ApiResponse).code,
        (response as ApiResponse).key
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
      'You are temporarily blocked. Please try again in sometime.',
      429,
      'too_many_request'
    );
  }
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

  let prefix = '';
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
const fetchGet = async (
  url: string,
  option: RequestOptions = { headers: {} }
): Promise<any> => {
  const result = await fetch(generateURL(url), {
    method: 'GET',
    headers: await getHeader(option.headers),
    signal: option?.signal,
  });

  checkFor429(result.status);

  const response = await result.json();
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
const fetchPost = async (
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false }
): Promise<any> => {
  const result = await fetch(generateURL(url), {
    method: 'POST',
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response = await result.json();
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
const fetchPatch = async (
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false }
): Promise<any> => {
  const result = await fetch(generateURL(url), {
    method: 'PATCH',
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response = await result.json();
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
const fetchPut = async (
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false }
): Promise<any> => {
  const result = await fetch(generateURL(url), {
    method: 'PUT',
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response = await result.json();
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
const fetchDelete = async (
  url: string,
  body: Record<string, any> = {},
  option: RequestOptions = { headers: {}, hasFiles: false }
): Promise<any> => {
  const result = await fetch(generateURL(url), {
    method: 'DELETE',
    headers: await getHeader(option.headers, option.hasFiles),
    body: getBody(body, option.hasFiles),
  });

  checkFor429(result.status);

  const response = await result.json();
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
