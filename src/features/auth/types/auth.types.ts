export type UserRole = 'super_admin' | 'school';

export interface School {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  isEmailVerified: boolean;
  schoolId?: string;
  school?: School;
  whitelistedTokens: string[];
  playerIds: string[];
  notifications: unknown[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  phone?: string;
  avatar?: string;
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isRegistering: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
  playerId?: string;
}

export interface SuperAdminRegistrationData {
  name: string;
  phone: string;
  email?: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
}

export interface SchoolRegistrationData {
  name: string;
  phone: string;
  email?: string;
  password: string;
  confirmPassword: string;
  schoolName: string;
  avatar?: string;
}

export type RegistrationData = SuperAdminRegistrationData | SchoolRegistrationData;

export interface LoginResponse {
  user: User;
  token: string;
  message?: string;
}

export interface RegistrationResponse {
  user: User;
  token: string;
  message?: string;
}

export interface AuthErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
}

// Forget Password Types
export interface ForgetPasswordRequest {
  email: string;
}

export interface ForgetPasswordResponse {
  message: string;
  success: boolean;
}

export interface VerifyOtpRequest {
  email: string;
  otpCode: string;
  forgetPassword: boolean;
}

export interface VerifyOtpResponse {
  message: string;
  success: boolean;
}

export interface UpdatePasswordRequest {
  email: string;
  password: string;
  otpValue: string;
}

export interface UpdatePasswordResponse {
  message: string;
  success: boolean;
}