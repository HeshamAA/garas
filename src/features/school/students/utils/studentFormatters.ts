export const translateClass = (classValue: string): string => {
  const classMap: Record<string, string> = {
    'one': 'الأول',
    'two': 'الثاني',
    'three': 'الثالث',
    'four': 'الرابع',
    'five': 'الخامس',
    'six': 'السادس',
  };
  return classMap[classValue] || classValue;
};

export const translateStage = (stageValue: string): string => {
  const stageMap: Record<string, string> = {
    'first': 'الابتدائية',
    'middle': 'الإعدادية',
    'secondary': 'الثانوية',
  };
  return stageMap[stageValue] || stageValue;
};

export const getInitials = (fullName: string): string => {
  if (!fullName) return 'NA';
  const parts = fullName.split(' ');
  return parts.length >= 2 
    ? `${parts[0][0]}${parts[1][0]}` 
    : fullName.substring(0, 2);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
