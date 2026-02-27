import { api } from "@/connect/api";

export async function loginRequest(payload: { correo: string; password: string }) {
  const res = await api.post(`/auth/login`, payload);
  return res.data;
}

export async function registerRequest(payload: { nombre: string; correo: string; password: string }) {
  const res = await api.post(`/auth/register`, payload);
  return res.data;
}

export async function solicitarCodigoRegistro(correo: string) {
  const res = await api.post(`/auth/register/request-code`, { correo });
  return res.data;
}

export async function confirmarRegistroConCodigo(payload: {
  nombre: string;
  correo: string;
  password: string;
  codigo: string;
}) {
  const res = await api.post(`/auth/register/confirm`, payload);
  return res.data;
}

export async function solicitarCodigoRecuperacion(correo: string) {
  const res = await api.post(`/auth/recovery`, { correo });
  return res.data;
}

export async function resetPasswordConCodigo(payload: { correo: string; codigo: string; nuevaPass: string }) {
  const res = await api.post(`/auth/reset-password`, payload);
  return res.data;
}