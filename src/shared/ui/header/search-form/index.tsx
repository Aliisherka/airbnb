import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../../assets/icons/icon';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import LocationInput from './location-input';
import CalendarInput from './calendar-input';
import GuestsInput from './guests-input';
import Divider from '../../divider';
import { useDates } from '../../../hooks/useDates';
import useFetchLocations from '../../../hooks/useFetchLocations';
import { useSearchParams } from 'react-router-dom';
import { useGuests } from '../../../hooks/useGuests';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dates, setArrivalDate, setDepartureDate } = useDates();
  
  const [query, setQuery] = useState('');
  const { suggestions, setSuggestions } = useFetchLocations(query);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);
  const [calendarStyle, setCalendarStyle] = useState({});
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);

  const containerRef = useRef<HTMLFormElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const guestsPopupRef = useRef<HTMLDivElement>(null);

  const guests = useGuests();

  useEffect(() => {
    const locationParams = searchParams.get('location') || '';
    setQuery(locationParams);

    const adultsParam = parseInt(searchParams.get('adults') || '0', 10);
    const childrenParam = parseInt(searchParams.get('children') || '0', 10);
    const infantsParam = parseInt(searchParams.get('infants') || '0', 10);
    const petsParam = parseInt(searchParams.get('pets') || '0', 10);

    guests.setAdults(adultsParam);
    guests.setChildren(childrenParam);
    guests.setInfants(infantsParam);
    guests.setPets(petsParam);

    const arrivalParams = searchParams.get('arrival') || '';
    const departureParams = searchParams.get('departure') || '';
    setArrivalDate(arrivalParams ? new Date(arrivalParams) : null)
    setDepartureDate(departureParams ? new Date(departureParams) : null)
  }, [searchParams]);

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
        setFocusField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    if (focusField === 'arrival') {
      if (startDate) {
        setArrivalDate(startDate);
        setFocusField('departure');
      }
    } else {
      if (endDate) {
        setDepartureDate(endDate);
        setShowCalendar(false);
      }
    }
  };

  const toggleCalendar = (field: string) => {
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

    const toLocalISODate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    let arrivalStr = '';
    let departureStr = '';

    if (dates.arrival && !dates.departure) {
      const dep = new Date(dates.arrival);
      dep.setDate(dep.getDate() + 1);
      arrivalStr = toLocalISODate(dates.arrival);
      departureStr = toLocalISODate(dep);
    } else if (!dates.arrival && dates.departure) {
      const arr = new Date(dates.departure);
      arr.setDate(arr.getDate() - 1);
      arrivalStr = toLocalISODate(arr);
      departureStr = toLocalISODate(dates.departure);
    } else if (dates.arrival && dates.departure) {
      const sameDay = dates.arrival.toDateString() === dates.departure.toDateString();
      const dep = sameDay ? new Date(dates.departure) : dates.departure;
      if (sameDay) dep.setDate(dep.getDate() + 1);

      arrivalStr = toLocalISODate(dates.arrival);
      departureStr = toLocalISODate(dep);
    }

    setFocusField(null);
    
    setSearchParams({ 
      location: query,
      adults: String(guests.adults),
      children: String(guests.children),
      infants: String(guests.infants),
      pets: String(guests.pets),
      ...(arrivalStr && { arrival: arrivalStr }),
      ...(departureStr && { departure: departureStr }),
    });
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
        guests={guests}
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
