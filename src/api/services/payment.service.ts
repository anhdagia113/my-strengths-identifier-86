
import apiClient from '../apiClient';
import { PaymentMethod, PaymentMethodRequest, Transaction, CreateTransactionRequest } from '../models/payment.model';

const PaymentService = {
  // Payment methods
  getUserPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const response = await apiClient.get('/api/payment-methods');
    return response.data;
  },

  getPaymentMethodById: async (id: string): Promise<PaymentMethod> => {
    const response = await apiClient.get(`/api/payment-methods/${id}`);
    return response.data;
  },

  createPaymentMethod: async (paymentMethod: PaymentMethodRequest): Promise<PaymentMethod> => {
    const response = await apiClient.post('/api/payment-methods', paymentMethod);
    return response.data;
  },

  updatePaymentMethod: async (id: string, paymentMethod: Partial<PaymentMethodRequest>): Promise<PaymentMethod> => {
    const response = await apiClient.put(`/api/payment-methods/${id}`, paymentMethod);
    return response.data;
  },

  deletePaymentMethod: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/payment-methods/${id}`);
  },

  setDefaultPaymentMethod: async (id: string): Promise<PaymentMethod> => {
    const response = await apiClient.put(`/api/payment-methods/${id}/default`);
    return response.data;
  },

  // Payments/Transactions
  createTransaction: async (transaction: CreateTransactionRequest): Promise<Transaction> => {
    const response = await apiClient.post('/api/payments/user', transaction);
    return response.data;
  },

  getUserWalletBalance: async (): Promise<number> => {
    const response = await apiClient.get('/api/wallet/balance');
    return response.data.balance;
  },

  depositToWallet: async (amount: number, paymentMethodId: string): Promise<Transaction> => {
    const response = await apiClient.post('/api/wallet/deposit', { 
      amount, 
      paymentMethodId 
    });
    return response.data;
  },

  withdrawFromWallet: async (amount: number, paymentMethodId: string): Promise<Transaction> => {
    const response = await apiClient.post('/api/wallet/withdraw', { 
      amount, 
      paymentMethodId 
    });
    return response.data;
  }
};

export default PaymentService;
