import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from './styles.module.scss';
import { getHouse } from '../../shared/api/houses';
import IconSvg from '../../shared/assets/icons/icon';
import { useTranslation } from 'react-i18next';

interface House {
  id: string;
  title: string;
  images: string[];
  price: number;
  rating: number;
  country: string;
}

const HousePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [house, setHouse] = useState<House | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    getHouse(id).then((data) => {
      if (data) setHouse(data);
    });
  }, [id]);

  if (!house) return <p>Загрузка...</p>;

  return (
    <div className={styles['container']}>
      <div className={styles['text']}>
        <h2>text</h2>
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
          <h3>{t('entire-villa')} {house.title}, {house.country}</h3>
          <ul className={styles['overview-list']}>
            <li>{t('guests')}</li>
            <li>{t('bedrooms')}</li>
            <li>{t('beds')}</li>
            <li>{t('baths')}</li>
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