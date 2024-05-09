import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosInstance, AxiosPromise } from 'axios';

import { HttpDataParamsType, HttpMethods, HttpOptionsType, HttpRequestMethodType } from './Http.types';

function isItHttpTransferableData(data: any): boolean {
  try {
    JSON.parse(data as string);

    return true;
  } catch (e) {
    return (
      typeof data === 'string' ||
      data instanceof ArrayBuffer ||
      data instanceof Int8Array ||
      data instanceof Uint8Array ||
      data instanceof Uint8ClampedArray ||
      data instanceof Int16Array ||
      data instanceof Uint16Array ||
      data instanceof Int32Array ||
      data instanceof Uint32Array ||
      data instanceof Float32Array ||
      data instanceof Float64Array ||
      data instanceof DataView ||
      data instanceof Blob ||
      data instanceof File ||
      data instanceof URLSearchParams ||
      data instanceof FormData
    );
  }
}

function buildFormData(data: HttpDataParamsType) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => formData.set(key, value));

  return formData;
}

class Http {
  private readonly http: AxiosInstance;

  public constructor({ baseURL = '/api/', headers = {} }: HttpOptionsType = {}) {
    const axiosInstance = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

        ...headers,
      },
      transformRequest: [(data) => (isItHttpTransferableData(data) ? data : JSON.stringify(data))],
      transformResponse: [
        (data) => {
          try {
            return JSON.parse(data);
          } catch (e) {
            return data;
          }
        },
      ],
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(error),
    );

    this.http = axiosInstance;
  }

  public get baseUrl(): string | undefined {
    return this.http.defaults.baseURL;
  }

  public get<T>(url: string, params: HttpDataParamsType = {}): AxiosPromise<T> {
    return this.request({ method: HttpMethods.GET, url, params });
  }

  public post<T>(url: string, data: HttpDataParamsType = {}): AxiosPromise<T> {
    return this.request({ method: HttpMethods.POST, url, data });
  }

  public patch<T>(url: string, data: HttpDataParamsType = {}): AxiosPromise<T> {
    return this.request({ method: HttpMethods.PATCH, url, data });
  }

  public put<T>(url: string, data: HttpDataParamsType = {}): AxiosPromise<T> {
    return this.request({ method: HttpMethods.PUT, url, data });
  }

  public delete<T>(url: string, data: HttpDataParamsType = {}): AxiosPromise<T> {
    return this.request({ method: HttpMethods.DELETE, url, data });
  }

  private request({ method, url, data = {}, params = {} }: HttpRequestMethodType): AxiosPromise {
    return this.http
      .request({
        method,
        url,
        headers: {},
        params,
        data,
      })
      .catch((error) => {
        const message = error?.response
          ? Array.isArray(error.response.data.message)
            ? error.response.data.message.join('\n')
            : error.response.data.message
          : error.message;

        toast.error(message);

        throw error;
      });
  }
}

export const http = new Http({
  baseURL: 'http://localhost:3001',
});
