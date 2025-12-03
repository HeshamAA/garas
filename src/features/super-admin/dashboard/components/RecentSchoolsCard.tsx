import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { School } from 'lucide-react';
import { getRelativeTime } from '../utils/dashboardHelpers';

interface RecentSchool {
  id: number;
  name: string;
  logo?: string;
  location: string;
  status: string;
  createdAt: string;
}

interface RecentSchoolsCardProps {
  schools: RecentSchool[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">نشطة</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">معلقة</Badge>;
    case 'suspended':
      return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">محظورة</Badge>;
    default:
      return <Badge>غير معروف</Badge>;
  }
};

export const RecentSchoolsCard = ({ schools }: RecentSchoolsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right flex items-center justify-between">
          <span>المدارس المضافة مؤخراً</span>
          <School className="w-5 h-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {schools.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد مدارس مضافة مؤخراً
          </div>
        ) : (
          <div className="space-y-3">
            {schools.map((school) => (
              <div
                key={school.id}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {school.logo && (
                    <img 
                      src={school.logo} 
                      alt={school.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className="text-right flex-1">
                    <p className="font-medium text-sm">{school.name}</p>
                    <p className="text-xs text-muted-foreground">{school.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getRelativeTime(school.createdAt)}
                    </p>
                  </div>
                </div>
                {getStatusBadge(school.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
