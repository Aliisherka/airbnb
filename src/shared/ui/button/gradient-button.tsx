import React, { useState } from 'react';
import styles from './styles.module.scss';

interface GradientButtonProps {
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ size = 'medium', children, type = 'button', onClick }) => {
  const [gradientVisible, setGradientVisible] = useState(false);
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradientVisible(true);
    setGradientPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setGradientVisible(false);
  };

  return (
    <button
    type={type}
      className={`${styles['gradient-button']} ${styles[size]}`}
      style={{
        background: gradientVisible
          ? `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #ff385c, #d70466)`
          : '#ff385c',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GradientButton;
