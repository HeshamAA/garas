import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from './apiConfig';
import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';

export class ApiError extends Error {
  constructor(
    public message: string,
    public code?: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RetryConfig extends AxiosRequestConfig {
  _retry?: number;
  _retryDelay?: number;
}

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: API_CONFIG.headers,
  });

  /**
   * Request interceptor
   * Add authentication token and other headers
   */
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['X-Request-Time'] = new Date().toISOString();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor
   * Handle errors and implement retry logic
   */
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const config = error.config as RetryConfig;
      if (!error.response) {
        throw new ApiError(
          ERROR_MESSAGES.NETWORK_ERROR,
          'NETWORK_ERROR',
          0
        );
      }

      const { status, data } = error.response;
      if (!config._retry) {
        config._retry = 0;
      }
      const shouldRetry =
        config._retry < API_CONFIG.retry.maxRetries &&
        API_CONFIG.retry.retryableStatuses.includes(status as 408 | 429 | 500 | 502 | 503 | 504);

      if (shouldRetry) {
        config._retry += 1;
        const delay = config._retryDelay || API_CONFIG.retry.retryDelay;
        config._retryDelay = delay * 2;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return client(config);
      }
      switch (status) {
        case 401: {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          throw new ApiError(
            ERROR_MESSAGES.UNAUTHORIZED,
            'UNAUTHORIZED',
            401,
            data
          );
        }

        case 403:
          throw new ApiError(
            ERROR_MESSAGES.FORBIDDEN,
            'FORBIDDEN',
            403,
            data
          );

        case 404:
          throw new ApiError(
            ERROR_MESSAGES.NOT_FOUND,
            'NOT_FOUND',
            404,
            data
          );

        case 422:
          throw new ApiError(
            ERROR_MESSAGES.VALIDATION_ERROR,
            'VALIDATION_ERROR',
            422,
            data
          );

        case 429:
          throw new ApiError(
            ERROR_MESSAGES.RATE_LIMIT,
            'RATE_LIMIT',
            429,
            data
          );

        case 500:
        case 502:
        case 503:
        case 504:
          throw new ApiError(
            ERROR_MESSAGES.SERVER_ERROR,
            'SERVER_ERROR',
            status,
            data
          );

        default: {
          const errorMessage = (data as Record<string, unknown>)?.message as string;
          throw new ApiError(
            errorMessage || ERROR_MESSAGES.UNKNOWN_ERROR,
            'UNKNOWN_ERROR',
            status,
            data
          );
        }
      }
    }
  );

  return client;
};

export const apiClient = createApiClient();

export const handleApiResponse = <T>(response: AxiosResponse<T>): T => {
   console.log(response.data)
  return response.data;
};

export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiError) {
    throw error;
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      throw new ApiError(
        ERROR_MESSAGES.NETWORK_ERROR,
        'NETWORK_ERROR',
        0
      );
    }

    throw new ApiError(
      error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      'AXIOS_ERROR',
      error.response?.status
    );
  }
  if (error instanceof Error) {
    throw new ApiError(
      error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      'UNKNOWN_ERROR'
    );
  }

  throw new ApiError(
    ERROR_MESSAGES.UNKNOWN_ERROR,
    'UNKNOWN_ERROR'
  );
};