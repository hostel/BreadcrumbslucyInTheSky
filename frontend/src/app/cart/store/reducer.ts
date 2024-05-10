import { createReducer } from '@reduxjs/toolkit';

import { addToCart, clearCart, removeFromCart, TCounterItem } from './actions';

type TCartInitialState = {
  counter: Record<string, TCounterItem>;
};

const INITIAL_STATE: TCartInitialState = {
  counter: {},
};

export const cartStorage = createReducer(INITIAL_STATE, (builder) => {
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
  });
});
