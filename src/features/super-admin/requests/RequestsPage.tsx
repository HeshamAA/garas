import { DashboardLayout } from '@/shared/components/layout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const RequestsPage = () => {
  
  const error = null;

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 space-y-6">
        
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-right">الطلبات</h1>
          <p className="text-muted-foreground text-right mt-2">
            إدارة طلبات الاستلام من المدارس
          </p>
        </div>

        <div className="relative animate-slide-in-right">
          <Input
            placeholder="ابحث عن اسم المدرسة"
            className="w-full bg-card text-foreground border rounded-full h-12 pr-12 text-right placeholder:text-right"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default RequestsPage;