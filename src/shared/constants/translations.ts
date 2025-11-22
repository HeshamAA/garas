export const CLASS_TRANSLATIONS: Record<string, string> = {
    one: 'الأول',
    two: 'الثاني',
    three: 'الثالث',
    four: 'الرابع',
    five: 'الخامس',
    six: 'السادس',
};

export const STAGE_TRANSLATIONS: Record<string, string> = {
    first: 'الابتدائية',
    middle: 'الإعدادية',
    secondary: 'الثانوية',
};

export const translateClass = (classValue: string): string => {
    return CLASS_TRANSLATIONS[classValue] || classValue;
};

export const translateStage = (stageValue: string): string => {
    return STAGE_TRANSLATIONS[stageValue] || stageValue;
};
