import { apiClient, USE_MOCK_DATA } from './apiClient.js'
import { mockAdminService } from './mockAdminService.js'

async function executeApiOrMock(apiCall, mockCall) {
  if (USE_MOCK_DATA) {
    return mockCall()
  }
  try {
    return await apiCall()
  } catch (error) {
    // Fallback to mock in development if backend API fails
    if (import.meta.env.DEV) {
      return mockCall()
    }
    throw error
  }
}

export const adminRepository = {
  getDashboard: ({ period = '30d' } = {}) =>
    executeApiOrMock(
      () => apiClient.get(`/admin/dashboard?period=${period}`),
      () => mockAdminService.getDashboard({ period }),
    ),
  approveListing: (id) =>
    executeApiOrMock(
      () => apiClient.post(`/admin/properties/${id}/approve`),
      () => mockAdminService.approveListing(id),
    ),
  rejectListing: (id) =>
    executeApiOrMock(
      () => apiClient.post(`/admin/properties/${id}/reject`),
      () => mockAdminService.rejectListing(id),
    ),
  getUsers: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/users'),
      () => mockAdminService.getUsers(),
    ),
  getUser: (id) =>
    executeApiOrMock(
      () => apiClient.get(`/admin/users/${id}`),
      () => mockAdminService.getUser(id),
    ),
  getProperties: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/properties'),
      () => mockAdminService.getProperties(),
    ),
  getProperty: (id) =>
    executeApiOrMock(
      () => apiClient.get(`/admin/properties/${id}`),
      () => mockAdminService.getProperty(id),
    ),
  getLocations: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/locations'),
      () => mockAdminService.getLocations(),
    ),
  getServices: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/services'),
      () => mockAdminService.getServices(),
    ),
  getPayments: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/payments'),
      () => mockAdminService.getPayments(),
    ),
  getReports: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/reports'),
      () => mockAdminService.getReports(),
    ),
  getCms: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/cms'),
      () => mockAdminService.getCms(),
    ),
  getSupport: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/support'),
      () => mockAdminService.getSupport(),
    ),
  getAdmins: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/admins'),
      () => mockAdminService.getAdmins(),
    ),
  getActivityLogs: () =>
    executeApiOrMock(
      () => apiClient.get('/admin/activity-logs'),
      () => mockAdminService.getActivityLogs(),
    ),
}
