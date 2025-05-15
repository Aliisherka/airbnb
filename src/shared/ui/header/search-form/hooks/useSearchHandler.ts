import { useSearchParams } from 'react-router-dom';

export const useSearchHandler = ({
  dates,
  guests,
  query,
  setSearchParams,
  setFocusField
}: {
  dates: { arrival: Date | null; departure: Date | null };
  guests: any;
  query: string;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  setFocusField: (field: string | null) => void;
}) => {
  const toLocalISODate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (e: React.FormEvent) => {
    e.preventDefault();

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
  }
};