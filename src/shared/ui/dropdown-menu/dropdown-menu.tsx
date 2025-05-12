import React, { ReactNode, useRef, useEffect } from 'react';
import styles from './styles.module.scss';

interface DropdownMenuProps {
  button: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  positionStyle?: React.CSSProperties;
}

const DropdownMenu = ({ button, children, isOpen, onClose, positionStyle = {} }: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles['dropdown-container']} ref={menuRef}>
      <div>{button}</div>
      {isOpen && (
        <div 
          className={styles['dropdown-menu']}
          style={positionStyle}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
