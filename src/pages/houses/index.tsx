import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from './styles.module.scss';
import { getHouse } from '../../shared/api/houses';
import IconSvg from '../../shared/assets/icons/icon';
import { useTranslation } from 'react-i18next';
import useIsMobile from '../../shared/hooks/useIsMobile';
import HousePageMobile from './components/housePageMobile';
import { HouseWithUser } from '../../shared/types/house';
import { LoadingScreen } from '../../shared/ui/loading-screen';

const HousePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const isMobile = useIsMobile();
  const [house, setHouse] = useState<HouseWithUser | null>(null);
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

  const host = house.userId;
  const registrationDate = new Date(host.createdAt);
  const monthsSinceRegistration = Math.floor(
    (Date.now() - registrationDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

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
            {host.avatar
              ? <img src={host.avatar} alt={host.name}/>
              : host.name[0].toUpperCase()
            }
          </div>
          <div className={styles['user-description']}>
            <h4>{t('host')} {host.name}</h4>
            <p>{t('hosting-since-months', { count: monthsSinceRegistration })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousePage;