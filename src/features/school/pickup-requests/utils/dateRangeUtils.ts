export type DateRangeType = 'today' | 'week' | 'month' | 'all';

export interface DateRange {
  fromDate?: string;
  toDate?: string;
}

export const getDateRange = (rangeType: DateRangeType): DateRange => {
  const now = new Date();
  
  switch (rangeType) {
    case 'today': {
      // Get today's date in local timezone
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      
      return {
        fromDate: todayStr,
        toDate: todayStr,
      };
    }
    
    case 'week': {
      // Get start of week (Saturday in Arabic calendar)
      const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
      const daysToSaturday = dayOfWeek === 6 ? 0 : (dayOfWeek + 1);
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - daysToSaturday);
      
      const startYear = startOfWeek.getFullYear();
      const startMonth = String(startOfWeek.getMonth() + 1).padStart(2, '0');
      const startDay = String(startOfWeek.getDate()).padStart(2, '0');
      
      const endYear = now.getFullYear();
      const endMonth = String(now.getMonth() + 1).padStart(2, '0');
      const endDay = String(now.getDate()).padStart(2, '0');
      
      return {
        fromDate: `${startYear}-${startMonth}-${startDay}`,
        toDate: `${endYear}-${endMonth}-${endDay}`,
      };
    }
    
    case 'month': {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const startYear = startOfMonth.getFullYear();
      const startMonth = String(startOfMonth.getMonth() + 1).padStart(2, '0');
      const startDay = '01';
      
      const endYear = now.getFullYear();
      const endMonth = String(now.getMonth() + 1).padStart(2, '0');
      const endDay = String(now.getDate()).padStart(2, '0');
      
      return {
        fromDate: `${startYear}-${startMonth}-${startDay}`,
        toDate: `${endYear}-${endMonth}-${endDay}`,
      };
    }
    
    case 'all':
    default:
      return {};
  }
};
