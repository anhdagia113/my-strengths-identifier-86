
import apiClient from '../apiClient';

/**
 * Service for managing database operations
 */
const DatabaseService = {
  // Category operations
  getServiceCategories: async () => {
    const response = await apiClient.get('/api/categories');
    return response.data;
  },

  createServiceCategory: async (category: { name: string, description: string, icon: string }) => {
    const response = await apiClient.post('/api/categories', category);
    return response.data;
  },

  updateServiceCategory: async (id: string, category: { name: string, description: string, icon: string }) => {
    const response = await apiClient.put(`/api/categories/${id}`, category);
    return response.data;
  },

  deleteServiceCategory: async (id: string) => {
    await apiClient.delete(`/api/categories/${id}`);
  },

  // Service operations
  getServices: async (params?: { categoryId?: string, isActive?: boolean }) => {
    const response = await apiClient.get('/api/services', { params });
    return response.data;
  },

  createService: async (service: { 
    name: string, 
    price: number, 
    description: string, 
    duration: number, 
    categoryId: string,
    image?: string
  }) => {
    const response = await apiClient.post('/api/services', service);
    return response.data;
  },

  updateService: async (id: string, service: { 
    name?: string, 
    price?: number, 
    description?: string, 
    duration?: number, 
    categoryId?: string,
    image?: string,
    isActive?: boolean
  }) => {
    const response = await apiClient.put(`/api/services/${id}`, service);
    return response.data;
  },

  deleteService: async (id: string) => {
    await apiClient.delete(`/api/services/${id}`);
  },

  // Specialist operations
  getSpecialists: async (params?: { isActive?: boolean }) => {
    const response = await apiClient.get('/api/specialists', { params });
    return response.data;
  },

  createSpecialist: async (specialist: {
    name: string,
    role: string,
    experience: string,
    bio: string,
    image?: string
  }) => {
    const response = await apiClient.post('/api/specialists', specialist);
    return response.data;
  },

  updateSpecialist: async (id: string, specialist: {
    name?: string,
    role?: string,
    experience?: string,
    bio?: string,
    image?: string,
    isActive?: boolean
  }) => {
    const response = await apiClient.put(`/api/specialists/${id}`, specialist);
    return response.data;
  },

  deleteSpecialist: async (id: string) => {
    await apiClient.delete(`/api/specialists/${id}`);
  },

  // Schedule operations
  getSchedules: async (params?: { specialistId?: string, date?: string }) => {
    const response = await apiClient.get('/api/schedules', { params });
    return response.data;
  },

  createSchedule: async (schedule: {
    specialistId: string,
    date: string,
    slots: string[]
  }) => {
    const response = await apiClient.post('/api/schedules', schedule);
    return response.data;
  },

  updateSchedule: async (id: string, schedule: {
    slots: string[]
  }) => {
    const response = await apiClient.put(`/api/schedules/${id}`, schedule);
    return response.data;
  },

  deleteSchedule: async (id: string) => {
    await apiClient.delete(`/api/schedules/${id}`);
  },

  // Payment method operations
  getPaymentMethods: async () => {
    const response = await apiClient.get('/api/payment-methods');
    return response.data;
  },

  createPaymentMethod: async (paymentMethod: {
    type: string,
    name: string,
    maskedNumber?: string,
    expiryDate?: string,
    isDefault?: boolean
  }) => {
    const response = await apiClient.post('/api/payment-methods', paymentMethod);
    return response.data;
  },

  updatePaymentMethod: async (id: string, paymentMethod: {
    isDefault?: boolean
  }) => {
    const response = await apiClient.put(`/api/payment-methods/${id}`, paymentMethod);
    return response.data;
  },

  deletePaymentMethod: async (id: string) => {
    await apiClient.delete(`/api/payment-methods/${id}`);
  },

  // Transaction operations
  getTransactions: async (params?: { status?: string, startDate?: string, endDate?: string }) => {
    const response = await apiClient.get('/api/payments', { params });
    return response.data;
  },

  createTransaction: async (transaction: {
    amount: number,
    status: string,
    paymentMethod: string,
    description: string
  }) => {
    const response = await apiClient.post('/api/payments', transaction);
    return response.data;
  },

  updateTransactionStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/api/payments/${id}/status`, { status });
    return response.data;
  },

  // Database management
  seedInitialData: async () => {
    try {
      const response = await apiClient.post('/api/seed');
      return { success: true, message: 'Database seeded successfully', data: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to seed database', error };
    }
  },

  clearAllData: async () => {
    try {
      const response = await apiClient.delete('/api/data');
      return { success: true, message: 'All data cleared successfully', data: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to clear data', error };
    }
  },

  exportData: async () => {
    try {
      const response = await apiClient.get('/api/data/export');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to export data', error };
    }
  },

  importData: async (data: any) => {
    try {
      const response = await apiClient.post('/api/data/import', data);
      return { success: true, message: 'Data imported successfully', data: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to import data', error };
    }
  }
};

export default DatabaseService;
