/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, MoreVert } from "@mui/icons-material";

import Link from "next/link";
import { obtenerCursos } from "@/connect/cursos";
import { obtenerUsuario, actualizarMiPerfil } from "@/connect/users";
import { uploadMany } from "@/lib/uploadMany";
import { getMe, setMe } from "@/lib/authMe";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/authStorage";

type Curso = {
  id: number;
  titulo: string;
  descripcion: string;
  imagenes?: string[];
  enlace: string;
  fechaPublicacion?: string;
  categoria?: { id: number; nombre: string };
  estado?: string;
  usuario?: { id: number };
};

type Perfil = {
  id: number;
  nombre: string;
  correo: string;
  fotoUrl?: string | null;
  rol?: string;
};

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [nombreEdit, setNombreEdit] = useState("");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null);
  const menuOpen = Boolean(anchorEl);


useEffect(() => {
  const run = async () => {
    try {
      setLoading(true);

      const me = await obtenerUsuario();

      const p: Perfil = {
        id: me.id,
        nombre: me.nombre,
        correo: me.correo,
        fotoUrl: me.fotoUrl ?? null,
        rol: me.rol,
      };

      setPerfil(p);
      setNombreEdit(p.nombre);

      setMe({
        id: me.id,
        rol: me.rol,
        nombre: me.nombre,
        correo: me.correo,
        fotoUrl: me.fotoUrl ?? null,
      });

      const all = await obtenerCursos();
      const mine = Array.isArray(all)
        ? all.filter((c: any) => c?.usuario?.id === me.id || c?.usuario_id === me.id)
        : [];

      const activos = mine.filter((c: any) => (c.estado ? c.estado === "ACTIVO" : true));
      setCursos(activos);
    } catch (e: any) {
      console.error("Error perfil:", e);

      const status = e?.response?.status;
      if (e?.message === "NO_TOKEN" || status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("me");
        window.location.href = "/login?next=/perfil";
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  run();
}, []);




  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const offset = dir === "left" ? -el.clientWidth : el.clientWidth;
    el.scrollTo({ left: el.scrollLeft + offset, behavior: "smooth" });
  };

  const onGuardarNombre = async () => {
    if (!perfil) return;
    if (!nombreEdit.trim() || nombreEdit.trim() === perfil.nombre) return;

    try {
      setSaving(true);
      const updated = await actualizarMiPerfil({ nombre: nombreEdit.trim() });

      setPerfil((prev) => (prev ? { ...prev, nombre: updated.nombre } : prev));

      const current = getMe();
      if (current) setMe({ ...current, nombre: updated.nombre });
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar el nombre");
    } finally {
      setSaving(false);
    }
  };

  const onClickCambiarFoto = () => fileInputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setSaving(true);

      const [url] = await uploadMany(files);

      const updated = await actualizarMiPerfil({ fotoUrl: url });

      setPerfil((prev) => (prev ? { ...prev, fotoUrl: updated.fotoUrl } : prev));

      const current = getMe();
      if (current) setMe({ ...current, fotoUrl: updated.fotoUrl ?? null });
    } catch (err) {
      console.error(err);
      alert("No se pudo subir la foto");
    } finally {
      setSaving(false);
      e.target.value = "";
    }
  };

  const abrirMenuCurso = (event: React.MouseEvent<HTMLElement>, curso: Curso) => {
    setAnchorEl(event.currentTarget);
    setCursoSeleccionado(curso);
  };

  const cerrarMenuCurso = () => {
    setAnchorEl(null);
    setCursoSeleccionado(null);
  };

const onEditarCurso = () => {
  if (!cursoSeleccionado) return;
  cerrarMenuCurso();
  window.location.href = `/cursos/editar/${cursoSeleccionado.id}`;
};

const onEliminarCurso = () => {
  if (!cursoSeleccionado) return;
  cerrarMenuCurso();
  window.location.href = `/cursos/eliminar/${cursoSeleccionado.id}`;
};

  if (loading) {
    return (
      <Box sx={{ p: 3, color: "#93c5fd", backgroundColor: "#0b1c32", minHeight: "100vh" }}>
        Cargando...
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#0b1c32", minHeight: "100vh", p: 3 }}>
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          backgroundColor: "#0f2745",
          borderRadius: 4,
          p: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          color: "#93c5fd",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={perfil?.fotoUrl || "/placeholder-avatar.png"}
              alt={perfil?.nombre || "Avatar"}
              sx={{ width: 112, height: 112, border: "2px solid #93c5fd" }}
            />

            <Button
              size="small"
              variant="outlined"
              onClick={onClickCambiarFoto}
              disabled={saving}
              sx={{
                mt: 1,
                borderColor: "#93c5fd",
                color: "#93c5fd",
                "&:hover": { borderColor: "#93c5fd", backgroundColor: "rgba(147,197,253,0.08)" },
              }}
            >
              Modificar foto
            </Button>

            <Typography variant="caption" sx={{ display: "block", mt: 0.5, opacity: 0.9 }}>
              Tamaño recomendado: 400 × 400 px (cuadrada)
            </Typography>

            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onFileChange} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Nombre de usuario
            </Typography>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5 }}>
              <TextField
                value={nombreEdit}
                onChange={(e) => setNombreEdit(e.target.value)}
                size="small"
                fullWidth
                sx={{
                  input: { color: "#93c5fd" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(147,197,253,0.35)" },
                }}
              />
              <Button
                variant="contained"
                onClick={onGuardarNombre}
                disabled={saving || !perfil || nombreEdit.trim() === perfil.nombre}
                sx={{ backgroundColor: "#0b1c32" }}
              >
                Guardar
              </Button>
            </Box>

            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              {perfil?.correo}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(147,197,253,0.2)" }} />

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Mis cursos activos
        </Typography>

        {cursos.length === 0 ? (
          <Typography sx={{ opacity: 0.9 }}>Todavía no publicaste cursos.</Typography>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={() => scroll("left")} sx={{ color: "#93c5fd" }}>
              <ArrowBackIos />
            </IconButton>

            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                pb: 1,
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": { height: 8 },
                "&::-webkit-scrollbar-thumb": { background: "rgba(147,197,253,0.3)", borderRadius: 8 },
              }}
            >
              {cursos.map((c) => {
                const img = c.imagenes?.[0] || "/placeholder.jpg";
                const fecha = c.fechaPublicacion?.split("T")[0] ?? "";

                return (
                  <Card
                    key={c.id}
                    sx={{
                      minWidth: 280,
                      maxWidth: 280,
                      flexShrink: 0,
                      borderRadius: 3,
                      overflow: "hidden",
                      backgroundColor: "#ffffff",
                      color: "#0b1c32",
                      position: "relative",
                    }}
                  >
                    <CardMedia component="img" image={img} alt={c.titulo} sx={{ height: 140, objectFit: "cover" }} />
                    <CardContent>
                      <Typography sx={{ fontWeight: 700 }} noWrap>
                        {c.titulo}
                      </Typography>

                      <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                        {c.categoria?.nombre ? `Categoría: ${c.categoria.nombre}` : null}
                      </Typography>

                      <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
                        {fecha ? `Publicado: ${fecha}` : "Publicado: -"}
                      </Typography>

                      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ backgroundColor: "#0b1c32" }}
                          component={Link}
                          href={`/publicacion/${c.id}`}
                        >
                          Ver más
                        </Button>
                      </Box>

                      <IconButton
                        onClick={(e) => abrirMenuCurso(e, c)}
                        sx={{ position: "absolute", right: 6, bottom: 6, color: "#0b1c32" }}
                      >
                        <MoreVert />
                      </IconButton>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            <IconButton onClick={() => scroll("right")} sx={{ color: "#93c5fd" }}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        )}

        <Menu anchorEl={anchorEl} open={menuOpen} onClose={cerrarMenuCurso}>
          <MenuItem onClick={onEditarCurso}>Modificar</MenuItem>
          <MenuItem onClick={onEliminarCurso}>Eliminar</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
