import { createSelector } from '@reduxjs/toolkit';

import { TOrderParams } from 'api/cart';
import { formatAmount } from 'services/currency';
import { RootState } from 'services/store';

import { TCounterItem } from './actions';

export const getCartStorage = (state: RootState) => state.cartStorage;

export const getItems = createSelector(getCartStorage, (state) => {
  return Object.values(state.counter).reduce((acc, value) => {
    acc.push({
      ...value,
      price: formatAmount({ amount: (value.priceInCents / 100) * value.count }),
      ...(value.specialInCents && {
        special: formatAmount({ amount: (value.specialInCents / 100) * value.count }),
      }),
    });
    return acc;
  }, [] as TCounterItem[]);
});

export const getListForPlaceOrder = createSelector(getItems, (arr) => {
  const result = [] as TOrderParams[];

  arr.forEach((item) => {
    for (let i = 0; i < item.count; i++) {
      result.push({ id: item.id, size: item.size });
    }
  });

  return result;
});

export const getAmountItems = createSelector(getCartStorage, (state) => {
  return Object.entries(state.counter).reduce((acc, [key, value]) => {
    return (acc += value.count);
  }, 0);
});
