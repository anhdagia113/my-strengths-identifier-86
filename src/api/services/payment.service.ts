
import apiClient from '../apiClient';
import { Transaction } from '../models/payment.model';

export const PaymentService = {
  getAllTransactions: async (): Promise<Transaction[]> => {
    const response = await apiClient.get('/api/payments');
    return response.data;
  },

  getTransactionById: async (id: string): Promise<Transaction> => {
    const response = await apiClient.get(`/api/payments/${id}`);
    return response.data;
  },

  createTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    const response = await apiClient.post('/api/payments', transaction);
    return response.data;
  },

  updateTransaction: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    const response = await apiClient.put(`/api/payments/${id}`, transaction);
    return response.data;
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/payments/${id}`);
  },

  exportTransactionsToExcel: async (): Promise<Blob> => {
    const response = await apiClient.get('/api/payments/export/excel', {
      responseType: 'blob'
    });
    return response.data;
  },

  exportTransactionsToCSV: async (): Promise<Blob> => {
    const response = await apiClient.get('/api/payments/export/csv', {
      responseType: 'blob'
    });
    return response.data;
  }
};
