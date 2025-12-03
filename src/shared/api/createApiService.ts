import { AxiosResponse } from 'axios';
import { apiClient } from './apiClient';
import { buildEndpoint } from './apiEndpoints';

/**
 * Generic API Response Types
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success?: boolean;
}

export interface PaginatedApiResponse<T> {
    items: T[];
    metadata: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}

/**
 * Generic Query Parameters
 */
export interface BaseQueryParams {
    keyword?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

/**
 * API Service Configuration
 */
export interface ApiServiceConfig {
    enableCache?: boolean;
    cacheTimeout?: number;
}

/**
 * Generic API Service
 * Provides common CRUD operations for any entity
 */
export class ApiService<
    TEntity,
    TListResponse = PaginatedApiResponse<TEntity>,
    TDetailResponse = ApiResponse<TEntity>,
    TParams extends BaseQueryParams = BaseQueryParams
> {
    constructor(
        private readonly endpoint: string,
        private readonly config?: ApiServiceConfig
    ) { }

    /**
     * Get all entities with optional query parameters
     */
    async getAll(params?: TParams): Promise<TListResponse> {
        const response = await apiClient.get<TListResponse>(this.endpoint, { params });
        return response.data;
    }

    /**
     * Get a single entity by ID
     */
    async getById(id: string | number): Promise<TDetailResponse> {
        const url = buildEndpoint(this.endpoint, id);
        const response = await apiClient.get<TDetailResponse>(url);
        return response.data;
    }

    /**
     * Create a new entity
     */
    async create<TCreateData = Partial<TEntity>>(
        data: TCreateData
    ): Promise<TDetailResponse> {
        const response = await apiClient.post<TDetailResponse>(this.endpoint, data);
        return response.data;
    }

    /**
     * Update an existing entity
     */
    async update<TUpdateData = Partial<TEntity>>(
        id: string | number,
        data: TUpdateData
    ): Promise<TDetailResponse> {
        const url = buildEndpoint(this.endpoint, id);
        const response = await apiClient.put<TDetailResponse>(url, data);
        return response.data;
    }

    /**
     * Partially update an entity
     */
    async patch<TPatchData = Partial<TEntity>>(
        id: string | number,
        data: TPatchData
    ): Promise<TDetailResponse> {
        const url = buildEndpoint(this.endpoint, id);
        const response = await apiClient.patch<TDetailResponse>(url, data);
        return response.data;
    }

    /**
     * Delete an entity
     */
    async delete(id: string | number): Promise<void> {
        const url = buildEndpoint(this.endpoint, id);
        await apiClient.delete(url);
    }

    /**
     * Custom request for specific endpoints
     */
    async customRequest<TResponse = unknown>(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        path: string,
        data?: unknown,
        params?: unknown
    ): Promise<TResponse> {
        const url = `${this.endpoint}${path}`;
        const response = await apiClient.request<TResponse>({
            method,
            url,
            data,
            params,
        });
        return response.data;
    }
}

/**
 * Factory function to create an API service instance
 */
export function createApiService<
    TEntity,
    TListResponse = PaginatedApiResponse<TEntity>,
    TDetailResponse = ApiResponse<TEntity>,
    TParams extends BaseQueryParams = BaseQueryParams
>(
    endpoint: string,
    config?: ApiServiceConfig
): ApiService<TEntity, TListResponse, TDetailResponse, TParams> {
    return new ApiService<TEntity, TListResponse, TDetailResponse, TParams>(
        endpoint,
        config
    );
}
