import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RequestDetailsHeaderProps {
  requestId: number;
  onBack: () => void;
}

export const RequestDetailsHeader = ({ requestId, onBack }: RequestDetailsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowRight className="w-4 h-4" />
        العودة للطلبات
      </Button>
      <div className="text-right">
        <h1 className="text-2xl lg:text-3xl font-bold">تفاصيل الطلب</h1>
        <p className="text-muted-foreground mt-1">رقم الطلب: #{requestId}</p>
      </div>
    </div>
  );
};
