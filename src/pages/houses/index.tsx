import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from './styles.module.scss';
import { getHouse } from '../../shared/api/houses';
import IconSvg from '../../shared/assets/icons/icon';
import { useTranslation } from 'react-i18next';
import useIsMobile from '../../shared/hooks/useIsMobile';
import HousePageMobile from './components/housePageMobile';
import { House } from '../../shared/types/house';
import { LoadingScreen } from '../../shared/ui/loading-screen';

const HousePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const isMobile = useIsMobile();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHouse = async () => {
      setLoading(true);
      const data = await getHouse(id);
      if (data) {
        setHouse(data);
      }
      setLoading(false);
    };

    if (id) {
      fetchHouse();
    }
  }, [id]);

  if (!house) return <LoadingScreen loading={loading} text={t('server-waking-up')}/>;

  if (isMobile) {
    return (
      <HousePageMobile house={house}/>
    )
  }

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
          <IconSvg name='star' width='16' height='16'/>
          <a href='#'>отзыв</a>
        </div>
        <div className={styles['user']}>
          <div className={styles['user-avatar']}>
            U
          </div>
          <div className={styles['user-description']}>
            <h4>Хозяин:</h4>
            <p>6 месяцев принимает гостей</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousePage;