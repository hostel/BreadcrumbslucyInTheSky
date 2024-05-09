import { createReducer } from '@reduxjs/toolkit';

import { TProducts } from 'api/product/types';

import { fetchProducts } from './actions';

type TProductsInitialState = TProducts & { isLoading: boolean };

const INITIAL_STATE: TProductsInitialState = {
  count: 8,
  data: [],
  page: 1,
  pageCount: 0,
  total: 0,
  isLoading: true,
};

export const products = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, { payload }) => {
      state.count = payload.count;
      state.data = payload.data;
      state.page = payload.page;
      state.pageCount = payload.pageCount;
      state.total = payload.total;
      state.isLoading = false;
    })
    .addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
    });
});
