"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

import type { Categoria } from "@/interfaces/Categoria";
import { obtenerCategorias } from "@/connect/categorias";
import { obtenerCurso, actualizarCurso } from "@/connect/cursos";
import { uploadMany } from "@/lib/uploadMany";
import { requireAuthOrRedirect } from "@/lib/requireAuthOrRedirect";

type CursoAPI = {
  id: number;
  titulo: string;
  descripcion: string;
  enlace: string;
  imagenes?: string[];
  categoria?: { id: number; nombre: string };
  usuario?: { id: number };
};

export default function EditarCursoCliente({ id }: { id: string }) {
  useEffect(() => {
    requireAuthOrRedirect(`/cursos/editar/${id}`);
  }, [id]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enlace, setEnlace] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  const [imagenActual, setImagenActual] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idNumerico = Number(id);
  const idValido = Number.isFinite(idNumerico) && idNumerico > 0;

  useEffect(() => {
    if (!idValido) {
      setError("ID inválido. Revisá la ruta /cursos/editar/[id].");
      setLoading(false);
      return;
    }

    obtenerCategorias().then(setCategorias).catch(console.error);
  }, [idValido]);

  useEffect(() => {
    if (!idValido) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const curso: CursoAPI = await obtenerCurso(id);

        setTitulo(curso.titulo ?? "");
        setDescripcion(curso.descripcion ?? "");
        setEnlace(curso.enlace ?? "");

        const catId = curso.categoria?.id ?? 0;
        setCategoriaId(catId);

        const img = curso.imagenes?.[0] ?? "";
        setImagenActual(img);
      } catch (err: any) {
        setError(err?.response?.data?.message ?? "No se pudo cargar el curso");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, idValido]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = e.target.files;
    if (!incoming || incoming.length === 0) {
      setFiles(null);
      return;
    }

    const dt = new DataTransfer();
    dt.items.add(incoming[0]);
    setFiles(dt.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoriaId) {
      setError("Elegí una categoría antes de guardar");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const nuevasUrls = files ? await uploadMany(files) : [];

      const imagenesFinal =
        nuevasUrls.length > 0
          ? nuevasUrls
          : imagenActual
          ? [imagenActual]
          : [];

      await actualizarCurso(id, {
        titulo,
        descripcion,
        enlace,
        categoria_id: categoriaId,
        imagenes: imagenesFinal,
      });

      window.location.href = `/publicacion/${id}`;
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Error al guardar cambios");
    } finally {
      setSaving(false);
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 3, display: "grid", gap: 2 }}
      >
        <Typography variant="h5" sx={{ color: "#93c5fd" }}>
          Editar curso
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          sx={{
            input: { color: "#93c5fd" },
            "& .MuiInputLabel-root": { color: "#93c5fd" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#93c5fd" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#93c5fd" },
          }}
        />

        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          multiline
          rows={4}
          sx={{
            "& .MuiInputBase-input": { color: "#93c5fd" },
            "& .MuiInputLabel-root": { color: "#93c5fd" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#93c5fd" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#93c5fd" },
          }}
        />

        <TextField
          label="Enlace"
          value={enlace}
          onChange={(e) => setEnlace(e.target.value)}
          required
          sx={{
            input: { color: "#93c5fd" },
            "& .MuiInputLabel-root": { color: "#93c5fd" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#93c5fd" },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "#93c5fd" },
          }}
        />

        <Select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          displayEmpty
          sx={{
            color: "#93c5fd",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1c4375ff" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#93c5fd" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },
            "& .MuiSelect-icon": { color: "#93c5fd" },
          }}
        >
          <MenuItem value={0} disabled>
            Elegí categoría
          </MenuItem>
          {categorias.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.nombre}
            </MenuItem>
          ))}
        </Select>

        <Button variant="outlined" component="label">
          Cambiar imagen (opcional)
          <input hidden accept="image/*" type="file" onChange={handleFileChange} />
        </Button>

        {files?.length ? (
          <Typography variant="body2" sx={{ color: "#93c5fd" }}>
            1 imagen nueva seleccionada
          </Typography>
        ) : imagenActual ? (
          <Typography variant="body2" sx={{ color: "#93c5fd" }}>
            Imagen actual cargada
          </Typography>
        ) : null}

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => (window.location.href = `/publicacion/${id}`)}
            disabled={saving}
          >
            Cancelar
          </Button>

          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}
