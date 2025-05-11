import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import IconSvg from '../../../assets/icons/icon';
import { suggestedLocations } from '../../../data/suggested-locations';
import styles from './styles.module.scss';
import SuggestedLocation from './suggestedLocation';

interface MobileSearchFormProps {
  onClose: () => void;
}

const MobileSearchForm = ({ onClose }: MobileSearchFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const locationParams = searchParams.get('location') || '';
    setQuery(locationParams);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    setSearchParams({ location: query });
    onClose();
  };

  return (
    <form className={styles['search-form']} onSubmit={handleSubmit}>
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
              setIsFocused(false)
              setExpanded(false)
            }}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
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
                  <IconSvg name='chevron-down' width='16' height='16' color='black' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className={styles['form-footer']}>
        <button type='button' className={styles["clear-button"]} onClick={() => setQuery('')}>
          {t('clear-all')}
        </button>
        <button type='submit' className={styles["search-button"]} data-testid='search-button'>
          <IconSvg color='white' name='search-icon' width='16px' height='16px' />
          <p>{t('search')}</p>
        </button>
      </footer>
    </form>
  )
}

export default MobileSearchForm;