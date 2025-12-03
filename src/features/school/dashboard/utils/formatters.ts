export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
