import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RequestStatusBadge from './RequestStatusBadge';
import type { RequestStatus } from '../types/request.types';

interface RequestCardHeaderProps {
  parentName: string;
  parentImage?: string | null;
  parentInitials: string;
  status: RequestStatus;
}

export const RequestCardHeader = ({
  parentName,
  parentImage,
  parentInitials,
  status,
}: RequestCardHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={parentImage || undefined} loading="lazy" />
          <AvatarFallback>{parentInitials}</AvatarFallback>
        </Avatar>
        <div className="text-right">
          <h3 className="text-lg font-bold">{parentName}</h3>
          <p className="text-sm text-muted-foreground">ولي أمر</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <RequestStatusBadge status={status} />
      </div>
    </div>
  );
};
