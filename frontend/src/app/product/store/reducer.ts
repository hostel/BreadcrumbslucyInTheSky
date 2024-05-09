import { createReducer } from '@reduxjs/toolkit';

import { TProduct } from 'api/product/types';

import { fetchProductById } from './actions';

type TProductInitialState = { content: TProduct | null; isLoading: boolean };

const INITIAL_STATE: TProductInitialState = {
  content: null,
  isLoading: false,
};

export const product = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(fetchProductById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchProductById.fulfilled, (state, { payload }) => {
      state.content = payload;
      state.isLoading = false;
    })
    .addCase(fetchProductById.rejected, (state) => {
      state.isLoading = false;
    });
});
