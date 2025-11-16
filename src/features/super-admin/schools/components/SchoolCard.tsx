import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Phone } from 'lucide-react';
import { School } from '../types/school.types';

interface SchoolCardProps {
  school: School;
  onViewDetails?: (schoolId: string) => void;
  onManageStudents?: (schoolId: string) => void;
}

export const SchoolCard = ({ 
  school, 
  onViewDetails,
  onManageStudents 
}: SchoolCardProps) => {
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length >= 2 
      ? `${parts[0][0]}${parts[1][0]}` 
      : name.substring(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getStatusColor = (status: School['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'inactive':
        return 'bg-destructive/10 text-destructive';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusLabel = (status: School['status']) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'inactive':
        return 'منتهي';
      case 'pending':
        return 'قيد المراجعة';
      default:
        return status;
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1 rounded-full text-sm ${getStatusColor(school.status)}`}>
            {getStatusLabel(school.status)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="font-bold text-lg">{school.name}</h3>
            {school.studentsCount !== undefined && (
              <p className="text-sm text-muted-foreground">
                {school.studentsCount} طلاب مسجلين
              </p>
            )}
          </div>
          <Avatar className="w-16 h-16">
            <AvatarImage src={school.avatar} />
            <AvatarFallback>{getInitials(school.name)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-3 text-right mb-4">
        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-primary">{school.location}</span>
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">الموقع:</span>
        </div>

        {school.phone && (
          <div className="flex items-center justify-end gap-2 text-sm">
            <span className="text-primary" dir="ltr">{school.phone}</span>
            <Phone className="w-4 h-4 text-primary" />
            <span className="font-medium">رقم الهاتف:</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 text-sm">
          <span className="text-primary">{formatDate(school.registrationDate)}</span>
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-medium">تاريخ التسجيل:</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        {onViewDetails && (
          <Button 
            variant="outline" 
            className="flex-1 rounded-full"
            onClick={() => onViewDetails(school.id)}
          >
            عرض التفاصيل
          </Button>
        )}
        {onManageStudents && (
          <Button 
            className="flex-1 rounded-full"
            onClick={() => onManageStudents(school.id)}
          >
            إدارة الطلاب
          </Button>
        )}
      </div>
    </Card>
  );
};