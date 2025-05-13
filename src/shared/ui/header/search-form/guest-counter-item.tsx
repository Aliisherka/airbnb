import React from "react";
import IconSvg from "../../../assets/icons/icon";
import styles from './styles.module.scss';

interface GuestCounterItemProps {
  title: string;
  subtitle: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isDecrementDisabled?: boolean;
};

const GuestCounterItem = ({
  title,
  subtitle,
  value,
  onIncrement,
  onDecrement,
  isDecrementDisabled = false,
}: GuestCounterItemProps) => {
  return (
    <div className={styles['dropdown-list-container']}>
      <div>
        <p className={styles['dropdown-list-title']}>{title}</p>
        <p className={styles['dropdown-list-subtitle']}>{subtitle}</p>
      </div>
      <div className={styles['dropdown-list-counts']}>
        <button
          className={styles['dropdown-list-button']}
          onClick={onDecrement}
          disabled={isDecrementDisabled}
        >
          <IconSvg name='minus' width='18px' height='18px' color='currentColor' />
        </button>
        <p className={styles['dropdown-list-value']}>{value}</p>
        <button
          className={styles['dropdown-list-button']}
          onClick={onIncrement}
        >
          <IconSvg name='plus' width='18px' height='18px' color='currentColor' />
        </button>
      </div>
    </div>
  );
};

export default GuestCounterItem;

