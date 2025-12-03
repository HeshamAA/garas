export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes} دقيقة`;
  } else if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  } else if (diffInDays === 1) {
    return 'أمس';
  } else if (diffInDays < 7) {
    return `منذ ${diffInDays} أيام`;
  } else {
    return date.toLocaleDateString('ar-SA');
  }
};
