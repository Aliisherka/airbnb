import { addDays, format } from "date-fns"


export const getDefaultDates = (): { arrival: string, departure: string } => {
  const start = addDays(new Date(), Math.floor(Math.random() * 20));
  const end = addDays(start, 6);

  return {
    arrival: format(start, 'yyyy-MM-dd'),
    departure: format(end, 'yyyy-MM-dd'),
  };
}