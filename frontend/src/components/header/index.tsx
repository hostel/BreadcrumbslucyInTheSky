'use client';

import { ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Logo from 'public/logo.svg';

import { getAmountItems } from 'app/cart/store/selectors';
import { Flex } from 'components/flex';
import { CART_ROUTE, ROOT_ROUTE } from 'constants/routes';
import { useAppSelector } from 'services/store/hooks';

import styles from './header.module.scss';

export const Header = () => {
  const amount = useAppSelector(getAmountItems);

  return (
    <header className={styles.wrap}>
      <Flex isFixedWidth justifyContent="between" alignItems="center">
        <div />
        <Link href={ROOT_ROUTE}>
          <Logo />
        </Link>
        <div className={styles.wrapCartIcon}>
          <Link href={CART_ROUTE}>
            {amount > 0 && <div className={styles.amountItems}>{amount}</div>}
            <ShoppingCartOutlined className={styles.cartIcon} />
          </Link>
        </div>
      </Flex>
    </header>
  );
};
