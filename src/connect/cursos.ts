import { api } from "@/connect/api";

function toArrayResponse(body: any) {
  if (Array.isArray(body)) return body;

  if (body && Array.isArray(body.data)) return body.data;

  return [];
}

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
  const res = await api.get(`/cursos`, { params: { page: 1, limit: 20 } });
  return toArrayResponse(res.data);
};

export const buscarCursos = async (categoriaIds?: string[], keywords?: string) => {
  const params: any = { page: 1, limit: 20 };

  if (categoriaIds?.length) params.categoria_id = categoriaIds.join(",");
  if (keywords?.trim()) params.keywords = keywords.trim();

  const res = await api.get(`/cursos/buscar`, { params });
  return toArrayResponse(res.data);
};

export const obtenerCurso = async (id: string, config?: { signal?: AbortSignal }) => {
  const res = await api.get(`/cursos/${id}`, { signal: config?.signal });
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

export const obtenerCursosPaginado = async (page = 1, limit = 20) => {
  const res = await api.get(`/cursos`, { params: { page, limit } });
  if (res.data?.data) return res.data;
  return { data: Array.isArray(res.data) ? res.data : [], page, limit, total: 0, totalPages: 1 };
};

export const buscarCursosPaginado = async (
  page = 1,
  limit = 20,
  categoriaIds?: string[],
  keywords?: string
) => {
  const params: any = { page, limit };
  if (categoriaIds?.length) params.categoria_id = categoriaIds.join(",");
  if (keywords?.trim()) params.keywords = keywords.trim();

  const res = await api.get(`/cursos/buscar`, { params });
  if (res.data?.data) return res.data;
  return { data: Array.isArray(res.data) ? res.data : [], page, limit, total: 0, totalPages: 1 };
};