import { api } from "@/connect/api";

export const obtenerCategorias = async () => {
  const res = await api.get("/categorias");
  return res.data;
};

export const crearCategoria = async (nombre: string) => {
  const res = await api.post("/categorias", { nombre });
  return res.data;
};

export const eliminarCategoria = async (id: number) => {
  const res = await api.delete(`/categorias/${id}`);
  return res.data;
};
