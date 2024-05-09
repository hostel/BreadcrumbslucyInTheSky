import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiEndpoints, TProduct } from 'api/product';
import { http } from 'services/Http';

export const fetchProductById = createAsyncThunk('product/fetchProductById', async (params: { productId: number }) => {
  const response = await http.get<TProduct>(ApiEndpoints.productUrl(params.productId));
  return response.data;
});
