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
    isDropdownOpen,
    hoveredField,
    focusField,
    setFocusField,
    showCalendar,
    calendarRef,
    calendarInputsRef,
    calendarStyle,
    handleSelect,
    dates,
    handleSearch,
    containerRef,
    guests,
    showGuestsPopup,
    setShowGuestsPopup,
    guestsPopupRef,
    handleMouseLeave,
    handleFocusLocation,
    handleSelectSuggestion,
    handleCloseDropdown,
    handleMouseEnterLocation,
    handleMouseEnterArrival,
    handleMouseEnterDeparture,
    handleMouseEnterGuests,
    handleClickArrival,
    handleClickDeparture,
    arrivalValue,
    departureValue,
    clearArrivalDate,
    clearDepartureDate
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
      autoComplete='off'
    >
      <LocationInput
        query={query}
        suggestions={suggestions}
        isOpen={isDropdownOpen}
        focusField={focusField}
        onQueryChange={setQuery}
        onFocus={handleFocusLocation}
        onSelectSuggestion={handleSelectSuggestion}
        onMouseEnter={handleMouseEnterLocation}
        onMouseLeave={handleMouseLeave}
        onCloseDropdown={handleCloseDropdown}
      />
      
      <Divider hidden={hoveredField === 'location' || hoveredField === 'arrival'} />
      
      <div ref={calendarInputsRef} style={{ display: 'contents' }}>
        <CalendarInput
          label='check-in'
          id='arrival'
          value={arrivalValue}
          onClick={handleClickArrival}
          onMouseEnter={handleMouseEnterArrival}
          onMouseLeave={handleMouseLeave}
          isActive={focusField === 'arrival'}
          className='arrival'
          onClear={clearArrivalDate}
        />

        <Divider hidden={hoveredField === 'arrival' || hoveredField === 'departure'} />

        <CalendarInput
          label='check-out'
          id='departure'
          value={departureValue}
          onClick={handleClickDeparture}
          onMouseEnter={handleMouseEnterDeparture}
          onMouseLeave={handleMouseLeave}
          isActive={focusField === 'departure'}
          className='departure'
          onClear={clearDepartureDate}
        />
      </div>

      <Divider hidden={hoveredField === 'departure' || hoveredField === 'guests'} />

      <GuestsInput
        guests={guests}
        focusField={focusField}
        setFocusField={setFocusField}
        showGuestsPopup={showGuestsPopup}
        setShowGuestsPopup={setShowGuestsPopup}
        guestsPopupRef={guestsPopupRef}
        onMouseEnter={handleMouseEnterGuests}
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
