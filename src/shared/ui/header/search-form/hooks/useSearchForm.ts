import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDates } from '../../../../hooks/useDates';
import { useCalendarControl } from './useCalendarControl';
import { useDatesControl } from './useDatesControl';
import { useGuestsControl } from './useGuestsControl';
import { useOutsideClickHandler } from './useOutsideClickHandler';
import { useQueryControl } from './useQueryControl';
import { useSearchHandler } from './useSearchHandler';
import { useSearchFormCallbacks } from './useSearchFormCallbacks';

export const useSearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dates, setArrivalDate, setDepartureDate, clearArrivalDate, clearDepartureDate } = useDates();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [focusField, setFocusField] = useState<string | null>(null);
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);

  const containerRef = useRef<HTMLFormElement>(null);
  const guestsPopupRef = useRef<HTMLDivElement>(null);

  const {
    query, setQuery, suggestions, setSuggestions
  } = useQueryControl();

  const guests = useGuestsControl(searchParams);

  const {
    showCalendar, setShowCalendar, handleSelect, toggleCalendar, calendarRef, calendarStyle
  } = useCalendarControl(focusField, setFocusField, containerRef, setArrivalDate, setDepartureDate);

  useOutsideClickHandler(
    [calendarRef, containerRef, guestsPopupRef],
    () => {
      setShowCalendar(false);
      setShowGuestsPopup(false);
      setFocusField(null);
    }
  );

  useDatesControl(searchParams, setArrivalDate, setDepartureDate);

  useEffect(() => {
    const locationParams = searchParams.get('location') || '';
    setQuery(locationParams);
  }, [searchParams]);

  const handleSearch = useSearchHandler({ dates, guests, query, setSearchParams, setFocusField });

  const callbacks = useSearchFormCallbacks({
    setFocusField,
    setIsDropdownOpen,
    setQuery,
    setSuggestions,
    toggleCalendar,
    setHoveredField
  });

  const arrivalValue = useMemo(() => {
    return dates.arrival ? dates.arrival.toDateString() : '';
  }, [dates.arrival]);

  const departureValue = useMemo(() => {
    return dates.departure ? dates.departure.toDateString() : '';
  }, [dates.departure]);

  return {
    ...callbacks,
    query,
    setQuery,
    suggestions,
    isDropdownOpen,
    hoveredField,
    focusField,
    setFocusField,
    showCalendar,
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
    arrivalValue,
    departureValue,
    clearArrivalDate,
    clearDepartureDate
  }
}