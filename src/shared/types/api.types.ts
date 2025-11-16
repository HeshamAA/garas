export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: FieldValidationError[];
  timestamp?: string;
}

export interface FieldValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchRequest extends PaginatedRequest {
  query: string;
  filters?: Record<string, unknown>;
}

export interface FilteredRequest extends PaginatedRequest {
  filters: Record<string, unknown>;
}

export interface BulkOperationRequest<T = string> {
  ids: T[];
  action: string;
  data?: Record<string, unknown>;
}

export interface BulkOperationResponse {
  success: number;
  failed: number;
  errors?: Array<{
    id: string;
    error: string;
  }>;
}

export interface FileUploadRequest {
  file: File;
  metadata?: Record<string, unknown>;
}

export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface StatusUpdateRequest {
  status: string;
  reason?: string;
}

export type CreateRequest<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateRequest<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

export interface DeleteResponse {
  id: string;
  deleted: boolean;
  message?: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version?: string;
  services?: Record<string, 'up' | 'down'>;
}