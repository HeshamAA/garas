import { apiClient, handleApiError } from '@/shared/api/apiClient';
import {
  LoginCredentials,
  RegistrationData,
  LoginResponse,
  RegistrationResponse,
  User,
} from '../types/auth.types';

const AUTH_ENDPOINTS = {
  LOGIN: 'https://school.safehandapps.com/api/v1/auth/login',
  REGISTER: 'https://school.safehandapps.com/api/v1/auth/register',
  LOGOUT: 'https://school.safehandapps.com/api/v1/auth/logout',
  ME: 'https://school.safehandapps.com/api/v1/auth/get-me',
  REFRESH: 'https://school.safehandapps.com/api/v1/auth/refresh',
} as const;

export const authApi = {
  
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
      const normalizedRole = role.toLowerCase() as 'super_admin' | 'school';
      const user: User = {
        id: '',
        email,
        name: '',
        phoneNumber: '',
        role: normalizedRole,
        isEmailVerified,
        status: 'active',
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

  register: async (
    data: RegistrationData,
    accountType: 'super_admin' | 'school'
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

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      return handleApiError(error);
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<{ data: User; message: string }>(AUTH_ENDPOINTS.ME);
      return response.data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

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