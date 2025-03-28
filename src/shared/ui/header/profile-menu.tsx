import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import authenticate from '../../api/auth';
import IconSvg from '../../assets/icons/icon';
import GradientButton from '../button/gradient-button';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import Input from '../input';
import Modal from '../modal';
import styles from './styles.module.scss';
import { useAuth } from '../../hooks/useAuth';

const ProfileMenu = () => {
  const { user, login, logout } = useAuth();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+7');
  const [errors, setErrors] = useState({ phone: '', password: '' });
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInitial = user ? user.phoneNumber.charAt(1).toUpperCase() : '';

  const validate = () => {
    const newErrors = { phone: '', password: '' };
    if (!phone || phone.length <= countryCode.length) newErrors.phone = 'Введите номер телефона';
    if (!password) newErrors.password = 'Введите пароль';
    setErrors(newErrors);
    return !newErrors.phone && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const user = await authenticate(phone, password);
      console.log('Успешный вход:', user);
      login(user);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setErrors((prev) => ({ ...prev, phone: 'Ошибка входа' }));
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
  
    if (sanitizedValue.startsWith(countryCode.replace('+', ''))) {
      setPhone('+' + sanitizedValue);
    } else {
      setPhone(countryCode + sanitizedValue.replace(countryCode.replace('+', ''), ''));
    }
  };

  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode);
    if (isFocused) {
      setPhone(newCode);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!phone) {
      setPhone(countryCode);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (phone === countryCode) {
      setPhone('');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPhone('');
    setPassword('');
    setCountryCode('+7');
    setErrors({ phone: '', password: '' });
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu
        button={
          <button className={styles['user-button']} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <IconSvg name='user-menu' width='16px' height='16px' />
            {user ? (
              <div className={styles['user-avatar']}>
                {userInitial}
              </div>
            ) : (
              <>
                <IconSvg name="user" width="32px" height="32px" />
              </>
            )}
          </button>
        }
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      >
        <ul className={styles['profile-menu']}>
          {user ? (
            <>
              <li>
                <button className={styles['profile-menu-button']}>
                  {t('messages')}
                </button>
              </li>
              <li>
                <button className={styles['profile-menu-button']}>
                  {t('notifications')}
                </button>
              </li>
              <li>
                <button className={styles['profile-menu-button']}>
                  {t('trips')}
                </button>
              </li>
              <li>
                <button className={styles['profile-menu-button']}>
                  {t('wishlists')}
                </button>
              </li>
              <div className={styles['divider']}></div>
              <li>
                <button className={styles['profile-menu-button']} onClick={logout}>
                  {t('log-out')}
                </button>
              </li>
            </>
          ) : (
            <>  
              <li>
                <button
                  className={styles['profile-menu-button']}
                  onClick={() => {
                    setIsModalOpen(true);
                    handleMenuClose();
                  }}
                >
                  {t('log-in')}
                </button>
              </li>
              <li>
                <button
                  className={styles['profile-menu-button']}
                  onClick={() => {
                    setIsModalOpen(true);
                    handleMenuClose();
                  }}
                >
                  {t('sign-up')}
                </button>
              </li>
            </>
          )}
        </ul>
      </DropdownMenu>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        width='568px' 
        title={t('log-in-or-sign-up')}
      >
        <div className={styles['auth-modal']}>
          <h2 className={styles['auth-modal-title']}>{t('welcome-to-airbnb')}</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles['country-container']}>
              <label htmlFor='country-select' className={styles['country-label']}>
                {t('country-code')}
              </label>
              <select
                className={styles['country-select']}
                id='country-select'
                value={countryCode}
                onChange={(e) => handleCountryCodeChange(e.target.value)}
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
              onChange={handlePhoneChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              error={errors.phone}
            />
            <Input
              label={t('password')}
              type='password'
              placeholder={t('password')}
              value={password}
              onChange={setPassword}
              error={errors.password}
            />
            <div className={styles['gradient-button-container']}>
              <GradientButton type='submit' size='large'>
                {loading ? 'Загрузка' : t('continue')}
              </GradientButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileMenu;
