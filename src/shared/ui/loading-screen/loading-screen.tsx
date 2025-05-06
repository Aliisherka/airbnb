import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface LoadingScreenProps {
  text?: string;
  loading?: boolean;
}

const LoadingScreen = ({ text, loading = true }: LoadingScreenProps) => {
  const { t } = useTranslation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (loading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 600);
    } else {
      if (timer) clearTimeout(timer);
      setShowLoader(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [loading]);

  if (!showLoader) return null;
  
  return (
    <div className={styles['loading-screen']}>
      <div className={styles['circle-container']}>
        <svg className={styles['progress-ring']}>
          <circle
            className={styles['progress-ring-background']}
            r='70'
            cx='80'
            cy='80'
          />
          <circle
            className={styles['progress-ring-circle']}
            r='70'
            cx='80'
            cy='80'
            strokeDasharray='150'
          />
        </svg>
      </div>
      <p className={styles['loading-text']}>
        {text || t('loading-text')}
      </p>
    </div>
  )
}

export default LoadingScreen;