import axios from "axios";
import { RecetaResponse } from "../interfaces/interfaceReceta.interface";

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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.post<RecetaResponse>(
    "http://localhost:3000/apiRecetas/recetas/crearRecetas",
    {
      titulo,
      descripcion,
      dificultad,
      porciones,
      tiempo_min,
      imagen_Url,
      ingredientes,
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

export const ListarRecetas = async (): Promise<RecetaResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.get<RecetaResponse>(
    "http://localhost:3000/apiRecetas/recetas/listarRecetas",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const PublicaRectas = async (
  id: string,
  is_Public: boolean
): Promise<RecetaResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.put<RecetaResponse>(
    `http://localhost:3000/apiRecetas/recetas/publicarReceta/${id}`,
    { is_Public },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // No 'ok' property in axios response, instead check for status code
  if (response.status < 200 || response.status >= 300) {
    throw new Error("Error al actualizar la publicación de la receta");
  }

  return response.data;
};

export const EliminarRecetas = async (
  id: string
): Promise<RecetaResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.delete<RecetaResponse>(
    `http://localhost:3000/apiRecetas/recetas/eliminarReceta/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // No 'ok' property in axios response, instead check for status code
  if (response.status < 200 || response.status >= 300) {
    throw new Error("Error al eliminar la receta");
  }

  return response.data;
};
