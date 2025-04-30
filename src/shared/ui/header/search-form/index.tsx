import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../../assets/icons/icon';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { searchHouses } from '../../../../app/slices/housesSlice';
import { useAppDispatch } from '../../../../app/store/hooks';
import LocationInput from './location-input';
import CalendarInput from './calendar-input';
import GuestsInput from './guests-input';
import Divider from '../../divider';
import { useDates } from '../../../hooks/useDates';
import useFetchLocations from '../../../hooks/useFetchLocations';

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const { dates, setArrivalDate, setDepartureDate } = useDates();
  
  const [query, setQuery] = useState('');
  const { suggestions, setSuggestions } = useFetchLocations(query);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);
  const [calendarStyle, setCalendarStyle] = useState({});
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);

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

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    if (focusField === 'arrival') {
      setArrivalDate(startDate);
      setFocusField('departure');
    } else {
      setDepartureDate(endDate);
      setShowCalendar(false);
    }
  };

  const toggleCalendar = (field) => {
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

  const handleMouseEnter = (field: string) => {
    setHoveredField(field);
  };

  const handleMouseLeave = () => {
    setHoveredField(null);
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
      <LocationInput
        query={query}
        suggestions={suggestions}
        isOpen={isDropdownOpen}
        focusField={focusField}
        onQueryChange={setQuery}
        onFocus={() => {
          setFocusField('location');
          setIsDropdownOpen(true);
        }}
        onBlur={() => setFocusField(null)}
        onSelectSuggestion={(place) => {
          setQuery(place.name);
          setSuggestions([]);
          setIsDropdownOpen(false);
        }}
        onMouseEnter={() => handleMouseEnter('location')}
        onMouseLeave={handleMouseLeave}
        onCloseDropdown={() => setIsDropdownOpen(false)}
      />
      
      <Divider hidden={hoveredField === 'location' || hoveredField === 'arrival'} />

      <CalendarInput
        label='check-in'
        id='arrival'
        value={dates.arrival ? dates.arrival.toDateString() : ''}
        onClick={() => toggleCalendar('arrival')}
        onMouseEnter={() => handleMouseEnter('arrival')}
        onMouseLeave={handleMouseLeave}
        isActive={focusField === 'arrival'}
        className='arrival'
      />

      <Divider hidden={hoveredField === 'arrival' || hoveredField === 'departure'} />

      <CalendarInput
        label='check-out'
        id='departure'
        value={dates.departure ? dates.departure.toDateString() : ''}
        onClick={() => toggleCalendar('departure')}
        onMouseEnter={() => handleMouseEnter('departure')}
        onMouseLeave={handleMouseLeave}
        isActive={focusField === 'departure'}
        className='departure'
      />

      <Divider hidden={hoveredField === 'departure' || hoveredField === 'guests'} />

      <GuestsInput
        focusField={focusField}
        setFocusField={setFocusField}
        showGuestsPopup={showGuestsPopup}
        setShowGuestsPopup={setShowGuestsPopup}
        guestsPopupRef={guestsPopupRef}
        onMouseEnter={() => handleMouseEnter('guests')}
        onMouseLeave={handleMouseLeave}
      />
      
      <button type='submit' className={styles["search-button"]}>
        <IconSvg color='white' name='search-icon' width='16px' height='16px' />
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
    </form>
  );
}

export default SearchForm;
