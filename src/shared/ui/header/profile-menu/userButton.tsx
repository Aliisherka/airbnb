import React from 'react';
import IconSvg from '../../../assets/icons/icon';
import { User } from '../../../types/User';
import styles from './styles.module.scss';

interface UserButtonProps {
  onClick: () => void;
  isLoggedIn: boolean;
  user: User | null;
}

const UserButton = ({ onClick, isLoggedIn, user }: UserButtonProps) => {
  const userInitial = user ? user.name.charAt(0).toUpperCase() : '';

  return (
    <button className={styles['user-button']} onClick={onClick} data-testid='user-button'>
      <IconSvg name='user-menu' width='16px' height='16px' color='black' />
      {isLoggedIn ? (
        user?.avatarUrl
        ? <img src={user.avatarUrl} alt={user.name} className={styles['user-avatar']}/>
        : <div className={styles['user-avatar']} data-testid='user-avatar'>{userInitial}</div>
      ) : (
        <IconSvg name='user' width='32px' height='32px' />
      )}
    </button>
  );
};

export default UserButton;