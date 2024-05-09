import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ApiEndpoints, TOrderParams } from 'api/cart';
import { TProduct, TSizes } from 'api/product/types';
import { http } from 'services/Http';

export type TCartItem = {
  size: TSizes;
} & TProduct;

export type TCounterItem = TCartItem & { count: number };

export type TRemoveCartParams = Pick<TCartItem, 'id' | 'size'>;

export const addToCart = createAction<TCartItem>('cart/addToCart');

export const removeFromCart = createAction<TRemoveCartParams>('cart/removeFromCart');

export const clearCart = createAction('cart/clearCart');

export const sendPlaceOrder = createAsyncThunk('cart/placeOrder', async (params: TOrderParams[]) => {
  const response = await http.post<{ orderId: number }>(ApiEndpoints.placeOrderUrl(), { products: params });
  return response.data;
});
