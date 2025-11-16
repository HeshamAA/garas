import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { 
  searchSchools 
} from '../store/schoolsThunks';
import { 
  setSearchQuery,
  clearSearchResults 
} from '../store/schoolsSlice';
import { SearchSchoolsRequest } from '../types/school.types';

export const useSchoolSearch = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector(state => state.schools.searchResults);
  const searchQuery = useAppSelector(state => state.schools.searchQuery);
  const isSearching = useAppSelector(state => state.schools.isSearching);
  const error = useAppSelector(state => state.schools.error);
  const search = async (searchParams: SearchSchoolsRequest) => {
    try {
      dispatch(setSearchQuery(searchParams.query));
      await dispatch(searchSchools(searchParams)).unwrap();
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