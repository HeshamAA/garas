export type DateRangeType = 'today' | 'week' | 'month' | 'all';

export interface DateRange {
  fromDate?: string;
  toDate?: string;
}

export const getDateRange = (rangeType: DateRangeType): DateRange => {
  const now = new Date();
  
  switch (rangeType) {
    case 'today': {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return {
        fromDate: today.toISOString().split('T')[0],
        toDate: today.toISOString().split('T')[0],
      };
    }
    
    case 'week': {
      // Get start of week (Saturday in Arabic calendar)
      const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
      const daysToSaturday = dayOfWeek === 6 ? 0 : (dayOfWeek + 1);
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - daysToSaturday);
      startOfWeek.setHours(0, 0, 0, 0);
      
      return {
        fromDate: startOfWeek.toISOString().split('T')[0],
        toDate: now.toISOString().split('T')[0],
      };
    }
    
    case 'month': {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        fromDate: startOfMonth.toISOString().split('T')[0],
        toDate: now.toISOString().split('T')[0],
      };
    }
    
    case 'all':
    default:
      return {};
  }
};
