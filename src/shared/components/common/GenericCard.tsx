import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GenericCardProps } from '@/shared/types';
import StatusBadge from './StatusBadge';

const GenericCard = ({
  title,
  subtitle,
  avatar,
  status,
  actions,
  children,
  onClick,
  className = '',
}: GenericCardProps) => {
  return (
    <Card
      className={`hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left side: Avatar and info */}
          <div className="flex items-start gap-4 flex-1">
            {avatar !== undefined && (
              <Avatar className="w-12 h-12">
                <AvatarImage src={avatar} alt={title} />
                <AvatarFallback>
                  {title
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg truncate">{title}</h3>
                {status && <StatusBadge status={status} />}
              </div>

              {subtitle && (
                <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
              )}

              {children && <div className="mt-3">{children}</div>}
            </div>
          </div>

          {/* Right side: Actions */}
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default GenericCard;