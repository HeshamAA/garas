export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://school.safehandapps.com/api',
  timeout: 30000,
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
    retryableStatuses: [408, 429, 500, 502, 503, 504],
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  students: {
    base: '/students',
    byId: (id: string) => `/students/${id}`,
    updateStatus: (id: string) => `/students/${id}/status`,
  },
  parents: {
    base: '/parents',
    byId: (id: string) => `/parents/${id}`,
  },
  receivers: {
    base: '/receivers',
    byId: (id: string) => `/receivers/${id}`,
    trusted: '/receivers/trusted',
    approve: (id: string) => `/receivers/${id}/approve`,
    reject: (id: string) => `/receivers/${id}/reject`,
  },
  requests: {
    base: '/requests',
    byId: (id: string) => `/requests/${id}`,
    user: '/requests/user',
    school: '/requests/school',
    approve: (id: string) => `/requests/${id}/approve`,
    reject: (id: string) => `/requests/${id}/reject`,
    complete: (id: string) => `/requests/${id}/complete`,
  },
  schools: {
    base: '/schools',
    byId: (id: string) => `/schools/${id}`,
    search: '/schools/search',
    register: '/schools/register',
  },
  profile: {
    user: '/profile/user',
    school: '/profile/school',
    update: '/profile/update',
  },
} as const;