import React from 'react';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../shared/assets/icons/icon';
import { getCurrentLanguage } from '../../shared/lib/lang';
import styles from './styles.module.scss';

type HouseProps = {
  title: string;
  distance: string;
  price: string;
  rating: number;
  image: string;
};

const HouseCard: React.FC<HouseProps> = ({ title, distance, price, rating, image }) => {
  const { t } = useTranslation();
  const currentLang = getCurrentLanguage();

  const renderDistance = () => {
    if (currentLang === 'ru') {
      return `Расстояние: ${distance} ${t('kilometrs')}`;
    }
    if (currentLang === 'en') {
      return `${distance} ${t('kilometrs')}`;
    }
    return null;
  };

  return (
    <a href='#' className={styles['card-content']}>
      <img className={styles['card-image']} src={image} alt={title} />
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
    </a>
  );
};

export default HouseCard;