'use client';

import { MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './flex.module.scss';

type TFlexProps<T extends React.ElementType> = {
  as?: T;
  children: ReactNode;
  direction?: 'row' | 'column';
  justifyContent?: 'start' | 'between' | 'center';
  alignItems?: 'start' | 'center';
  className?: string;
  isFixedWidth?: boolean;
  gap?: number;

  onClick?: (e: MouseEvent<T>) => void;
};

export const Flex = <T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  direction = 'row',
  justifyContent = 'start',
  alignItems = 'start',
  gap,
  isFixedWidth,
}: TFlexProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TFlexProps<T>>) => {
  const Component = as || 'div';

  return (
    <Component
      className={classNames(styles.flex, className, {
        [styles[`direction-${direction}`]]: direction,
        [styles[`justify-${justifyContent}`]]: justifyContent,
        [styles[`alignItems-${alignItems}`]]: alignItems,
        [styles.fixedWidth]: isFixedWidth,
      })}
      style={{ gap }}
    >
      {children}
    </Component>
  );
};
