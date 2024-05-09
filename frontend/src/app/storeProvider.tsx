'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from 'services/store/store';

type TStoreProviderProps = {
  readonly children: ReactNode;
};

export const StoreProvider = ({ children }: TStoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
