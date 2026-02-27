export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fotoUrl?: string | null;
  rol: "ADMIN" | "NORMAL";
  estado?: "ACTIVO" | "INACTIVO" | "BANEADO";
  fechaCreacion?: string;
}