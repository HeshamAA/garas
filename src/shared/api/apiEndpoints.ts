/**
 * Centralized API Endpoints Configuration
 * All API endpoints are defined here to avoid hardcoding URLs across the application
 */
import { API_CONFIG } from './apiConfig';

const BASE_URL = `${API_CONFIG.baseURL}/api/v1`;

export const API_ENDPOINTS = {
    // Authentication
    auth: {
        login: `${BASE_URL}/auth/login`,
        register: `${BASE_URL}/auth/register`,
        logout: `${BASE_URL}/auth/logout`,
        refresh: `${BASE_URL}/auth/refresh`,
    },

    // Password Management
    password: {
        forgot: `${BASE_URL}/auth/forgot-password`,
        reset: `${BASE_URL}/auth/reset-password`,
        change: `${BASE_URL}/auth/change-password`,
    },

    // School Module
    school: {
        students: `${BASE_URL}/student`,
        parents: `${BASE_URL}/user/parents`,
        receivers: `${BASE_URL}/delivery-person`,
        pickupRequests: `${BASE_URL}/pickup-requests`,
        dashboard: `${BASE_URL}/school/dashboard`,
        statistics: `${BASE_URL}/school/statistics`,
    },

    // Super Admin Module
    superAdmin: {
        dashboard: `${BASE_URL}/admin/dashboard`,
        schools: `${BASE_URL}/schools`,
        requests: `${BASE_URL}/admin/requests`,
        statistics: `${BASE_URL}/school/dashboard`,
    },

    // Subscription Module
    subscription: {
        plans: `${BASE_URL}/subscription/plans`,
        subscriptions: `${BASE_URL}/subscriptions`,
        schoolSubscription: `${BASE_URL}/school/subscription`,
    },

    // Notifications
    notifications: `${BASE_URL}/notifications`,

    // User Management
    user: {
        profile: `${BASE_URL}/user/profile`,
        settings: `${BASE_URL}/user/settings`,
    },
} as const;

// Helper function to build endpoint with ID
export const buildEndpoint = (base: string, id: string | number): string => {
    return `${base}/${id}`;
};

// Helper function to build nested endpoint
export const buildNestedEndpoint = (
    base: string,
    parentId: string | number,
    resource: string,
    childId?: string | number
): string => {
    const endpoint = `${base}/${parentId}/${resource}`;
    return childId ? `${endpoint}/${childId}` : endpoint;
};
