import { apiClient } from '@/shared/api/apiClient';
import { API_CONFIG } from '@/shared/api/apiConfig';
import { PaginationLinks, PaginationMetadata } from '@/shared/types/pagination.types';
import {
  CreatePlanPayload,
  NormalizedListResult,
  PlanQueryParams,
  SubscribePayload,
  SubscriptionDetail,
  SubscriptionPlan,
  SubscriptionQueryParams,
  UpdatePlanPayload,
} from '../types/subscription.types';

const BASE_URL = `${API_CONFIG.baseURL}/api/v1/subscription`;

const ENDPOINTS = {
  subscriptions: `${BASE_URL}/subscriptions`,
  subscriptionById: (id: number | string) => `${BASE_URL}/subscriptions/${id}`,
  cancelSubscription: (id: number | string) => `${BASE_URL}/subscriptions/${id}/cancel`,
  subscribe: `${BASE_URL}/subscribe`,
  plans: `${BASE_URL}/plans`,
  mySubscription: `${BASE_URL}/my-subscription`,
} as const;

type ListResponse<T> = {
  items?: T[];
  data?: T[] | ListResponse<T> | null;
  metadata?: PaginationMetadata;
  meta?: PaginationMetadata;
  links?: PaginationLinks;
  [key: string]: unknown;
};

const extractItems = <T>(source: unknown): T[] => {
  if (!source) return [];
  if (Array.isArray(source)) return source;
  if (typeof source === 'object') {
    const container = source as ListResponse<T>;
    if (Array.isArray(container.items)) return container.items;
    if (Array.isArray(container.data)) return container.data;
    if (container.data && typeof container.data === 'object') {
      return extractItems<T>(container.data);
    }
  }
  return [];
};

const extractMetadata = (source: unknown): PaginationMetadata | null => {
  if (!source || Array.isArray(source)) return null;
  if (typeof source === 'object') {
    const container = source as ListResponse<unknown>;
    return container.metadata ?? container.meta ?? extractMetadata(container.data ?? null);
  }
  return null;
};

const extractLinks = (source: unknown): PaginationLinks | null => {
  if (!source || Array.isArray(source)) return null;
  if (typeof source === 'object') {
    const container = source as ListResponse<unknown>;
    return container.links ?? extractLinks(container.data ?? null);
  }
  return null;
};

const normalizeListResponse = <T>(payload: unknown): NormalizedListResult<T> => {
  return {
    items: extractItems<T>(payload),
    metadata: extractMetadata(payload),
    links: extractLinks(payload),
  };
};

const extractEntity = <T>(payload: unknown): T => {
  if (payload === null || payload === undefined) {
    throw new Error('EMPTY_RESPONSE');
  }

  if (typeof payload === 'object') {
    const container = payload as { data?: unknown };
    if ('data' in container) {
      return extractEntity<T>(container.data);
    }
  }

  return payload as T;
};

export const subscriptionApi = {
  async getSubscriptions(params?: SubscriptionQueryParams): Promise<NormalizedListResult<SubscriptionDetail>> {
    const response = await apiClient.get(ENDPOINTS.subscriptions, {
      params,
    });

    return normalizeListResponse(response.data);
  },

  async getSubscriptionById(id: number | string): Promise<SubscriptionDetail> {
    const response = await apiClient.get(ENDPOINTS.subscriptionById(id));
    return extractEntity<SubscriptionDetail>(response.data);
  },

  async cancelSubscription(id: number | string): Promise<{ message: string }> {
    const response = await apiClient.patch<{ message: string }>(ENDPOINTS.cancelSubscription(id));
    return response.data;
  },

  async subscribe(payload: SubscribePayload): Promise<SubscriptionDetail> {
    const response = await apiClient.post(ENDPOINTS.subscribe, payload);
    return extractEntity<SubscriptionDetail>(response.data);
  },

  async getPlans(params?: PlanQueryParams): Promise<NormalizedListResult<SubscriptionPlan>> {
    const response = await apiClient.get(ENDPOINTS.plans, {
      params,
    });

    return normalizeListResponse(response.data);
  },

  async createPlan(payload: CreatePlanPayload): Promise<SubscriptionPlan> {
    const response = await apiClient.post(ENDPOINTS.plans, payload);
    return extractEntity<SubscriptionPlan>(response.data);
  },

  async getPlanById(id: number | string): Promise<SubscriptionPlan> {
    const response = await apiClient.get(`${ENDPOINTS.plans}/${id}`);
    return extractEntity<SubscriptionPlan>(response.data);
  },

  async updatePlan(id: number | string, payload: UpdatePlanPayload): Promise<SubscriptionPlan> {
    const response = await apiClient.patch(`${ENDPOINTS.plans}/${id}`, payload);
    return extractEntity<SubscriptionPlan>(response.data);
  },

  async deletePlan(id: number | string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(`${ENDPOINTS.plans}/${id}`);
    return response.data;
  },

  async getMySubscription(): Promise<SubscriptionDetail | null> {
    const response = await apiClient.get(ENDPOINTS.mySubscription);

    const data = response.data?.data || response.data;
    
    if (!data || !data.hasSubscription || !data.subscription) {
      return null;
    }

    const sub = data.subscription;
    
    return {
      id: sub.id,
      schoolId: sub.schoolId,
      schoolName: '',
      planId: sub.plan.id,
      planName: sub.plan.name,
      status: sub.status,
      startDate: sub.startDate,
      endDate: sub.endDate,
      paidAmount: parseFloat(sub.paidAmount),
      paymentMethod: sub.paymentMethod,
      autoRenew: sub.autoRenew,
      createdAt: sub.createdAt,
      plan: sub.plan,
    };
  },
};

