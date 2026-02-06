import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

const parseDateSafe = (date) => {
  if (!date) return null;

  // Kalau string
  if (typeof date === 'string') {

    // ✅ Handle TIME ONLY (HH:mm:ss)
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(date)) {
      // Pakai tanggal hari ini supaya jadi valid Date
      const today = new Date().toISOString().split('T')[0];
      const parsed = new Date(`${today}T${date}`);
      return isValid(parsed) ? parsed : null;
    }

    // ✅ Handle ISO Date
    const parsed = parseISO(date);
    return isValid(parsed) ? parsed : null;
  }

  // Kalau sudah Date object / timestamp
  const parsed = new Date(date);
  return isValid(parsed) ? parsed : null;
};

export const formatDate = (date, formatString = 'PPP') => {
  const parsed = parseDateSafe(date);
  if (!parsed) return '-';
  return format(parsed, formatString, { locale: id });
};

export const formatDateTime = (date) => {
  return formatDate(date, 'PPp');
};

export const formatRelativeTime = (date) => {
  const parsed = parseDateSafe(date);
  if (!parsed) return '-';
  return formatDistanceToNow(parsed, { addSuffix: true, locale: id });
};

export const formatShortDate = (date) => {
  return formatDate(date, 'dd/MM/yyyy');
};

export const formatTime = (date) => {
  return formatDate(date, 'HH:mm');
};