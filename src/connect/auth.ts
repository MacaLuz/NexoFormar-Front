import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BACK_URL;



export async function loginRequest(payload: {
  correo: string;
  password: string;
}) {
  const res = await axios.post(`${BASE}/auth/login`, payload);
  return res.data as { access_token: string; nombre: string };
}

export async function registerRequest(payload: {
  nombre: string;
  correo: string;
  password: string;
}) {
  const res = await axios.post(`${BASE}/auth/register`, payload);
  return res.data as { access_token: string; nombre: string };
}


export async function solicitarCodigoRegistro(correo: string) {
  const res = await axios.post(`${BASE}/auth/register/request-code`, { correo });
  return res.data as { message: string };
}

export async function confirmarRegistroConCodigo(payload: {
  nombre: string;
  correo: string;
  password: string;
  codigo: string;
}) {
  const res = await axios.post(`${BASE}/auth/register/confirm`, payload);
  return res.data as { access_token: string; nombre: string };
}



export async function solicitarCodigoRecuperacion(correo: string) {
  const res = await axios.post(`${BASE}/auth/recovery`, { correo });
  return res.data as { message: string };
}

export async function resetPasswordConCodigo(payload: {
  correo: string;
  codigo: string;
  nuevaPass: string;
}) {
  const res = await axios.post(`${BASE}/auth/reset-password`, payload);
  return res.data as { message: string };
}
