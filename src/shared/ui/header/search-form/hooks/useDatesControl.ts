import { useEffect } from 'react';

export const useDatesControl = (searchParams: URLSearchParams, setArrivalDate: (d: Date | null) => void, setDepartureDate: (d: Date | null) => void) => {
  useEffect(() => {
    const arrivalParams = searchParams.get('arrival') || '';
    const departureParams = searchParams.get('departure') || '';
    setArrivalDate(arrivalParams ? new Date(arrivalParams) : null)
    setDepartureDate(departureParams ? new Date(departureParams) : null)
  }, [searchParams]);
}