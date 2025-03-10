
import axios from 'axios';
import { toast } from 'sonner';

// Base API configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle different error statuses
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          break;
        case 403:
          toast.error('Bạn không có quyền thực hiện hành động này.');
          break;
        case 404:
          toast.error('Không tìm thấy tài nguyên yêu cầu.');
          break;
        case 422:
          // Validation errors
          if (response.data && response.data.errors) {
            const errorMessages = Object.values(response.data.errors).join(', ');
            toast.error(`Lỗi: ${errorMessages}`);
          } else {
            toast.error('Dữ liệu không hợp lệ.');
          }
          break;
        case 500:
          toast.error('Lỗi máy chủ. Vui lòng thử lại sau.');
          break;
        default:
          toast.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } else {
      // Network error
      toast.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
