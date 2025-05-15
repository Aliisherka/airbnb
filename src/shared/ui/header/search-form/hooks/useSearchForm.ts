import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDates } from '../../../../hooks/useDates';
import { useCalendarControl } from './useCalendarControl';
import { useDatesControl } from './useDatesControl';
import { useGuestsControl } from './useGuestsControl';
import { useOutsideClickHandler } from './useOutsideClickHandler';
import { useQueryControl } from './useQueryControl';
import { useSearchHandler } from './useSearchHandler';

export const useSearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dates, setArrivalDate, setDepartureDate } = useDates();

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

  const handleMouseEnter = (field: string) => {
    setHoveredField(field);
  };

  const handleMouseLeave = () => {
    setHoveredField(null);
  };

  return {
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
  }
}