import { Button } from '@/components/ui/button';
import { Calendar, CalendarDays, CalendarRange } from 'lucide-react';

type DateRangeType = 'today' | 'week' | 'month' | 'all';

interface DateRangeFilterProps {
  selectedRange: DateRangeType;
  onRangeChange: (range: DateRangeType) => void;
}

export const DateRangeFilter = ({ selectedRange, onRangeChange }: DateRangeFilterProps) => {
  const ranges = [
    { value: 'all' as DateRangeType, label: 'الكل', icon: CalendarRange },
    { value: 'today' as DateRangeType, label: 'اليوم', icon: Calendar },
    { value: 'week' as DateRangeType, label: 'هذا الأسبوع', icon: CalendarDays },
    { value: 'month' as DateRangeType, label: 'هذا الشهر', icon: CalendarRange },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {ranges.map((range) => {
        const Icon = range.icon;
        const isActive = selectedRange === range.value;
        
        return (
          <Button
            key={range.value}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={() => onRangeChange(range.value)}
            className="gap-2"
          >
            <Icon className="w-4 h-4" />
            {range.label}
          </Button>
        );
      })}
    </div>
  );
};
