import { createReducer } from '@reduxjs/toolkit';

import { addToCart, clearCart, removeFromCart, sendPlaceOrder, TCounterItem } from './actions';

type TCartInitialState = {
  counter: Record<string, TCounterItem>;
  orderId: number;
  isLoading: boolean;
};

const INITIAL_STATE: TCartInitialState = {
  counter: {},
  orderId: 0,
  isLoading: false,
};

export const cart = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(addToCart, (state, { payload }) => {
    const key = `${payload.id}_${payload.size}`;
    state.counter[key] = {
      count: (state.counter[key]?.count || 0) + 1,
      ...payload,
    };
  });
  builder.addCase(removeFromCart, (state, { payload: { id, size } }) => {
    const key = `${id}_${size}`;
    if (state.counter[key].count === 1) {
      delete state.counter[key];
    } else {
      state.counter[key] = {
        ...state.counter[key],
        count: (state.counter[key]?.count || 0) - 1,
      };
    }
  });

  builder.addCase(clearCart, (state) => {
    state.counter = INITIAL_STATE.counter;
    state.isLoading = INITIAL_STATE.isLoading;
  });

  builder.addCase(sendPlaceOrder.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(sendPlaceOrder.fulfilled, (state, { payload }) => {
    state.orderId = payload.orderId;
    state.isLoading = false;
  });
  builder.addCase(sendPlaceOrder.rejected, (state) => {
    state.isLoading = false;
  });
});
