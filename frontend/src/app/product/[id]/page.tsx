'use client';

import { useEffect } from 'react';

import { Item } from 'app/product/item';
import { fetchProductById } from 'app/product/store/actions';
import { useAppDispatch } from 'services/store/hooks';

type TProductProps = {
  params: { id: number };
};

export default function Product({ params }: TProductProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductById({ productId: params.id }));
  }, [dispatch, params]);

  return (
    <main>
      <Item />
    </main>
  );
}
