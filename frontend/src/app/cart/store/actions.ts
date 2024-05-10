import { createAction } from '@reduxjs/toolkit';

import { TProduct, TSizes } from 'api/product/types';

export type TCartItem = {
  size: TSizes;
} & TProduct;

export type TCounterItem = TCartItem & { count: number };

export type TRemoveCartParams = Pick<TCartItem, 'id' | 'size'>;

export const addToCart = createAction<TCartItem>('cart/addToCart');

export const removeFromCart = createAction<TRemoveCartParams>('cart/removeFromCart');

export const clearCart = createAction('cart/clearCart');
