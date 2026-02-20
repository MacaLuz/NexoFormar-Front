"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { buscarCursosPaginado, obtenerCursosPaginado } from "@/connect/cursos";
import { renderUtils } from "@/utils/render";
import { Curso } from "@/interfaces/Curso";
import { Pagination } from "@mui/material";

const LIMIT = 20;

const Main: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoriaId = searchParams.get("categoria_id");
  const keywords = searchParams.get("keywords");

  const pageParam = Number(searchParams.get("page") || "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hayCategorias = !!categoriaId;
        const hayKeywords = !!keywords?.trim();

        if (!hayCategorias && !hayKeywords) {
          const resp = await obtenerCursosPaginado(page, LIMIT);
          setCursos(Array.isArray(resp.data) ? resp.data : []);
          setTotalPages(resp.totalPages ?? 1);
          return;
        }

        const resp = await buscarCursosPaginado(
          page,
          LIMIT,
          hayCategorias ? categoriaId!.split(",") : undefined,
          hayKeywords ? keywords!.trim() : undefined
        );

        setCursos(Array.isArray(resp.data) ? resp.data : []);
        setTotalPages(resp.totalPages ?? 1);
      } catch (error) {
        console.error("Error al obtener cursos:", error);
        setCursos([]);
        setTotalPages(1);
      }
    };

    fetchData();
  }, [categoriaId, keywords, page]);

  const onChangePage = (_: any, newPage: number) => {
    const q = new URLSearchParams(searchParams.toString());
    q.set("page", String(newPage));

    const hayCategorias = !!categoriaId;
    const hayKeywords = !!keywords?.trim;

    if (!hayCategorias && !hayKeywords) {
      router.push(`/?${q.toString()}`);
      return;
    }

    router.push(`/cursos/buscar?${q.toString()}`);
  };

  return (
    <main className="bg-darkbackground min-h-screen px-6 py-8">
      <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {renderUtils.renderizarCursos(cursos)}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={page}
            onChange={onChangePage}
            color="primary"
          />
        </div>
      )}
    </main>
  );
};

export default Main;