import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './apiEndpoints';

// Password API uses direct apiClient since it doesn't follow standard CRUD patterns
// and uses different endpoints for each operation
export const passwordApi = {
  /**
   * Request password reset via email
   */
  forgetPassword: async (email: string): Promise<{ message: string }> => {
    const payload = { email };
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.password.forgot,
      payload
    );
    return response.data;
  },

  /**
   * Verify OTP code for password reset
   */
  verifyOtp: async (
    email: string,
    otpCode: string,
    forgetPassword = true
  ): Promise<{ message: string; token?: string }> => {
    const payload = { email, otpCode, forgetPassword };
    const response = await apiClient.post<{ message: string; token?: string }>(
      API_ENDPOINTS.password.reset,
      payload
    );
    return response.data;
  },

  /**
   * Update password with OTP verification
   */
  updatePassword: async (
    email: string,
    newPassword: string,
    otpAgin: string
  ): Promise<{ message: string }> => {
    const payload = { email, newPassword, otpAgin };
    const response = await apiClient.post<{ message: string }>(
      API_ENDPOINTS.password.change,
      payload
    );
    return response.data;
  },
};
