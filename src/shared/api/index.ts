export { apiClient, ApiError, handleApiResponse, handleApiError } from './apiClient';
export { API_CONFIG } from './apiConfig';
export { notificationsApi } from './notifications.api';
export { statisticsApi } from './statistics.api';
export { passwordApi } from './password.api';
// Note: school APIs are implemented under feature `src/features/super-admin/schools/api/schoolsApi.ts`.
// Do not export a shared `schoolsApi` here to avoid duplication.
