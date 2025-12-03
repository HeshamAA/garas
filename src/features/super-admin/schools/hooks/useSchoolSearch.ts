import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { 
  fetchSchools 
} from '../store/schoolsThunks';
import { 
  setSearchQuery,
  clearSearchResults 
} from '../store/schoolsSlice';

export const useSchoolSearch = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(state => state.schools.items);
  const searchQuery = useAppSelector(state => state.schools.searchQuery);
  const isSearching = useAppSelector(state => state.schools.isLoading);
  const error = useAppSelector(state => state.schools.error);
  
  const search = async (query: string) => {
    try {
      dispatch(setSearchQuery(query));
      await dispatch(fetchSchools({ keyword: query })).unwrap();
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to search schools';
      return { success: false, error: message };
    }
  };

  const clearSearch = () => {
    dispatch(clearSearchResults());
  };

  return {
    searchResults,
    searchQuery,
    isSearching,
    error,
    search,
    clearSearch,
  };
};