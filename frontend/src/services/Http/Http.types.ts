import { AxiosError } from 'axios';

export type HttpOnErrorType = (error: AxiosError | Error) => void;

export type HttpOptionsType = {
  baseURL?: string;
  headers?: Record<string, string>;
};

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type HttpDataParamsType = Record<string, any>;

export type HttpRequestMethodType = {
  method: HttpMethods;
  url: string;
  data?: HttpDataParamsType;
  params?: HttpDataParamsType;
  headers?: HttpDataParamsType;
};
