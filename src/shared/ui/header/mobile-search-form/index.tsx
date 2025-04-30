import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../../assets/icons/icon';
import { suggestedLocations } from '../../../data/suggested-locations';
import styles from './styles.module.scss';
import SuggestedLocation from './suggestedLocation';

const MobileSearchForm = () => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <form>
      <div className={styles['location']}>
        <h2 className={styles['title']}>{t('where-to')}</h2>
        <div className={`${styles['input-wrapper']} ${isFocused ? styles['focused'] : ''}`}>
          <button 
            className={styles['icon-button']} 
            onClick={() => {
              setIsFocused(false)
              setExpanded(false)
            }} 
            type='button'
          >
            <IconSvg
              color='black' 
              width='16' 
              height='16' 
              name={isFocused ? 'back' : 'search-icon'}
            />
          </button>
          <input
            onFocus={() => {
              setIsFocused(true)
              setExpanded(true)
            }}
            onBlur={() => {
              setIsFocused(true)
              setExpanded(true)
            }}
            type="text" 
            className={styles['input']} 
            placeholder={t('search-destinations')}
          />
        </div>
        <div className={styles['suggestion']}>
          <p className={styles['text']}>{t('suggested-destinations')}</p>
          <div className={`${styles['locations-wrapper']} ${expanded ? styles['expanded'] : ''}`}>
            {suggestedLocations.map((location) => (
              <SuggestedLocation 
                key={location.id} 
                city={location.city} 
                country={location.country} 
                img={location.img}
                description={location.description}
              />
            ))}

            {!expanded && (
              <div className={styles['fade-overlay']}>
                <button 
                  type='button' 
                  className={styles['show-more']} 
                  onClick={() => {
                    setIsFocused(true)
                    setExpanded(true)
                  }}
                >
                  <IconSvg name='chevron-down' width='16' height='16'/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

export default MobileSearchForm;