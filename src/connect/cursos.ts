import { api } from "@/connect/api";

export const crearCurso = async (payload: {
  titulo: string;
  descripcion: string;
  enlace: string;
  categoria_id: number;
  imagenes: string[];
}) => {
  const res = await api.post(`/cursos`, payload);
  return res.data;
};

export const obtenerCursos = async () => {
  const res = await api.get(`/cursos`);
  return res.data;
};

export const buscarCursos = async (
  categoriaIds?: string[],
  keywords?: string
) => {
  const params = new URLSearchParams();

  if (categoriaIds?.length) {
    params.set("categoria_id", categoriaIds.join(","));
  }

  if (keywords) {
    params.set("keywords", keywords);
  }

  const res = await api.get(`/cursos/buscar?${params.toString()}`);
  return res.data;
};

export const obtenerCurso = async (
  id: string,
  config?: { signal?: AbortSignal }
) => {
  const res = await api.get(`/cursos/${id}`, {
    signal: config?.signal,
  });
  return res.data;
};

export const actualizarCurso = async (
  id: string,
  payload: Partial<{
    titulo: string;
    descripcion: string;
    enlace: string;
    categoria_id: number;
    imagenes: string[];
  }>
) => {
  const res = await api.put(`/cursos/${id}`, payload);
  return res.data;
};

export const eliminarCurso = async (id: string) => {
  const res = await api.delete(`/cursos/${id}`);
  return res.data;
};

