export type Me = {
  id: number;
  rol: "ADMIN" | "NORMAL";
  nombre?: string;
  correo?: string;
  fotoUrl?: string | null;
};

const KEY = "me";

export function setMe(me: Me) {
  if (typeof window === "undefined") return;

  localStorage.setItem(KEY, JSON.stringify(me));
  window.dispatchEvent(new Event("me:updated"));
}

export function getMe(): Me | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Me;
  } catch {
    return null;
  }
}

export function clearMe() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("me:updated"));
}
