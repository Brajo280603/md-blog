export function formatDate(date, dateStyle = 'medium', locales = 'en'){
  //no dashes in dates for safari
  const dateToFormat = new Date(date.replaceAll('-','/'))
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
  return dateFormatter.format(dateToFormat)
}