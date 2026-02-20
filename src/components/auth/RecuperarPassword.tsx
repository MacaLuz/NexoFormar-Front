"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import {
  solicitarCodigoRecuperacion,
  resetPasswordConCodigo,
} from "@/connect/auth";
import { useRouter } from "next/navigation";

export default function RecuperarPassword() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nuevaPass, setNuevaPass] = useState("");
  const [repetirPass, setRepetirPass] = useState("");

  const [step, setStep] = useState<"PEDIR" | "RESET">("PEDIR");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pedirCodigo = async () => {
    setError(null);
    setSuccess(null);

    if (!correo.trim()) {
      setError("Ingresá tu correo.");
      return;
    }

    try {
      setLoading(true);
      const res = await solicitarCodigoRecuperacion(correo.trim());
      setSuccess(res?.message ?? "Si el correo existe, enviamos un código.");
      setStep("RESET");
    } catch (err: any) {
      setSuccess("Si el correo existe, enviamos un código.");
      setStep("RESET");
    } finally {
      setLoading(false);
    }
  };

  const cambiarPassword = async () => {
    setError(null);
    setSuccess(null);

    if (!correo.trim()) return setError("Ingresá tu correo.");
    if (!codigo.trim()) return setError("Ingresá el código.");
    if (codigo.trim().length !== 6) return setError("El código debe tener 6 dígitos.");
    if (!nuevaPass) return setError("Ingresá la nueva contraseña.");
    if (nuevaPass.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres.");
    if (nuevaPass !== repetirPass)
      return setError("Las contraseñas no coinciden.");

    try {
      setLoading(true);
      const res = await resetPasswordConCodigo({
        correo: correo.trim(),
        codigo: codigo.trim(),
        nuevaPass,
      });

      setSuccess(res?.message ?? "Contraseña actualizada correctamente.");

      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "No se pudo cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  const fieldSx = {
    input: { color: "#93c5fd" },
    "& .MuiInputLabel-root": { color: "#93c5fd" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(147,197,253,0.35)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#93c5fd" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#93c5fd" },
  } as const;

  return (
    <Box sx={{ backgroundColor: "#0b1c32", minHeight: "100vh", p: 3 }}>
      <Box
        sx={{
          maxWidth: 560,
          mx: "auto",
          backgroundColor: "#0f2745",
          borderRadius: 4,
          p: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          color: "#93c5fd",
          display: "grid",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={800}>
          Recuperar contraseña
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}
        {success ? <Alert severity="success">{success}</Alert> : null}

        {step === "PEDIR" ? (
          <>
            <TextField
              label="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              fullWidth
              sx={fieldSx}
            />

            <Button variant="contained" onClick={pedirCodigo} disabled={loading}>
              Enviar código
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Correo"
              value={correo}
              fullWidth
              disabled
              sx={{
                ...fieldSx,
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#93c5fd",
                  opacity: 0.7,
                },
              }}
            />

            <TextField
              label="Código (6 dígitos)"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6))}
              fullWidth
              inputProps={{ inputMode: "numeric" }}
              sx={fieldSx}
            />

            <TextField
              label="Nueva contraseña"
              type="password"
              value={nuevaPass}
              onChange={(e) => setNuevaPass(e.target.value)}
              fullWidth
              sx={fieldSx}
            />

            <TextField
              label="Repetir contraseña"
              type="password"
              value={repetirPass}
              onChange={(e) => setRepetirPass(e.target.value)}
              fullWidth
              sx={fieldSx}
            />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setStep("PEDIR");
                  setCodigo("");
                  setNuevaPass("");
                  setRepetirPass("");
                  setError(null);
                  setSuccess(null);
                }}
                disabled={loading}
                sx={{ borderColor: "#93c5fd", color: "#93c5fd" }}
              >
                Volver
              </Button>

              <Button
                variant="contained"
                onClick={cambiarPassword}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Cambiar contraseña
              </Button>
            </Box>

            <Button
              variant="text"
              onClick={pedirCodigo}
              disabled={loading}
              sx={{ color: "#93c5fd", justifySelf: "start" }}
            >
              Reenviar código
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
