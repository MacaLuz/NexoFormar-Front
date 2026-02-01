"use client";

import { Categoria } from "@/interfaces/Categoria";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getMe } from "@/lib/authMe";
import { requireAuthOrRedirect } from "@/lib/requireAuthOrRedirect";

type Curso = {
  id: number;
  titulo: string;
  descripcion: string;
  imagenes?: string[];
  categoria: Categoria;
  fechaPublicacion?: string;
  enlace: string;
  usuario?: { id: number };
};

interface Props {
  data: Curso;
}

export default function MainCard({ data }: Props) {
  const router = useRouter();
  const me = getMe();

  const canEdit = useMemo(() => {
    if (!me) return false;
    const isAdmin = me.rol === "ADMIN";
    const isOwner = me.id === data.usuario?.id;
    return isAdmin || isOwner;
  }, [me, data.usuario?.id]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const primeraImagen = data.imagenes?.[0];

  const soloFecha = data.fechaPublicacion
    ? new Date(data.fechaPublicacion).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "Fecha no disponible";

  const handleVerMas = () => {
    const next = `/publicacion/${data.id}`;
    if (!requireAuthOrRedirect(next)) return;
    router.push(next);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={primeraImagen || "/placeholder.jpg"}
          alt={data.titulo}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      <CardContent
        sx={{
          position: "relative",
          pb: 2,

          minHeight: 112,
        }}
      >
        {canEdit && (
          <>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-label="opciones"
              sx={{
                position: "absolute",
                top: 6,
                right: 6,
              }}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  router.push(`/cursos/editar/${data.id}`);
                }}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  router.push(`/cursos/eliminar/${data.id}`);
                }}
              >
                Eliminar
              </MenuItem>
            </Menu>
          </>
        )}

        <Typography
          gutterBottom
          variant="h6"
          sx={{
            fontWeight: 800,

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data.titulo}
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block">
          Categoría: {data.categoria.nombre}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Publicado: {soloFecha}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", mt: "auto", pb: 2 }}>
        <Button variant="contained" onClick={handleVerMas} sx={{ px: 4 }}>
          VER MÁS
        </Button>
      </CardActions>
    </Card>
  );
}
