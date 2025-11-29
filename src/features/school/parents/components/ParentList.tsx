import { Parent } from '../types/parent.types';
import ParentCard from './ParentCard';
import { EmptyState } from '@/shared/components/EmptyState';

interface ParentListProps {
  parents: Parent[];
  isLoading?: boolean;
  onViewRequests?: (parentId: number) => void;
}

const ParentList = ({ parents, isLoading, onViewRequests }: ParentListProps) => {
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (parents.length === 0) {
    return (
      <EmptyState 
        message="لا يوجد أولياء أمور" 
        description="لم يتم العثور على أي أولياء أمور. قم بإضافة أولياء أمور جدد للبدء."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {parents.map((parent: Parent) => (
        <ParentCard 
          key={parent.id} 
          parent={parent}
          onViewRequests={onViewRequests}
        />
      ))}
    </div>
  );
};

export default ParentList;