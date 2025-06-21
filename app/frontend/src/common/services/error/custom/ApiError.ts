import { ApiResponse } from '@/common/services/api/type';

export namespace ApiError {
  export type BaseError = {
    message: string;
    errorCode: string;
    statusCode: number;
  };
}

type ApiErrorResponse = ApiResponse.Error<{
  errors: ApiError.BaseError[];
} | null>;

export class ApiError extends Error {
  response: ApiErrorResponse;
  constructor(error: ApiErrorResponse) {
    super('[!] Get error from API');
    this.response = error;
  }

  static getErrorData(err: ApiError) {
    const data = err.response.data;
    if (data === null || data.errors.length === 0) {
      console.error(
        `Need to handle this : ${JSON.stringify(err.response, null, 3)}`,
      );
      return null;
    }
    return data;
  }
}
