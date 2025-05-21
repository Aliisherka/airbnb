import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../../shared/assets/icons/icon';
import styles from './styles.module.scss';
import ImageCarousel from './imageCarousel';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useIsMobile from '../../../shared/hooks/useIsMobile';
import { HouseCardProps } from '../../../shared/types/house';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { getCurrentLanguage } from '../../../shared/lib/lang';

const HouseCard: React.FC<HouseCardProps> = ({ title, price, rating, images, _id, exchangeRate = 1 }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const currentLang = getCurrentLanguage();
  const convertedPrice = Math.floor(exchangeRate * Number(price));
  const [params] = useSearchParams();
  const arrival = params.get('arrival') || '';
  const departure = params.get('departure') || '';

  const totalNights = useMemo(() => {
    if (!arrival || !departure) return 0;
    const start = parseISO(arrival);
    const end = parseISO(departure);
    const diff = differenceInCalendarDays(end, start);
    return diff > 0 ? diff : 0;
  }, [arrival, departure]);

  const totalPrice = totalNights * convertedPrice;

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
          <div className={styles['price-row']}>
            <p data-testid='house-prices'>
              <span className={styles['converted-price']}>{`$${convertedPrice} `}</span>
              {t('night')}
            </p>
            <span aria-hidden='true' className={styles['dot-separator']}> · </span>

            {totalPrice ? (
              <p className={styles['total-price']}>
                {currentLang === 'en'
                  ? `$${totalPrice} ${t('total')}`
                  : `${t('total')} $${totalPrice}`}
              </p>
            ) : null}
          </div>
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