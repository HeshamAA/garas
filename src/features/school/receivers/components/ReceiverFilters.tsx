import { Button } from "@/components/ui/button";
import { ReceiverFilters as ReceiverFiltersType } from "../types/receiver.types";

interface ReceiverFiltersProps {
  filters: ReceiverFiltersType;
  onFilterChange: (filters: ReceiverFiltersType) => void;
}

const ReceiverFilters = ({ filters, onFilterChange }: ReceiverFiltersProps) => {
  const filterOptions = [
    { label: "الكل", value: "all" as const },
    { label: "نشط", value: "active" as const },
    { label: "غير نشط", value: "inactive" as const },
  ];

  const handleStatusChange = (status: 'all' | 'active' | 'inactive') => {
    onFilterChange({ ...filters, status });
  };

  return (
    <div className="flex gap-3 justify-center mb-8">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={filters.status === option.value ? "default" : "outline"}
          className="rounded-full px-8 py-5 text-base"
          onClick={() => handleStatusChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ReceiverFilters;