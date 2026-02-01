"use client";

export function requireAuthOrRedirect(next: string) {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = `/login?next=${encodeURIComponent(next)}`;
    return false;
  }
  return true;
}
