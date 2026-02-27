"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { requireAuthOrRedirect } from "@/lib/requireAuthOrRedirect";
import { getMe } from "@/lib/authMe";
import { Categoria } from "@/interfaces/Categoria";
import { obtenerCategorias, crearCategoria, eliminarCategoria } from "@/connect/categorias";

export default function AdminCategorias() {
  const router = useRouter();

  useEffect(() => {
    requireAuthOrRedirect("/admin/categorias");
  }, []);

  const me = getMe();

  useEffect(() => {
    if (me && me.rol !== "ADMIN") router.push("/");
  }, [me, router]);

  const [rows, setRows] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);

  const [nombre, setNombre] = useState("");
  const [q, setQ] = useState("");

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await obtenerCategorias();

      setRows(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "No se pudo cargar categorías";
      setError(msg);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((c) => c.nombre.toLowerCase().includes(term) || String(c.id).includes(term));
  }, [rows, q]);

  const onCrear = async () => {
    setError(null);
    setSuccess(null);

    const name = nombre.trim();
    if (!name) {
      setError("Ingresá un nombre válido.");
      return;
    }

    try {
      setBusy(true);
      await crearCategoria(name);
      setSuccess("Categoría creada correctamente.");
      setNombre("");
      await load();
    } catch (err: any) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "No se pudo crear la categoría";

      setError(status ? `(${status}) ${msg}` : msg);
    } finally {
      setBusy(false);
    }
  };

  const onEliminar = async (c: Categoria) => {
    setError(null);
    setSuccess(null);

    const ok = confirm(`¿Eliminar la categoría "${c.nombre}"?`);
    if (!ok) return;

    try {
      setBusyId(c.id);
      await eliminarCategoria(c.id);
      setSuccess("Categoría eliminada.");
      await load();
    } catch (err: any) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "No se pudo eliminar la categoría";
      setError(status ? `(${status}) ${msg}` : msg);
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
      <Typography variant="h5" fontWeight={800} color="white">
        Panel Admin — Categorías
      </Typography>

      {error ? <Alert severity="error">{error}</Alert> : null}
      {success ? <Alert severity="success">{success}</Alert> : null}

      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Typography fontWeight={800} sx={{ mb: 1 }}>
          Crear categoría
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={onCrear} disabled={busy}>
            Crear
          </Button>
          <Button variant="outlined" onClick={load} disabled={busy}>
            Refrescar
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 2 }}>
          <TextField
            label="Buscar por nombre o id"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            fullWidth
          />
        </Stack>

        {filtered.length === 0 ? (
          <Typography color="text.secondary">No hay categorías para mostrar.</Typography>
        ) : (
          <List disablePadding>
            {filtered.map((c, idx) => (
              <Box key={c.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => onEliminar(c)}
                      disabled={busyId === c.id}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={c.nombre} secondary={`ID: ${c.id}`} />
                </ListItem>
                {idx < filtered.length - 1 ? <Divider /> : null}
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
