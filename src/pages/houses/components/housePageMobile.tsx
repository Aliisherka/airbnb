import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { House } from '../../../shared/types/house';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../../shared/assets/icons/icon';
import { useSwipeCarousel } from '../../../shared/hooks/useSwipeCarousel';

interface HousePageMobileProps {
  house: House
}

export const HousePageMobile = ({ house }: HousePageMobileProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    currentIndex,
    offsetX,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipeCarousel(house.images.length);

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate('/');
  };

  return (
    <>
      <div className={styles['image-wrapper']}>
        <button className={styles['back-button']} onClick={handleBack}>
          <IconSvg name='chevron-left' color='black' width='24px' height='24px'/>
        </button>

        <div
          className={styles['carousel-container']}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles['carousel-track']}
            style={{
              transform: `translateX(calc(${-currentIndex * 100}% + ${offsetX}px))`,
            }}
          >
            {house.images.map((img, index) => (
              <img key={index} src={img} className={styles['carousel-image']} alt={`image ${index}`} />
            ))}
          </div>
        </div>
      </div>
      <h2 className={styles['title']}>{house.title}</h2>
      <div className={styles['overview']}>
        <h3 className={styles['overview-title']}>
          {t('entire-villa')} {house.city}, {house.country}
        </h3>
        <ul className={styles['overview-list']}>
          <li>{t('guests')}</li>
          <li>{t('bedrooms')}</li>
          <li>{t('beds')}</li>
          <li>{t('baths')}</li>
        </ul>
      </div>
    </>
  );
};

export default HousePageMobile;