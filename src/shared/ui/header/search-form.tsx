import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../assets/icons/icon';
import { DateRange } from 'react-date-range';
import { useTranslation } from 'react-i18next';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import { searchHouses } from '../../../app/slices/housesSlice';
import { useAppDispatch } from '../../../app/store/hooks';

const SearchForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);
  const [dates, setDates] = useState({
    arrival: null,
    departure: null,
  });
  const [calendarStyle, setCalendarStyle] = useState({});
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const containerRef = useRef(null);
  const calendarRef = useRef(null);
  const guestsPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
        setFocusField(null);
      }

      if (
        guestsPopupRef.current &&
        !guestsPopupRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowGuestsPopup(false);
        if (focusField === 'guests') {
          setFocusField(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
  
    const timeout = setTimeout(async () => {
      const results = await fetchLocations(query);
      setSuggestions(results);
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [query]);


  async function fetchLocations(query: string) {
    if (!query) return [];
  
    const cityUrl = `https://photon.komoot.io/api/?q=${query}&limit=5&osm_tag=place:city`;
    let response = await fetch(cityUrl);
    let data = await response.json();
  
    if (data.features.length > 0) return data.features.map(formatSuggestion);
  
    const generalUrl = `https://photon.komoot.io/api/?q=${query}&limit=5`;
    response = await fetch(generalUrl);
    data = await response.json();
  
    return data.features.map(formatSuggestion);
  }

  function formatSuggestion(feature: any) {
    return {
      name: feature.properties.name,
      country: feature.properties.country,
      type: feature.properties.osm_value,
    };
  }

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    if (focusField === 'arrival') {
      setDates((prev) => ({
        ...prev,
        arrival: startDate,
        departure: startDate > (prev.departure || startDate) ? null : prev.departure,
      }));
      setFocusField('departure');
    } else {
      setDates((prev) => ({
        ...prev,
        departure: endDate,
      }));
      setShowCalendar(false);
    }
  };

  const toggleCalendar = (field) => {
    console.log(focusField)
    if (focusField === field) {
      setShowCalendar(false);
      setFocusField(null);
    } else {
      setFocusField(field);
      setShowCalendar(true);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCalendarStyle({
          position: 'absolute',
          top: `${rect.bottom + 0}px`,
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ddd',
          borderRadius: '25px',
          overflow: 'hidden',
        });
      }
    }
  };

  const handleBlur = () => {
    setFocusField(null);
  };

  const handleMouseEnter = (field: string) => {
    setHoveredField(field);
  };

  const handleMouseLeave = () => {
    setHoveredField(null);
  };

  const toggleGuestsPopup = () => {
    if (focusField === 'guests') {
      setShowGuestsPopup(false);
      setFocusField(null);
    } else {
      setFocusField('guests');
      setShowGuestsPopup(true);
    }
  };

  const incrementAdults = () => setAdults(adults + 1);
  const decrementAdults = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const incrementChildren = () => setChildren(children + 1);
  const decrementChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

  const guestsString = () => {
    const guestsCount = adults + children;
    if (guestsCount === 0) return '';
    let str = `${adults} взросл${adults > 1 ? 'ых' : 'ый'}`;
    if (children > 0) {
      str += `, ${children} дет${children > 1 ? 'ей' : 'ёныш'}`;
    }
    return str;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    dispatch(searchHouses(query));
  };

  return (
    <form
      className={`${styles['search-form']} ${
        focusField ? styles['blurred'] : ''
      }`}
      action='/search'
      method='GET'
      ref={containerRef}
      onSubmit={handleSearch}
    >
      <div 
        className={`${styles['search-field']} ${styles['location']} ${
          focusField === 'location' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('location')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='location' className={styles["label"]}>
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
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onFocus={() => {
                  setFocusField('location');
                  setIsDropdownOpen(true);
                }}
                onBlur={handleBlur}
              />
            }
            isOpen={isDropdownOpen && suggestions.length > 0}
            onClose={() => setIsDropdownOpen(false)}
          >
            <ul className={styles['dropdown-list']}>
              {suggestions.map((place, index) => (
                <li
                  key={index}
                  className={styles['dropdown-item']}
                  onClick={() => {
                    setQuery(place.name);
                    setSuggestions([]);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className={styles['dropdown-img']}>
                    <IconSvg name='location'/>
                  </div>
                  <p className={styles['dropdown-text']}>{place.name}, {place.country}</p>
                </li>
              ))}
            </ul>
          </DropdownMenu>
      </div>
      <div 
        className={`${styles['divider']} ${
          hoveredField === 'location' || hoveredField === 'arrival' ? styles['hidden'] : ''
        }`}
      ></div>
      <div 
        className={`${styles['search-field']} ${styles['arrival']} ${
          focusField === 'arrival' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('arrival')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='arrival' className={styles['label']}>
            {t('check-in')}
          </label>
          <input
            type='text'
            id='arrival'
            readOnly
            value={dates.arrival ? dates.arrival.toDateString() : ''}
            placeholder={t('add-dates')}
            onClick={() => toggleCalendar('arrival')}
            // onBlur={handleBlur}
            className={styles['input']}
          />
      </div>
      <div 
        className={`${styles['divider']} ${
          hoveredField === 'arrival' || hoveredField === 'departure' ? styles['hidden'] : ''
        }`}
      ></div>
      <div 
        className={`${styles['search-field']} ${styles['departure']} ${
          focusField === 'departure' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('departure')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='departure' className={styles['label']}>
            {t('check-out')}
          </label>
          <input
            type='text'
            id='departure'
            readOnly
            value={dates.departure ? dates.departure.toDateString() : ''}
            placeholder={t('add-dates')}
            onClick={() => toggleCalendar("departure")}
            className={styles["input"]}
          />
      </div>
      <div 
        className={`${styles['divider']} ${
          hoveredField === 'departure' || hoveredField === 'guests' ? styles['hidden'] : ''
        }`}
      ></div>
      <div 
        className={`${styles['search-field']} ${styles['guests']} ${
          focusField === 'guests' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('guests')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='guests' className={styles['label']}>
            {t('who')}
          </label>
          <input
            type='text'
            id='guests'
            name='guests'
            placeholder={t('add-guests')}
            className={styles["input"]}
            onBlur={handleBlur}
            onClick={toggleGuestsPopup}
            value={guestsString()}
          />
      </div>
      <button type='submit' className={styles["search-button"]}>
        <IconSvg name='search-icon' width='16px' height='16px' />
      </button>
      {showCalendar && (
        <div ref={calendarRef} style={calendarStyle}>
          <DateRange
            ranges={[
              {
                startDate: dates.arrival || new Date(),
                endDate: dates.departure || dates.arrival || new Date(),
                key: 'selection',
              },
            ]}
            onChange={handleSelect}
            minDate={new Date()}
            rangeColors={["#ff5a5f"]}
            months={2}
            direction='horizontal'
            className={styles['hiddenRanges']}
          />
        </div>
      )}
      {showGuestsPopup && (
        <div
          ref={guestsPopupRef}
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            zIndex: 1001,
            padding: '1rem',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Взрослые
            </label>
            <button onClick={decrementAdults} disabled={adults <= 1}>
              -
            </button>
            <span style={{ margin: '0 8px' }}>{adults}</span>
            <button onClick={incrementAdults}>+</button>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Дети
            </label>
            <button onClick={decrementChildren} disabled={children <= 0}>
              -
            </button>
            <span style={{ margin: '0 8px' }}>{children}</span>
            <button onClick={incrementChildren}>+</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default SearchForm;
