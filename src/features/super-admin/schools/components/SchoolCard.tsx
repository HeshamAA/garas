import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, GraduationCap, CheckCircle2 } from 'lucide-react';
import { School } from '../types/school.types';
import { memo, useMemo } from 'react';
import { useAppDispatch, useToast } from '@/shared/hooks';
import { toggleSchoolStatus } from '../store/schoolsThunks';
import { Button } from '@/components/ui/button';

interface SchoolCardProps {
  school: School;
}

export const SchoolCard = memo(({ 
  school
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

  const isActive = school.status === 'active';

  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleToggle = async () => {
    try {
      const action = await dispatch(toggleSchoolStatus(school.id)).unwrap();
      toast.success(action.message || 'تم تحديث حالة المدرسة');
    } catch (err: unknown) {
      const msg = typeof err === 'string' ? err : (err instanceof Error ? err.message : 'فشل تحديث حالة المدرسة');
      toast.error(msg);
    }
  };

  return (
    <Card className={`p-6 hover:shadow-lg transition-all relative ${isActive ? 'border-2 border-green-500 shadow-md' : ''}`} dir="rtl">
      
      {isActive && (
        <div className="absolute top-4 left-4">
          <Badge className="bg-green-500 hover:bg-green-600 text-white gap-1 px-3 py-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>نشط</span>
          </Badge>
        </div>
      )}

      <div className="flex items-start gap-3 mb-4">
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

      <div className="space-y-3 text-right">
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

      <div className="mt-6 pt-4 border-t flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{isActive ? 'المدرسة نشطة حالياً' : 'المدرسة غير مفعلة'}</span>
        </div>
        <Button
          size="sm"
          variant={isActive ? 'destructive' : 'outline'}
          onClick={handleToggle}
        >
          {isActive ? 'إلغاء التفعيل' : 'تفعيل'}
        </Button>
      </div>
    </Card>
  );
});

SchoolCard.displayName = 'SchoolCard';