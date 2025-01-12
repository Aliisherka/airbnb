import React, { useState } from 'react';
import IconSvg from '../../assets/icons/icon';
import { getCurrentLanguage, setLanguage } from '../../lib/lang';
import styles from './styles.module.scss';

export const LanguageSwitcher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // }; I'll add modal later
  const handleLanguageChange = () => {
    const currentLanguage = getCurrentLanguage();
    
    setLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
  };


  return (
    <div>
      <button 
        type="button" 
        className={styles['language-button']}
        onClick={handleLanguageChange}
      >
        <IconSvg name='language' width='16px' height='16px'/>
      </button>
    </div>
  );
};
