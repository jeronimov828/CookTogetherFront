import axios from "axios";
import { IngredientesResponse } from "../interfaces/interfaceIngredientes";

export const listaIngredientes = async (
  id: string
): Promise<IngredientesResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.get<IngredientesResponse>(
    `http://localhost:3000/apiRecetas/ingredientes/listarIngredientes/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const eliminarIngredientes = async (
  idIngrediente: string
): Promise<IngredientesResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.delete<IngredientesResponse>(
    `http://localhost:3000/apiRecetas/ingredientes/eliminarIngredientes/${idIngrediente}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const AgregarIngredientes = async (
  id: string,
  nombre: string,
  calorias: number
): Promise<IngredientesResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.post<IngredientesResponse>(
    `http://localhost:3000/apiRecetas/ingredientes/agregarIngrediente/${id}`,
    {
      nombre,
      calorias,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
