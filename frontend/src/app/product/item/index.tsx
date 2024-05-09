'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { TSizes } from 'api/product/types';
import { addToCart, removeFromCart } from 'app/cart/store/actions';
import { Button } from 'components/button';
import { Flex } from 'components/flex';
import { Loader } from 'components/loader';
import { Price } from 'components/price';
import { Sizes } from 'components/sizes';
import { useAppDispatch, useAppSelector } from 'services/store/hooks';

import { htmlDecode } from './item.utils';
import styles from './item.module.scss';

export const Item = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { content, isLoading } = useAppSelector((state) => state.product);
  const { counter } = useAppSelector((state) => state.cart);

  const [selectedSize, changeSelectedSize] = useState<TSizes>(searchParams.get('size') as TSizes);

  if (!content) return null;

  if (isLoading) {
    return <Loader />;
  }

  const onAddToCart = () => {
    dispatch(addToCart({ ...content, size: selectedSize }));
  };

  const onRemoveFromCart = () => {
    dispatch(removeFromCart({ id: content.id, size: selectedSize }));
  };

  const hasProductInCart = counter[`${content.id}_${selectedSize}`]?.count > 0;

  return (
    <Flex isFixedWidth alignItems="start" gap={20}>
      <Image src={content.image} width={424} height={694} alt={content.name} />
      <aside>
        <h1 className={styles.title}>{content.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlDecode(content.description) }} />
        <p>Size: {selectedSize}</p>
        <Sizes sizes={content.sizes} activeSize={selectedSize} onChangeSelectedSize={changeSelectedSize} />
        <Price price={content.price} special={content.special} />

        <Flex gap={10}>
          <Button onClick={onAddToCart}>{hasProductInCart ? `Add more` : 'Add to cart'}</Button>
          {hasProductInCart && <Button onClick={onRemoveFromCart}>Remove from cart</Button>}
        </Flex>
      </aside>
    </Flex>
  );
};
