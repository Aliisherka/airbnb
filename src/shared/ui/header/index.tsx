import React from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../assets/icons/icon';
import SearchForm from './search-form';
import { LanguageSwitcher } from './language-switcher';

export const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['container']}>
        <IconSvg name='logo' width='108px'/>
        <LanguageSwitcher />
      </div>
      <SearchForm />
    </div>
  )
}