import React from 'react';
import IconSvg from '../../../../assets/icons/icon';
import styles from '../styles.module.scss';

interface ClearButtonProps {
  onClick: () => void;
  isVisible: boolean;
  type?: 'guests' | 'calendar' | 'location';
}

export const ClearButton = ({ onClick, isVisible, type }: ClearButtonProps) => {
  if (!isVisible) return null;

  const typeClass = type ? styles[`clear-button-${type}`] : '';

  return (
    <button
      type='button'
      className={`${styles['clear-button']} ${typeClass}`}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      aria-label='Clear guest selection'
    >
      <IconSvg name='close' width='12px' height='12px'/> 
    </button>
  )
}