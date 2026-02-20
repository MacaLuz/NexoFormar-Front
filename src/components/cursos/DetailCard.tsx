/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { obtenerCurso } from "@/connect/cursos";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Link from "next/link";
import RequireAuth from "../auth/RequireAuth";
import type { Curso } from "@/interfaces/Curso";

export default function DetailCard({ id }: { id: string }) {
  const [curso, setCurso] = useState<Curso | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await obtenerCurso(id, { signal: controller.signal });
        setCurso(data);
      } catch (e: any) {
        if (e?.name === "CanceledError" || e?.code === "ERR_CANCELED") return;

        console.error(e);
        setCurso(null);
        setError("No se pudo cargar el curso");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  return (
    <RequireAuth nextOverride={`/publicacion/${id}`}>
      {!id ? (
        <p>ID inválido</p>
      ) : loading ? (
        <p style={{ padding: 24 }}>Cargando...</p>
      ) : error ? (
        <p style={{ padding: 24 }}>{error}</p>
      ) : !curso ? (
        <p style={{ padding: 24 }}>No se encontró el curso</p>
      ) : (
        <Contenido curso={curso} />
      )}
    </RequireAuth>
  );
}

function Contenido({ curso }: { curso: Curso }) {
  const primeraImagen = curso.imagenes?.[0] || "/placeholder.jpg";

  const soloFecha = curso.fechaPublicacion
    ? new Date(curso.fechaPublicacion).toLocaleDateString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "Fecha no disponible";

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Box sx={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={primeraImagen}
              alt={curso.titulo}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          <CardContent sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {curso.titulo}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {curso.descripcion}
            </Typography>

            <Typography variant="caption" color="text.secondary" display="block">
              Categoría: {curso.categoria?.nombre ?? "Sin categoría"}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 3 }}
            >
              Publicado: {soloFecha}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                component="a"
                href={curso.enlace}
                target="_blank"
                rel="noreferrer"
              >
                IR AL CURSO
              </Button>

              <Button variant="text" component={Link} href="/">
                Volver
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
