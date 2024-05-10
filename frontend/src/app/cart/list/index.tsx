'use client';

import { toast } from 'react-toastify';
import { FileUnknownOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { usePlaceOrderMutation } from 'api/cart/queries';
import { addToCart, removeFromCart, TCounterItem } from 'app/cart/store/actions';
import { getItems, getListForPlaceOrder } from 'app/cart/store/selectors';
import { Button } from 'components/button';
import { Flex } from 'components/flex';
import { Loader } from 'components/loader';
import { Price } from 'components/price';
import { ORDER_ROUTE, ROOT_ROUTE } from 'constants/routes';
import { ORDER_ID_STORAGE_KEY } from 'constants/storageKeys';
import { useAppDispatch, useAppSelector } from 'services/store/hooks';

import styles from './list.module.scss';

export const List = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const list = useAppSelector(getItems);
  const listForPlaceOrder = useAppSelector(getListForPlaceOrder);

  const [sendPlaceOrder, { isLoading }] = usePlaceOrderMutation();

  const onPlaceOrder = async () => {
    try {
      const { orderId } = await sendPlaceOrder(listForPlaceOrder).unwrap();

      localStorage.setItem(ORDER_ID_STORAGE_KEY, String(orderId));

      if (orderId) {
        router.push(ORDER_ROUTE);
      }
    } catch (e) {
      console.log(e);
      toast.error('Error occurred while placing an order');
    }
  };

  const onAddToCart =
    ({ count, ...product }: TCounterItem) =>
    () => {
      dispatch(addToCart(product));
    };

  const onRemoveFromCart =
    ({ id, size }: TCounterItem) =>
    () => {
      dispatch(removeFromCart({ id, size }));
    };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Flex isFixedWidth direction="column" justifyContent="start" gap={20}>
      {list.length === 0 && (
        <Flex direction="column" alignItems="center" className={styles.empty}>
          <FileUnknownOutlined />
          <p>Cart is empty</p>
          <Link href={ROOT_ROUTE}>Go to products</Link>
        </Flex>
      )}

      {list.map((item) => (
        <Flex className={styles.item} key={item.id} gap={20} justifyContent="start" alignItems="center">
          <Image src={item.image} width={64} height={105} alt={item.name} />
          <p>
            <span className={styles.title}>{item.name}</span> | <span className={styles.size}>{item.size}</span>
          </p>

          <Flex justifyContent="center" alignItems="center" gap={10}>
            <button className={styles.button} onClick={onRemoveFromCart(item)}>
              <MinusCircleOutlined />
            </button>
            {item.count}
            <button className={styles.button} onClick={onAddToCart(item)}>
              <PlusCircleOutlined />
            </button>
          </Flex>

          <Price price={item.price} special={item.special} />
        </Flex>
      ))}
      {list.length > 0 && (
        <Flex justifyContent="center" className={styles.wrapPlaceOrderButton}>
          <Button onClick={onPlaceOrder} isLoading={isLoading}>
            Place order
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
