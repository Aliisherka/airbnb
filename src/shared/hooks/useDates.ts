import { useState } from 'react';

export function useDates() {
  const [dates, setDates] = useState<{ arrival: Date | null; departure: Date | null }>({
    arrival: null,
    departure: null,
  });

  const setArrivalDate = (date: Date) => {
    setDates((prev) => ({
      ...prev,
      arrival: date,
      departure: date > (prev.departure || date) ? null : prev.departure,
    }));
  };

  const setDepartureDate = (date: Date) => {
    setDates((prev) => ({
      ...prev,
      departure: date,
    }));
  };

  return {
    dates,
    setArrivalDate,
    setDepartureDate,
  };
}