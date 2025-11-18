import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import {
  LoginCredentials,
  RegistrationData,
  LoginResponse,
  RegistrationResponse,
} from '../types/auth.types';
import { formatError } from '@/shared/constants/errorMessages';

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error: unknown) {
      const errorMessage = formatError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk<
  RegistrationResponse,
  { data: RegistrationData; accountType: 'super_admin' | 'school' },
  { rejectValue: string }
>(
  'auth/registerUser',
  async ({ data, accountType }, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data, accountType);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error: unknown) {
      const errorMessage = formatError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error: unknown) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      const errorMessage = formatError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const restoreSession = () => {
  const token = localStorage.getItem('authToken');
  const userStr = localStorage.getItem('user');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      return { user, token };
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return null;
    }
  }

  return null;
};