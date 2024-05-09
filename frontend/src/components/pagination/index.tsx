'use client';

import { useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Flex } from 'components/flex';

import styles from './pagination.module.scss';

type TPagination = {
  total: number;
  count: number;
  current: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ total, count, current, onPageChange }: TPagination) => {
  const [currentPage, setCurrentPage] = useState(current);

  const totalPages = Math.ceil(total / count);
  const maxPagesToShow = 5; // Максимальное количество отображаемых страниц

  const handlePageChange = (page: number) => () => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPagesToShow) {
      const halfPagesToShow = Math.floor(maxPagesToShow / 2);
      startPage = Math.max(currentPage - halfPagesToShow, 1);
      endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <button
          key={i}
          className={classNames(styles.button, { [styles.active]: currentPage === i })}
          onClick={handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    return paginationItems;
  };

  return (
    <Flex alignItems="center" justifyContent="center" gap={15} className={styles.wrap}>
      <button className={styles.button} disabled={currentPage === 1} onClick={handlePageChange(currentPage - 1)}>
        <LeftOutlined />
      </button>
      {renderPaginationItems()}
      <button
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={handlePageChange(currentPage + 1)}
      >
        <RightOutlined />
      </button>
    </Flex>
  );
};
