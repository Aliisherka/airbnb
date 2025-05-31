
export const formatSingleDate = (date: string, lang: string = 'en') => {
  const correctedLang = lang === 'cz' ? 'cs' : lang;

  const formatted = new Intl.DateTimeFormat(correctedLang, {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date));

  return formatted.charAt(0).toLowerCase() + formatted.slice(1);
}