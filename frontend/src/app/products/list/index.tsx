'use client';

import { useState } from 'react';

import { useFetchProductsQuery } from 'api/product/queries';
import { Flex } from 'components/flex';
import { Loader } from 'components/loader';
import { Pagination } from 'components/pagination';

import { Card } from './components/card';
import styles from './list.module.scss';

export const List = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchProductsQuery({ page });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (!data || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Pagination total={data.total} count={data.count} current={page} onPageChange={onPageChange} />

      <Flex isFixedWidth>
        <div className={styles.grid}>
          {data.data.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </Flex>

      <Pagination total={data.total} count={data.count} current={page} onPageChange={onPageChange} />
    </>
  );
};
