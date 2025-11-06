export interface PasosResponse {
  orden: number;
  contenido: string;
  receta: {
    id: number;
    titulo: string;
    descripcion: string;
    dificultad: string;
    porciones: number;
    tiempo_min: number;
    imagen_Url: string;
    is_Public: boolean;
    createdAt: string;
    updatedAt: string;
  };
  id: string;
}
