import { apiClient, handleApiResponse, handleApiError } from '@/shared/api/apiClient';
import {
  LoginCredentials,
  RegistrationData,
  LoginResponse,
  RegistrationResponse,
  User,
} from '../types/auth.types';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/get-me',
  REFRESH: '/auth/refresh',
} as const;

export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const loginPayload = {
        identifier: credentials.identifier,
        password: credentials.password,
        playerId: credentials.playerId || 'a',
      };
      const response = await apiClient.post<{ 
        success: boolean;
        message: string;
        data: { 
          isEmailVerified: boolean;
          email: string;
          role: string;
          accessToken: string;
          token_type: string;
          expires_in: string;
        }
      }>(
        AUTH_ENDPOINTS.LOGIN, 
        loginPayload
      );
      const { accessToken, role, email, isEmailVerified } = response.data.data;
      const loginMessage = response.data.message;
      localStorage.setItem('authToken', accessToken);
      const normalizedRole = role.toLowerCase() as 'owner' | 'school' | 'parent' | 'student' | 'deliveryPerson';
      const user: User = {
        id: '',
        email,
        role: normalizedRole,
        isEmailVerified,
        status: 'active',
        password: '',
        gender: '',
        phoneNumber: '',
        whitelistedTokens: [],
        playerIds: [],
        notifications: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      try {
        const userResponse = await apiClient.get<{ data: User; message: string }>(AUTH_ENDPOINTS.ME);
        const fullUser = userResponse.data.data;
        return {
          user: fullUser,
          token: accessToken,
          message: loginMessage || 'تم تسجيل الدخول بنجاح',
        };
      } catch (getMeError) {
        return {
          user,
          token: accessToken,
          message: loginMessage || 'تم تسجيل الدخول بنجاح',
        };
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      return handleApiError(error);
    }
  },

  /**
   * Register user
   */
  register: async (
    data: RegistrationData,
    accountType: 'owner' | 'school'
  ): Promise<RegistrationResponse> => {
    try {
      const response = await apiClient.post<{ data: RegistrationResponse; message: string }>(
        AUTH_ENDPOINTS.REGISTER,
        { ...data, accountType }
      );
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<{ data: User; message: string }>(AUTH_ENDPOINTS.ME);
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    try {
      const response = await apiClient.post<{ data: { token: string }; message: string }>(
        AUTH_ENDPOINTS.REFRESH
      );
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};