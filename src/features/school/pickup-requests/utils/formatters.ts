export const getInitials = (fullName?: string, fallback: string = 'U'): string => {
  if (!fullName) return fallback;
  return fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getHowToReceiveLabel = (howToReceive?: string): string => {
  if (!howToReceive) return 'غير محدد';
  switch (howToReceive) {
    case 'person':
      return 'شخصياً';
    case 'car':
      return 'بالسيارة';
    default:
      return 'غير محدد';
  }
};
