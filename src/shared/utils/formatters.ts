import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

export const formatDate = (date: Date | string, formatStr: string = 'PPP'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: ar });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatRelativeTime = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: ar });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'PPP p');
};

export const formatTime = (date: Date | string): string => {
  return formatDate(date, 'p');
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  } else if (cleaned.length === 9) {
    return `0${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('966')) {
    return `+966 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
};

export const formatNationalId = (id: string): string => {
  if (!id) return '';
  const cleaned = id.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned;
  }

  return id;
};

export const formatCurrency = (amount: number, currency: string = 'SAR'): string => {
  try {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount} ${currency}`;
  }
};

export const formatNumber = (num: number): string => {
  try {
    return new Intl.NumberFormat('ar-SA').format(num);
  } catch (error) {
    console.error('Error formatting number:', error);
    return num.toString();
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const toTitleCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => capitalizeFirst(word))
    .join(' ');
};