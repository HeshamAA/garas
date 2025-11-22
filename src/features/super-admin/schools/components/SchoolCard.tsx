import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, GraduationCap } from 'lucide-react';
import { School } from '../types/school.types';
import { memo, useMemo, useCallback } from 'react';

interface SchoolCardProps {
  school: School;
  onViewDetails?: (schoolId: string) => void;
  onManageStudents?: (schoolId: string) => void;
}

export const SchoolCard = memo(({ 
  school, 
  onViewDetails,
  onManageStudents 
}: SchoolCardProps) => {
  const schoolInitials = useMemo(() => {
    const parts = school.name.split(' ');
    return parts.length >= 2 
      ? `${parts[0][0]}${parts[1][0]}` 
      : school.name.substring(0, 2);
  }, [school.name]);

  const formattedDate = useMemo(() => {
    return new Date(school.createdAt).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }, [school.createdAt]);

  const handleViewDetails = useCallback(() => {
    onViewDetails?.(school.id.toString());
  }, [onViewDetails, school.id]);

  const handleManageStudents = useCallback(() => {
    onManageStudents?.(school.id.toString());
  }, [onManageStudents, school.id]);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow" dir="rtl">
      
      <div className="flex items-start justify-start gap-3 mb-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={school.logo} loading="lazy" />
          <AvatarFallback className="bg-primary/10 text-primary">
            {schoolInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 text-right">
          <h3 className="font-bold text-lg">{school.name}</h3>
          {school.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {school.description}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3 text-right mb-4">
        <div className="flex items-center justify-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-medium">الموقع:</span>
          <span className="text-muted-foreground">{school.location}</span>
        </div>

        {school.stages && school.stages.length > 0 && (
          <div className="flex items-center justify-start gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-medium">المراحل:</span>
            <span className="text-muted-foreground">{school.stages.join(' - ')}</span>
          </div>
        )}

        <div className="flex items-center justify-start gap-2 text-sm">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-medium">تاريخ التسجيل:</span>
          <span className="text-muted-foreground">{formattedDate}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        {onViewDetails && (
          <Button 
            variant="outline" 
            className="flex-1 rounded-full"
            onClick={handleViewDetails}
          >
            عرض التفاصيل
          </Button>
        )}
        {onManageStudents && (
          <Button 
            className="flex-1 rounded-full"
            onClick={handleManageStudents}
          >
            إدارة الطلاب
          </Button>
        )}
      </div>
    </Card>
  );
});

SchoolCard.displayName = 'SchoolCard';