import { useCallback, useState } from 'react';

export function useDates() {
  const [dates, setDates] = useState<{ arrival: Date | null; departure: Date | null }>({
    arrival: null,
    departure: null,
  });

  const setArrivalDate = (date: Date | null) => {
    setDates((prev) => {
      const departure = prev.departure;
      return {
        ...prev,
        arrival: date,
        departure: departure && date && date > departure ? null : departure
      };
    });
  };

  const setDepartureDate = (date: Date | null) => {
    setDates((prev) => ({
      ...prev,
      departure: date,
    }));
  };

  const clearArrivalDate = useCallback(() => {
    setArrivalDate(null);
  }, [setArrivalDate]);

  const clearDepartureDate = useCallback(() => {
    setDepartureDate(null);
  }, [setDepartureDate]);

  return {
    dates,
    setArrivalDate,
    setDepartureDate,
    clearArrivalDate,
    clearDepartureDate
  };
}