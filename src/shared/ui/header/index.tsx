import React from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../assets/icons/icon';
import SearchForm from './search-form';

export const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['container']}>
        <IconSvg name='logo' width='108px'/>
      </div>
      <SearchForm />
    </div>
  )
}