import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  description?: string;
}

export const EmptyState = ({ message, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      <div className="mb-6 text-gray-300">
        <Inbox size={120} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
        {message}
      </h3>
      {description && (
        <p className="text-base md:text-lg text-gray-600 text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
};
