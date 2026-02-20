/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/connect/auth";
import { setToken } from "@/lib/authStorage";
import { setMe } from "@/lib/authMe";

export default function LoginForm() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const data = await loginRequest({ correo, password });
      setToken(data.access_token);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/usuarios/me`, {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });

      if (!res.ok) throw new Error("No se pudo obtener el usuario");

      const me = await res.json();

      setMe({
        id: me.id,
        rol: me.rol,
        nombre: me.nombre,
        correo: me.correo,
        fotoUrl: me.fotoUrl ?? null,
      });

      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/";
      router.push(next);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0b1c32",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 3,
          borderRadius: 3,
          backgroundColor: "#0f2745",
          color: "#93c5fd",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
          Iniciar sesión
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
            required
            sx={{
              input: { color: "#93c5fd" },
              "& .MuiInputLabel-root": { color: "#93c5fd" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(147,197,253,0.35)" },
            }}
          />

          <TextField
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            sx={{
              input: { color: "#93c5fd" },
              "& .MuiInputLabel-root": { color: "#93c5fd" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(147,197,253,0.35)" },
            }}
          />

          {error && <Typography sx={{ color: "#ff8a80" }}>{error}</Typography>}

          <Button type="submit" variant="contained" disabled={loading} sx={{ backgroundColor: "#1a2f4b" }}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>

          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            ¿No tenés cuenta?{" "}
            <Link href="/register" style={{ color: "#93c5fd", fontWeight: 700 }}>
              Registrate
            </Link>
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            <Link href="/recuperar" style={{ color: "#93c5fd", fontWeight: 700 }}>
              Olvidé mi contraseña
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
