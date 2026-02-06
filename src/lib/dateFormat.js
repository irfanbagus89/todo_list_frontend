import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDate = (date, formatString = 'PPP') => {
  if (!date) return '-';
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(parsedDate, formatString, { locale: id });
};

export const formatDateTime = (date) => {
  return formatDate(date, 'PPp');
};

export const formatRelativeTime = (date) => {
  if (!date) return '-';
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: id });
};

export const formatShortDate = (date) => {
  return formatDate(date, 'dd/MM/yyyy');
};

export const formatTime = (date) => {
  if (!date) return '-';
  const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
  return format(parsedDate, 'HH:mm', { locale: id });
};
