import { useState, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

export const useSearchBar = (
  value: string,
  onChange: (value: string) => void,
  debounceMs: number = 300
) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceMs);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return {
    localValue,
    setLocalValue,
  };
};
