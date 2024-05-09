'use client';

import { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

type TButtonProps = {
  isLoading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode | ReactNode[];
};

export const Button = ({ isLoading, children, onClick }: TButtonProps) => {
  const commonProps = {
    disabled: isLoading,
    className: classNames(styles.button, {
      [styles.loading]: isLoading,
    }),
  };

  return (
    <button {...commonProps} type="button" onClick={onClick}>
      <div>{children}</div>
    </button>
  );
};
