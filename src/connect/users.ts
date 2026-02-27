import { api } from "@/connect/api";

export const obtenerUsuario = async () => {
  const res = await api.get(`/usuarios/me`);
  return res.data;
};

export const actualizarMiPerfil = async (dto: { nombre?: string; fotoUrl?: string }) => {
  const res = await api.patch(`/usuarios/me`, dto);
  return res.data;
};

export const obtenerUsuarios = async () => {
  const res = await api.get(`/usuarios`);
  return res.data;
};

export const cambiarRolUsuario = async (id: number, rol: "ADMIN" | "NORMAL") => {
  const res = await api.patch(`/usuarios/${id}/rol`, { rol });
  return res.data;
};

export const cambiarEstadoUsuario = async (id: number, estado: "ACTIVO" | "INACTIVO") => {
  const res = await api.patch(`/usuarios/${id}/estado`, { estado });
  return res.data;
};

export const banearUsuario = async (id: number) => {
  const res = await api.delete(`/usuarios/${id}`);
  return res.data;
};

export const activarUsuario = async (id: number) => cambiarEstadoUsuario(id, "ACTIVO");
export const desactivarUsuario = async (id: number) => cambiarEstadoUsuario(id, "INACTIVO");