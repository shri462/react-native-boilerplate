export interface IDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type StripDocument<T extends IDocument> = Omit<
  T,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

export type ObjectValues<T> = T[keyof T];

export interface IPaginatedQuery {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search?: string;
}

export interface IPagination {
  currentPage: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: string;
  totalDocs: number;
  totalPages: number;
}

export type ApiResponseWithPagination<T, K extends string> = {
  data: {
    // eslint-disable-next-line no-unused-vars
    [Key in K]: T;
  } & {
    pagination?: IPagination;
  };
  message?: string;
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ITokens = {
  accessToken: string;
  refreshToken: string;
};

export type TStatus = "ACTIVE" | "INACTIVE";
