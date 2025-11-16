export type UserRole = 'owner' | 'school' | 'parent' | 'student' | 'deliveryPerson';

export interface ParentProfile {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
}

export interface School {
  id: string;
  name: string;
}

export interface DeliveryPersonProfile {
  id: string;
  name: string;
  phoneNumber: string;
}

export interface User {
  id: string;
  email: string;
  status: string;
  password: string;
  gender: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  role: UserRole;
  schoolId?: string;
  parentId?: string;
  deliveryPersonId?: string;
  studentId?: string;
  whitelistedTokens: string[];
  playerIds: string[];
  notifications: unknown[];
  parentProfile?: ParentProfile;
  studentProfile?: StudentProfile;
  school?: School;
  deliveryPersonProfile?: DeliveryPersonProfile;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  name?: string;
  phone?: string;
  avatar?: string;
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

export interface OwnerRegistrationData {
  name: string;
  phone: string;
  email?: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
}

export interface SchoolRegistrationData {
  ownerName: string;
  phone: string;
  email?: string;
  password: string;
  confirmPassword: string;
  schoolName?: string;
  avatar?: string;
}

export type RegistrationData = OwnerRegistrationData | SchoolRegistrationData;

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