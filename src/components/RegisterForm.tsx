/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerRequest } from "@/connect/auth";
import { setToken } from "@/lib/authStorage";

export default function RegisterForm() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const data = await registerRequest({ nombre, correo, password });

      setToken(data.access_token);

      router.push("/perfil");
    } catch (err: any) {
      setError(err?.response?.data?.message || "No se pudo registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0b1c32", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <Paper sx={{ width: "100%", maxWidth: 420, p: 3, borderRadius: 3, backgroundColor: "#0f2745", color: "#93c5fd" }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
          Crear cuenta
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            sx={{
              input: { color: "#93c5fd" },
              "& .MuiInputLabel-root": { color: "#93c5fd" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(147,197,253,0.35)" },
            }}
          />

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
            label="Contraseña (mín. 6)"
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
            {loading ? "Creando..." : "Crear cuenta"}
          </Button>

          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" style={{ color: "#93c5fd", fontWeight: 700 }}>
              Iniciá sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
