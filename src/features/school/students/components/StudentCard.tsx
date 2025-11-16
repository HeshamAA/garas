import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Building2, Clock, User } from 'lucide-react';
import { Student } from '../types/student.types';
import { StudentStatusBadge } from './StudentStatusBadge';

interface StudentCardProps {
  student: Student;
  onViewRequests?: (studentId: string) => void;
  onStatusUpdate?: (studentId: string, status: Student['status']) => void;
}

export const StudentCard = ({ 
  student, 
  onViewRequests,
  onStatusUpdate 
}: StudentCardProps) => {
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length >= 2 
      ? `${parts[0][0]}${parts[1][0]}` 
      : name.substring(0, 2);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-4 text-right">
          {/* Header with avatar and name */}
          <div className="flex items-center justify-end gap-3">
            <div>
              <h3 className="font-bold text-lg">{student.name}</h3>
              {student.role && (
                <p className="text-sm text-muted-foreground">{student.role}</p>
              )}
            </div>
            <Avatar className="w-16 h-16">
              <AvatarImage src={student.avatar} />
              <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Status badge */}
          <div className="flex items-center justify-end gap-2">
            <StudentStatusBadge status={student.status} />
          </div>

          {/* Location */}
          <div className="flex items-center justify-end gap-2 text-sm">
            <span className="text-primary">{student.location}</span>
            <Building2 className="w-4 h-4 text-primary" />
            <span className="mr-4 text-muted-foreground">الحالة:</span>
          </div>

          {/* Guardian */}
          <div className="flex items-center justify-end gap-2 text-sm">
            <span className="text-primary">{student.guardianName}</span>
            <User className="w-4 h-4 text-primary" />
            <span className="mr-4 text-muted-foreground">ولي الأمر:</span>
          </div>

          {/* Receiver */}
          {student.receiverName && (
            <div className="flex items-center justify-end gap-2 text-sm">
              <span className="text-primary">{student.receiverName}</span>
              <User className="w-4 h-4 text-primary" />
              <span className="mr-4 text-muted-foreground">المستلم:</span>
            </div>
          )}

          {/* Last update time/date */}
          <div className="flex items-center justify-end gap-2 text-sm">
            <span className="text-primary">{student.time || student.date}</span>
            <Clock className="w-4 h-4 text-primary" />
            <span className="mr-4 text-muted-foreground">
              {student.time ? 'الساعة:' : 'تاريخ اخر تحديث:'}
            </span>
          </div>

          {/* Actions */}
          {onViewRequests && (
            <div className="pt-4">
              <p className="font-medium mb-2 text-right">طلبات الاستلام</p>
              <Button 
                className="rounded-full"
                onClick={() => onViewRequests(student.id)}
              >
                عرض الطلبات
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};