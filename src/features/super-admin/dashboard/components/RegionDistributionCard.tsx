import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface RegionData {
  region: string;
  count: number;
}

interface RegionDistributionCardProps {
  regions: RegionData[];
  totalSchools: number;
}

export const RegionDistributionCard = ({ regions, totalSchools }: RegionDistributionCardProps) => {
  return (
    <Card className='relative flex flex-col'>
      <CardHeader>
        <CardTitle className="text-right flex items-center justify-between">
          <span>توزيع المدارس حسب المنطقة</span>
          <TrendingUp className="w-5 h-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent className='max-h-full h-full'>
        {regions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد بيانات لتوزيع المدارس
          </div>
        ) : (
          <div className="space-y-3 flex flex-col justify-around h-full">
            {regions.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.count} مدرسة</span>
                  <span className="text-muted-foreground">{item.region}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${totalSchools ? (item.count / totalSchools) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
