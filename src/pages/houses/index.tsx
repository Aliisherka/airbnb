import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../shared/assets/icons/icon';
import { useTranslation } from 'react-i18next';
import useIsMobile from '../../shared/hooks/useIsMobile';
import HousePageMobile from './components/housePageMobile';
import { HouseWithUser } from '../../shared/types/house';
import { LoadingScreen } from '../../shared/ui/loading-screen';
import { DotSeparator } from '../../shared/ui/doteSeparator/DotSeparator';
import { apiCall } from '../../shared/api';
import { getCurrentLanguage } from '../../shared/lib/lang';
import { formatSingleDate } from '../../shared/lib/formatSingleDate';
import { Review } from '../../shared/types/review';

const HousePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const isMobile = useIsMobile();
  const currentLang = getCurrentLanguage();
  const [house, setHouse] = useState<HouseWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  
  useEffect(() => {
    const fetchHouse = async () => {
      setLoading(true);
      const data = await apiCall.getHouse(id);
      if (data) {
        setHouse(data);
      }
      setLoading(false);
    };

    if (id) {
      fetchHouse();
    }
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      const data = await apiCall.getReviews(id)
      if (data) {
        setReviews(data)
      }
      setReviewsLoading(false);
    }

    if (id) {
      fetchReviews();
    }
  }, [id])

  if (!house) return <LoadingScreen loading={loading} text={t('server-waking-up')}/>;
  if (!reviews) return <LoadingScreen loading={reviewsLoading} text={t('reviews-loading')}/>;

  if (isMobile) {
    return (
      <HousePageMobile house={house}/>
    )
  }

  const getMonthsSinceDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));
  };

  const host = house.userId;
  const monthsSinceRegistration = getMonthsSinceDate(new Date(host.createdAt))

  return (
    <div className={styles['container']}>
      <div className={styles['text']}>
        <h2>{house.title}</h2>
      </div>
      <div className={styles['galery']}>
        <img className={styles['main-image']} src={house.images[0]} alt='Main image' />
        <div className={styles['side-images']}>
          {house.images.slice(1, 5).map((img, index) => (
            <img key={index}  className={styles['side-image']} src={img} alt={`House ${index + 1}`}/>
          ))}
        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['overview']}>
          <h3>{t('entire-villa')} {house.city}, {house.country}</h3>
          <ul className={styles['overview-list']}>
            <li>{t('guests', { count: house.guests })}</li>
            <li>{t('bedrooms', { count: house.bedrooms })}</li>
            <li>{t('beds', { count: house.beds })}</li>
            <li>{t('baths', { count: house.bathrooms })}</li>
          </ul>
          <div className={styles['overview-review']}>
            <IconSvg name='star' width='16' height='16'/>
            <span>{house.avgRating.toFixed(1)}</span>
            <DotSeparator />
            <a href='#' className={styles['review-link']}>{t('reviews', { count: house.reviewCount })}</a>
          </div>
        </div>
        <div className={styles['user']}>
          {host.avatarUrl
            ? <img src={host.avatarUrl} alt={host.name} className={styles['user-avatar']}/>
            : <div className={styles['user-avatar']}>{host.name[0].toUpperCase()}</div>
          }
          <div className={styles['user-description']}>
            <h4>{t('host')} {host.name}</h4>
            <p>{t('months', { count: monthsSinceRegistration })} {t('hosting')}</p>
          </div>
        </div>
      </div>
      <div className={styles['reviews']}>
        <div className={styles['total-reviews']}>
          <IconSvg name='star' width='20' height='20'/>
          <span>{house.avgRating.toFixed(1)}</span>
          <DotSeparator />
          <p className={styles['review-link']}>{t('reviews', { count: house.reviewCount })}</p>
        </div>
        {reviews.map((review) => (
          <div className={styles['review']}>
            <div className={styles['']}>
              <div className={styles['review-user']}>
                <img src={review.userId.avatarUrl} alt={review.userId.name} className={styles['review-user-avatar']}/>
                <div>
                  <p className={styles['review-user-name']}>{review.userId.name}</p>
                  <p>{t('months', { count: getMonthsSinceDate(review.userId.createdAt) })} {t('on-airbnb')}</p>
                </div>
              </div>
              <div className={styles['review-information']}>
                <div >
                  {[...Array(5)].map((_, i) => (
                    <IconSvg name='star' width='9' height='9' key={i} color={i < review.rating ? 'black' : 'grey'}/>
                  ))}
                </div>
                <DotSeparator />
                <p className={styles['review-information-date']}>{formatSingleDate(review.createdAt, currentLang)}</p>
              </div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousePage;