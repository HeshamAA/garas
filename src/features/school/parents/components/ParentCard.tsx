import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Parent } from '../types/parent.types';
import ParentContactInfo from './ParentContactInfo';

interface ParentCardProps {
  parent: Parent;
  onViewRequests?: (parentId: number) => void;
}

const ParentCard = ({ parent, onViewRequests }: ParentCardProps) => {
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length >= 2 
      ? `${parts[0][0]}${parts[1][0]}` 
      : name.substring(0, 2);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow h-full">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-4 text-right">
          {/* Parent Header */}
          <div className="flex items-center justify-start gap-3">
            <Avatar className="w-16 h-16">
              <AvatarImage src={parent.profileImage || undefined} />
              <AvatarFallback>{getInitials(parent.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{parent.fullName}</h3>
              <p className="text-sm text-muted-foreground">{parent.user.role}</p>
            </div>
          </div>

          {/* Contact Information */}
          <ParentContactInfo phone={parent.user.phoneNumber} email={parent.user.email} />

          {/* National ID */}
          {parent.nationalId && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">الرقم القومي: </span>
              {parent.nationalId}
            </div>
          )}

          {/* Associated Students */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">الطلاب المرتبطين ({parent.students.length}):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {parent.students.map((student) => (
                <Badge key={student.id} variant="secondary" className="rounded-full">
                  {student.fullName} - {student.class}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <p className="font-medium mb-2 text-right">طلبات الاستلام</p>
            <Button 
              className="rounded-full"
              onClick={() => onViewRequests?.(parent.id)}
            >
              عرض الابناء
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParentCard;