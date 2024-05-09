'use client';

import { LoadingOutlined } from '@ant-design/icons';

import { Flex } from 'components/flex';

import styles from './loader.module.scss';

export const Loader = () => (
  <Flex alignItems="center" justifyContent="center" className={styles.loader}>
    <LoadingOutlined />
  </Flex>
);
