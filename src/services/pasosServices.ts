import axios from "axios";
import { PasosResponse } from "../interfaces/interfacePasos.interface";

export const CrearPasos = async (
  id: string,
  pasos: { contenido: string; orden: number }[]
): Promise<PasosResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.post<PasosResponse>(
    `http://localhost:3000/apiRecetas/pasos/crearPasos/${id}`,
    { pasos }, // 👈 Enviar dentro de un objeto
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const ListarPasos = async (
  id: string
): Promise<PasosResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.get<PasosResponse>(
    `http://localhost:3000/apiRecetas/pasos/listarPasos/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
