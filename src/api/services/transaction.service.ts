
import apiClient from '../apiClient';

export interface Transaction {
  id: number;
  transactionId: string;
  amount: number;
  paymentDate: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  paymentMethod: string;
  description: string;
  userId?: number;
}

const TransactionService = {
  // Admin endpoints
  getAllTransactions: async (): Promise<Transaction[]> => {
    const response = await apiClient.get('/api/payments');
    return response.data;
  },

  getTransactionById: async (id: number): Promise<Transaction> => {
    const response = await apiClient.get(`/api/payments/${id}`);
    return response.data;
  },

  getTransactionsByStatus: async (status: string): Promise<Transaction[]> => {
    const response = await apiClient.get(`/api/payments/by-status/${status}`);
    return response.data;
  },

  getTransactionsByDateRange: async (startDate: Date, endDate: Date): Promise<Transaction[]> => {
    const response = await apiClient.get('/api/payments/by-date-range', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
    return response.data;
  },
  
  updateTransactionStatus: async (id: number, status: string): Promise<Transaction> => {
    const response = await apiClient.put(`/api/payments/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },
  
  // User endpoints
  getUserTransactions: async (): Promise<Transaction[]> => {
    const response = await apiClient.get('/api/payments/user');
    return response.data;
  },
  
  getUserTransactionsByStatus: async (status: string): Promise<Transaction[]> => {
    const response = await apiClient.get(`/api/payments/user/by-status/${status}`);
    return response.data;
  },
  
  getUserTransactionsByDateRange: async (startDate: Date, endDate: Date): Promise<Transaction[]> => {
    const response = await apiClient.get('/api/payments/user/by-date-range', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
    return response.data;
  },
  
  createTransaction: async (transaction: Omit<Transaction, 'id' | 'transactionId' | 'paymentDate'>): Promise<Transaction> => {
    const response = await apiClient.post('/api/payments/user', transaction);
    return response.data;
  }
};

export default TransactionService;
