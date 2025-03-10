
import apiClient from '../apiClient';
import { LoginRequest, LoginResponse, RegisterRequest, User, ChangePasswordRequest } from '../models/user.model';

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', data);
  
  // Store token and user info in localStorage
  localStorage.setItem('authToken', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  
  return response.data;
};

const register = async (data: RegisterRequest): Promise<User> => {
  const response = await apiClient.post<User>('/auth/register', data);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  await apiClient.post('/auth/change-password', data);
};

const refreshToken = async (): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/refresh-token');
  
  // Update token and user info in localStorage
  localStorage.setItem('authToken', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  
  return response.data;
};

export const authService = {
  login,
  register,
  logout,
  changePassword,
  refreshToken,
};
