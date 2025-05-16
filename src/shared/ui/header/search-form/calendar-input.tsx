import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClearButton } from './components/ClearButton';
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
  onClear: () => void;
}

const CalendarInput: React.FC<CalendarInputProps> = React.memo(({
  label,
  id,
  value,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive,
  className = '',
  onClear
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
        value={value ? new Date(value).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }) : ''}
        placeholder={t('add-dates')}
        onClick={onClick}
        className={styles['input']}
      />

      <ClearButton 
        onClick={onClear} 
        isVisible={isActive && Boolean(value)}
        type={'calendar'}
      />
    </div>
  );
});

export default CalendarInput;