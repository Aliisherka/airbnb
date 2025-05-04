import React from 'react';
import IconSvg from '../../../assets/icons/icon';
import styles from './styles.module.scss';

interface UserButtonProps {
  onClick: () => void;
  userInitial: string;
  isLoggedIn: boolean;
}

const UserButton = ({ onClick, userInitial, isLoggedIn }: UserButtonProps) => {
  return (
    <button className={styles['user-button']} onClick={onClick}>
      <IconSvg name='user-menu' width='16px' height='16px' color='black' />
      {isLoggedIn ? (
        <div className={styles['user-avatar']}>{userInitial}</div>
      ) : (
        <IconSvg name='user' width='32px' height='32px' />
      )}
    </button>
  );
};

export default UserButton;