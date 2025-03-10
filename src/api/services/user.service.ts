
import apiClient from '../apiClient';
import { User, UpdateProfileRequest } from '../models/user.model';
import { PaymentMethod, PaymentMethodRequest } from '../models/payment.model';

const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

const getUserProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>('/users/profile');
  return response.data;
};

const updateUserProfile = async (data: UpdateProfileRequest): Promise<User> => {
  const response = await apiClient.put<User>('/users/profile', data);
  
  // Update user in localStorage
  const currentUser = getCurrentUser();
  if (currentUser) {
    localStorage.setItem('user', JSON.stringify({ ...currentUser, ...response.data }));
  }
  
  return response.data;
};

const uploadProfileImage = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<User>('/users/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  // Update user in localStorage
  const currentUser = getCurrentUser();
  if (currentUser) {
    localStorage.setItem('user', JSON.stringify({ ...currentUser, ...response.data }));
  }
  
  return response.data;
};

const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await apiClient.get<PaymentMethod[]>('/users/payment-methods');
  return response.data;
};

const addPaymentMethod = async (data: PaymentMethodRequest): Promise<PaymentMethod> => {
  const response = await apiClient.post<PaymentMethod>('/users/payment-methods', data);
  return response.data;
};

const deletePaymentMethod = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/payment-methods/${id}`);
};

const setDefaultPaymentMethod = async (id: number): Promise<void> => {
  await apiClient.put(`/users/payment-methods/${id}/default`);
};

export const userService = {
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  uploadProfileImage,
  getPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
};
