import React, { useState } from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../../shared/assets/icons/icon';
import useIsMobile from '../../../shared/hooks/useIsMobile';
import { useSwipeCarousel } from '../../../shared/hooks/useSwipeCarousel';

interface Props {
  title: string;
  images: string[];
  onClick: () => void;
}

const ImageCarousel: React.FC<Props> = ({ title, images, onClick }) => {
  const isMobile = useIsMobile();
  const [showArrows, setShowArrows] = useState(false);
  const {
    currentIndex,
    offsetX,
    setCurrentIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSwipeCarousel(images.length);

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div
      className={styles['image-container']}
      data-testid='image-container'
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      onClick={onClick}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      <div 
        className={styles['slider']}
        data-testid='slider'
        style={{
          transform: isMobile
            ? `translateX(calc(-${currentIndex * 100}% + ${offsetX}px))`
            : `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img key={index} className={styles['card-image']} src={image} alt={`${title}-${index}`} />
        ))}
      </div>

      {!isMobile && showArrows && images.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button data-testid='chevron-left' className={styles['prev-button']} onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}>
              <IconSvg name='chevron-left' width='16px' height='16px' color='black' />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button data-testid='chevron-right' className={styles['next-button']} onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>
              <IconSvg name='chevron-right' width='16px' height='16px' color='black' />
            </button>
          )}
        </>
      )}

      <div className={styles['indicators']}>
        {images.map((_, index) => (
          <div
            key={index}
            data-testid='carousel-indicator'
            className={`${styles['indicator']} ${currentIndex === index ? styles['active'] : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;