import React from 'react'
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss'

const LoadingScreen = () => {
  const { t } = useTranslation();
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
        {t('loading-text')}
      </p>
    </div>
  )
}

export default LoadingScreen;