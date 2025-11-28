import { apiClient, handleApiError, handleApiResponse } from './apiClient';

export const passwordApi = {
  forgetPassword: async (email: string): Promise<{ message: string }> => {
    try {
      const payload = { email };
      const response = await apiClient.post<{ message: string }>(
        'https://school.safehandapps.com/api/v1/auth/forget-password',
        payload
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  verifyOtp: async (
    email: string,
    otpCode: string,
    forgetPassword = true
  ): Promise<{ message: string; token?: string }> => {
    try {
      const payload = { email, otpCode, forgetPassword };
      const response = await apiClient.post<{ message: string; token?: string }>(
        'https://school.safehandapps.com/api/v1/auth/verify-otp',
        payload
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  updatePassword: async (
    email: string,
    newPassword: string,
    otpAgin: string
  ): Promise<{ message: string }> => {
    try {
      const payload = { email, newPassword, otpAgin };
      const response = await apiClient.post<{ message: string }>(
        'https://school.safehandapps.com/api/v1/auth/update-password',
        payload
      );
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};
