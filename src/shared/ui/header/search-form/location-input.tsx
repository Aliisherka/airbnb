import React from 'react';
import { useTranslation } from 'react-i18next';
import DropdownMenu from '../../dropdown-menu/dropdown-menu';
import IconSvg from '../../../assets/icons/icon';
import styles from './styles.module.scss';

interface Suggestion {
  name: string;
  country: string;
}

interface LocationInputProps {
  query: string;
  suggestions: Suggestion[];
  isOpen: boolean;
  focusField: string | null;
  onQueryChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSelectSuggestion: (suggestion: Suggestion) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onCloseDropdown: () => void;
}

const LocationInput = ({
  query,
  suggestions,
  isOpen,
  focusField,
  onQueryChange,
  onFocus,
  onBlur,
  onSelectSuggestion,
  onMouseEnter,
  onMouseLeave,
  onCloseDropdown,
}: LocationInputProps) => {
  const { t } = useTranslation();

  return (
    <div 
      className={`${styles['search-field']} ${styles['location']} ${
        focusField === 'location' ? styles['active'] : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <label htmlFor='location' className={styles['label']}>
        {t('where')}
      </label>
      <DropdownMenu
        button={
          <input
            type='text'
            id='location'
            name='location'
            placeholder={t('search-destinations')}
            required
            value={query}
            className={styles['input']}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        }
        isOpen={isOpen && suggestions.length > 0}
        onClose={onCloseDropdown}
      >
        <ul className={styles['dropdown-list']}>
          {suggestions.map((place, index) => (
            <li
              key={index}
              className={styles['dropdown-item']}
              onClick={() => onSelectSuggestion(place)}
            >
              <div className={styles['dropdown-img']}>
                <IconSvg name='location' />
              </div>
              <p className={styles['dropdown-text']}>
                {place.name}, {place.country}
              </p>
            </li>
          ))}
        </ul>
      </DropdownMenu>
    </div>
  );
};

export default LocationInput;