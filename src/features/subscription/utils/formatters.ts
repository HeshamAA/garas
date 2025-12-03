export const formatCurrency = (value?: number): string =>
  Number(value ?? 0).toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatDate = (value?: string): string =>
  value ? new Date(value).toLocaleString('ar-SA') : 'غير متوفر';
