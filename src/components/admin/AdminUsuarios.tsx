"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { requireAuthOrRedirect } from "@/lib/requireAuthOrRedirect";
import { getMe } from "@/lib/authMe";

import {
  obtenerUsuarios,
  cambiarRolUsuario,
  cambiarEstadoUsuario,
  banearUsuario,
} from "@/connect/users";

type UsuarioRow = {
  id: number;
  nombre: string;
  correo: string;
  rol: "ADMIN" | "NORMAL";
  estado: "ACTIVO" | "INACTIVO" | "BANEADO";
  fotoUrl?: string | null;
  fechaCreacion?: string;
};

export default function AdminUsuarios() {
  const router = useRouter();

  useEffect(() => {
    requireAuthOrRedirect("/admin");
  }, []);

  const me = getMe();

  useEffect(() => {
    if (me && me.rol !== "ADMIN") router.push("/");
  }, [me, router]);

  const [rows, setRows] = useState<UsuarioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((u) => {
      return (
        u.nombre?.toLowerCase().includes(term) ||
        u.correo?.toLowerCase().includes(term) ||
        String(u.id).includes(term)
      );
    });
  }, [rows, q]);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerUsuarios();
      setRows(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "No se pudo cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const rolChip = (rol: UsuarioRow["rol"]) =>
    rol === "ADMIN" ? <Chip label="ADMIN" /> : <Chip label="NORMAL" variant="outlined" />;

  const estadoChip = (estado: UsuarioRow["estado"]) => {
    if (estado === "ACTIVO") return <Chip label="ACTIVO" />;
    if (estado === "INACTIVO") return <Chip label="INACTIVO" />;
    return <Chip label="BANEADO" />;
  };

  const onToggleRol = async (u: UsuarioRow) => {
    if (me?.id === u.id) {
      alert("No podés cambiarte el rol a vos mismo.");
      return;
    }

    const nuevo: "ADMIN" | "NORMAL" = u.rol === "ADMIN" ? "NORMAL" : "ADMIN";

    const ok = confirm(`¿Cambiar rol de ${u.correo} a ${nuevo}?`);
    if (!ok) return;

    try {
      setBusyId(u.id);
      await cambiarRolUsuario(u.id, nuevo);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Error al cambiar rol");
    } finally {
      setBusyId(null);
    }
  };

  const onToggleEstado = async (u: UsuarioRow) => {
    if (u.estado === "BANEADO") {
      alert("Este usuario está baneado permanentemente. No puede reactivarse.");
      return;
    }

    const nuevo: "ACTIVO" | "INACTIVO" = u.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    const ok = confirm(`¿Cambiar estado de ${u.correo} a ${nuevo}?`);
    if (!ok) return;

    try {
      setBusyId(u.id);
      await cambiarEstadoUsuario(u.id, nuevo);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Error al cambiar estado");
    } finally {
      setBusyId(null);
    }
  };

  const onBan = async (u: UsuarioRow) => {
    if (me?.id === u.id) {
      alert("No podés banearte a vos mismo.");
      return;
    }

    const ok = confirm(
      `⚠️ BAN PERMANENTE\n\nEl usuario quedará BANEADO y no podrá volver a usar el mail:\n${u.correo}\n\n¿Confirmás?`
    );
    if (!ok) return;

    try {
      setBusyId(u.id);
      await banearUsuario(u.id);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Error al banear");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "grid", gap: 2 }}>
      <Typography variant="h5" fontWeight={800}>
        Panel Admin — Usuarios
      </Typography>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <TextField
          label="Buscar por nombre, correo o id"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          size="small"
          sx={{ minWidth: 320 }}
        />

        <Button variant="outlined" onClick={load}>
          Refrescar
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((u) => {
              const busy = busyId === u.id;

              return (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.nombre}</TableCell>
                  <TableCell>{u.correo}</TableCell>
                  <TableCell>{rolChip(u.rol)}</TableCell>
                  <TableCell>{estadoChip(u.estado)}</TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button variant="outlined" onClick={() => onToggleRol(u)} disabled={busy}>
                        {u.rol === "ADMIN" ? "Quitar admin" : "Hacer admin"}
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => onToggleEstado(u)}
                        disabled={busy || u.estado === "BANEADO"}
                      >
                        {u.estado === "ACTIVO" ? "Inactivar" : "Activar"}
                      </Button>

                      <Button variant="contained" color="error" onClick={() => onBan(u)} disabled={busy}>
                        Ban permanente
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography variant="body2" color="text.secondary">
                    No hay usuarios para mostrar.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
