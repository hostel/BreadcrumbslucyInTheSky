'use client';
import { useEffect } from 'react';

import { fetchProducts } from 'app/products/store/actions';
import { Flex } from 'components/flex';
import { Loader } from 'components/loader';
import { Pagination } from 'components/pagination';
import { useAppDispatch, useAppSelector } from 'services/store/hooks';

import { Card } from './components/card';
import styles from './list.module.scss';

export const List = () => {
  const dispatch = useAppDispatch();
  const { data, count, page, total, isLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

  const onPageChange = (page: number) => {
    dispatch(fetchProducts({ page }));
  };

  if (!data || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Pagination total={total} count={count} current={page} onPageChange={onPageChange} />

      <Flex isFixedWidth>
        <div className={styles.grid}>
          {data.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </Flex>

      <Pagination total={total} count={count} current={page} onPageChange={onPageChange} />
    </>
  );
};
