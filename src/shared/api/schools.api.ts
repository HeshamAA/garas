import { createApiService } from './createApiService';
import { API_ENDPOINTS } from './apiEndpoints';

// Define School type for the API service
interface School {
  id: string | number;
  name: string;
  status: string;
  [key: string]: unknown;
}

// Create base service instance
const baseService = createApiService<School>(API_ENDPOINTS.superAdmin.schools);

// Extend with custom methods
export const schoolsApi = {
  // Expose standard CRUD operations
  getAll: baseService.getAll.bind(baseService),
  getById: baseService.getById.bind(baseService),
  create: baseService.create.bind(baseService),
  update: baseService.update.bind(baseService),
  delete: baseService.delete.bind(baseService),

  /**
   * Toggle activation status for a school (admin)
   * PATCH /api/v1/schools/{id}/status
   */
  toggleStatus: async (id: string | number): Promise<{ message: string; success: boolean }> => {
    return baseService.customRequest<{ message: string; success: boolean }>(
      'PATCH',
      `/${id}/status`
    );
  },
};
