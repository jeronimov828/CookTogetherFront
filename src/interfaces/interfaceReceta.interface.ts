export interface RecetaResponse {
  mensaje?: string;
  titulo?: string;
  descripcion?: number;
  dificultad?: string;
  porciones?: number;
  tiempo_min?: number;
  autor?: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  };
  ingredientes?: [
    {
      nombre?: string;
      usuario?: {
        id?: string;
        name?: string;
        email?: string;
        role?: string;
      };
    }
  ];
  imagen_Url?: string;
  is_Public?: boolean;
  id?: string;
  receta?: {
    titulo?: string;
    descripcion?: number;
    difictultad?: string;
    porciones?: number;
    tiempo_min?: number;
    imagen_url?: string;
    is_Public?: boolean;
    autor?: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  };
}
