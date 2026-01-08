const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/apiRecetas';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/usuarios/login`,
    REGISTER: `${API_BASE_URL}/usuarios`,
    USERS: `${API_BASE_URL}/usuarios`,
    DELETE_USER: (id: string) => `${API_BASE_URL}/usuarios/eliminaUsuario/${id}`,
  },
  RECETAS: {
    CREATE: `${API_BASE_URL}/recetas/crearRecetas`,
    LIST: `${API_BASE_URL}/recetas`,
    PUBLISH: (id: string) => `${API_BASE_URL}/recetas/publicarReceta/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/recetas/eliminarReceta/${id}`,
  },
  INGREDIENTES: {
    LIST: (id: string) => `${API_BASE_URL}/ingredientes/listarIngredientes/${id}`,
    ADD: (id: string) => `${API_BASE_URL}/ingredientes/agregarIngrediente/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/ingredientes/eliminarIngredientes/${id}`,
  },
  PASOS: {
    CREATE: (id: string) => `${API_BASE_URL}/pasos/crearPasos/${id}`,
    LIST: (id: string) => `${API_BASE_URL}/pasos/listarPasos/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/pasos/eliminarPasos/${id}`,
  },
};

export default API_BASE_URL;

