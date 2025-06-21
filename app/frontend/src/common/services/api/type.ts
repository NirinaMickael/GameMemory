import type { AxiosProgressEvent, ResponseType } from 'axios';

// DefaultParams
export type DefaultParams = {
  path: string;
  signal?: AbortSignal;
  params?: Record<string, string | number | boolean>;
};

// GET request params
export type GetParams = DefaultParams & {
  responseType?: ResponseType;
};

// POST request params
export type PostParams<T> = DefaultParams & {
  payload: T;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

// API response types
export type ApiError<T> = {
  data: T;
  status: number;
  error: unknown;
};

export type ApiBase<T> = {
  data: T;
  message: string;
  status: boolean;
};

export type ApiList<T> = ApiBase<{
  items: T[];
  hasNext: boolean;
  totalCount: number;
}>;
