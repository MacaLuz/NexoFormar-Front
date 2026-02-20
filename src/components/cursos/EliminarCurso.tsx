"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { eliminarCurso, obtenerCurso } from "@/connect/cursos";
import { requireAuthOrRedirect } from "@/lib/requireAuthOrRedirect";
import { getMe } from "@/lib/authMe";

type CursoAPI = {
  id: number;
  titulo: string;
  usuario?: { id: number };
};

export default function EliminarCursoCliente({ id }: { id: string }) {
  useEffect(() => {
    requireAuthOrRedirect(`/cursos/eliminar/${id}`);
  }, [id]);

  const me = getMe();

  const [titulo, setTitulo] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idNumerico = Number(id);
  const idValido = Number.isFinite(idNumerico) && idNumerico > 0;

  useEffect(() => {
    if (!idValido) {
      setError("ID inválido. Revisá la ruta /cursos/eliminar/[id].");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const curso: CursoAPI = await obtenerCurso(id);
        setTitulo(curso.titulo ?? "");
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "No se pudo cargar el curso");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, idValido]);

  const handleDelete = async () => {
    const ok = confirm(
      `¿Seguro que querés eliminar este curso?\n\n"${titulo || "Curso"}"`
    );
    if (!ok) return;

    try {
      setDeleting(true);
      setError(null);

      await eliminarCurso(id);

      window.location.href = "/";
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Error al eliminar el curso");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-darkbackground">
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: "#93c5fd" }}>Cargando...</Typography>
        </Box>
      </div>
    );
  }

  return (
    <div className="bg-darkbackground">
      <Box sx={{ p: 3, display: "grid", gap: 2 }}>
        <Typography variant="h5" sx={{ color: "#93c5fd" }}>
          Eliminar curso
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Typography sx={{ color: "#93c5fd" }}>
          Estás por eliminar: <b>{titulo || "Curso"}</b>
        </Typography>

        <Alert severity="warning">
          Esta acción no se puede deshacer.
        </Alert>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => (window.location.href = `/publicacion/${id}`)}
            disabled={deleting}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}
