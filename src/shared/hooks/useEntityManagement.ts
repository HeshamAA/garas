import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { AsyncThunk } from '@reduxjs/toolkit';
import { BaseQueryParams } from '@/shared/api/createApiService';
import { BaseEntityState } from '@/shared/store/createEntitySlice';

/**
 * Configuration for useEntityManagement hook
 */
export interface EntityManagementConfig<
  TEntity,
  TParams extends BaseQueryParams,
  TFilters
> {
  /** Redux state selector function */
  selectState: (state: any) => BaseEntityState<TEntity, TFilters>;
  
  /** Fetch thunk for loading entities */
  fetchThunk: AsyncThunk<any, TParams | undefined, any>;
  
  /** Optional create thunk */
  createThunk?: AsyncThunk<any, any, any>;
  
  /** Optional update thunk */
  updateThunk?: AsyncThunk<any, any, any>;
  
  /** Optional delete thunk */
  deleteThunk?: AsyncThunk<any, string | number, any>;
  
  /** Initial query parameters */
  initialParams?: Partial<TParams>;
  
  /** Auto-fetch on mount (default: true) */
  autoFetch?: boolean;
  
  /** Cache timeout in milliseconds (default: 5 minutes) */
  cacheTimeout?: number;
}

/**
 * Return type for useEntityManagement hook
 */
export interface EntityManagementReturn<TEntity, TParams extends BaseQueryParams> {
  // Data
  items: TEntity[];
  selectedItem: TEntity | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  pagination: any;
  links: any;
  
  // Query params
  params: TParams;
  setParams: (params: TParams | ((prev: TParams) => TParams)) => void;
  updateParams: (updates: Partial<TParams>) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e?: React.FormEvent) => void;
  
  // Pagination
  currentPage: number;
  handlePageChange: (page: number) => void;
  
  // Sorting
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  setSortBy: (field: string) => void;
  setSortOrder: (order: 'ASC' | 'DESC') => void;
  toggleSortOrder: () => void;
  
  // CRUD operations
  fetch: (params?: TParams) => Promise<any>;
  create?: (data: any) => Promise<any>;
  update?: (id: string | number, data: any) => Promise<any>;
  remove?: (id: string | number) => Promise<any>;
  
  // Utilities
  refresh: () => void;
  clearError: () => void;
  isCacheValid: boolean;
}

/**
 * Generic hook for entity management with CRUD operations
 * 
 * @example
 * ```typescript
 * const {
 *   items: students,
 *   isLoading,
 *   params,
 *   updateParams,
 *   handlePageChange,
 *   refresh
 * } = useEntityManagement({
 *   selectState: (state) => state.students,
 *   fetchThunk: fetchStudents,
 *   deleteThunk: deleteStudent,
 *   initialParams: { page: 1, limit: 10 }
 * });
 * ```
 */
export function useEntityManagement<
  TEntity extends { id: string | number },
  TParams extends BaseQueryParams = BaseQueryParams,
  TFilters = any
>(
  config: EntityManagementConfig<TEntity, TParams, TFilters>
): EntityManagementReturn<TEntity, TParams> {
  const {
    selectState,
    fetchThunk,
    createThunk,
    updateThunk,
    deleteThunk,
    initialParams = {} as Partial<TParams>,
    autoFetch = true,
    cacheTimeout = 5 * 60 * 1000, // 5 minutes default
  } = config;

  const dispatch = useAppDispatch();
  const state = useAppSelector(selectState);
  
  const {
    items,
    selectedItem,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    pagination,
    links,
    lastFetched,
  } = state;

  // Query parameters state
  const [params, setParams] = useState<TParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
    ...initialParams,
  } as TParams);

  // Search state
  const [searchQuery, setSearchQuery] = useState(
    (initialParams.keyword as string) || ''
  );

  // Check if cache is valid
  const isCacheValid = useMemo(() => {
    if (!lastFetched) return false;
    return Date.now() - lastFetched < cacheTimeout;
  }, [lastFetched, cacheTimeout]);

  // Fetch entities
  const fetch = useCallback(
    async (fetchParams?: TParams) => {
      const paramsToUse = fetchParams || params;
      return dispatch(fetchThunk(paramsToUse as any)).unwrap();
    },
    [dispatch, fetchThunk, params]
  );

  // Create entity
  const create = useMemo(() => {
    if (!createThunk) return undefined;
    return async (data: any) => {
      return dispatch(createThunk(data)).unwrap();
    };
  }, [dispatch, createThunk]);

  // Update entity
  const update = useMemo(() => {
    if (!updateThunk) return undefined;
    return async (id: string | number, data: any) => {
      return dispatch(updateThunk({ id, ...data })).unwrap();
    };
  }, [dispatch, updateThunk]);

  // Delete entity
  const remove = useMemo(() => {
    if (!deleteThunk) return undefined;
    return async (id: string | number) => {
      return dispatch(deleteThunk(id)).unwrap();
    };
  }, [dispatch, deleteThunk]);

  // Update params helper
  const updateParams = useCallback((updates: Partial<TParams>) => {
    setParams((prev) => ({ ...prev, ...updates, page: 1 }));
  }, []);

  // Search handler
  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      updateParams({ keyword: searchQuery } as Partial<TParams>);
    },
    [searchQuery, updateParams]
  );

  // Pagination handler
  const handlePageChange = useCallback(
    (page: number) => {
      setParams((prev) => ({ ...prev, page }));
    },
    []
  );

  // Sorting helpers
  const sortBy = (params.sortBy as string) || '';
  const sortOrder = params.sortOrder || 'ASC';

  const setSortBy = useCallback((field: string) => {
    setParams((prev) => ({ ...prev, sortBy: field, page: 1 } as TParams));
  }, []);

  const setSortOrder = useCallback((order: 'ASC' | 'DESC') => {
    setParams((prev) => ({ ...prev, sortOrder: order, page: 1 }));
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
  }, [sortOrder, setSortOrder]);

  // Refresh data
  const refresh = useCallback(() => {
    fetch(params);
  }, [fetch, params]);

  // Clear error (if needed, would require a clearError action in slice)
  const clearError = useCallback(() => {
    // This would need to be implemented in the slice
    // For now, it's a placeholder
  }, []);

  // Auto-fetch on mount and when params change
  useEffect(() => {
    if (autoFetch) {
      // Only fetch if cache is invalid or it's the first load
      if (!isCacheValid || !lastFetched) {
        fetch(params);
      }
    }
  }, [
    params.page,
    params.limit,
    params.keyword,
    params.sortBy,
    params.sortOrder,
    // Note: We intentionally don't include all params to avoid over-fetching
    // Features can add their own useEffect for custom params
  ]);

  return {
    // Data
    items,
    selectedItem,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    pagination,
    links,
    
    // Query params
    params,
    setParams,
    updateParams,
    
    // Search
    searchQuery,
    setSearchQuery,
    handleSearch,
    
    // Pagination
    currentPage: params.page || 1,
    handlePageChange,
    
    // Sorting
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    toggleSortOrder,
    
    // CRUD operations
    fetch,
    create,
    update,
    remove,
    
    // Utilities
    refresh,
    clearError,
    isCacheValid,
  };
}
