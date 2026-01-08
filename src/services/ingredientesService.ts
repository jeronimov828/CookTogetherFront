import apiClient from "../config/axios.config";
import { API_ENDPOINTS } from "../config/api.config";
import { IngredientesResponse } from "../interfaces/interfaceIngredientes";

export const listaIngredientes = async (
  id: string
): Promise<IngredientesResponse> => {
  const response = await apiClient.get<IngredientesResponse>(
    API_ENDPOINTS.INGREDIENTES.LIST(id)
  );
  return response.data;
};

export const eliminarIngredientes = async (
  idIngrediente: string
): Promise<IngredientesResponse> => {
  const response = await apiClient.delete<IngredientesResponse>(
    API_ENDPOINTS.INGREDIENTES.DELETE(idIngrediente)
  );
  return response.data;
};

export const AgregarIngredientes = async (
  id: string,
  nombre: string,
  calorias: number
): Promise<IngredientesResponse> => {
  const response = await apiClient.post<IngredientesResponse>(
    API_ENDPOINTS.INGREDIENTES.ADD(id),
    {
      nombre,
      calorias,
    }
  );
  return response.data;
};
