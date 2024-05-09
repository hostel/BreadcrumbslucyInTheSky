'use client';

import classNames from 'classnames';

import { Flex } from 'components/flex';

import styles from './price.module.scss';

type TPriceProps = {
  price: string;
  special?: string;
};
export const Price = ({ price, special }: TPriceProps) => (
  <Flex gap={10}>
    <p className={classNames(styles.price, { [styles.through]: special })}>{price}</p>
    {special && <p className={classNames(styles.price, styles.special)}>{special}</p>}
  </Flex>
);
