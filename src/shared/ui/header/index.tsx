import React, { useState } from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../assets/icons/icon';
import SearchForm from './search-form';
import { LanguageSwitcher } from './language-switcher';
import ProfileMenu from './profile-menu';
import useIsMobile from '../../hooks/useIsMobile';
import Modal from '../modal';
import MobileSearchForm from './mobile-search-form';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isNarrowScreen = useIsMobile(1128)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();
  const isHousePage = pathname.includes('/house/');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  if (isMobile) {
    if (isHousePage) return null;
    return (
      <>
        <div className={styles['mobile-header']}>
          <button className={styles['mobile-search-button']} onClick={handleOpenModal}>
            <IconSvg
              color='black' 
              width='12' 
              height='12' 
              name='search-icon'
            />
            <span>{t('start-your-search')}</span>
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} width='100%'>
          <MobileSearchForm onClose={() => setIsModalOpen(false)}/>
        </Modal>
      </>
    )
  }
  
  return (
    <div className={styles['header']}>
      <div className={styles['container']}>
        <Link to={'/'} className={styles['logo']}>
          <IconSvg 
            name={isNarrowScreen ? 'logo' : 'full-logo'} 
            width={isNarrowScreen ? '36px' : '102px'} 
            height={isNarrowScreen ? '38px' : '32px'}
          />
        </Link>
        <div className={styles['actions']}>
          <LanguageSwitcher />
          <ProfileMenu />
        </div>
      </div>
      {!isHousePage && <SearchForm />}
    </div>
  )
}