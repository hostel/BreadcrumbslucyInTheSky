'use client';

import { useEffect, useState } from 'react';
import { FrownTwoTone } from '@ant-design/icons';
import Link from 'next/link';

import { clearCart } from 'app/cart/store/actions';
import { Flex } from 'components/flex';
import { ROOT_ROUTE } from 'constants/routes';
import { ORDER_ID_STORAGE_KEY } from 'constants/storageKeys';
import { useAppDispatch } from 'services/store/hooks';

import styles from './order.module.scss';

export default function Order() {
  const [orderId, setOderId] = useState<string | null>(localStorage.getItem(ORDER_ID_STORAGE_KEY));
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.removeItem(ORDER_ID_STORAGE_KEY);

    dispatch(clearCart());
  }, [dispatch]);

  return (
    <main>
      <Flex isFixedWidth alignItems="center" direction="column">
        {orderId ? (
          <>
            <h1>You have successfully placed an order</h1>
            <p>Thank you for shopping with us</p>
            <p>Your order id: {orderId}</p>
          </>
        ) : (
          <Flex direction="column" alignItems="center" className={styles.frown}>
            <h1>Order was not placed</h1>
            <FrownTwoTone />
          </Flex>
        )}
        <Link className={styles.link} href={ROOT_ROUTE}>
          Go to products
        </Link>
      </Flex>
      )
    </main>
  );
}
