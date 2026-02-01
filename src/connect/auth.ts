import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_BACK_URL;

export async function loginRequest(payload: { correo: string; password: string }) {
  const res = await axios.post(`${BASE}/auth/login`, payload);
  return res.data as { access_token: string; nombre: string };
}

export async function registerRequest(payload: { nombre: string; correo: string; password: string }) {
  const res = await axios.post(`${BASE}/auth/register`, payload);
  return res.data as { access_token: string; nombre: string };
}
