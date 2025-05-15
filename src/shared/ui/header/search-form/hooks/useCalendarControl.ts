import { useRef, useState } from 'react';
import { RangeKeyDict } from 'react-date-range';

export const useCalendarControl = (
  focusField: string | null,
  setFocusField: (f: string | null) => void,
  containerRef: React.RefObject<HTMLFormElement>,
  setArrivalDate: (date: Date | null) => void,
  setDepartureDate: (date: Date | null) => void,
) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarStyle, setCalendarStyle] = useState({});
  const calendarRef = useRef<HTMLDivElement>(null);

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
          top: `${rect.bottom}px`,
          zIndex: 1000,
          border: '1px solid #ddd',
          borderRadius: '25px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        });
      }
    }
  };

  return { showCalendar, setShowCalendar, handleSelect, toggleCalendar, calendarRef, calendarStyle };
};