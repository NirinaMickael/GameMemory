import { API } from '@/common/services/api/client';
import type { AxiosResponse } from 'axios';
import type { GetParams, PostParams } from './type';

export async function GET<R>(params: GetParams): Promise<R> {
  const { path, signal, responseType, params: queryParams } = params;
  console.log("path", path);

  const response = await API.get<R>(path, {
    responseType,
    params: queryParams,
    signal,
  });
  return response.data;
}

export async function POST<R, P>(params: PostParams<P>): Promise<R> {
  const { path, signal, payload } = params;
  const response = await API.post<R, AxiosResponse<R>, P>(path, payload, {
    signal,
  });
  return response.data;
}
