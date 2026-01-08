import apiClient from "../config/axios.config";
import { API_ENDPOINTS } from "../config/api.config";

interface LoginResponse {
  message: string;
  usuario: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const login = async (
  name: string,
  passwordHash: string
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    {
      name,
      passwordHash,
    }
  );

  return response.data;
};

export const crearUsuario = async (
  name: string,
  email: string,
  passwordHash: string,
  role: string
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    {
      name,
      email,
      passwordHash,
      role,
    }
  );

  return response.data;
};

export const ListaUsuarios = async (): Promise<Usuario[]> => {
  const response = await apiClient.get<Usuario[]>(API_ENDPOINTS.AUTH.USERS);
  return response.data;
};

export const eliminarUsuario = async (id: string): Promise<Usuario[]> => {
  const response = await apiClient.delete<Usuario[]>(
    API_ENDPOINTS.AUTH.DELETE_USER(id)
  );
  return response.data;
};
