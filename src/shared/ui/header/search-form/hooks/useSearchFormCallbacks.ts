import { useCallback } from 'react';

interface Place {
  name: string;
  country: string;
}

export const useSearchFormCallbacks = ({
  setFocusField,
  setIsDropdownOpen,
  setQuery,
  setSuggestions,
  toggleCalendar,
  setHoveredField
}: {
  setFocusField: (value: string | null) => void;
  setIsDropdownOpen: (value: boolean) => void;
  setQuery: (value: string) => void;
  setSuggestions: (value: any[]) => void;
  toggleCalendar: (field: string) => void;
  setHoveredField: (value: string | null) => void;
}) => {
  const handleMouseEnterLocation = useCallback(() => setHoveredField('location'), [setHoveredField]);
  const handleMouseEnterArrival = useCallback(() => setHoveredField('arrival'), [setHoveredField]);
  const handleMouseEnterDeparture = useCallback(() => setHoveredField('departure'), [setHoveredField]);
  const handleMouseEnterGuests = useCallback(() => setHoveredField('guests'), [setHoveredField]);
  const handleMouseLeave = useCallback(() => setHoveredField(null), [setHoveredField]);

  return {
    handleMouseEnterLocation,
    handleMouseEnterArrival,
    handleMouseEnterDeparture,
    handleMouseEnterGuests,
    handleMouseLeave,

    handleFocusLocation: useCallback(() => {
      setFocusField('location');
      setIsDropdownOpen(true);
    }, []),

    handleSelectSuggestion: useCallback((place: Place) => {
      setQuery(place.name);
      setSuggestions([]);
      setIsDropdownOpen(false);
    }, [setQuery, setSuggestions]),

    handleCloseDropdown: useCallback(() => {
      setIsDropdownOpen(false);
    }, []),

    handleClickArrival: useCallback(() => toggleCalendar('arrival'), [toggleCalendar]),
    handleClickDeparture: useCallback(() => toggleCalendar('departure'), [toggleCalendar]),
  };
};