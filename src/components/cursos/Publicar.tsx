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
import { obtenerCategorias } from "@/connect/categorias";
import { crearCurso } from "@/connect/cursos";
import { uploadMany } from "@/lib/uploadMany";
import type { Categoria } from "@/interfaces/Categoria";

export default function PublicarCurso() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enlace, setEnlace] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerCategorias().then(setCategorias).catch(console.error);
  }, []);

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

  const esUrlValida = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!titulo.trim()) {
      return setError("El título es obligatorio.");
    }

    if (descripcion.trim().length < 20) {
      return setError("La descripción debe tener al menos 20 caracteres.");
    }

    if (!enlace.trim() || !esUrlValida(enlace.trim())) {
      return setError("Ingresá un enlace válido (https://...).");
    }

    if (!categoriaId) {
      return setError("Elegí una categoría antes de publicar.");
    }

    try {
      setLoading(true);

      const urls = files ? await uploadMany(files) : [];

      await crearCurso({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        enlace: enlace.trim(),
        categoria_id: categoriaId,
        imagenes: urls,
      });

      setSuccess("Curso publicado correctamente 🎉");

      setTitulo("");
      setDescripcion("");
      setEnlace("");
      setFiles(null);
      setCategoriaId(0);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Ocurrió un error al publicar el curso."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-darkbackground">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 3, display: "grid", gap: 2 }}
      >
        <Typography variant="h5">Publicar curso</Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          error={!titulo.trim() && !!error}
          required
          sx={{
            input: { color: "#93c5fd" },
            "& .MuiInputLabel-root": { color: "#93c5fd" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },
          }}
        />

        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          multiline
          rows={4}
          error={descripcion.length > 0 && descripcion.length < 20}
          sx={{
            "& .MuiInputBase-input": { color: "#93c5fd" },
            "& .MuiInputLabel-root": { color: "#93c5fd" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },
          }}
        />

        <TextField
          label="Enlace"
          value={enlace}
          onChange={(e) => setEnlace(e.target.value)}
          required
          error={!!enlace && !esUrlValida(enlace)}
          helperText={
            enlace && !esUrlValida(enlace) ? "Ingresá un enlace válido" : ""
          }
          sx={{
            input: { color: "#93c5fd" },
            "& .MuiInputLabel-root": { color: "#93c5fd" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },
          }}
        />

        <Select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          displayEmpty
          error={!categoriaId && !!error}
          sx={{
            color: "#93c5fd",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
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
          Subir 1 imágen (tamaño recomendado: 1280 x 720 px)
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
        </Button>

        {files?.length ? (
          <Typography variant="body2">1 imagen seleccionada</Typography>
        ) : null}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Publicando..." : "Publicar"}
        </Button>
      </Box>
    </div>
  );
}
