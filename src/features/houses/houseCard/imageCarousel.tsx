import React, { useState } from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../../shared/assets/icons/icon';

interface Props {
  title: string;
  images: string[];
  onClick: () => void;
}

const ImageCarousel: React.FC<Props> = ({ title, images, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <div
      className={styles['image-container']}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      onClick={onClick}
    >
      <div className={styles['slider']} style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} className={styles['card-image']} src={image} alt={title} />
        ))}
      </div>

      {showArrows && images.length > 1 && (
        <>
          {currentImageIndex > 0 && (
            <button className={styles['prev-button']} onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}>
              <IconSvg name='chevron-left' width='16px' height='16px' color='black' />
            </button>
          )}
          {currentImageIndex < images.length - 1 && (
            <button className={styles['next-button']} onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>
              <IconSvg name='chevron-right' width='16px' height='16px' color='black' />
            </button>
          )}
        </>
      )}

      <div className={styles['indicators']}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles['indicator']} ${currentImageIndex === index ? styles['active'] : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;