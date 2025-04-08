import React from 'react';
import styles from './styles.module.scss';

interface DividerProps {
  hidden?: boolean;
}

const Divider: React.FC<DividerProps> = ({ hidden }) => {
  return (
    <div
      className={`${styles['divider']} ${hidden ? styles['hidden'] : ''}`}
    ></div>
  );
};

export default Divider;
