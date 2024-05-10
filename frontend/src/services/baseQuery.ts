import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BaseQuery = (data?: Parameters<typeof fetchBaseQuery>[0]) =>
  fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    ...data,
  });
