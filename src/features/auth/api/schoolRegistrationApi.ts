import { apiClient, handleApiError } from '@/shared/api/apiClient';

const SCHOOL_REGISTRATION_ENDPOINT = 'https://school.safehandapps.com/api/v1/auth/school/sign-up';

export interface SchoolSignUpData {
  logo?: File | string;
  email: string;
  name: string;
  phoneNumber: string;
  description?: string;
  location?: string;
  stages?: string[];
  password: string;
  playerId: string;
}

export interface SchoolSignUpResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      phoneNumber: string;
      role: string;
      isEmailVerified: boolean;
      status: string;
    };
    accessToken: string;
    token_type: string;
    expires_in: string;
  };
}

export const schoolRegistrationApi = {
  signUp: async (data: SchoolSignUpData): Promise<SchoolSignUpResponse> => {
    try {
      const formData = new FormData();
      
      if (data.logo && data.logo instanceof File) {
        formData.append('logo', data.logo);
      }
      
      formData.append('email', data.email);
      formData.append('name', data.name);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('password', data.password);
      formData.append('playerId', data.playerId);
      
      if (data.description) {
        formData.append('description', data.description);
      }
      
      if (data.location) {
        formData.append('location', data.location);
      }
      
      if (data.stages && data.stages.length > 0) {
        data.stages.forEach((stage) => {
          formData.append('stages[]', stage);
        });
      }

      const response = await apiClient.post<SchoolSignUpResponse>(
        SCHOOL_REGISTRATION_ENDPOINT,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.data.accessToken) {
        localStorage.setItem('authToken', response.data.data.accessToken);
      }

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
