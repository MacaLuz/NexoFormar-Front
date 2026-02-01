import { Categoria } from "./Categoria";

export interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  enlace: string;
  fechaPublicacion?: string;
  imagenes?: string[];               
  categoria: Categoria;              
  usuario?: { id: number };          
}
