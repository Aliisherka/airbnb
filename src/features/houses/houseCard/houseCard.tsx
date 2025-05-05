import React from 'react';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../../shared/assets/icons/icon';
import { getCurrentLanguage } from '../../../shared/lib/lang';
import styles from './styles.module.scss';
import ImageCarousel from './imageCarousel';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../../shared/hooks/useIsMobile';

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
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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
    const path = `/house/${_id}`;
    if (isMobile) {
      navigate(path);
    } else {
      window.open(`/airbnb/#/house/${_id}`, '_blank');
    }
  };

  return (
    <div
      className={styles['card-content']}
      onClick={handleOpenHousePage}
    >
      <ImageCarousel
        title={title}
        images={images}
        onClick={handleOpenHousePage}
      />
      <div className={styles['card-body']}>
        <div>
          <h2 className={styles['title']}>{title}</h2>
          <p className={styles['distance']}>{renderDistance()}</p>
          <p className={styles['price']}>{price} {t('night')}</p>
        </div>
        <div className={styles['rating']}>
          <IconSvg name='star' width='12px' height='12px'/>
          <p >{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;