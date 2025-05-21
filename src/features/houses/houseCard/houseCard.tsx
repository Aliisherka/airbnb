import React from 'react';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../../shared/assets/icons/icon';
import styles from './styles.module.scss';
import ImageCarousel from './imageCarousel';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../../shared/hooks/useIsMobile';
import { HouseCardProps } from '../../../shared/types/house';

const HouseCard: React.FC<HouseCardProps> = ({ title, price, rating, images, _id, exchangeRate = 1 }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const convertedPrice = Math.floor(exchangeRate * Number(price));

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
      data-testid='house-card'
      onClick={handleOpenHousePage}
    >
      <ImageCarousel
        title={title}
        images={images}
        onClick={handleOpenHousePage}
      />
      <div className={styles['card-body']}>
        <div>
          <h2 data-testid='house-title' className={styles['title']}>{title}</h2>
          <p data-testid='house-prices' className={styles['price']}>${convertedPrice} {t('night')}</p>
        </div>
        <div className={styles['rating']}>
          <IconSvg name='star' width='12px' height='12px'/>
          <p data-testid='house-ratings' >{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;