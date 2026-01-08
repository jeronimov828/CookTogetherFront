import apiClient from "../config/axios.config";
import { API_ENDPOINTS } from "../config/api.config";
import { PasosResponse } from "../interfaces/interfacePasos.interface";

export const CrearPasos = async (
  id: string,
  pasos: { contenido: string; orden: number }[]
): Promise<PasosResponse> => {
  const response = await apiClient.post<PasosResponse>(
    API_ENDPOINTS.PASOS.CREATE(id),
    { pasos }
  );
  return response.data;
};

export const ListarPasos = async (
  id: string
): Promise<PasosResponse> => {
  const response = await apiClient.get<PasosResponse>(
    API_ENDPOINTS.PASOS.LIST(id)
  );
  return response.data;
};

export const eliminarPasos = async (
  idPaso: string
): Promise<PasosResponse> => {
  const response = await apiClient.delete<PasosResponse>(
    API_ENDPOINTS.PASOS.DELETE(idPaso)
  );
  return response.data;
};
