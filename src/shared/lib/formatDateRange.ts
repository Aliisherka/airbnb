import { format, parseISO } from 'date-fns';
import { ru, enUS, cs } from 'date-fns/locale';

export function formatDateRange(arrival: string, departure: string, lang: string = 'en') {
  if (!arrival || !departure) return '';

  const start = parseISO(arrival);
  const end = parseISO(departure);

  const locale = lang === 'ru' ? ru : lang === 'cz' ? cs : enUS;
  const sameMonth = start.getMonth() === end.getMonth();

  if (lang === 'ru') {
    if (sameMonth) {
      return `${format(start, 'd', { locale })}–${format(end, 'd MMM', { locale })}.`;
    } else {
      return `${format(start, 'd MMM', { locale })} – ${format(end, 'd MMM', { locale })}.`;
    }
  }

  if (lang === 'cz') {
    if (sameMonth) {
      return `${format(start, 'd', { locale })}–${format(end, 'd.M', { locale })}`;
    } else {
      return `${format(start, 'd.M', { locale })}–${format(end, 'd.M', { locale })}`;
    }
  }

  if (sameMonth) {
    return `${format(start, 'MMM d', { locale })} – ${format(end, 'd', { locale })}`;
  } else {
    return `${format(start, 'MMM d', { locale })} – ${format(end, 'MMM d', { locale })}`;
  }
}