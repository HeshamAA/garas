import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { fetchSchools } from '../store/schoolsThunks';
import { GetSchoolsParams } from '../api/schoolsApi';

export const useSchools = (autoFetch = true) => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, isRegistering, filters, pagination, links } = useAppSelector(state => state.schools);
  const [params, setParams] = useState<GetSchoolsParams>({
    page: 1,
    limit: 10,
    sortOrder: 'ASC',
  });

  useEffect(() => {
    if (autoFetch) {
      dispatch(fetchSchools(params));
    }
  }, [dispatch, autoFetch, params]);

  const refetch = (newParams?: GetSchoolsParams) => {
    const updatedParams = { ...params, ...newParams };
    setParams(updatedParams);
    dispatch(fetchSchools(updatedParams));
  };

  const changePage = (page: number) => {
    refetch({ page });
  };

  const search = (keyword: string) => {
    refetch({ keyword, page: 1 });
  };

  const filterByName = (name: string) => {
    refetch({ name, page: 1 });
  };

  const filterByLocation = (location: string) => {
    refetch({ location, page: 1 });
  };

  const sort = (sortBy: string, sortOrder: 'ASC' | 'DESC') => {
    refetch({ sortBy, sortOrder });
  };

  return {
    items,
    isLoading,
    isRegistering,
    error,
    filters,
    pagination,
    links,
    params,
    refetch,
    changePage,
    search,
    filterByName,
    filterByLocation,
    sort,
  };
};