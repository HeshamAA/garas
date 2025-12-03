import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';

/**
 * Base Entity State Interface
 */
export interface BaseEntityState<T, TFilters = { status: string }> {
    items: T[];
    filters: TFilters;
    selectedItem: T | null;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
    isUpdating: boolean;
    isCreating: boolean;
    isDeleting: boolean;
    pagination: PaginationMetadata | null;
    links: PaginationLinks | null;
}

/**
 * Custom reducer type for additional reducers
 */
export type CustomReducers<T, TFilters> = SliceCaseReducers<BaseEntityState<T, TFilters>>;

/**
 * Custom extra reducers builder function type
 */
export type CustomExtraReducers<T, TFilters> = (
    builder: ActionReducerMapBuilder<BaseEntityState<T, TFilters>>
) => void;

/**
 * Entity Slice Configuration
 */
export interface EntitySliceConfig<T, TFilters = { status: string }> {
    name: string;
    initialFilters: TFilters;
    fetchThunk?: ReturnType<typeof createAsyncThunk>;
    createThunk?: ReturnType<typeof createAsyncThunk>;
    updateThunk?: ReturnType<typeof createAsyncThunk>;
    deleteThunk?: ReturnType<typeof createAsyncThunk>;
    additionalReducers?: CustomReducers<T, TFilters>;
    customExtraReducers?: CustomExtraReducers<T, TFilters>;
}

/**
 * Create initial state for entity
 */
export function createInitialEntityState<T, TFilters = { status: string }>(
    initialFilters: TFilters
): BaseEntityState<T, TFilters> {
    return {
        items: [],
        filters: initialFilters,
        selectedItem: null,
        isLoading: false,
        error: null,
        lastFetched: null,
        isUpdating: false,
        isCreating: false,
        isDeleting: false,
        pagination: null,
        links: null,
    };
}

/**
 * Common reducers for entity management
 */
export function createCommonReducers<T, TFilters>() {
    return {
        setFilters: (state: any, action: PayloadAction<TFilters>) => {
            state.filters = action.payload;
        },
        selectItem: (state: any, action: PayloadAction<T | null>) => {
            state.selectedItem = action.payload;
        },
        clearError: (state: any) => {
            state.error = null;
        },
        invalidateCache: (state: any) => {
            state.lastFetched = null;
        },
        resetState: (state: any, action: PayloadAction<TFilters>) => {
            return createInitialEntityState<T, TFilters>(action.payload);
        },
    };
}

/**
 * Add fetch cases to builder
 */
export function addFetchCases<T, TFilters>(
    builder: any,
    fetchThunk: ReturnType<typeof createAsyncThunk>,
    state: BaseEntityState<T, TFilters>
) {
    if (!fetchThunk) return;

    builder
        .addCase(fetchThunk.pending, (state: any) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchThunk.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.items = action.payload.items || action.payload;
            state.pagination = action.payload.metadata || null;
            state.links = action.payload.links || null;
            state.lastFetched = Date.now();
        })
        .addCase(fetchThunk.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to fetch data';
        });
}

/**
 * Add create cases to builder
 */
export function addCreateCases<T, TFilters>(
    builder: any,
    createThunk: ReturnType<typeof createAsyncThunk>
) {
    if (!createThunk) return;

    builder
        .addCase(createThunk.pending, (state: any) => {
            state.isCreating = true;
            state.error = null;
        })
        .addCase(createThunk.fulfilled, (state: any, action: any) => {
            state.isCreating = false;
            state.items.push(action.payload);
        })
        .addCase(createThunk.rejected, (state: any, action: any) => {
            state.isCreating = false;
            state.error = action.payload as string || 'Failed to create item';
        });
}

/**
 * Add update cases to builder
 */
export function addUpdateCases<T extends { id: number | string }, TFilters>(
    builder: any,
    updateThunk: ReturnType<typeof createAsyncThunk>
) {
    if (!updateThunk) return;

    builder
        .addCase(updateThunk.pending, (state: any) => {
            state.isUpdating = true;
            state.error = null;
        })
        .addCase(updateThunk.fulfilled, (state: any, action: any) => {
            state.isUpdating = false;
            const index = state.items.findIndex((item: T) => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        })
        .addCase(updateThunk.rejected, (state: any, action: any) => {
            state.isUpdating = false;
            state.error = action.payload as string || 'Failed to update item';
        });
}

/**
 * Add delete cases to builder
 */
export function addDeleteCases<T extends { id: number | string }, TFilters>(
    builder: any,
    deleteThunk: ReturnType<typeof createAsyncThunk>
) {
    if (!deleteThunk) return;

    builder
        .addCase(deleteThunk.pending, (state: any) => {
            state.isDeleting = true;
            state.error = null;
        })
        .addCase(deleteThunk.fulfilled, (state: any, action: any) => {
            state.isDeleting = false;
            state.items = state.items.filter((item: T) =>
                item.id.toString() !== action.payload.toString()
            );
        })
        .addCase(deleteThunk.rejected, (state: any, action: any) => {
            state.isDeleting = false;
            state.error = action.payload as string || 'Failed to delete item';
        });
}

/**
 * Factory function to create an entity slice
 */
export function createEntitySlice<T extends { id: number | string }, TFilters = { status: string }>(
    config: EntitySliceConfig<T, TFilters>
) {
    const initialState = createInitialEntityState<T, TFilters>(config.initialFilters);
    const commonReducers = createCommonReducers<T, TFilters>();

    // Merge common reducers with additional custom reducers
    const allReducers = {
        ...commonReducers,
        ...(config.additionalReducers || {}),
    };

    const slice = createSlice({
        name: config.name,
        initialState,
        reducers: allReducers,
        extraReducers: (builder) => {
            // Add common CRUD thunk cases
            addFetchCases(builder, config.fetchThunk!, initialState);
            addCreateCases(builder, config.createThunk!);
            addUpdateCases(builder, config.updateThunk!);
            addDeleteCases(builder, config.deleteThunk!);
            
            // Add custom extra reducers if provided
            if (config.customExtraReducers) {
                config.customExtraReducers(builder);
            }
        },
    });

    return slice;
}
