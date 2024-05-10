import { createApi } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints, TProduct, TProducts } from 'api/product';
import { BaseQuery } from 'services/baseQuery';

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: BaseQuery(),
  endpoints: (builder) => ({
    fetchProducts: builder.query<TProducts, { page: number }>({
      query: (params) => ({
        url: ApiEndpoints.productsUrl(),
        params,
      }),
    }),
    fetchProduct: builder.query<TProduct, { productId: number }>({
      query: (params) => ({
        url: ApiEndpoints.productUrl(params.productId),
      }),
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductQuery } = productsApi;
