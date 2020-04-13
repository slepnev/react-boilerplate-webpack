import { format, isValid, parse, formatDistanceToNow, formatDistanceStrict, isPast } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const dateToFormat = (formatString: string, date: Date = new Date()): string => {
  return format(date, formatString);
};

export const stringToDate = (dateString: string, formatString: string = 'dd.MM.yyyy'): Date => {
  return parse(dateString, formatString, new Date());
};

export const dateToServer = (date: Date = new Date()): string => {
  return dateToFormat('yyyy-MM-dd', date);
};

export const dateToString = (date: Date = new Date()): string => {
  return dateToFormat('dd.MM.yyyy', date);
};

export const stringDateToServer = (dateString: string, formatString: string = 'dd.MM.yyyy'): string => {
  return dateToServer(stringToDate(dateString, formatString));
};

export const serverDateToString = (dateString: string, formatString: string = 'yyyy-MM-dd'): string => {
  return dateToFormat('dd.MM.yyyy', stringToDate(dateString, formatString));
};

export const isValidStringDate = (dateString: string, formatString: string = 'dd.MM.yyyy'): boolean => {
  return isValid(stringToDate(dateString, formatString));
};

export const localeStringDate = (dateString: string,
                                 formatString: string = 'yyyy-MM-dd',
                                 formatLocale: string = 'PPP'): string => {
  return format(stringToDate(dateString, formatString), formatLocale, {locale: ru});
};

export const distanceToDate = (dateString: string, formatString: string = 'dd.MM.yyyy', unit?: any): string => {
  return dateString && formatDistanceStrict(stringToDate(dateString, formatString), new Date(), {locale: ru, unit});
};

export const distanceToNow = (dateString: string, formatString: string = 'dd.MM.yyyy', addSuffix = false): string => {
  return dateString && formatDistanceToNow(stringToDate(dateString, formatString), {locale: ru, addSuffix});
};

export const distanceToDateTime = (dateString: string, timeString: string, addSuffix = false): string | undefined => {
  const dateTime = `${dateString} ${timeString && timeString.length == 5 ? timeString : '00:00'}`;
  const format = 'dd.MM.yyyy HH:mm';

  if (isPast(stringToDate(dateTime, format))) {
    return;
  }

  return distanceToNow(dateTime, format, addSuffix);
};
