import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Building2, Clock, User, Phone } from 'lucide-react';
import { memo, useMemo, useCallback } from 'react';

const translateClass = (classValue: string): string => {
  const classMap = {
    'one': 'الأول',
    'two': 'الثاني',
    'three': 'الثالث',
    'four': 'الرابع',
    'five': 'الخامس',
    'six': 'السادس',
  };
  return classMap[classValue] || classValue;
};

const translateStage = (stageValue: string): string => {
  const stageMap: Record<string, string> = {
    'first': 'الابتدائية',
    'middle': 'الإعدادية',
    'secondary': 'الثانوية',
  };
  return stageMap[stageValue] || stageValue;
};

interface StudentCardProps {
  student: any;
  onViewRequests?: (studentId: number) => void;
}

export const StudentCard = memo(({ 
  student, 
  onViewRequests,
}: StudentCardProps) => {
  const getInitials = useMemo(() => {
    if (!student.fullName) return 'NA';
    const parts = student.fullName.split(' ');
    return parts.length >= 2 
      ? `${parts[0][0]}${parts[1][0]}` 
      : student.fullName.substring(0, 2);
  }, [student.fullName]);

  const formattedDate = useMemo(() => {
    return new Date(student.dateOfBirth).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [student.dateOfBirth]);

  const handleViewRequests = useCallback(() => {
    onViewRequests?.(student.id);
  }, [onViewRequests, student.id]);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300" dir="rtl">
      <div className="space-y-4">
        
        <div className="flex items-center justify-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-gray-200">
            <AvatarImage src={student.profileImage} alt={student.fullName} loading="lazy" />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {getInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-right">
            <h3 className="font-bold text-lg text-gray-900">{student.fullName}</h3>
            <p className="text-sm text-gray-500">كود الطالب: {student.code}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          
          <div className="flex items-center justify-start gap-2 text-sm">
            <span className="font-medium text-gray-700">الفصل:</span>
            <span className="text-blue-600 font-medium">{translateClass(student.class)}</span>
          </div>

          <div className="flex items-center justify-start gap-2 text-sm">
            <span className="font-medium text-gray-700">المرحلة:</span>
            <span className="text-blue-600 font-medium">{translateStage(student.stage)}</span>
          </div>

          <div className="flex items-center justify-start gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-700" />
            <span className="font-medium text-gray-700">تاريخ الميلاد:</span>
            <span className="text-blue-600">{formattedDate}</span>
          </div>
        </div>

        {student.school && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-start gap-2 text-sm">
              <Building2 className="w-4 h-4 text-gray-700" />
              <span className="font-medium text-gray-700">المدرسة:</span>
              <div className="flex items-center gap-2 flex-1">
                <img 
                  src={student.school.logo} 
                  alt={student.school.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  loading="lazy"
                />
                <div className="text-right">
                  <p className="text-blue-600 font-medium">{student.school.name}</p>
                  <p className="text-xs text-gray-500">{student.school.location}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {student.parent && (
          <div className="bg-blue-50 p-4 rounded-lg space-y-3 border border-blue-100">
            <p className="font-bold text-sm text-gray-800 flex items-center justify-start gap-2">
              <User className="w-4 h-4" />
              معلومات ولي الأمر
            </p>
            <div className="flex items-center justify-start gap-3">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src={student.parent.profileImage} alt={student.parent.fullName} loading="lazy" />
                <AvatarFallback className="bg-blue-200 text-blue-700 font-semibold">
                  {student.parent.fullName?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-right flex-1">
                <p className="font-semibold text-sm text-gray-900">{student.parent.fullName}</p>
                <div className="flex items-center justify-start gap-1 mt-1">
                  <Phone className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">{student.parent.phoneNumber}</span>
                </div>
                {student.parent.email && (
                  <p className="text-xs text-gray-500 mt-1">{student.parent.email}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {onViewRequests && (
          <div className="pt-2">
            <Button 
              className="w-full rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={handleViewRequests}
            >
              عرض طلبات الاستلام
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
});

StudentCard.displayName = 'StudentCard';