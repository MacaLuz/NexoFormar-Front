"use client";

import React from "react";
import { Menu, MenuItem, IconButton, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLoggedIn, clearToken } from "@/lib/authStorage";
import { clearMe, getMe } from "@/lib/authMe";

const MenuLateral = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const logged = isLoggedIn();

  const me = getMe();
  const isAdmin = !!me && me.rol === "ADMIN";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    clearToken();
    clearMe();
    handleClose();
    router.push("/");
  };

  const items: React.ReactNode[] = [];

  if (!logged) {
    items.push(
      <Link
        href="/login"
        key="login"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleClose}>
          <strong>Iniciar sesión</strong>
        </MenuItem>
      </Link>
    );
  }

  items.push(
    <Link
      href="/perfil"
      key="perfil"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <MenuItem onClick={handleClose}>Perfil</MenuItem>
    </Link>
  );

  if (logged) {
    items.push(
      <Link
        href="/publicar"
        key="publicar"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleClose}>Publicar</MenuItem>
      </Link>
    );
  }

  if (logged && isAdmin) {
    items.push(
      <Link
        href="/admin"
        key="admin"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem onClick={handleClose}>
          <strong>Panel Admin</strong>
        </MenuItem>
      </Link>
    );
  }

  items.push(
    <Link
      href="/"
      key="buscar"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <MenuItem onClick={handleClose}>Buscar cursos</MenuItem>
    </Link>
  );

  items.push(
    <Link
      href="mailto:nexoformar@gmail.com"
      key="contacto"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <MenuItem onClick={handleClose}>Contacto</MenuItem>
    </Link>
  );

  if (logged) {
    items.push(<Divider key="div-auth-bottom" />);
    items.push(
      <MenuItem key="logout" onClick={handleLogout}>
        <strong>Cerrar sesión</strong>
      </MenuItem>
    );
  }

  return (
    <>
      <IconButton
        aria-label="menu"
        onClick={handleClick}
        edge="start"
        color="inherit"
      >
        <MenuIcon fontSize="large" className="text-logo" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items}
      </Menu>
    </>
  );
};

export default MenuLateral;
