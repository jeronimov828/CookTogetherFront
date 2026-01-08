import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import API_BASE_URL from './api.config';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request - Agregar token automáticamente
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response - Manejo global de errores
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Token expirado (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Limpiar datos de sesión
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('user');
      
      // Redirigir al login
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
      
      return Promise.reject(error);
    }

    // Error 403 - Sin permisos
    if (error.response?.status === 403) {
      console.error('No tienes permisos para realizar esta acción');
    }

    // Error 500 - Error del servidor
    if (error.response?.status === 500) {
      console.error('Error del servidor. Por favor, intenta más tarde.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;

