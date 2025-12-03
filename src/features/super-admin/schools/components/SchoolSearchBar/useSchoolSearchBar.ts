import { useState, useCallback } from 'react';

export const useSchoolSearchBar = (
  onSearch: (query: string) => void,
  onClear?: () => void
) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  }, [onClear]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return {
    query,
    setQuery,
    handleSearch,
    handleClear,
    handleKeyPress,
  };
};
