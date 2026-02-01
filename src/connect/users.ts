import axios from "axios";
import { getToken } from "@/lib/authStorage";

const BASE = process.env.NEXT_PUBLIC_BACK_URL;

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}


export const obtenerUsuario = async () => {
  const token = getToken();
  if (!token) throw new Error("NO_TOKEN");

  const res = await axios.get(`${BASE}/usuarios/me`, {
    headers: authHeaders(),
  });
  return res.data;
};

export const actualizarMiPerfil = async (dto: { nombre?: string; fotoUrl?: string }) => {
  const res = await axios.patch(`${BASE}/usuarios/me`, dto, {
    headers: authHeaders(),
  });
  return res.data;
};



export const obtenerUsuarios = async () => {
  const res = await axios.get(`${BASE}/usuarios`, {
    headers: authHeaders(),
  });
  return res.data;
};

export const cambiarRolUsuario = async (id: number, rol: "ADMIN" | "NORMAL") => {
  const res = await axios.patch(
    `${BASE}/usuarios/${id}/rol`,
    { rol },
    { headers: authHeaders() }
  );
  return res.data;
};

export const cambiarEstadoUsuario = async (id: number, estado: "ACTIVO" | "INACTIVO") => {
  const res = await axios.patch(
    `${BASE}/usuarios/${id}/estado`,
    { estado },
    { headers: authHeaders() }
  );
  return res.data;
};

export const banearUsuario = async (id: number) => {
  const res = await axios.delete(`${BASE}/usuarios/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
};

export const activarUsuario = async (id: number) => {
  return cambiarEstadoUsuario(id, "ACTIVO");
};

export const desactivarUsuario = async (id: number) => {
  return cambiarEstadoUsuario(id, "INACTIVO");
};
