export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';

export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cash';

export interface SubscriptionPlan {
  id: number;
  name: string;
  description?: string;
  price: string;
  duration: number;
  maxStudents: number;
  maxDeliveryPersons: number;
  features: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionSummary {
  id: number;
  schoolId: number;
  schoolName: string;
  planId: number;
  planName: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  paidAmount: number;
  paymentMethod: PaymentMethod | string;
  autoRenew: boolean;
  createdAt?: string;
}

export interface SubscriptionDetail extends SubscriptionSummary {
  plan?: SubscriptionPlan;
  lastRenewedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface MySubscriptionResponse {
  hasSubscription: boolean;
  subscription: {
    id: number;
    schoolId: number;
    plan: SubscriptionPlan;
    startDate: string;
    endDate: string;
    status: SubscriptionStatus;
    paidAmount: string;
    paymentMethod: PaymentMethod;
    paymentReference?: string;
    autoRenew: boolean;
    createdAt: string;
  } | null;
}

export interface SubscriptionQueryParams {
  status?: SubscriptionStatus;
  schoolId?: number;
  planId?: number;
  keyword?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PlanQueryParams {
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface SubscribePayload {
  planId: number;
  paymentMethod: PaymentMethod;
  autoRenew?: boolean;
}

export interface CreatePlanPayload {
  name: string;
  description?: string;
  price: number;
  duration: number;
  maxStudents: number;
  maxDeliveryPersons: number;
  features: string[];
  isActive: boolean;
}

export interface UpdatePlanPayload extends Partial<CreatePlanPayload> {}

import { PaginationMetadata, PaginationLinks } from '@/shared/types/pagination.types';

export interface NormalizedListResult<T> {
  items: T[];
  metadata: PaginationMetadata | null;
  links: PaginationLinks | null;
}

