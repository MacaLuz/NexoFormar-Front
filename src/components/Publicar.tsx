"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
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

  const [usuarioId] = useState<number>(1);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoriaId) {
      console.error("Elegí una categoría antes de publicar");
      return;
    }

    try {
      const urls = files ? await uploadMany(files) : [];

      const creado = await crearCurso({
        titulo,
        descripcion,
        enlace,
        categoria_id: categoriaId,
        imagenes: urls,
      });

      console.log("Curso creado:", creado);

      setTitulo("");
      setDescripcion("");
      setEnlace("");
      setFiles(null);

      window.location.href = "/";
    } catch (err) {
      console.error("Error al publicar curso:", err);
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

        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          sx={{
            
            input: {
              color: "#93c5fd",
            },

           
            "& .MuiInputLabel-root": {
              color: "#93c5fd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#93c5fd",
            },

           
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },

           
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },

            
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#93c5fd",
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
          sx={{
            "& .MuiInputBase-input": {
              color: "#93c5fd", 
            },

            "& .MuiInputLabel-root": {
              color: "#93c5fd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#93c5fd",
            },

            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#93c5fd",
              },
          }}
        />
        <TextField
          label="Enlace"
          value={enlace}
          onChange={(e) => setEnlace(e.target.value)}
          required
          sx={{
           
            input: {
              color: "#93c5fd",
            },

            
            "& .MuiInputLabel-root": {
              color: "#93c5fd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#93c5fd",
            },

            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },

            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },

            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#93c5fd",
              },
          }}
        />

        <Select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          displayEmpty
          sx={{
            color: "#93c5fd",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1c4375ff",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#93c5fd",
            },

            "& .MuiSelect-icon": {
              color: "#93c5fd",
            },
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

        <Button type="submit" variant="contained">
          Publicar
        </Button>
      </Box>
    </div>
  );
}
