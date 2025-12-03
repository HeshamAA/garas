import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { AsyncThunk } from '@reduxjs/toolkit';

/**
 * Entity Hook Configuration
 */
export interface UseEntityConfig<T, TParams = unknown> {
    // Redux selectors
    selectItems: (state: any) => T[];
    selectIsLoading: (state: any) => boolean;
    selectIsUpdating?: (state: any) => boolean;
    selectIsCreating?: (state: any) => boolean;
    selectIsDeleting?: (state: any) => boolean;
    selectError: (state: any) => string | null;
    selectFilters?: (state: any) => any;
    selectSelectedItem?: (state: any) => T | null;
    selectPagination?: (state: any) => any;

    // Thunks
    fetchThunk: AsyncThunk<any, TParams, any>;
    deleteThunk?: AsyncThunk<any, string | number, any>;
    updateThunk?: AsyncThunk<any, any, any>;
    createThunk?: AsyncThunk<any, any, any>;

    // Actions
    setFiltersAction?: (filters: any) => any;
    selectItemAction?: (item: T | null) => any;
    clearErrorAction?: () => any;
    invalidateCacheAction?: () => any;

    // Options
    autoFetch?: boolean;
    fetchParams?: TParams;
}

/**
 * Entity Hook Return Type
 */
export interface UseEntityReturn<T> {
    items: T[];
    isLoading: boolean;
    isUpdating: boolean;
    isCreating: boolean;
    isDeleting: boolean;
    error: string | null;
    filters?: any;
    selectedItem?: T | null;
    pagination?: any;

    // Actions
    refetch: () => void;
    remove?: (id: string | number) => Promise<{ success: boolean; error?: string }>;
    update?: (id: string | number, data: any) => Promise<{ success: boolean; error?: string }>;
    create?: (data: any) => Promise<{ success: boolean; error?: string }>;
    setFilters?: (filters: any) => void;
    selectItem?: (item: T | null) => void;
    clearError?: () => void;
    invalidateCache?: () => void;
}

/**
 * Generic Entity Hook
 * Provides common functionality for managing entities
 */
export function useEntity<T, TParams = unknown>(
    config: UseEntityConfig<T, TParams>
): UseEntityReturn<T> {
    const dispatch = useAppDispatch();

    // Selectors
    const items = useAppSelector(config.selectItems);
    const isLoading = useAppSelector(config.selectIsLoading);
    const isUpdating = useAppSelector(config.selectIsUpdating || (() => false));
    const isCreating = useAppSelector(config.selectIsCreating || (() => false));
    const isDeleting = useAppSelector(config.selectIsDeleting || (() => false));
    const error = useAppSelector(config.selectError);
    const filters = config.selectFilters ? useAppSelector(config.selectFilters) : undefined;
    const selectedItem = config.selectSelectedItem ? useAppSelector(config.selectSelectedItem) : undefined;
    const pagination = config.selectPagination ? useAppSelector(config.selectPagination) : undefined;

    // Auto-fetch on mount
    useEffect(() => {
        if (config.autoFetch !== false) {
            dispatch(config.fetchThunk(config.fetchParams as any));
        }
    }, [dispatch, config.autoFetch, config.fetchParams]);

    // Refetch
    const refetch = useCallback(() => {
        dispatch(config.fetchThunk(config.fetchParams as any));
    }, [dispatch, config.fetchThunk, config.fetchParams]);

    // Delete
    const remove = config.deleteThunk
        ? useCallback(
            async (id: string | number) => {
                try {
                    await dispatch(config.deleteThunk!(id)).unwrap();
                    return { success: true };
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : 'Failed to delete item';
                    return { success: false, error: message };
                }
            },
            [dispatch, config.deleteThunk]
        )
        : undefined;

    // Update
    const update = config.updateThunk
        ? useCallback(
            async (id: string | number, data: any) => {
                try {
                    await dispatch(config.updateThunk!({ id, ...data })).unwrap();
                    return { success: true };
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : 'Failed to update item';
                    return { success: false, error: message };
                }
            },
            [dispatch, config.updateThunk]
        )
        : undefined;

    // Create
    const create = config.createThunk
        ? useCallback(
            async (data: any) => {
                try {
                    await dispatch(config.createThunk!(data)).unwrap();
                    return { success: true };
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : 'Failed to create item';
                    return { success: false, error: message };
                }
            },
            [dispatch, config.createThunk]
        )
        : undefined;

    // Set filters
    const setFilters = config.setFiltersAction
        ? useCallback(
            (newFilters: any) => {
                dispatch(config.setFiltersAction!(newFilters));
            },
            [dispatch, config.setFiltersAction]
        )
        : undefined;

    // Select item
    const selectItem = config.selectItemAction
        ? useCallback(
            (item: T | null) => {
                dispatch(config.selectItemAction!(item));
            },
            [dispatch, config.selectItemAction]
        )
        : undefined;

    // Clear error
    const clearError = config.clearErrorAction
        ? useCallback(() => {
            dispatch(config.clearErrorAction!());
        }, [dispatch, config.clearErrorAction])
        : undefined;

    // Invalidate cache
    const invalidateCache = config.invalidateCacheAction
        ? useCallback(() => {
            dispatch(config.invalidateCacheAction!());
        }, [dispatch, config.invalidateCacheAction])
        : undefined;

    return {
        items,
        isLoading,
        isUpdating,
        isCreating,
        isDeleting,
        error,
        filters,
        selectedItem,
        pagination,
        refetch,
        remove,
        update,
        create,
        setFilters,
        selectItem,
        clearError,
        invalidateCache,
    };
}
