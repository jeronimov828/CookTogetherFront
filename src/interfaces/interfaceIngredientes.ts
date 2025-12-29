export interface IngredientesResponse {
  id: string;
  nombre: string;
  calorias: number;
  receta: {
    id: string;
    titulo: string;
    descripcion: string;
    dificultad: string;
    porciones: number;
    tiempo_min: number;
    imagen_Url: string;
    is_Public: boolean;
  }
}
