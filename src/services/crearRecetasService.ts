import apiClient from "../config/axios.config";
import { API_ENDPOINTS } from "../config/api.config";
import { RecetaResponse, ListarRecetasResponse} from "../interfaces/interfaceReceta.interface";

export const CrearReceta = async (
  titulo: string,
  descripcion: string,
  dificultad: string,
  porciones: number,
  tiempo_min: number,
  imagen_Url: string,
  ingredientes: {
    nombre: string;
  }[]
): Promise<RecetaResponse> => {
  const response = await apiClient.post<RecetaResponse>(
    API_ENDPOINTS.RECETAS.CREATE,
    {
      titulo,
      descripcion,
      dificultad,
      porciones,
      tiempo_min,
      imagen_Url,
      ingredientes,
    }
  );

  return response.data;
};

export const ListarRecetas = async (): Promise<ListarRecetasResponse> => {
  const response = await apiClient.get<ListarRecetasResponse>(
    API_ENDPOINTS.RECETAS.LIST
  );

  return response.data;
};

export const PublicaRectas = async (
  id: string,
  is_Public: boolean
): Promise<RecetaResponse> => {
  const response = await apiClient.put<RecetaResponse>(
    API_ENDPOINTS.RECETAS.PUBLISH(id),
    { is_Public }
  );

  return response.data;
};

export const EliminarRecetas = async (
  id: string
): Promise<RecetaResponse> => {
  const response = await apiClient.delete<RecetaResponse>(
    API_ENDPOINTS.RECETAS.DELETE(id)
  );

  return response.data;
};
