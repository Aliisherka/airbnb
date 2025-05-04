import { t } from 'i18next';
import React, { useState } from 'react';
import IconSvg from '../../assets/icons/icon';
import { getCurrentLanguage, setLanguage } from '../../lib/lang';
import Modal from '../modal';
import styles from './styles.module.scss';

export type Lang = 'ru' | 'en' | 'cz';

export const LanguageSwitcher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  const handleLanguageChange = (language: Lang) => {
    setLanguage(language);
    setCurrentLanguage(language);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        type="button" 
        className={styles['language-button']}
        onClick={() => setIsModalOpen(true)}
      >
        <IconSvg name='language' width='16px' height='16px' color='black' />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width='1032px'>
        <div className={styles['locale-settings-tabs']}>
          <button className={styles['settings-tab']} aria-selected='true'>{t('language-and-region')}</button>
        </div>
        <div className={styles['locale-tabs']}>
          <button
            className={`${styles['tab']} ${
              currentLanguage === 'ru' ? styles['active'] : ''
            }`}
            onClick={() => handleLanguageChange('ru')}
          >
            <p>Русский</p>
            <p>Россия</p>
          </button>
          <button
            className={`${styles['tab']} ${
              currentLanguage === 'en' ? styles['active'] : ''
            }`}
            onClick={() => handleLanguageChange('en')}
          >
            <p>English</p>
            <p>United States</p>
          </button>
          <button
            className={`${styles['tab']} ${
              currentLanguage === 'cz' ? styles['active'] : ''
            }`}
            onClick={() => handleLanguageChange('cz')}
          >
            <p>Čeština</p>
            <p>Česká republika</p>
          </button>
        </div>
      </Modal>
    </div>
  );
};
