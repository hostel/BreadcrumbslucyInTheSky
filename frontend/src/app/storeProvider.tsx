'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from 'services/store/store';

type TStoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider = ({ children }: TStoreProviderProps) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
