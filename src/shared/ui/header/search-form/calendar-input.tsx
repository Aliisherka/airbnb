import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface CalendarInputProps {
  label: string;
  id: string;
  value: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isActive: boolean;
  className?: string;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  label,
  id,
  value,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive,
  className = '',
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${styles['search-field']} ${styles[className]} ${
        isActive ? styles['active'] : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <label htmlFor={id} className={styles['label']}>
        {t(label)}
      </label>
      <input
        type='text'
        id={id}
        readOnly
        value={value}
        placeholder={t('add-dates')}
        onClick={onClick}
        className={styles['input']}
      />
    </div>
  );
};

export default CalendarInput;