import { Parent } from '../types/parent.types';
import ParentCard from './ParentCard';

interface ParentListProps {
  parents: Parent[];
  isLoading?: boolean;
  onViewRequests?: (parentId: string) => void;
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
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">لا يوجد أولياء أمور</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parents.map((parent) => (
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