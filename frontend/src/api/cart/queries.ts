import { createApi } from '@reduxjs/toolkit/query/react';

import { ApiEndpoints, TOrderParams } from 'api/cart';
import { BaseQuery } from 'services/baseQuery';

export const cartApi = createApi({
  reducerPath: 'cart',
  baseQuery: BaseQuery(),
  endpoints: (builder) => ({
    placeOrder: builder.mutation<{ orderId: number }, TOrderParams[]>({
      query: (params) => ({
        url: ApiEndpoints.placeOrderUrl(),
        method: 'POST',
        body: { products: params },
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = cartApi;
