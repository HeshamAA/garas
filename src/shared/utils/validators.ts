export const isValidEmail = (email: string): boolean => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidSaudiPhone = (phone: string): boolean => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('05')) {
    return true;
  } else if (cleaned.length === 9 && cleaned.startsWith('5')) {
    return true;
  } else if (cleaned.length === 12 && cleaned.startsWith('966')) {
    return true;
  }

  return false;
};

export const isValidNationalId = (id: string): boolean => {
  if (!id) return false;
  const cleaned = id.replace(/\D/g, '');
  if (cleaned.length !== 10) return false;
  if (!cleaned.startsWith('1') && !cleaned.startsWith('2')) return false;

  return true;
};

export const isValidPassword = (password: string): boolean => {
  if (!password || password.length < 8) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber;
};

export const getPasswordStrength = (
  password: string
): 'weak' | 'medium' | 'strong' | 'very-strong' => {
  if (!password) return 'weak';

  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  if (strength <= 5) return 'strong';
  return 'very-strong';
};

export const isValidUrl = (url: string): boolean => {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isRequired = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

export const hasMinLength = (value: string, minLength: number): boolean => {
  if (!value) return false;
  return value.length >= minLength;
};

export const hasMaxLength = (value: string, maxLength: number): boolean => {
  if (!value) return true;
  return value.length <= maxLength;
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export const isDateInPast = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj < new Date();
};

export const isDateInFuture = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj > new Date();
};

export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

export const sanitizeString = (str: string): string => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
};

export const isArabicText = (text: string): boolean => {
  if (!text) return false;
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

export const isEnglishText = (text: string): boolean => {
  if (!text) return false;
  const englishRegex = /^[a-zA-Z\s]+$/;
  return englishRegex.test(text);
};