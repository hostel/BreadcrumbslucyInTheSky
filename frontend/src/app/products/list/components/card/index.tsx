'use client';

import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { TProduct } from 'api/product/types';
import { Flex } from 'components/flex';
import { Price } from 'components/price';
import { Sizes } from 'components/sizes';
import { PRODUCT_ROUTE } from 'constants/routes';

import styles from './card.module.scss';

type TCardProps = {
  product: TProduct;
};

export const Card = ({ product }: TCardProps) => {
  const [selectedSize, changeSelectedSize] = useState(product.sizes[0]);

  return (
    <Link
      className={styles.card}
      key={product.id}
      href={{
        pathname: `${PRODUCT_ROUTE}/${product.id}`,
        query: { size: selectedSize },
      }}
    >
      <div className={styles.wrapImage}>
        <Image src={product.image} width={424} height={694} alt={product.name} />
        <div className={styles.model}>{product.model}</div>
        <Flex justifyContent="center" className={styles.wrapSizes}>
          <Sizes sizes={product.sizes} activeSize={selectedSize} onChangeSelectedSize={changeSelectedSize} />
        </Flex>
      </div>
      <div className={styles.info}>
        <p className={styles.text}>{product.name}</p>
        <Price price={product.price} special={product.special} />
      </div>
    </Link>
  );
};
