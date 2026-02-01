"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button, Avatar, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BasicMenu from "./Menu";
import MultipleSelectCheckmarks from "./SelectTag";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getMe, type Me } from "@/lib/authMe";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const showSearch =
    pathname !== "/login" &&
    pathname !== "/register" &&
    pathname !== "/recuperar";

  const [keywords, setKeywords] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);

 
  const [me, setMeState] = useState<Me | null>(null);

  useEffect(() => {
    const refresh = () => setMeState(getMe());

    refresh();

    window.addEventListener("me:updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("me:updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();
    const hayCategorias = categorias.length > 0;
    const hayKeywords = keywords.trim().length > 0;

    if (!hayCategorias && !hayKeywords) {
      router.push("/");
      return;
    }

    if (hayCategorias) query.set("categoria_id", categorias.join(","));
    if (hayKeywords) query.set("keywords", keywords.trim());

    router.push(`/cursos/buscar?${query.toString()}`);
  };

  const goPerfil = () => router.push("/perfil");

  return (
    <header className="bg-darkblue border-b border-darkblue px-4 py-3 flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-center md:justify-end gap-3">
        <BasicMenu />
        <Link href={"/"}>
          <Image
            src="/logo_actualizado.png"
            alt="Logo NexoFormar"
            width={180}
            height={40}
            priority
          />
        </Link>
      </div>

      {showSearch && (
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center gap-2 justify-center md:justify-start"
        >
          <MultipleSelectCheckmarks onChange={setCategorias} />

          <TextField
            id="outlined-basic"
            label="Buscar..."
            variant="outlined"
            size="small"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            sx={{
              backgroundColor: "#1a2f4b",
              minWidth: "120px",
              flexGrow: 1,
              maxWidth: "300px",
              marginLeft: { sm: "8px" },
              input: { color: "#93c5fd" },
              "& .MuiInputLabel-root": { color: "#93c5fd" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#93c5fd" },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1c4375ff",
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                { borderColor: "#93c5fd" },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderColor: "#93c5fd" },
            }}
          />

          <Button variant="contained" type="submit">
            Buscar
          </Button>
        </form>
      )}

      <div className="flex items-center justify-center md:justify-end">
        <IconButton onClick={goPerfil} aria-label="Perfil">
          <Avatar
            src={me?.fotoUrl || undefined}
            sx={{ bgcolor: "#1a2f4b", color: "#93c5fd", width: 36, height: 36 }}
          >
            <PersonIcon />
          </Avatar>
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
