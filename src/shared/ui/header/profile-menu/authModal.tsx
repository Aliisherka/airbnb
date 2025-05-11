import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientButton from '../../button/gradient-button';
import Input from '../../input';
import Modal from '../../modal';
import styles from './styles.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  password: string;
  countryCode: string;
  errors: { phone: string; password: string };
  isFocused: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onCountryCodeChange: (code: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const AuthModal = ({
  isOpen,
  onClose,
  phone,
  password,
  countryCode,
  errors,
  isFocused,
  loading,
  onSubmit,
  onPhoneChange,
  onPasswordChange,
  onCountryCodeChange,
  onFocus,
  onBlur,
}: AuthModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} width='568px' title={t('log-in-or-sign-up')}>
      <div className={styles['auth-modal']}>
        <h2 className={styles['auth-modal-title']}>{t('welcome-to-airbnb')}</h2>
        <form onSubmit={onSubmit} data-testid='login-form'>
          <div className={styles['country-container']}>
            <label htmlFor='country-select' className={styles['country-label']}>
              {t('country-code')}
            </label>
            <select
              className={styles['country-select']}
              id='country-select'
              value={countryCode}
              onChange={(e) => onCountryCodeChange(e.target.value)}
            >
              <option value='+7'>{t('kazakhstan')} (+7)</option>
              <option value='+420'>{t('czechia')} (+420)</option>
              <option value='+1'>{t('usa')} (+1)</option>
            </select>
          </div>
          <Input
            label={t('phone-number')}
            type='tel'
            placeholder={`${countryCode} xxx-xxx-xxx`}
            value={isFocused || phone ? phone : ''}
            onChange={onPhoneChange}
            onFocus={onFocus}
            onBlur={onBlur}
            error={errors.phone}
          />
          <Input
            label={t('password')}
            type='password'
            placeholder={t('password')}
            value={password}
            onChange={onPasswordChange}
            error={errors.password}
          />
          <div className={styles['gradient-button-container']}>
            <GradientButton type='submit' size='large'>
              {loading ? t('loading') : t('continue')}
            </GradientButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;