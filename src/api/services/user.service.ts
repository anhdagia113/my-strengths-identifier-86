
import { User, UserProfile, UserProfileUpdate } from '../models/user.model';
import { apiClient } from '../apiClient';
import { PaymentMethod, PaymentMethodRequest, Transaction } from '../models/payment.model';

// User profile operations
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};

export const updateUserProfile = async (data: UserProfileUpdate): Promise<UserProfile> => {
  const response = await apiClient.put('/api/users/me', data);
  return response.data;
};

export const uploadProfileImage = async (file: File): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post('/api/users/me/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const deleteProfileImage = async (): Promise<void> => {
  await apiClient.delete('/api/users/me/image');
};

// Payment methods
export const getUserPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await apiClient.get('/api/users/me/payment-methods');
  return response.data;
};

export const addPaymentMethod = async (data: PaymentMethodRequest): Promise<PaymentMethod> => {
  const response = await apiClient.post('/api/users/me/payment-methods', data);
  return response.data;
};

export const setDefaultPaymentMethod = async (id: string): Promise<void> => {
  await apiClient.put(`/api/users/me/payment-methods/${id}/default`);
};

export const deletePaymentMethod = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/users/me/payment-methods/${id}`);
};

// Transactions
export const getUserTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get('/api/users/me/transactions');
  return response.data;
};

// Balance operations
export const getUserBalance = async (): Promise<{ balance: number }> => {
  const response = await apiClient.get('/api/users/me/balance');
  return response.data;
};

export const depositFunds = async (amount: number): Promise<{ balance: number }> => {
  const response = await apiClient.post('/api/users/me/balance/deposit', { amount });
  return response.data;
};

export const withdrawFunds = async (amount: number): Promise<{ balance: number }> => {
  const response = await apiClient.post('/api/users/me/balance/withdraw', { amount });
  return response.data;
};
