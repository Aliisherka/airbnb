import React from "react";
import { useTranslation } from "react-i18next";
import styles from './styles.module.scss';


interface SuggestedLocationProps {
  city: string;
  country: string;
  img: string;
  description: string;
}

const SuggestedLocation = ({ city, country, img, description }: SuggestedLocationProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles['suggested-location']}>
      <img src={img} className={styles['img']} alt={city}/>
      <div>
        <p className={styles['country']}>{t(city)}, {t(country)}</p>
        <p className={styles['description']}>{t(description)}</p>
      </div>
    </div>
  )
}

export default SuggestedLocation;