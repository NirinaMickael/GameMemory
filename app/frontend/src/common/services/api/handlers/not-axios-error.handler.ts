import { ApiError } from '@/common/services/error';

export function handleNonAxiosError<T>(error: T) {
  console.error(' >  NOT AXIOS ERROR', JSON.stringify(error, null, 3));
  return Promise.reject(
    new ApiError({
      data: null,
      status: -1,
      error,
    }),
  );
}
