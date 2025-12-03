import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail, User } from 'lucide-react';

interface PersonInfoCardProps {
  title: string;
  fullName: string;
  profileImage?: string | null;
  role?: string;
  phoneNumber?: string;
  email?: string;
  nationalId?: string;
  className?: string;
}

export const PersonInfoCard = ({
  title,
  fullName,
  profileImage,
  role,
  phoneNumber,
  email,
  nationalId,
  className,
}: PersonInfoCardProps) => {
  const initials = fullName?.substring(0, 2) || 'U';

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={profileImage || undefined} loading="lazy" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="text-right flex-1">
          <p className="font-medium">{fullName}</p>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </div>
      <div className="space-y-2 text-sm">
        {phoneNumber && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{phoneNumber}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{email}</span>
          </div>
        )}
        {nationalId && (
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>الرقم القومي: {nationalId}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
