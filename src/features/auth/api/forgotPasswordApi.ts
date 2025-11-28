import { apiClient, handleApiError } from '@/shared/api/apiClient';

const FORGOT_PASSWORD_ENDPOINTS = {
  FORGET_PASSWORD: 'https://school.safehandapps.com/api/v1/auth/forget-password',
  VERIFY_OTP: 'https://school.safehandapps.com/api/v1/auth/verify-otp',
  UPDATE_PASSWORD: 'https://school.safehandapps.com/api/v1/auth/update-password',
} as const;

export interface ForgetPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otpCode: string;
  forgetPassword: boolean;
}

export interface UpdatePasswordRequest {
  email: string;
  newPassword: string;
  otpAgin: string;
}

export const forgotPasswordApi = {
  forgetPassword: async (data: ForgetPasswordRequest): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>(
        FORGOT_PASSWORD_ENDPOINTS.FORGET_PASSWORD,
        data
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>(
        FORGOT_PASSWORD_ENDPOINTS.VERIFY_OTP,
        data
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  updatePassword: async (data: UpdatePasswordRequest): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>(
        FORGOT_PASSWORD_ENDPOINTS.UPDATE_PASSWORD,
        data
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
