
export const formatSingleDate = (date: string, lang: string = 'en') => {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date));
}