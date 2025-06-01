import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { House } from '../../../shared/types/house';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../../shared/assets/icons/icon';
import { useSwipeCarousel } from '../../../shared/hooks/useSwipeCarousel';
import { DotSeparator } from '../../../shared/ui/doteSeparator/DotSeparator';
import { Review } from '../../../shared/types/review';
import { formatSingleDate } from '../../../shared/lib/formatSingleDate';
import { getCurrentLanguage } from '../../../shared/lib/lang';

interface HousePageMobileProps {
  house: House;
  reviews: Review[];
  getMonthsSinceDate: (dateString: string | Date) => number;
}

export const HousePageMobile = ({ house, reviews, getMonthsSinceDate }: HousePageMobileProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLang = getCurrentLanguage();
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
        <button className={styles['back-button']} onClick={handleBack} data-testid='back-button'>
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
        <div className={styles['overview-review']}>
          <IconSvg name='star' width='8' height='8'/>
          <span>{house.avgRating.toFixed(1)}</span>
          <DotSeparator />
          <a 
            href='#'
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={styles['review-link']}
          >
            {t('reviews', { count: house.reviewCount })}
          </a>
        </div>
      </div>
      <div className={styles['reviews']} id='reviews'>
        <div className={styles['total-reviews']}>
          <IconSvg name='star' width='20' height='20'/>
          <span>{house.avgRating.toFixed(1)}</span>
          <DotSeparator />
          <p className={styles['review-link']}>{t('reviews', { count: house.reviewCount })}</p>
        </div>
        <div className={styles['reviews-carousel-wrapper']}>
          <div className={styles['reviews-carousel']}>
            {reviews.map((review) => (
              <div className={styles['review']} key={review._id}>
                <div>
                  <div className={styles['review-information']}>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <IconSvg name='star' width='9' height='9' key={i} color={i < review.rating ? 'black' : 'grey'}/>
                      ))}
                    </div>
                    <DotSeparator />
                    <p>{formatSingleDate(review.createdAt, currentLang)}</p>
                  </div>
                  <p className={styles['review-information-comment']}>{review.comment}</p>
                </div>
                <div className={styles['review-user']}>
                  <img src={review.userId.avatarUrl} alt={review.userId.name} className={styles['review-user-avatar']}/>
                  <div>
                    <p className={styles['review-user-name']}>{review.userId.name}</p>
                    <p>{t('months', { count: getMonthsSinceDate(review.userId.createdAt) })} {t('on-airbnb')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HousePageMobile;