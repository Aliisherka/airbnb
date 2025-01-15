import React from 'react';
import IconSvg from '../../assets/icons/icon';
import styles from './styles.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  children: React.ReactNode;

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, width, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div 
        className={styles['modal-content']} 
        style={{ width: width || '568px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles['modal-header']} ${title ? styles['has-title'] : ''}`}>
          <button className={styles['close-button']} onClick={onClose}>
            <IconSvg name='close' width='16px' height='16px' />
          </button>
          {title && <h2 className={styles['modal-title']}>{title}</h2>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
