import React, { useState } from 'react';
import styles from './styles.module.scss';

interface InputProps {
  label: string;
  type: 'text' | 'password' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({ label, type, placeholder, value, onChange, error, onFocus, onBlur }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={`${styles['input-container']} ${isFocused || value ? styles['focused'] : ''}`}>
      <label className={styles['input-label']}>{label}</label>
      <input
        className={`${styles['input-field']} ${error ? styles['input-error'] : ''}`}
        type={type}
        placeholder={isFocused ? placeholder : ''}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && <span className={styles['input-error-message']}>{error}</span>}
    </div>
  );
};

export default Input;
