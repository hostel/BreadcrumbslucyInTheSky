'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useFetchProductQuery } from 'api/product/queries';
import { TSizes } from 'api/product/types';
import { addToCart, getCartStorage, removeFromCart } from 'app/cart/store';
import { Button } from 'components/button';
import { Flex } from 'components/flex';
import { Loader } from 'components/loader';
import { Price } from 'components/price';
import { Sizes } from 'components/sizes';
import { useAppDispatch, useAppSelector } from 'services/store/hooks';
import { htmlDecode } from 'utils/htmlDecode';

import styles from './product.module.scss';

type TProductProps = {
  params: { id: number };
};

export default function Product({ params }: TProductProps) {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useFetchProductQuery({ productId: params.id });

  const [selectedSize, changeSelectedSize] = useState<TSizes>(searchParams.get('size') as TSizes);

  const { counter } = useAppSelector(getCartStorage);

  if (!data) return null;

  if (isLoading) {
    return <Loader />;
  }

  const onAddToCart = () => {
    dispatch(addToCart({ ...data, size: selectedSize }));
  };

  const onRemoveFromCart = () => {
    dispatch(removeFromCart({ id: data.id, size: selectedSize }));
  };

  const hasProductInCart = counter[`${data.id}_${selectedSize}`]?.count > 0;

  return (
    <main>
      <Flex isFixedWidth alignItems="start" gap={20}>
        <Image src={data.image} width={424} height={694} alt={data.name} />
        <aside>
          <h1 className={styles.title}>{data.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: htmlDecode(data.description) }} />
          <p>Size: {selectedSize}</p>
          <Sizes sizes={data.sizes} activeSize={selectedSize} onChangeSelectedSize={changeSelectedSize} />
          <Price price={data.price} special={data.special} />

          <Flex gap={10}>
            <Button onClick={onAddToCart}>{hasProductInCart ? `Add more` : 'Add to cart'}</Button>
            {hasProductInCart && <Button onClick={onRemoveFromCart}>Remove from cart</Button>}
          </Flex>
        </aside>
      </Flex>
      );
    </main>
  );
}
