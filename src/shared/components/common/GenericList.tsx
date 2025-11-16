import { GenericListProps } from '@/shared/types';
import { Loader2 } from 'lucide-react';

function GenericList<T>({
  items,
  renderItem,
  isLoading = false,
  emptyMessage = 'No items found',
  emptyIcon,
  className = '',
}: GenericListProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export default GenericList;