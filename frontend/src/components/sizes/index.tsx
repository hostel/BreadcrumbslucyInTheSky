'use client';

import { MouseEvent } from 'react';
import classNames from 'classnames';

import { TSizes } from 'api/product/types';
import { Flex } from 'components/flex';

import styles from './sizes.module.scss';

type TSizesProps<TSize extends TSizes> = {
  sizes: TSize[];
  activeSize: TSize;
  onChangeSelectedSize: (size: TSize) => void;
};

export const Sizes = <TSize extends TSizes>({ sizes, activeSize, onChangeSelectedSize }: TSizesProps<TSize>) => {
  const onClick = (size: TSize) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChangeSelectedSize(size);
  };

  return (
    <Flex gap={30} alignItems="center" onClick={(e) => e.preventDefault()}>
      {sizes.map((item) => (
        <button
          className={classNames(styles.size, { [styles.activeSize]: item === activeSize })}
          key={item}
          onClick={onClick(item)}
        >
          {item.slice(0, 1)}
        </button>
      ))}
    </Flex>
  );
};
