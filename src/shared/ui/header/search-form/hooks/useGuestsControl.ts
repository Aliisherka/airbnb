import { useEffect } from 'react';
import { useGuests } from './useGuests';

export const useGuestsControl = (searchParams: URLSearchParams) => {
  const guests = useGuests();

  useEffect(() => {
    guests.setAdults(parseInt(searchParams.get('adults') || '0'));
    guests.setChildren(parseInt(searchParams.get('children') || '0'));
    guests.setInfants(parseInt(searchParams.get('infants') || '0'));
    guests.setPets(parseInt(searchParams.get('pets') || '0'));
  }, [searchParams]);

  return guests;
};