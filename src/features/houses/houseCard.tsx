import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../shared/assets/icons/icon';
import { getCurrentLanguage } from '../../shared/lib/lang';
import styles from './styles.module.scss';

type HouseProps = {
  title: string;
  distance: string;
  price: string;
  rating: number;
  images: string[];
  _id: string;
};

const HouseCard: React.FC<HouseProps> = ({ title, distance, price, rating, images, _id }) => {
  const { t } = useTranslation();
  const currentLang = getCurrentLanguage();
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

  const renderDistance = () => {
    if (currentLang === 'ru') {
      return `Расстояние: ${distance} ${t('kilometrs')}`;
    }
    if (currentLang === 'en') {
      return `${distance} ${t('kilometrs')}`;
    }
    return null;
  };

  const handleOpenHousePage = () => {
    window.open(`/airbnb/#/house/${_id}`, '_blank');
  };

  return (
    <div
      className={styles['card-content']}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      onClick={handleOpenHousePage}
    >
      <div className={styles["image-container"]}>
        <div className={styles["slider"]} style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img key={index} className={styles["card-image"]} src={image} alt={title} />
          ))}
        </div>
        {showArrows && images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <button className={styles['prev-button']} onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}>
                <IconSvg name='chevron-left' width='16px' height='16px' />
              </button>
            )}
            {currentImageIndex < images.length - 1 && (
              <button className={styles['next-button']} onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>
                <IconSvg name='chevron-right' width='16px' height='16px' />
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
      <div className={styles['card-body']}>
        <div>
          <h2>{title}</h2>
          <p className={styles['distance']}>{renderDistance()}</p>
          <p>{price} {t('night')}</p>
        </div>
        <div className={styles['rating']}>
          <IconSvg name='star' width='12px' height='12px'/>
          <p>{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;