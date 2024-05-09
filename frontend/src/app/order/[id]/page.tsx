'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { clearCart } from 'app/cart/store/actions';
import { Flex } from 'components/flex';
import { ROOT_ROUTE } from 'constants/routes';
import { useAppDispatch } from 'services/store/hooks';

type TOderProps = {
  params: { id: number };
};

export default function Order({ params }: TOderProps) {
  const [orderId] = useState(params.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearCart());
    window.history.pushState({}, 'Order', '/order');
  }, [dispatch]);

  if (!orderId) return null;

  return (
    <main>
      <Flex isFixedWidth alignItems="center" direction="column">
        <h1>You have successfully placed an order</h1>
        <p>Thank you for shopping with us</p>
        <p>Your order id: {orderId}</p>
        <Link href={ROOT_ROUTE}>Go to products</Link>
      </Flex>
    </main>
  );
}
