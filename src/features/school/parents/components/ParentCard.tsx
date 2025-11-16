import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Parent } from '../types/parent.types';
import ParentContactInfo from './ParentContactInfo';

interface ParentCardProps {
  parent: Parent;
  onViewRequests?: (parentId: string) => void;
}

const ParentCard = ({ parent, onViewRequests }: ParentCardProps) => {
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
          {/* Parent Header */}
          <div className="flex items-center justify-end gap-3">
            <div>
              <h3 className="font-bold text-lg">{parent.name}</h3>
              <p className="text-sm text-muted-foreground">{parent.role}</p>
            </div>
            <Avatar className="w-16 h-16">
              <AvatarImage src={parent.avatar} />
              <AvatarFallback>{getInitials(parent.name)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Contact Information */}
          <ParentContactInfo phone={parent.phone} email={parent.email} />

          {/* Associated Students */}
          <div className="flex items-center justify-end gap-3">
            <div className="flex gap-2">
              {parent.students.map((student, index) => (
                <Badge key={index} variant="secondary" className="rounded-full">
                  {student}
                </Badge>
              ))}
            </div>
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">الطلاب المرتبطين:</span>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <p className="font-medium mb-2 text-right">طلبات الاستلام</p>
            <Button 
              className="rounded-full"
              onClick={() => onViewRequests?.(parent.id)}
            >
              عرض الطلبات
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ParentCard;