import React from 'react';
import { useSearchForm } from './hooks/useSearchForm';
import styles from './styles.module.scss';
import IconSvg from '../../../assets/icons/icon';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import LocationInput from './location-input';
import CalendarInput from './calendar-input';
import GuestsInput from './guests-input';
import Divider from '../../divider';

const SearchForm = () => {
  const {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    isDropdownOpen,
    setIsDropdownOpen,
    hoveredField,
    focusField,
    setFocusField,
    showCalendar,
    toggleCalendar,
    calendarRef,
    calendarStyle,
    handleSelect,
    dates,
    handleSearch,
    containerRef,
    guests,
    showGuestsPopup,
    setShowGuestsPopup,
    guestsPopupRef,
    handleMouseEnter,
    handleMouseLeave,
  } = useSearchForm();

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
