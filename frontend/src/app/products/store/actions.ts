import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiEndpoints, TProducts } from 'api/product';
import { http } from 'services/Http';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (params: { page: number }) => {
  const response = await http.get<TProducts>(ApiEndpoints.productsUrl(), params);
  return response.data;
});
