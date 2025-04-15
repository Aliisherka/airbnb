import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface MenuListProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginOpen: () => void;
  onClose: () => void;
}

const MenuList = ({ isLoggedIn, onLogout, onLoginOpen, onClose }: MenuListProps) => {
  const { t } = useTranslation();

  if (isLoggedIn) {
    return (
      <ul className={styles['profile-menu']}>
        <li>
          <button className={`${styles['profile-menu-button']} ${styles['profile-menu-button--medium']}`}>
            {t('messages')}
          </button>
        </li>
        <li>
          <button className={`${styles['profile-menu-button']} ${styles['profile-menu-button--medium']}`}>
            {t('notifications')}
          </button>
        </li>
        <li>
          <button className={`${styles['profile-menu-button']} ${styles['profile-menu-button--medium']}`}>
            {t('trips')}
          </button>
        </li>
        <li>
          <button className={`${styles['profile-menu-button']} ${styles['profile-menu-button--medium']}`}>
            {t('wishlists')}
          </button>
        </li>
        <div className={styles['divider']}></div>
        <li>
          <button className={styles['profile-menu-button']} onClick={onLogout}>
            {t('log-out')}
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul className={styles['profile-menu']}>
      <li>
        <button
          className={`${styles['profile-menu-button']} ${styles['profile-menu-button--medium']}`}
          onClick={() => {
            onLoginOpen();
            onClose();
          }}
        >
          {t('log-in')}
        </button>
      </li>
      <li>
        <button
          className={styles['profile-menu-button']}
          onClick={() => {
            onLoginOpen();
            onClose();
          }}
        >
          {t('sign-up')}
        </button>
      </li>
    </ul>
  );
};

export default MenuList;