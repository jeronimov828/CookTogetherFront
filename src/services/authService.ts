import axios from "axios";

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
  const response = await axios.post<LoginResponse>(
    "http://localhost:3000/apiRecetas/usuarios/login",
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
  const response = await axios.post<LoginResponse>(
    "http://localhost:3000/apiRecetas/usuarios",
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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.get<Usuario[]>(
    "http://localhost:3000/apiRecetas/usuarios",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const eliminarUsuario = async (id: string): Promise<Usuario[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No hay token en el almacenamiento local");
  }

  const response = await axios.delete<Usuario[]>(
    `http://localhost:3000/apiRecetas/usuarios/eliminaUsuario/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
