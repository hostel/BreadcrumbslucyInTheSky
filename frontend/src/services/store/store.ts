import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { cartApi } from 'api/cart/queries';
import { productsApi } from 'api/product/queries';
import { cartStorage } from 'app/cart/store/reducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cartStorage,

      [productsApi.reducerPath]: productsApi.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware, cartApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
